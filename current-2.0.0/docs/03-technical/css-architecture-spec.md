# css-architecture-spec.md

## الهدف
تحديد بنية ملفات CSS، نظام الطبقات، ومعايير الكتابة التي تضمن قابلية الصيانة والهجرة.

## المشمول
- بنية ملفات CSS وترتيبها
- نظام الطبقات (cascade layers)
- قواعد الكتابة والتنظيم داخل كل ملف
- متطلبات الأداء على مستوى CSS
- الأنماط المضادة المحظورة

## غير المشمول
- قيم المتغيرات ونظام التوكنات (→ `css-design-tokens.md`)
- اصطلاحات تسمية الـ classes (→ `naming-conventions.md`)
- معيار عزل المكونات (→ `component-isolation-standard.md`)

## بنية الملفات

```
css/
├── tokens.css          ← متغيرات CSS فقط (colors, typography, spacing)
├── base.css            ← reset + عناصر HTML الأساسية
├── components/
│   ├── nav.css
│   ├── hero.css
│   ├── portfolio.css
│   ├── contact.css
│   └── footer.css
├── utilities.css       ← classes مساعدة محدودة وموثّقة
└── main.css            ← @import لكل ما سبق (للتطوير فقط)
```

**في الإنتاج:** ملف واحد مُجمَّع ومُضغوط. لا `@import` chains في الإنتاج.

## نظام الطبقات (Cascade Order)

الترتيب داخل `main.css`:
1. `tokens.css` — أولاً دائماً. كل شيء يعتمد على المتغيرات.
2. `base.css` — reset والعناصر الأساسية.
3. ملفات المكونات — بترتيب الظهور في الصفحة.
4. `utilities.css` — أخيراً لتتجاوز عند الحاجة.

## قواعد كتابة CSS

### التنظيم داخل كل ملف
```css
/* ============================================
   COMPONENT: Hero Section
   PURPOSE: الوحدة الأولى من الصفحة — Headline + CTA
   MIGRATION: يُستخرج كـ <Hero /> في المرحلة الثالثة
   ============================================ */

/* 1. المتغيرات المحلية للمكون (إن وجدت) */
.hero {
  --hero-min-height: 90vh;
}

/* 2. الحاوية الخارجية */
.hero { ... }

/* 3. العناصر الداخلية بالتسلسل */
.hero__title { ... }
.hero__subtitle { ... }
.hero__cta { ... }

/* 4. الحالات والتعديلات */
.hero__cta--primary { ... }

/* 5. الاستعلامات الإعلامية للمكون */
@media (max-width: 768px) {
  .hero { ... }
}
```

### قواعد الخصائص داخل كل block
ترتيب الخصائص: Layout → Box Model → Typography → Visual → Misc

```css
.element {
  /* Layout */
  display: flex;
  position: relative;
  grid-column: span 2;

  /* Box Model */
  width: 100%;
  max-width: var(--container-max);
  padding: var(--space-4);
  margin: 0 auto;

  /* Typography */
  font-size: var(--type-size-4);
  font-weight: 400;
  line-height: 1.6;
  color: var(--color-text-primary);

  /* Visual */
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);

  /* Misc */
  cursor: pointer;
  transition: opacity 200ms ease;
}
```

### استخدام المتغيرات
```css
/* ✓ صحيح — دائماً من التوكنات */
color: var(--color-text-primary);
padding: var(--space-4);
font-size: var(--type-size-4);

/* ✗ خاطئ — قيمة مُشفَّرة */
color: #e2e8f0;
padding: 32px;
font-size: 16px;
```

الاستثناء الوحيد: قيمة ديناميكية يُنتجها JS تُعيَّن كـ CSS variable محلية:
```css
.progress-bar {
  width: var(--progress, 0%); /* يُعيّنها JS */
}
```

## معايير الأداء في CSS

**لا `@import` في الإنتاج:** يُضيف طلبات HTTP متسلسلة. كل ملفات التطوير تُجمَّع قبل النشر.

**لا أنماط blocking:** CSS يُحمَّل في `<head>`. حجمه يجب أن يبقى ضمن ميزانية الأداء.

**استعلامات إعلامية على مستوى المكون:** كل مكون يحتوي استعلاماته الإعلامية بداخله. لا ملف responsive.css منفصل.

**`will-change` بحذر:** يُستخدم فقط لعناصر تحتاج تسريع GPU فعلياً (animations معقدة). لا استخدام وقائي.

**Transitions محدودة:**
```css
/* ✓ مقبول — تأثير بسيط وظيفي */
transition: opacity 200ms ease;
transition: transform 250ms ease-out;

/* ✗ غير مقبول — يُعقّد العرض بدون عائد واضح */
transition: all 300ms ease;
```

## الأنماط المضادة المحظورة

```css
/* ✗ !important — إشارة على مشكلة في الـ specificity */
.element { color: red !important; }

/* ✗ قيم اعتباطية خارج الشبكة */
.element { margin-top: 13px; }

/* ✗ تعشيش عميق يعكس مشكلة في HTML */
.parent .child .grandchild .element { ... }

/* ✗ selector بـ ID للتنسيق */
#hero { ... }  /* IDs للـ JavaScript والـ anchor links فقط */

/* ✗ قيم مُشفَّرة بدل متغيرات */
.element { color: #0ea5e9; }

/* ✗ CSS animations ثقيلة تُعيق الأداء */
@keyframes heavy { 
  /* blur, filter, box-shadow متغير */
}
```

## معيار العزل بين المكونات

لا يحق لـ CSS مكوّن أن يُعدّل مكوّناً آخر:
```css
/* ✗ خاطئ — nav تُعدّل hero */
.nav .hero__title { ... }

/* ✓ صحيح — كل مكوّن مكتفٍ بذاته */
.nav { ... }
.hero__title { ... }
```

التواصل بين المكونات عبر CSS variables فقط:
```css
/* المكوّن الأب يُعيّن متغيراً */
.page-wrapper {
  --sidebar-width: 300px;
}

/* المكوّن الابن يقرأه */
.sidebar {
  width: var(--sidebar-width);
}
```

## القيود التي يجب مراعاتها
- أي CSS لا ينتمي لمكوّن محدد يُوثَّق في `base.css` أو `utilities.css` فقط
- ملف CSS لمكوّن لا يتجاوز 200 سطر كقاعدة — ما زاد يُشير إلى مكوّن يحتاج تقسيماً

## التأثير على التطبيق
هذه البنية تضمن أن كل مكوّن CSS قابل للاستخراج كـ CSS Module أو styled-component في المرحلة الثالثة بتعديلات طفيفة.

## وثائق مرتبطة
- `css-design-tokens.md` — القيم المستخدمة في كل هذا النظام
- `naming-conventions.md` — اصطلاحات تسمية الـ classes (BEM)
- `component-isolation-standard.md` — معيار العزل التفصيلي
- `html-structure-guidelines.md` — HTML الذي يُكمل هذا CSS

## الملف التالي
`css-design-tokens.md`

# css-design-tokens.md

## الهدف
تحديد جميع قيم CSS variables الحاكمة للمنظومة البصرية — الألوان، الطباعة، التباعد، والحدود.
هذه القيم هي المصدر الوحيد للحقيقة لكل قرار بصري في الكود.

## المشمول
- نظام الألوان الكامل
- نظام الطباعة (أحجام، أوزان، ارتفاعات سطر)
- نظام التباعد (شبكة 8px)
- متغيرات الحدود والظلال والانتقالات
- قواعد تعريف التوكنات وإضافتها

## غير المشمول
- القرارات التصميمية خلف هذه القيم (→ `brand-cognitive-model.md`)
- كيفية استخدام هذه القيم في CSS المكونات (→ `css-architecture-spec.md`)
- اصطلاحات تسمية الـ classes (→ `naming-conventions.md`)

## ملف التوكنات — `css/tokens.css`

```css
/* ============================================
   DESIGN TOKENS — المصدر الوحيد للقيم البصرية
   لا قيمة بصرية خارج هذا الملف
   ============================================ */

:root {

  /* ==========================================
     COLORS — نظام الألوان
     ========================================== */

  /* Primitives — القيم الخام (لا تُستخدم مباشرة في المكونات) */
  --_color-slate-950: #020617;
  --_color-slate-900: #0f172a;
  --_color-slate-800: #1e293b;
  --_color-slate-700: #334155;
  --_color-slate-500: #64748b;
  --_color-slate-300: #cbd5e1;
  --_color-slate-100: #f1f5f9;
  --_color-accent-raw: #0ea5e9;     /* sky-500 — لون التأكيد الوحيد */
  --_color-accent-dim: #0369a1;     /* sky-700 — للـ hover */

  /* Semantic — القيم الدلالية (تُستخدم في المكونات) */
  --color-bg-base:        var(--_color-slate-950);
  --color-bg-surface:     var(--_color-slate-900);
  --color-bg-elevated:    var(--_color-slate-800);

  --color-text-primary:   var(--_color-slate-100);
  --color-text-secondary: var(--_color-slate-300);
  --color-text-muted:     var(--_color-slate-500);

  --color-border:         var(--_color-slate-700);
  --color-border-subtle:  var(--_color-slate-800);

  --color-accent:         var(--_color-accent-raw);
  --color-accent-hover:   var(--_color-accent-dim);

  /* Focus — للعناصر التفاعلية */
  --color-focus-ring:     var(--_color-accent-raw);


  /* ==========================================
     TYPOGRAPHY — نظام الطباعة
     ========================================== */

  /* Font Families */
  --font-heading: 'Inter', system-ui, sans-serif;   /* يُستبدل بالخط المختار */
  --font-body:    'Inter', system-ui, sans-serif;

  /* Type Scale — 5 درجات ثابتة */
  --type-size-1: clamp(2.5rem,   5vw, 3.5rem);   /* H1 */
  --type-size-2: clamp(1.75rem,  3vw, 2.25rem);  /* H2 */
  --type-size-3: clamp(1.25rem,  2vw, 1.5rem);   /* H3 */
  --type-size-4: clamp(1rem,     1vw, 1.125rem); /* Body */
  --type-size-5: 0.875rem;                        /* Small / Labels */

  /* Font Weights */
  --font-weight-regular: 400;
  --font-weight-medium:  500;
  --font-weight-bold:    700;

  /* Line Heights */
  --line-height-tight:  1.2;   /* عناوين */
  --line-height-normal: 1.6;   /* نص أساسي */
  --line-height-loose:  1.8;   /* نص طويل، مقالات */

  /* Letter Spacing */
  --letter-spacing-tight:  -0.02em;  /* عناوين كبيرة */
  --letter-spacing-normal:  0;
  --letter-spacing-wide:    0.05em;  /* labels، أحرف كابيتال */


  /* ==========================================
     SPACING — شبكة 8px
     ========================================== */

  --space-1:  0.5rem;    /*  8px */
  --space-2:  1rem;      /* 16px */
  --space-3:  1.5rem;    /* 24px */
  --space-4:  2rem;      /* 32px */
  --space-6:  3rem;      /* 48px */
  --space-8:  4rem;      /* 64px */
  --space-12: 6rem;      /* 96px */
  --space-16: 8rem;      /* 128px */


  /* ==========================================
     LAYOUT — حاويات وشبكة
     ========================================== */

  --container-max:    1200px;
  --container-wide:   1400px;
  --container-narrow:  720px;

  --grid-gutter:      var(--space-4);
  --section-padding:  var(--space-12);


  /* ==========================================
     BORDERS & RADIUS
     ========================================== */

  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:  16px;
  --radius-full: 9999px;

  --border-width:        1px;
  --border-width-thick:  2px;


  /* ==========================================
     TRANSITIONS
     ========================================== */

  --transition-fast:    150ms ease;
  --transition-normal:  250ms ease;
  --transition-slow:    400ms ease-out;


  /* ==========================================
     Z-INDEX — طبقات التراص
     ========================================== */

  --z-base:    0;
  --z-raised:  10;
  --z-overlay: 100;
  --z-modal:   1000;
  --z-toast:   9999;

}
```

## قواعد استخدام التوكنات

### قاعدة 1 — Semantic فوق Primitive
```css
/* ✓ صحيح */
color: var(--color-text-primary);

/* ✗ خاطئ — يتجاوز الطبقة الدلالية */
color: var(--_color-slate-100);

/* ✗ خاطئ — قيمة مُشفَّرة */
color: #f1f5f9;
```

### قاعدة 2 — لا متغير خارج `:root`
```css
/* ✗ خاطئ — متغير معرَّف محلياً بدون مسوّغ */
.hero {
  --color-text-primary: blue; /* يُعيد تعريف متغير عالمي */
}

/* ✓ مقبول — متغير محلي بمسوّغ واضح */
.hero {
  --hero-min-height: 90vh; /* قيمة خاصة بالمكوّن، لا وجود لها في النظام العام */
}
```

### قاعدة 3 — لا توكن جديد بدون توثيق
قبل إضافة متغير جديد:
1. هل يمكن استخدام توكن موجود؟
2. هل هذا المفهوم سيُستخدم في أكثر من موضع؟
3. إذا نعم على 2 — يُضاف للملف مع تعليق يصف دوره.

## علاقة التوكنات بالهجرة

هذه التوكنات ستُصدَّر كـ design tokens في المرحلة الثانية:
- `--color-*` → تصبح CSS variables في React theme
- `--type-size-*` → تصبح typography scale في design system
- `--space-*` → تصبح spacing scale في design system

البنية الحالية موافقة لهذا التصدير بدون تغيير.

## القيود التي يجب مراعاتها
- لا تعديل على قيمة primitive دون مراجعة تأثيرها على جميع المتغيرات الدلالية المرتبطة
- تغيير `--color-accent` يستلزم التحقق من نسبة التباين للنص عليه (4.5:1 كحد أدنى)

## التأثير على التطبيق
أي قيمة بصرية في أي ملف CSS لا مقابل لها في هذا الملف هي مخالفة.
المراجعة الدورية تشمل grep على الملفات بحثاً عن قيم hex أو px مُشفَّرة خارج هذا الملف.

## وثائق مرتبطة
- `brand-cognitive-model.md` (← `02-positioning/`) — القرارات التصميمية خلف هذه القيم
- `css-architecture-spec.md` — كيف تُستخدم هذه التوكنات في بنية CSS
- `css-design-tokens.md` هو المرجع الوحيد — لا ملف tokens آخر

## الملف التالي
`js-module-architecture.md`

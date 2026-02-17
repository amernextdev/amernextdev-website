# 🏗️ layout-system.md — نظام التخطيط

> "الشبكة غير المرئية هي ما يجعل التصميم يبدو 'صحيحاً' دون أن يعرف المستخدم لماذا."

---

## 1️⃣ المبدأ الحاكم

التخطيط في هذا الموقع مبني على مبدأ واحد:

> **البنية أولاً — الجمال تابع.**

قبل أي قرار بصري، يُحدَّد أين يقع كل عنصر ولماذا. الشبكة تُقرَّر مرة واحدة وتُطبَّق بصرامة — لا استثناءات بلا سبب موثّق.

هذا الانضباط في التخطيط هو ما يُترجم فلسفة "النظام، التفكير، الانضباط" من `philosophy.md` إلى بُعد بصري يُحسّه الزائر دون أن يُسمّيه.

---

## 2️⃣ نقاط الكسر — Breakpoints

نظام مبني على خمس نقاط تُغطي كل السيناريوهات الحقيقية:

```css
:root {
  --bp-xs:  375px;   /* هواتف صغيرة (iPhone SE وما يشبهه) */
  --bp-sm:  640px;   /* هواتف كبيرة — نهاية Mobile zone */
  --bp-md:  768px;   /* أجهزة لوحية عمودي */
  --bp-lg:  1024px;  /* أجهزة لوحية أفقي / Laptops صغيرة */
  --bp-xl:  1280px;  /* Desktops — نقطة التصميم الأساسية */
  --bp-2xl: 1536px;  /* Desktops كبيرة */
}
```

### استراتيجية الاستجابة — Mobile-First:

```css
/* القاعدة: ابدأ بالموبايل، أضف للشاشات الأكبر */

.element {
  /* Mobile (xs → sm): التصميم الأساسي هنا */
  display: block;
  padding: var(--space-6);
}

@media (min-width: 768px) {
  .element {
    /* Tablet: تعديلات متوسطة */
    padding: var(--space-10);
  }
}

@media (min-width: 1280px) {
  .element {
    /* Desktop: التصميم الكامل */
    padding: var(--space-16);
  }
}
```

> [!NOTE]
> Mobile-First ليس فقط تقنياً — هو قرار أولويات. إذا عمل التصميم على موبايل، يعمل في كل مكان.

---

## 3️⃣ نظام الحاويات — Container System

### الحاويات المعتمدة:

```css
.container {
  width: 100%;
  margin-inline: auto;
  padding-inline: var(--space-6); /* 24px على الجانبين */
}

/* الحاوية الافتراضية — معظم المحتوى */
.container-default {
  max-width: 1200px;
}

/* الحاوية الضيقة — للمحتوى النصي المركّز */
.container-narrow {
  max-width: 720px;
}

/* الحاوية الواسعة — للأقسام الممتدة */
.container-wide {
  max-width: 1400px;
}

/* الحاوية الكاملة — للخلفيات الممتدة فقط */
.container-full {
  max-width: 100%;
  padding-inline: 0;
}
```

### متى تُستخدم كل حاوية:

| الحاوية | الاستخدام |
|---|---|
| `container-default` | معظم Sections: المنهجية، الأعمال، التواصل |
| `container-narrow` | النص الطويل، قصص الحالة، صفحة About |
| `container-wide` | Hero، Grid الأعمال (إذا احتاج تنفساً أكبر) |
| `container-full` | خلفيات الـ Sections الممتدة للحافتين فقط |

---

## 4️⃣ نظام الشبكة — Grid System

### الشبكة الأساسية: 12 عموداً

```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-6); /* 24px */
}

/* على Tablet */
@media (min-width: 768px) {
  .grid {
    gap: var(--space-8); /* 32px */
  }
}
```

### أنماط الشبكة المستخدمة:

---

#### نمط 1 — العمود الكامل (Full)
```css
.col-full { grid-column: 1 / -1; }
```
**يُستخدم في:** Hero headline، Section titles، Dividers

---

#### نمط 2 — نصفان متساويان (2-Col)
```css
.col-half { grid-column: span 6; }

/* Mobile: عمود كامل */
@media (max-width: 767px) {
  .col-half { grid-column: 1 / -1; }
}
```
**يُستخدم في:** About (نص + صورة)، مقارنات ثنائية

---

#### نمط 3 — ثلاثة أعمدة (3-Col)
```css
.col-third { grid-column: span 4; }

@media (max-width: 1023px) {
  .col-third { grid-column: span 6; } /* Tablet: عمودان */
}
@media (max-width: 767px) {
  .col-third { grid-column: 1 / -1; } /* Mobile: كامل */
}
```
**يُستخدم في:** قسم الخدمات، ميزات المنهجية، قيم العلامة

---

#### نمط 4 — محتوى + Sidebar (8/4)
```css
.col-main    { grid-column: span 8; }
.col-sidebar { grid-column: span 4; }

@media (max-width: 1023px) {
  .col-main,
  .col-sidebar { grid-column: 1 / -1; }
}
```
**يُستخدم في:** صفحات دراسة الحالة، صفحات المحتوى الطويل

---

#### نمط 5 — أربعة أعمدة (4-Col)
```css
.col-quarter { grid-column: span 3; }

@media (max-width: 1023px) {
  .col-quarter { grid-column: span 6; }
}
@media (max-width: 767px) {
  .col-quarter { grid-column: 1 / -1; }
}
```
**يُستخدم في:** مجموعة أيقونات، شبكة مشاريع صغيرة

---

## 5️⃣ نظام الأقسام — Section System

كل Section في الموقع يتبع هيكلاً موحّداً:

```
┌─────────────────────────────────────────┐
│          Section Wrapper                │
│  ┌───────────────────────────────────┐  │
│  │        container-default          │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │      Section Header         │  │  │
│  │  │   (Label + Title + Lead)    │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │      Section Content        │  │  │
│  │  │   (Grid / List / Single)    │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │     Section Footer (opt.)   │  │  │
│  │  │        (CTA / Link)         │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Padding الأقسام:

```css
.section {
  padding-block: var(--space-20); /* 80px فوق وتحت — Mobile */
}

@media (min-width: 1024px) {
  .section {
    padding-block: var(--space-32); /* 128px — Desktop */
  }
}
```

---

## 6️⃣ التناوب البصري للأقسام — Section Alternation

قاعدة الإيقاع من `visual-principles.md` تُطبَّق هنا:

```
Section 1:  خلفية داكنة  (#0F1117) — Hero
Section 2:  خلفية فاتحة (#F5F4F0) — المنهجية
Section 3:  خلفية داكنة (#0F1117) — الأعمال
Section 4:  خلفية فاتحة (#F5F4F0) — التواصل
```

**لماذا التناوب؟**
يمنع الإحساس بالصفحة الواحدة الطويلة الرتيبة. كل Section يشعر كـ "لحظة جديدة" بصرياً، مما يُحافظ على انتباه الزائر طوال الرحلة.

---

## 7️⃣ الـ Z-Index System

```css
:root {
  --z-base:     0;     /* المحتوى الطبيعي */
  --z-raised:   10;    /* Cards عند Hover */
  --z-dropdown: 100;   /* قوائم منسدلة */
  --z-sticky:   200;   /* Navbar ثابت */
  --z-modal:    300;   /* Modals */
  --z-toast:    400;   /* إشعارات */
  --z-tooltip:  500;   /* Tooltips */
}
```

> [!WARNING]
> لا تُستخدم أرقام Z-Index عشوائية في الكود. كل قيمة تأتي من هذا النظام فقط.

---

## 8️⃣ قواعد الاستجابة — Responsive Rules

### السلوك على كل نقطة كسر:

| العنصر | Mobile (< 640) | Tablet (640–1024) | Desktop (> 1024) |
|---|---|---|---|
| Navigation | Hamburger Menu | Hamburger Menu | Full Navbar |
| Hero Headline | `--text-4xl` | `--text-5xl` | `--text-6xl` |
| Grid 3-Col | 1 عمود | 2 عمود | 3 أعمدة |
| Container Padding | 24px | 32px | 40px |
| Section Padding | 80px | 96px | 128px |
| Card Gap | 16px | 24px | 32px |

### المبدأ الأساسي للاستجابة:

```
Mobile:   الأولوية للمعلومات — تكدّس عمودي، بلا تعقيد
Tablet:   انتقال تدريجي — بعض الأعمدة تُفعَّل
Desktop:  التصميم الكامل — كل الأعمدة والتوازي المقصود
```

---

*المرجع التالي: [`components-spec.md`](./components-spec.md)*
*مرتبط بـ: [`visual-principles.md`](../brand/visual-principles.md) | [`color-system.md`](../brand/color-system.md) | [`css-architecture.md`](../technical/css-architecture.md)*

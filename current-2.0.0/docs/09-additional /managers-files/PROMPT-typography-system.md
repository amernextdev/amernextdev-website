# برومبت مصمم نظام الطباعة — Typography System
## [أرفق هذا البرومبت مع ملف amer-style-guide.md]

---

أنت مهندس نظام طباعة متخصص في مشروع **AMER | عامر — Professional Positioning System**.

مهمتك الوحيدة: إنتاج ملفين بالضبط — `typography.css` و `typography-reference.md` — مبنيَّين على وثيقة الأسلوب المرفقة.

---

## السياق التقني الذي تعمل فيه

- **تبديل اللغة:** عبر `data-lang` على الـ `<html>` element
  - الإنجليزية: `<html data-lang="en">`
  - العربية: `<html data-lang="ar">`
- **الخطوط:** ستُحمَّل من ملفات محلية لاحقاً — لم تُحدَّد بعد
- **الوضع:** Phase 1 — Vanilla CSS فقط، لا frameworks

---

## الملف الأول — `typography.css`

### القسم 1 — `@font-face` blocks

الخطوط المطلوب تعريفها هي **4 خطوط × 4 أوزان = 16 block**:

| الخط | اللغة | الأوزان |
|------|-------|---------|
| DM Sans | الإنجليزية — headings | 300, 400, 600, 700 |
| Inter | الإنجليزية — body | 300, 400, 600, 700 |
| Cairo | العربية — headings | 300, 400, 600, 700 |
| IBM Plex Arabic | العربية — body | 300, 400, 600, 700 |

**لأن الملفات غير محملة بعد:**
- اكتب كل الـ 16 block كاملةً لكن بـ `src` placeholder واضح
- فوق كل مجموعة خط، ضع تعليقاً يشرح:
  - اسم المجلد المتوقع
  - اسم الملف المتوقع لكل وزن
  - صيغة الملف المطلوبة (`woff2` أولاً، `woff` احتياطي)
  - مثال حقيقي كامل لـ block واحد جاهز للتعديل

الشكل المطلوب للتعليق:
```css
/*
  FONT: DM Sans (English Headings)
  FOLDER: /assets/fonts/dm-sans/
  FILES:
    Weight 300 → DMSans-Light.woff2 / DMSans-Light.woff
    Weight 400 → DMSans-Regular.woff2 / DMSans-Regular.woff
    Weight 600 → DMSans-SemiBold.woff2 / DMSans-SemiBold.woff
    Weight 700 → DMSans-Bold.woff2 / DMSans-Bold.woff

  COMPLETE EXAMPLE (copy and fill src paths):
  @font-face {
    font-family: 'DM Sans';
    src: url('/assets/fonts/dm-sans/DMSans-Regular.woff2') format('woff2'),
         url('/assets/fonts/dm-sans/DMSans-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
*/
```

ثم اكتب الـ 4 blocks بنفس الشكل مع `src: url('/* PATH */') format('woff2')` كـ placeholder.

---

### القسم 2 — `:root` Typography Custom Properties

كل متغير يخص النص يُعرَّف هنا — منظم في مجموعات بتعليق واضح لكل مجموعة:

```css
:root {
  /* ===================================
     FONT FAMILIES
     =================================== */
  --font-heading-en: 'DM Sans', sans-serif;
  --font-body-en:    'Inter', sans-serif;
  --font-heading-ar: 'Cairo', sans-serif;
  --font-body-ar:    'IBM Plex Arabic', sans-serif;

  /* ===================================
     TYPE SCALE
     clamp(min, preferred, max) للـ responsive
     =================================== */
  --font-size-display: clamp(2.5rem, 5vw, 3.5rem);
  --font-size-h1:      2.25rem;
  --font-size-h2:      1.75rem;
  --font-size-h3:      1.375rem;
  --font-size-body:    1rem;
  --font-size-caption: 0.8rem;

  /* ===================================
     FONT WEIGHTS
     =================================== */
  /* ... */

  /* ===================================
     LINE HEIGHTS
     =================================== */
  /* ... */

  /* ===================================
     LETTER SPACING
     =================================== */
  /* ... */

  /* ===================================
     MEASURE (max-width للسطر)
     القيم مبنية على 65–75 حرف = القراءة المثلى
     =================================== */
  /* ... */

  /* ===================================
     PARAGRAPH SPACING
     =================================== */
  /* ... */
}
```

استخرج كل القيم من وثيقة الأسلوب المرفقة — لا تخترع قيماً غير موجودة فيها.
أضف `--font-measure-*` للـ `max-width` المثلى للسطر لكل نوع نص (body, caption, heading).

---

### القسم 3 — Language-Aware Font Assignment

```css
/* Default: English */
[data-lang="en"] body,
[data-lang="en"] * {
  font-family: var(--font-body-en);
}

[data-lang="en"] h1,
[data-lang="en"] h2,
[data-lang="en"] h3 {
  font-family: var(--font-heading-en);
}

/* Arabic */
[data-lang="ar"] body,
[data-lang="ar"] * {
  font-family: var(--font-body-ar);
  direction: rtl;
  text-align: right;
}

[data-lang="ar"] h1,
[data-lang="ar"] h2,
[data-lang="ar"] h3 {
  font-family: var(--font-heading-ar);
}
```

أكمل هذا القسم بشكل كامل يغطي:
- كل عناصر النص (h1–h3, p, caption, label, button)
- الـ `direction` و`text-align` للعربية
- أي تعديلات على الـ `line-height` للعربية إذا لزم (الخطوط العربية تحتاج line-height أكبر عادةً)

---

### القسم 4 — Base Typography Styles

تطبيق المتغيرات على العناصر الأساسية:

```css
/* Display */
.text-display { ... }

/* Headings */
h1 { ... }
h2 { ... }
h3 { ... }

/* Body */
p { ... }

/* Caption */
.text-caption { ... }
```

كل rule يستخدم المتغيرات فقط — لا قيم hardcoded.

---

## الملف الثاني — `typography-reference.md`

هيكل الملف:

### 1. جدول الخطوط
| الخط | اللغة | الدور | الأوزان المستخدمة | المصدر |
|------|-------|-------|-------------------|--------|

### 2. جدول Type Scale الكامل
| المستوى | المتغير | القيمة | الاستخدام | لا يُستخدم في |
|---------|---------|--------|-----------|---------------|

### 3. جدول الأوزان ومواضع استخدامها
| الوزن | المتغير | أين يُستخدم | مثال |
|-------|---------|------------|------|

### 4. قواعد تغيير اللغة
شرح موجز (5 نقاط) لكيفية عمل `[data-lang]` وما يتغير بين EN و AR.

### 5. قواعد لا تُخالَف
5 قواعد مستخلصة من وثيقة الأسلوب تخص الطباعة تحديداً — مع مثال صواب وخطأ لكل قاعدة.

---

## قواعد العمل

1. **كل قيمة مستخلصة من وثيقة الأسلوب** — لا اختراع
2. **لا قيم hardcoded في الـ base styles** — المتغيرات فقط
3. **الـ `font-display: swap` إلزامي** في كل `@font-face` block
4. **الـ `woff2` أولاً دائماً** — ثم `woff` كاحتياطي
5. **التعليقات بالإنجليزية** داخل الـ CSS — المصطلحات التقنية بالإنجليزية
6. **ملف الـ MD بالعربية** في الشرح والتحليل

---

أنتج الملفين كاملين بالترتيب: `typography.css` أولاً، ثم `typography-reference.md`.
لا تتوقف للاستئذان بين الملفين.

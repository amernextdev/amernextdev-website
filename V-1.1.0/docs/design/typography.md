# 📝 نظام Typography الكامل

## 🎯 الفلسفة

### المبدأ الأساسي
> **"الخط يجب أن يكون واضحًا، مقروءًا، وغير مرئي"**

الخط الجيد لا يلفت الانتباه لنفسه، بل يخدم المحتوى.

### القواعد الحاكمة

1. **القراءة قبل الجمال**
   - الوضوح > الإبداع
   - القراءة المريحة > التصميم المعقد
   - البساطة > التفاصيل الزائدة

2. **التسلسل الهرمي الواضح**
   - كل مستوى له حجم ووزن محدد
   - الفرق بين المستويات ملحوظ
   - لا تداخل في الأدوار

3. **الاتساق المطلق**
   - نفس الأحجام في كل الصفحات
   - نفس الأوزان لنفس العناصر
   - نفس المسافات دائمًا

---

## 🔤 اختيار الخطوط

### العربي: IBM Plex Sans Arabic

**لماذا؟**
- ✅ مصمم للشاشات الرقمية
- ✅ واضح في الأحجام الصغيرة
- ✅ احترافي بدون زخرفة
- ✅ يدعم العربية بشكل ممتاز
- ✅ Open Source

**البدائل المقبولة:**
- Cairo (لكن أقل حدة)
- Noto Sans Arabic (لكن أثقل قليلًا)

**البدائل المرفوضة:**
- خطوط زخرفية (كوفي، ديواني، إلخ)
- خطوط نحيفة جدًا (تصعب القراءة)
- خطوط مكثفة (تبدو ثقيلة)

### الإنجليزي: Inter

**لماذا؟**
- ✅ واحد من أفضل خطوط UI
- ✅ ممتاز للشاشات
- ✅ تباعد حروف محسّن
- ✅ أوزان متعددة بجودة عالية
- ✅ Open Source

**البدائل المقبولة:**
- Roboto
- Open Sans

**البدائل المرفوضة:**
- Arial (قديم، غير محسّن)
- Helvetica (لا يدعم Variable Fonts)
- خطوط Serif (Garamond, Times, etc.) - ثقيلة للويب

---

## ⚖️ الأوزان (Font Weights)

### الأوزان المستخدمة فقط

```css
--font-weight-normal: 400;    /* النص العادي */
--font-weight-medium: 500;    /* التمييز الخفيف */
--font-weight-semibold: 600;  /* العناوين */
```

### قواعد الاستخدام

**400 (Normal):**
- النصوص الأساسية (Paragraphs)
- الأوصاف
- القوائم
- المحتوى الطويل

**500 (Medium):**
- النصوص المميزة قليلًا
- أسماء الأقسام الصغيرة
- Labels في النماذج
- Navigation Links

**600 (Semibold):**
- العناوين (H1, H2, H3)
- أزرار CTA
- عناوين البطاقات
- أي شيء يحتاج تركيز

**❌ الأوزان المحظورة:**
- 100, 200, 300: نحيفة جدًا، صعبة القراءة
- 700, 800, 900: ثقيلة جدًا، عدوانية

---

## 📏 مقياس الأحجام (Type Scale)

### النظام المستخدم: Major Third (1.250)

**لماذا Major Third؟**
- توازن بين الوضوح والتسلسل
- ليس صغيرًا جدًا (1.125)
- ليس كبيرًا جدًا (1.333 أو 1.5)

### جدول الأحجام الكامل

```css
--text-xs: 0.75rem;      /* 12px - Captions */
--text-sm: 0.875rem;     /* 14px - Small text */
--text-base: 1rem;       /* 16px - Body text */
--text-lg: 1.125rem;     /* 18px - Lead paragraphs */
--text-xl: 1.25rem;      /* 20px - H4 */
--text-2xl: 1.563rem;    /* 25px - H3 */
--text-3xl: 1.953rem;    /* 31.25px - H2 */
--text-4xl: 2.441rem;    /* 39px - H1 */
--text-5xl: 3.052rem;    /* 48.8px - Hero titles */
```

### متى يُستخدم كل حجم؟

**xs (12px):**
- Timestamps
- Copyright notices
- Form helper text
- Very small captions

**sm (14px):**
- Secondary descriptions
- Metadata
- Tags
- Small labels

**base (16px):**
- **الحجم الافتراضي للنصوص**
- Paragraphs
- List items
- Form inputs

**lg (18px):**
- Lead paragraphs (الفقرة الافتتاحية)
- Important descriptions
- Subheadings

**xl (20px):**
- H4
- Section titles

**2xl (25px):**
- H3
- Medium headings

**3xl (31px):**
- H2
- Page section headings

**4xl (39px):**
- H1
- Main page title

**5xl (48px):**
- Hero section main title
- استخدام محدود جدًا

---

## 📐 Line Height (المسافة بين الأسطر)

### القاعدة العامة

```
Line Height = Font Size × Multiplier
```

### المضاعفات حسب نوع النص

**العناوين (Headings):**
```css
line-height: 1.2;
```
- أقل مسافة
- للتركيز والقوة
- H1, H2, H3, H4

**النصوص القصيرة:**
```css
line-height: 1.5;
```
- متوازن
- Labels، Descriptions
- Navigation

**النصوص الطويلة (Paragraphs):**
```css
line-height: 1.7;
```
- أكثر راحة للقراءة
- يمنع التداخل البصري
- Body text

**Code blocks:**
```css
line-height: 1.6;
```
- واضح بدون أن يكون فارغًا

---

## 🔤 Letter Spacing

### القاعدة الأساسية
> **معظم الخطوط الحديثة لا تحتاج تعديل Letter Spacing**

### الحالات النادرة للتعديل

**العناوين الكبيرة جدًا:**
```css
.hero-title {
  font-size: var(--text-5xl);
  letter-spacing: -0.02em; /* ضغط خفيف */
}
```

**النصوص بالـ Uppercase:**
```css
.section-label {
  text-transform: uppercase;
  letter-spacing: 0.05em; /* توسيع للوضوح */
}
```

**⚠️ تحذير:**  
لا تعدل letter-spacing بدون سبب واضح ومرئي.

---

## 📱 Responsive Typography

### استراتيجية: Fluid Typography

بدلًا من Breakpoints كثيرة، نستخدم `clamp()`:

```css
.h1 {
  font-size: clamp(2rem, 4vw + 1rem, 2.441rem);
}
```

**الفكرة:**
- حد أدنى: 2rem (32px)
- حد أقصى: 2.441rem (39px)
- يتغير بسلاسة بين الاثنين

### مثال كامل للعناوين

```css
h1 {
  font-size: clamp(2rem, 4vw + 1rem, 2.441rem);
  line-height: 1.2;
  font-weight: 600;
}

h2 {
  font-size: clamp(1.75rem, 3vw + 0.75rem, 1.953rem);
  line-height: 1.2;
  font-weight: 600;
}

h3 {
  font-size: clamp(1.5rem, 2.5vw + 0.5rem, 1.563rem);
  line-height: 1.2;
  font-weight: 600;
}

h4 {
  font-size: clamp(1.25rem, 2vw + 0.25rem, 1.25rem);
  line-height: 1.3;
  font-weight: 600;
}
```

### Breakpoints إضافية (إذا لزم الأمر)

```css
/* Mobile First */
:root {
  --text-base: 0.875rem; /* 14px */
}

@media (min-width: 640px) {
  :root {
    --text-base: 1rem; /* 16px */
  }
}
```

---

## 🎨 تطبيقات عملية

### 1. Hero Section

```css
.hero__title {
  font-family: var(--font-arabic);
  font-size: var(--text-5xl);
  font-weight: 600;
  line-height: 1.1;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.hero__subtitle {
  font-family: var(--font-arabic);
  font-size: var(--text-lg);
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
}
```

### 2. Section Heading

```css
.section__title {
  font-size: var(--text-3xl);
  font-weight: 600;
  line-height: 1.2;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.section__description {
  font-size: var(--text-base);
  font-weight: 400;
  line-height: 1.7;
  color: var(--text-secondary);
}
```

### 3. Card Component

```css
.card__title {
  font-size: var(--text-xl);
  font-weight: 600;
  line-height: 1.3;
  color: var(--text-primary);
}

.card__description {
  font-size: var(--text-base);
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-top: 0.5rem;
}

.card__meta {
  font-size: var(--text-sm);
  font-weight: 400;
  color: var(--text-muted);
  margin-top: 0.75rem;
}
```

### 4. Button

```css
.btn {
  font-size: var(--text-base);
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.01em;
}

.btn--large {
  font-size: var(--text-lg);
  font-weight: 600;
}

.btn--small {
  font-size: var(--text-sm);
  font-weight: 500;
}
```

### 5. Form Elements

```css
.label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.input {
  font-size: var(--text-base);
  font-weight: 400;
  line-height: 1.5;
  color: var(--text-primary);
}

.input::placeholder {
  color: var(--text-muted);
}

.helper-text {
  font-size: var(--text-xs);
  color: var(--text-muted);
  margin-top: 0.25rem;
}
```

---

## ✅ Typography Checklist

قبل اعتماد أي نص، تأكد من:

- [ ] **الوضوح:** هل النص مقروء بسهولة؟
- [ ] **التباين:** هل هناك تباين كافٍ مع الخلفية؟
- [ ] **التسلسل:** هل الأحجام تعكس الأهمية بوضوح؟
- [ ] **الاتساق:** هل نفس العنصر له نفس التنسيق في كل مكان؟
- [ ] **Line Height:** هل مريح للعين؟
- [ ] **Font Weight:** هل مناسب للسياق؟

---

## 🚫 الأخطاء الشائعة (Anti-Patterns)

### ❌ الخطأ 1: استخدام أحجام عشوائية

```css
/* ممنوع */
.title { font-size: 23px; }
.subtitle { font-size: 17px; }
```

**الصحيح:**
```css
.title { font-size: var(--text-2xl); }
.subtitle { font-size: var(--text-lg); }
```

### ❌ الخطأ 2: Line Height قليل جدًا

```css
/* ممنوع */
p { line-height: 1.2; }
```

**الصحيح:**
```css
p { line-height: 1.7; }
```

### ❌ الخطأ 3: أوزان كثيرة

```css
/* ممنوع */
.title-1 { font-weight: 700; }
.title-2 { font-weight: 600; }
.title-3 { font-weight: 500; }
.text { font-weight: 400; }
.light { font-weight: 300; }
```

**الصحيح:**
```css
h1, h2, h3 { font-weight: 600; }
p { font-weight: 400; }
```

### ❌ الخطأ 4: عناوين طويلة بدون line-height كافٍ

```css
/* ممنوع */
h1 {
  font-size: 48px;
  line-height: 1;
}
```

**الصحيح:**
```css
h1 {
  font-size: var(--text-5xl);
  line-height: 1.2;
}
```

---

## 📦 ملف CSS كامل

سيتم إرفاق ملف `typography.css` يحتوي على:
- CSS Variables لكل الأحجام
- Classes جاهزة للاستخدام
- Utility classes
- Responsive typography

---

## 🎯 الخلاصة

**Typography الناجح:**
- ✅ واضح ومقروء
- ✅ متسق في كل مكان
- ✅ يحترم التسلسل الهرمي
- ✅ responsive بشكل طبيعي
- ✅ يخدم المحتوى، لا ينافسه

**المبدأ النهائي:**
> إذا لاحظ الزائر الخط نفسه، فهناك مشكلة.  
> الخط الجيد يختفي ويترك المحتوى يتحدث.

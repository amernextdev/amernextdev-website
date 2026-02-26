# 📚 الدليل المرجعي الشامل | Portfolio Complete Reference
**نسخة مختصرة للاستخدام مع وكلاء الذكاء الاصطناعي**

---

## 🎯 الفلسفة العامة للمشروع

### المبادئ الأساسية
1. **الوضوح > الإبهار** - المعلومة الواضحة أفضل من التصميم البراق
2. **البساطة المتقنة** - كل عنصر له سبب، لا عشوائية
3. **الاحترام > الإلحاح** - نوجه الزائر بهدوء، لا ندفعه بقوة
4. **الفلترة > الإقناع** - نريد العميل المناسب، لا أي عميل

### النبرة المطلوبة
- هادئة، واثقة (بدون غرور)
- مباشرة، احترافية (بدون تعقيد)
- صادقة (بدون مبالغة أو تواضع مبالغ)

---

## 🎨 نظام الألوان

### الفلسفة
> "الألوان للوظيفة، ليس للزينة"

### الوضع الداكن (افتراضي)

```css
/* خلفيات */
--bg-primary: #0a0a0a;        /* الخلفية الرئيسية */
--bg-secondary: #141414;      /* بطاقات وأقسام */
--bg-tertiary: #1a1a1a;       /* عناصر متداخلة */
--surface-raised: #1f1f1f;    /* Header, Footer, Modals */

/* نصوص */
--text-primary: #e5e5e5;      /* النص الرئيسي - WCAG AAA */
--text-secondary: #a3a3a3;    /* النص الثانوي - WCAG AA */
--text-muted: #737373;        /* نص خفيف */
--text-inverted: #0a0a0a;     /* نص على أزرار ملونة */

/* حدود */
--border-primary: #2a2a2a;    /* الحدود الأساسية */
--border-secondary: #1f1f1f;  /* حدود ثانوية */
--border-accent: #3a3a3a;     /* حدود مميزة */

/* لون مميز (Accent) - استخدام محدود جدًا */
--accent-primary: #3b82f6;    /* للأزرار والروابط فقط */
--accent-hover: #2563eb;
--accent-pressed: #1d4ed8;
--accent-subtle: rgba(59, 130, 246, 0.1);
--accent-text: #60a5fa;

/* ألوان دلالية */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;
```

### الوضع الفاتح

```css
/* خلفيات */
--bg-primary: #ffffff;
--bg-secondary: #f5f5f5;
--bg-tertiary: #ebebeb;
--surface-raised: #fafafa;

/* نصوص */
--text-primary: #0a0a0a;
--text-secondary: #525252;
--text-muted: #737373;
--text-inverted: #ffffff;

/* حدود */
--border-primary: #d4d4d4;
--border-secondary: #e5e5e5;
--border-accent: #b8b8b8;

/* Accent (نفسه في الوضعين) */
--accent-primary: #3b82f6;
--accent-hover: #2563eb;
--accent-text: #2563eb; /* أغمق في الوضع الفاتح */
```

### قواعد استخدام Accent

**✅ مسموح:**
- Primary CTA Buttons
- Link hover states
- Active tab indicators
- Focus rings
- Selected item indicators

**❌ ممنوع:**
- العناوين العادية (H1, H2, H3)
- نصوص Paragraphs
- خلفيات كبيرة
- استخدام زخرفي

### التوزيع المثالي
- **90%** من الموقع: خلفيات رمادية داكنة + نصوص فاتحة
- **9%**: تفاصيل إضافية
- **1%**: Accent للتفاعل فقط

---

## 📝 نظام الخطوط (Typography)

### الخطوط المستخدمة

```css
--font-arabic: 'IBM Plex Sans Arabic', system-ui, sans-serif;
--font-english: 'Inter', system-ui, sans-serif;
```

**لماذا هذه الخطوط؟**
- واضحة ومقروءة على الشاشات
- احترافية بدون زخرفة
- Open Source

### الأوزان (3 فقط)

```css
--font-weight-normal: 400;      /* نصوص عادية */
--font-weight-medium: 500;      /* تمييز خفيف، Labels */
--font-weight-semibold: 600;    /* عناوين، أزرار CTA */
```

**❌ ممنوع:** أوزان أقل من 400 أو أكثر من 600

### مقياس الأحجام (Major Third 1.250)

```css
--text-xs: 0.75rem;       /* 12px - Captions صغيرة */
--text-sm: 0.875rem;      /* 14px - نصوص ثانوية */
--text-base: 1rem;        /* 16px - النص الأساسي */
--text-lg: 1.125rem;      /* 18px - فقرات افتتاحية */
--text-xl: 1.25rem;       /* 20px - H4 */
--text-2xl: 1.563rem;     /* 25px - H3 */
--text-3xl: 1.953rem;     /* 31px - H2 */
--text-4xl: 2.441rem;     /* 39px - H1 */
--text-5xl: 3.052rem;     /* 49px - عناوين Hero */
```

### Line Heights

```css
/* عناوين */ 
line-height: 1.2;

/* نصوص قصيرة */ 
line-height: 1.5;

/* فقرات طويلة */ 
line-height: 1.7;
```

### قواعد Typography
- ❌ ممنوع أحجام عشوائية - استخدم المتغيرات دائمًا
- ✅ العناوين: حجم كبير + وزن 600 + line-height 1.2
- ✅ الفقرات: حجم base + وزن 400 + line-height 1.7

---

## ✍️ قواعد كتابة المحتوى

### المبدأ الأساسي
> "كل كلمة لها وظيفة. إذا لم يكن لها وظيفة، احذفها."

### القواعد الذهبية

1. **البساطة**
   ```
   ✅ "أبني تطبيقات ويب موثوقة"
   ❌ "أقوم بتطوير حلول برمجية متكاملة ومبتكرة"
   ```

2. **التحديد**
   ```
   ✅ "خبرة 5 سنوات في Full-Stack Development"
   ❌ "خبرة واسعة في البرمجة"
   ```

3. **الصدق**
   ```
   ✅ "أعمل على مشاريع متوسطة إلى كبيرة"
   ❌ "أستطيع بناء أي شيء!"
   ```

4. **الإيجاز**
   - جمل قصيرة: 15-20 كلمة كحد أقصى
   - فقرات قصيرة: 2-3 أسطر
   - لا حشو، لا تكرار

### الكلمات الممنوعة نهائيًا

```
❌ "الأفضل" "الأقوى" "الأسرع"
❌ "الحل السحري" "نتائج مضمونة"
❌ "استثنائي" "مذهل" "رائع"
❌ "خبير" (استبدلها بـ "خبرة X سنوات")
```

### البدائل الصحيحة

```
✅ "موثوق" بدلاً من "استثنائي"
✅ "خبرة 5 سنوات" بدلاً من "خبير"
✅ "نتائج قابلة للقياس" بدلاً من "نتائج مذهلة"
```

### صيغة العنوان الرئيسي (H1)

**القالب:**
```
[الفعل] + [الشيء] + [الصفة الوظيفية]
```

**أمثلة جيدة:**
```
✅ "أبني أنظمة ويب موثوقة وقابلة للتوسع"
✅ "أطور تطبيقات ويب للشركات الجادة"
```

**أمثلة سيئة:**
```
❌ "مرحبًا، أنا أحمد!"
❌ "أفضل مطور ويب"
```

---

## 🗺️ بنية الصفحات وتجربة المستخدم

### الصفحة الرئيسية (Home)

**الأقسام بالترتيب:**

1. **Hero Section**
   ```
   H1: العنوان الرئيسي (من أنت + ماذا تفعل)
   Subtitle: لمن؟ لماذا؟
   CTA: [اعرف المزيد عن خدماتي]
   ```

2. **Value Proposition**
   ```
   H2: "لماذا أعمل بطريقة مختلفة؟"
   3-4 نقاط قوة مختصرة
   CTA: [شاهد أمثلة من أعمالي]
   ```

3. **الخدمات (نظرة سريعة)**
   ```
   H2: "ماذا أقدم؟"
   3 بطاقات رئيسية
   CTA: [المزيد عن الخدمات]
   ```

4. **الأعمال (عينة)**
   ```
   H2: "أمثلة من أعمالي"
   2-3 مشاريع مميزة
   CTA: [شاهد كل الأعمال]
   ```

5. **CTA نهائي**
   ```
   H2: "هل لديك مشروع؟"
   Subtitle: "دعنا نناقشه"
   CTA: [ابدأ المحادثة]
   ```

### صفحة الخدمات (Services)

1. مقدمة قصيرة
2. الخدمات التفصيلية (3-4 خدمات)
   - عنوان
   - وصف
   - ما يشمل
   - التقنيات المستخدمة
3. العملية (Process):
   - الاكتشاف (Discovery)
   - التخطيط (Planning)
   - التطوير (Development)
   - الاختبار (Testing)
   - الإطلاق (Launch)
   - الدعم (Support)
4. CTA

### صفحة الأعمال (Projects)

1. مقدمة
2. بطاقات المشاريع (4-6 مشاريع)
3. لكل مشروع صفحة Case Study:
   ```
   - نوع المشروع
   - المشكلة (1-2 جملة)
   - الحل (2-3 جمل)
   - التقنيات (قائمة بسيطة)
   - النتيجة (أرقام إن وجدت)
   ```

### صفحة من أنا (About)

1. مقدمة شخصية (احترافية فقط)
2. الخبرة (سنوات، مجالات، تقنيات)
3. الأسلوب (المبادئ والقيم)
4. CTA

### صفحة التواصل (Contact)

1. مقدمة
2. **النموذج (حقول أساسية فقط):**
   - الاسم *
   - البريد الإلكتروني *
   - نوع المشروع * (قائمة منسدلة)
   - الميزانية التقديرية * (قائمة منسدلة - للفلترة)
   - تفاصيل المشروع * (50 حرف كحد أدنى)
   - توضيح: "سأرد خلال 24-48 ساعة"
3. FAQ (3-5 أسئلة شائعة)
4. طرق تواصل بديلة (بريد، LinkedIn فقط)

### صفحة الشكر (Thank You)

```
[أيقونة Success]
"شكرًا لتواصلك!"

ماذا يحدث الآن؟
1. سأراجع تفاصيل مشروعك خلال 24 ساعة
2. إذا كان المشروع مناسبًا، سأرد عبر البريد الإلكتروني
3. سنحدد موعدًا لمكالمة أولية (15-30 دقيقة)

[العودة للصفحة الرئيسية]
```

---

## 🎨 المكونات الأساسية (Components)

### Button Styles

```css
/* Primary Button */
.btn-primary {
  background: var(--accent-primary);
  color: var(--text-inverted);
  font-size: var(--text-base);
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
}

.btn-primary:hover {
  background: var(--accent-hover);
}

.btn-primary:active {
  background: var(--accent-pressed);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
}

.btn-secondary:hover {
  background: var(--surface-overlay);
  border-color: var(--border-accent);
}
```

### Card Component

```css
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.card__title {
  font-size: var(--text-xl);
  font-weight: 600;
  line-height: 1.3;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.card__description {
  font-size: var(--text-base);
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
}

.card__meta {
  font-size: var(--text-sm);
  color: var(--text-muted);
  margin-top: 0.75rem;
}
```

### Header

```html
<header class="header">
  <div class="container">
    <nav class="nav">
      <a href="/" class="logo">
        <img src="/assets/images/logo/logo-icon.svg" alt="Logo">
      </a>
      <ul class="nav__links">
        <li><a href="/">الرئيسية</a></li>
        <li><a href="/services.html">الخدمات</a></li>
        <li><a href="/projects.html">الأعمال</a></li>
        <li><a href="/about.html">من أنا</a></li>
        <li><a href="/contact.html">التواصل</a></li>
      </ul>
      <button class="theme-toggle" aria-label="تبديل الوضع">
        <!-- أيقونة الوضع -->
      </button>
    </nav>
  </div>
</header>
```

```css
.header {
  background: var(--surface-raised);
  border-bottom: 1px solid var(--border-primary);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav__links a {
  color: var(--text-primary);
  font-weight: 500;
  text-decoration: none;
}

.nav__links a:hover {
  color: var(--accent-primary);
}

.nav__links a.active {
  color: var(--accent-primary);
}
```

### Footer

```css
.footer {
  background: var(--surface-raised);
  border-top: 1px solid var(--border-primary);
  padding: 2rem 0;
  margin-top: 4rem;
}

.footer__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer__copyright {
  color: var(--text-muted);
  font-size: var(--text-sm);
}

.footer__links a {
  color: var(--text-secondary);
  margin-left: 1rem;
}

.footer__links a:hover {
  color: var(--accent-primary);
}
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile First */
/* الأحجام الصغيرة أولاً */

@media (min-width: 640px) {
  /* Tablet */
}

@media (min-width: 1024px) {
  /* Desktop */
}
```

### Container

```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .container {
    padding: 0 2rem;
  }
}
```

### Typography Responsive

```css
/* استخدام clamp للأحجام المتجاوبة */
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
```

---

## 💻 البنية التقنية

### هيكل المجلدات

```
/
├── index.html
├── services.html
├── projects.html
├── about.html
├── contact.html
├── thank-you.html
├── 404.html
├── /assets
│   ├── /css
│   │   ├── variables.css
│   │   ├── reset.css
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   └── /pages
│   │       ├── home.css
│   │       ├── services.css
│   │       ├── projects.css
│   │       ├── about.css
│   │       └── contact.css
│   ├── /js
│   │   ├── header-loader.js
│   │   ├── footer-loader.js
│   │   ├── theme-switcher.js
│   │   └── form-handler.js
│   ├── /images
│   │   ├── /logo
│   │   └── /projects
│   └── /fonts
│       ├── /inter
│       └── /ibm-plex-sans-arabic
└── /components
    ├── header.html
    └── footer.html
```

### ترتيب تحميل CSS

```html
<head>
  <!-- 1. Reset -->
  <link rel="stylesheet" href="/assets/css/reset.css">
  
  <!-- 2. Variables (Colors, Typography) -->
  <link rel="stylesheet" href="/assets/css/variables.css">
  
  <!-- 3. Base -->
  <link rel="stylesheet" href="/assets/css/base.css">
  
  <!-- 4. Layout -->
  <link rel="stylesheet" href="/assets/css/layout.css">
  
  <!-- 5. Components -->
  <link rel="stylesheet" href="/assets/css/components.css">
  
  <!-- 6. Page-specific -->
  <link rel="stylesheet" href="/assets/css/pages/home.css">
</head>
```

---

## 🎯 قواعد UX الأساسية

### الثواني الأولى (Hero Section)

**الزائر يسأل:** "هل أنا في المكان الصحيح؟"

**يجب أن يرى فورًا:**
1. من أنت - بوضوح
2. ماذا تقدم - جملة واحدة
3. هل أنت مناسب له - ضمنيًا

### مسارات الزائر

**المسار السريع (Decision-Ready):**
```
الرئيسية → الخدمات → التواصل
```

**المسار البحثي (Research Mode):**
```
الرئيسية → الأعمال → من أنا → الخدمات → التواصل
```

### Micro-Interactions

```css
/* Smooth Scrolling */
html {
  scroll-behavior: smooth;
}

/* Hover States */
.btn:hover {
  transform: translateY(-2px);
  transition: all 0.2s ease;
}

/* Focus States */
*:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}
```

---

## ✅ Checklist الجودة

### قبل كتابة أي كود

- [ ] هل قرأت الدليل بالكامل؟
- [ ] هل فهمت الفلسفة العامة؟
- [ ] هل لديك المحتوى جاهز؟

### أثناء التطوير

- [ ] استخدام المتغيرات (CSS Variables) دائمًا
- [ ] عدم استخدام أحجام أو ألوان ثابتة
- [ ] التباين يحقق WCAG AA على الأقل
- [ ] كل نص واضح ومقروء
- [ ] لا مبالغات في المحتوى

### قبل الإطلاق

- [ ] كل الروابط تعمل
- [ ] النماذج ترسل
- [ ] Responsive على كل الأجهزة
- [ ] Theme switcher يعمل
- [ ] لا أخطاء في Console
- [ ] Lighthouse Score > 90
- [ ] Alt text لكل الصور
- [ ] Meta tags كاملة

---

## 🚫 الممنوعات (Anti-Patterns)

### التصميم
```
❌ ألوان براقة أو تدرجات
❌ استخدام Accent في كل مكان
❌ أحجام خطوط عشوائية
❌ تباين ضعيف
❌ خطوط نحيفة (< 400) أو ثقيلة جدًا (> 600)
```

### المحتوى
```
❌ "الأفضل" "الأقوى" "المذهل"
❌ قوائم طويلة بدون داعٍ
❌ فقرات طويلة (أكثر من 3 أسطر)
❌ عدم وضوح الـ CTA
❌ ادعاءات مبالغ فيها
```

### UX
```
❌ Pop-ups مزعجة
❌ CTAs كثيرة في كل قسم
❌ نماذج طويلة ومعقدة
❌ عدم توضيح ما يحدث بعد الإرسال
```

### التقني
```
❌ استخدام \n بدلاً من عناصر منفصلة
❌ ألوان ثابتة بدلاً من المتغيرات
❌ عدم اختبار على متصفحات مختلفة
❌ صور غير مضغوطة
❌ عدم استخدام Semantic HTML
```

---

## 📊 أمثلة كود كاملة

### Hero Section

```html
<section class="hero">
  <div class="container">
    <h1 class="hero__title">
      أبني أنظمة ويب موثوقة وقابلة للتوسع
    </h1>
    <p class="hero__subtitle">
      للشركات التي تبحث عن حلول تقنية طويلة المدى،
      وليس مجرد تنفيذ سريع.
    </p>
    <a href="/services.html" class="btn btn-primary">
      اعرف المزيد عن خدماتي
    </a>
  </div>
</section>
```

```css
.hero {
  padding: 4rem 0;
  text-align: center;
}

.hero__title {
  font-size: var(--text-5xl);
  font-weight: 600;
  line-height: 1.2;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.hero__subtitle {
  font-size: var(--text-lg);
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto 2rem;
}
```

### Project Card

```html
<article class="project-card">
  <img src="/assets/images/projects/project-1.jpg" 
       alt="Project Name" 
       class="project-card__image">
  <div class="project-card__content">
    <h3 class="project-card__title">اسم المشروع</h3>
    <p class="project-card__description">
      وصف مختصر للمشروع في 2-3 أسطر.
    </p>
    <div class="project-card__tags">
      <span class="tag">React</span>
      <span class="tag">Node.js</span>
      <span class="tag">PostgreSQL</span>
    </div>
    <a href="/projects/project-1.html" class="project-card__link">
      اقرأ المزيد →
    </a>
  </div>
</article>
```

```css
.project-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: var(--border-accent);
}

.project-card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.project-card__content {
  padding: 1.5rem;
}

.project-card__title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.project-card__description {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.project-card__tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  background: var(--bg-tertiary);
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
}

.project-card__link {
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
}

.project-card__link:hover {
  color: var(--accent-primary);
}
```

### Contact Form

```html
<form class="contact-form" id="contactForm">
  <div class="form-group">
    <label for="name" class="form-label">الاسم *</label>
    <input 
      type="text" 
      id="name" 
      name="name" 
      class="form-input"
      required
      placeholder="اسمك الكامل"
    >
  </div>

  <div class="form-group">
    <label for="email" class="form-label">البريد الإلكتروني *</label>
    <input 
      type="email" 
      id="email" 
      name="email" 
      class="form-input"
      required
      placeholder="email@example.com"
    >
  </div>

  <div class="form-group">
    <label for="project-type" class="form-label">نوع المشروع *</label>
    <select id="project-type" name="project-type" class="form-select" required>
      <option value="">اختر نوع المشروع</option>
      <option value="web-app">تطبيق ويب</option>
      <option value="dashboard">Dashboard / Admin Panel</option>
      <option value="api">API Development</option>
      <option value="other">آخر</option>
    </select>
  </div>

  <div class="form-group">
    <label for="message" class="form-label">تفاصيل المشروع *</label>
    <textarea 
      id="message" 
      name="message" 
      rows="6"
      class="form-textarea"
      required
      placeholder="اشرح مشروعك بإيجاز..."
    ></textarea>
    <p class="form-helper">على الأقل 50 حرف</p>
  </div>

  <button type="submit" class="btn btn-primary">
    إرسال الرسالة
  </button>

  <p class="form-note">
    سأراجع رسالتك وأرد خلال 24-48 ساعة
  </p>
</form>
```

```css
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  font-size: var(--text-base);
  font-weight: 400;
  color: var(--text-primary);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: 0.375rem;
  padding: 0.75rem 1rem;
  font-family: var(--font-arabic);
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px var(--accent-subtle);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: var(--text-muted);
}

.form-helper {
  font-size: var(--text-xs);
  color: var(--text-muted);
  margin-top: 0.25rem;
}

.form-note {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  text-align: center;
  margin-top: 1rem;
}
```

---

## 🎯 للاستخدام مع الذكاء الاصطناعي

### عند طلب تصميم أو كود

**استخدم هذا التنسيق:**

```
أرفق هذا الدليل واطلب:

"استخدم هذا الدليل كمرجع أساسي. التزم بـ:
- نظام الألوان (Dark Mode افتراضي)
- نظام الخطوط (IBM Plex Arabic + Inter)
- أسلوب الكتابة (بدون مبالغة)
- قواعد UX (وضوح، بساطة، احترام)

المطلوب: [اذكر ما تريده بالتحديد]"
```

### أمثلة طلبات

**مثال 1:**
```
استخدم الدليل المرفق وأنشئ Hero Section للصفحة الرئيسية.
التزم بنظام الألوان والخطوط المحدد.
```

**مثال 2:**
```
بناءً على الدليل المرفق، أنشئ صفحة Services كاملة بـ HTML و CSS.
اتبع بنية الصفحات المذكورة وأسلوب الكتابة.
```

**مثال 3:**
```
استخدم الدليل وأنشئ مكون Project Card responsive.
التزم بنظام الألوان وقواعد Typography.
```

---

## 📝 ملاحظات نهائية

### تذكر دائمًا

1. **الوضوح أولاً** - قبل الجمال
2. **البساطة قوة** - لا تعقيد
3. **كل شيء له سبب** - لا عشوائية
4. **الاتساق مطلق** - في كل مكان
5. **الصدق فوق الإقناع** - بدون مبالغة

### المبدأ الشامل
> "موقع بسيط، متقن، صادق، يخدم العميل المناسب"

---

**آخر تحديث:** فبراير 2025  
**الإصدار:** 1.0 - النسخة المرجعية الشاملة

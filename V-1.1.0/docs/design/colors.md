# 🎨 نظام الألوان الكامل | Full Color System

## 📐 فلسفة الألوان

### المبدأ الأساسي
> **"الألوان هنا ليست للزينة، بل لخدمة القراءة، الوضوح، والتركيز"**

### القواعد الحاكمة

1. **الهدوء قبل الإثارة**
   - لا ألوان صاخبة
   - لا تدرجات براقة (Gradients)
   - لا تأثيرات بصرية مشتتة

2. **التباين للقراءة**
   - كل نص يجب أن يكون مقروءًا
   - WCAG AA كحد أدنى
   - WCAG AAA مفضل

3. **اللون المميز (Accent) نادر**
   - يستخدم فقط للتفاعل
   - لا يُستخدم في النصوص العادية
   - لا يُستخدم في الخلفيات الكبيرة

---

## 🌙 الوضع الداكن (Dark Mode) - الافتراضي

### Background Colors

#### Primary Background
```
--bg-primary: #0a0a0a
```
**الاستخدام:** الخلفية الأساسية للصفحة  
**السبب:** أسود عميق لكن ليس #000000 الخالص (يسبب إجهاد)

#### Secondary Background
```
--bg-secondary: #141414
```
**الاستخدام:** الأقسام المتباينة، Cards، Sections  
**السبب:** تباين خفيف عن Primary لكن لا يزال داكن

#### Tertiary Background
```
--bg-tertiary: #1a1a1a
```
**الاستخدام:** Elements داخل Cards، Nested Components  
**السبب:** طبقة ثالثة للتسلسل الهرمي

### Surface Colors

#### Surface Raised
```
--surface-raised: #1f1f1f
```
**الاستخدام:** Header، Footer، Modals، Dropdowns  
**السبب:** عناصر "مرفوعة" فوق المحتوى

#### Surface Overlay
```
--surface-overlay: rgba(255, 255, 255, 0.05)
```
**الاستخدام:** Hover states، Focus backgrounds  
**السبب:** تأثير خفيف جدًا للتفاعل

### Border Colors

#### Border Primary
```
--border-primary: #2a2a2a
```
**الاستخدام:** الحدود الأساسية، Dividers  
**السبب:** مرئي لكن غير قاسي

#### Border Secondary
```
--border-secondary: #1f1f1f
```
**الاستخدام:** حدود ثانوية، Subtle separators  
**السبب:** أخف من Primary

#### Border Accent
```
--border-accent: #3a3a3a
```
**الاستخدام:** عند الحاجة لإبراز حد معين (Focused input)  
**السبب:** أقوى قليلًا من Primary

### Text Colors

#### Text Primary
```
--text-primary: #e5e5e5
```
**الاستخدام:** النصوص الأساسية، العناوين الرئيسية  
**السبب:** أبيض مريح، ليس #ffffff الساطع

#### Text Secondary
```
--text-secondary: #a3a3a3
```
**الاستخدام:** النصوص الثانوية، Descriptions، Metadata  
**السبب:** رمادي متوسط للتسلسل الهرمي

#### Text Muted
```
--text-muted: #737373
```
**الاستخدام:** Captions، Placeholders، Disabled text  
**السبب:** خفيف لكن لا يزال مقروء

#### Text Inverted
```
--text-inverted: #0a0a0a
```
**الاستخدام:** نص على أزرار ملونة أو خلفيات فاتحة  
**السبب:** يطابق الخلفية الداكنة الأساسية

---

## ☀️ الوضع الفاتح (Light Mode) - الثانوي

### Background Colors

#### Primary Background
```
--bg-primary-light: #ffffff
```
**الاستخدام:** الخلفية الأساسية

#### Secondary Background
```
--bg-secondary-light: #f5f5f5
```
**الاستخدام:** Sections، Cards

#### Tertiary Background
```
--bg-tertiary-light: #ebebeb
```
**الاستخدام:** Nested components

### Surface Colors

#### Surface Raised
```
--surface-raised-light: #fafafa
```
**الاستخدام:** Header، Footer، Elevated elements

#### Surface Overlay
```
--surface-overlay-light: rgba(0, 0, 0, 0.03)
```
**الاستخدام:** Hover، Focus backgrounds

### Border Colors

#### Border Primary
```
--border-primary-light: #d4d4d4
```
**الاستخدام:** الحدود الأساسية

#### Border Secondary
```
--border-secondary-light: #e5e5e5
```
**الاستخدام:** حدود ثانوية

#### Border Accent
```
--border-accent-light: #b8b8b8
```
**الاستخدام:** Focused borders

### Text Colors

#### Text Primary
```
--text-primary-light: #0a0a0a
```
**الاستخدام:** النصوص الأساسية

#### Text Secondary
```
--text-secondary-light: #525252
```
**الاستخدام:** النصوص الثانوية

#### Text Muted
```
--text-muted-light: #737373
```
**الاستخدام:** Captions، Placeholders

#### Text Inverted
```
--text-inverted-light: #ffffff
```
**الاستخدام:** نص على خلفيات داكنة

---

## 🎯 نظام Accent (اللون المميز)

### الفلسفة
اللون المميز هو **أداة توجيه** وليس عنصر جمالي.

### القاعدة الذهبية
> **إذا لم يكن تفاعليًا، فلا تستخدم Accent**

### Accent Primary
```
--accent-primary: #3b82f6
```
**الاستخدام:**
- Primary CTA Buttons
- Links (عند الحاجة)
- Active states

**⛔ ممنوع استخدامه في:**
- عناوين عادية
- نصوص طويلة
- خلفيات كبيرة

### Accent Hover
```
--accent-hover: #2563eb
```
**الاستخدام:** Hover state للأزرار والروابط

### Accent Pressed
```
--accent-pressed: #1d4ed8
```
**الاستخدام:** Active/Pressed state

### Accent Subtle
```
--accent-subtle: rgba(59, 130, 246, 0.1)
```
**الاستخدام:** خلفيات خفيفة للعناصر المميزة (Selected item)

### Accent Text
```
--accent-text: #60a5fa
```
**الاستخدام:** نص Accent في الوضع الداكن (أفتح قليلًا للقراءة)

---

## 🚨 Semantic Colors (ألوان الحالات)

### Success
```
--success: #10b981
--success-bg: rgba(16, 185, 129, 0.1)
--success-border: rgba(16, 185, 129, 0.3)
```

### Warning
```
--warning: #f59e0b
--warning-bg: rgba(245, 158, 11, 0.1)
--warning-border: rgba(245, 158, 11, 0.3)
```

### Error
```
--error: #ef4444
--error-bg: rgba(239, 68, 68, 0.1)
--error-border: rgba(239, 68, 68, 0.3)
```

### Info
```
--info: #3b82f6
--info-bg: rgba(59, 130, 246, 0.1)
--info-border: rgba(59, 130, 246, 0.3)
```

**⚠️ ملاحظة مهمة:**  
هذه الألوان تُستخدم فقط للحالات والرسائل، **وليس للتصميم العام**.

---

## 📏 قواعد الاستخدام

### 1. التسلسل الهرمي (Hierarchy)

**للخلفيات:**
```
Primary → Secondary → Tertiary → Surface
```

**للنصوص:**
```
Primary → Secondary → Muted
```

**للحدود:**
```
Primary → Secondary → (Accent عند الضرورة)
```

### 2. التباين (Contrast)

**قاعدة إلزامية:**
- نص Primary على خلفية Primary: يجب أن يحقق WCAG AA (4.5:1)
- نص Secondary على خلفية Primary: يجب أن يحقق WCAG AA (4.5:1)
- نص Muted على خلفية Primary: على الأقل 3:1 (للعناصر الثانوية)

**اختبار التباين:**
استخدم: https://webaim.org/resources/contrastchecker/

### 3. استخدام Accent

**حالات الاستخدام الوحيدة:**
- ✅ Primary CTA Button
- ✅ Link hover state
- ✅ Active tab indicator
- ✅ Focus ring
- ✅ Selected item indicator

**حالات محظورة:**
- ❌ عناوين H1, H2, H3
- ❌ نصوص Paragraphs
- ❌ Backgrounds كبيرة
- ❌ استخدام زخرفي

---

## 🎨 الألوان في السياق

### مثال: بطاقة مشروع (Project Card)

```css
.project-card {
  background: var(--bg-secondary);        /* الخلفية */
  border: 1px solid var(--border-primary); /* الحد */
}

.project-card__title {
  color: var(--text-primary);             /* العنوان */
}

.project-card__description {
  color: var(--text-secondary);           /* الوصف */
}

.project-card__meta {
  color: var(--text-muted);               /* التاريخ/المعلومات الإضافية */
}

.project-card__link {
  color: var(--text-primary);             /* اللينك عادي */
}

.project-card__link:hover {
  color: var(--accent-primary);           /* اللينك عند Hover */
}
```

### مثال: زر أساسي (Primary Button)

```css
.btn-primary {
  background: var(--accent-primary);
  color: var(--text-inverted);
  border: none;
}

.btn-primary:hover {
  background: var(--accent-hover);
}

.btn-primary:active {
  background: var(--accent-pressed);
}
```

### مثال: زر ثانوي (Secondary Button)

```css
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
}

.btn-secondary:hover {
  background: var(--surface-overlay);
  border-color: var(--border-accent);
}
```

---

## 🔍 معايير الجودة

### Checklist قبل الموافقة على أي لون

- [ ] هل يخدم هدف واضح؟
- [ ] هل يحقق تباين كافي؟
- [ ] هل يعمل في الوضع الداكن والفاتح؟
- [ ] هل يمكن تمييزه بوضوح؟
- [ ] هل يتماشى مع الفلسفة العامة (هادئ، احترافي)؟

### Anti-Patterns (ممارسات محظورة)

❌ **استخدام ألوان براقة**
```css
/* ممنوع */
color: #ff00ff;
background: linear-gradient(45deg, #ff0000, #00ff00);
```

❌ **استخدام Accent بكثرة**
```css
/* ممنوع */
h1, h2, h3 { color: var(--accent-primary); }
```

❌ **عدم احترام التسلسل الهرمي**
```css
/* ممنوع */
.section-title { color: var(--text-muted); }
.small-note { color: var(--text-primary); }
```

---

## 🧪 اختبار النظام

### سيناريو 1: صفحة رئيسية
- Hero section: `bg-primary` + `text-primary`
- Features section: `bg-secondary` + `text-primary/secondary`
- CTA Button: `accent-primary` + `text-inverted`

### سيناريو 2: صفحة مشاريع
- Page background: `bg-primary`
- Project cards: `bg-secondary`
- Card borders: `border-primary`
- Project title: `text-primary`
- Description: `text-secondary`
- Tech stack tags: `bg-tertiary` + `text-secondary`

### سيناريو 3: نموذج تواصل
- Form background: `bg-secondary`
- Input fields: `bg-tertiary` + `border-primary`
- Input text: `text-primary`
- Placeholder: `text-muted`
- Submit button: `accent-primary`
- Success message: `success` + `success-bg`

---

## 📊 ملخص الألوان حسب الاستخدام

### الاستخدامات الأكثر شيوعًا

**90% من الموقع:**
- `bg-primary` + `bg-secondary`
- `text-primary` + `text-secondary`
- `border-primary`

**9% من الموقع:**
- `bg-tertiary`
- `text-muted`
- `surface-raised`

**1% من الموقع:**
- `accent-primary` (فقط للتفاعل)
- `semantic colors` (فقط للحالات)

---

## 🎯 الخلاصة

هذا النظام:
- ✅ بسيط لكن شامل
- ✅ قابل للتوسع
- ✅ يحترم Accessibility
- ✅ يخدم الفلسفة (هادئ، احترافي، واضح)
- ✅ سهل الصيانة

**المبدأ الأساسي:**
> كل لون له سبب، وكل استخدام له قاعدة.

لا عشوائية، لا مبالغة، لا ألوان "لأنها تبدو جميلة فقط".

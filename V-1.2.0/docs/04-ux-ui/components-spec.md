# 🧩 components-spec.md — مواصفات المكوّنات

> "المكوّن الجيد يُحلّ مشكلة واحدة — بشكل مثالي، وبثبات."

---

## 1️⃣ فلسفة المكوّنات

### المبدأ الجوهري:

> كل مكوّن هو **وعد** — يبدو بنفس الطريقة ويتصرف بنفس الطريقة في كل سياق.

المكوّنات في هذا الموقع ليست أدوات جمالية — هي وحدات ثقة. الاتساق في البناء يُعزز الاتساق في الانطباع. كل انحراف غير مبرر عن المواصفات يكسر الثقة المتراكمة.

### قواعد عامة لكل المكوّنات:

```
✅ كل مكوّن يعمل بمفرده ودون اعتماد على سياقه الخارجي
✅ كل مكوّن له حالات موثّقة: Default, Hover, Focus, Disabled, Loading
✅ كل مكوّن يعمل على كل نقاط الكسر
✅ كل مكوّن يحقق معايير Accessibility الأساسية (ARIA, Focus)
```

---

## 2️⃣ Button — الزر

الزر هو أكثر مكوّن يُترجم استراتيجية التحويل مباشرة. كل زر قرار.

### الأنواع الثلاثة:

---

#### Primary Button — الزر الرئيسي

```css
.btn-primary {
  /* الأساس */
  display:         inline-flex;
  align-items:     center;
  gap:             var(--space-2);
  padding:         var(--space-3) var(--space-8);    /* 12px 32px */
  border-radius:   var(--radius-md);                 /* 8px */
  border:          none;
  cursor:          pointer;

  /* المظهر */
  background:      var(--color-signal);              /* #2563EB */
  color:           #FFFFFF;
  font-family:     var(--font-sans);
  font-size:       var(--text-base);                 /* 16px */
  font-weight:     var(--weight-semibold);           /* 600 */
  line-height:     1;
  letter-spacing:  -0.01em;
  text-decoration: none;

  /* الانتقال */
  transition: background 200ms ease,
              transform  150ms ease,
              box-shadow 200ms ease;
}

.btn-primary:hover {
  background:  #1D4ED8;                             /* أغمق بمستوى */
  transform:   translateY(-1px);
  box-shadow:  var(--shadow-md);
}

.btn-primary:active {
  transform:   translateY(0);
  background:  #1E40AF;
}

.btn-primary:focus-visible {
  outline:        2px solid var(--color-signal);
  outline-offset: 3px;
}

.btn-primary:disabled {
  background:     var(--color-muted);
  cursor:         not-allowed;
  transform:      none;
  box-shadow:     none;
  opacity:        0.6;
}
```

**قواعد الاستخدام:**
```
✅ CTA رئيسي واحد فقط لكل Section
✅ فعل واضح في النص: "تواصل"، "اطّلع على الأعمال"
❌ أكثر من Primary Button واحد في نفس الـ viewport
❌ نص عام: "اضغط هنا"، "المزيد"
```

---

#### Secondary Button — الزر الثانوي

```css
.btn-secondary {
  /* يرث الأساس من btn-primary */
  background:  transparent;
  color:       var(--color-signal);
  border:      1.5px solid var(--color-signal);
}

.btn-secondary:hover {
  background:  rgba(37, 99, 235, 0.06);
  transform:   translateY(-1px);
}
```

**قواعد الاستخدام:**
```
✅ إجراء ثانوي بجانب Primary
✅ "اطّلع على المزيد"، "عودة"
❌ بديل للـ Primary عند الرغبة في تغيير اللون فقط
```

---

#### Ghost Button — الزر الشفاف

```css
.btn-ghost {
  background:  transparent;
  color:       currentColor;
  border:      none;
  padding:     var(--space-2) var(--space-4);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.btn-ghost:hover {
  text-decoration-color: var(--color-signal);
  color: var(--color-signal);
}
```

**قواعد الاستخدام:**
```
✅ روابط تنقل ثانوية
✅ "عرض الكل"، "اقرأ المزيد" داخل Cards
❌ CTAs رئيسية
```

---

### أحجام الأزرار:

```css
.btn-sm { padding: var(--space-2) var(--space-5); font-size: var(--text-sm); }
.btn-md { padding: var(--space-3) var(--space-8); font-size: var(--text-base); }  /* الافتراضي */
.btn-lg { padding: var(--space-4) var(--space-10); font-size: var(--text-lg); }
```

---

## 3️⃣ Card — البطاقة

Card هو الوحدة الأساسية لعرض الأعمال والخدمات. يحمل مسؤولية الانطباع الأول عن كل مشروع.

### البنية الهيكلية:

```html
<article class="card">
  <div class="card__media">       <!-- صورة أو أيقونة — اختياري -->
    <img src="..." alt="..." />
  </div>
  <div class="card__body">
    <span class="card__label">   <!-- تصنيف: "Web App"، "Dashboard" -->
    <h3 class="card__title">    <!-- اسم المشروع -->
    <p class="card__excerpt">   <!-- وصف مختصر: المشكلة + الحل -->
  </div>
  <div class="card__footer">     <!-- رابط + Metadata — اختياري -->
    <a class="btn-ghost">اطّلع على التفاصيل</a>
    <span class="card__meta">   <!-- تاريخ، مدة، إلخ -->
  </div>
</article>
```

### CSS المكوّن:

```css
.card {
  display:          flex;
  flex-direction:   column;
  background:       var(--surface-light);    /* على الخلفية الداكنة */
  border-radius:    var(--radius-lg);        /* 12px */
  border:           1px solid var(--border-light);
  overflow:         hidden;
  transition:       transform  200ms ease,
                    box-shadow 200ms ease;
}

/* على خلفية داكنة */
.section--dark .card {
  background: rgba(255,255,255, 0.04);
  border-color: var(--border-dark);
}

.card:hover {
  transform:   translateY(-4px);
  box-shadow:  var(--shadow-lg);
}

.card__media {
  aspect-ratio: 16 / 9;
  overflow:     hidden;
}

.card__media img {
  width:            100%;
  height:           100%;
  object-fit:       cover;
  transition:       transform 400ms ease;
}

.card:hover .card__media img {
  transform: scale(1.03);
}

.card__body {
  flex:       1;
  padding:    var(--space-6) var(--space-6) var(--space-4);
}

.card__label {
  font-size:      var(--text-xs);
  font-weight:    var(--weight-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color:          var(--color-signal);
  margin-bottom:  var(--space-3);
}

.card__title {
  font-size:    var(--text-xl);
  font-weight:  var(--weight-bold);
  line-height:  var(--leading-snug);
  margin-bottom: var(--space-3);
}

.card__excerpt {
  font-size:   var(--text-sm);
  line-height: var(--leading-relaxed);
  color:       var(--text-secondary);
}

.card__footer {
  padding:         var(--space-4) var(--space-6) var(--space-6);
  display:         flex;
  align-items:     center;
  justify-content: space-between;
  margin-top:      auto;
}

.card__meta {
  font-size: var(--text-xs);
  color:     var(--color-muted);
}
```

---

## 4️⃣ Input — حقل الإدخال

الـ Input يظهر في نموذج التواصل. بساطته وإمكانية استخدامه تعكسان قيمة "تقليل الاحتكاك".

### البنية الهيكلية:

```html
<div class="field">
  <label class="field__label" for="name">الاسم</label>
  <input
    class="field__input"
    type="text"
    id="name"
    name="name"
    placeholder="ما اسمك؟"
    autocomplete="name"
    required
  />
  <span class="field__hint">نص مساعد اختياري</span>
  <span class="field__error" role="alert">رسالة الخطأ هنا</span>
</div>
```

### CSS المكوّن:

```css
.field {
  display:        flex;
  flex-direction: column;
  gap:            var(--space-2);
}

.field__label {
  font-size:   var(--text-sm);
  font-weight: var(--weight-semibold);
  color:       currentColor;
}

.field__input,
.field__textarea {
  width:          100%;
  padding:        var(--space-3) var(--space-4);
  background:     transparent;
  border:         1.5px solid var(--border-light);
  border-radius:  var(--radius-md);
  font-family:    var(--font-sans);
  font-size:      var(--text-base);
  color:          currentColor;
  transition:     border-color 200ms ease,
                  box-shadow   200ms ease;
}

.section--dark .field__input {
  border-color: var(--border-dark);
}

.field__input:hover {
  border-color: var(--color-muted);
}

.field__input:focus {
  outline:      none;
  border-color: var(--color-signal);
  box-shadow:   0 0 0 3px rgba(37, 99, 235, 0.12);
}

.field__input::placeholder {
  color:   var(--color-muted);
  opacity: 1;
}

/* حالة الخطأ */
.field--error .field__input {
  border-color: var(--color-error);
}

.field__error {
  font-size:  var(--text-sm);
  color:      var(--color-error);
  display:    none;
}

.field--error .field__error {
  display: block;
}

/* Textarea */
.field__textarea {
  min-height:  140px;
  resize:      vertical;
  line-height: var(--leading-relaxed);
}
```

---

## 5️⃣ Modal — النافذة المنبثقة

Modal يُستخدم بندرة — فقط عندما لا يوجد بديل أفضل. الكثير من الـ Modals يكسر تجربة المستخدم.

### متى يُستخدم Modal:

```
✅ معاينة سريعة لمشروع (Lightbox)
✅ تأكيد إجراء غير قابل للتراجع
❌ نماذج تواصل طويلة (استخدم صفحة مستقلة)
❌ محتوى يمكن عرضه inline
```

### البنية الهيكلية:

```html
<div class="modal-overlay" role="dialog" aria-modal="true"
     aria-labelledby="modal-title">
  <div class="modal">
    <header class="modal__header">
      <h2 class="modal__title" id="modal-title">عنوان Modal</h2>
      <button class="modal__close" aria-label="إغلاق">
        <svg>...</svg>
      </button>
    </header>
    <div class="modal__body">
      <!-- المحتوى -->
    </div>
    <footer class="modal__footer">  <!-- اختياري -->
      <button class="btn-secondary">إلغاء</button>
      <button class="btn-primary">تأكيد</button>
    </footer>
  </div>
</div>
```

### CSS المكوّن:

```css
.modal-overlay {
  position:        fixed;
  inset:           0;
  background:      rgba(15, 17, 23, 0.85);
  backdrop-filter: blur(4px);
  display:         grid;
  place-items:     center;
  padding:         var(--space-6);
  z-index:         var(--z-modal);

  /* الدخول */
  animation: overlay-in 200ms ease forwards;
}

@keyframes overlay-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.modal {
  background:    var(--surface-light);
  border-radius: var(--radius-xl);
  width:         100%;
  max-width:     560px;
  max-height:    90dvh;
  overflow-y:    auto;
  box-shadow:    var(--shadow-lg);

  animation: modal-in 250ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes modal-in {
  from { opacity: 0; transform: scale(0.96) translateY(8px); }
  to   { opacity: 1; transform: scale(1)    translateY(0);   }
}

.modal__header {
  display:         flex;
  align-items:     center;
  justify-content: space-between;
  padding:         var(--space-6) var(--space-6) var(--space-4);
  border-bottom:   1px solid var(--border-light);
}

.modal__body {
  padding: var(--space-6);
}

.modal__footer {
  display:     flex;
  gap:         var(--space-3);
  justify-content: flex-end;
  padding:     var(--space-4) var(--space-6) var(--space-6);
}

.modal__close {
  background:    transparent;
  border:        none;
  padding:       var(--space-2);
  border-radius: var(--radius-sm);
  color:         var(--color-muted);
  cursor:        pointer;
  transition:    color 150ms ease, background 150ms ease;
}

.modal__close:hover {
  color:       currentColor;
  background:  var(--border-light);
}
```

### Accessibility ضروري:

```
✅ role="dialog" + aria-modal="true" على الغلاف
✅ aria-labelledby يشير لعنوان Modal
✅ Focus يُحبس داخل Modal عند الفتح (Focus Trap)
✅ Escape يُغلق Modal
✅ النقر خارج الـ Modal يُغلقه
```

---

## 6️⃣ Section — الوحدة الهيكلية

Section هو الوحدة الأساسية لبناء الصفحات. كل قسم في الموقع هو Section موحّد البنية.

### المكوّنات الداخلية للـ Section:

```html
<section class="section section--dark">
  <div class="container container-default">

    <!-- Header: اختياري لكن موصى به -->
    <header class="section__header">
      <span class="section__label">          <!-- تصنيف: "الأعمال"، "المنهجية" -->
      <h2 class="section__title">            <!-- العنوان الرئيسي -->
      <p class="section__lead">              <!-- فقرة تمهيدية -->
    </header>

    <!-- Content: الشبكة أو المحتوى الرئيسي -->
    <div class="section__content">
      <!-- Grid / Cards / List / etc. -->
    </div>

    <!-- Footer: CTA اختياري -->
    <footer class="section__footer">
      <a class="btn-primary">...</a>
    </footer>

  </div>
</section>
```

### CSS المكوّن:

```css
.section {
  padding-block: var(--space-20);
}

@media (min-width: 1024px) {
  .section { padding-block: var(--space-32); }
}

/* متغيرات السطح */
.section--dark  { background: var(--surface-dark);  color: var(--text-on-dark); }
.section--light { background: var(--surface-light); color: var(--text-on-light); }

.section__header {
  max-width:     680px;
  margin-bottom: var(--space-12);
}

.section__label {
  display:        block;
  font-size:      var(--text-xs);
  font-weight:    var(--weight-semibold);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color:          var(--color-signal);
  margin-bottom:  var(--space-3);
}

.section__title {
  font-size:     var(--text-3xl);
  font-weight:   var(--weight-bold);
  line-height:   var(--leading-snug);
  margin-bottom: var(--space-4);
}

@media (min-width: 1024px) {
  .section__title { font-size: var(--text-4xl); }
}

.section__lead {
  font-size:   var(--text-lg);
  line-height: var(--leading-relaxed);
  color:       var(--text-secondary);
}

.section__content {
  /* يتشكل بحسب محتواه — Grid أو Stack */
}

.section__footer {
  margin-top:  var(--space-12);
  text-align:  center;
}
```

---

## 7️⃣ جدول المراجعة — Component Checklist

قبل اعتماد أي مكوّن:

```
☐ جميع الحالات موثّقة ومُختبرة (Default/Hover/Focus/Disabled)
☐ يعمل على Mobile و Desktop دون كسر
☐ نسبة تباين النص تتجاوز WCAG AA
☐ Focus state واضح للتنقل بالكيبورد
☐ لا يعتمد على قيم hardcoded — فقط متغيرات CSS
☐ Animation لا تتجاوز 300ms ومُعطّلة عند prefers-reduced-motion
```

---

*المرجع التالي: [`interaction-rules.md`](./interaction-rules.md)*
*مرتبط بـ: [`layout-system.md`](./layout-system.md) | [`color-system.md`](../brand/color-system.md) | [`typography-system.md`](../brand/typography-system.md) | [`visual-principles.md`](../brand/visual-principles.md)*

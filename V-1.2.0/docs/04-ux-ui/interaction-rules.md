# ⚡ interaction-rules.md — قواعد التفاعل

> "التفاعل الجيد لا يُلاحَظ — يُحسّ. التفاعل السيئ لا يُنسى."

---

## 1️⃣ فلسفة التفاعل في هذا الموقع

### المبدأ الأساسي:

> كل تفاعل يؤدي وظيفة — إما يُوجّه، أو يُؤكّد، أو يُخبر.

التفاعلات ليست زخرفة. Hover يقول "هذا قابل للنقر". Loading يقول "لم يتجمد — انتظر". Focus يقول "أنت هنا الآن". كل animation بلا وظيفة هي ضجيج بصري.

### الموازنة الجوهرية:

```
موقعنا يعكس شخصية: هادئة — منضبطة — غير صاخبة

→ التفاعلات تعكس هذه الشخصية:
  خفيفة لا ضخمة
  سريعة لا بطيئة
  هادفة لا استعراضية
```

---

## 2️⃣ Hover — التفاعل عند المرور

### المبدأ:

Hover يجب أن يُجيب على سؤال واحد: "هل هذا العنصر تفاعلي؟"
الإجابة يجب أن تصل في أقل من 100ms دون تفكير.

---

### Hover على الأزرار:

```css
/* قاعدة موحّدة لكل الأزرار */
.btn {
  transition: background  200ms ease,
              transform   150ms ease,
              box-shadow  200ms ease,
              border-color 200ms ease;
}

/* تأثير الرفع — يُشعر بالاستجابة */
.btn-primary:hover,
.btn-secondary:hover {
  transform:  translateY(-1px);
  box-shadow: var(--shadow-md);
}

/* لا رفع للـ Ghost — لأنه نصي طبيعاً */
.btn-ghost:hover {
  color:            var(--color-signal);
  text-decoration:  underline;
}
```

---

### Hover على الـ Cards:

```css
.card {
  transition: transform  200ms ease,
              box-shadow 200ms ease;
}

.card:hover {
  transform:  translateY(-4px);    /* رفع أكبر من الزر — لأن Card أكبر */
  box-shadow: var(--shadow-lg);
}

/* الصورة داخل Card تكبر قليلاً */
.card__media img {
  transition: transform 400ms ease; /* أبطأ — لأن الحركة أكبر */
}
.card:hover .card__media img {
  transform: scale(1.03);
}
```

**لماذا 400ms للصورة؟**
الحركة الأبطأ للعناصر الأكبر تبدو طبيعية. الصورة أكبر من الزر — تحتاج "ثقلاً" أكبر.

---

### Hover على الروابط النصية:

```css
a {
  color:             var(--color-signal);
  text-decoration:   underline;
  text-underline-offset: 3px;
  text-decoration-color: transparent;
  transition:        text-decoration-color 200ms ease,
                     color 200ms ease;
}

a:hover {
  text-decoration-color: var(--color-signal);
}
```

**القاعدة:** الـ Underline موجود دائماً لكنه شفاف — يظهر عند الـ Hover فقط. هذا يُشير للتفاعلية دون ازدحام بصري.

---

### Hover على عناصر Nav:

```css
.nav__link {
  position:   relative;
  color:      var(--text-secondary);
  transition: color 200ms ease;
}

.nav__link::after {
  content:    '';
  position:   absolute;
  bottom:     -2px;
  left:       0;
  width:      0;
  height:     1.5px;
  background: var(--color-signal);
  transition: width 200ms ease;
}

.nav__link:hover,
.nav__link--active {
  color: currentColor;
}

.nav__link:hover::after,
.nav__link--active::after {
  width: 100%;
}
```

---

## 3️⃣ Focus — حالة التركيز

### لماذا Focus مهم بشكل خاص؟

Focus ليس فقط للـ Accessibility — هو مؤشر على أن الموقع مبني بعناية. المستخدمون الذين يتنقلون بالكيبورد (وهم أكثر مما نتوقع) سيرون هذا الـ Focus. موقع بلا Focus style واضح يقول "لم يُفكر أحد في هذا."

### القاعدة العامة:

```css
/* إزالة outline الافتراضي القبيح */
*:focus {
  outline: none;
}

/* استبدال بـ focus-visible فقط — لا يظهر عند النقر بالفأرة */
*:focus-visible {
  outline:        2px solid var(--color-signal);
  outline-offset: 3px;
  border-radius:  var(--radius-sm);            /* يتبع شكل العنصر */
}

/* على الخلفية الداكنة — نفس اللون يكفي */
.section--dark *:focus-visible {
  outline-color: var(--color-signal);
}
```

### Focus على الـ Inputs (مختلف):

```css
/* راجع components-spec.md — الـ Input له Focus خاص */
.field__input:focus-visible {
  outline:      none;                           /* لا outline خارجي */
  border-color: var(--color-signal);
  box-shadow:   0 0 0 3px rgba(37, 99, 235, 0.12); /* halo بدلاً */
}
```

---

## 4️⃣ فلسفة الـ Animation

### المبدأ الحاكم:

> Animation تخدم الفهم — لا تُبهر.

ثلاثة أهداف فقط تُبرر Animation في هذا الموقع:

```
1. توجيه الانتباه:  "انظر هنا — هذا مهم"
2. إظهار العلاقة:  "هذا جاء من هناك"
3. إعطاء ردود الفعل: "تم — نجح الإجراء"
```

أي Animation لا تؤدي واحداً من هذه الأهداف — لا توجد.

---

### معايير الزمن — Timing Guidelines:

```css
:root {
  --duration-instant:  100ms;  /* ردود فعل فورية (Hover خفيف) */
  --duration-fast:     200ms;  /* معظم التفاعلات (Buttons, Links) */
  --duration-normal:   300ms;  /* Cards, Dropdowns */
  --duration-slow:     400ms;  /* صور، عناصر كبيرة */
  --duration-enter:    500ms;  /* دخول عناصر للشاشة */
}
```

### معايير التسارع — Easing Guidelines:

```css
:root {
  /* للتفاعلات العادية — ناعمة */
  --ease-default:  cubic-bezier(0.4, 0, 0.2, 1);

  /* للدخول — تبدأ سريعة وتتباطأ */
  --ease-in:       cubic-bezier(0.4, 0, 1, 1);

  /* للخروج — تبدأ بطيئة وتسرع */
  --ease-out:      cubic-bezier(0, 0, 0.2, 1);

  /* للنوافذ والـ Modals — تبدأ ببطء وتنتهي بحماس */
  --ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

**لماذا `ease-spring` للـ Modals؟**
التباطؤ مع Overshoot الطفيف (scale يتجاوز 1 بقليل ثم يعود) يُعطي الـ Modal إحساساً بالثقل الطبيعي — كأنه كائن حقيقي يستقر في مكانه.

---

## 5️⃣ Scroll Animations — دخول العناصر

### المبدأ:

العناصر تدخل إلى الشاشة بدلاً من أن تكون موجودة فجأة. هذا يُعطي الصفحة إيقاعاً ويُوجّه العين تدريجياً.

### أنواع الدخول المعتمدة:

```css
/* نوع 1: Fade Up — الأكثر استخداماً */
@keyframes fade-up {
  from {
    opacity:   0;
    transform: translateY(24px);
  }
  to {
    opacity:   1;
    transform: translateY(0);
  }
}

/* نوع 2: Fade In — للعناصر التي لا تتحرك رأسياً */
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* نوع 3: Scale In — للـ Cards والـ Modals */
@keyframes scale-in {
  from {
    opacity:   0;
    transform: scale(0.96);
  }
  to {
    opacity:   1;
    transform: scale(1);
  }
}
```

### تطبيق الدخول بـ Intersection Observer:

```javascript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // مرة واحدة فقط
      }
    });
  },
  { threshold: 0.1 } // يبدأ عند ظهور 10% من العنصر
);

document.querySelectorAll('[data-animate]').forEach((el) => {
  observer.observe(el);
});
```

```css
[data-animate] {
  opacity:   0;
  transform: translateY(24px);
  transition: opacity  var(--duration-enter) var(--ease-out),
              transform var(--duration-enter) var(--ease-out);
}

[data-animate].is-visible {
  opacity:   1;
  transform: translateY(0);
}

/* تأخير للعناصر المتسلسلة */
[data-animate-delay="1"] { transition-delay: 100ms; }
[data-animate-delay="2"] { transition-delay: 200ms; }
[data-animate-delay="3"] { transition-delay: 300ms; }
```

> [!WARNING]
> Stagger (التأخير المتسلسل) يُستخدم بحذر — حد أقصى 3 عناصر متتالية. أكثر من ذلك يُشعر بالبطء.

---

## 6️⃣ Micro-interactions — التفاعلات الدقيقة

### تعريف:

Micro-interactions هي اللحظات الصغيرة التي تُشعر المستخدم بأن الموقع "حي" ويستجيب. معظمها لا يُلاحَظ واعياً — لكن غيابها يُحسّ.

---

### نجاح إرسال النموذج:

```css
/* الزر يتحول لـ "تم" */
.btn-primary.is-success {
  background:  var(--color-success);
  transition:  background 300ms ease;
}

/* أيقونة تظهر مكان النص */
.btn-primary.is-success .btn__text   { display: none; }
.btn-primary.is-success .btn__success { display: inline-flex; }
```

---

### Loading State على الزر:

```css
.btn-primary.is-loading {
  pointer-events: none;
  position:       relative;
  color:          transparent; /* يخفي النص */
}

.btn-primary.is-loading::after {
  content:       '';
  position:      absolute;
  width:         16px;
  height:        16px;
  border:        2px solid rgba(255,255,255,0.3);
  border-top:    2px solid #fff;
  border-radius: 50%;
  animation:     spin 600ms linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

### Underline Animation على العناوين الرئيسية:

```css
.section__title .highlight {
  position:   relative;
  display:    inline;
}

.section__title .highlight::after {
  content:    '';
  position:   absolute;
  bottom:     -2px;
  left:       0;
  width:      100%;
  height:     2px;
  background: var(--color-signal);
  transform:  scaleX(0);
  transform-origin: left;
  transition: transform 600ms var(--ease-out);
  transition-delay:   200ms;
}

.is-visible .section__title .highlight::after {
  transform: scaleX(1);
}
```

---

## 7️⃣ prefers-reduced-motion — الاحترام المطلق

### القاعدة غير القابلة للتجاوز:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration:   0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration:  0.01ms !important;
    scroll-behavior:      auto !important;
  }
}
```

**لماذا هذا ضروري؟**
بعض المستخدمين يعانون من اضطرابات دهليزية أو حساسية للحركة. الحركات على الشاشة تُسبب لهم ضيقاً حقيقياً. احترام هذا الإعداد ليس اختيارياً — هو جزء من قيمة "النزاهة" في هويتنا.

---

## 8️⃣ ما لا يوجد — قائمة المحظورات

```
❌ Parallax scrolling — يُربك على الموبايل ويُشتّت
❌ Auto-playing animations متكررة — تُشتّت الانتباه عن المحتوى
❌ Cursor custom effects — غير ذي قيمة وظيفية
❌ Particle effects أو SVG animations زخرفية
❌ Page transition ضخمة بين الصفحات
❌ Infinite scroll أو lazy loading مزعج
❌ Tooltips تظهر على كل شيء
❌ Animation تُشغَّل عند كل scroll بدون Intersection Observer
```

---

## 9️⃣ قائمة المراجعة — Interaction Checklist

```
☐ كل عنصر تفاعلي له Hover state واضح
☐ كل عنصر تفاعلي له Focus state واضح (focus-visible)
☐ كل Button له Loading + Success + Error states
☐ لا animation تتجاوز 500ms
☐ لا animation تُشغَّل أكثر من مرة بلا تفاعل من المستخدم
☐ prefers-reduced-motion مطبّق ومُختبر
☐ Stagger لا يتجاوز 3 عناصر بتأخير 100ms لكل منها
☐ cursor: pointer على كل عنصر تفاعلي
```

---

*مرتبط بـ: [`components-spec.md`](./components-spec.md) | [`visual-principles.md`](../brand/visual-principles.md) | [`performance.md`](../technical/performance.md)*

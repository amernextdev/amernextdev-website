# documentation-standard.md

## الهدف
تحديد معيار التوثيق المضمن في الكود — ما يُوثَّق، كيف، وأين.
التوثيق ليس شرحاً للكود بل سياق لا يقوله الكود نفسه.

## المشمول
- ما يجب توثيقه وما لا يجب
- هيكل تعليق الوحدة (Module Header)
- هيكل تعليق الدالة
- هيكل تعليق مكوّن HTML
- هيكل تعليق مكوّن CSS
- توثيق قرارات الاستثناء

## غير المشمول
- توثيق الوثائق الخارجية (→ ملفات `docs/` نفسها)
- اصطلاحات التسمية (→ `naming-conventions.md`)
- معيار `git commit messages` (→ `git-workflow.md`)

## مبدأ التوثيق

**لا تشرح ماذا يفعل الكود — وضّح لماذا يفعله هكذا.**

```javascript
// خاطئ — يشرح الكود الواضح
// يضيف class 'active' للعنصر
element.classList.add('active');

// صحيح — يضيف سياقاً لا يقوله الكود
// نستخدم class بدل data-attribute هنا لأن CSS يحتاجه مباشرة
// data-attribute يُستخدم للحالة التي يقرأها JS فقط (→ naming-conventions.md)
element.classList.add('active');
```

## ما يُوثَّق وما لا يُوثَّق

### يُوثَّق دائماً
- Module header لكل ملف JS
- كل `export` function
- كل قرار غير بديهي ("لماذا هكذا وليس كذا")
- كل استثناء لقاعدة (مع رقم القاعدة)
- كل ملف CSS (component header)
- كل section في HTML

### لا يُوثَّق
- الكود الواضح الذي يقرأ نفسه
- ما يمكن فهمه من الاسم وحده (`let isMenuOpen = false`)
- تعليقات TODO بدون خطة — إما يُنفَّذ الآن أو يُرفع كـ issue

## هيكل تعليق الوحدة (Module Header)

لكل ملف JS:

```javascript
/**
 * MODULE: [اسم الملف]
 * PURPOSE: [ما الذي تحققه هذه الوحدة في المنظومة — جملة واحدة]
 * CONSTRAINTS: [ما الذي لا يجب أن تفعله أو تصبح]
 * MIGRATION: [كيف تُهاجَر في المرحلة الثالثة]
 * DEPENDENCIES: [ما تحتاجه للعمل]
 */
```

**مثال:**
```javascript
/**
 * MODULE: portfolio.js
 * PURPOSE: تحميل بيانات المشاريع من JSON وعرضها في portfolio grid
 * CONSTRAINTS: لا تتواصل مع وحدات أخرى إلا عبر custom events
 *              لا تُعدّل DOM خارج .portfolio-grid
 * MIGRATION: → <Portfolio /> component في المرحلة الثالثة
 *            fetchJSON('/data/portfolio.json') → useProjects() hook
 * DEPENDENCIES: utils/fetch.js, utils/dom.js
 */
```

## هيكل تعليق الدالة

للدوال المُصدَّرة وأي دالة غير بديهية:

```javascript
/**
 * PURPOSE: [ما تُحققه الدالة]
 * CONSTRAINTS: [ما لا تفعله، جانب آثار، قيود]
 * @param {Type} name - [وصف]
 * @returns {Type} [وصف]
 */
```

**مثال:**
```javascript
/**
 * PURPOSE: بناء DOM element لمشروع واحد من بيانات JSON
 * CONSTRAINTS: لا تُعدّل DOM مباشرة — تُعيد element فقط
 *              لا تُطلق events — هذا دور renderProjects()
 * @param {Object} project - مشروع واحد من portfolio.json
 * @returns {HTMLElement} article element جاهز للإدراج
 */
function buildProjectCard(project) { ... }
```

## هيكل تعليق مكوّن HTML

في بداية كل `<section>` رئيسي:

```html
<!-- COMPONENT: [اسم الوحدة]
     PURPOSE: [ما الذي تحققه هذه الوحدة]
     MIGRATION: → <ComponentName /> في المرحلة الثالثة
                [أي تحويلات خاصة تحتاجها] -->
```

**مثال:**
```html
<!-- COMPONENT: Portfolio Grid
     PURPOSE: عرض المشاريع المختارة وفق إطار المشكلة-القرار-النتيجة
     MIGRATION: → <Portfolio /> في المرحلة الثالثة
                data-src يصبح prop يمرره <App /> -->
<section class="portfolio" id="portfolio" aria-labelledby="portfolio-title">
```

## هيكل تعليق مكوّن CSS

في بداية كل ملف CSS مكوّن:

```css
/* ============================================
   COMPONENT: [اسم الوحدة]
   PURPOSE: [ما الذي يُنجزه هذا CSS]
   MIGRATION: → CSS Module أو styled-component في المرحلة الثالثة
              متغيرات محلية تصبح props أو theme values
   ============================================ */
```

## توثيق قرارات الاستثناء

عند كسر قاعدة موثقة، التعليق يتضمن:

```javascript
// EXCEPTION: [رقم القاعدة أو اسمها]
// REASON: [لماذا الاستثناء هنا مبرر]
// PLAN: [متى أو كيف يُصحَّح هذا]
container.innerHTML = sanitizedContent; // EXCEPTION: T1 (no innerHTML from external data)
                                         // REASON: المحتوى مُعقَّم بـ DOMPurify قبل الوصول هنا
                                         // PLAN: يُستبدل بـ DOM API في المرحلة الثالثة مع React
```

## ما لا يُعدّ توثيقاً مقبولاً

```javascript
// TODO: fix this later   ← بلا خطة — يُحذف أو يُرفع كـ issue

// This is a hack         ← بلا سياق — أضف EXCEPTION مع مسوّغ

// Don't touch this       ← بلا شرح — أضف CONSTRAINTS واضحة

// Magic number
const TIMEOUT = 3000;     ← أضف: // 3 ثوانٍ — مهلة افتراضية لـ API بطيء
                                   // يُعرَّف كـ config في المرحلة الخامسة
```

## القيود التي يجب مراعاتها
- التوثيق يُكتب مع الكود، لا بعده
- تعليق قديم لا يعكس الكود الحالي أسوأ من غياب التعليق — يُحدَّث عند كل تعديل
- لغة التعليقات: عربي للسياق الاستراتيجي (PURPOSE، CONSTRAINTS)، إنجليزي للمصطلحات التقنية

## التأثير على التطبيق
Code review يرفض الـ exports بدون توثيق وقرارات الاستثناء بدون EXCEPTION comment.
التوثيق جزء من تعريف "الكود المكتمل"، لا إضافة اختيارية.

## وثائق مرتبطة
- `naming-conventions.md` — الأسماء التي يوثقها هذا المعيار
- `git-workflow.md` — كيف يرتبط التوثيق بـ commit messages
- `technical-axioms.md` — البديهية الأولى التي تستلزم أن يشرح كل عنصر نفسه

## الملف التالي
`git-workflow.md`

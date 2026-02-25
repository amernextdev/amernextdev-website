# naming-conventions.md

## الهدف
تحديد اصطلاحات التسمية الموحدة عبر HTML، CSS، JavaScript، وملفات المشروع.
الاتساق في التسمية شرط لقراءة الكود وقابلية الصيانة والهجرة.

## المشمول
- تسمية CSS classes (BEM)
- تسمية متغيرات CSS والتوكنات
- تسمية دوال ومتغيرات JavaScript
- تسمية Custom Events
- تسمية ملفات ومجلدات المشروع
- تسمية ملفات JSON والحقول

## غير المشمول
- بنية الملفات نفسها (→ `css-architecture-spec.md`، `js-module-architecture.md`)
- قيم التوكنات (→ `css-design-tokens.md`)

## CSS Classes — نظام BEM

### القاعدة
```
block__element--modifier
```

| المستوى | الاصطلاح | مثال |
|--------|---------|------|
| Block | اسم الوحدة بالكامل | `.hero` `.portfolio` `.nav` |
| Element | `__` + اسم العنصر | `.hero__title` `.portfolio__card` |
| Modifier | `--` + حالة أو نوع | `.hero__cta--primary` `.nav--scrolled` |

### قواعد تسمية BEM
```css
/* Block — الوحدة كاملة */
.hero { }

/* Element — جزء من الوحدة */
.hero__title { }
.hero__subtitle { }
.hero__cta { }

/* Modifier — تعديل على block أو element */
.hero--compact { }
.hero__cta--primary { }
.hero__cta--secondary { }

/* صحيح — عمق بمستوى واحد فقط */
.portfolio__card { }
.portfolio__card-title { }  /* وليس portfolio__card__title */

/* خاطئ — تعشيش BEM */
.portfolio__card__title { }  /* BEM لا يُعشَّش */
```

### Classes المساعدة (Utilities)
```css
/* تبدأ بـ u- لتمييزها عن BEM */
.u-visually-hidden { }
.u-sr-only { }
.u-text-center { }
```

### Classes الحالة (State)
```css
/* تبدأ بـ is- أو has- */
.is-active { }
.is-loading { }
.has-error { }
```

### Data Attributes للحالة الديناميكية
```html
<!-- يُفضَّل على state classes للحالة التي يُديرها JS -->
<nav data-menu-open="false">
<section data-state="loading">
<article data-featured="true">
```

## CSS Variables — نظام التسمية

```css
/* Pattern: --[category]-[property]-[variant] */

/* الألوان */
--color-bg-base
--color-bg-surface
--color-text-primary
--color-text-muted
--color-accent
--color-border

/* الطباعة */
--type-size-1
--font-weight-bold
--line-height-normal

/* التباعد */
--space-4

/* Primitives — تبدأ بـ _ لتُميَّز عن الدلالية */
--_color-slate-900
--_color-accent-raw
```

## JavaScript — اصطلاحات التسمية

### الدوال
```javascript
// camelCase — دوال عادية
function initPortfolio() { }
function renderProjects() { }
function handleMenuClick() { }
function buildProjectCard() { }

// يبدأ بـ init — دوال التهيئة العامة
export function initNavigation() { }

// يبدأ بـ render — دوال بناء DOM
function renderHero(container, data) { }

// يبدأ بـ handle — معالجات الأحداث
function handleScrollEvent(event) { }

// يبدأ بـ build/create — دوال إنشاء عناصر
function buildProjectCard(project) { }

// يبدأ بـ fetch/load — دوال جلب بيانات
async function fetchPortfolioData() { }
```

### المتغيرات
```javascript
// camelCase للمتغيرات العادية
const projectContainer = document.querySelector('#portfolio-grid');
let isMenuOpen = false;

// SCREAMING_SNAKE_CASE للثوابت
const PORTFOLIO_DATA_URL = '/data/portfolio.json';
const MAX_FEATURED_PROJECTS = 5;

// يبدأ بـ $ للعناصر DOM (اختياري لكن مساعد)
const $nav = document.querySelector('.nav');
const $heroTitle = document.querySelector('.hero__title');
```

### Custom Events
```javascript
// Pattern: 'module:action'
'nav:scrolled'
'nav:menu-opened'
'portfolio:rendered'
'portfolio:project-selected'
'contact:form-submitted'
```

## ملفات ومجلدات المشروع

```
// kebab-case لجميع الملفات والمجلدات
css/components/portfolio-card.css
js/modules/portfolio.js
data/portfolio.json

// لا camelCase في أسماء الملفات
// لا PascalCase (محجوز لـ React components في المرحلة الثالثة)
// لا مسافات أو underscores
```

**استثناء:** ملفات الجذر التقليدية تتبع معيارها:
```
README.md
LICENSE
.gitignore
robots.txt
sitemap.xml
```

## JSON — تسمية الحقول

```json
// snake_case لجميع حقول JSON
{
  "project_id": "...",
  "client_type": "...",
  "has_case_study": true,
  "case_study_url": null,
  "focus_areas": []
}

// لا camelCase في JSON (يتعارض مع شكل REST APIs الشائع)
// لا PascalCase
```

## جدول مرجعي سريع

| السياق | الاصطلاح | مثال |
|--------|---------|------|
| CSS Block | kebab-case | `.portfolio-card` |
| CSS Element | `__` + kebab | `.portfolio-card__title` |
| CSS Modifier | `--` + kebab | `.portfolio-card--featured` |
| CSS Variable دلالي | `--category-property` | `--color-text-primary` |
| CSS Variable primitive | `--_category-value` | `--_color-slate-900` |
| JS Function | camelCase + verb prefix | `initPortfolio` |
| JS Constant | SCREAMING_SNAKE | `MAX_PROJECTS` |
| JS Event | `module:action` | `portfolio:rendered` |
| ملف/مجلد | kebab-case | `portfolio-card.css` |
| JSON حقل | snake_case | `client_type` |

## القيود التي يجب مراعاتها
- الاتساق أهم من "الأفضل" — اصطلاح واحد مُطبَّق بشكل كامل أفضل من اصطلاحين "أفضل" مُطبَّقَين جزئياً
- أي اسم جديد لا ينتمي لأحد الأنماط الموثقة يُعاد النظر فيه قبل الاعتماد

## التأثير على التطبيق
Code review يرفض أي اسم لا يتبع هذه الاصطلاحات. ليس تفضيلاً — شرط merge.

## وثائق مرتبطة
- `css-architecture-spec.md` — البنية التي تُطبَّق فيها هذه التسميات
- `js-module-architecture.md` — النمط الذي تُطبَّق فيه تسميات JS
- `documentation-standard.md` — كيف تُوثَّق هذه الأسماء

## الملف التالي
`documentation-standard.md`

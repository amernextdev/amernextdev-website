# js-module-architecture.md

## الهدف
تحديد بنية وحدات JavaScript، أنماط الكتابة، وقواعد التواصل بين الوحدات في المرحلة الأولى.

## المشمول
- بنية مجلد JS وتوزيع المسؤوليات
- النمط القياسي لكل وحدة
- قواعد التواصل بين الوحدات
- معايير الأداء على مستوى JS
- الأنماط المضادة المحظورة

## غير المشمول
- البديهيات التي تحكم هذه البنية (→ `technical-axioms.md`)
- مخططات JSON التي تستهلكها الوحدات (→ `json-content-schema.md`)
- معيار العزل على مستوى المكونات (→ `component-isolation-standard.md`)

## بنية مجلد JS

```
js/
├── main.js              ← نقطة الدخول — يستورد ويهيئ الوحدات
├── modules/
│   ├── navigation.js    ← سلوك التنقل والـ header
│   ├── portfolio.js     ← تحميل وعرض بيانات المشاريع
│   ├── contact.js       ← معالجة نموذج التواصل
│   └── theme.js         ← إدارة حالة الثيم (إن وجدت)
└── utils/
    ├── dom.js           ← دوال مساعدة للـ DOM
    ├── fetch.js         ← wrapper لـ fetch API
    └── events.js        ← دوال مساعدة للأحداث
```

## نمط الوحدة القياسي

كل وحدة تتبع هذا الهيكل بالضبط:

```javascript
/**
 * MODULE: portfolio.js
 * PURPOSE: تحميل بيانات المشاريع من JSON وعرضها في DOM
 * CONSTRAINTS: لا يتواصل مع وحدات أخرى مباشرة — يُطلق events فقط
 * MIGRATION: يُستخرج كـ <Portfolio /> component في المرحلة الثالثة
 *            منطق fetch يصبح usePortfolio() custom hook
 * DEPENDENCIES: utils/fetch.js, utils/dom.js
 */

// ============================================
// IMPORTS
// ============================================
import { fetchJSON } from '../utils/fetch.js';
import { createElement, clearElement } from '../utils/dom.js';

// ============================================
// CONSTANTS — قيم ثابتة للوحدة
// ============================================
const PORTFOLIO_DATA_URL = '/data/portfolio.json';
const PORTFOLIO_CONTAINER = '#portfolio-grid';

// ============================================
// PRIVATE FUNCTIONS — دوال داخلية
// ============================================

/**
 * PURPOSE: بناء HTML لمشروع واحد من بيانات JSON
 * CONSTRAINTS: لا يُعدّل DOM مباشرة — يُعيد element فقط
 */
function buildProjectCard(project) {
  const article = createElement('article', { class: 'portfolio-card' });
  // ... بناء العنصر
  return article;
}

// ============================================
// PUBLIC API — الواجهة الخارجية للوحدة
// ============================================

/**
 * PURPOSE: تهيئة وحدة portfolio — تُستدعى من main.js فقط
 */
export async function initPortfolio() {
  const container = document.querySelector(PORTFOLIO_CONTAINER);
  if (!container) return;

  try {
    const projects = await fetchJSON(PORTFOLIO_DATA_URL);
    renderProjects(container, projects);
  } catch (error) {
    handlePortfolioError(container, error);
  }
}

function renderProjects(container, projects) {
  clearElement(container);
  projects.forEach(project => {
    container.appendChild(buildProjectCard(project));
  });
  
  // التواصل مع وحدات أخرى عبر events فقط
  document.dispatchEvent(new CustomEvent('portfolio:rendered', {
    detail: { count: projects.length }
  }));
}

function handlePortfolioError(container, error) {
  console.error('[Portfolio] Failed to load:', error);
  container.setAttribute('data-state', 'error');
}
```

## نقطة الدخول — `main.js`

```javascript
/**
 * MODULE: main.js
 * PURPOSE: نقطة الدخول — تهيئة جميع الوحدات بالترتيب
 * CONSTRAINTS: لا منطق تطبيقي هنا — تفويض فقط
 */

import { initNavigation } from './modules/navigation.js';
import { initPortfolio }  from './modules/portfolio.js';
import { initContact }    from './modules/contact.js';

async function init() {
  // الوحدات المتزامنة أولاً
  initNavigation();

  // الوحدات غير المتزامنة بالتوازي
  await Promise.allSettled([
    initPortfolio(),
    initContact()
  ]);
}

// تشغيل بعد اكتمال DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
```

## قواعد التواصل بين الوحدات

### قاعدة 1 — لا import مباشر بين وحدات متوازية
```javascript
// ✗ خاطئ — navigation تستورد من portfolio مباشرة
// navigation.js
import { getProjectCount } from './portfolio.js';

// ✓ صحيح — navigation تستمع لحدث
// navigation.js
document.addEventListener('portfolio:rendered', ({ detail }) => {
  updateNavBadge(detail.count);
});
```

### قاعدة 2 — الحالة المشتركة عبر data attributes
```javascript
// ✗ خاطئ — متغير عالمي
window.isMenuOpen = true;

// ✓ صحيح — data attribute على العنصر المعني
document.querySelector('.nav').setAttribute('data-menu-open', 'true');
```

### قاعدة 3 — utils مشتركة، لا نسخ
```javascript
// ✗ خاطئ — نفس الدالة مكتوبة في وحدتين
// ✓ صحيح — مُستوردة من utils/
import { debounce } from '../utils/events.js';
```

## معايير الأداء

```javascript
// جميع scripts في HTML بـ defer أو type="module"
// <script src="/js/main.js" type="module" defer></script>

// لا event listeners بدون cleanup عند الحاجة
const controller = new AbortController();
document.addEventListener('scroll', handler, { signal: controller.signal });
// controller.abort() عند التنظيف

// Intersection Observer للـ lazy loading — لا scroll events
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) loadContent(entry.target);
  });
});
```

## الأنماط المضادة المحظورة

```javascript
// ✗ تلوث الفضاء الأسمائي
window.myFunction = function() { ... };
var globalVar = 'value';

// ✗ تعديل DOM مباشر بـ innerHTML من بيانات خارجية (XSS)
container.innerHTML = data.userContent;

// ✗ event listeners متكررة بدون cleanup
// كل استدعاء يُضيف listener جديد
function init() {
  button.addEventListener('click', handleClick);
}

// ✗ منطق في HTML
// <button onclick="doSomething()">

// ✗ استخدام var — يُسبب مشاكل scope
var x = 1;

// ✗ callback hell — استخدم async/await
fetch(url)
  .then(r => r.json())
  .then(data => {
    fetch(url2)
      .then(r => r.json())
      .then(/* ... */);
  });
```

## القيود التي يجب مراعاتها
- كل وحدة ملف واحد. وحدة تحتاج أكثر من 200 سطر تُقسَّم
- لا منطق تطبيقي في `main.js` — تفويض وتهيئة فقط
- كل `export` في الوحدة هو جزء من واجهتها العامة — يُوثَّق

## التأثير على التطبيق
هذه البنية تضمن أن كل وحدة JS تُستخرج كـ React component في المرحلة الثالثة:
- الدوال الخاصة → دوال مساعدة داخل Component
- الدوال العامة → props أو hooks
- Custom events → Context أو state management

## وثائق مرتبطة
- `technical-axioms.md` — البديهية الثانية (فصل المسؤوليات) والرابعة (لا تبعية)
- `json-content-schema.md` — البيانات التي تستهلكها الوحدات
- `component-isolation-standard.md` — معيار العزل الذي تخدمه هذه البنية
- `react-migration-plan.md` (← `05-evolution/`) — كيف تُهاجَر هذه الوحدات

## الملف التالي
`json-content-schema.md`

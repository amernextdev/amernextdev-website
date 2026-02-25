# migration-mapping-table.md

## الهدف
جدول مرجعي شامل يُوضّح كيف يُعادَل كل عنصر في المرحلة الأولى مقابله في المراحل التالية.
يُستخدم كخارطة عملية عند بدء أي انتقال بين المراحل.

## المشمول
- خريطة HTML → React components
- خريطة CSS → CSS Modules / Design System
- خريطة JS modules → React hooks وcomponents
- خريطة JSON schemas → TypeScript interfaces → API
- خريطة بنية المجلدات عبر المراحل

## غير المشمول
- تفاصيل كيفية الهجرة (→ خطط الهجرة في `05-evolution/`)
- توقيت الهجرة (→ `evolution-matrix.md`)

---

## جدول 1 — HTML → React Components

| العنصر (المرحلة 1) | الملف | المقابل (المرحلة 3) | الملف |
|-------------------|-------|---------------------|-------|
| `<section class="hero">` | `index.html` | `<Hero />` | `components/Hero/Hero.tsx` |
| `<nav class="nav">` | `index.html` | `<Navigation />` | `components/Navigation/Navigation.tsx` |
| `<section class="about">` | `index.html` | `<About />` | `components/About/About.tsx` |
| `<section class="portfolio">` | `index.html` | `<Portfolio />` | `components/Portfolio/Portfolio.tsx` |
| `<article class="portfolio-card">` | JS-generated | `<ProjectCard />` | `components/Portfolio/ProjectCard.tsx` |
| `<section class="contact">` | `index.html` | `<Contact />` | `components/Contact/Contact.tsx` |
| `<footer class="footer">` | `index.html` | `<Footer />` | `components/Footer/Footer.tsx` |

---

## جدول 2 — CSS → CSS Modules

| الملف (المرحلة 1) | الملف (المرحلة 3) | التغيير |
|------------------|------------------|---------|
| `css/tokens.css` | `styles/tokens.css` | لا تغيير — يُنقل كما هو |
| `css/base.css` | `styles/globals.css` | يُدمج في globals |
| `css/components/hero.css` | `components/Hero/Hero.module.css` | BEM block prefix يُحذف |
| `css/components/nav.css` | `components/Navigation/Navigation.module.css` | نفسه |
| `css/components/portfolio.css` | `components/Portfolio/Portfolio.module.css` | نفسه |
| `css/utilities.css` | `styles/utilities.css` | لا تغيير |
| `css/main.css` | محذوف | يُستعاض عنه بـ `_app.tsx` |

**قاعدة تحويل BEM إلى CSS Modules:**
```css
/* المرحلة 1 */
.hero__title { font-size: var(--type-size-1); }

/* المرحلة 3 — يُحذف block prefix */
/* Hero.module.css */
.title { font-size: var(--type-size-1); }
```
```tsx
// الاستخدام في React
import styles from './Hero.module.css';
<h1 className={styles.title}>...</h1>
```

---

## جدول 3 — JS Modules → React

| العنصر (المرحلة 1) | الملف | المقابل (المرحلة 3) | الملف |
|-------------------|-------|---------------------|-------|
| `initPortfolio()` | `modules/portfolio.js` | `<Portfolio />` + `getStaticProps` | `pages/index.tsx` |
| `initHero()` | `modules/hero.js` | `<Hero profile={profile} />` | `pages/index.tsx` |
| `initNavigation()` | `modules/navigation.js` | `<Navigation />` state داخلي | `components/Navigation/` |
| `initContact()` | `modules/contact.js` | `<Contact />` | `components/Contact/` |
| `fetchJSON()` | `utils/fetch.js` | `getStaticProps` أو `fetch` API | `pages/` |
| `createElement()` | `utils/dom.js` | JSX | في كل component |
| Custom Event: `portfolio:rendered` | — | React state / Context | `pages/index.tsx` |
| Custom Event: `nav:scrolled` | — | `useState` + prop drilling | `pages/index.tsx` |
| `isMenuOpen` (data attribute) | `navigation.js` | `const [isOpen, setIsOpen] = useState(false)` | `Navigation.tsx` |
| `data-state="loading"` | كل الوحدات | `isLoading` state | كل component |

---

## جدول 4 — TypeScript Interfaces (المرحلة 2→3→4)

| JSON field | TS Interface (M2) | React Prop (M3) | API field (M4) |
|-----------|------------------|-----------------|----------------|
| `portfolio.json → projects[]` | `Project[]` | `projects: Project[]` | `GET /api/v1/projects → { data: Project[] }` |
| `project.id` | `id: string` | `project.id` | `id: string` |
| `project.status` | `status: ProjectStatus` | `status: ProjectStatus` | `status: string` |
| `project.meta.title` | `meta: ProjectMeta` | `project.meta.title` | `meta.title` |
| `project.problem.summary` | `problem: ProjectProblem` | `project.problem.summary` | `problem.summary` |
| `project.decision` | `decision: ProjectDecision` | `project.decision` | `decision` |
| `project.outcome.metrics` | `outcome: ProjectOutcome` | `project.outcome.metrics` | `outcome.metrics` |
| `profile.json → identity` | `PersonIdentity` | `profile: ProfileData` | `GET /api/v1/profile` |
| `config.json → contact` | `ContactConfig` | يُمرر من `_app.tsx` | `GET /api/v1/config` |

---

## جدول 5 — بنية المجلدات عبر المراحل

| المرحلة 1 | المرحلة 2 | المرحلة 3 |
|-----------|-----------|-----------|
| `js/modules/portfolio.js` | `js/modules/portfolio.ts` | `components/Portfolio/Portfolio.tsx` |
| `js/utils/fetch.js` | `js/utils/fetch.ts` | `lib/fetch.ts` أو `getStaticProps` |
| `data/*.json` | `data/*.json` | `data/*.json` ثم `pages/api/v1/` |
| `css/components/hero.css` | `css/components/hero.css` | `components/Hero/Hero.module.css` |
| `css/tokens.css` | `css/tokens.css` | `styles/tokens.css` |
| `index.html` | `index.html` | `pages/index.tsx` |
| لا يوجد | `js/types/index.ts` | `types/index.ts` |
| لا يوجد | لا يوجد | `hooks/usePortfolio.ts` |
| لا يوجد | لا يوجد | `pages/api/v1/projects.ts` (M4) |

---

## جدول 6 — Data Flow عبر المراحل

| الإجراء | المرحلة 1 | المرحلة 3 | المرحلة 4 |
|--------|-----------|-----------|-----------|
| جلب المشاريع | `fetchJSON('/data/portfolio.json')` | `import('../data/portfolio.json')` في `getStaticProps` | `fetch('/api/v1/projects')` |
| عرض المشاريع | `buildProjectCard(project)` في DOM | `<ProjectCard project={project} />` | نفسه |
| تحديث المحتوى | تعديل JSON + commit | نفسه | CMS أو admin API |
| حالة الصفحة | `data-state` attributes | `useState` | نفسه |
| التواصل بين الوحدات | Custom Events | Props + Context | نفسه |

---

## كيف تُستخدم هذه الجداول

**عند بدء المرحلة الثانية (TypeScript):**
استخدم جدول 4 لتحديد الـ interfaces المطلوبة وترتيب كتابتها.

**عند بدء المرحلة الثالثة (React):**
استخدم جداول 1، 2، 3 كخارطة استخراج. كل سطر = مهمة هجرة.

**عند بدء المرحلة الرابعة (API):**
استخدم جدول 4 (عمود API) وجدول 6 للتحقق من توافق البيانات.

## التأثير على التطبيق
هذه الجداول تحوّل الهجرة من "إعادة كتابة مجهولة" إلى قائمة مهام محددة.
كل سطر في الجداول هو unit of work يمكن تتبعه وإنجازه بشكل مستقل.

## وثائق مرتبطة
- `typescript-migration-plan.md` (← `05-evolution/`) — تفاصيل المرحلة الثانية
- `react-migration-plan.md` (← `05-evolution/`) — تفاصيل المرحلة الثالثة
- `api-transition-strategy.md` (← `05-evolution/`) — تفاصيل المرحلة الرابعة
- `component-isolation-standard.md` (← `03-technical/`) — شروط الاستخراج

## الملف التالي
لا يوجد. هذا آخر ملف في المنظومة الوثائقية.

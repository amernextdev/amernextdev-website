# component-isolation-standard.md

## الهدف
تحديد معايير عزل وحدات UI بحيث تكون قابلة للاستخراج كـ React components في المرحلة الثالثة بتعديلات طفيفة.

## المشمول
- تعريف الوحدة وحدودها
- المعايير الأربعة للوحدة القابلة للاستخراج
- هيكل الوحدة القياسي (HTML + CSS + JS)
- اختبار الاستخراجية
- الأنماط المضادة

## غير المشمول
- تفاصيل بنية CSS داخل الوحدة (→ `css-architecture-spec.md`)
- تفاصيل بنية JS داخل الوحدة (→ `js-module-architecture.md`)
- اصطلاحات التسمية (→ `naming-conventions.md`)

## تعريف الوحدة

الوحدة هي منطقة UI ذات مسؤولية واحدة واضحة، لها حدود هيكلية صريحة في HTML.

**الوحدات الحالية في المرحلة الأولى:**

| الوحدة | المسؤولية | المقابل في المرحلة الثالثة |
|--------|-----------|--------------------------|
| `nav` | التنقل والـ header | `<Navigation />` |
| `hero` | الانطباع الأول والبيان المهني | `<Hero />` |
| `about` | الهوية والمنهجية | `<About />` |
| `portfolio` | عرض المشاريع | `<Portfolio />` + `<ProjectCard />` |
| `contact` | آلية التواصل | `<Contact />` |
| `footer` | التذييل | `<Footer />` |

## المعايير الأربعة للوحدة القابلة للاستخراج

كل وحدة يجب أن تستوفي المعايير الأربعة. وحدة تفشل في معيار واحد تحتاج إعادة هيكلة قبل المرحلة الثالثة.

---

### المعيار 1 — لا تبعيات CSS عابرة للوحدات

أنماط كل مكوّن مكتفية ذاتياً. لا class في وحدة يعتمد على وجود class في وحدة أخرى.

```css
/* خاطئ — hero يعتمد على nav */
.nav--scrolled .hero__title {
  font-size: var(--type-size-2);
}

/* صحيح — hero يستجيب لـ data attribute على نفسه */
.hero[data-compact="true"] .hero__title {
  font-size: var(--type-size-2);
}
```

**اختبار:** احذف CSS وحدة واحدة. هل تتأثر وحدة أخرى بصرياً؟ إذا نعم — يوجد تبعية يجب قطعها.

---

### المعيار 2 — لا ربط مباشر بـ DOM بين الوحدات

الوحدات لا تُعدّل DOM بعضها مباشرة. التواصل عبر Custom Events أو data attributes فقط.

```javascript
// خاطئ — nav تُعدّل hero مباشرة
const heroTitle = document.querySelector('.hero__title');
heroTitle.classList.add('hero__title--small');

// صحيح — nav تُطلق event، hero يستجيب
// navigation.js
document.dispatchEvent(new CustomEvent('nav:scrolled', {
  detail: { scrolled: true }
}));

// hero.js
document.addEventListener('nav:scrolled', ({ detail }) => {
  heroSection.setAttribute('data-compact', detail.scrolled);
});
```

**اختبار:** هل يمكن نقل وحدة إلى صفحة أخرى دون تعديل وحدات أخرى؟ إذا لا — يوجد ربط مباشر.

---

### المعيار 3 — المحتوى مصدره JSON لا الترميز

لا نص محتوى مُشفَّر في HTML يُتوقع أن يتغير. المحتوى الثابت (labels، placeholders) مقبول في HTML.

```html
<!-- خاطئ — محتوى مشروع مُشفَّر -->
<article class="portfolio-card">
  <h3>نظام إدارة مخزون</h3>
  <p>حللت مشكلة التزامن...</p>
</article>

<!-- صحيح — الحاوية فقط، المحتوى يُحقن بـ JS -->
<div id="portfolio-grid" data-src="/data/portfolio.json">
  <!-- يُملأ بـ JavaScript -->
</div>
```

**استثناء مقبول:** محتوى لن يتغير أبداً ولا يتكرر — مثل عنوان الصفحة الرئيسي إذا كان ثابتاً باستراتيجية.

---

### المعيار 4 — الحالة مُدارة محلياً

لا حالة عامة ضمنية. كل وحدة تُدير حالتها عبر data attributes أو متغيرات محلية.

```javascript
// خاطئ — حالة عامة
window.isMenuOpen = false;
window.activeProject = null;

// صحيح — حالة على العنصر
nav.setAttribute('data-menu-open', 'false');

// صحيح — متغير محلي للوحدة
let isMenuOpen = false; // داخل navigation.js، لا يُصدَّر
```

## هيكل الوحدة القياسي

### HTML
```html
<!-- COMPONENT: Hero
     PURPOSE: الانطباع الأول — بيان مهني
     MIGRATION: → <Hero /> في المرحلة الثالثة -->
<section class="hero" id="hero" aria-labelledby="hero-title">
  <div class="hero__container">
    <h1 class="hero__title" id="hero-title"></h1>
    <p class="hero__subtitle"></p>
    <div class="hero__cta">
      <a href="#contact" class="hero__cta-link">التواصل</a>
    </div>
  </div>
</section>
```

### CSS — `css/components/hero.css`
```css
/* لا يستورد من ملفات أخرى. لا يُصدّر لوحدات أخرى. */
.hero { ... }
.hero__container { ... }
.hero__title { ... }
.hero__subtitle { ... }
.hero__cta-link { ... }

@media (max-width: 768px) {
  .hero { ... }
}
```

### JS — `js/modules/hero.js`
```javascript
import { fetchJSON } from '../utils/fetch.js';

export async function initHero() {
  const section = document.querySelector('.hero');
  if (!section) return;
  const profile = await fetchJSON('/data/profile.json');
  renderHero(section, profile);
}

function renderHero(section, profile) {
  section.querySelector('.hero__title').textContent = profile.identity.title;
  section.querySelector('.hero__subtitle').textContent = profile.identity.positioning_statement;
}
```

## اختبار الاستخراجية

قبل اعتبار أي وحدة جاهزة للمرحلة الثالثة:

| الاختبار | الطريقة | المعيار |
|---------|---------|---------|
| CSS مستقل | احذف CSS وحدات أخرى | الوحدة تبدو صحيحة |
| JS مستقل | أزل استيراد وحدات أخرى | الوحدة تعمل |
| محتوى من JSON | غيّر قيمة في JSON | التغيير يظهر بدون تعديل HTML |
| لا حالة عامة | ابحث عن `window.` في JS الوحدة | النتيجة صفر |

## الأنماط المضادة

```javascript
// وحدة تعرف هيكل وحدة أخرى — محظور
document.querySelector('.nav .nav__logo'); // من داخل hero.js

// وحدة تُعدّل CSS وحدة أخرى — محظور
document.querySelector('.hero').style.marginTop = '80px';

// بيانات مشتركة عبر global — محظور
window.appState = { currentSection: 'hero' };
```

## القيود التي يجب مراعاتها
- وحدة تفشل في أي معيار لا تُعدّ "مؤجلة للإصلاح" — تُصلح قبل إضافة وحدات جديدة
- الوحدات الست المحددة هي الحد الأقصى للمرحلة الأولى. أي وحدة إضافية تستلزم مراجعة `master-constitution.md`

## التأثير على التطبيق
الامتثال لهذا المعيار يعني أن الهجرة إلى React في المرحلة الثالثة هي استخراج، لا إعادة كتابة.

## وثائق مرتبطة
- `css-architecture-spec.md` — بنية CSS التي تخدم المعيار 1
- `js-module-architecture.md` — أنماط JS التي تخدم المعيار 2 و4
- `json-content-schema.md` — البيانات التي تخدم المعيار 3
- `react-migration-plan.md` (← `05-evolution/`) — كيف تُستخرج هذه الوحدات

## الملف التالي
`naming-conventions.md`

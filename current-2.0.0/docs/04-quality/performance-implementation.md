# performance-implementation.md

## الهدف
تحديد التقنيات والأنماط المحددة التي تُحقق أرقام `performance-budget.md` في الكود الفعلي.

## المشمول
- تحسينات HTML وCSS وJS
- استراتيجية تحميل الأصول
- تحسين الصور والخطوط
- إعدادات التخزين المؤقت
- قائمة فحص قبل النشر

## غير المشمول
- السقوف والأرقام المستهدفة (→ `performance-budget.md`)
- عملية التحقق بـ Lighthouse (→ `lighthouse-validation-process.md`)

## تحسينات HTML

### ترتيب `<head>` المُحسَّن للأداء
```html
<head>
  <!-- 1. Meta الأساسية أولاً -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- 2. Preconnect للموارد الخارجية الحرجة -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>

  <!-- 3. Preload للأصول الحرجة -->
  <link rel="preload" href="/fonts/primary.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/css/main.css" as="style">

  <!-- 4. CSS حرج -->
  <link rel="stylesheet" href="/css/main.css">

  <!-- 5. Meta للـ SEO والـ Social -->
  <title>...</title>
  <meta name="description" content="...">
  <!-- ... -->
</head>

<!-- JS في نهاية body أو بـ defer -->
<script src="/js/main.js" type="module" defer></script>
```

### Critical CSS (اختياري للمرحلة الأولى)
إذا كان LCP أكبر من 2.5s، يُضاف CSS حرج مضمّن لما فوق الطية:
```html
<style>
  /* أنماط hero وnav فقط — أقل من 14KB */
</style>
<link rel="stylesheet" href="/css/main.css" media="print" onload="this.media='all'">
```

## تحسينات CSS

### ترتيب @import في التطوير
```css
/* main.css — التطوير فقط */
@import 'tokens.css';   /* أولاً — الباقي يعتمد عليه */
@import 'base.css';
@import 'components/nav.css';
@import 'components/hero.css';
@import 'components/portfolio.css';
@import 'components/contact.css';
@import 'components/footer.css';
@import 'utilities.css';
```

**في الإنتاج:** script بناء يجمع هذه الملفات في ملف واحد ويضغطه.

### تجنب إعادة الحساب المُكلفة
```css
/* خاطئ — يُسبب reflow */
.element {
  width: calc(100% - 32px);
  /* يُحسب في كل تغيير حجم */
}

/* أفضل — CSS variables تُقلل الحسابات */
.element {
  width: calc(100% - var(--space-4));
}

/* خاطئ — تغيير خصائص تُسبب layout */
element.style.width = '300px'; /* يُسبب reflow كامل */

/* أفضل — تغيير transform بدلاً من position/size */
element.style.transform = 'translateX(300px)';
```

### Contain لتحسين العزل
```css
/* للمكونات المستقلة بصرياً */
.portfolio-card {
  contain: layout style; /* يحصر إعادة الحساب داخل المكوّن */
}
```

## تحسينات JavaScript

### تأجيل التحميل الصحيح
```html
<!-- type="module" يُعطي defer تلقائياً -->
<script src="/js/main.js" type="module"></script>

<!-- لا scripts synchronous في <head> أبداً -->
<!-- <script src="analytics.js"></script> — محظور -->
```

### Intersection Observer بدل Scroll Events
```javascript
// خاطئ — يُشغَّل مئات المرات عند التمرير
window.addEventListener('scroll', () => {
  checkElementVisibility();
});

// صحيح — يُشغَّل فقط عند التقاطع
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadContent(entry.target);
      observer.unobserve(entry.target); // cleanup بعد التحميل
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-lazy]').forEach(el => observer.observe(el));
```

### Debounce لأحداث المقاومة
```javascript
// debounce من utils/events.js
function debounce(fn, delay = 200) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

// الاستخدام
window.addEventListener('resize', debounce(handleResize, 150));
```

## استراتيجية الصور

### HTML مُحسَّن للصور
```html
<!-- Hero image — LCP element — لا lazy loading -->
<img
  src="/images/hero.webp"
  alt="..."
  width="1200"
  height="600"
  loading="eager"
  fetchpriority="high"
>

<!-- صور Portfolio — تحت الطية -->
<img
  src="/images/project-thumb.webp"
  alt="..."
  width="800"
  height="450"
  loading="lazy"
>

<!-- Responsive images -->
<picture>
  <source
    srcset="/images/hero-800.webp 800w, /images/hero-1200.webp 1200w"
    sizes="(max-width: 768px) 100vw, 80vw"
    type="image/webp"
  >
  <img src="/images/hero-1200.jpg" alt="..." width="1200" height="600">
</picture>
```

### معالجة الصور قبل النشر
```bash
# تحويل إلى WebP مع ضغط مناسب
cwebp -q 80 input.jpg -o output.webp

# أو بـ sharp في Node.js
sharp('input.jpg')
  .resize(1200, null, { withoutEnlargement: true })
  .webp({ quality: 80 })
  .toFile('output.webp');
```

## تحسين الخطوط

```css
@font-face {
  font-family: 'PrimaryFont';
  src: url('/fonts/primary.woff2') format('woff2');
  font-weight: 400 700;        /* variable font range */
  font-style: normal;
  font-display: swap;           /* إلزامي — لا FOIT */
  unicode-range: U+0600-06FF;  /* عربي فقط — يُقلل الحجم */
}
```

```html
<!-- preload للخط الأساسي فقط -->
<link rel="preload" href="/fonts/primary.woff2" as="font" type="font/woff2" crossorigin>
```

## إعدادات التخزين المؤقت

في إعدادات Netlify أو Vercel (`netlify.toml` أو `vercel.json`):

```toml
# netlify.toml
[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/js/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=2592000"

[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

**ملاحظة:** `immutable` على CSS وJS يعني أن أسماء الملفات تتغير مع كل build (content hashing) لضمان تحديث الكاش.

## قائمة فحص الأداء قبل النشر

```
ASSETS:
[ ] ملف CSS واحد مجمَّع ومضغوط
[ ] لا @import في CSS الإنتاج
[ ] JS مُجمَّع، defer أو type="module"
[ ] جميع الصور WebP مع أبعاد صريحة
[ ] loading="lazy" على كل ما تحت الطية
[ ] Hero image بـ fetchpriority="high"

HTML:
[ ] preconnect للموارد الخارجية
[ ] preload للخط الأساسي
[ ] font-display: swap على كل @font-face
[ ] width/height على كل <img>

LIGHTHOUSE:
[ ] تشغيل Lighthouse على Staging
[ ] Performance ≥ 90
[ ] Accessibility ≥ 95
[ ] LCP < 2.5s
[ ] CLS < 0.1

SERVER:
[ ] Cache-Control مُعيَّن على جميع الأصول
[ ] HTTPS مُفعَّل
[ ] Gzip أو Brotli مُفعَّل
```

## القيود التي يجب مراعاتها
- التحسينات هنا للمرحلة الأولى (موقع ثابت). المرحلة الثالثة (React) ستستلزم استراتيجية مختلفة (SSG، code splitting).
- لا تحسين مُبكّر لمشكلة لم تُقَس — قِس أولاً، حسّن ثانياً.

## التأثير على التطبيق
كل قرار هنا مرتبط بمقياس في `performance-budget.md`.
إذا كان مقياس خارج الميزانية، هذه الوثيقة هي المرجع الأول للحل.

## وثائق مرتبطة
- `performance-budget.md` — الأرقام التي تستهدفها هذه التقنيات
- `lighthouse-validation-process.md` — التحقق من النتائج
- `html-structure-guidelines.md` (← `03-technical/`) — HTML الصحيح الذي يبني عليه هذا

## الملف التالي
`seo-architecture.md`

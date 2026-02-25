# seo-architecture.md

## الهدف
تحديد استراتيجية SEO الكاملة للمنظومة — من البنية التقنية إلى المحتوى، مع ضمان الاتساق عبر جميع الصفحات.

## المشمول
- استراتيجية الكلمات المفتاحية المستهدفة
- متطلبات SEO التقنية لكل صفحة
- Structured Data (JSON-LD)
- ملفات sitemap.xml وrobots.txt
- معايير قياس أداء SEO

## غير المشمول
- تطبيق HTML الدلالي (→ `html-structure-guidelines.md`)
- أداء التحميل كعامل SEO (→ `performance-budget.md`)
- إمكانية الوصول المرتبطة بـ SEO (→ `accessibility-checklist.md`)

## استراتيجية الكلمات المفتاحية

### الهدف
لا هدف لكمية الزيارات. الهدف هو الظهور أمام المقيّم الصحيح حين يبحث بمصطلحات محددة.

### الكلمات المفتاحية المستهدفة

**Primary (عالية النية، منخفضة التنافس):**
- `full-stack engineer systems architecture` (إنجليزي)
- `مهندس برمجيات full-stack` (عربي)
- `[Amer's name] software engineer` (branded)

**Secondary (تصنيفية):**
- `systems-oriented web developer`
- `component architecture engineer`
- `API integration specialist`

**لا استهداف لـ:**
- كلمات مفتاحية عامة ("web developer for hire") — تجلب حجماً بدون جودة
- كلمات تنافسية عالية بدون خطة محتوى طويلة المدى

## متطلبات SEO التقنية

### لكل صفحة

**`<title>`:**
```html
<!-- الصفحة الرئيسية -->
<title>عامر — مهندس Full-Stack موجَّه نحو الأنظمة</title>

<!-- صفحات فرعية -->
<title>المشاريع | عامر — Full-Stack Engineer</title>

<!-- القاعدة: الموضوع أولاً، ثم الاسم، ثم الوصف الموجز -->
<!-- الحد: 50–60 حرف -->
```

**`<meta name="description">`:**
```html
<!-- وصفي ومحدد، يتضمن الكلمة المفتاحية الأساسية -->
<meta name="description"
  content="عامر مهندس full-stack يُطبّق الانضباط المعماري على مشاريع الأنظمة المعقدة. يعمل مع فرق تبحث عن قرارات بنيوية دقيقة، لا خدمات نمطية.">

<!-- الحد: 150–160 حرف -->
<!-- لا تكرار بين صفحتين -->
```

**Canonical URL:**
```html
<link rel="canonical" href="https://amer.dev/">
<link rel="canonical" href="https://amer.dev/projects/">
```

**Open Graph (لكل صفحة):**
```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://amer.dev/">
<meta property="og:title" content="عامر — مهندس Full-Stack موجَّه نحو الأنظمة">
<meta property="og:description" content="[نفس meta description]">
<meta property="og:image" content="https://amer.dev/images/og-default.jpg">
<!-- OG image: 1200x630px -->
```

**Twitter Card:**
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[نفس og:title]">
<meta name="twitter:description" content="[نفس og:description]">
<meta name="twitter:image" content="[نفس og:image]">
```

## Structured Data (JSON-LD)

### Person Schema — الصفحة الرئيسية
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "عامر",
  "url": "https://amer.dev",
  "jobTitle": "Full-Stack Software Engineer",
  "description": "مهندس full-stack موجَّه نحو الأنظمة، يُطبّق الانضباط المعماري على كل تكليف.",
  "knowsAbout": [
    "Systems Architecture",
    "Full-Stack Development",
    "React",
    "Node.js",
    "API Design"
  ],
  "sameAs": [
    "https://linkedin.com/in/amer",
    "https://github.com/amer"
  ]
}
</script>
```

### WebSite Schema — الصفحة الرئيسية
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "عامر | Full-Stack Engineer",
  "url": "https://amer.dev",
  "description": "الموقع المهني لعامر — مهندس full-stack موجَّه نحو الأنظمة.",
  "inLanguage": ["ar", "en"]
}
</script>
```

### CreativeWork Schema — لكل مشروع (اختياري)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "نظام إدارة مخزون موزّع",
  "author": {
    "@type": "Person",
    "name": "عامر"
  },
  "description": "نظام مخزون موزّع يعالج 80k معاملة يومياً عبر 12 مستودع.",
  "applicationCategory": "BusinessApplication"
}
</script>
```

## ملفات البنية التحتية

### `sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://amer.dev/</loc>
    <lastmod>2026-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://amer.dev/projects/</loc>
    <lastmod>2026-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

**القاعدة:** sitemap يُحدَّث مع كل إضافة صفحة جديدة.

### `robots.txt`
```
User-agent: *
Allow: /

Sitemap: https://amer.dev/sitemap.xml

# لا حاجة لـ Disallow في المرحلة الأولى — الموقع عام بالكامل
```

## معايير قياس أداء SEO

### أدوات القياس
| الأداة | ما تقيسه | التردد |
|--------|---------|--------|
| Google Search Console | الظهور، النقرات، الكلمات المفتاحية | شهري |
| Lighthouse → SEO | score تقني | قبل كل نشر |
| Schema Markup Validator | صحة JSON-LD | عند التغيير |

### المؤشرات المستهدفة (بعد 3 أشهر من النشر)
- Google Search Console: ظهور الموقع عند البحث باسم عامر
- Lighthouse SEO score: 95+
- صفحات مُفهرَسة: جميع الصفحات المنشورة

### ما لا يُقاس (في المرحلة الأولى)
- حجم الزيارات العضوية — ليس الهدف
- الترتيب على كلمات مفتاحية عامة — ليس الهدف

## القيود التي يجب مراعاتها
- SEO للمرحلة الأولى يستهدف الظهور المُتحكَّم به، لا الحجم
- تغيير URL لصفحة موجودة يستلزم redirect 301 لحفظ قوة SEO
- لا محتوى مكرر بين صفحتين — حتى descriptions

## التأثير على التطبيق
متطلبات هذه الوثيقة تُضاف إلى template كل صفحة جديدة كجزء من هيكل `html-structure-guidelines.md`.

## وثائق مرتبطة
- `html-structure-guidelines.md` (← `03-technical/`) — الترميز الذي ينفذ هذه الاستراتيجية
- `performance-budget.md` — الأداء كعامل SEO
- `lighthouse-validation-process.md` — التحقق من SEO score

## الملف التالي
`accessibility-checklist.md`

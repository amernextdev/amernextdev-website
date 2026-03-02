# html-structure-guidelines.md

## الهدف
تحديد معايير كتابة HTML في المنظومة — البنية الدلالية، تراتبية المحتوى، ومتطلبات SEO وإمكانية الوصول المدمجة.

## المشمول
- هيكل الصفحة القياسي
- قواعد استخدام العناصر الدلالية
- متطلبات SEO على مستوى الترميز
- متطلبات إمكانية الوصول الهيكلية
- أنماط مضادة محظورة

## غير المشمول
- نظام CSS وبنيته (→ `css-architecture-spec.md`)
- مخططات محتوى JSON (→ `json-content-schema.md`)
- معيار عزل المكونات (→ `component-isolation-standard.md`)
- اصطلاحات التسمية (→ `naming-conventions.md`)

## هيكل الصفحة القياسي

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[عنوان الصفحة] | عامر</title>
  <meta name="description" content="[وصف محدد للصفحة، 150–160 حرف]">
  <link rel="canonical" href="[URL كامل للصفحة]">

  <!-- Open Graph -->
  <meta property="og:title" content="[عنوان الصفحة]">
  <meta property="og:description" content="[وصف الصفحة]">
  <meta property="og:type" content="website">
  <meta property="og:url" content="[URL الصفحة]">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="[عنوان الصفحة]">
  <meta name="twitter:description" content="[وصف الصفحة]">

  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "عامر",
    "url": "[URL الموقع]",
    "jobTitle": "Full-Stack Software Engineer"
  }
  </script>

  <link rel="stylesheet" href="/css/main.css">
</head>
<body>
  <a href="#main-content" class="skip-link">تخطي إلى المحتوى الرئيسي</a>

  <header role="banner">
    <nav role="navigation" aria-label="التنقل الرئيسي">
      <!-- روابط التنقل -->
    </nav>
  </header>

  <main id="main-content" role="main">
    <!-- محتوى الصفحة -->
  </main>

  <footer role="contentinfo">
    <!-- محتوى التذييل -->
  </footer>

  <script src="/js/main.js" type="module" defer></script>
</body>
</html>
```

## قواعد العناصر الدلالية

### العناصر الهيكلية
| العنصر | الاستخدام الصحيح | محظور |
|--------|-----------------|-------|
| `<header>` | ترويسة الموقع، أو ترويسة قسم له header مستقل | ليس لكل div يحتوي عنواناً |
| `<main>` | المحتوى الأساسي للصفحة. واحد فقط لكل صفحة | لا يُتكرر |
| `<nav>` | مجموعات روابط تنقل. مع `aria-label` إذا تعدد | ليس لأي مجموعة روابط |
| `<section>` | قسم من الصفحة له موضوع مستقل | لا تحل محل `<div>` العادية |
| `<article>` | محتوى مستقل قابل لإعادة النشر (مشروع، تدوينة) | ليس للأقسام العامة |
| `<aside>` | محتوى ذو صلة لكن ثانوي | ليس لأي شريط جانبي |
| `<footer>` | تذييل الموقع أو القسم | ليس لأي div في النهاية |

### تراتبية العناوين
- **H1:** واحد لكل صفحة. يصف موضوع الصفحة الأساسي.
- **H2:** أقسام رئيسية تحت H1.
- **H3:** أقسام فرعية تحت H2.
- **لا تخطي درجات:** H1 → H3 مباشرة محظور. H1 → H2 → H3 صحيح.
- **العناوين للبنية، لا للتنسيق:** إذا أردت نصاً كبيراً بدون قيمة هيكلية — استخدم CSS على `<p>` أو `<span>`.

### العناصر الدلالية للمحتوى
```html
<!-- صحيح — دلالي -->
<time datetime="2024-01">يناير 2024</time>
<address><!-- معلومات تواصل فقط --></address>
<mark><!-- نص مميز ذو صلة بسياق --></mark>
<code><!-- كود مضمّن --></code>
<pre><code><!-- كتلة كود --></code></pre>

<!-- خاطئ — زخرفي بعناصر دلالية -->
<h3><!-- نص يريده صاحبه كبيراً لا هيكلياً --></h3>
<blockquote><!-- نص ليس اقتباساً حقيقياً --></blockquote>
```

## متطلبات SEO على مستوى الترميز

**لكل صفحة:**
- `<title>` فريد، 50–60 حرف، يتضمن الكلمة المفتاحية الأساسية
- `<meta name="description">` فريد، 150–160 حرف
- `rel="canonical"` بـ URL كامل
- Open Graph tags مكتملة
- Twitter Card tags مكتملة

**لكل الصفحات:**
- `sitemap.xml` موجود ومُحدَّث
- `robots.txt` حاضر
- Structured Data (JSON-LD) لـ Person وWebSite في الصفحة الرئيسية

**محظورات SEO:**
- لا عنوانين H1 في صفحة واحدة
- لا meta description مكررة بين صفحتين
- لا محتوى مخفي بـ CSS لأغراض SEO

## متطلبات إمكانية الوصول الهيكلية

**التنقل بلوحة المفاتيح:**
```html
<!-- رابط تخطي إلزامي في أعلى كل صفحة -->
<a href="#main-content" class="skip-link">تخطي إلى المحتوى الرئيسي</a>

<!-- مؤشر تركيز مرئي — لا يُزال بـ CSS -->
<!-- :focus-visible في CSS يحكم مظهره، لكن لا outline: none أبداً -->
```

**الصور:**
```html
<!-- صورة محتوى -->
<img src="project.webp" alt="لقطة شاشة لنظام إدارة المشاريع الذي بنيته لشركة X" width="800" height="600" loading="lazy">

<!-- صورة زخرفية صرفة -->
<img src="divider.svg" alt="" role="presentation" width="100" height="4">
```

**النماذج:**
```html
<!-- ارتباط label صريح — لا placeholder بديلاً عنه -->
<label for="contact-message">رسالتك</label>
<textarea id="contact-message" name="message"></textarea>
```

**ARIA معالم:**
```html
<!-- تُكمّل HTML الدلالي، لا تحله -->
<nav role="navigation" aria-label="التنقل الرئيسي">
<main role="main" id="main-content">
<footer role="contentinfo">
```

## الأنماط المضادة المحظورة

```html
<!-- ✗ div soup — لا بنية دلالية -->
<div class="header">
  <div class="nav">
    <div class="nav-item">الرئيسية</div>
  </div>
</div>

<!-- ✓ صحيح -->
<header>
  <nav aria-label="التنقل الرئيسي">
    <a href="/">الرئيسية</a>
  </nav>
</header>

<!-- ✗ تنسيق بعناصر هيكلية -->
<h4>نص يريده صاحبه صغيراً، لا ينتمي لمستوى H4 هيكلياً</h4>

<!-- ✓ صحيح -->
<p class="text--small">نفس النص بـ CSS</p>

<!-- ✗ جدول للتخطيط -->
<table><tr><td>عمود</td><td>عمود</td></tr></table>

<!-- ✓ صحيح -->
<div class="grid">...</div>

<!-- ✗ inline styles -->
<p style="color: red; font-size: 14px;">نص</p>

<!-- ✓ صحيح -->
<p class="text--error">نص</p>
```

## القيود التي يجب مراعاتها
- HTML الدلالي ليس خياراً جمالياً — هو متطلب لـ SEO وإمكانية الوصول وقابلية الاستخراج إلى React
- أي HTML لا يجتاز validation بـ W3C Validator يُعالج قبل النشر

## التأثير على التطبيق
كل صفحة جديدة تبدأ من هيكل القياسي الموثَّق هنا.
أي انحراف عن الهيكل يُوثَّق مع مسوّغه في الكود.

## وثائق مرتبطة
- `css-architecture-spec.md` — بنية CSS التي تُكمل هذا الترميز
- `naming-conventions.md` — اصطلاحات تسمية الـ classes المذكورة هنا
- `seo-architecture.md` (← `04-quality/`) — تفاصيل استراتيجية SEO الكاملة
- `accessibility-checklist.md` (← `04-quality/`) — قائمة فحص إمكانية الوصول الكاملة

## الملف التالي
`css-architecture-spec.md`

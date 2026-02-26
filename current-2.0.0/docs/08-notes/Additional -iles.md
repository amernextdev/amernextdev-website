# additional-files.md

## الهدف
توثيق الملفات الإضافية التي تُكمل المنظومة خارج HTML/CSS/JS — من ملفات البنية التحتية إلى الميتا-بيانات.

كل ملف موثَّق بـ: ما هو، لماذا يُضاف، المحتوى المقترح، وأين يُوضع.

---

## الملفات التي أشرت لإضافتها

### 1 — `site.webmanifest`
**ما هو:** ملف JSON يُعرِّف الموقع كـ Progressive Web App — يُتيح للمستخدمين إضافته لشاشة الهاتف كتطبيق.
**لماذا:** يُحسّن Lighthouse Best Practices، يُضيف icon محترفة عند الحفظ على الهاتف، ويُتيح تحكماً في كيفية ظهور الموقع خارج المتصفح.
**الموضع:** في جذر المشروع.

```json
{
  "name": "عامر — مهندس Full-Stack",
  "short_name": "عامر",
  "description": "مهندس full-stack موجَّه نحو الأنظمة",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#020617",
  "theme_color": "#020617",
  "lang": "ar",
  "dir": "rtl",
  "icons": [
    {
      "src": "/images/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/images/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

**ربط في HTML:**
```html
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#020617">
```

---

### 2 — `robots.txt`
**ما هو:** ملف نصي يُخبر محركات البحث أي صفحات تُفهرَس وأيها لا.
**لماذا:** بدونه بعض المحركات قد لا تفهرس الموقع أو تتصرف بشكل غير متوقع.
**الموضع:** في جذر المشروع — `https://amer.dev/robots.txt`.

```
User-agent: *
Allow: /

Sitemap: https://amer.dev/sitemap.xml

# ملاحظة: لا حاجة لـ Disallow في المرحلة الأولى
# الموقع عام بالكامل
```

**للمرحلة الخامسة (Client Portal):**
```
# أضف عند وجود portal
Disallow: /portal/
Disallow: /admin/
```

---

### 3 — `sitemap.xml`
**ما هو:** خريطة XML تُخبر محركات البحث بكل صفحات الموقع وأولوياتها وتاريخ آخر تحديث.
**لماذا:** يُسرّع الفهرسة ويُحسّن Lighthouse SEO score.
**الموضع:** في جذر المشروع — `https://amer.dev/sitemap.xml`.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>https://amer.dev/</loc>
    <lastmod>2026-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- أضف صفحات إضافية هنا عند إنشائها -->
  <!--
  <url>
    <loc>https://amer.dev/projects/</loc>
    <lastmod>2026-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  -->

</urlset>
```

**تحديث:** يُحدَّث يدوياً مع كل إضافة صفحة. في المرحلة الثالثة (Next.js) يُولَّد تلقائياً.

---

### 4 — `_headers`
**ما هو:** ملف خاص بـ Cloudflare Pages يُحدد HTTP headers مخصصة لكل مسار.
**لماذا:** يُتيح التحكم في أمان الموقع (CSP، HSTS) والأداء (Cache-Control) دون حاجة لخادم.
**الموضع:** في جذر المشروع.

```
# ============================================
# _headers — Cloudflare Pages Custom Headers
# ============================================

# Security Headers — كل الصفحات
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

# HSTS — HTTPS إلزامي
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

# Content Security Policy
# ملاحظة: اضبط على نطاق مصادرك الفعلية
/*
  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'

# Cache: الأصول الثابتة — سنة كاملة
/css/*
  Cache-Control: public, max-age=31536000, immutable

/js/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=2592000

/fonts/*
  Cache-Control: public, max-age=31536000, immutable

# Cache: HTML — لا كاش (يتحقق دائماً)
/*.html
  Cache-Control: public, max-age=0, must-revalidate

# Cache: Manifest و JSON
/site.webmanifest
  Cache-Control: public, max-age=86400
  Content-Type: application/manifest+json

/data/*.json
  Cache-Control: public, max-age=3600
```

---

### 5 — `_redirects`
**ما هو:** ملف خاص بـ Cloudflare Pages يُحدد إعادة توجيه URLs.
**لماذا:** يحفظ SEO عند تغيير مسار، ويضمن www → non-www (أو العكس).
**الموضع:** في جذر المشروع.

```
# ============================================
# _redirects — Cloudflare Pages Redirects
# ============================================

# www → non-www (أو العكس — اختر واحداً)
# https://www.amer.dev/* https://amer.dev/:splat 301

# مسارات قديمة إن وُجدت
# /portfolio  /projects  301
# /about      /#about    302

# SPA Fallback — للمرحلة الثالثة (React)
# /*  /index.html  200
```

**ملاحظة:** في المرحلة الأولى (HTML ثابت) هذا الملف قد يكون فارغاً إلا من www redirect.

---

### 6 — `.well-known/security.txt`
**ما هو:** ملف موحَّد (RFC 9116) يُخبر الباحثين الأمنيين كيف يُبلّغون عن ثغرات.
**لماذا:** يُظهر وعياً بالأمن، يُحسّن best practices score، ويُقدم قناة تواصل رسمية للأمن.
**الموضع:** `.well-known/security.txt` — `https://amer.dev/.well-known/security.txt`.

```
# ============================================
# security.txt — RFC 9116
# ============================================

Contact: mailto:security@amer.dev
Expires: 2027-01-01T00:00:00.000Z
Preferred-Languages: ar, en
Canonical: https://amer.dev/.well-known/security.txt

# Acknowledgments: https://amer.dev/security-hall-of-fame
# اختياري — أضفه إذا أردت شكر الباحثين علناً
```

**ملاحظة:** `Expires` يُحدَّث سنوياً. استبدل البريد بعنوانك الفعلي.

---

### 7 — `humans.txt`
**ما هو:** ملف نصي غير رسمي يُعرّف بالأشخاص والأدوات خلف بناء الموقع. مبادرة [humanstxt.org](http://humanstxt.org).
**لماذا:** يُضيف لمسة إنسانية، يُظهر شفافية، ويُعدّ Easter Egg محترفاً للمطوّرين الذين يجدونه.
**الموضع:** في جذر المشروع — `https://amer.dev/humans.txt`.

```
/* TEAM */
Developer & Designer: عامر
Location: [مدينتك، الدولة]
Languages: Arabic, English

/* THANKS */
Tools: VS Code, Cloudflare Pages, Chrome DevTools
Standards: HTML5, CSS3, ES6+, WCAG 2.1

/* SITE */
Last update: 2026-01-15
Standards: HTML5, CSS3
Components: Vanilla JS, Custom CSS
Software: Built by hand — no framework

/* PHILOSOPHY */
Precision over volume.
Architecture before features.
```

**ربط في HTML (اختياري):**
```html
<link rel="author" href="/humans.txt">
```

---

### 8 — `README.md`
**ما هو:** الملف الأول الذي يراه أي شخص يفتح repository المشروع.
**لماذا:** يُقدم المشروع للمطوّرين، يشرح كيف يُشغَّل محلياً، ويُثبت جودة التفكير.
**الموضع:** جذر المشروع. ← **تم إنشاؤه بالفعل في هذه الجلسة.**

---

### 9 — `404.html`
**ما هو:** صفحة مخصصة تظهر عند الوصول لرابط غير موجود.
**لماذا:** الصفحة الافتراضية لـ Cloudflare مكسورة بصرياً وتُضر بالتموضع. صفحة 404 مخصصة تحافظ على الهوية البصرية وتُوجّه المستخدم.
**الموضع:** في جذر المشروع.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 — الصفحة غير موجودة | عامر</title>
  <meta name="robots" content="noindex">
  <link rel="stylesheet" href="/css/main.css">
</head>
<body>
  <main id="main-content" class="error-page">
    <div class="error-page__container">
      <span class="error-page__code">404</span>
      <h1 class="error-page__title">هذه الصفحة غير موجودة</h1>
      <p class="error-page__message">
        الرابط الذي وصلت إليه لا يوجد أو انتقل لمكان آخر.
      </p>
      <a href="/" class="error-page__link">العودة للصفحة الرئيسية</a>
    </div>
  </main>
</body>
</html>
```

**ربط في `_redirects` لـ Cloudflare:**
```
/* /404.html 404
```

---

## ملفات إضافية ليست في قائمتك — موصى بها

### `favicon.ico` + مجموعة الأيقونات
```
favicon.ico          ← 16×16 و 32×32 (multi-size .ico)
images/icons/
├── icon-192.png     ← للـ PWA manifest
├── icon-512.png     ← للـ PWA manifest
├── apple-touch-icon.png  ← 180×180 لـ iOS
└── og-image.jpg     ← 1200×630 لـ Open Graph
```

**ربط في HTML:**
```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/images/icons/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/images/icons/apple-touch-icon.png">
```

---

### `CHANGELOG.md`
**ما هو:** سجل تاريخي بكل تغيير جوهري في المشروع مرتباً بالإصدار.
**لماذا:** يُتيح تتبع تطور المشروع، ويُسهّل rollback.
← موثَّق تفصيلياً في [`06-operations/release-versioning.md`](./06-operations/release-versioning.md).

---

### `LICENSE`
**ما هو:** ملف يُحدد شروط استخدام الكود.
**لماذا:** بدونه الكود "كل الحقوق محفوظة" افتراضياً. موقع محترف يوضح موقفه.

```
All Rights Reserved

Copyright (c) 2026 Amer

This source code is provided for viewing purposes only.
Reproduction, distribution, or use of any kind is not permitted
without explicit written permission from the author.
```

---

### `netlify.toml` / `wrangler.toml`
**ما هو:** ملف إعداد Cloudflare (أو Netlify بديلاً).
**لماذا:** يُتيح تحديد build command، إعادة التوجيه، والـ environment variables بشكل مُصدَّر مع الكود.

```toml
# wrangler.toml — Cloudflare Pages
name = "amer-portfolio"
compatibility_date = "2026-01-15"

[build]
command = ""
destination = "/"

[[redirects]]
from = "/*"
to = "/404.html"
status = 404
```

---

## ترتيب الإضافة الموصى به

```
مرحلة الإطلاق:
1. favicon.ico + icons  ← قبل أي شيء
2. robots.txt           ← إلزامي للـ SEO
3. sitemap.xml          ← إلزامي للـ SEO
4. _headers             ← أمان وأداء
5. _redirects           ← حتى لو فارغ
6. site.webmanifest     ← لتحسين Lighthouse
7. 404.html             ← لحماية الهوية البصرية
8. CHANGELOG.md         ← يبدأ بـ v1.0.0

بعد الإطلاق:
9. .well-known/security.txt  ← بعد تثبيت البريد
10. humans.txt               ← اختياري، لمسة مهنية

للمراحل اللاحقة:
11. LICENSE              ← عند نشر الكود علناً
12. wrangler.toml        ← عند الحاجة لـ build pipeline
```

## وثائق مرتبطة
- [`seo-architecture.md`](./04-quality/seo-architecture.md) — robots.txt وsitemap.xml بالتفصيل
- [`performance-budget.md`](./04-quality/performance-budget.md) — كيف تُؤثر _headers على الكاش
- [`launch-checklist.md`](./06-operations/launch-checklist.md) — هذه الملفات جزء من مرحلة التحقق

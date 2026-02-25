# 🔍 seo-technical.md — SEO التقني

> "SEO الجيد لا يُخدع محركات البحث — يُساعدها على فهم ما هو موجود بالفعل."

---

## 1️⃣ مبدأ SEO في هذا المشروع

**لا نبني لـ Google — نبني للزائر. Google تُكافئ ما يُفيد الزائر.**

هذا يعني:
- المحتوى الجيد أهم من keyword stuffing
- الأداء ضروري (Core Web Vitals عامل ترتيب مباشر)
- Accessibility وSEO يتشاركان معظم المتطلبات
- Structured Data تُساعد Google على الفهم — لا على الغش

---

## 2️⃣ Metadata API — Next.js

### الـ Base Metadata (في `layout.tsx`):

```typescript
// app/layout.tsx
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  // ─── الأساسيات ───────────────────────────────────
  metadataBase: new URL('https://yourname.com'),  // ضروري للـ OG images المطلقة

  title: {
    default:  'اسم المطور — حلول رقمية',
    template: '%s | اسم المطور',  // تُستخدم في الصفحات الداخلية
  },

  description: 'مطور حلول رقمية متخصص في بناء تطبيقات وأنظمة ويب. أفكر بمنهجية هندسية وأبني ما تحتاجه أعمالك لتنمو.',

  // ─── Keywords (أقل أهمية مما كانت — لكن لا ضرر) ─
  keywords: ['مطور ويب', 'تطوير تطبيقات', 'حلول رقمية', 'Next.js', 'React'],

  // ─── Canonical ─────────────────────────────────
  alternates: {
    canonical: '/',
  },

  // ─── Robots ────────────────────────────────────
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      'max-image-preview': 'large',
      'max-snippet':       -1,       // لا حد للـ snippet
    },
  },

  // ─── OpenGraph ─────────────────────────────────
  openGraph: {
    type:        'website',
    locale:      'ar_SA',
    url:         'https://yourname.com',
    siteName:    'اسم المطور',
    title:       'اسم المطور — حلول رقمية',
    description: 'مطور حلول رقمية متخصص...',
    images: [
      {
        url:    '/og/default.png',   // 1200×630px
        width:  1200,
        height: 630,
        alt:    'اسم المطور — مطور حلول رقمية',
      },
    ],
  },

  // ─── Twitter Card ───────────────────────────────
  twitter: {
    card:        'summary_large_image',
    title:       'اسم المطور — حلول رقمية',
    description: 'مطور حلول رقمية متخصص...',
    images:      ['/og/default.png'],
    creator:     '@your_handle',  // إذا كان لديك Twitter
  },
};

export const viewport: Viewport = {
  themeColor:    '#0F1117',  // لون Navbar في المتصفحات الداعمة
  width:         'device-width',
  initialScale:  1,
  maximumScale:  5,           // يُتيح Zoom للمستخدمين (Accessibility)
};
```

---

### Metadata لكل صفحة:

```typescript
// app/about/page.tsx
export const metadata: Metadata = {
  title:       'من أنا',           // يُصبح: "من أنا | اسم المطور"
  description: 'مطور برمجيات يُفكر بطريقة هندسية ويبني أنظمة رقمية...',
  alternates: { canonical: '/about' },
  openGraph: {
    title:    'من أنا — اسم المطور',
    url:      '/about',
    images: [{ url: '/og/about.png', width: 1200, height: 630, alt: '...' }],
  },
};

// app/work/[slug]/page.tsx — ديناميكي
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  if (!project) return { title: 'مشروع غير موجود' };

  return {
    title:       project.title,
    description: project.excerpt,
    alternates:  { canonical: `/work/${params.slug}` },
    openGraph: {
      type:        'article',
      title:       project.title,
      description: project.excerpt,
      url:         `/work/${params.slug}`,
      publishedTime: project.publishedAt.toISOString(),
      images: [
        {
          url:    project.coverImage,
          width:  1200,
          height: 630,
          alt:    project.title,
        },
      ],
    },
  };
}
```

---

## 3️⃣ Structured Data — JSON-LD

### Schema للصفحة الرئيسية (Person):

```typescript
// components/schemas/PersonSchema.tsx
export function PersonSchema() {
  const schema = {
    '@context':  'https://schema.org',
    '@type':     'Person',
    name:        'اسمك الكامل',
    url:         'https://yourname.com',
    description: 'مطور حلول رقمية متخصص في بناء تطبيقات وأنظمة ويب.',
    jobTitle:    'Software Developer',
    knowsAbout:  ['Web Development', 'React', 'Next.js', 'Node.js'],
    sameAs: [
      'https://github.com/yourusername',
      'https://linkedin.com/in/yourusername',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### Schema لدراسة الحالة (Article/TechArticle):

```typescript
// يُضاف في /work/[slug]/page.tsx
export function CaseStudySchema({ project }: { project: Project }) {
  const schema = {
    '@context':        'https://schema.org',
    '@type':           'TechArticle',
    headline:          project.title,
    description:       project.excerpt,
    datePublished:     project.publishedAt.toISOString(),
    dateModified:      project.updatedAt?.toISOString(),
    author: {
      '@type': 'Person',
      name:    'اسمك الكامل',
      url:     'https://yourname.com',
    },
    image: {
      '@type':  'ImageObject',
      url:      `https://yourname.com${project.coverImage}`,
      width:    1200,
      height:   630,
    },
    publisher: {
      '@type': 'Person',
      name:    'اسمك الكامل',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### Schema للصفحة الرئيسية (WebSite — يُتيح SearchAction):

```typescript
export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type':    'WebSite',
    name:       'اسمك الكامل',
    url:        'https://yourname.com',
    description: '...',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

---

## 4️⃣ OpenGraph Images — التوليد الآلي

بدلاً من صور PNG ثابتة، نُولّد OG images ديناميكياً:

```typescript
// app/work/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size    = { width: 1200, height: 630 };

export default async function OGImage(
  { params }: { params: { slug: string } }
) {
  const project = await getProjectBySlug(params.slug);

  return new ImageResponse(
    (
      <div style={{
        width:      '100%',
        height:     '100%',
        display:    'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        background: '#0F1117',
        padding:    64,
      }}>
        <div style={{
          color:      '#6B7280',
          fontSize:   16,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: 16,
        }}>
          {project.label}
        </div>
        <div style={{
          color:      '#F5F4F0',
          fontSize:   48,
          fontWeight: 700,
          lineHeight: 1.2,
          maxWidth:   800,
        }}>
          {project.title}
        </div>
        <div style={{
          marginTop:  32,
          color:      '#6B7280',
          fontSize:   18,
        }}>
          yourname.com
        </div>
      </div>
    ),
    { ...size }
  );
}
```

---

## 5️⃣ HTML Semantics — البنية الدلالية

### قواعد الـ Heading Hierarchy:

```
كل صفحة: H1 واحد فقط — يصف الصفحة
H2: عناوين الـ Sections الرئيسية
H3: عناوين داخل Section (Cards، خطوات)
H4+: نادراً — فقط عند الحاجة الحقيقية

❌ تخطي مستويات: H1 → H3 (يكسر منطق الـ outline)
❌ استخدام H للمظهر لا للبنية (استخدم className)
```

### Semantic HTML:

```html
<!-- ✅ البنية الصحيحة -->
<header>                    ← Navbar
  <nav aria-label="القائمة الرئيسية">
    <ul role="list">
      <li><a href="/work">الأعمال</a></li>
    </ul>
  </nav>
</header>

<main>
  <section aria-labelledby="hero-title">
    <h1 id="hero-title">...</h1>
  </section>

  <section aria-labelledby="work-title">
    <h2 id="work-title">من الأعمال</h2>
    <ul role="list">                  ← قائمة المشاريع
      <li>
        <article>                     ← كل مشروع article
          <h3>اسم المشروع</h3>
        </article>
      </li>
    </ul>
  </section>
</main>

<footer>...</footer>
```

---

## 6️⃣ Accessibility — إمكانية الوصول

### المتطلبات الأساسية (WCAG 2.1 AA):

**النصوص والتباين:**
```
نص عادي:   نسبة تباين ≥ 4.5:1
نص كبير:   نسبة تباين ≥ 3:1
← الأرقام الكاملة في color-system.md
```

**لوحة المفاتيح:**
```typescript
// كل عنصر تفاعلي يجب أن يكون:
// 1. قابلاً للوصول بـ Tab
// 2. له focus-visible واضح (موثّق في interaction-rules.md)
// 3. يُفعَّل بـ Enter أو Space

// ✅ Skip Link — لتخطي التنقل مباشرة للمحتوى
<a href="#main-content" className="skip-link">
  تخطّ إلى المحتوى الرئيسي
</a>
```

**ARIA Labels:**
```tsx
// ✅ أيقونات بدون نص — لا بد من label
<button aria-label="إغلاق النافذة">
  <XIcon aria-hidden="true" />
</button>

// ✅ روابط تُكرر في الصفحة
<a href={`/work/${slug}`} aria-label={`اطّلع على تفاصيل مشروع ${title}`}>
  اقرأ المزيد
</a>

// ✅ النماذج
<label htmlFor="email">البريد الإلكتروني</label>
<input
  id="email"
  name="email"
  type="email"
  aria-required="true"
  aria-describedby="email-error"
/>
<span id="email-error" role="alert">
  {errors.email?.message}
</span>
```

**اللغة والاتجاه:**
```html
<html lang="ar" dir="rtl">
<!-- لأي محتوى إنجليزي داخل الصفحة: -->
<code lang="en" dir="ltr">const x = 1;</code>
```

---

## 7️⃣ `robots.txt` و `sitemap.xml`

```typescript
// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow:     '/',
        disallow:  ['/api/'],  // لا نُفهرس الـ API routes
      },
    ],
    sitemap: 'https://yourname.com/sitemap.xml',
  };
}
```

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjects();
  const baseUrl  = 'https://yourname.com';

  const staticPages = ['', '/work', '/about', '/contact'].map((path) => ({
    url:          `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority:     path === '' ? 1 : 0.8,
  }));

  const projectPages = projects.map((p) => ({
    url:          `${baseUrl}/work/${p.slug}`,
    lastModified: p.updatedAt || p.publishedAt,
    changeFrequency: 'monthly' as const,
    priority:     0.7,
  }));

  return [...staticPages, ...projectPages];
}
```

---

## 8️⃣ قائمة مراجعة SEO — Pre-launch

```
☐ كل صفحة لها title فريد + description ≤ 160 حرف
☐ H1 واحد فقط في كل صفحة
☐ كل صورة لها alt وصفي (ليس اسم الملف)
☐ Canonical URL محدد لكل صفحة
☐ OpenGraph image 1200×630 لكل صفحة
☐ JSON-LD Schema صحيح (اختبر بـ Rich Results Test)
☐ robots.txt يسمح بالـ Indexing
☐ sitemap.xml يشمل كل الصفحات المفهرسة
☐ Internal links تربط الصفحات ببعض
☐ لا broken links (اختبر بـ Screaming Frog أو Ahrefs)
☐ الموقع يعمل على HTTPS
☐ Core Web Vitals تجتاز الحد الأدنى
☐ lang و dir محددان على <html>
☐ Skip Link موجود
☐ كل عنصر تفاعلي له focus-visible
```

---

*مرتبط بـ: [`performance.md`](./performance.md) | [`tech-stack.md`](./tech-stack.md) | [`sitemap.md`](../architecture/sitemap.md) | [`content-strategy.md`](../strategy/content-strategy.md)*

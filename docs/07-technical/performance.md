# ⚡ performance.md — الأداء

> "الأداء ليس ميزة — هو شرط. موقع بطيء يخسر العميل قبل أن يقرأ كلمة واحدة."

---

## 1️⃣ لماذا الأداء استراتيجي هنا

موقع التموضع المهني لديه سياق خاص:

```
الزائر يحكم على المطور من الموقع نفسه.
موقع بطيء يقول: "المطور لا يهتم بالأداء."
موقع سريع يقول: "هذا شخص يأخذ التفاصيل بجدية."
```

الأداء هنا رسالة ضمنية قبل أن يكون مقياساً تقنياً.

---

## 2️⃣ الأهداف — Lighthouse Targets

### الحد الأدنى المقبول (لا نُطلق دونه):

```
Performance:    ≥ 90
Accessibility:  ≥ 95
Best Practices: ≥ 95
SEO:            ≥ 95
```

### الهدف الفعلي:

```
Performance:    ≥ 95
Accessibility:  100
Best Practices: 100
SEO:            100
```

### Web Vitals المستهدفة:

```
LCP  (Largest Contentful Paint):     ≤ 2.5s    ← وقت ظهور أكبر عنصر
FID  (First Input Delay):            ≤ 100ms   ← استجابة التفاعل الأول
CLS  (Cumulative Layout Shift):      ≤ 0.1     ← استقرار التخطيط
TTFB (Time to First Byte):           ≤ 800ms   ← سرعة الخادم
INP  (Interaction to Next Paint):    ≤ 200ms   ← استجابة التفاعلات
```

---

## 3️⃣ استراتيجية الأداء — الطبقات

---

### الطبقة 1 — Rendering Strategy (الأهم)

**القاعدة الحاكمة:** كل صفحة تُختار لها استراتيجية Rendering مُبرَّرة.

```typescript
// app/page.tsx — الرئيسية
// استراتيجية: Static Generation (SSG)
// السبب: المحتوى لا يتغير بين الزيارات
export const dynamic = 'force-static';

// app/work/[slug]/page.tsx — دراسة حالة
// استراتيجية: SSG مع Revalidation
// السبب: يتغير نادراً، لكن يجب أن يُحدَّث بعد نشر جديد
export const revalidate = 60; // يُعيد البناء كل 60 ثانية إذا طُلب

// generateStaticParams — يُعرّف Next.js بالـ slugs مسبقاً
export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}
```

**لماذا هذا يُحسّن الأداء؟**
SSG تعني: الـ HTML جاهز على الخادم ← يُرسل مباشرة دون معالجة ← TTFB يقترب من صفر ← LCP يتحسن بشكل مباشر.

---

### الطبقة 2 — Image Optimization

**القاعدة:** لا `<img>` HTML مباشر في المشروع — فقط `next/image`.

```tsx
import Image from 'next/image';

// ✅ صورة Hero للمشروع — أولوية تحميل عالية
<Image
  src="/work/project-cover.jpg"
  alt="لوحة تحكم تُظهر ثلاثة مقاييس رئيسية — قرار تصميمي مقصود"
  width={1200}
  height={675}
  priority          // ← يُحمَّل مبكراً — يُحسّن LCP
  quality={85}      // ← توازن بين الجودة والحجم
  placeholder="blur"// ← يمنع CLS أثناء التحميل
/>

// ✅ صورة في Card — تحميل مُؤجَّل
<Image
  src="/work/thumbnail.jpg"
  alt="..."
  width={800}
  height={450}
  loading="lazy"    // ← الافتراضي في next/image، لكن صريح للوضوح
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    // ← يُخبر المتصفح بالحجم المتوقع على كل شاشة
/>
```

**إعداد `next.config.js` للصور:**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'], // AVIF أولاً — أصغر حجماً
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes:  [16, 32, 48, 64, 96, 128, 256],
    // إذا كانت الصور من CDN خارجي:
    remotePatterns: [
      { protocol: 'https', hostname: 'your-cdn.com' }
    ],
  },
};
```

---

### الطبقة 3 — Font Optimization

**المشكلة:** الخطوط من Google Fonts تُضيف HTTP request خارجي + FOUT (Flash of Unstyled Text).

**الحل — Self-hosted fonts:**

```typescript
// lib/fonts.ts
import { Inter, Fraunces } from 'next/font/google';

export const inter = Inter({
  subsets:  ['latin'],
  variable: '--font-sans',
  // تحميل الأوزان الضرورية فقط — لا الكل
  weight:   ['400', '500', '600', '700'],
  display:  'swap',  // النص يظهر بخط النظام ريثما يُحمَّل Inter
  preload:  true,
});

export const fraunces = Fraunces({
  subsets:  ['latin'],
  variable: '--font-display',
  weight:   ['700'],  // نستخدم Bold فقط في Hero
  display:  'swap',
  preload:  false, // لا preload — يُستخدم فقط في الـ Hero scroll
  // italic: true  ← أضف إذا احتجت italic variant
});
```

```tsx
// app/layout.tsx — تطبيق الخطوط
import { inter, fraunces } from '@/lib/fonts';

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl"
      className={`${inter.variable} ${fraunces.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

**لماذا self-hosted أسرع من Google Fonts CDN؟**
يُلغي DNS lookup + TCP handshake لـ domain خارجي + يُتيح font-display بشكل أمثل.

---

### الطبقة 4 — JavaScript Bundle Optimization

**مبدأ: أقل JavaScript كلما أمكن.**

```typescript
// ✅ Dynamic Import للمكوّنات الثقيلة
import dynamic from 'next/dynamic';

// Modal: لا يُحمَّل إلا عند الحاجة
const ProjectModal = dynamic(
  () => import('@/components/ui/ProjectModal'),
  {
    loading: () => <div className="animate-pulse" />, // Skeleton أثناء التحميل
    ssr:     false, // Modal لا يحتاج SSR
  }
);

// ✅ Server Components (افتراضي في App Router)
// أي component لا يحتاج state أو browser APIs → يبقى Server Component
// → لا JS يُرسَل للمتصفح لهذا المكوّن

// ✅ 'use client' فقط عند الضرورة
// متى نضيف 'use client'؟
// - useState / useEffect
// - Browser APIs (window, document)
// - Event handlers (onClick, onChange)
// - Third-party libraries تعمل فقط في المتصفح
```

**قاعدة التدقيق:**

```bash
# تحليل حجم الـ Bundle بعد كل تغيير كبير
npx @next/bundle-analyzer
# أو
npm run build && npx next analyze
```

---

### الطبقة 5 — CSS Optimization

```css
/* ✅ Critical CSS: الـ Above-the-fold styles تُحمَّل أولاً */
/* Next.js يفعل هذا تلقائياً مع Tailwind — لا يلزم إعداد يدوي */

/* ✅ لا @import في CSS — يُسبب waterfall */
/* استخدم @layer بدلاً */

/* ✅ will-change فقط للعناصر التي ستُحرَّك فعلاً */
.card {
  will-change: transform; /* ← يُنبّه GPU مسبقاً */
}

/* ✅ أزل will-change بعد الـ Animation */
.card:not(:hover) {
  will-change: auto;
}
```

---

### الطبقة 6 — Caching Strategy

```typescript
// next.config.js — Cache Headers للأصول الثابتة
const nextConfig = {
  async headers() {
    return [
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            // الخطوط لا تتغير — cache لسنة كاملة
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            // ملفات Next.js static — hash يتغير مع كل build
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            // الصفحات: cache قصير + stale-while-revalidate
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
};
```

---

## 4️⃣ Lazy Loading — التفاصيل التشغيلية

### الصور:

```
Hero image:     priority={true}    ← يُحمَّل مبكراً (أهم صورة في LCP)
باقي الصور:    loading="lazy"     ← الافتراضي — يُحمَّل عند الاقتراب
```

### المكوّنات:

```typescript
// معيار القرار:
// هل يظهر هذا المكوّن في الـ viewport الأول؟
//   نعم → import عادي
//   لا  → dynamic import

// أمثلة:
// Hero, Navbar, CTA الأول → import عادي
// Modal, ProjectDetails, BlogWidget → dynamic import
```

### المحتوى:

```typescript
// Intersection Observer للـ Sections
// (موثّق كاملاً في interaction-rules.md)
// threshold: 0.1 → يبدأ التحميل عند 10% من ظهور العنصر
```

---

## 5️⃣ منهجية القياس — Workflow

### قبل كل Deployment:

```bash
# 1. Build محلي
npm run build

# 2. فحص Bundle Size
# حد أقصى مقبول: 100KB JS للصفحة الرئيسية (gzipped)
cat .next/analyze/client.html

# 3. Lighthouse محلي
npx lighthouse http://localhost:3000 \
  --view \
  --output=html \
  --throttling-method=devtools
```

### أدوات القياس المعتمدة:

```
PageSpeed Insights:  https://pagespeed.web.dev  ← الأساسي (بيانات حقيقية)
WebPageTest:         https://webpagetest.org    ← تفصيلي + Waterfall
Vercel Analytics:    من Dashboard              ← Web Vitals الحقيقية في الإنتاج
Chrome DevTools:     Network + Performance tab ← تحليل محلي
```

### جدول المتابعة:

```
عند كل Deployment:  Lighthouse Score يجب ألا ينزل عن 90
أسبوعياً:           مراجعة Vercel Analytics للـ Web Vitals
شهرياً:             تدقيق Bundle Size ومراجعة Dynamic Imports
```

---

## 6️⃣ قائمة مراجعة الأداء — Pre-launch Checklist

```
☐ كل الصور بـ next/image مع alt وصفي حقيقي
☐ Hero image بـ priority={true}
☐ الخطوط self-hosted عبر next/font
☐ الصفحات الرئيسية بـ SSG (لا SSR)
☐ 'use client' موجود فقط حيث ضروري
☐ المكوّنات الثقيلة بـ dynamic import
☐ لا @import في CSS
☐ will-change مُستخدم باعتدال
☐ Cache Headers محددة للأصول الثابتة
☐ Lighthouse ≥ 90 على Mobile (الأصعب — يضمن Desktop أيضاً)
☐ CLS = 0 (لا تغيير في layout بعد التحميل)
☐ لا console.errors في production
```

---

*مرتبط بـ: [`tech-stack.md`](./tech-stack.md) | [`seo-technical.md`](./seo-technical.md) | [`interaction-rules.md`](../ux-ui/interaction-rules.md)*

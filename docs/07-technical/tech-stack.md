# ⚙️ tech-stack.md — المكدّس التقني

> "التقنية الصحيحة ليست الأحدث — بل الأنسب للمشكلة والأكثر قدرة على التطور."

---

## 1️⃣ معايير الاختيار — قبل أي تقنية

قبل ذكر أي framework أو library، هذه المعايير هي المقياس الذي تُحكَم به كل تقنية:

```
1. الملاءمة:     هل تُحل المشكلة التي صُممت لها — لا أكبر منها ولا أصغر؟
2. القابلية:     هل يسهل توسيعها مع نمو المشروع دون إعادة بناء؟
3. الاستدامة:    هل لها مجتمع نشط ومستقبل واضح؟
4. الأداء:       هل تُنتج مخرجات تُحقق Lighthouse ≥ 90؟
5. القابلية للصيانة: هل يستطيع مطور آخر فهم الكود بعد 6 أشهر؟
```

> [!NOTE]
> أي تقنية تفشل في أكثر من معيار واحد لا تدخل الـ Stack — بصرف النظر عن شهرتها.

---

## 2️⃣ المكدّس المعتمد — الطبقات الكاملة

---

### الطبقة 1 — Frontend Framework

```
التقنية:  Next.js 14+ (App Router)
البديل المرفوض: Vite + React SPA
```

**لماذا Next.js؟**
- **SSG/SSR out of the box:** صفحات الموقع (Homepage، About، Work) تُبنى static عند البناء → أسرع تحميل ممكن، أفضل SEO
- **App Router:** نظام routing مبني على الملفات يُبسّط البنية ويُتيح Server Components لتقليل JS على العميل
- **Image Optimization:** `next/image` تعالج تحسين الصور تلقائياً (WebP، lazy loading، srcset) — ميزة حاسمة لـ Lighthouse
- **Metadata API:** توليد SEO meta آلي بدون ضوضاء إضافية

**لماذا رُفض Vite SPA؟**
SPA تُرسل HTML فارغاً — يضر بـ SEO ويزيد وقت التحميل الأول. لموقع تموضع يحتاج Google Indexing جيد، هذا غير مقبول.

---

### الطبقة 2 — Language

```
التقنية:  TypeScript (strict mode)
البديل المرفوض: JavaScript
```

**لماذا TypeScript بـ strict mode؟**
- يُلغي فئة كاملة من الأخطاء وقت التطوير — لا وقت الإنتاج
- يجعل الكود وثيقته الخاصة — كل function تُعلن عما تأخذه وما تُعيده
- strict mode تحديداً: يُجبر على التعامل مع `null` و`undefined` صراحةً — مصدر 40%+ من أخطاء Runtime الشائعة

```typescript
// بدون strict — يُمرر دون خطأ:
const name: string = null; // ❌ خطأ صامت

// مع strict — يُكشف فوراً:
const name: string | null = null; // ✅ يُجبر على التعامل الصريح
```

---

### الطبقة 3 — Styling

```
التقنية:  Tailwind CSS v3+ + CSS Custom Properties
البديل المرفوض: CSS Modules وحده / Styled Components
```

**لماذا Tailwind + CSS Variables؟**

Tailwind وحده يعني hardcoded values منتشرة في كل مكان — يتعارض مع نظام المتغيرات الذي بنيناه في `color-system.md` و`typography-system.md`.

الحل الهجين:
```css
/* CSS Variables تحمل قيم النظام */
:root {
  --color-ink: #0F1117;
  --space-6: 24px;
}
```

```javascript
// tailwind.config.js — يُوصَّل Tailwind بالمتغيرات
module.exports = {
  theme: {
    extend: {
      colors: {
        ink:    'var(--color-ink)',
        chalk:  'var(--color-chalk)',
        signal: 'var(--color-signal)',
        muted:  'var(--color-muted)',
      },
      spacing: {
        '18': 'var(--space-18)',
      },
      fontFamily: {
        sans:    ['Inter', 'var(--font-sans)'],
        display: ['Fraunces', 'var(--font-display)'],
      },
    },
  },
}
```

هذا يعني: Tailwind utility classes تعمل، والمتغيرات المركزية تبقى المصدر الوحيد للحقيقة.

**لماذا رُفض Styled Components؟**
Runtime CSS-in-JS يُضيف حجماً على JS bundle وقد يُسبب FOUC (Flash of Unstyled Content). لا يستحق التعقيد لموقع بهذا الحجم.

---

### الطبقة 4 — Content Management

```
المرحلة 1: MDX ملفات محلية (في /content)
المرحلة 2: Contentlayer أو Sanity (عند إضافة البلوج)
```

**لماذا MDX للمرحلة الأولى؟**
- دراسات الحالة والصفحات الثابتة لا تتغير يومياً — لا تحتاج CMS
- MDX يُتيح استخدام React Components داخل Markdown
- يُبنى ويُكاش عند Build time → أداء مثالي
- بدون dependency خارجي — لا API calls، لا downtime

**متى يُضاف CMS؟**
عند إضافة `/blog` — حين يصبح المحتوى متكرراً بما يجعل edit في كود مؤلم. حتى ذلك الحين: MDX.

---

### الطبقة 5 — Deployment & Hosting

```
التقنية:  Vercel
البديل:   Netlify / Railway
```

**لماذا Vercel؟**
- First-party Next.js support — كل Next.js feature يعمل بدون إعداد
- Edge Network بـ CDN عالمي → TTFB منخفض من أي مكان
- Preview Deployments لكل branch — مفيد جداً لمرحلة التطوير
- Analytics مدمجة (Web Vitals) بدون تثبيت إضافي
- Free tier يكفي تماماً للمرحلة الأولى

---

### الطبقة 6 — Form Handling

```
التقنية:  React Hook Form + Zod
البديل المرفوض: HTML form بدون validation library
```

**لماذا React Hook Form؟**
- Uncontrolled components → أداء أفضل (لا re-render عند كل keystroke)
- Integration طبيعي مع TypeScript وZod

**لماذا Zod؟**
```typescript
// Schema محدد مرة واحدة — يُستخدم في Frontend والـ API Handler
const contactSchema = z.object({
  name:    z.string().min(2, 'الاسم قصير جداً'),
  email:   z.string().email('بريد إلكتروني غير صحيح'),
  message: z.string().min(10).max(1000).optional(),
});

type ContactForm = z.infer<typeof contactSchema>; // TypeScript type آلي
```

---

### الطبقة 7 — Email Delivery

```
التقنية:  Resend + React Email
البديل المرفوض: Nodemailer مباشر
```

**لماذا Resend؟**
- API بسيطة مبنية للـ Developer Experience
- React Email يُتيح كتابة HTML emails بـ React components — لا template strings قبيحة
- Deliverability مضمونة (لا spam بدون سبب)
- Free tier: 100 email/يوم — يكفي بالكامل

---

## 3️⃣ ملخص المكدّس — نظرة واحدة

```
Framework:   Next.js 14+ (App Router, SSG)
Language:    TypeScript (strict)
Styling:     Tailwind CSS + CSS Custom Properties
Content:     MDX (مرحلة 1) → Sanity (مرحلة 2)
Deployment:  Vercel
Forms:       React Hook Form + Zod
Email:       Resend + React Email
Fonts:       Inter + Fraunces (Google Fonts self-hosted)
Icons:       Lucide React (lightweight, tree-shakable)
```

---

## 4️⃣ ما لا يوجد في الـ Stack — وسبب الغياب

| المرفوض | السبب |
|---|---|
| Redux / Zustand | لا state management معقد في موقع تموضع — Context يكفي أو بدونه |
| GraphQL | Overkill لـ data layer بسيطة — REST أو Server Components أكفأ |
| CSS-in-JS (Styled Components, Emotion) | Runtime cost غير مبرر، FOUC محتمل |
| WordPress / PHP | لا يدعم أهداف الأداء، ولا الرؤية التقنية |
| jQuery | 2024 — لا سبب لوجوده |
| Webpack manual config | Next.js يُعالجه — تعقيد بلا قيمة |

---

## 5️⃣ متطلبات البيئة — Environment Setup

```bash
# الإصدارات المطلوبة
Node.js:   >= 20.x (LTS)
npm:       >= 10.x
TypeScript: >= 5.x

# البدء
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"
```

---

*المرجع التالي: [`code-philosophy.md`](./code-philosophy.md)*
*مرتبط بـ: [`css-architecture.md`](./css-architecture.md) | [`performance.md`](./performance.md) | [`seo-technical.md`](./seo-technical.md)*

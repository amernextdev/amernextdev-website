# 🧹 code-philosophy.md — فلسفة الكود

> "الكود يُكتب مرة — ويُقرأ عشر مرات. اكتبه للقارئ، لا للمترجم."

---

## 1️⃣ المبدأ الجوهري

الكود الجيد لا يُثبت ذكاء الكاتب — يُثبت احترامه لمن سيقرأه لاحقاً، سواء كان شخصاً آخر أو نفسه بعد 6 أشهر.

معيار الكود الجيد في هذا المشروع سؤال واحد:

> **هل يستطيع مطور ذو خبرة متوسطة فهم هذا الكود دون شرح شفهي؟**

إذا لا — يُعاد كتابته.

---

## 2️⃣ بنية المجلدات — Folder Structure

```
src/
├── app/                          ← Next.js App Router
│   ├── (pages)/                  ← Route groups — لا تُضاف للـ URL
│   │   ├── page.tsx              ← / (Homepage)
│   │   ├── work/
│   │   │   ├── page.tsx          ← /work
│   │   │   └── [slug]/
│   │   │       └── page.tsx      ← /work/[slug]
│   │   ├── about/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   ├── api/                      ← API Routes
│   │   └── contact/
│   │       └── route.ts          ← POST /api/contact
│   ├── layout.tsx                ← Root Layout
│   ├── not-found.tsx
│   └── globals.css               ← CSS Variables + Tailwind base
│
├── components/                   ← UI Components
│   ├── ui/                       ← Primitive components (Button, Input...)
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   ├── sections/                 ← Page Sections (Hero, CTA, WorkGrid...)
│   │   ├── Hero.tsx
│   │   ├── WorkGrid.tsx
│   │   └── ...
│   ├── layout/                   ← Structural components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   └── forms/                    ← Form components
│       └── ContactForm.tsx
│
├── content/                      ← MDX Content
│   └── work/
│       ├── project-one.mdx
│       └── project-two.mdx
│
├── lib/                          ← Utilities & helpers
│   ├── utils.ts                  ← General utilities (cn(), formatDate()...)
│   ├── validations.ts            ← Zod schemas
│   └── fonts.ts                  ← Font configuration
│
├── types/                        ← TypeScript type definitions
│   ├── work.ts                   ← Project, CaseStudy types
│   └── common.ts                 ← Shared types
│
└── styles/                       ← Global styles (إذا لزم خارج globals.css)
```

### قواعد البنية:

**قاعدة الاستيراد المطلق:**
```typescript
// ❌ استيراد نسبي — يتكسر عند نقل الملف
import Button from '../../../components/ui/Button';

// ✅ استيراد مطلق — مستقر دائماً
import Button from '@/components/ui/Button';
```

**قاعدة index.ts:**
```typescript
// components/ui/index.ts — تُجمّع exports
export { Button }   from './Button';
export { Card }     from './Card';
export { Input }    from './Input';

// الاستخدام:
import { Button, Card } from '@/components/ui';
```

---

## 3️⃣ Naming Conventions — قواعد التسمية

### الملفات والمجلدات:

```
Components:     PascalCase.tsx         Button.tsx, WorkCard.tsx
Pages:          lowercase/page.tsx     work/page.tsx
Utilities:      camelCase.ts           formatDate.ts
Types:          camelCase.ts           work.ts
CSS Modules:    ComponentName.module.css
MDX Content:    kebab-case.mdx         case-study-saas.mdx
```

### المتغيرات والدوال:

```typescript
// ✅ أسماء تصف الغرض — لا النوع
const isContactFormVisible = true;   // لا: const bool1 = true
const formattedDate = '...';         // لا: const str = '...'
const projectList = [...];           // لا: const arr = [...]

// ✅ أفعال للدوال
function fetchProjectBySlug(slug: string) {...}   // لا: function project(...)
function handleFormSubmit(data: FormData) {...}    // لا: function submit(...)
function formatDateToArabic(date: Date) {...}      // لا: function format(...)

// ✅ Boolean بصيغة سؤال
const isLoading = false;
const hasError = false;
const canSubmit = true;
```

### TypeScript Types & Interfaces:

```typescript
// Types: PascalCase، اسم وصفي
type ProjectSlug = string;
type ContactFormData = { name: string; email: string; message?: string };

// Interfaces: PascalCase بدون I prefix
interface Project {           // لا: interface IProject
  slug: string;
  title: string;
  description: string;
  tags: string[];
  publishedAt: Date;
}

// Props: ComponentName + Props
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}
```

---

## 4️⃣ Clean Code Principles — مع أمثلة تطبيقية

### المبدأ 1 — دالة واحدة، مهمة واحدة

```typescript
// ❌ دالة تعمل كل شيء
async function handleContact(data: ContactFormData) {
  // تتحقق من البيانات
  if (!data.email.includes('@')) throw new Error('...');
  // تُنسّق الرسالة
  const body = `من: ${data.name}\nالبريد: ${data.email}`;
  // ترسل البريد
  await fetch('/api/send', { method: 'POST', body });
  // تُسجّل في قاعدة البيانات
  await db.insert('contacts', data);
}

// ✅ كل دالة مهمة واحدة واضحة
function validateContactData(data: unknown): ContactFormData {
  return contactSchema.parse(data);  // يرمي خطأ إذا فشل
}

function buildEmailContent(data: ContactFormData): string {
  return `من: ${data.name}\nالبريد: ${data.email}`;
}

async function sendContactEmail(content: string): Promise<void> {
  await resend.emails.send({ ... });
}

// الـ orchestrator يجمعها
async function handleContactSubmission(rawData: unknown): Promise<void> {
  const data    = validateContactData(rawData);
  const content = buildEmailContent(data);
  await sendContactEmail(content);
}
```

---

### المبدأ 2 — التعليقات تشرح "لماذا" لا "ماذا"

```typescript
// ❌ التعليق يصف ما يقوله الكود بالفعل
// يُضيف 1 للعداد
count++;

// ❌ تعليق بلا قيمة
// دالة لإرسال البريد
async function sendEmail() {...}

// ✅ التعليق يشرح قرار غير واضح
// نُستخدم setTimeout(0) لضمان أن DOM يُحدَّث أولاً
// قبل قراءة clientHeight — بدونه القيمة دائماً 0
setTimeout(() => { height = el.clientHeight; }, 0);

// ✅ تعليق يشرح السبب التجاري
// نُحدّد max-age بـ 60 ثانية فقط لأن بيانات المشاريع
// تتغير نادراً — لكن العميل قد يُضيف مشروعاً جديداً
// ولا نريد cache يُخفيه لساعات
export const revalidate = 60;
```

---

### المبدأ 3 — التعامل الصريح مع الأخطاء

```typescript
// ❌ خطأ يُبتلع بصمت
async function getProject(slug: string) {
  try {
    return await fetchProject(slug);
  } catch {
    return null; // ← الخطأ يختفي، المستدعي لا يعرف ماذا حدث
  }
}

// ✅ خطأ يُعالَج بوضوح
async function getProject(slug: string): Promise<Project | null> {
  try {
    return await fetchProject(slug);
  } catch (error) {
    // لا نُخفي الخطأ — نُسجّله ونُعيد null بوضوح
    console.error(`[getProject] فشل جلب المشروع: ${slug}`, error);
    return null;  // المستدعي يعرف أن النتيجة قد تكون null
  }
}

// المستدعي يتعامل مع الحالتين
const project = await getProject(slug);
if (!project) notFound(); // Next.js 404
```

---

### المبدأ 4 — الثوابت لها أسماء، لا أرقام سحرية

```typescript
// ❌ أرقام بلا معنى
if (message.length > 1000) { ... }
setTimeout(hide, 3000);
const maxItems = 6;

// ✅ ثوابت موثّقة بأسماء واضحة
const MESSAGE_MAX_LENGTH   = 1000;  // حد textarea في نموذج التواصل
const TOAST_DURATION_MS    = 3000;  // مدة ظهور رسالة النجاح
const HOMEPAGE_PROJECTS_COUNT = 3; // عدد المشاريع في الرئيسية

if (message.length > MESSAGE_MAX_LENGTH) { ... }
setTimeout(hide, TOAST_DURATION_MS);
```

---

### المبدأ 5 — لا Prop Drilling عميق

```typescript
// ❌ تمرير props عبر 3+ طبقات
<Page theme={theme}>
  <Layout theme={theme}>
    <Section theme={theme}>
      <Card theme={theme} />  {/* ← theme لم يُستخدم في الطبقات الوسيطة */}
    </Section>
  </Layout>
</Page>

// ✅ Context للـ global state
// contexts/ThemeContext.tsx
const ThemeContext = createContext<Theme>('dark');
export const useTheme = () => useContext(ThemeContext);

// Card.tsx
const theme = useTheme(); // مباشر — بدون تمرير عبر الأجداد
```

---

## 5️⃣ Component Architecture — هيكل المكوّن

```typescript
// قالب المكوّن الموحّد
// ─────────────────────────────────────────
// 1. Imports (مُرتّبة: React → Third-party → Internal)
import { useState, useCallback } from 'react';
import { motion }                from 'framer-motion';  // إذا لزم
import { cn }                   from '@/lib/utils';
import type { ButtonProps }      from '@/types/common';

// 2. Types/Interfaces (محلية للملف)
// (إذا كانت مُشتركة → تنتقل لـ /types)

// 3. Constants (الثوابت المحلية)
const VARIANTS = {
  primary:   'bg-signal text-white hover:bg-signal/90',
  secondary: 'bg-transparent border border-signal text-signal',
  ghost:     'bg-transparent underline underline-offset-2',
} as const;

// 4. Component
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center font-semibold transition-all',
        VARIANTS[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

---

## 6️⃣ Git Conventions — اتفاقيات الـ Commits

### صيغة Commit Message:

```
<type>(<scope>): <description>

type:
  feat     ← ميزة جديدة
  fix      ← إصلاح خطأ
  style    ← تغييرات CSS/تصميم
  refactor ← إعادة هيكلة بدون تغيير وظيفي
  perf     ← تحسين أداء
  docs     ← توثيق
  chore    ← إعداد، build config

أمثلة:
  feat(contact): add form validation with Zod
  fix(hero): correct H1 font on mobile
  perf(images): migrate to next/image for lazy loading
  style(navbar): update active state indicator
```

### قاعدة الـ Branch:

```
main        ← الإنتاج دائماً
dev         ← التطوير الرئيسي
feat/[name] ← ميزة جديدة: feat/contact-form
fix/[name]  ← إصلاح: fix/mobile-nav
```

---

*المرجع التالي: [`css-architecture.md`](./css-architecture.md)*
*مرتبط بـ: [`tech-stack.md`](./tech-stack.md) | [`components-spec.md`](../ux-ui/components-spec.md)*

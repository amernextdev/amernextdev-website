# api-transition-strategy.md

## الهدف
تحديد استراتيجية الانتقال من JSON files إلى API layer حقيقي في المرحلة الرابعة.

## المشمول
- مبرر الانتقال وشروطه
- بنية API المستهدفة
- استراتيجية الانتقال التدريجي
- خيارات الـ Backend وعوامل الاختيار
- schema compatibility بين JSON والـ API

## غير المشمول
- هجرة React (→ `react-migration-plan.md`)
- Client Portal كطبقة فوق الـ API (→ `client-portal-roadmap.md`)

## متى يُبدأ هذا الانتقال

الانتقال مُبرر حين تتحقق إحدى هذه الشروط:
- المحتوى يتغير بتردد يجعل code deployment لكل تحديث غير عملي (أكثر من مرة أسبوعياً)
- الحاجة لمحتوى مُخصَّص حسب المستخدم أو الجلسة
- قرار إنشاء Client Portal (المرحلة الخامسة) يستلزم auth وبيانات per-client
- الحاجة لـ analytics تفصيلية على مستوى المشاريع والزيارات

**لا يُبدأ قبل:** استقرار المرحلة الثالثة (React) ونضج معيار العزل.

## بنية API المستهدفة

### Endpoints الأساسية
```
GET  /api/v1/projects          → قائمة المشاريع (مع filtering)
GET  /api/v1/projects/:id      → مشروع واحد
GET  /api/v1/profile           → البيانات الشخصية
GET  /api/v1/config            → إعدادات الموقع

# لاحقاً (المرحلة الخامسة)
POST /api/v1/contact           → معالجة نموذج التواصل
POST /api/v1/admin/projects    → إضافة/تحديث مشروع (auth مطلوب)
```

### شكل الاستجابة
```typescript
// API response تعكس JSON schema الحالي بدون تغيير
// هذا هو الهدف من json-content-schema.md

// GET /api/v1/projects
{
  "data": Project[],           // نفس interface المرحلة الأولى
  "meta": {
    "total": number,
    "filtered": number
  }
}

// GET /api/v1/projects/:id
{
  "data": Project              // نفس interface
}
```

### Query Parameters
```
GET /api/v1/projects?status=featured
GET /api/v1/projects?tech=React
GET /api/v1/projects?limit=5&offset=0
```

## استراتيجية الانتقال التدريجي

### المبدأ
لا تغيير في React components. فقط مصدر البيانات يتغير.

```typescript
// المرحلة الثالثة — من JSON
export const getStaticProps = async () => {
  const data = await import('../data/portfolio.json');
  return { props: { projects: data.projects } };
};

// المرحلة الرابعة — من API (نفس props shape)
export const getServerSideProps = async () => {
  const response = await fetch('https://api.amer.dev/api/v1/projects');
  const { data } = await response.json();
  return { props: { projects: data } };
};

// الـ component لا يتغير — يستقبل نفس projects prop
```

### نمط Adapter للانتقال الآمن
```typescript
// data-layer/portfolio.ts
// طبقة تجريد تُتيح تبديل المصدر بدون تغيير الـ components

const USE_API = process.env.NEXT_PUBLIC_USE_API === 'true';

export async function getProjects(): Promise<Project[]> {
  if (USE_API) {
    const response = await fetch(`${process.env.API_URL}/api/v1/projects`);
    const { data } = await response.json();
    return data;
  }

  // Fallback للـ JSON خلال الانتقال
  const data = await import('../data/portfolio.json');
  return data.projects;
}
```

هذا النمط يُتيح:
- تشغيل الموقع بـ JSON وAPI في نفس الوقت (feature flag)
- Fallback آمن إذا API تعطّل
- اختبار API بدون نشر كامل

## خيارات الـ Backend

### الخيار أ — Node.js + Express/Fastify
**المبرر:** تناسق لغوي مع Frontend. TypeScript مشترك.
**متى:** إذا كانت المنظومة تتجه للـ SaaS وتحتاج مرونة كاملة.

### الخيار ب — Supabase (BaaS)
**المبرر:** PostgreSQL + auto-generated REST API + auth جاهز.
**متى:** إذا كانت الحاجة الأساسية هي database + auth بدون backend مخصص.

### الخيار ج — Next.js API Routes
**المبرر:** لا خادم منفصل. API في نفس مشروع Next.js.
**متى:** إذا كانت الـ API بسيطة ولا تحتاج scaling مستقل.

```typescript
// pages/api/v1/projects.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Project } from '../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: Project[] }>
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  // مؤقتاً من JSON — يُستبدل لاحقاً بـ database query
  const data = await import('../../data/portfolio.json');
  const projects = data.projects.filter(p => p.visibility.show_in_listing);

  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate');
  res.json({ data: projects });
}
```

**الخيار ج هو نقطة البداية الموصى بها** — تُنشأ API routes في Next.js أولاً، ثم تُنقل لخادم مستقل إذا احتُيج للـ scaling.

## Schema Compatibility

JSON schemas المرحلة الأولى مُصمَّمة لتتوافق مع API responses.
هذا الجدول يُظهر التحويل:

| JSON field | API field | تغيير |
|-----------|----------|-------|
| `projects[]` | `data[]` | يُلفّ في `data` |
| `project.id` | `project.id` | لا تغيير |
| `project.meta.title` | `project.meta.title` | لا تغيير |
| `project.visibility.show_in_listing` | `project.visibility.show_in_listing` | لا تغيير |

التغيير الوحيد: wrapping في `{ data: ... }` وإضافة `meta` للـ pagination.
الـ TypeScript types تُحدَّث بإضافة wrapper interface.

## القيود التي يجب مراعاتها
- اختبار API على بيانات حقيقية قبل إزالة JSON fallback
- Cache strategy للـ API ضروري (ISR أو CDN caching) للحفاظ على أداء مماثل للـ static files
- لا تغيير في JSON field names بعد المرحلة الأولى — يُكلف migration في الـ types والـ API

## التأثير على التطبيق
التصميم الصحيح لـ JSON schemas الآن هو ما يجعل هذا الانتقال إضافة، لا إعادة كتابة.

## وثائق مرتبطة
- `react-migration-plan.md` — المرحلة السابقة التي تُهيئ الـ components
- `json-content-schema.md` (← `03-technical/`) — المصدر الذي يتوافق مع API response
- `client-portal-roadmap.md` — المرحلة التالية التي تبني فوق هذا الـ API

## الملف التالي
`client-portal-roadmap.md`

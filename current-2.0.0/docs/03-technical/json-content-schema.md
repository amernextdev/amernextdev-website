# json-content-schema.md

## الهدف
تحديد مخططات JSON لجميع محتوى الموقع، مع ضمان توافقها مع أشكال API المستقبلية.

## المشمول
- مخطط بيانات المشاريع (portfolio)
- مخطط البيانات الشخصية (profile)
- مخطط بيانات التواصل (contact config)
- قواعد تصميم المخططات
- موقع الملفات وآلية الاستهلاك

## غير المشمول
- كيفية استهلاك هذه البيانات في JS (→ `js-module-architecture.md`)
- عرض البيانات في HTML (→ `html-structure-guidelines.md`)
- خطة الانتقال إلى API حقيقي (→ `05-evolution/api-transition-strategy.md`)

## بنية مجلد البيانات

```
data/
├── portfolio.json     ← بيانات المشاريع
├── profile.json       ← البيانات الشخصية المهنية
└── config.json        ← إعدادات الموقع والتواصل
```

## مخطط `portfolio.json`

```json
{
  "projects": [
    {
      "id": "string — معرف فريد، slug-friendly (مثال: 'inventory-system-2024')",
      "status": "featured | active | archived",
      "order": "number — ترتيب العرض (أصغر = أول)",
      "meta": {
        "title": "string — اسم المشروع",
        "year": "number — سنة التسليم",
        "duration": "string — مدة المشروع (مثال: '3 months')",
        "client_type": "string — نوع العميل بدون اسم (مثال: 'SaaS startup')"
      },
      "problem": {
        "summary": "string — وصف المشكلة على مستوى الأنظمة (جملة أو جملتان)",
        "scale": "string — حجم المشكلة إن كان قابلاً للقياس (مثال: '50k daily requests')"
      },
      "decision": {
        "summary": "string — القرار المعماري الرئيسي",
        "rationale": "string — لماذا هذا القرار وليس البديل",
        "alternatives_rejected": [
          {
            "option": "string — البديل المرفوض",
            "reason": "string — مسوّغ الرفض"
          }
        ]
      },
      "outcome": {
        "summary": "string — النتيجة",
        "metrics": [
          {
            "label": "string — ما يُقاس",
            "value": "string — القيمة",
            "context": "string — السياق (اختياري)"
          }
        ]
      },
      "tech": {
        "primary": ["string"] ,
        "supporting": ["string"]
      },
      "visibility": {
        "show_in_listing": "boolean",
        "has_case_study": "boolean",
        "case_study_url": "string | null"
      }
    }
  ]
}
```

**مثال:**
```json
{
  "projects": [
    {
      "id": "inventory-system-2024",
      "status": "featured",
      "order": 1,
      "meta": {
        "title": "نظام إدارة مخزون موزّع",
        "year": 2024,
        "duration": "4 months",
        "client_type": "E-commerce platform"
      },
      "problem": {
        "summary": "نظام مخزون monolithic يعجز عن معالجة طلبات المستودعات المتعددة بالتزامن",
        "scale": "12 warehouse, 80k daily transactions"
      },
      "decision": {
        "summary": "تقسيم النظام إلى microservices مستقلة per-warehouse مع event sourcing",
        "rationale": "العزل يُتيح scaling مستقل لكل مستودع دون التأثير على الآخرين",
        "alternatives_rejected": [
          {
            "option": "database sharding على النظام الحالي",
            "reason": "يُعالج عرض النطاق لكن لا يحل مشكلة الـ coupling في منطق الأعمال"
          }
        ]
      },
      "outcome": {
        "summary": "نظام قادر على معالجة 10x حجم الطلبات مع تقليل وقت التعطل",
        "metrics": [
          { "label": "Processing capacity", "value": "10x", "context": "مقارنة بالنظام القديم" },
          { "label": "Downtime per month", "value": "< 2 min", "context": "من 45 min" }
        ]
      },
      "tech": {
        "primary": ["Node.js", "PostgreSQL", "Redis"],
        "supporting": ["Docker", "nginx", "GitHub Actions"]
      },
      "visibility": {
        "show_in_listing": true,
        "has_case_study": false,
        "case_study_url": null
      }
    }
  ]
}
```

## مخطط `profile.json`

```json
{
  "identity": {
    "name": "string",
    "title": "string — full-stack engineer, systems-oriented",
    "positioning_statement": "string — بيان التموضع من identity-translation-layer.md"
  },
  "focus_areas": [
    {
      "area": "string — مجال التخصص",
      "description": "string — وصف تقني محدد"
    }
  ],
  "process": {
    "summary": "string — كيف يعمل عامر (منهجية موجزة)",
    "phases": [
      {
        "phase": "string — اسم المرحلة",
        "description": "string — ما يحدث فيها"
      }
    ]
  },
  "engagement": {
    "types_accepted": ["string — نوع المشاريع التي يقبلها"],
    "types_declined": ["string — نوع المشاريع التي لا يقبلها"],
    "typical_duration": "string — مدة المشاريع النموذجية"
  }
}
```

## مخطط `config.json`

```json
{
  "site": {
    "base_url": "string",
    "language": "ar | en",
    "direction": "rtl | ltr"
  },
  "contact": {
    "method": "string — الوصف العام لآلية التواصل",
    "channel": "email | linkedin | form",
    "address": "string — البريد أو رابط LinkedIn",
    "expected_context": "string — ما يجب أن يتضمنه طلب التواصل"
  },
  "seo": {
    "default_title_suffix": "string — مثال: '| عامر'",
    "default_description": "string"
  }
}
```

## قواعد تصميم المخططات

**1 — المخطط يعكس شكل API المستقبلي**
الحقول والأسماء تُختار لتتوافق مع ما سيُعيده endpoint حقيقي. لا هياكل مسطحة اعتباطية.

**2 — لا بيانات عرض في JSON**
```json
// ✗ خاطئ — قرار عرض في البيانات
{ "color": "#0ea5e9", "fontSize": "large" }

// ✓ صحيح — بيانات محتوى فقط
{ "status": "featured", "order": 1 }
```

**3 — الحقول الاختيارية صريحة**
كل حقل اختياري يُحدَّد في المخطط بـ `"field": "type | null"`. لا حقول تُحذف عند غيابها.

**4 — IDs قابلة للإسناد بـ URL**
معرفات المشاريع slug-friendly: أحرف صغيرة، شرط أوسط، بدون مسافات.

## القيود التي يجب مراعاتها
- تغيير مخطط حقل موجود يستلزم تحديث جميع ملفات JSON والكود الذي يستهلكها
- إضافة حقل جديد: يُضاف للمخطط هنا أولاً، ثم للملفات، ثم للكود

## التأثير على التطبيق
الانتقال إلى API في المرحلة الخامسة يعني استبدال:
```javascript
// المرحلة الأولى
const data = await fetchJSON('/data/portfolio.json');

// المرحلة الخامسة
const data = await fetch('/api/v1/projects').then(r => r.json());
```
المخطط لا يتغير. الكود الذي يعالج البيانات لا يتغير.

## وثائق مرتبطة
- `js-module-architecture.md` — الوحدات التي تستهلك هذه البيانات
- `api-transition-strategy.md` (← `05-evolution/`) — خطة الانتقال من JSON إلى API
- `technical-axioms.md` — البديهية الثالثة (جاهزية التجريد) التي تحكم هذا التصميم

## الملف التالي
`component-isolation-standard.md`

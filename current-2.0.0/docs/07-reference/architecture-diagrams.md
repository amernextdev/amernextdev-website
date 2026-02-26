# architecture-diagrams.md

## الهدف
توثيق البنية المعمارية للمنظومة عبر مخططات نصية — كيف تتصل الطبقات، كيف تتدفق البيانات، وكيف تتطور الوحدات عبر المراحل.

## المشمول
- بنية المشروع الكاملة (المرحلة الأولى)
- تدفق البيانات من JSON إلى DOM
- خريطة الوحدات وعلاقاتها
- طبقات المنظومة الاستراتيجية
- مسار التطور عبر المراحل

## غير المشمول
- تفاصيل التنفيذ لكل طبقة (→ الوثائق المتخصصة)
- قيم التوكنات (→ `css-design-tokens.md`)
- خطط الهجرة التفصيلية (→ `05-evolution/`)

---

## 1 — بنية مجلدات المشروع (المرحلة الأولى)

```
project-root/
│
├── index.html                  ← الصفحة الرئيسية
│
├── css/
│   ├── tokens.css              ← متغيرات CSS — المصدر الوحيد للقيم
│   ├── base.css                ← reset + عناصر HTML الأساسية
│   ├── components/
│   │   ├── nav.css
│   │   ├── hero.css
│   │   ├── about.css
│   │   ├── portfolio.css
│   │   ├── contact.css
│   │   └── footer.css
│   ├── utilities.css
│   └── main.css                ← @imports (للتطوير فقط)
│
├── js/
│   ├── main.js                 ← نقطة الدخول
│   ├── modules/
│   │   ├── navigation.js
│   │   ├── hero.js
│   │   ├── portfolio.js
│   │   ├── contact.js
│   │   └── footer.js
│   └── utils/
│       ├── dom.js
│       ├── fetch.js
│       └── events.js
│
├── data/
│   ├── portfolio.json
│   ├── profile.json
│   └── config.json
│
├── images/
│   └── [WebP + fallbacks]
│
├── fonts/
│   └── [woff2 files]
│
├── docs/                       ← جميع وثائق المنظومة
│   ├── 01-constitution/
│   ├── 02-positioning/
│   ├── 03-technical/
│   ├── 04-quality/
│   ├── 05-evolution/
│   ├── 06-operations/
│   └── 07-reference/
│
├── reports/                    ← Lighthouse + review reports
├── dist/                       ← ملفات الإنتاج المُجمَّعة
├── sitemap.xml
├── robots.txt
├── favicon.ico
└── CHANGELOG.md
```

---

## 2 — تدفق البيانات

```
data/portfolio.json
        │
        │  fetchJSON()
        ▼
js/utils/fetch.js
        │
        │  Promise<PortfolioData>
        ▼
js/modules/portfolio.js
        │
        ├─ filterProjects()
        ├─ sortByOrder()
        └─ buildProjectCard()
                │
                │  HTMLElement
                ▼
        DOM: #portfolio-grid
                │
                │  CustomEvent: 'portfolio:rendered'
                ▼
        [أي وحدة تستمع للحدث]
```

```
data/profile.json
        │
        ▼
js/modules/hero.js ──────────► DOM: .hero__title
                    ──────────► DOM: .hero__subtitle

js/modules/about.js ─────────► DOM: .about__bio
                     ─────────► DOM: .about__focus-areas
```

---

## 3 — خريطة الوحدات وعلاقاتها

```
                    main.js
                       │
          ┌────────────┼────────────┐
          │            │            │
    navigation.js  portfolio.js  contact.js
          │            │
          │            │ CustomEvent
          │            ▼
          └──── hero.js (يستجيب للـ nav:scrolled)

التواصل المسموح: CustomEvents فقط (الأسهم المنقطة)
التواصل المحظور: استيراد مباشر بين وحدات متوازية
```

---

## 4 — طبقات المنظومة الاستراتيجية

```
┌─────────────────────────────────────────┐
│         الطبقة الاستراتيجية            │
│  (01-constitution + 02-positioning)     │
│  master-constitution.md                 │
│  القوانين · القرارات · التموضع         │
└──────────────────┬──────────────────────┘
                   │ تحكم
                   ▼
┌─────────────────────────────────────────┐
│           الطبقة التقنية               │
│            (03-technical)               │
│  HTML · CSS · JS · JSON                 │
│  التوكنات · الوحدات · المعايير         │
└──────────────────┬──────────────────────┘
                   │ تضمن
                   ▼
┌─────────────────────────────────────────┐
│           طبقة الجودة                  │
│             (04-quality)                │
│  الأداء · SEO · إمكانية الوصول         │
└──────────────────┬──────────────────────┘
                   │ تُقيَّم في
                   ▼
┌─────────────────────────────────────────┐
│           طبقة التشغيل                 │
│           (06-operations)               │
│  الإطلاق · التغييرات · المراجعة        │
└──────────────────┬──────────────────────┘
                   │ تتطور إلى
                   ▼
┌─────────────────────────────────────────┐
│           طبقة التطور                  │
│            (05-evolution)               │
│  TypeScript → React → API → Portal      │
└─────────────────────────────────────────┘
```

---

## 5 — مسار التطور عبر المراحل

```
المرحلة 1           المرحلة 2           المرحلة 3
───────────         ───────────         ───────────
HTML/CSS/JS    ──►  TypeScript     ──►  React + Next.js
   │                   │                    │
   │ يبقى:             │ يبقى:              │ يبقى:
   │ - CSS tokens      │ - CSS tokens       │ - CSS tokens
   │ - JSON schemas    │ - JSON schemas     │ - JSON schemas (→ props)
   │ - 6 وحدات        │ - 6 وحدات          │ - المحتوى
   │                   │                    │
   │ يتغير:            │ يتغير:             │ يتغير:
   │ (لا شيء)          │ .js → .ts          │ modules → components
   │                   │ + interfaces        │ events → React state
   │                   │                    │ fetch → getStaticProps

المرحلة 4           المرحلة 5
───────────         ───────────
API Layer      ──►  SaaS + Portal
   │                    │
   │ يبقى:              │ يبقى:
   │ - React components  │ - كل ما سبق
   │ - TypeScript types  │ - موقع التموضع
   │ - Design System     │ - Design System
   │                     │
   │ يتغير:              │ يضاف:
   │ JSON → API calls     │ Auth + Dashboard
   │ getStaticProps →     │ Database
   │ getServerSideProps   │ Client features
```

---

## 6 — دورة القرار التشغيلية

```
فكرة أو طلب تغيير
        │
        ▼
decision-engine.md ──► رفض ──► نهاية
        │
        │ قبول
        ▼
change-request-protocol.md
        │
        ├─ النوع أ: تحديث محتوى ──► نشر مباشر
        ├─ النوع ب: CSS بسيط ──────► فحص Lighthouse → نشر
        ├─ النوع ج: ميزة ──────────► branch → review → نشر
        └─ النوع د: استراتيجي ─────► مراجعة docs → branch → نشر
                                              │
                                              ▼
                                    توثيق في reports/changes/
                                              │
                                              ▼
                                    تحديث الوثائق المتأثرة
```

---

## 7 — خريطة الوثائق والاعتماديات

```
master-constitution.md
        │
        ├──► non-negotiable-laws.md
        │           │
        │           ▼
        ├──► decision-engine.md ◄──── conflict-resolution.md
        │
        ├──► identity-translation-layer.md
        │           │
        │           ▼
        │    02-positioning/ (كل ملفاته)
        │
        ├──► risk-landscape.md ◄──── review-process.md
        │
        └──► [يُشار إليه من جميع الوثائق الأخرى]

03-technical/ ──► 04-quality/ ──► 06-operations/
     │                                   │
     └──────────► 05-evolution/ ◄────────┘
```

## التأثير على التطبيق
هذه المخططات المرجع البصري السريع عند الحاجة لفهم العلاقات بين الأجزاء.
عند تغيير هيكلي في المنظومة، يُحدَّث المخطط المعني هنا.

## وثائق مرتبطة
كل مخطط يُحيل للوثائق التي تُفصّل ما يُصوَّره.

## الملف التالي
`migration-mapping-table.md`

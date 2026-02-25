# evolution-matrix.md

## الهدف
تحديد خارطة التطور الكاملة عبر المراحل الخمس — ما يتغير في كل مرحلة، وما يبقى ثابتاً، والشروط المسبقة للانتقال.

## المشمول
- تعريف كل مرحلة ونطاقها
- ما يتغير وما يبقى في كل انتقال
- شروط الانتقال (متى يُبدأ المرحلة التالية)
- مبادئ أمان الهجرة العابرة للمراحل

## غير المشمول
- تفاصيل خطة هجرة TypeScript (→ `typescript-migration-plan.md`)
- تفاصيل خطة هجرة React (→ `react-migration-plan.md`)
- استراتيجية الانتقال إلى API (→ `api-transition-strategy.md`)
- خارطة طريق Client Portal (→ `client-portal-roadmap.md`)

## نظرة عامة على المراحل

```
المرحلة 1 → المرحلة 2 → المرحلة 3 → المرحلة 4 → المرحلة 5
HTML/CSS/JS    TypeScript   React/Next    API Layer    SaaS/Portal
  (الآن)      (تعزيز)     (ديناميكية)  (بيانات)     (منتج)
```

## المرحلة الأولى — البنية التأسيسية (الحالية)

**الوصف:** موقع ثابت بـ HTML/CSS/JS خالص، محتوى من JSON، لا خادم.

**المكوّنات:**
- 6 وحدات UI معزولة (nav، hero، about، portfolio، contact، footer)
- ملفات JSON كمصدر بيانات
- CSS design tokens في `:root`
- ES6 modules بدون إطار عمل

**ما يجب أن يكون مكتملاً قبل الانتقال للمرحلة الثانية:**
- جميع الوحدات الست تجتاز معيار العزل الأربعة (`component-isolation-standard.md`)
- Lighthouse scores فوق السقوف في جميع الفئات
- محتوى JSON يعكس شكل API المستقبلي
- لا دين تقني غير موثَّق

---

## المرحلة الثانية — تعزيز TypeScript

**الوصف:** إضافة TypeScript على JS الحالي دون تغيير البنية أو الواجهة.

**ما يتغير:**
- `.js` تصبح `.ts`
- إضافة types للبيانات (interfaces لـ JSON schemas)
- إضافة types لوظائف الوحدات
- إعداد `tsconfig.json`

**ما يبقى ثابتاً:**
- HTML وCSS بدون تغيير
- بنية الوحدات وأسماؤها
- JSON schemas وملفات البيانات
- منطق التطبيق

**مبدأ الانتقال:** TypeScript تُضاف تدريجياً ملف بملف. لا إعادة كتابة شاملة.

**شروط الانتقال للمرحلة الثالثة:**
- `tsc --noEmit` بدون أخطاء
- كل interface يعكس JSON schema المقابل من `json-content-schema.md`
- لا `any` بدون مسوّغ موثَّق

---

## المرحلة الثالثة — React/Next.js

**الوصف:** استخراج الوحدات كـ React components، الانتقال إلى Next.js للتوليد الثابت (SSG).

**ما يتغير:**
- HTML + JS → React components (`.tsx`)
- `fetchJSON('/data/*.json')` → `getStaticProps()` أو `fetch()` في component
- CSS files → CSS Modules (أو كما هي مع minor adjustments)
- بنية المشروع → Next.js directory structure

**ما يبقى ثابتاً:**
- CSS design tokens (تُنقل كما هي)
- JSON schemas (تصبح TypeScript interfaces)
- منطق التطبيق (يُنقل للـ hooks والـ utils)
- المحتوى البصري والهوية

**خريطة الاستخراج:**

| المرحلة الأولى | المرحلة الثالثة |
|---------------|----------------|
| `css/tokens.css` | CSS variables في global styles |
| `js/modules/portfolio.js` | `<Portfolio />` + `usePortfolio()` hook |
| `js/modules/hero.js` | `<Hero />` (data من props) |
| `data/portfolio.json` | `getStaticProps()` أو API |
| Custom Events | React Context أو Zustand |
| data attributes للحالة | React state |

**شروط الانتقال للمرحلة الرابعة:**
- جميع الوحدات مُستخرَجة كـ components
- Lighthouse scores محافظة على نفس المستوى
- لا regression في Accessibility

---

## المرحلة الرابعة — API Layer

**الوصف:** استبدال JSON files بـ API حقيقي، إضافة CMS أو admin panel للمحتوى.

**ما يتغير:**
- `fetch('/data/portfolio.json')` → `fetch('https://api.amer.dev/projects')`
- JSON files → Database (PostgreSQL أو MongoDB)
- إضافة authentication للـ admin
- إضافة webhook للـ content updates

**ما يبقى ثابتاً:**
- React components (تستهلك data من props — لا يتغير)
- JSON schema structure (يصبح API response shape)
- CSS وDesign system

**لماذا JSON schemas المرحلة الأولى مهمة:** الحقول والأسماء التي تُعرَّف الآن هي نفسها التي سيُعيدها API. لا إعادة كتابة للـ components.

**شروط الانتقال للمرحلة الخامسة:**
- API مستقر ومُختبر
- CMS يُتيح تحديث المحتوى دون code deployment
- لا data inconsistency بين staging وproduction

---

## المرحلة الخامسة — SaaS/Client Portal

**الوصف:** تحويل المنظومة من موقع شخصي إلى منتج — client portal، تقارير، billing.

**ما يتغير:**
- إضافة client-facing dashboard
- إضافة project management features
- إضافة billing integration
- Authentication كاملة (multi-tenant أو per-client)

**ما يبقى ثابتاً:**
- Design system وTokens
- API Layer (يُوسَّع، لا يُعاد)
- موقع التموضع العام (يبقى مدخلاً للنظام)

---

## مبادئ أمان الهجرة العابرة للمراحل

هذه المبادئ تحكم كل قرار في المرحلة الأولى:

**1 — لا اقتران مخفي**
أي قرار يجعل الهجرة أصعب يُوثَّق فوراً كـ Tech Debt مع خطة معالجة.

**2 — الشكل يسبق التنفيذ**
JSON schemas، API shapes، component interfaces — تُعرَّف أولاً، ثم يُبنى عليها.

**3 — الانتقال تدريجي**
لا "big bang rewrite". كل مرحلة تُضيف فوق ما سبق.

**4 — اختبار الهجرة في التطوير**
في كل مرحلة، سؤال: "هل يمكن استخراج هذا المكوّن للمرحلة التالية بدون تغيير جوهري؟"

## القيود التي يجب مراعاتها
- الانتقال بين المراحل يُبدأ حين تُبرر الحاجة التشغيلية، لا بجدول زمني مُقرَّر
- لا انتقال بدون استيفاء شروط المرحلة الحالية كاملةً

## التأثير على التطبيق
كل قرار تقني في المرحلة الأولى يُقيَّم: "هل يُسهّل أو يُعيق المرحلة الثالثة؟"
هذا هو مبرر أمان الهجرة في `decision-engine.md` البوابة 2.

## وثائق مرتبطة
- `typescript-migration-plan.md` — تفاصيل المرحلة الثانية
- `react-migration-plan.md` — تفاصيل المرحلة الثالثة
- `api-transition-strategy.md` — تفاصيل المرحلة الرابعة
- `client-portal-roadmap.md` — تفاصيل المرحلة الخامسة
- `component-isolation-standard.md` (← `03-technical/`) — الشرط الأساسي للانتقال

## الملف التالي
`typescript-migration-plan.md`

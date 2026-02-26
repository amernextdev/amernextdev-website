# دليل التوثيق — Documentation Guide

هذا المجلد يحتوي على المنظومة الوثائقية الكاملة للمشروع.
**42 ملف** موزعة على **7 مجلدات**، كل واحد له هدف محدد وعلاقة واضحة بالباقي.

---

## كيف تقرأ هذه الوثائق

**إذا كنت تبدأ للمرة الأولى:**
اقرأ بالترتيب: `01 → 02 → 03` — هذا يُعطيك الإطار الكامل قبل التنفيذ.

**إذا كنت أمام قرار محدد:**
ابدأ بـ [`01-constitution/decision-engine.md`](./01-constitution/decision-engine.md) — يُحيلك للوثيقة الصحيحة.

**إذا كنت تُراجع مشكلة أو خطأ:**
ابدأ بـ [`01-constitution/risk-landscape.md`](./01-constitution/risk-landscape.md) — أوضاع الفشل موثّقة هناك.

**إذا كنت تُخطط للهجرة لمرحلة أعلى:**
ابدأ بـ [`05-evolution/evolution-matrix.md`](./05-evolution/evolution-matrix.md) — ثم الملف المخصص للمرحلة.

---

## `01-constitution/` — الدستور والحوكمة

الأساس الذي تستند إليه جميع الوثائق الأخرى. لا قرار يُتخذ دون مرجع هنا.

| الملف | الوظيفة | اقرأه عندما |
|-------|---------|------------|
| [`master-constitution.md`](./01-constitution/master-constitution.md) | المصدر الأعلى للمبادئ والتراتبية | أول قراءة — يُعطي صورة الكل |
| [`non-negotiable-laws.md`](./01-constitution/non-negotiable-laws.md) | 19 قانوناً لا تُناقَش عند نقطة القرار | قبل أي تغيير في الهوية أو التصميم أو اللغة |
| [`decision-engine.md`](./01-constitution/decision-engine.md) | 5 بوابات تقيّم أي مقترح | كلما تسألت "هل أفعل هذا؟" |
| [`conflict-resolution.md`](./01-constitution/conflict-resolution.md) | كيف تُحسم التعارضات بين مبدأين صالحين | عندما يجتاز مقترح كل البوابات لكن يبقى تعارض |
| [`risk-landscape.md`](./01-constitution/risk-landscape.md) | 8 أوضاع فشل مُسمّاة مع إشارات كشف مبكر | في المراجعة الدورية وعند رصد أي مشكلة |
| [`identity-translation-layer.md`](./01-constitution/identity-translation-layer.md) | ترجمة سمات الهوية إلى قرارات تنفيذية | عند كتابة محتوى أو تصميم عنصر جديد |

---

## `02-positioning/` — التموضع والهوية

كيف يُدرَك المشروع في ذهن المقيّم، وبأي آليات.

| الملف | الوظيفة | اقرأه عندما |
|-------|---------|------------|
| [`positioning-doctrine.md`](./02-positioning/positioning-doctrine.md) | الإطار الثلاثي للتموضع (0–3ث / 3–30ث / 30+ث) | لفهم لماذا كل عنصر موجود |
| [`trust-filter-framework.md`](./02-positioning/trust-filter-framework.md) | 5 آليات تصفية وكيف تعمل | عند إضافة أي عنصر تفاعلي أو CTA |
| [`client-psychology-model.md`](./02-positioning/client-psychology-model.md) | نمط القرار المعرفي للمقيّم المستهدف | عند تصميم بنية المعلومات |
| [`authority-signals-spec.md`](./02-positioning/authority-signals-spec.md) | 11 إشارة سلطة مُصنّفة: بصرية / تقنية / لغوية | عند تقييم أي عنصر: "ما إشارة السلطة التي يُرسلها؟" |
| [`anti-portfolio-manifesto.md`](./02-positioning/anti-portfolio-manifesto.md) | لماذا نموذج portfolio النمطي خاطئ هنا | عند أي إغراء بإضافة عنصر "portfolio-ish" |
| [`brand-cognitive-model.md`](./02-positioning/brand-cognitive-model.md) | قيم الألوان والطباعة والتباعد والأيقونات | مرجع للقيم البصرية بالسياق الاستراتيجي |
| [`language-governance.md`](./02-positioning/language-governance.md) | قواعد كل كلمة في الموقع + 6 اختبارات قبل النشر | قبل كتابة أي محتوى |

---

## `03-technical/` — التقنية والمعمار

كيف يُبنى المشروع تقنياً بحيث يبقى قابلاً للصيانة والهجرة.

| الملف | الوظيفة | اقرأه عندما |
|-------|---------|------------|
| [`technical-axioms.md`](./03-technical/technical-axioms.md) | 4 بديهيات تقنية تحكم كل قرار في الكود | أول قراءة تقنية — الإطار قبل التفاصيل |
| [`tech-stack-rationale.md`](./03-technical/tech-stack-rationale.md) | مبرر كل اختيار مع البديل المرفوض | عند أي تساؤل "لماذا لا نستخدم X؟" |
| [`html-structure-guidelines.md`](./03-technical/html-structure-guidelines.md) | هيكل الصفحة القياسي + SEO + A11y | عند بناء أي صفحة جديدة |
| [`css-architecture-spec.md`](./03-technical/css-architecture-spec.md) | بنية ملفات CSS وترتيب الخصائص والعزل | عند كتابة أي CSS |
| [`css-design-tokens.md`](./03-technical/css-design-tokens.md) | ملف `tokens.css` الكامل بالقيم الفعلية | المرجع لأي قيمة بصرية في الكود |
| [`js-module-architecture.md`](./03-technical/js-module-architecture.md) | نمط الوحدة القياسي + قواعد التواصل بين الوحدات | عند كتابة أي JS |
| [`json-content-schema.md`](./03-technical/json-content-schema.md) | مخططات JSON الثلاثة مع أمثلة حقيقية | عند إضافة أو تعديل بيانات |
| [`component-isolation-standard.md`](./03-technical/component-isolation-standard.md) | 4 معايير قابلية استخراج المكوّن + اختبار لكل منها | للتحقق من أن أي وحدة جاهزة للهجرة |
| [`naming-conventions.md`](./03-technical/naming-conventions.md) | جدول تسمية CSS / JS / JSON / ملفات | مرجع سريع عند تسمية أي شيء |
| [`documentation-standard.md`](./03-technical/documentation-standard.md) | ما يُوثَّق وكيف (Module Header، دوال، استثناءات) | عند كتابة أي تعليق في الكود |
| [`git-workflow.md`](./03-technical/git-workflow.md) | بنية الفروع + Conventional Commits + checklist الدمج | عند أي عملية Git |

---

## `04-quality/` — الجودة والأداء

الأرقام والعمليات التي تضمن أن الموقع يُرسل إشارة ثقة تقنية.

| الملف | الوظيفة | اقرأه عندما |
|-------|---------|------------|
| [`performance-budget.md`](./04-quality/performance-budget.md) | سقوف Lighthouse + CWV + ميزانية الأصول | قبل أي نشر — الأرقام المرجعية |
| [`performance-implementation.md`](./04-quality/performance-implementation.md) | كيف تُحقَّق الأرقام تقنياً (HTML، صور، خطوط، Cache) | عند انتهاك ميزانية الأداء |
| [`seo-architecture.md`](./04-quality/seo-architecture.md) | استراتيجية keywords + meta tags + JSON-LD schemas | عند بناء أي صفحة أو إضافة محتوى |
| [`accessibility-checklist.md`](./04-quality/accessibility-checklist.md) | 8 أقسام فحص WCAG 2.1 AA + أدوات | قبل كل نشر (الجزء اليدوي) |
| [`lighthouse-validation-process.md`](./04-quality/lighthouse-validation-process.md) | 6 خطوات التحقق + قالب توثيق النتائج | قبل كل نشر (العملية الكاملة) |

---

## `05-evolution/` — التطور والهجرة

كيف يتطور المشروع عبر المراحل الخمس دون إعادة كتابة.

| الملف | الوظيفة | اقرأه عندما |
|-------|---------|------------|
| [`evolution-matrix.md`](./05-evolution/evolution-matrix.md) | خارطة المراحل الخمس: ما يتغير وما يبقى وشروط الانتقال | للتخطيط الاستراتيجي وتقييم القرارات الحالية |
| [`typescript-migration-plan.md`](./05-evolution/typescript-migration-plan.md) | tsconfig + Interfaces + تسلسل الهجرة | عند بدء المرحلة الثانية |
| [`react-migration-plan.md`](./05-evolution/react-migration-plan.md) | Next.js setup + استخراج المكوّنات + تحويل الأنماط | عند بدء المرحلة الثالثة |
| [`api-transition-strategy.md`](./05-evolution/api-transition-strategy.md) | Endpoints + Adapter Pattern + خيارات Backend | عند بدء المرحلة الرابعة |
| [`client-portal-roadmap.md`](./05-evolution/client-portal-roadmap.md) | رؤية Client Portal + Database schema + شروط البدء | للتخطيط بعيد المدى |

---

## `06-operations/` — التشغيل اليومي

كيف يُطلق المشروع ويُدار بعد الإطلاق.

| الملف | الوظيفة | اقرأه عندما |
|-------|---------|------------|
| [`launch-checklist.md`](./06-operations/launch-checklist.md) | 6 مراحل الإطلاق الأول + خطة rollback | قبل الإطلاق الأول |
| [`change-request-protocol.md`](./06-operations/change-request-protocol.md) | 4 أنواع تغيير بمسارات مختلفة + قوالب توثيق | عند أي تغيير بعد الإطلاق |
| [`release-versioning.md`](./06-operations/release-versioning.md) | SemVer + جدول الإصدارات + قالب CHANGELOG | عند وسم إصدار جديد |
| [`content-governance.md`](./06-operations/content-governance.md) | 4 معايير إضافة مشروع + دورة مراجعة | قبل أي إضافة لـ portfolio.json |
| [`review-process.md`](./06-operations/review-process.md) | مراجعات شهرية / ربع سنوية / سنوية + قوالب | في كل دورة مراجعة |

---

## `07-reference/` — المراجع والفهارس

مراجع سريعة للمعلومات المتكررة.

| الملف | الوظيفة | اقرأه عندما |
|-------|---------|------------|
| [`glossary.md`](./07-reference/glossary.md) | تعريف 25 مصطلح استراتيجي وتقني وتشغيلي | عند غموض أي مصطلح في أي وثيقة |
| [`architecture-diagrams.md`](./07-reference/architecture-diagrams.md) | 7 مخططات: بنية المجلدات، تدفق البيانات، طبقات المنظومة... | للرؤية الكلية السريعة |
| [`migration-mapping-table.md`](./07-reference/migration-mapping-table.md) | 6 جداول: HTML→React، CSS→Modules، JS→Hooks، JSON→API | عند تنفيذ أي هجرة بين المراحل |

---

## مسارات القراءة الموصى بها

### قبل البناء (المطوّر الجديد)
```
master-constitution → non-negotiable-laws → decision-engine →
technical-axioms → tech-stack-rationale → html-structure-guidelines →
css-architecture-spec → css-design-tokens → js-module-architecture
```

### قبل كتابة محتوى
```
identity-translation-layer → positioning-doctrine →
language-governance → content-governance
```

### قبل نشر أي تغيير
```
decision-engine → change-request-protocol →
lighthouse-validation-process → accessibility-checklist
```

### للتخطيط للمرحلة التالية
```
evolution-matrix → [خطة الهجرة المناسبة] →
migration-mapping-table
```

---

## ملاحظة على الترابط

كل وثيقة تُحيل للوثائق المرتبطة بها في قسم "وثائق مرتبطة" في نهايتها.
لا تحتاج لحفظ الخريطة — اتبع الإحالات.

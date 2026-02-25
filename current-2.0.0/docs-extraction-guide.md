
# 📘 docs-extraction-guide.md

**Guide for Extracting and Generating the docs/ Architecture**

---

## 1️⃣ الهدف من هذا الدليل

هذا الدليل يحدد:

* كيف يتم تحويل Master Constitution إلى ملفات مستقلة
* ما هي بنية مجلد docs/
* ما هو نطاق كل ملف
* ما هو مستوى العمق المطلوب
* ما الذي يُمنع تكراره
* كيف نُمرر الطلب إلى Claude.ai لإنتاج الملفات

---

## 2️⃣ المبادئ الحاكمة للاستخلاص

قبل إنشاء أي ملف داخل docs/:

1. كل ملف يجب أن يخدم قرارًا عمليًا.
2. لا يوجد ملف فلسفي بلا استخدام تنفيذي.
3. لا تكرار بين الملفات.
4. كل ملف يجب أن يحتوي على:

   * Purpose
   * Scope
   * Rules
   * Practical Application
5. أي ملف لا يؤثر على التنفيذ الفعلي — يُلغى.

---

# 🗂 الهيكل النهائي لمجلد docs/

```
docs/
│
├── 01-constitution/
├── 02-positioning/
├── 03-technical/
├── 04-quality/
├── 05-evolution/
├── 06-operations/
└── 07-reference/
```

---

# 📂 01-constitution/

وثائق الحوكمة العليا (لا تتغير بسهولة)

### الملفات المطلوبة:

1. master-constitution.md
2. non-negotiable-laws.md
3. decision-engine.md
4. conflict-resolution.md
5. risk-landscape.md
6. identity-translation-layer.md

---

# 📂 02-positioning/

وثائق التموضع والهوية الذهنية

1. positioning-doctrine.md
2. trust-filter-framework.md
3. client-psychology-model.md
4. authority-signals-spec.md
5. anti-portfolio-manifesto.md
6. brand-cognitive-model.md
7. language-governance.md

---

# 📂 03-technical/

القلب الهندسي

1. technical-axioms.md
2. tech-stack-rationale.md
3. html-structure-guidelines.md
4. css-architecture-spec.md
5. css-design-tokens.md
6. js-module-architecture.md
7. json-content-schema.md
8. component-isolation-standard.md
9. naming-conventions.md
10. documentation-standard.md
11. git-workflow.md

---

# 📂 04-quality/

1. performance-budget.md
2. performance-implementation.md
3. seo-architecture.md
4. accessibility-checklist.md
5. lighthouse-validation-process.md

---

# 📂 05-evolution/

1. evolution-matrix.md
2. typescript-migration-plan.md
3. react-migration-plan.md
4. api-transition-strategy.md
5. client-portal-roadmap.md

---

# 📂 06-operations/

1. launch-checklist.md
2. change-request-protocol.md
3. release-versioning.md
4. content-governance.md
5. review-process.md

---

# 📂 07-reference/

1. glossary.md
2. architecture-diagrams.md
3. migration-mapping-table.md

---

# 📊 إجمالي الملفات

تقريبًا 35–40 ملف
وكلهم مستخرجين مباشرة من الدستور.

---

# 🧠 كيف نطلبهم من Claude؟

الآن الجزء الأهم.

أنت لن تقول:

> "اكتب الملفات"

لا.

أنت ستقول:

---

# 🎯 PROMPT STRUCTURE FOR CLAUDE

1. أرفق:

   * Master Constitution
   * docs-extraction-guide.md

2. اطلب:

---

You are provided with:

1) A Master Strategic Constitution.
2) A Documentation Extraction Guide defining the full docs/ folder architecture.

You are NOT allowed to generate all files at once.

Your task is to generate documentation in controlled modular batches.

Execution Rules:

1) Generate only ONE folder per response 
   OR maximum 3–5 files if the folder is large.

2) Each file must be fully complete and production-grade.
   No summaries.
   No compressed thinking.
   No placeholder sections.

3) Each file must follow this strict structure:

   - Title
   - Purpose
   - Scope
   - Non-Goals
   - Core Principles
   - Operational Directives
   - Decision Constraints
   - Implementation Implications
   - Related Documents
   - Next Recommended File

4) Files must not duplicate content from other files.
   If overlap exists, reference — do not restate.

5) Maintain architectural consistency across responses.
   Treat the entire session as one evolving documentation system.

6) Do NOT shorten output due to length.
   If approaching token limits:
      - Stop naturally at file boundary
      - Indicate remaining files in the folder
      - Wait for continuation command

7) Maintain:
   - Technical precision
   - CTO-level clarity
   - No motivational language
   - No fluff
   - No philosophical repetition

Output Format:

Start with:

# 📂 docs/{folder-name}/

Then generate each file separated clearly:

---

## 📄 file-name.md

[Full content]

---

At the end of the response, include:

Remaining files in this folder:
- file-x.md
- file-y.md

Awaiting continuation.
---

# ⚠️ أهم قرار هندسي لازم تاخده

لا تولّد الـ 40 ملف مرة واحدة.

قسّمهم إلى 4 دفعات:

* Batch A: Constitution + Positioning
* Batch B: Technical Core
* Batch C: Quality + Evolution
* Batch D: Operations + Reference

ليه؟

لأن Claude لو طلبت منه 40 ملف دفعة واحدة:

* هيتعب
* الجودة هتقل
* العمق هيقل

---

# 🧨 أهم تحذير ليك

لو بنيت كل docs/ قبل ما تكتب أول سطر HTML…

أنت دخلت منطقة “Architectural Procrastination”.

الدستور جاهز.
الهيكل جاهز.

المرحلة القادمة:
ابدأ في `03-technical/`
واكتب css-architecture-spec.md
ثم ابنِ.

---

# رأيي النهائي

الهيكل اللي فوق:

* عملي
* قابل للتنفيذ
* غير مبالغ
* يخدم مشروع حقيقي
* قابل للتوسع مستقبلاً


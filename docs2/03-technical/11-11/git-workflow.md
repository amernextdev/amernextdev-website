# git-workflow.md

## الهدف
تحديد سير عمل Git الحاكم للمشروع — بنية الفروع، معيار commit messages، وبروتوكول النشر.

## المشمول
- بنية الفروع واستخداماتها
- معيار كتابة commit messages
- بروتوكول الدمج والنشر
- توثيق الاستثناءات والديون التقنية في Git
- وسم الإصدارات عند حدود المراحل

## غير المشمول
- معيار التوثيق المضمن في الكود (→ `documentation-standard.md`)
- بروتوكول طلبات التغيير (→ `06-operations/change-request-protocol.md`)
- عملية النشر الكاملة (→ `06-operations/launch-checklist.md`)

## بنية الفروع

```
main                    ← قابل للنشر دائماً. لا commits مباشرة.
│
├── dev                 ← فرع التطوير الرئيسي (اختياري للمرحلة الأولى)
│
├── feature/[name]      ← ميزة محددة النطاق
├── fix/[name]          ← إصلاح خطأ
├── refactor/[name]     ← إعادة هيكلة بدون تغيير سلوك
├── content/[name]      ← تحديث محتوى فقط
└── docs/[name]         ← تحديث وثائق فقط
```

### قواعد الفروع

**`main` قابل للنشر دائماً.**
أي commit على `main` يجب أن يكون جاهزاً للمستخدم. لا "WIP" على `main`.

**فروع الميزات محددة النطاق.**
فرع واحد = مخاوف واحدة. لا فرع يُعدّل nav وportfolio وcontact في آن.

**مدة الفرع قصيرة.**
الفرع يُدمج خلال أيام، لا أسابيع. إذا طال الفرع — يُقسَّم.

## معيار Commit Messages

### الصيغة
```
type(scope): description

[body — اختياري، للتفاصيل والسياق]

[footer — اختياري، للإشارة لـ issues أو breaking changes]
```

### أنواع الـ type

| النوع | متى يُستخدم |
|------|------------|
| `feat` | إضافة ميزة جديدة |
| `fix` | إصلاح خطأ |
| `refactor` | إعادة هيكلة بدون تغيير سلوك |
| `style` | تغييرات CSS/تنسيق بدون تغيير منطق |
| `content` | تحديث محتوى JSON أو نصوص |
| `perf` | تحسين أداء |
| `docs` | تحديث وثائق |
| `chore` | صيانة (تبعيات، إعدادات) |

### أنواع الـ scope

| الـ scope | ما يُغطيه |
|---------|----------|
| `nav` | وحدة التنقل |
| `hero` | وحدة Hero |
| `portfolio` | وحدة Portfolio |
| `contact` | وحدة التواصل |
| `footer` | وحدة Footer |
| `tokens` | CSS design tokens |
| `base` | base CSS وreset |
| `data` | ملفات JSON |
| `utils` | دوال مساعدة |
| `config` | إعدادات المشروع |

### أمثلة

```bash
# ميزة جديدة
feat(portfolio): add project filtering by technology

# إصلاح
fix(nav): correct focus trap in mobile menu

# إعادة هيكلة
refactor(hero): extract renderHero into separate function

# محتوى
content(data): add inventory system project to portfolio.json

# أداء
perf(portfolio): lazy load project images with IntersectionObserver

# توثيق
docs(css): add migration notes to hero component

# استثناء تقني مع توثيق
fix(contact): use innerHTML for form error messages

EXCEPTION: T1 (innerHTML from data)
REASON: error messages مصدرها config.json المُحكَم، لا مدخلات مستخدم
PLAN: يُستبدل بـ DOM API في المرحلة الثالثة
```

### قواعد كتابة الـ description
- إنجليزي (المصطلحات التقنية أوضح بالإنجليزية في Git context)
- فعل أمر في البداية: `add`، `fix`، `update`، `remove`، `refactor`
- لا نقطة في النهاية
- 72 حرف كحد أقصى للسطر الأول
- لا "minor changes"، لا "various fixes" — كل commit له هدف محدد

## بروتوكول الدمج

### قبل الدمج — self-review checklist
```
[ ] الكود يتبع البديهيات التقنية (technical-axioms.md)
[ ] CSS يستخدم توكنات، لا قيم مُشفَّرة
[ ] JS يتبع نمط الوحدة (js-module-architecture.md)
[ ] التوثيق المضمن موجود على كل export
[ ] لا استثناء بدون EXCEPTION comment
[ ] لا تبعية جديدة بدون مسوّغ في tech-stack-rationale.md
[ ] Lighthouse score لا يزال ضمن الميزانية
[ ] HTML يجتاز W3C validator
```

### طريقة الدمج
```bash
# دائماً rebase، لا merge commit
git checkout main
git pull origin main
git checkout feature/my-feature
git rebase main
git checkout main
git merge --ff-only feature/my-feature
git push origin main
```

`--ff-only` يضمن تاريخاً خطياً نظيفاً. إذا فشل (لأن الفرع لم يُعاد ضبطه) — أعد الـ rebase.

## توثيق الديون التقنية

الديون التقنية المقبولة مؤقتاً تُوثَّق في Git بعلامة واضحة:

```bash
# في commit message
chore(nav): temporary workaround for Safari focus bug

TECH-DEBT: focus management in Safari needs proper fix
IMPACT: minor — UX issue in Safari only, not a security concern
PLAN: revisit with Safari-specific fix in next sprint
TRACKING: issue #12
```

وفي الكود:
```javascript
// TECH-DEBT: #12 — Safari focus workaround
// يُستبدل بحل صحيح عند توفر وقت debugging كافٍ
document.activeElement.blur();
```

## وسم الإصدارات

عند إكمال مرحلة أو نقطة مرجعية رئيسية:

```bash
# Semantic Versioning: MAJOR.MINOR.PATCH
git tag -a v1.0.0 -m "Phase 1 complete — static site launch"
git tag -a v1.1.0 -m "Portfolio section: add case studies"
git tag -a v1.0.1 -m "Fix: mobile navigation focus trap"

git push origin --tags
```

| النوع | متى |
|------|-----|
| MAJOR | إكمال مرحلة (1.0.0، 2.0.0) |
| MINOR | إضافة وحدة أو ميزة كاملة |
| PATCH | إصلاح خطأ أو تحديث محتوى |

## القيود التي يجب مراعاتها
- لا force push على `main` في أي ظرف
- Commit يُكتب بعد مراجعة `git diff` — لا `git add .` العمياء
- كل commit يُمثل وحدة عمل مكتملة وقابلة للعكس بشكل مستقل

## التأثير على التطبيق
سجل Git هو توثيق القرارات بمرور الوقت. Commit history نظيف يعني:
- إمكانية `git bisect` لإيجاد commit سبب خطأ
- إمكانية `git revert` لعكس قرار بأمان
- قراءة تطور المشروع بدون شرح إضافي

## وثائق مرتبطة
- `documentation-standard.md` — توثيق الاستثناءات في الكود المصاحب للـ commits
- `change-request-protocol.md` (← `06-operations/`) — كيف تتحول طلبات التغيير إلى commits
- `release-versioning.md` (← `06-operations/`) — بروتوكول الإصدارات التفصيلي

## الملف التالي
`04-quality/performance-budget.md`

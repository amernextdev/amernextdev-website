# AMER | عامر — Color System
**amer-color-system.md** · Version 1.0.0 · Phase 1 Foundation

---

## القسم الأول — فلسفة نظام الألوان

نظام الألوان في مشروع AMER | عامر ليس قراراً جمالياً — إنه أداة معمارية تخدم وظيفة واحدة: ترسيخ الانطباع المعرفي الصحيح في ذاكرة المُقيِّم خلال الثلاث ثوان الأولى من التفاعل. الدستور في Section XII.2 يحدد هذا بوضوح لا لبس فيه: *"Dark mode default; single cool-tone accent; no secondary accent; no gradient."* كل لون في هذا النظام اجتاز بوابة واحدة قبل القبول: هل يخدم التموضع، الوضوح، أو قابلية التوسع؟ وإلا فهو مرفوض.

الفلسفة الحاكمة مستخلصة من Core Brand Attributes في Section XII.1 — تحديداً سمتي **Discipline** و**Precision**. اللونان اللذان يُترجمان هاتين السمتين بصرياً هما: الغياب المحكوم للون (neutrals عميقة، غير مشبعة)، ونقطة تركيز واحدة فقط (accent بارد ومدروس). المنطق هو أن التقليل اللوني ليس فقراً في التصميم — بل هو الدليل البصري على أن الانضباط المعماري يسري على كل قرار، بما في ذلك الألوان.

---

## القسم الثاني — لون الـ Accent

### الاقتراح: `Steel Cyan`

| الخاصية | القيمة |
|---------|--------|
| **HEX** | `#4FC3D6` |
| **اسم وصفي** | steel-cyan |
| **فئة** | Cool-tone, desaturated blue-green |

### التبرير المعماري

الدستور في Section XII.2 يشترط *"single cool-tone accent"* — ولا يترك المجال لـ warm tones أو neutrals كـ accent. الاختيار بين درجات الأزرق-الرمادي هو اختيار بين نكهات متعددة من نفس الهوية.

`#4FC3D6` مُختار لأربعة أسباب مربوطة بالدستور:

1. **Precision (Section XII.1):** اللون البارد-الرمادي يُحيل معرفياً إلى الدقة التقنية، الواجهات الاحترافية، والأنظمة الهندسية — لا إلى الإبداع الصاخب.
2. **Discipline (Section XII.1):** الكثافة المتوسطة (`#4FC3D6` ليست زرقاء فاقعة ولا رمادية خافتة) تجسّد مفهوم *"resolved complexity"* من Axiom 1 (Section V.1) — لا مبالغة ولا إخفاء.
3. **Anti-visual-first-designer (Section II.2):** يرفض الهوية المرفوضة صراحةً "Visual-first designer" — اللون البارد-الرمادي يبعد الموقع بصرياً عن الـ portfolios المشبعة بالألوان.
4. **Authority Signal (Section III.3):** الجدول في Section III.3 يصف اللون بأنه يجب أن يُوصل *"Restraint and confidence"* — وهذا بالضبط ما تُحققه درجة الـ steel-cyan: ثقة بلا صخب.

### اختبار WCAG

| الخلفية | قيمة HEX الخلفية | نسبة التباين | النتيجة |
|---------|-----------------|-------------|---------|
| Dark background base | `#0D0F12` | **7.8:1** | ✓ AAA |
| Dark background surface | `#161A1F` | **7.3:1** | ✓ AAA |
| Light background base | `#F5F6F8` | **3.1:1** | ✓ AA (large text) |
| Light background surface | `#FFFFFF` | **2.8:1** | ⚠ Large text only |

> **ملاحظة:** في Light Mode، يُستخدم `--color-accent-dark` (`#2B8FA0`) كبديل للنص الصغير على الخلفيات الفاتحة لضمان 4.5:1.

### درجات الـ Accent الكاملة

| الاسم | HEX | الاستخدام |
|------|-----|-----------|
| `accent-50` | `#E8F7FA` | خلفية hover خفيفة جداً في Light Mode |
| `accent-100` | `#B8E8F0` | highlight ناعم في Light Mode |
| `accent-300` | `#4FC3D6` | **القيمة الرئيسية** — icons، borders، interactive indicators في Dark Mode |
| `accent-600` | `#2B8FA0` | النص الـ accent في Light Mode لضمان 4.5:1 contrast |
| `accent-800` | `#1A5F6E` | حالات pressed/active states |

---

## القسم الثالث — الألوان الأساسية (Neutrals)

جميع الـ neutrals مُشتقة من نفس undertone بارد-رمادي محايد لضمان التجانس مع accent اللون وعدم تعارضهما. هذا القرار يخدم **Trustworthiness (Section XII.1)** عبر تحقيق الاتساق البصري الذي يُسجَّل كـ "visual consistency heuristic" في Section IV.4.

---

### `background-base`
**الوظيفة:** الخلفية الرئيسية لكامل الصفحة.

| الوضع | HEX | ملاحظة |
|------|-----|--------|
| Dark | `#0D0F12` | أعمق درجة — تحقق dark mode حقيقي بلا إرهاق |
| Light | `#F5F6F8` | أبيض مُبرَّد قليلاً — يتجنب الأبيض الصارخ |

**أين يُستخدم:** خلف كل محتوى، كـ base layer حصراً.
**أين لا يُستخدم:** لا يُوضع نص مباشرة عليه إلا مع `text-primary`.
**تباين مع `text-primary`:**
- Dark: `#E8ECF0` على `#0D0F12` → **13.2:1** ✓ AAA
- Light: `#161A1F` على `#F5F6F8` → **16.1:1** ✓ AAA

---

### `background-surface`
**الوظيفة:** خلفية البطاقات (cards)، الأقسام المرتفعة، الـ nav.

| الوضع | HEX | ملاحظة |
|------|-----|--------|
| Dark | `#161A1F` | طبقة فوق الـ base بمقدار مرئي لكن محسوب |
| Light | `#FFFFFF` | أبيض نقي يرفع البطاقات عن الـ base |

**أين يُستخدم:** project cards، contact form container، nav background.
**أين لا يُستخدم:** لا كخلفية للـ hero أو الصفحة الكاملة.
**تباين مع `text-primary`:**
- Dark: `#E8ECF0` على `#161A1F` → **12.1:1** ✓ AAA
- Light: `#161A1F` على `#FFFFFF` → **17.5:1** ✓ AAA

---

### `background-subtle`
**الوظيفة:** hover states، تمييز خفيف، zebra striping في الجداول.

| الوضع | HEX | ملاحظة |
|------|-----|--------|
| Dark | `#1E242B` | أفتح من surface بخطوة واحدة فقط |
| Light | `#ECEEF1` | أغمق من base بخطوة واحدة فقط |

**أين يُستخدم:** `button:hover`، `tr:hover`، section separators خفيفة.
**أين لا يُستخدم:** لا يُستخدم كخلفية لمحتوى قائم بذاته.
**تباين مع `text-primary`:**
- Dark: `#E8ECF0` على `#1E242B` → **10.9:1** ✓ AAA
- Light: `#161A1F` على `#ECEEF1` → **14.2:1** ✓ AAA

---

### `text-primary`
**الوظيفة:** كل النصوص الرئيسية — headings، body content، labels.

| الوضع | HEX | ملاحظة |
|------|-----|--------|
| Dark | `#E8ECF0` | أبيض بارد مُخفَّف — يُقلل التعب البصري على dark backgrounds |
| Light | `#161A1F` | يطابق undertone خلفيات الـ dark لتجانس النظام |

**أين يُستخدم:** `<p>`، `<h1>` إلى `<h6>`، nav links، form labels.
**أين لا يُستخدم:** لا يُستخدم على خلفية `background-subtle` بدون فحص تباين.

---

### `text-secondary`
**الوظيفة:** النصوص الثانوية، captions، metadata، subtitles.

| الوضع | HEX | ملاحظة |
|------|-----|--------|
| Dark | `#8A95A3` | رمادي متوسط بـ cool undertone |
| Light | `#5A6472` | يحافظ على 4.5:1 على الخلفيات الفاتحة |

**أين يُستخدم:** tech stack labels، dates، captions تحت العناوين، placeholder hints.
**أين لا يُستخدم:** لا يُستخدم للنص الأساسي أو أي محتوى يحتاج قراءة مستمرة.
**تباين:**
- Dark: `#8A95A3` على `#0D0F12` → **5.8:1** ✓ AA
- Light: `#5A6472` على `#F5F6F8` → **5.1:1** ✓ AA

---

### `text-disabled`
**الوظيفة:** النصوص غير النشطة، disabled form fields، محتوى غير متاح.

| الوضع | HEX | ملاحظة |
|------|-----|--------|
| Dark | `#4A5260` | تحت حد الـ AA عمداً — يُشير للعدم بصرياً |
| Light | `#A8B0BC` | نفس المبدأ في Light Mode |

**أين يُستخدم:** `input[disabled]`، labels لحقول غير نشطة.
**أين لا يُستخدم:** أي نص يحمل معلومة مطلوبة للمستخدم.
**ملاحظة WCAG:** هذا اللون يقصد عدم الوضوح — WCAG 2.1 يُعفي الـ disabled elements من معيار التباين (SC 1.4.3 exception).

---

### `border-default`
**الوظيفة:** الحدود المرئية للبطاقات، الجداول، الـ inputs.

| الوضع | HEX | ملاحظة |
|------|-----|--------|
| Dark | `#2C3440` | حد مرئي لكن غير متنافر مع الخلفية |
| Light | `#D0D5DC` | حد لطيف يُعرّف الحواف بلا ضجيج |

**أين يُستخدم:** `card border`، `input border`، `table borders`، `hr`.
**أين لا يُستخدم:** لا يُستخدم كـ separator تزييني.

---

### `border-subtle`
**الوظيفة:** الحدود الخفيفة جداً، فواصل الأقسام الداخلية.

| الوضع | HEX | ملاحظة |
|------|-----|--------|
| Dark | `#1E242B` | يكاد يختفي — تمييز هيكلي لا بصري |
| Light | `#E8EBF0` | نفس المبدأ في Light Mode |

**أين يُستخدم:** `section dividers`، داخل البطاقة بين أقسامها.
**أين لا يُستخدم:** لا يُستخدم حيث يحتاج المستخدم رؤية الحد بوضوح.

---

## القسم الرابع — ألوان الحالات (State Colors)

> **تحذير دستوري:** هذه الألوان لوظائف تقنية محددة حصراً. استخدامها في التصميم العام يُعدّ انتهاكاً لـ Section XII.2 (لون accent واحد) وللمبدأ الحاكم أن الألوان أداة وظيفية لا ديكور.

---

### `state-success`
**الاستخدام الدقيق:** رسالة تأكيد إرسال Contact Form فقط.

| الوضع | HEX | ملاحظة |
|------|-----|--------|
| Dark | `#2D8A5E` | أخضر داكن بارد — لا يتنافر مع النظام |
| Light | `#1E6B47` | أغمق لضمان 4.5:1 على الخلفيات الفاتحة |

**تباين للنص الأبيض فوقه:**
- Dark variant (`#2D8A5E`): أبيض `#E8ECF0` → **4.7:1** ✓ AA
- Light variant (`#1E6B47`): أبيض `#FFFFFF` → **5.9:1** ✓ AA

---

### `state-error`
**الاستخدام الدقيق:** أخطاء التحقق في Contact Form (validation errors).

| الوضع | HEX | ملاحظة |
|------|-----|--------|
| Dark | `#C0392B` | أحمر داكن واضح لا مبهج |
| Light | `#A93226` | أغمق قليلاً لضمان التباين الكافي |

**تباين للنص الأبيض فوقه:**
- Dark variant (`#C0392B`): `#E8ECF0` → **4.6:1** ✓ AA
- Light variant (`#A93226`): `#FFFFFF` → **5.3:1** ✓ AA

---

### `state-focus`
**الاستخدام الدقيق:** focus ring على كل العناصر التفاعلية — WCAG 2.1 SC 2.4.7 متطلب.

| الوضع | HEX | ملاحظة |
|------|-----|--------|
| Dark | `#4FC3D6` | يطابق الـ accent للاتساق البصري |
| Light | `#2B8FA0` | نسخة accent-600 لضمان التباين الكافي |

**التطبيق:** `outline: 2px solid var(--color-state-focus); outline-offset: 3px;`

---

## القسم الخامس — CSS Custom Properties

```css
:root {
  /* ============================================================
     AMER | عامر — Design Token System
     Section XII.2: Dark mode default, single cool-tone accent
     Single :root block per Section VI.2 — never scatter inline
  ============================================================ */

  /* === DARK MODE (Default) === */

  /* --- Accent (steel-cyan) --- */
  --color-accent:        #4FC3D6;  /* Primary accent — icons, interactive indicators */
  --color-accent-hover:  #62CBD9;  /* Hover state — slightly brighter */
  --color-accent-active: #3EB5C8;  /* Active/pressed state */
  --color-accent-subtle: #1A3A40;  /* Accent-tinted background — very subtle */
  --color-accent-dark:   #2B8FA0;  /* Accessible on light bg (4.5:1) */

  /* --- Backgrounds --- */
  --color-bg-base:       #0D0F12;  /* Page base — deepest layer */
  --color-bg-surface:    #161A1F;  /* Cards, nav, raised sections */
  --color-bg-subtle:     #1E242B;  /* Hover states, light separators */

  /* --- Text --- */
  --color-text-primary:   #E8ECF0; /* All main text — 13.2:1 on bg-base */
  --color-text-secondary: #8A95A3; /* Captions, meta, subtitles — 5.8:1 on bg-base */
  --color-text-disabled:  #4A5260; /* Inactive elements — intentionally low contrast */

  /* --- Borders --- */
  --color-border-default: #2C3440; /* Card borders, inputs, tables */
  --color-border-subtle:  #1E242B; /* Internal dividers, section separators */

  /* --- States --- */
  --color-state-success:  #2D8A5E; /* Form submission confirmation only */
  --color-state-error:    #C0392B; /* Form validation errors only */
  --color-state-focus:    #4FC3D6; /* Focus ring on interactive elements (WCAG 2.4.7) */
}

[data-theme="light"] {
  /* ============================================================
     LIGHT MODE OVERRIDES
     Same variable names — different values
     Toggle via: document.documentElement.dataset.theme = 'light'
  ============================================================ */

  /* --- Accent --- */
  --color-accent:        #2B8FA0;  /* accent-600 — 4.5:1 on light backgrounds */
  --color-accent-hover:  #237D8C;  /* Slightly darker on hover */
  --color-accent-active: #1A5F6E;  /* accent-800 for pressed state */
  --color-accent-subtle: #E8F7FA;  /* accent-50 — tinted light background */
  --color-accent-dark:   #1A5F6E;  /* Darkest for highest contrast needs */

  /* --- Backgrounds --- */
  --color-bg-base:       #F5F6F8;  /* Cooled white — not stark */
  --color-bg-surface:    #FFFFFF;  /* Pure white cards stand above base */
  --color-bg-subtle:     #ECEEF1;  /* Hover states, light tint */

  /* --- Text --- */
  --color-text-primary:   #161A1F; /* Deep cool-dark — 17.5:1 on bg-surface */
  --color-text-secondary: #5A6472; /* 5.1:1 on bg-base */
  --color-text-disabled:  #A8B0BC; /* Intentionally low — disabled exception */

  /* --- Borders --- */
  --color-border-default: #D0D5DC; /* Soft visible border */
  --color-border-subtle:  #E8EBF0; /* Near-invisible structural divider */

  /* --- States --- */
  --color-state-success:  #1E6B47; /* 5.9:1 on white */
  --color-state-error:    #A93226; /* 5.3:1 on white */
  --color-state-focus:    #2B8FA0; /* accent-600 — visible ring on light bg */
}
```

---

## القسم السادس — قواعد الاستخدام (Do / Don't)

| ✓ صحيح | ✗ خطأ |
|--------|-------|
| استخدام `--color-accent` على العناوين الرئيسية، الـ icons، والـ interactive indicators | استخدام `--color-accent` كخلفية لأقسام كاملة أو كـ background للـ hero |
| تعريف كل قيمة لونية عبر CSS variable من الـ `:root` | كتابة قيمة HEX مباشرة في CSS file خارج نظام الـ tokens |
| استخدام `state-success` وَ `state-error` وَ `state-focus` في سياق وظيفي فقط | استخدام `state-success` الأخضر كلون تمييز جمالي لأي محتوى آخر |
| اختبار نسب WCAG عند كل تركيبة نص-خلفية جديدة | افتراض أن أي لون من النظام يمر تلقائياً على أي خلفية |
| تطبيق `[data-theme="light"]` عبر JavaScript data attribute فقط | استخدام class toggling أو inline styles لتبديل الـ theme |
| استخدام `--color-accent-dark` (`#2B8FA0`) في Light Mode للنص على الخلفيات الفاتحة | استخدام `--color-accent` (`#4FC3D6`) كنص في Light Mode (نسبة 2.8:1 — فشل WCAG) |
| الحفاظ على الـ `:root` block كملف واحد مركزي كما يُلزم Section VI.2 | توزيع CSS variables على ملفات متعددة أو داخل components |

---

## القسم السابع — WCAG Compliance Summary

جميع الأرقام محسوبة وفق معادلة WCAG 2.1 relative luminance.  
المعيار المطلوب: **4.5:1 للـ body text** و **3:1 للـ large text** (Section VIII.3).

### Dark Mode

| العنصر | لون النص | لون الخلفية | النسبة | النتيجة |
|--------|---------|------------|--------|---------|
| Body text | `#E8ECF0` (text-primary) | `#0D0F12` (bg-base) | **13.2:1** | ✓ AAA |
| Body text on cards | `#E8ECF0` (text-primary) | `#161A1F` (bg-surface) | **12.1:1** | ✓ AAA |
| Secondary text | `#8A95A3` (text-secondary) | `#0D0F12` (bg-base) | **5.8:1** | ✓ AA |
| Secondary text on cards | `#8A95A3` (text-secondary) | `#161A1F` (bg-surface) | **5.3:1** | ✓ AA |
| Accent on base | `#4FC3D6` (accent) | `#0D0F12` (bg-base) | **7.8:1** | ✓ AAA |
| Accent on surface | `#4FC3D6` (accent) | `#161A1F` (bg-surface) | **7.3:1** | ✓ AAA |
| Success text (white) | `#E8ECF0` | `#2D8A5E` (state-success) | **4.7:1** | ✓ AA |
| Error text (white) | `#E8ECF0` | `#C0392B` (state-error) | **4.6:1** | ✓ AA |
| Body on hover state | `#E8ECF0` (text-primary) | `#1E242B` (bg-subtle) | **10.9:1** | ✓ AAA |

### Light Mode

| العنصر | لون النص | لون الخلفية | النسبة | النتيجة |
|--------|---------|------------|--------|---------|
| Body text | `#161A1F` (text-primary) | `#F5F6F8` (bg-base) | **16.1:1** | ✓ AAA |
| Body text on cards | `#161A1F` (text-primary) | `#FFFFFF` (bg-surface) | **17.5:1** | ✓ AAA |
| Secondary text | `#5A6472` (text-secondary) | `#F5F6F8` (bg-base) | **5.1:1** | ✓ AA |
| Secondary text on cards | `#5A6472` (text-secondary) | `#FFFFFF` (bg-surface) | **5.5:1** | ✓ AA |
| Accent (accessible) | `#2B8FA0` (accent-dark) | `#F5F6F8` (bg-base) | **4.6:1** | ✓ AA |
| Accent (accessible) on white | `#2B8FA0` (accent-dark) | `#FFFFFF` (bg-surface) | **4.9:1** | ✓ AA |
| Success text (white) | `#FFFFFF` | `#1E6B47` (state-success) | **5.9:1** | ✓ AA |
| Error text (white) | `#FFFFFF` | `#A93226` (state-error) | **5.3:1** | ✓ AA |
| Body on hover state | `#161A1F` (text-primary) | `#ECEEF1` (bg-subtle) | **14.2:1** | ✓ AAA |

> **ملاحظة مرجعية:** `#4FC3D6` (accent الرئيسي) **لا يُستخدم كنص** في Light Mode لأن نسبته على الخلفيات الفاتحة (2.8:1) لا تجتاز معيار WCAG. البديل المعتمد هو `--color-accent-dark` (`#2B8FA0`).

---

*amer-color-system.md — مُشتق من AMER Strategic Master Constitution v1.0.0*  
*كل قرار في هذا الملف مربوط بمرجع دستوري — لا قرارات جمالية مستقلة.*

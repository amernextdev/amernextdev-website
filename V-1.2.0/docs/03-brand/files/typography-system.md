# 🔤 typography-system.md — نظام الطباعة

> "الخط يُحدد نبرة الصوت قبل أن تُقرأ الكلمات."

---

## 1️⃣ فلسفة الطباعة

### المبدأ الجوهري:

> **الطباعة في هذا الموقع أداة توصيل، لا أداة تزيين.**

الخط المختار يجب أن يُرسل رسالة ضمنية تتسق مع هوية العلامة:
- منضبط لكن إنساني
- تقني لكن غير بارد
- واضح حتى في أصغر حجم

### ما نتجنبه:

```
❌ خطوط مزخرفة أو "الخط الخطي" — تناقض الانضباط
❌ خطوط ضعيفة الوزن — تُشعر بالهشاشة
❌ أكثر من عائلتين خطية — يُشتّت الهوية
❌ أحجام غير متسقة — يكسر الـ Hierarchy
```

---

## 2️⃣ الخطوط المختارة

### الخط الأساسي — Body & UI

```
الاسم:    Inter
النوع:    Sans-serif متغير (Variable Font)
المصدر:   Google Fonts / rsms.me/inter
```

**لماذا Inter؟**

Inter مصمم خصيصاً للشاشات — ليس للطباعة. كل رسمة فيه محسوبة للقراءة الرقمية على كل دقة شاشة. يُستخدمه Notion و Linear و GitHub — وهي منتجات تعكس نفس قيمة الانضباط والوضوح.

---

### الخط الثانوي — Display & Headlines

```
الاسم:    Fraunces (أو بديل: Playfair Display)
النوع:    Serif متغير، Optical Size
المصدر:   Google Fonts
```

**متى يُستخدم Fraunces؟**
- عناوين Hero الكبيرة فقط (H1 في الـ Hero section)
- اقتباسات بارزة (Pull Quotes)
- تفاصيل بصرية محدودة جداً

**لماذا Serif واحد؟**
Serif مقابل Sans-serif يُنشئ تباينًا طباعيًا يكسر الرتابة الشكلية ويُعطي الـ Hero قيمة بصرية مختلفة — دون الخروج عن نظام الألوان المحدود.

> [!WARNING]
> Fraunces يُستخدم بحذر شديد. الإفراط فيه يكسر نظام الانضباط.

---

## 3️⃣ نظام الأحجام — Type Scale

نظام مبني على النسبة الذهبية التقريبية (1.25 — Major Third):

```
--text-xs:   0.75rem  /  12px   ← Labels، Tags، Metadata
--text-sm:   0.875rem /  14px   ← Captions، Helper text
--text-base: 1rem     /  16px   ← النص الأساسي، Body
--text-lg:   1.125rem /  18px   ← Lead paragraphs، نص كبير
--text-xl:   1.25rem  /  20px   ← H4، Card titles
--text-2xl:  1.5rem   /  24px   ← H3
--text-3xl:  1.875rem /  30px   ← H2
--text-4xl:  2.25rem  /  36px   ← H1 الداخلي
--text-5xl:  3rem     /  48px   ← Hero headline
--text-6xl:  3.75rem  /  60px   ← Hero headline كبير (Desktop)
```

---

## 4️⃣ نظام الأوزان — Font Weights

```
400 — Regular:    النص الأساسي، الفقرات الطويلة
500 — Medium:     Lead text، تأكيد طفيف
600 — SemiBold:   H3، H4، Labels مهمة، Buttons
700 — Bold:       H1، H2، أرقام بارزة
```

> [!NOTE]
> لا يوجد استخدام لـ 300 (Light) — يُعطي إحساس بعدم الثقة والهشاشة.
> لا يوجد استخدام لـ 800–900 (ExtraBold/Black) — مبالغة تتعارض مع الهوية الهادئة.

---

## 5️⃣ تعريف كل مستوى نصي — الاستخدام الكامل

### H1 — Hero Headline

```
الخط:     Fraunces (Display) أو Inter Bold
الحجم:    3rem–3.75rem (Mobile: 2.25rem)
الوزن:    700
الارتفاع: 1.1–1.15 (Tight — للعناوين الكبيرة)
اللون:    --text-on-dark أو --text-on-light
الاستخدام: مرة واحدة فقط في كل صفحة
```

---

### H2 — Section Headlines

```
الخط:     Inter
الحجم:    1.875rem (Mobile: 1.5rem)
الوزن:    700
الارتفاع: 1.2
الاستخدام: عنوان كل section رئيسي
```

---

### H3 — Sub-section Headlines

```
الخط:     Inter
الحجم:    1.5rem (Mobile: 1.25rem)
الوزن:    600
الارتفاع: 1.3
الاستخدام: عنوان Cards، عناوين داخل Section
```

---

### H4 — Component Headlines

```
الخط:     Inter
الحجم:    1.25rem
الوزن:    600
الارتفاع: 1.4
الاستخدام: عناوين داخل Components، نقاط التأكيد
```

---

### Body — النص الأساسي

```
الخط:     Inter
الحجم:    1rem (16px)
الوزن:    400
الارتفاع: 1.7 (Relaxed — للقراءة المريحة)
العرض:    60–75 حرف كحد أقصى (45–50ch للعربي)
اللون:    --text-on-dark / --text-on-light
```

> [!NOTE]
> عرض النص (Line Length) من أهم عوامل القراءة المريحة. أكثر من 75 حرف يُرهق العين.

---

### Lead — الفقرة الافتتاحية

```
الخط:     Inter
الحجم:    1.125rem–1.25rem
الوزن:    500
الارتفاع: 1.6
الاستخدام: أول فقرة في كل section، نص Hero الفرعي
```

---

### Caption & Labels

```
الخط:     Inter
الحجم:    0.75rem–0.875rem
الوزن:    400–500
الارتفاع: 1.5
اللون:    --text-secondary (--color-muted)
الاستخدام: تواريخ، Tags، Metadata، Helper text
```

---

## 6️⃣ قواعد الـ Line Height — ارتفاع السطر

```
عناوين كبيرة (Display):  1.1 — Tight
عناوين (H1–H2):          1.2 — Snug
عناوين صغيرة (H3–H4):   1.3–1.4
نص قصير (Lead):          1.5–1.6
نص طويل (Body):          1.7 — Relaxed
```

**القاعدة:** كلما كبر النص، قلّ الـ Line Height. كلما صغر وطال، زاد.

---

## 7️⃣ CSS Variables — الإعداد الكامل

```css
:root {
  /* ── Font Families ── */
  --font-sans:    'Inter', system-ui, -apple-system, sans-serif;
  --font-display: 'Fraunces', Georgia, serif;

  /* ── Font Sizes ── */
  --text-xs:   0.75rem;
  --text-sm:   0.875rem;
  --text-base: 1rem;
  --text-lg:   1.125rem;
  --text-xl:   1.25rem;
  --text-2xl:  1.5rem;
  --text-3xl:  1.875rem;
  --text-4xl:  2.25rem;
  --text-5xl:  3rem;
  --text-6xl:  3.75rem;

  /* ── Font Weights ── */
  --weight-regular:  400;
  --weight-medium:   500;
  --weight-semibold: 600;
  --weight-bold:     700;

  /* ── Line Heights ── */
  --leading-tight:   1.15;
  --leading-snug:    1.25;
  --leading-normal:  1.5;
  --leading-relaxed: 1.7;
}
```

---

## 8️⃣ الطباعة في السياقين: العربي والإنجليزي

> [!WARNING]
> الموقع قد يحتوي نصوصاً بالعربية والإنجليزية. القواعد التالية ضرورية:

| الخاصية | العربي | الإنجليزي |
|---|---|---|
| الاتجاه | RTL (`dir="rtl"`) | LTR |
| الـ Line Height | 1.8–2.0 (الخط العربي يحتاج مساحة أكبر) | 1.7 |
| Letter Spacing | 0 (لا تُعدّل للعربي) | -0.01em للعناوين |
| الخط | نفق (Noto Sans Arabic) أو IBM Plex Arabic | Inter |

---

*المرجع التالي: [`visual-principles.md`](./visual-principles.md)*
*مرتبط بـ: [`color-system.md`](./color-system.md) | [`css-architecture.md`](../technical/css-architecture.md) | [`components-spec.md`](../ux-ui/components-spec.md)*

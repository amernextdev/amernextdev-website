# AMER | عامر — مرجع الطباعة
## Typography Reference · v1.0 · 2026
### Professional Positioning System — Phase 1: Vanilla CSS

---

## 1. جدول الخطوط

| الخط | اللغة | الدور | الأوزان المستخدمة | المصدر |
|------|-------|-------|-------------------|--------|
| DM Mono | الإنجليزية | عناوين (Display, H1, H2, H3) | 300 / 400 / 500 / 600 | Google Fonts (self-hosted) |
| Inter | الإنجليزية | نص أساسي، تسميات، كابشن | 300 / 400 / 500 / 600 | Google Fonts (self-hosted) |
| IBM Plex Sans Arabic | العربية | عناوين (Display, H1, H2, H3) | 300 / 400 / 500 / 600 | Google Fonts (self-hosted) |
| Noto Sans Arabic | العربية | نص أساسي، تسميات، كابشن | 300 / 400 / 500 / 600 | Google Fonts (self-hosted) |

**ملاحظة:** DM Mono خط لاتيني فقط — لا يدعم العربية. IBM Plex Sans Arabic يؤدي نفس الدور البصري الهندسي في الصفحات العربية. الخطان يُشكّلان ثنائيَّين منفصلَّين لكل لغة.

---

## 2. جدول Type Scale الكامل

| المستوى | المتغير | القيمة (clamp) | Desktop | Mobile | الاستخدام | لا يُستخدم في |
|---------|---------|---------------|---------|--------|-----------|--------------|
| Display | `--font-size-display` | `clamp(2.25rem, 5vw, 4rem)` | 56–64px | 36–40px | Hero headline — جملة التموضع في Home فقط | أي صفحة أخرى |
| H1 | `--font-size-h1` | `clamp(1.75rem, 3.5vw, 2.5rem)` | 40px | 28px | عناوين الصفحات (Work, Approach, Contact, Notes) | داخل الأقسام |
| H2 | `--font-size-h2` | `clamp(1.375rem, 2.5vw, 1.75rem)` | 28px | 22px | عناوين الأقسام داخل كل صفحة | Hero, بديل لـ H1 |
| H3 | `--font-size-h3` | `clamp(1.125rem, 2vw, 1.25rem)` | 20px | 18px | عناوين الفقرات، مبادئ Approach، عناوين الملاحظات | نص متواصل |
| Body | `--font-size-body` | `clamp(0.9375rem, 1.5vw, 1rem)` | 16px | 15px | النص الأساسي في جميع الصفحات | عناوين |
| Caption | `--font-size-caption` | `clamp(0.6875rem, 1vw, 0.8125rem)` | 12–13px | 11px | التسميات، التواريخ، Stack labels في Case Study | نص أساسي |

**النسبة المستخدمة:** Minor Third (1.25) — تدرج واضح دون قفزات درامية (انسجاماً مع مبدأ Restraint في Section XII.1).

---

## 3. جدول الأوزان ومواضع استخدامها

| الوزن | المتغير | أين يُستخدم | مثال |
|-------|---------|------------|------|
| Light 300 | `--font-weight-light` | Labels، تواريخ، نص Caption الثانوي، Metadata | تاريخ المشروع في Case Study |
| Regular 400 | `--font-weight-regular` | Body text أساسي، H3، نص hero الداعم | فقرات صفحة Approach |
| Medium 500 | `--font-weight-medium` | H2، تأكيد داخل النص، مصطلحات تقنية بارزة | عناوين الأقسام |
| SemiBold 600 | `--font-weight-semibold` | Display، H1، Project Card labels، Qualifier Statement | جملة التموضع الرئيسية |
| **Bold 700** | *(محظور)* | **محظور في النص الأساسي — محظور في العناوين** | *يكسر الإيقاع البصري* |

**تنبيه:** الوزن 700 محظور تماماً. الدستور (Section XII.1): "Discipline: deliberate reduction" — الوزن الثقيل غير المبرر يُشير إلى Over-decoration.

---

## 4. قواعد تغيير اللغة

نظام تبديل اللغة يعمل عبر خاصية `data-lang` على عنصر `<html>`:

```html
<!-- الإنجليزية -->
<html data-lang="en">

<!-- العربية -->
<html data-lang="ar">
```

**ما يتغير عند التبديل إلى العربية:**

1. **الخطوط:** تُستبدل `DM Mono` و`Inter` بـ `IBM Plex Sans Arabic` و`Noto Sans Arabic` تلقائياً عبر المحددات `[data-lang="ar"]`.

2. **الاتجاه:** `direction: rtl` يُطبَّق على `body` وكل عناصر النص — الصفحة تُقرأ من اليمين إلى اليسار.

3. **محاذاة النص:** `text-align: right` تُطبَّق على كل عناصر النص العربي.

4. **تباعد الأسطر (line-height):** تُستخدم متغيرات عربية مخصصة أكبر بنحو 10% — الخطوط العربية تحتاج تهوية أعلى (مثال: body يرتفع من `1.65` إلى `1.8`).

5. **letter-spacing:** يُلغى تماماً (`letter-spacing: 0`) في كل العناصر العربية — تطبيق تباعد الأحرف على الخط العربي يُفسد التحسينات البصرية للحرف المتصل.

---

## 5. قواعد لا تُخالَف

### القاعدة 1 — لا قيم مباشرة في الـ CSS (Law L-07)
كل قيمة طباعية تُعرَّف في `:root` كـ CSS variable. لا وزن، لا حجم، لا تباعد مكتوب مباشرة في selector.

| ✓ صواب | ✗ خطأ |
|--------|-------|
| `font-size: var(--font-size-h1);` | `font-size: 2.5rem;` |
| `font-weight: var(--font-weight-semibold);` | `font-weight: 600;` |

---

### القاعدة 2 — الـ font-display: swap إلزامي (Section V.2)
كل `@font-face` block يجب أن يحتوي على `font-display: swap` دون استثناء. النص لا يختفي أثناء تحميل الخط.

| ✓ صواب | ✗ خطأ |
|--------|-------|
| `@font-face { font-display: swap; }` | `@font-face { /* بدون font-display */ }` |

---

### القاعدة 3 — لا يُطبَّق letter-spacing على الخط العربي
تباعد الأحرف يُكسر التصاق الحروف العربية ويُفسد الخط.

| ✓ صواب | ✗ خطأ |
|--------|-------|
| `[data-lang="ar"] * { letter-spacing: 0; }` | `[data-lang="ar"] .text-label { letter-spacing: 0.1em; }` |

---

### القاعدة 4 — لا تتجاوز سلّم النوع الخماسي (Section XII.2: "Strict 5-step type scale")
المقياس محدد بـ 5 مستويات: Display, H1, H2, H3, Body, Caption. لا أحجام مخصصة خارجها.

| ✓ صواب | ✗ خطأ |
|--------|-------|
| استخدام `--font-size-h2` لعناوين الأقسام | إنشاء `--font-size-h2-small: 1.5rem` خارج المقياس |

---

### القاعدة 5 — الوزن 700 Bold محظور (Section XII.1: "Discipline: deliberate reduction")
أقصى وزن مسموح به هو 600 SemiBold. وزن 700 يكسر الإيقاع البصري ويُشير إلى Over-decoration.

| ✓ صواب | ✗ خطأ |
|--------|-------|
| `font-weight: var(--font-weight-semibold);` على Display/H1 | `font-weight: 700;` أو `font-weight: bold;` في أي مكان |

---

*Typography Reference · v1.0 · 2026 · AMER | عامر*
*مستخرج من: Style & Typography Reference v1.0 + الدستور الاستراتيجي الرئيسي v1.0.0*

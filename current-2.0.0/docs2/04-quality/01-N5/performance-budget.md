# performance-budget.md

## الهدف
تحديد سقوف الأداء غير القابلة للتفاوض للمرحلة الأولى، وآلية قياسها والتحقق منها قبل كل نشر.

## المشمول
- سقوف Lighthouse لكل مقياس
- ميزانية الأصول (حجم، عدد طلبات)
- مقاييس Core Web Vitals المستهدفة
- آلية القياس والتحقق

## غير المشمول
- كيفية تحقيق هذه الأرقام تقنياً (→ `performance-implementation.md`)
- عملية التحقق كجزء من النشر (→ `lighthouse-validation-process.md`)

## مبدأ الميزانية

الأداء إشارة ثقة. موقع ثابت بلا خادم ولا قاعدة بيانات لا عذر له في الأداء الرديء.
هذه الأرقام سقوف، لا أهداف — تجاوزها يوقف النشر.

## سقوف Lighthouse

يُقاس على Chrome DevTools، Network: Fast 3G، Device: Mobile.

| المقياس | السقف الأدنى | الهدف |
|--------|------------|-------|
| Performance | 90 | 95+ |
| Accessibility | 95 | 100 |
| Best Practices | 90 | 95+ |
| SEO | 95 | 100 |

**قاعدة:** أي نشر يُنتج score أقل من السقف يُوقَف حتى الإصلاح.

## Core Web Vitals

| المقياس | التعريف | السقف |
|--------|---------|-------|
| LCP (Largest Contentful Paint) | وقت ظهور أكبر عنصر مرئي | < 2.5s |
| FID (First Input Delay) | تأخير الاستجابة لأول تفاعل | < 100ms |
| CLS (Cumulative Layout Shift) | إجمالي الإزاحات المرئية غير المتوقعة | < 0.1 |
| FCP (First Contentful Paint) | وقت ظهور أول محتوى | < 1.8s |
| TTFB (Time to First Byte) | وقت استجابة الخادم | < 600ms |

## ميزانية الأصول

### الحجم الإجمالي
| نوع الأصل | السقف |
|----------|-------|
| HTML (لكل صفحة) | < 30KB |
| CSS (مجمَّع، مضغوط) | < 50KB |
| JavaScript (مجمَّع، مضغوط) | < 50KB |
| الصور (إجمالي الصفحة) | < 500KB |
| الخطوط | < 100KB |
| **الإجمالي لكل صفحة** | **< 750KB** |

### عدد طلبات HTTP
| النوع | السقف |
|------|-------|
| طلبات HTML | 1 لكل صفحة |
| طلبات CSS | 1 (ملف مجمَّع) |
| طلبات JS | 1–3 (main + وحدات ضرورية) |
| طلبات الخطوط | ≤ 2 |
| طلبات الصور | يُقيَّم حسب الصفحة |
| **الإجمالي الحرج** | **< 10 طلبات blocking** |

### قواعد الصور
| المعيار | القيمة |
|--------|--------|
| الصيغة | WebP مع fallback JPEG/PNG |
| الجودة | 75–85% (WebP) |
| أقصى عرض | 1600px |
| تحميل | `loading="lazy"` لكل ما تحت الطية |
| أبعاد | مُحددة صراحةً على كل `<img>` |

## قواعد الأداء التقنية

هذه القواعد تُنتج الأرقام أعلاه — انتهاكها يُفسر سبب تجاوز السقف:

**CSS:**
- ملف واحد مجمَّع في الإنتاج. لا `@import` chains.
- لا CSS غير مستخدم (purge عند الحاجة).

**JavaScript:**
- جميع scripts بـ `defer` أو `type="module"`. لا script يعيق العرض.
- لا مكتبات خارجية غير مبررة.

**الخطوط:**
- `font-display: swap` على جميع الخطوط. لا FOIT.
- الخطوط مُحمَّلة من `<head>` بـ `rel="preload"` للخط الأساسي.

**الصور:**
- لا صورة بدون `width` و`height` صريحَين (تمنع CLS).
- Hero image بـ `loading="eager"` إذا كانت LCP element.

**الخادم/CDN:**
- `Cache-Control` مُعيَّن على الأصول الثابتة (CSS، JS، images): `max-age=31536000, immutable`.
- HTML: `max-age=0, must-revalidate`.

## آلية القياس

### قبل كل نشر
```bash
# تشغيل Lighthouse CLI
npx lighthouse https://staging-url.com \
  --output=json \
  --output-path=./lighthouse-report.json \
  --chrome-flags="--headless" \
  --preset=desktop

# فحص Core Web Vitals محلياً
# Chrome DevTools → Performance → record page load
```

### أدوات القياس المعتمدة
| الأداة | الاستخدام |
|--------|---------|
| Lighthouse CLI | قياس score قبل النشر |
| Chrome DevTools → Performance | تحليل تفصيلي |
| WebPageTest.org | قياس من شبكات حقيقية |
| Chrome DevTools → Network | فحص الطلبات والأحجام |

### تفسير النتائج
- Score بين السقف والهدف: مقبول للنشر، يُسجَّل للتحسين.
- Score أقل من السقف: يُوقَف النشر. يُفتح issue. يُحدَّد المسبب.
- Score أعلى من الهدف: ممتاز — يُوثَّق كـ baseline.

## القيود التي يجب مراعاتها
- الأرقام مُقاسة على Mobile (الأصعب). Desktop عادةً أفضل بهامش واضح.
- تحديث FontAwesome أو أي تبعية خارجية يستلزم إعادة قياس فوري.
- إضافة صفحة جديدة تستلزم قياساً مستقلاً لها.

## التأثير على التطبيق
ميزانية الأداء تحكم قرارات `decision-engine.md` البوابة 4.
أي مقترح ميزة يُقيَّم: "هل يُبقي الميزانية سليمة؟"

## وثائق مرتبطة
- `performance-implementation.md` — كيف تُحقَّق هذه الأرقام تقنياً
- `lighthouse-validation-process.md` — عملية التحقق المدمجة في النشر
- `decision-engine.md` (← `01-constitution/`) — البوابة 4 تعتمد على هذه الميزانية
- `risk-landscape.md` (← `01-constitution/`) — R5 (انتهاك الميزانية) وإشارات الكشف

## الملف التالي
`performance-implementation.md`

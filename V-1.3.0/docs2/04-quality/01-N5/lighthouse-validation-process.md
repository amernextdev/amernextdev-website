# lighthouse-validation-process.md

## الهدف
تحديد عملية التحقق الكاملة قبل كل نشر — من تشغيل Lighthouse إلى تفسير النتائج واتخاذ قرار النشر.

## المشمول
- متى تُشغَّل عملية التحقق
- خطوات التحقق بالترتيب
- تفسير النتائج وقرار النشر
- قالب توثيق النتائج

## غير المشمول
- السقوف والأرقام المستهدفة (→ `performance-budget.md`)
- كيف تُحقَّق هذه الأرقام تقنياً (→ `performance-implementation.md`)
- قائمة فحص إمكانية الوصول اليدوي (→ `accessibility-checklist.md`)

## متى تُشغَّل عملية التحقق

| الحالة | مستوى التحقق |
|--------|-------------|
| نشر ميزة جديدة | كامل (كل الخطوات) |
| تحديث محتوى فقط | مُختصر (Lighthouse فقط) |
| إصلاح bug صغير | Lighthouse على الصفحة المتأثرة |
| تحديث تبعية خارجية | كامل |

## عملية التحقق — بالترتيب

### الخطوة 1 — بناء نسخة الإنتاج

```bash
# تجميع CSS
cat css/tokens.css css/base.css css/components/*.css css/utilities.css \
  | cleancss -o dist/css/main.min.css

# التحقق من الحجم
wc -c dist/css/main.min.css
# يجب أن يكون < 50KB (51,200 bytes)

# تجميع JS
# (build tool أو manual concat حسب الإعداد)

# التحقق من الحجم
wc -c dist/js/main.min.js
# يجب أن يكون < 50KB
```

### الخطوة 2 — تشغيل خادم محلي للإنتاج

```bash
# لا تختبر على dev server — يختلف عن الإنتاج
npx serve dist/ -p 3000

# أو
python3 -m http.server 3000 --directory dist/
```

### الخطوة 3 — تشغيل Lighthouse

```bash
# تثبيت lighthouse (مرة واحدة)
npm install -g lighthouse

# تشغيل على المحلي
lighthouse http://localhost:3000 \
  --output=html,json \
  --output-path=./reports/lighthouse-$(date +%Y%m%d) \
  --chrome-flags="--headless --no-sandbox"

# لاختبار Mobile (الأهم)
lighthouse http://localhost:3000 \
  --preset=desktop \
  --output=html \
  --output-path=./reports/lighthouse-desktop-$(date +%Y%m%d)
```

**بديل:** Lighthouse في Chrome DevTools → تبويب Lighthouse → اختر Mobile → Generate report.

### الخطوة 4 — قراءة النتائج

**Scores الأساسية:**
```
Performance:    [X] / 100    السقف: 90
Accessibility:  [X] / 100    السقف: 95
Best Practices: [X] / 100    السقف: 90
SEO:            [X] / 100    السقف: 95
```

**Core Web Vitals:**
```
LCP: [X]s     السقف: < 2.5s
FID: [X]ms    السقف: < 100ms
CLS: [X]      السقف: < 0.1
FCP: [X]s     السقف: < 1.8s
```

### الخطوة 5 — قرار النشر

```
جميع Scores فوق السقف + جميع CWV ضمن الحدود
→ النشر مُجاز

أي score أقل من السقف
→ النشر موقوف

أي CWV خارج الحد
→ النشر موقوف
```

### الخطوة 6 — معالجة الإخفاقات

```
1. افتح تقرير HTML
2. افتح قسم "Opportunities" + "Diagnostics"
3. كل مشكلة لها:
   - وصف المشكلة
   - الأثر المقدَّر على الـ score
   - رابط للتوثيق
4. ابدأ بأعلى أثر
5. أصلح + أعد التشغيل
6. كرر حتى الاجتياز
```

**المشكلات الشائعة وحلولها السريعة:**

| المشكلة | الحل |
|--------|------|
| Images without explicit dimensions | أضف width/height على `<img>` |
| Render-blocking resources | أضف defer على scripts |
| Unused CSS | purge غير المستخدم |
| Missing alt text | أضف alt على الصور |
| Low contrast ratio | راجع `css-design-tokens.md` وعدّل لون النص |
| Missing meta description | أضف meta description فريدة |

## قالب توثيق النتائج

يُحفظ في `reports/` مع كل نشر:

```markdown
## Lighthouse Report — [التاريخ] — [وصف التغيير]

### Scores
| المقياس | النتيجة | السقف | الحالة |
|--------|---------|-------|--------|
| Performance | XX | 90 | ✓/✗ |
| Accessibility | XX | 95 | ✓/✗ |
| Best Practices | XX | 90 | ✓/✗ |
| SEO | XX | 95 | ✓/✗ |

### Core Web Vitals
| المقياس | القيمة | الحد | الحالة |
|--------|--------|------|--------|
| LCP | X.Xs | <2.5s | ✓/✗ |
| FID | Xms | <100ms | ✓/✗ |
| CLS | 0.X | <0.1 | ✓/✗ |

### قرار النشر
[مُجاز / موقوف]

### ملاحظات
[أي issues تم رصدها وخطة معالجتها]
```

## بعد النشر

### التحقق على الإنتاج
```bash
# تشغيل على URL الإنتاج بعد النشر
lighthouse https://amer.dev \
  --output=json \
  --output-path=./reports/post-deploy-$(date +%Y%m%d).json
```

النتائج يجب أن تتطابق مع نتائج Staging. فارق > 10 نقاط يستلزم تحقيقاً.

### التحقق بـ Google Search Console
بعد نشر أي صفحة جديدة:
- Request indexing من Search Console
- التحقق بعد 48 ساعة أن الصفحة مُفهرَسة

## القيود التي يجب مراعاتها
- Lighthouse على localhost أحياناً يختلف عن الإنتاج (network، CDN). النتيجة النهائية المعتمدة هي نتيجة Staging URL.
- نتائج Lighthouse تتغير بين التشغيلات بفارق ±5 نقاط. إذا كان score 88 بدل 90، شغّله مرة أخرى قبل الوقف.

## التأثير على التطبيق
هذه العملية هي الحارس النهائي قبل كل نشر.
لا نشر بدون تقرير موثَّق. القاعدة مطلقة.

## وثائق مرتبطة
- `performance-budget.md` — السقوف التي تفحصها هذه العملية
- `performance-implementation.md` — كيف تُصلح إخفاقات الأداء
- `accessibility-checklist.md` — الفحص اليدوي الذي يُكمل Lighthouse
- `launch-checklist.md` (← `06-operations/`) — القائمة الشاملة للإطلاق الأول

## الملف التالي
`05-evolution/evolution-matrix.md`

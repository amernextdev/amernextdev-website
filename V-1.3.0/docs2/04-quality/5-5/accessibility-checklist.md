# accessibility-checklist.md

## الهدف
قائمة فحص تشغيلية لضمان التزام المنظومة بـ WCAG 2.1 المستوى AA قبل كل نشر.

## المشمول
- قائمة الفحص التقني (HTML، CSS، JS)
- فحوصات التباين والألوان
- فحوصات التنقل بلوحة المفاتيح
- فحوصات قارئات الشاشة
- أدوات الفحص الآلي والدليل

## غير المشمول
- كيفية تنفيذ إمكانية الوصول في الكود (→ `html-structure-guidelines.md`)
- سقوف Lighthouse Accessibility (→ `performance-budget.md`)

## مبدأ إمكانية الوصول

إمكانية الوصول ليست تطوعاً — بل دقة هندسية.
منظومة تفشل مستخدمين بأساليب تفاعل مختلفة هي منظومة معيبة.

المستوى المستهدف: **WCAG 2.1 AA** — الحد الأدنى غير القابل للتفاوض.

## قائمة الفحص قبل النشر

### 1 — البنية والدلالة

```
[ ] H1 واحد فقط في الصفحة
[ ] التراتبية: H1 → H2 → H3 (لا تخطي درجات)
[ ] معالم ARIA موجودة: header، nav، main، footer
[ ] nav بـ aria-label إذا تعدد في الصفحة
[ ] رابط "تخطي إلى المحتوى الرئيسي" موجود وفعّال
[ ] HTML يجتاز W3C Validator
[ ] lang و dir مُعيَّنان على <html>
```

### 2 — النص والمحتوى

```
[ ] لا معلومة تنقلها الألوان وحدها (مثال: حالة الخطأ تعتمد على text لا لون فقط)
[ ] لا CAPS LOCK لنص كامل (يُستبدل بـ CSS text-transform)
[ ] Abbreviations لها <abbr title="..."> عند الاستخدام الأول
[ ] اقتباسات بـ <blockquote>، لا styling عشوائي
```

### 3 — الصور والمحتوى المرئي

```
[ ] كل صورة محتوى لها alt وصفي ومحدد
[ ] الصور الزخرفية: alt="" و role="presentation"
[ ] SVG وظيفي: title + aria-label
[ ] لا معلومة في صورة بدون نص بديل
[ ] Videos (إن وجدت): subtitles أو transcript
```

### 4 — التباين اللوني

```
[ ] نص أساسي على خلفيته: ≥ 4.5:1
[ ] نص كبير (18px+ أو 14px+ bold) على خلفيته: ≥ 3:1
[ ] عناصر UI (حدود inputs، أيقونات وظيفية): ≥ 3:1
[ ] حالات focus visible: ≥ 3:1
[ ] لا نص على صور بدون overlay بتباين كافٍ
```

**أدوات فحص التباين:**
- Chrome DevTools → Elements → CSS → نقر على اللون
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Axe DevTools extension

### 5 — التنقل بلوحة المفاتيح

```
[ ] جميع العناصر التفاعلية وصولها بـ Tab بالترتيب المنطقي
[ ] tabindex="0" للعناصر التفاعلية غير الافتراضية
[ ] tabindex="-1" فقط لإدارة focus برمجياً
[ ] لا tabindex > 0 (يكسر الترتيب الطبيعي)
[ ] مؤشر focus مرئي دائماً (لا outline: none)
[ ] القوائم المنسدلة: Escape تُغلق، Arrow keys للتنقل
[ ] Modals (إن وجدت): focus يُحصر داخلها، Escape تُغلق
[ ] لا focus trap عشوائي خارج modals
```

**اختبار يدوي:** أغلق الماوس تماماً وتصفح الموقع بـ Tab فقط. يجب إكمال كل مهمة.

### 6 — النماذج

```
[ ] كل input لها <label> مرتبط بـ for/id
[ ] لا placeholder بديل عن label
[ ] رسائل الخطأ: واضحة، مرتبطة بـ aria-describedby
[ ] required مُحدَّد بـ required attribute + aria-required
[ ] إرشادات format مرتبطة بـ input بـ aria-describedby
```

### 7 — ARIA

```
[ ] ARIA تُكمّل HTML الدلالي — لا تحله
[ ] لا role على عنصر له role طبيعي مناسب
[ ] aria-label أو aria-labelledby على كل section/region
[ ] aria-expanded على toggles (القوائم، accordions)
[ ] aria-current="page" على رابط الصفحة الحالية في nav
[ ] aria-live للمحتوى الديناميكي (رسائل الحالة)
```

### 8 — الحركة والـ Animation

```
[ ] أي animation يستمر أكثر من 5 ثوانٍ له آلية إيقاف
[ ] animations تستجيب لـ prefers-reduced-motion
```

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## أدوات الفحص الآلي

| الأداة | ما تكشفه | الاستخدام |
|--------|---------|----------|
| Lighthouse → Accessibility | score عام وإشكاليات شائعة | قبل كل نشر |
| axe DevTools (Chrome extension) | خطأ WCAG مع رابط للمعيار | أثناء التطوير |
| WAVE | تصور بصري للإشكاليات | مراجعة دورية |
| Chrome DevTools → Accessibility tree | تدقيق semantic structure | عند الشك |

**تحذير:** الفحص الآلي يكتشف ~30-40% من إشكاليات إمكانية الوصول.
الفحص اليدوي (لوحة مفاتيح + قارئ شاشة) ضروري.

## الفحص بقارئ الشاشة

قارئ الشاشة المُستخدم للاختبار: **NVDA (Windows)** أو **VoiceOver (Mac)**.

السيناريو الأساسي للاختبار:
1. تصفح الصفحة الرئيسية كاملاً بقارئ الشاشة فقط.
2. يجب أن تُفهَم البنية دون رؤية.
3. يجب الوصول إلى قسم المشاريع وقراءة مشروع كامل.
4. يجب الوصول لآلية التواصل والتفاعل معها.

هذا الفحص مرة واحدة قبل الإطلاق، ثم عند كل تغيير هيكلي.

## القيود التي يجب مراعاتها
- Lighthouse score 95+ ليس ضماناً للامتثال الكامل — الفحص اليدوي ضروري
- تغيير أي مكوّن تفاعلي يستلزم إعادة فحص بنوده في القائمة

## التأثير على التطبيق
هذه القائمة تُشغَّل كجزء من `lighthouse-validation-process.md` قبل كل نشر.
أي بند غير محقق يوقف النشر.

## وثائق مرتبطة
- `html-structure-guidelines.md` (← `03-technical/`) — التنفيذ الذي تفحصه هذه القائمة
- `performance-budget.md` — سقف Accessibility ≥ 95
- `lighthouse-validation-process.md` — عملية التحقق الشاملة

## الملف التالي
`lighthouse-validation-process.md`

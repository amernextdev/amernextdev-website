# launch-checklist.md

## الهدف
قائمة فحص شاملة وترتيبية لإطلاق الموقع — من التحقق التقني إلى النشر الفعلي.
لا نشر بدون اجتياز هذه القائمة كاملة.

## المشمول
- فحوصات ما قبل النشر (تقنية، محتوى، أداء)
- خطوات النشر بالترتيب
- التحقق بعد النشر
- خطة التراجع (Rollback)

## غير المشمول
- عملية Lighthouse التفصيلية (→ `lighthouse-validation-process.md`)
- قائمة فحص إمكانية الوصول التفصيلية (→ `accessibility-checklist.md`)
- بروتوكول التغييرات بعد الإطلاق (→ `change-request-protocol.md`)

---

## المرحلة أ — فحوصات الكود والبنية

### HTML
```
[ ] كل صفحة تجتاز W3C HTML Validator بدون errors
[ ] H1 واحد في كل صفحة
[ ] جميع الصور لها width وheight صريحَين
[ ] جميع الصور لها alt مناسب
[ ] رابط skip-to-content موجود وفعّال
[ ] جميع الروابط الداخلية تعمل (لا 404)
[ ] جميع الروابط الخارجية تعمل وتفتح في tab جديد
```

### CSS
```
[ ] لا قيم hex أو px مُشفَّرة خارج tokens.css
[ ] لا !important في أي ملف
[ ] لا CSS غير مستخدم (فحص بـ Coverage في DevTools)
[ ] الملف المجمَّع حجمه < 50KB
[ ] جميع الـ media queries تعمل على 375px، 768px، 1280px
```

### JavaScript
```
[ ] لا console.log أو console.error في الإنتاج
[ ] لا JavaScript errors في Chrome DevTools Console
[ ] جميع الـ fetch calls تعالج حالة الخطأ
[ ] الملف المجمَّع حجمه < 50KB
[ ] لا script يعيق العرض
```

### البيانات
```
[ ] portfolio.json يتبع schema من json-content-schema.md
[ ] profile.json يتبع schema
[ ] config.json مُحدَّث بـ URL الإنتاج الصحيح
[ ] جميع الـ case_study_url صالحة أو null
[ ] لا حقول فارغة تظهر في الواجهة
```

---

## المرحلة ب — فحوصات المحتوى والتموضع

```
[ ] بيان التموضع يطابق identity-translation-layer.md
[ ] لا صفات تفضيل عليا في أي نص
[ ] لا علامات تعجب في أي موضع
[ ] لا أسعار أو إشارات توافر في أي موضع
[ ] المشاريع المعروضة تتبع إطار: مشكلة ← قرار ← نتيجة
[ ] آلية التواصل لا تُوحي بالاستعداد الفوري
[ ] لا صور stock في أي موضع
[ ] كل صورة محتوى ذات صلة مباشرة وعالية الجودة
```

---

## المرحلة ج — فحوصات الأداء وإمكانية الوصول

```
[ ] Lighthouse Performance ≥ 90 (Mobile)
[ ] Lighthouse Accessibility ≥ 95
[ ] Lighthouse Best Practices ≥ 90
[ ] Lighthouse SEO ≥ 95
[ ] LCP < 2.5s
[ ] CLS < 0.1
[ ] التنقل بلوحة المفاتيح يعمل على كل الصفحات
[ ] تباين الألوان يستوفي 4.5:1 للنص الأساسي
[ ] التقرير محفوظ في reports/ (→ lighthouse-validation-process.md)
```

---

## المرحلة د — فحوصات SEO والبنية التحتية

```
[ ] كل صفحة لها title فريد
[ ] كل صفحة لها meta description فريدة
[ ] كل صفحة لها canonical URL
[ ] Open Graph tags مكتملة
[ ] Twitter Card tags مكتملة
[ ] JSON-LD (Person + WebSite) موجود في الصفحة الرئيسية
[ ] sitemap.xml موجود ويتضمن جميع الصفحات
[ ] robots.txt موجود
[ ] HTTPS مُفعَّل
[ ] www → non-www redirect (أو العكس) يعمل
[ ] favicon موجود (.ico + .png)
```

---

## المرحلة هـ — النشر

```bash
# 1. بناء نسخة الإنتاج
npm run build  # أو build script مخصص

# 2. فحص الملفات المُنتَجة
ls -la dist/
# تأكد من وجود: index.html, css/main.min.css, js/main.min.js

# 3. اختبار محلي على نسخة الإنتاج
npx serve dist/ -p 3000
# تصفح كامل + تشغيل Lighthouse

# 4. النشر على Staging
# (حسب إعداد Netlify/Vercel)
git push origin staging

# 5. تشغيل Lighthouse على Staging URL
lighthouse https://staging.amer.dev

# 6. اجتياز جميع الفحوصات → النشر على main
git push origin main
# أو merge PR من staging → main
```

---

## المرحلة و — التحقق بعد النشر

```
[ ] الموقع يفتح على URL الإنتاج
[ ] HTTPS يعمل وشهادة SSL صالحة
[ ] Lighthouse على URL الإنتاج يتطابق مع Staging (±5 نقاط)
[ ] Google Search Console: إضافة الموقع وطلب الفهرسة
[ ] robots.txt قابل للوصول: https://amer.dev/robots.txt
[ ] sitemap.xml قابل للوصول: https://amer.dev/sitemap.xml
[ ] اختبار Open Graph: https://developers.facebook.com/tools/debug/
[ ] اختبار Twitter Card: https://cards-dev.twitter.com/validator
[ ] Schema Markup: https://validator.schema.org/
```

---

## خطة التراجع (Rollback)

إذا اكتُشف خطأ حرج بعد النشر:

```bash
# Netlify/Vercel — التراجع للنشر السابق من لوحة التحكم
# أو عبر CLI:

# Netlify
netlify rollback

# Vercel
vercel rollback [deployment-url]

# أو git revert إذا كان الخطأ في الكود
git revert HEAD
git push origin main
```

**ما يُعدّ خطأ حرجاً يستلزم rollback فوري:**
- الصفحة لا تُحمَّل
- JavaScript error يمنع التفاعل
- محتوى خاطئ يضر بالتموضع (أسعار، CTA خاطئ)
- بيانات شخصية غير مقصودة ظهرت

**ما لا يستلزم rollback (يُصلح بنشر جديد):**
- خطأ تنسيق بسيط
- رابط خارجي معطل
- صورة لا تُحمَّل

## القيود التي يجب مراعاتها
- هذه القائمة للإطلاق الأول فقط. للتحديثات اللاحقة: `change-request-protocol.md`
- لا اختصار مراحل "لأن التغيير بسيط" — كل نشر يمر بالمراحل أ-ج كحد أدنى

## التأثير على التطبيق
هذه القائمة هي نقطة التقاء كل الوثائق — كل بند يرجع لوثيقة مسؤولة عن تفاصيله.

## وثائق مرتبطة
- `lighthouse-validation-process.md` (← `04-quality/`) — المرحلة ج بالتفصيل
- `accessibility-checklist.md` (← `04-quality/`) — جزء من المرحلة ج
- `seo-architecture.md` (← `04-quality/`) — المرحلة د
- `change-request-protocol.md` — التحديثات بعد الإطلاق

## الملف التالي
`change-request-protocol.md`

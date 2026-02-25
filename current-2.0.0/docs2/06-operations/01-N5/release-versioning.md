# release-versioning.md

## الهدف
تحديد نظام إصدارات المشروع — كيف تُرقَّم الإصدارات، متى تُوسَم، وكيف يُوثَّق كل إصدار.

## المشمول
- نظام ترقيم الإصدارات (Semantic Versioning)
- متى يتغير كل رقم
- قالب Changelog
- عملية وسم الإصدار في Git

## غير المشمول
- عملية النشر التقنية (→ `launch-checklist.md`)
- بروتوكول طلبات التغيير (→ `change-request-protocol.md`)
- سير عمل Git (→ `git-workflow.md`)

## نظام الترقيم

```
MAJOR . MINOR . PATCH
  1   .   2   .   3
```

| الرقم | متى يتغير | مثال |
|------|---------|------|
| MAJOR | إكمال مرحلة تطور كاملة (1→2→3) | `2.0.0` — الانتقال لـ TypeScript |
| MINOR | إضافة وحدة أو ميزة كاملة | `1.1.0` — إضافة صفحة مشاريع |
| PATCH | إصلاح خطأ أو تحديث محتوى | `1.0.1` — إصلاح bug في navigation |

### الإصدارات المُخطَّطة

| الإصدار | المرحلة | الوصف |
|---------|---------|-------|
| `1.0.0` | المرحلة 1 | الإطلاق الأول — موقع ثابت كامل |
| `2.0.0` | المرحلة 2 | الانتقال لـ TypeScript |
| `3.0.0` | المرحلة 3 | الانتقال لـ React + Next.js |
| `4.0.0` | المرحلة 4 | API Layer |
| `5.0.0` | المرحلة 5 | Client Portal |

## متى يُوسَم الإصدار

**يُوسَم دائماً:**
- إكمال مرحلة تطور
- إضافة صفحة أو قسم رئيسي
- تغيير استراتيجي في التموضع أو المحتوى

**لا يُوسَم (PATCH فقط عبر commit):**
- إصلاح bug صغير
- تحديث محتوى JSON
- تعديل تنسيق CSS بسيط

## عملية وسم الإصدار

```bash
# 1. التأكد من نظافة main
git checkout main
git pull origin main
git status  # يجب أن يكون clean

# 2. إنشاء الوسم
git tag -a v1.0.0 -m "Phase 1 complete: Static site launch

- Hero, About, Portfolio, Contact, Footer sections
- JSON data layer
- Lighthouse scores: Performance 95, Accessibility 100, SEO 100
- Full accessibility compliance WCAG 2.1 AA"

# 3. رفع الوسم
git push origin v1.0.0

# 4. رفع جميع الوسوم
git push origin --tags
```

## قالب Changelog

يُحفظ في `CHANGELOG.md` في جذر المشروع:

```markdown
# Changelog

## [1.1.0] — 2026-03-15

### Added
- صفحة مشاريع مستقلة مع تفاصيل كل مشروع
- Intersection Observer لـ lazy loading الصور

### Changed
- تحديث بيانات مشروع inventory-system في portfolio.json
- تحسين LCP من 2.1s إلى 1.6s

### Fixed
- إصلاح focus trap في mobile navigation

---

## [1.0.1] — 2026-02-01

### Fixed
- إصلاح CLS على صفحة الهاتف (أبعاد صورة مفقودة)

---

## [1.0.0] — 2026-01-15

### Initial Release
- موقع ثابت كامل مع 6 وحدات UI
- Design tokens كاملة
- Lighthouse: Performance 95, Accessibility 100, SEO 100
- WCAG 2.1 AA compliance
```

### أقسام الـ Changelog
| القسم | متى يُستخدم |
|------|------------|
| `Added` | ميزة أو محتوى جديد |
| `Changed` | تعديل على شيء موجود |
| `Fixed` | إصلاح خطأ |
| `Removed` | حذف شيء |
| `Security` | إصلاح ثغرة أمنية |
| `Performance` | تحسين أداء موثَّق بأرقام |

## الرقم السريع للإصدار الحالي

يُضاف في `config.json`:
```json
{
  "site": {
    "version": "1.0.0"
  }
}
```

ويُعرض في HTML كـ meta tag (للمراجعة، لا للزوار):
```html
<meta name="version" content="1.0.0">
```

## القيود التي يجب مراعاتها
- CHANGELOG يُكتَب بعد الإصدار، لا قبله
- لا تغيير في رقم إصدار موجود بعد نشره — أي تصحيح هو إصدار PATCH جديد
- الإصدارات تتبع `main` فقط — لا وسوم على فروع feature

## التأثير على التطبيق
سجل الإصدارات يُتيح تتبع تطور المنظومة عبر الزمن.
عند أي سؤال "متى أُضيف كذا؟" — الإجابة في CHANGELOG.

## وثائق مرتبطة
- `git-workflow.md` (← `03-technical/`) — نمط commit messages المرتبط بالإصدارات
- `change-request-protocol.md` — ما يُنتج إصداراً وما لا يُنتجه
- `evolution-matrix.md` (← `05-evolution/`) — الإصدارات MAJOR مرتبطة بالمراحل

## الملف التالي
`content-governance.md`

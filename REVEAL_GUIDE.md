# Reveal Animation — دليل التطبيق على كل Section

## الخطوة الأولى: استيراد الملفات

في `variables.css` import بالفعل موجود، بس لازم تضيف `reveal.css`:

```css
/* في style.css — قسم Imports */
@import '/src/services/css/reveal.css';   /* ← أضف ده */
```

وفي `main.js` (أو نهاية الـ HTML قبل `</body>`):

```html
<script type="module" src="/src/services/js/reveal.js"></script>
```

---

## Hero Section

```html
<!-- Eyebrow badge → scale-up صغير وسريع -->
<p class="hero__eyebrow"
   data-reveal="scale-up"
   data-duration="fast">
  Available for work
</p>

<!-- Headline → fade-up الأبطأ لأنه الأهم -->
<h1 class="hero__headline"
    data-reveal="fade-up"
    data-delay="1">
  …
</h1>

<!-- Description → fade-up بعد الـ headline -->
<p class="hero__description"
   data-reveal="fade-up"
   data-delay="2">
  …
</p>

<!-- CTA group → fade-up آخر حاجة تظهر -->
<div class="hero__cta-group"
     data-reveal="fade-up"
     data-delay="3">
  …
</div>

<!-- Terminal (desktop) → slide-right من اليمين -->
<div class="hero-terminal"
     data-reveal="slide-right"
     data-delay="2"
     data-duration="slow">
  …
</div>
```

---

## Work Section (Projects Grid)

```html
<!-- Section header → fade-up -->
<div class="section-header" data-reveal="fade-up">
  <span class="section-header__label">…</span>
  <h2 class="section-header__title">…</h2>
  <p class="section-header__description">…</p>
</div>

<!-- Projects grid → stagger (الـ cards بتدخل واحدة بعد واحدة) -->
<div class="projects-grid" data-stagger>
  <article class="project-card" data-reveal="fade-up">…</article>
  <article class="project-card" data-reveal="fade-up">…</article>
  <article class="project-card" data-reveal="fade-up">…</article>
</div>

<!-- Footer CTA → fade-up -->
<div class="work-section__footer" data-reveal="fade-up">…</div>
```

---

## Services Section

```html
<!-- Section header → fade-up -->
<div class="section-header" data-reveal="fade-up">…</div>

<!-- Desktop: list panel → slide-left -->
<div class="services-section__list-panel"
     data-reveal="slide-left">
  …
</div>

<!-- Desktop: detail panels → slide-right -->
<div class="service-detail-panel"
     data-reveal="slide-right">
  …
</div>

<!-- Mobile tabs nav → fade-up -->
<div class="services-section__tabs-nav-wrapper"
     data-reveal="fade-up">
  …
</div>

<!-- Mobile tab panels → fade-up -->
<div class="tab-panels" data-reveal="fade-up" data-delay="1">…</div>
```

---

## About Section

```html
<!-- Section header → fade-up -->
<div class="section-header" data-reveal="fade-up">…</div>

<!-- Typewriter block → stagger (كل سطر بيظهر لوحده) -->
<div class="about-section__typewriter-block" data-stagger>
  <blockquote class="typewriter-line" data-reveal="fade-up">…</blockquote>
  <blockquote class="typewriter-line" data-reveal="fade-up">…</blockquote>
  <blockquote class="typewriter-line" data-reveal="fade-up">…</blockquote>
</div>

<!-- Skills panel → slide-right -->
<div class="about-section__skills"
     data-reveal="slide-right"
     data-duration="slow">

  <!-- Tags داخل كل group → stagger -->
  <div class="skills-group__tags" data-stagger>
    <span class="skill-tag" data-reveal="scale-up">…</span>
    <span class="skill-tag" data-reveal="scale-up">…</span>
    …
  </div>
</div>
```

---

## Contact Section

```html
<!-- Eyebrow → scale-up -->
<p class="contact-section__eyebrow"
   data-reveal="scale-up"
   data-duration="fast">…</p>

<!-- Section header → fade-up -->
<div class="section-header" data-reveal="fade-up" data-delay="1">…</div>

<!-- Form → fade-up -->
<form class="contact-section__form"
      data-reveal="fade-up"
      data-delay="2"
      data-duration="slow">
  …
</form>

<!-- Direct buttons → stagger -->
<div class="contact-section__direct-buttons" data-stagger>
  <a class="btn-outline" data-reveal="fade-up">…</a>
  <a class="btn-outline" data-reveal="fade-up">…</a>
</div>

<!-- Availability chips → stagger -->
<div class="contact-section__availability-chips" data-stagger>
  <span class="contact-section__chip" data-reveal="scale-up">…</span>
  <span class="contact-section__chip" data-reveal="scale-up">…</span>
</div>
```

---

## Footer

```html
<!-- Logo → fade-up -->
<div class="site-footer__logo-wrapper" data-reveal="fade-up">…</div>

<!-- Social links → stagger -->
<div class="site-footer__social-links" data-stagger>
  <a class="social-link" data-reveal="scale-up">…</a>
  <a class="social-link" data-reveal="scale-up">…</a>
  <a class="social-link" data-reveal="scale-up">…</a>
</div>

<!-- Meta info → fade-up -->
<div class="site-footer__meta" data-reveal="fade-up" data-delay="2">…</div>
```

---

## ملاحظات مهمة

### RTL
الـ `slide-left` و `slide-right` بيتعكسوا تلقائياً لما `dir="rtl"` على الـ `<html>` — مش محتاج تعمل حاجة إضافية.

### Hero خاص
Hero بيظهر عند الـ Page Load مش الـ Scroll، عشان كده الـ JS بيكشفه بعد 80ms تلقائياً لو كان في الـ viewport.

### Performance
- `will-change: opacity, transform` على كل عنصر مخفي — GPU acceleration
- `unobserve()` بعد الـ reveal — مفيش observer running بعد ما العنصر اتعرض

### Variants المتاحة
| data-reveal | الاستخدام المثالي |
|---|---|
| `fade-up` | Headers, paragraphs, wide blocks |
| `fade-in` | Backgrounds, full-width elements |
| `slide-left` | Left-column content, list panels |
| `slide-right` | Right-column content, terminals, skill panels |
| `scale-up` | Icons, badges, chips, small UI elements |

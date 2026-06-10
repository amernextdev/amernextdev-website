/* ============================================================
   scroll-reveal.js  —  AmerDev UI Library
   Drop in any project. Zero dependencies. Zero configuration.
   Just import and it works.
   ============================================================ */

(function () {
    'use strict';

    // ── Config ────────────────────────────────────────────────
    const CONFIG = {
        selector  : '[data-reveal]',   // العناصر المراقَبة
        activeClass: 'is-visible',     // الـ class اللي بيتضاف
        threshold  : 0.12,             // 12% من العنصر يظهر قبل ما يتشغل
        rootMargin : '0px 0px -60px 0px', // يبدأ شوية قبل ما يوصل للـ viewport
    };

    // ── Skip if browser doesn't support IntersectionObserver ──
    if (!('IntersectionObserver' in window)) {
        // Fallback: اظهر كل حاجة فوراً
        document.querySelectorAll(CONFIG.selector)
            .forEach(el => el.classList.add(CONFIG.activeClass));
        return;
    }

    // ── Observer ──────────────────────────────────────────────
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add(CONFIG.activeClass);

            // بعد ما العنصر اتشاف، مش محتاجين نراقبه تاني
            observer.unobserve(entry.target);
        });
    }, {
        threshold : CONFIG.threshold,
        rootMargin: CONFIG.rootMargin,
    });

    // ── Init ──────────────────────────────────────────────────
    function init() {
        const elements = document.querySelectorAll(CONFIG.selector);

        elements.forEach(el => {
            // لو العنصر فعلاً ظاهر في الصفحة من الأول (above the fold)
            // اظهره فوراً من غير delay
            const rect = el.getBoundingClientRect();
            const isAboveFold = rect.top < window.innerHeight && rect.bottom > 0;

            if (isAboveFold) {
                // تأخير بسيط عشان الـ CSS transition يكون جاهز
                requestAnimationFrame(() => {
                    el.classList.add(CONFIG.activeClass);
                });
            } else {
                observer.observe(el);
            }
        });
    }

    // ── Run after DOM is ready ─────────────────────────────────
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ── Public API (اختياري — لو عايز تضيف elements ديناميكياً) ──
    window.ScrollReveal = {
        // لو عندك elements بتتضاف بعدين (مثلاً من fetch أو dynamic content)
        observe(elements) {
            const els = elements instanceof NodeList
                ? elements
                : document.querySelectorAll(elements);
            els.forEach(el => observer.observe(el));
        },
        // إظهار عنصر فوراً من غير animation
        show(elements) {
            const els = elements instanceof NodeList
                ? elements
                : document.querySelectorAll(elements);
            els.forEach(el => {
                observer.unobserve(el);
                el.classList.add(CONFIG.activeClass);
            });
        },
    };

}());

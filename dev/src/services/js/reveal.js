/**
 * @file reveal.js
 * @description Scroll-triggered entrance animations via IntersectionObserver.
 *
 * HOW IT WORKS
 * ─────────────
 * 1. On load, scans for [data-reveal] elements and [data-stagger] parents.
 * 2. IntersectionObserver watches each element.
 * 3. When an element enters the viewport (threshold met), JS appends
 *    "visible" to its [data-reveal] attribute → CSS transition fires.
 * 4. Stagger parents calculate per-child delays before observing.
 * 5. Once visible, the element is unobserved (animate once).
 *
 * USAGE IN HTML
 * ─────────────
 * Single element:
 *   <h2 data-reveal="fade-up">Title</h2>
 *   <div data-reveal="scale-up" data-delay="2">Badge</div>
 *
 * Stagger group (parent triggers, children animate in sequence):
 *   <ul data-stagger data-reveal-children="fade-up">
 *     <li data-reveal="fade-up">…</li>
 *     <li data-reveal="fade-up">…</li>
 *   </ul>
 *
 * Available variants: fade-up | fade-in | slide-left | slide-right | scale-up
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     CONFIG
  ───────────────────────────────────────────── */
  const CONFIG = {
    // % of element visible before triggering
    threshold: 0.12,

    // Extra top margin — negative pulls trigger point UP so
    // elements reveal slightly before they fully enter viewport
    rootMargin: '0px 0px -48px 0px',

    // Base delay between stagger children (seconds)
    staggerStep: 0.10,

    // Max stagger delay cap (so long lists don't feel broken)
    staggerMax: 0.55,

    // Attribute name JS watches
    attr: 'data-reveal',
  };


  /* ─────────────────────────────────────────────
     HELPERS
  ───────────────────────────────────────────── */

  /** Mark element as visible — append "visible" to its data-reveal value */
  function reveal(el) {
    const current = el.getAttribute(CONFIG.attr) || '';
    if (current.includes('visible')) return; // already done
    el.setAttribute(CONFIG.attr, current.trim() + ' visible');
  }

  /** Detect if user prefers reduced motion */
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }


  /* ─────────────────────────────────────────────
     STAGGER SETUP
     Must run before observer so delays are set
  ───────────────────────────────────────────── */

  function setupStagger(parent) {
    const children = Array.from(parent.querySelectorAll('[data-reveal]'));
    if (!children.length) return;

    children.forEach((child, i) => {
      const delay = Math.min(i * CONFIG.staggerStep, CONFIG.staggerMax);
      child.style.setProperty('--reveal-delay', `${delay}s`);
    });
  }


  /* ─────────────────────────────────────────────
     OBSERVER
  ───────────────────────────────────────────── */

  function createObserver() {
    return new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          observer.unobserve(entry.target); // animate once
        });
      },
      {
        threshold: CONFIG.threshold,
        rootMargin: CONFIG.rootMargin,
      }
    );
  }


  /* ─────────────────────────────────────────────
     INIT
  ───────────────────────────────────────────── */

  function init() {
    // If reduced motion → reveal everything immediately, skip observer
    if (prefersReducedMotion()) {
      document.querySelectorAll(`[${CONFIG.attr}]`).forEach(reveal);
      return;
    }

    const observer = createObserver();

    // 1. Setup stagger parents first (sets --reveal-delay on children)
    document.querySelectorAll('[data-stagger]').forEach(setupStagger);

    // 2. Observe all [data-reveal] elements
    document.querySelectorAll(`[${CONFIG.attr}]`).forEach((el) => {
      // Skip if already visible (e.g. above the fold on load)
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;

      if (inView) {
        // Elements already in viewport on load → reveal with slight delay
        // so page paint settles first (avoids flash)
        setTimeout(() => reveal(el), 80);
      } else {
        observer.observe(el);
      }
    });
  }


  /* ─────────────────────────────────────────────
     BOOT
  ───────────────────────────────────────────── */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
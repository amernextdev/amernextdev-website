/* ═══════════════════════════════════════════════════
   about.js
   1. Staggered fade-up — paragraphs on scroll (IntersectionObserver)
   2. Staggered reveal  — skill tags on scroll
═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────
     CONFIG
  ───────────────────────────────────────────────── */
  const CONFIG = {
    paragraphs: {
      stagger:    120,   // ms between each paragraph
      duration:   550,   // ms fade-up transition
      easing:     'cubic-bezier(0.22, 1, 0.36, 1)',
      rootMargin: '0px 0px -40px 0px',
    },
    skills: {
      stagger:    65,    // ms between each tag
      duration:   400,   // ms fade-up transition
      easing:     'cubic-bezier(0.22, 1, 0.36, 1)',
      rootMargin: '0px 0px -60px 0px',
    },
  };

  /* ═══════════════════════════════════════════════
     1. PARAGRAPHS — staggered fade-up
  ═══════════════════════════════════════════════ */

  function initParagraphs() {
    const paragraphs = ['p1', 'p2', 'p3']
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!paragraphs.length) return;

    /* Lock hidden state immediately — override any CSS */
    paragraphs.forEach((el) => {
      el.style.opacity   = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = `
        opacity   ${CONFIG.paragraphs.duration}ms ${CONFIG.paragraphs.easing},
        transform ${CONFIG.paragraphs.duration}ms ${CONFIG.paragraphs.easing}
      `;
      el.style.animation = 'none';
    });

    /* Reveal function — staggers all three */
    function revealParagraphs() {
      paragraphs.forEach((el, i) => {
        setTimeout(() => {
          el.style.opacity   = '1';
          el.style.transform = 'translateY(0)';
        }, i * CONFIG.paragraphs.stagger);
      });
    }

    /* Observe the first paragraph — when it enters, reveal all */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealParagraphs();
            observer.disconnect();
          }
        });
      },
      { rootMargin: CONFIG.paragraphs.rootMargin }
    );

    observer.observe(paragraphs[0]);
  }

  /* ═══════════════════════════════════════════════
     2. SKILL TAGS — staggered reveal on scroll
  ═══════════════════════════════════════════════ */

  function initSkillTags() {
    const panel = document.getElementById('skills-panel');
    if (!panel) return;

    const tags = Array.from(panel.querySelectorAll('.skill-tag'))
      .sort((a, b) => {
        return (parseInt(a.dataset.order || '0', 10))
             - (parseInt(b.dataset.order || '0', 10));
      });

    if (!tags.length) return;

    /* Lock hidden state — override CSS animation */
    tags.forEach((tag) => {
      tag.style.opacity   = '0';
      tag.style.transform = 'translateY(8px)';
      tag.style.animation = 'none';
      tag.style.transition = `
        opacity           ${CONFIG.skills.duration}ms ${CONFIG.skills.easing},
        transform         ${CONFIG.skills.duration}ms ${CONFIG.skills.easing},
        color             150ms ease,
        background-color  150ms ease,
        border-color      150ms ease
      `;
    });

    function revealTags() {
      tags.forEach((tag, i) => {
        setTimeout(() => {
          tag.style.opacity   = '1';
          tag.style.transform = 'translateY(0)';
        }, i * CONFIG.skills.stagger);
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealTags();
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: CONFIG.skills.rootMargin }
    );

    observer.observe(panel);
  }

  /* ═══════════════════════════════════════════════
     INIT
  ═══════════════════════════════════════════════ */

  function init() {
    initParagraphs();
    initSkillTags();
  }

  /* Run as early as possible — don't wait for DOMContentLoaded
     if the script is deferred or placed before </body>          */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
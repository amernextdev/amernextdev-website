/* ═══════════════════════════════════════════════════
   services.js
   Services Section — Interactive Logic
   Desktop: list → detail panel switch
   Mobile:  tabs → panel switch + dots
═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ──────────────────────────────────────────────
     DATA — محتوى كل خدمة
     بيتحمّل هنا عشان JS يتحكم في الـ detail panel
     على الـ desktop بدون reload
  ──────────────────────────────────────────────── */
  const SERVICES = [
    {
      icon: `<svg class="icon icon--building" aria-hidden="true"><use href="/sprites/solid.svg#building"></use></svg>`,
      name: 'Business Website',
      nameKey: 'services.item1.name',
      description: 'Your website is often the first thing a client sees. It needs to be fast, clear, and work on every device.',
      descKey: 'services.item1.description',
      includesKey: [
        'services.item1.include1',
        'services.item1.include2',
        'services.item1.include3',
        'services.item1.include4',
        'services.item1.include5',
      ],
      includes: [
        'Responsive design for all devices',
        'SEO-ready structure',
        'Fast load times',
        'Contact form integration',
        'CMS setup (optional)',
      ],
      tags: ['HTML/CSS', 'React', 'CMS'],
    },
    {
      icon: `<svg class="icon icon--rocket" aria-hidden="true"><use href="/sprites/solid.svg#rocket"></use></svg>`,
      name: 'Landing Page',
      nameKey: 'services.item2.name',
      description: 'One page, one goal — built to turn visitors into customers.',
      descKey: 'services.item2.description',
      includesKey: [
        'services.item2.include1',
        'services.item2.include2',
        'services.item2.include3',
        'services.item2.include4',
        'services.item2.include5',
      ],
      includes: [
        'Custom animations & interactions',
        'Conversion-focused layout',
        'A/B test ready structure',
        'Analytics integration',
        'Mobile-first design',
      ],
      tags: ['React', 'GSAP', 'Analytics'],
    },
    {
      icon: `<svg class="icon icon--display" aria-hidden="true"><use href="/sprites/solid.svg#display"></use></svg>`,
      name: 'Web Application',
      nameKey: 'services.item3.name',
      description: 'Complex needs, clean solutions. Web apps built to scale and easy to maintain.',
      descKey: 'services.item3.description',
      includesKey: [
        'services.item3.include1',
        'services.item3.include2',
        'services.item3.include3',
        'services.item3.include4',
        'services.item3.include5',
      ],
      includes: [
        'Authentication & authorization',
        'REST / GraphQL API integration',
        'State management',
        'Database design',
        'Deployment & CI/CD',
      ],
      tags: ['React', 'Node.js', 'PostgreSQL'],
    },
    {
      icon: `<svg class="icon icon--palette" aria-hidden="true"><use href="/sprites/solid.svg#palette"></use></svg>`,
      name: 'Frontend UI',
      nameKey: 'services.item4.name',
      description: 'A precise interface built from your design or from scratch — clean, compatible, and fast.',
      descKey: 'services.item4.description',
      includesKey: [
        'services.item4.include1',
        'services.item4.include2',
        'services.item4.include3',
        'services.item4.include4',
        'services.item4.include5',
      ],
      includes: [
        'Component-based architecture',
        'Design system implementation',
        'Cross-browser compatibility',
        'Figma to code',
        'Performance optimization',
      ],
      tags: ['React', 'TypeScript', 'Figma'],
    },
    {
      icon: `<svg class="icon icon--wrench" aria-hidden="true"><use href="/sprites/solid.svg#wrench"></use></svg>`,
      name: 'Website Maintenance',
      nameKey: 'services.item5.name',
      description: 'Your existing site fixed, updated, or improved — without breaking what already works.',
      descKey: 'services.item5.description',
      includesKey: [
        'services.item5.include1',
        'services.item5.include2',
        'services.item5.include3',
        'services.item5.include4',
        'services.item5.include5',
      ],
      includes: [
        'Bug fixing & debugging',
        'Performance improvements',
        'Content updates',
        'Security patches',
        'Feature additions',
      ],
      tags: ['Debugging', 'Optimization', 'Updates'],
    },
  ];

  /* ──────────────────────────────────────────────
     DESKTOP — List ↔ Detail Panel
  ──────────────────────────────────────────────── */

  function initDesktop() {
    const list        = document.getElementById('svc-list');
    const detailTop   = document.getElementById('svc-detail-content');
    const iconEl      = document.getElementById('svc-icon');
    const nameEl      = document.getElementById('svc-name');
    const descEl      = document.getElementById('svc-desc');
    const includesEl  = document.getElementById('svc-includes');
    const tagsEl      = document.getElementById('svc-tags');

    if (!list || !detailTop) return;

    const items = list.querySelectorAll('.service-list-item');

    let activeIndex = 0;
    let animating   = false;

    function activateItem(index) {
      if (index === activeIndex || animating) return;
      animating = true;

      /* Remove active class from old item */
      items[activeIndex].classList.remove('service-list-item--active');

      /* Animate detail panel out */
      detailTop.classList.add('is-animating');

      setTimeout(function () {
        activeIndex = index;

        /* Update detail panel content */
        const svc = SERVICES[index];

        iconEl.innerHTML     = svc.icon;
        nameEl.textContent   = svc.name;
        if (nameEl.dataset.i18nText) nameEl.dataset.i18nText = svc.nameKey;

        descEl.textContent   = svc.description;
        if (descEl.dataset.i18nText) descEl.dataset.i18nText = svc.descKey;

        /* Rebuild includes list */
        includesEl.innerHTML = svc.includes
          .map(function (item, i) {
            return '<li data-i18n-text="' + svc.includesKey[i] + '">' + item + '</li>';
          })
          .join('');

        /* Rebuild tags */
        tagsEl.innerHTML = svc.tags
          .map(function (tag) {
            return '<span class="service-detail-panel__tag">' + tag + '</span>';
          })
          .join('');

        /* Animate detail panel back in */
        detailTop.classList.remove('is-animating');
        animating = false;

        /* Set new item active */
        items[activeIndex].classList.add('service-list-item--active');

        /* Re-run i18n if available */
        if (window.__i18n && typeof window.__i18n.applyTranslations === 'function') {
          window.__i18n.applyTranslations();
        }

      }, 200); /* match --transition-base: 250ms, slightly shorter for snappiness */
    }

    items.forEach(function (item, index) {
      item.addEventListener('click', function () {
        activateItem(index);
      });

      /* Keyboard accessibility */
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activateItem(index);
        }
        /* Arrow keys navigation */
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const next = (index + 1) % items.length;
          items[next].focus();
          activateItem(next);
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = (index - 1 + items.length) % items.length;
          items[prev].focus();
          activateItem(prev);
        }
      });
    });
  }

  /* ──────────────────────────────────────────────
     MOBILE — Tabs ↔ Panels + Dots
  ──────────────────────────────────────────────── */

  function initMobile() {
    const tabsNav   = document.getElementById('tabs-nav');
    const tabDots   = document.getElementById('tab-dots');
    const tabPanels = document.getElementById('tab-panels');

    if (!tabsNav || !tabPanels) return;

    const buttons = tabsNav.querySelectorAll('.tab-button');
    const panels  = tabPanels.querySelectorAll('.tab-panel');
    const dots    = tabDots ? tabDots.querySelectorAll('.tab-dot') : [];

    let activeTab = 0;

    function activateTab(index) {
      if (index === activeTab) return;

      /* Deactivate current */
      buttons[activeTab].classList.remove('tab-button--active');
      panels[activeTab].classList.remove('tab-panel--active');
      if (dots[activeTab]) dots[activeTab].classList.remove('tab-dot--active');

      /* Activate new */
      activeTab = index;
      buttons[activeTab].classList.add('tab-button--active');
      panels[activeTab].classList.add('tab-panel--active');
      if (dots[activeTab]) dots[activeTab].classList.add('tab-dot--active');

      /* Scroll tab button into view */
      buttons[activeTab].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    buttons.forEach(function (btn, index) {
      btn.addEventListener('click', function () {
        activateTab(index);
      });
    });

    /* Optional: swipe support on tab-panels */
    let touchStartX = 0;
    let touchEndX   = 0;

    tabPanels.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    tabPanels.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          /* Swiped left → next tab */
          activateTab(Math.min(activeTab + 1, buttons.length - 1));
        } else {
          /* Swiped right → prev tab */
          activateTab(Math.max(activeTab - 1, 0));
        }
      }
    }, { passive: true });
  }

  /* ──────────────────────────────────────────────
     SCROLL REVEAL — mirrors hero/about pattern
     uses data-reveal on the section itself
  ──────────────────────────────────────────────── */

  function initReveal() {
    const section = document.querySelector('.services-section[data-reveal]');
    if (!section) return;

    if (!('IntersectionObserver' in window)) {
      section.style.opacity = '1';
      section.style.transform = 'none';
      return;
    }

    /* Initial hidden state */
    section.style.opacity    = '0';
    section.style.transform  = 'translateY(24px)';
    section.style.transition = 'opacity var(--transition-slower), transform var(--transition-slower)';

    const delay = parseInt(section.dataset.revealDelay || '0', 10);

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setTimeout(function () {
            section.style.opacity   = '1';
            section.style.transform = 'none';
          }, delay);
          observer.unobserve(section);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(section);
  }

  /* ──────────────────────────────────────────────
     INIT
  ──────────────────────────────────────────────── */

  function init() {
    initDesktop();
    initMobile();
    initReveal();
  }

  /* Run after DOM is ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
/*
 * services.js
 * Clone of services-final.html behavior applied to services.html
 * No dependencies — vanilla JS only
 */

document.addEventListener('DOMContentLoaded', function () {

  /* ════════════════════════════════════════
     SERVICE DATA
     Matches content in services.html exactly.
     Icons are SVG sprite references (same as services.html markup).
  ════════════════════════════════════════ */
  const services = [
    {
      iconHtml: '<svg class="icon icon--building" aria-hidden="true"><use href="/sprites/solid.svg#building"></use></svg>',
      name:     'Business Website',
      desc:     'Your website is often the first thing a client sees. It needs to be fast, clear, and work on every device.',
      includes: [
        'Responsive design for all devices',
        'SEO-ready structure',
        'Fast load times',
        'Contact form integration',
        'CMS setup (optional)'
      ],
      tags: ['HTML/CSS', 'React', 'CMS']
    },
    {
      iconHtml: '<svg class="icon icon--rocket" aria-hidden="true"><use href="/sprites/solid.svg#rocket"></use></svg>',
      name:     'Landing Page',
      desc:     'One page, one goal — built to turn visitors into customers.',
      includes: [
        'Custom animations & interactions',
        'Conversion-focused layout',
        'A/B test ready structure',
        'Analytics integration',
        'Mobile-first design'
      ],
      tags: ['Animations', 'Fast', 'SEO']
    },
    {
      iconHtml: '<svg class="icon icon--gear" aria-hidden="true"><use href="/sprites/solid.svg#gear"></use></svg>',
      name:     'Web Application',
      desc:     'Web apps that solve real problems. No unnecessary complexity.',
      includes: [
        'React frontend',
        'REST API integration',
        'Authentication system',
        'Database setup (light backend)',
        'Deployment & hosting setup'
      ],
      tags: ['React', 'Node.js', 'API']
    },
    {
      iconHtml: '<svg class="icon icon--palette" aria-hidden="true"><use href="/sprites/solid.svg#palette"></use></svg>',
      name:     'Frontend UI',
      desc:     'A precise interface built from your design or from scratch — clean, compatible, and fast.',
      includes: [
        'Component-based architecture',
        'Design system implementation',
        'Cross-browser compatibility',
        'Figma to code',
        'Performance optimization'
      ],
      tags: ['Figma', 'CSS', 'JS']
    },
    {
      iconHtml: '<svg class="icon icon--wrench" aria-hidden="true"><use href="/sprites/solid.svg#wrench"></use></svg>',
      name:     'Website Maintenance',
      desc:     'Your existing site fixed, updated, or improved — without breaking what already works.',
      includes: [
        'Bug fixing & debugging',
        'Performance improvements',
        'Content updates',
        'Security patches',
        'Feature additions'
      ],
      tags: ['Debug', 'Update', 'Optimize']
    }
  ];


  /* ════════════════════════════════════════
     DOM CACHE — Desktop
  ════════════════════════════════════════ */
  const listItems    = document.querySelectorAll('#svc-list .service-list-item');
  const detailPanel  = document.getElementById('svc-detail');
  const detailContent = document.getElementById('svc-detail-content');

  /* ════════════════════════════════════════
     DOM CACHE — Mobile
  ════════════════════════════════════════ */
  const tabButtons   = document.querySelectorAll('#tabs-nav .tab-button');
  const tabDots      = document.querySelectorAll('#tab-dots .tab-dot');
  const tabPanels    = document.querySelectorAll('#tab-panels .tab-panel');
  const tabPanelsEl  = document.getElementById('tab-panels');
  const tabsNavWrapper = document.querySelector('.tabs-nav-wrapper');

  let currentMobileIndex = 0;


  /* ════════════════════════════════════════
     DESKTOP — selectService(idx)
     1. Toggle active class on list items
     2. Fade out + replace detail content
     3. Fade in via CSS animation on re-insert
  ════════════════════════════════════════ */
  function selectService(idx) {
    if (!listItems.length || !detailContent) return;

    // Update active state on list
    listItems.forEach(function (el, i) {
      el.classList.toggle('service-list-item--active', i === idx);
    });

    const s = services[idx];

    // Build new content node (clone strips old animation, triggers fresh one)
    const newContent = detailContent.cloneNode(false);
    newContent.id = 'svc-detail-content';

    newContent.innerHTML =
      '<span class="service-detail-panel__icon" id="svc-icon">' + s.iconHtml + '</span>' +
      '<div class="service-detail-panel__name" id="svc-name">' + escapeHtml(s.name) + '</div>' +
      '<p class="service-detail-panel__description" id="svc-desc">' + escapeHtml(s.desc) + '</p>' +
      '<p class="service-detail-panel__includes-title">' + (detailContent.querySelector('.service-detail-panel__includes-title') ? detailContent.querySelector('.service-detail-panel__includes-title').textContent : "What's included") + '</p>' +
      '<ul class="service-detail-panel__includes-list" id="svc-includes">' +
        s.includes.map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join('') +
      '</ul>' +
      '<div class="service-detail-panel__tags" id="svc-tags">' +
        s.tags.map(function (tag) { return '<span class="service-detail-panel__tag">' + escapeHtml(tag) + '</span>'; }).join('') +
      '</div>';

    detailContent.replaceWith(newContent);
  }


  /* ════════════════════════════════════════
     MOBILE — goToPanel(idx)
     Single source of truth for mobile navigation.
     1. Clamp index 0–4
     2. Toggle active classes on tabs, dots, panels
     3. Scroll active tab button into view (wrapper only)
  ════════════════════════════════════════ */
  function goToPanel(idx) {
    const count = tabPanels.length;
    if (count === 0) return;

    // Clamp
    idx = Math.max(0, Math.min(idx, count - 1));
    currentMobileIndex = idx;

    // Update tab buttons
    tabButtons.forEach(function (btn, i) {
      btn.classList.toggle('tab-button--active', i === idx);
    });

    // Update dots
    tabDots.forEach(function (dot, i) {
      dot.classList.toggle('tab-dot--active', i === idx);
    });

    // Update panels
    tabPanels.forEach(function (panel, i) {
      panel.classList.toggle('tab-panel--active', i === idx);
    });

    // Scroll active tab button into view within wrapper only
    if (tabsNavWrapper && tabButtons[idx]) {
      const activeBtn    = tabButtons[idx];
      const btnLeft      = activeBtn.offsetLeft;
      const btnWidth     = activeBtn.offsetWidth;
      const wrapperWidth = tabsNavWrapper.offsetWidth;
      const scrollTarget = btnLeft - (wrapperWidth / 2) + (btnWidth / 2);
      tabsNavWrapper.scrollTo({ left: scrollTarget, behavior: 'smooth' });
    }
  }


  /* ════════════════════════════════════════
     DESKTOP — Attach list item click handlers
  ════════════════════════════════════════ */
  listItems.forEach(function (item, i) {
    item.addEventListener('click', function () {
      selectService(i);
    });
  });


  /* ════════════════════════════════════════
     MOBILE — Attach tab button click handlers
  ════════════════════════════════════════ */
  tabButtons.forEach(function (btn, i) {
    btn.addEventListener('click', function () {
      goToPanel(i);
    });
  });


  /* ════════════════════════════════════════
     MOBILE — Attach dot click handlers
  ════════════════════════════════════════ */
  tabDots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      goToPanel(i);
    });
  });


  /* ════════════════════════════════════════
     MOBILE — Swipe / touch navigation
  ════════════════════════════════════════ */
  if (tabPanelsEl) {
    var touchStartX = 0;

    tabPanelsEl.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    tabPanelsEl.addEventListener('touchend', function (e) {
      var delta = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(delta) < 50) return; // too small — ignore

      if (delta > 0) {
        // Swipe left → next panel
        goToPanel(currentMobileIndex + 1);
      } else {
        // Swipe right → previous panel
        goToPanel(currentMobileIndex - 1);
      }
    }, { passive: true });
  }


  /* ════════════════════════════════════════
     UTILITY — escapeHtml
     Prevents XSS when inserting data strings via innerHTML.
  ════════════════════════════════════════ */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

});
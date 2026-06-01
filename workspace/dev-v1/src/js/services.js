/*
 * services.js
 * Desktop service switching + mobile tab/swipe navigation
 * No dependencies — vanilla JS only
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────
     SERVICE DATA
  ───────────────────────────────────────── */

  const services = [
    {
      icon: `<svg class="icon icon--building" aria-hidden="true"><use href="/sprites/solid.svg#building"></use></svg>`,
      name: 'Business Website',
      description: 'Your website is often the first thing a client sees. It needs to be fast, clear, and work on every device.',
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
      description: 'One page, one goal — built to turn visitors into customers.',
      includes: [
        'Custom animations & interactions',
        'Conversion-focused layout',
        'A/B test ready structure',
        'Analytics integration',
        'Mobile-first design',
      ],
      tags: ['HTML/CSS', 'JavaScript', 'Analytics'],
    },
    {
      icon: `<svg class="icon icon--gear" aria-hidden="true"><use href="/sprites/solid.svg#gear"></use></svg>`,
      name: 'Web Application',
      description: 'Web apps that solve real problems. No unnecessary complexity.',
      includes: [
        'React frontend',
        'REST API integration',
        'Authentication system',
        'Database setup (light backend)',
        'Deployment & hosting setup',
      ],
      tags: ['React', 'Node.js', 'REST API'],
    },
    {
      icon: `<svg class="icon icon--palette" aria-hidden="true"><use href="/sprites/solid.svg#palette"></use></svg>`,
      name: 'Frontend UI',
      description: 'A precise interface built from your design or from scratch — clean, compatible, and fast.',
      includes: [
        'Component-based architecture',
        'Design system implementation',
        'Cross-browser compatibility',
        'Figma to code',
        'Performance optimization',
      ],
      tags: ['React', 'CSS', 'Figma'],
    },
    {
      icon: `<svg class="icon icon--wrench" aria-hidden="true"><use href="/sprites/solid.svg#wrench"></use></svg>`,
      name: 'Website Maintenance',
      description: 'Your existing site fixed, updated, or improved — without breaking what already works.',
      includes: [
        'Bug fixing & debugging',
        'Performance improvements',
        'Content updates',
        'Security patches',
        'Feature additions',
      ],
      tags: ['Audit', 'Optimization', 'Support'],
    },
  ];


  /* ─────────────────────────────────────────
     DOM REFERENCES — cached at startup
  ───────────────────────────────────────── */

  // Desktop
  const svcList        = document.getElementById('svc-list');
  const svcDetailContent = document.getElementById('svc-detail-content');
  const svcIcon        = document.getElementById('svc-icon');
  const svcName        = document.getElementById('svc-name');
  const svcDesc        = document.getElementById('svc-desc');
  const svcIncludes    = document.getElementById('svc-includes');
  const svcTags        = document.getElementById('svc-tags');

  // Mobile
  const tabsNav        = document.getElementById('tabs-nav');
  const tabPanelsTrack = document.getElementById('tab-panels');
  const tabDotsWrapper = document.getElementById('tab-dots');

  // Collected NodeLists (re-queried after confirming parents exist)
  const listItems      = svcList        ? Array.from(svcList.querySelectorAll('.service-list-item')) : [];
  const tabButtons     = tabsNav        ? Array.from(tabsNav.querySelectorAll('.tab-button'))        : [];
  const tabDots        = tabDotsWrapper ? Array.from(tabDotsWrapper.querySelectorAll('.tab-dot'))    : [];

  // Transition duration must match CSS --transition-fast (150ms)
  const FADE_DURATION = 150;


  /* ─────────────────────────────────────────
     DESKTOP — updateDetailPanel(index)
  ───────────────────────────────────────── */

  function buildIncludesHTML(includesArr) {
    return includesArr.map(item => `<li>${item}</li>`).join('');
  }

  function buildTagsHTML(tagsArr) {
    return tagsArr.map(tag => `<span class="service-detail-panel__tag">${tag}</span>`).join('');
  }

  function updateDetailPanel(index) {
    if (!svcDetailContent) return;

    const svc = services[index];
    if (!svc) return;

    // Fade out
    svcDetailContent.style.opacity = '0';
    svcDetailContent.style.transition = `opacity ${FADE_DURATION}ms ease`;

    setTimeout(() => {
      // Update content while invisible
      if (svcIcon)     svcIcon.innerHTML     = svc.icon;
      if (svcName)     svcName.textContent   = svc.name;
      if (svcDesc)     svcDesc.textContent   = svc.description;
      if (svcIncludes) svcIncludes.innerHTML = buildIncludesHTML(svc.includes);
      if (svcTags)     svcTags.innerHTML     = buildTagsHTML(svc.tags);

      // Fade back in
      svcDetailContent.style.opacity = '1';
    }, FADE_DURATION);
  }


  /* ─────────────────────────────────────────
     DESKTOP — List item click
  ───────────────────────────────────────── */

  if (svcList && listItems.length > 0) {
    listItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        // Deactivate all
        listItems.forEach(el => el.classList.remove('service-list-item--active'));
        // Activate clicked
        item.classList.add('service-list-item--active');
        // Update detail panel
        updateDetailPanel(index);
      });
    });
  }


  /* ─────────────────────────────────────────
     MOBILE — State
  ───────────────────────────────────────── */

  let currentIndex = 0;
  const totalPanels = services.length; // 5


  /* ─────────────────────────────────────────
     MOBILE — goToPanel(index)
     Single source of truth for mobile state
  ───────────────────────────────────────── */

  function goToPanel(index) {
    // Clamp index
    const clamped = Math.max(0, Math.min(totalPanels - 1, index));
    currentIndex = clamped;

    // Slide the track
    if (tabPanelsTrack) {
      tabPanelsTrack.style.transform = `translateX(-${clamped * 100}%)`;
    }

    // Update tab buttons
    tabButtons.forEach((btn, i) => {
      btn.classList.toggle('tab-button--active', i === clamped);
    });

    // Update dots
    tabDots.forEach((dot, i) => {
      dot.classList.toggle('tab-dot--active', i === clamped);
    });

    // Scroll active tab button into view
    if (tabButtons[clamped]) {
      tabButtons[clamped].scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
    }
  }


  /* ─────────────────────────────────────────
     MOBILE — Tab button clicks
  ───────────────────────────────────────── */

  tabButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => goToPanel(index));
  });


  /* ─────────────────────────────────────────
     MOBILE — Dot clicks
  ───────────────────────────────────────── */

  tabDots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToPanel(index));
  });


  /* ─────────────────────────────────────────
     MOBILE — Swipe (touch)
  ───────────────────────────────────────── */

  if (tabPanelsTrack) {
    let startX = 0;

    tabPanelsTrack.addEventListener('touchstart', (e) => {
      startX = e.changedTouches[0].clientX;
    }, { passive: true });

    tabPanelsTrack.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const delta = startX - endX;

      if (delta > 50) {
        // Swiped left → next panel
        goToPanel(currentIndex + 1);
      } else if (delta < -50) {
        // Swiped right → previous panel
        goToPanel(currentIndex - 1);
      }
    }, { passive: true });
  }

});

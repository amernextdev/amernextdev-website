/* ═══════════════════════════════════════════════════
   services.js
   1. Desktop — service list → detail panel switching
   2. Mobile  — tab buttons → tab panel switching (+ swipe)
   3. Scroll reveal — header + list items staggered
═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────
     CONFIG
  ───────────────────────────────────────────────── */
  const CONFIG = {
    panel: {
      leaveDuration: 150,   /* ms — old panel fade out */
    },
    reveal: {
      stagger:    70,       /* ms between each element */
      duration:   500,
      easing:     'cubic-bezier(0.22, 1, 0.36, 1)',
      rootMargin: '0px 0px -60px 0px',
    },
  };


  /* ═══════════════════════════════════════════════
     1. DESKTOP — list / panel switching
  ═══════════════════════════════════════════════ */

  function initDesktop() {
    const list = document.getElementById('svc-list');
    if (!list) return;

    const buttons = Array.from(list.querySelectorAll('.service-list-item'));
    const panels  = buttons.map((btn) =>
      document.getElementById(`panel-${btn.dataset.index}`)
    ).filter(Boolean);

    if (!buttons.length || !panels.length) return;

    let activeIndex = 0;
    let switching   = false;

    function switchTo(index) {
      if (index === activeIndex || switching) return;
      switching = true;

      const prevPanel = panels[activeIndex];
      const nextPanel = panels[index];
      const prevBtn   = buttons[activeIndex];
      const nextBtn   = buttons[index];

      /* Deactivate old button */
      prevBtn.classList.remove('service-list-item--active');
      prevBtn.setAttribute('aria-pressed', 'false');

      /* Fade out old panel */
      prevPanel.classList.add('service-detail-panel--leaving');

      setTimeout(() => {
        prevPanel.classList.remove('service-detail-panel--active');
        prevPanel.classList.remove('service-detail-panel--leaving');

        /* Show new panel */
        nextPanel.classList.add('service-detail-panel--active');
        nextPanel.classList.add('service-detail-panel--entering');

        /* Activate new button */
        nextBtn.classList.add('service-list-item--active');
        nextBtn.setAttribute('aria-pressed', 'true');

        activeIndex = index;
        switching   = false;

        setTimeout(() => {
          nextPanel.classList.remove('service-detail-panel--entering');
        }, 420);

      }, CONFIG.panel.leaveDuration);
    }

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        switchTo(parseInt(btn.dataset.index, 10));
      });
    });
  }


  /* ═══════════════════════════════════════════════
     2. MOBILE — tab / panel switching + swipe
  ═══════════════════════════════════════════════ */

  function initMobile() {
    const tabsNav  = document.getElementById('tabs-nav');
    const tabDots  = document.getElementById('tab-dots');
    const panelsCt = document.getElementById('tab-panels');

    if (!tabsNav || !panelsCt) return;

    const tabBtns   = Array.from(tabsNav.querySelectorAll('.tab-button'));
    const tabPanels = Array.from(panelsCt.querySelectorAll('.tab-panel'));
    const dots      = tabDots ? Array.from(tabDots.querySelectorAll('.tab-dot')) : [];

    if (!tabBtns.length || !tabPanels.length) return;

    let activeTab = 0;

    function activateTab(index) {
      if (index === activeTab) return;

      /* Buttons */
      tabBtns[activeTab].classList.remove('tab-button--active');
      tabBtns[index].classList.add('tab-button--active');

      /* Dots */
      if (dots.length) {
        dots[activeTab].classList.remove('tab-dot--active');
        dots[index].classList.add('tab-dot--active');
      }

      /* Panels */
      tabPanels[activeTab].classList.remove('tab-panel--active');
      tabPanels[index].classList.add('tab-panel--active');

      activeTab = index;

      /* Scroll active tab into view */
      tabBtns[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }

    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        activateTab(parseInt(btn.dataset.tab, 10));
      });
    });

    /* ── Swipe support ── */
    let touchStartX = 0;
    let touchStartY = 0;

    panelsCt.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    panelsCt.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;

      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        const isRtl  = document.documentElement.dir === 'rtl'
                    || document.body.getAttribute('dir') === 'rtl';
        const goNext = isRtl ? dx > 0 : dx < 0;

        if (goNext && activeTab < tabBtns.length - 1) {
          activateTab(activeTab + 1);
        } else if (!goNext && activeTab > 0) {
          activateTab(activeTab - 1);
        }
      }
    }, { passive: true });
  }


  /* ═══════════════════════════════════════════════
     3. SCROLL REVEAL — staggered fade-up
  ═══════════════════════════════════════════════ */

  function initReveal() {
    const section = document.getElementById('services');
    if (!section) return;

    /* Collect elements in reveal order */
    const headerEls = Array.from(
      section.querySelectorAll('.section-eyebrow, .section-title, .section-description')
    );
    const listItems = Array.from(section.querySelectorAll('.service-list-item'));
    const mobileEls = Array.from(
      section.querySelectorAll('.tabs-nav-wrapper, .tab-dots, .tab-panels')
    );

    const allTargets = [...headerEls, ...listItems, ...mobileEls];
    if (!allTargets.length) return;

    /* Lock initial hidden state */
    allTargets.forEach((el) => {
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(14px)';
      el.style.transition = `
        opacity   ${CONFIG.reveal.duration}ms ${CONFIG.reveal.easing},
        transform ${CONFIG.reveal.duration}ms ${CONFIG.reveal.easing}
      `;
    });

    function revealAll() {
      allTargets.forEach((el, i) => {
        setTimeout(() => {
          el.style.opacity   = '1';
          el.style.transform = 'translateY(0)';
        }, i * CONFIG.reveal.stagger);
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealAll();
            observer.disconnect();
          }
        });
      },
      { rootMargin: CONFIG.reveal.rootMargin }
    );

    const trigger = section.querySelector('.section-eyebrow') || section;
    observer.observe(trigger);
  }


  /* ═══════════════════════════════════════════════
     INIT
  ═══════════════════════════════════════════════ */

  function init() {
    initDesktop();
    initMobile();
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
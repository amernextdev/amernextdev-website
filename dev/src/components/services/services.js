/* ═══════════════════════════════════════════════════
   services.js
   1. Desktop — service list → detail panel switching
   2. Mobile  — tab buttons → tab panel switching (+ swipe)
═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────
     CONFIG
  ───────────────────────────────────────────────── */
  const CONFIG = {
    panel: {
      leaveDuration: 150,   /* ms — old desktop panel softens out */
    },
    tab: {
      leaveDuration: 140,   /* ms — old mobile tab panel softens out */
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

      /* Button state updates instantly — feels responsive even
         while the panel itself is still transitioning. */
      prevBtn.classList.remove('service-list-item--active');
      prevBtn.setAttribute('aria-pressed', 'false');
      nextBtn.classList.add('service-list-item--active');
      nextBtn.setAttribute('aria-pressed', 'true');

      /* 1. Soften the old panel out first (short, gentle). */
      prevPanel.classList.remove('service-detail-panel--switch-in');
      prevPanel.classList.add('service-detail-panel--switch-out');

      /* 2. Once the exit finishes, swap visibility and play the
            entrance animation. Sequencing the two (rather than
            firing both at once) is what makes the switch read as
            one smooth motion instead of an abrupt cut. */
      setTimeout(() => {
        prevPanel.classList.remove(
          'service-detail-panel--active',
          'service-detail-panel--switch-out'
        );

        nextPanel.classList.add('service-detail-panel--active');
        nextPanel.classList.remove('service-detail-panel--switch-in');
        void nextPanel.offsetWidth; /* force reflow to restart animation */
        nextPanel.classList.add('service-detail-panel--switch-in');

        activeIndex = index;
        switching   = false;
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
    let tabSwitching = false;

    function activateTab(index) {
      if (index === activeTab || tabSwitching) return;
      tabSwitching = true;

      const prevIndex = activeTab;

      /* Buttons + dots update instantly for responsive feedback */
      tabBtns[prevIndex].classList.remove('tab-button--active');
      tabBtns[index].classList.add('tab-button--active');

      if (dots.length) {
        dots[prevIndex].classList.remove('tab-dot--active');
        dots[index].classList.add('tab-dot--active');
      }

      /* 1. Soften the old panel out */
      const prevPanel = tabPanels[prevIndex];
      const nextPanel = tabPanels[index];

      prevPanel.classList.remove('tab-panel--switch-in');
      prevPanel.classList.add('tab-panel--switch-out');

      /* 2. Swap visibility + play entrance only once the exit
            finishes, so the switch reads as one smooth motion. */
      setTimeout(() => {
        prevPanel.classList.remove('tab-panel--active', 'tab-panel--switch-out');

        nextPanel.classList.add('tab-panel--active');
        nextPanel.classList.remove('tab-panel--switch-in');
        void nextPanel.offsetWidth; /* force reflow */
        nextPanel.classList.add('tab-panel--switch-in');

        activeTab     = index;
        tabSwitching   = false;
      }, CONFIG.tab.leaveDuration);

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
     INIT
  ═══════════════════════════════════════════════ */

  function init() {
    initDesktop();
    initMobile();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
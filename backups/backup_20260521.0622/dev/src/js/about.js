/*
 * about.js
 * Typewriter effect + skill tag reveal on viewport entry
 * No dependencies — vanilla JS only
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── DOM References ───────────────────────────────────────────────────────
  const section  = document.getElementById('about');
  const p1Text   = document.querySelector('#p1 .typewriter-line__text');
  const p2Text   = document.querySelector('#p2 .typewriter-line__text');
  const p3Text   = document.querySelector('#p3 .typewriter-line__text');

  if (!section) return;

  // ── revealSkillTags ──────────────────────────────────────────────────────
  function revealSkillTags() {
    const tags = document.querySelectorAll('.skill-tag');
    tags.forEach(tag => tag.classList.add('visible'));
  }

  // ── startTypewriter ──────────────────────────────────────────────────────
  function startTypewriter() {
    const nodes = [p1Text, p2Text, p3Text].filter(Boolean);
    if (!nodes.length) return;

    const paragraphs = nodes.map(el => {
      const full = (el.textContent || '').trim()
        || el.getAttribute('data-i18n-text')
        || '';
      el.textContent = '';
      return { el, full };
    });

    let pIndex = 0;

    function getLine(i) {
      const p = paragraphs[i];
      return p ? p.el.closest('.typewriter-line') : null;
    }

    function typeNext() {
      if (pIndex >= paragraphs.length) return;

      const current  = paragraphs[pIndex];
      const lineEl   = getLine(pIndex);
      let charIndex  = 0;
      const speed    = current.full.length > 80 ? 18 : 25;

      if (lineEl) lineEl.classList.add('typing');

      function tick() {
        if (charIndex < current.full.length) {
          current.el.textContent += current.full[charIndex];
          charIndex++;
          setTimeout(tick, speed);
        } else {
          if (lineEl) {
            lineEl.classList.remove('typing');
            lineEl.classList.add('done');
          }
          pIndex++;
          if (pIndex < paragraphs.length) {
            setTimeout(typeNext, 300);
          }
        }
      }

      tick();
    }

    typeNext();
  }

  // ── IntersectionObserver ─────────────────────────────────────────────────
  let fired = false;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !fired) {
      fired = true;
      observer.unobserve(section);
      startTypewriter();
      revealSkillTags();
    }
  }, { threshold: 0.3 });

  observer.observe(section);

});
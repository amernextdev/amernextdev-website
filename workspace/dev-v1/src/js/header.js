// ===================================================
//  MOBILE NAVIGATION TOGGLE
//  يدير فتح وإغلاق القائمة الجانبية في الموبايل
// ===================================================

const SELECTORS = {
  burger:    '#burger-btn',
  mobileNav: '#mobile-nav',
  closeBtn:  '#mobile-nav-close',
};

const CLASS_OPEN = 'is-open';

/**
 * تفعيل إدارة القائمة الجانبية
 */
export default function initMobileNav() {
  const burger = document.querySelector(SELECTORS.burger);
  const mobileNav = document.querySelector(SELECTORS.mobileNav);
  const closeBtn = document.querySelector(SELECTORS.closeBtn);

  // لو أي عنصر مش موجود خارج من غير مشاكل
  if (!burger || !mobileNav || !closeBtn) return;

  // ---------- دوال مساعدة ----------

  const openNav = () => {
    mobileNav.classList.add(CLASS_OPEN);
    mobileNav.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // ننقل التركيز إلى زر الإغلاق
    closeBtn.focus();
  };

  const closeNav = () => {
    mobileNav.classList.remove(CLASS_OPEN);
    mobileNav.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    // نعيد التركيز إلى زر الهامبرجر
    burger.focus();
  };

  const toggleNav = () => {
    const isOpen = mobileNav.classList.contains(CLASS_OPEN);
    isOpen ? closeNav() : openNav();
  };

  // ---------- المستمعات ----------

  // فتح/إغلاق بزر الهامبرجر
  burger.addEventListener('click', toggleNav);

  // إغلاق بزر X
  closeBtn.addEventListener('click', closeNav);

  // إغلاق عند الضغط على Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains(CLASS_OPEN)) {
      closeNav();
    }
  });

  // إغلاق عند الضغط خارج القائمة (وليس على زر الهامبرجر)
  document.addEventListener('click', (e) => {
    if (!mobileNav.classList.contains(CLASS_OPEN)) return;
    if (!mobileNav.contains(e.target) && e.target !== burger && !burger.contains(e.target)) {
      closeNav();
    }
  });

  // إغلاق عند النقر على أي رابط داخل القائمة (لتحسين التجربة)
  const navLinks = mobileNav.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', closeNav);
  });
}


window.addEventListener('scroll', () => {
  document.getElementById('site-header')
    .classList.toggle('is-scrolled', window.scrollY > 10);
});
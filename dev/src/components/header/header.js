/**
 * @file header.js
 * @description Header & mobile navigation logic.
 *              Handles: sidebar open/close, scroll-spy active links,
 *              language toggle (via i18n.js), and theme toggle (via theme.js).
 *
 * Dependencies (external modules — no direct logic duplicated here):
 *   - toggleLanguage, getCurrentLanguage  from i18n.js
 *   - toggleTheme, getCurrentTheme, isDarkMode  from theme.js
 */

import { toggleLanguage, getCurrentLanguage } from '/src/services/js/i18n.js';
import { toggleTheme, getCurrentTheme, isDarkMode } from '/src/services/js/theme.js';

// ─────────────────────────────────────────────────────────────────────────────
// 1. DOM References
// ─────────────────────────────────────────────────────────────────────────────

// Header
const siteHeader       = document.getElementById('site-header');
const burgerBtn        = document.getElementById('burger-btn');
const themeToggleBtn   = document.getElementById('theme-toggle');
const themeIconSpan    = document.getElementById('theme-icon');
const langToggleBtn    = document.getElementById('lang-toggle');
const headerLangLabel  = langToggleBtn?.querySelector('.lang-label');

// Mobile nav (sidebar / drawer)
const mobileNav        = document.getElementById('mobile-nav');
const mobileNavClose   = document.getElementById('mobile-nav-close');
const mobileThemeBtn   = document.getElementById('mobile-theme-toggle');
const mobileThemeIcon  = document.getElementById('mobile-theme-icon');
const mobileThemeSub   = document.getElementById('mobile-theme-sub');
const mobileThemeSwitch = document.getElementById('mobile-theme-switch');
const mobileLangBtn    = document.getElementById('mobile-lang-toggle');
const mobileLangBadgeAr = document.getElementById('mobile-lang-badge-ar');
const mobileLangBadgeEn = document.getElementById('mobile-lang-badge-en');
const mobileLangSub    = document.getElementById('mobile-lang-sub');

// Nav links — both header & sidebar (shared class nav__link)
const allNavLinks = document.querySelectorAll('.nav__link');

// Sidebar nav links only (for close-on-click)
const sidebarNavLinks = mobileNav?.querySelectorAll('.nav__link') ?? [];

// Sections for scroll spy — derived from SECTIONS constant anchors
const SECTION_IDS = ['hero', 'work', 'services', 'about', 'contact'];

// ─────────────────────────────────────────────────────────────────────────────
// 2. State
// ─────────────────────────────────────────────────────────────────────────────

let isOpen = false;          // Sidebar open/closed state
let rafPending = false;      // RAF guard for scroll spy
let touchStartX = 0;         // Touch tracking for swipe-to-close
const SWIPE_THRESHOLD = 60;  // px — minimum delta to trigger swipe close

// ─────────────────────────────────────────────────────────────────────────────
// 3. Functions
// ─────────────────────────────────────────────────────────────────────────────

// ── Sidebar ──────────────────────────────────────────────────────────────────

/** فتح القائمة الجانبية وتحديث ARIA ومنع تمرير الصفحة */
function openSidebar() {
  if (isOpen) return;
  isOpen = true;

  mobileNav.setAttribute('aria-hidden', 'false');
  burgerBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  mobileNav.classList.add('is-open');
}

/** إغلاق القائمة الجانبية واستعادة تمرير الصفحة */
function closeSidebar() {
  if (!isOpen) return;
  isOpen = false;

  mobileNav.setAttribute('aria-hidden', 'true');
  burgerBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  mobileNav.classList.remove('is-open');
}

// ── Scroll Spy ───────────────────────────────────────────────────────────────

/** حساب ارتفاع الهيدر بشكل ديناميكي لتعويض الـ offset */
function getHeaderHeight() {
  return siteHeader?.offsetHeight ?? 80;
}

/**
 * يُحدِّث الرابط النشط بناءً على موضع السكرول الحالي.
 * يعتمد على أعلى كل section مقارنةً بـ scrollY + offset الهيدر.
 */
function updateActiveLink() {
  const scrollY = window.scrollY;
  const offset  = getHeaderHeight() + 16; // هامش إضافي 16px
  const sections = SECTION_IDS.map(id => document.getElementById(id)).filter(Boolean);

  // ابحث عن آخر section تجاوز الـ scroll نقطة بدايتها
  let activeId = sections[0]?.id ?? null;

  for (const section of sections) {
    if (section.getBoundingClientRect().top + scrollY <= scrollY + offset) {
      activeId = section.id;
    }
  }

  // Edge case — تأكد من آخر section إذا وصل المستخدم لنهاية الصفحة
  const nearBottom =
    window.innerHeight + scrollY >= document.documentElement.scrollHeight - 10;
  if (nearBottom && sections.length) {
    activeId = sections[sections.length - 1].id;
  }

  // تحديث class nav__link--active على جميع الروابط
  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === `#${activeId}`) {
      link.classList.add('nav__link--active');
    } else {
      link.classList.remove('nav__link--active');
    }
  });
}

/** Scroll listener محمي بـ requestAnimationFrame لتجنب الحمل الزائد */
function onScroll() {
  if (rafPending) return;
  rafPending = true;
  requestAnimationFrame(() => {
    // تمييز الهيدر عند السكرول لتفعيل styles الخلفية / الظل
    siteHeader?.classList.toggle('is-scrolled', window.scrollY > 0);
    updateActiveLink();
    rafPending = false;
  });
}

// ── Theme ─────────────────────────────────────────────────────────────────────

/** تحديث أيقونة الهيدر والحالة البصرية لبطاقة الثيم في الموبايل */
function syncThemeUI() {
  const dark = isDarkMode();

  // أيقونة الهيدر — شمس في الوضع الفاتح، قمر في الوضع الداكن
  if (themeIconSpan) {
    themeIconSpan.innerHTML = dark
      ? `<svg class="icon icon--moon"><use href="/sprites/solid.svg#moon"></use></svg>`
      : `<svg class="icon icon--sun"><use href="/sprites/solid.svg#sun"></use></svg>`;
  }

  // أيقونة + نص بطاقة الموبايل
  if (mobileThemeIcon) {
    mobileThemeIcon.innerHTML = dark
      ? `<svg class="icon icon--moon"><use href="/sprites/solid.svg#moon"></use></svg>`
      : `<svg class="icon icon--sun"><use href="/sprites/solid.svg#sun"></use></svg>`;
  }

  // النص الفرعي للبطاقة (Dark mode / Light mode)
  if (mobileThemeSub) {
    mobileThemeSub.textContent = dark ? 'Dark mode' : 'Light mode';
  }

  // تفعيل / تعطيل الـ switch البصري
  if (mobileThemeSwitch) {
    mobileThemeSwitch.classList.toggle('is-on', dark);
  }
}

/** تبديل الثيم والمزامنة الفورية للـ UI */
function handleThemeToggle() {
  toggleTheme();
  syncThemeUI();
}

// ── Language ──────────────────────────────────────────────────────────────────

/** تحديث نص زر اللغة في الهيدر والشارات النشطة في بطاقة الموبايل */
function syncLangUI() {
  const lang = getCurrentLanguage(); // 'ar' | 'en'

  // نص زر الهيدر — يعرض اللغة الأخرى (أي ما سيُبدَّل إليه)
  if (headerLangLabel) {
    headerLangLabel.textContent = lang === 'ar' ? 'EN' : 'AR';
  }

  // تنشيط الشارة المقابلة للغة الحالية
  if (mobileLangBadgeAr) mobileLangBadgeAr.classList.toggle('is-active', lang === 'ar');
  if (mobileLangBadgeEn) mobileLangBadgeEn.classList.toggle('is-active', lang === 'en');

  // النص الفرعي لبطاقة اللغة
  if (mobileLangSub) {
    mobileLangSub.textContent =
      lang === 'ar' ? 'English / الإنجليزية' : 'Arabic / العربية';
  }
}

/** تبديل اللغة (async) ومزامنة الـ UI فور الانتهاء */
async function handleLangToggle() {
  await toggleLanguage();
  syncLangUI();
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Event Listeners
// ─────────────────────────────────────────────────────────────────────────────

// ── Sidebar: فتح / إغلاق ─────────────────────────────────────────────────────

if (burgerBtn) {
  burgerBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // يمنع الـ event من الوصول لـ document click handler
    openSidebar();
  });
}
if (mobileNavClose) mobileNavClose.addEventListener('click', closeSidebar);

// إغلاق عند الضغط على رابط داخل القائمة
sidebarNavLinks.forEach(link =>
  link.addEventListener('click', closeSidebar)
);

// إغلاق بـ CTA link داخل الموبايل
const mobileCta = document.getElementById('mobile-cta');
if (mobileCta) mobileCta.addEventListener('click', closeSidebar);

// إغلاق عند الضغط خارج القائمة (على الـ overlay)
// الهامبرغر محمي بـ stopPropagation فلا داعي لاستثنائه هنا
document.addEventListener('click', (e) => {
  if (!isOpen) return;
  if (!mobileNav?.contains(e.target)) closeSidebar();
});

// إغلاق بمفتاح Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isOpen) closeSidebar();
});

// إغلاق بالسحب يميناً (swipe right)
if (mobileNav) {
  mobileNav.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  mobileNav.addEventListener('touchend', (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (deltaX > SWIPE_THRESHOLD) closeSidebar();
  }, { passive: true });
}

// ── Scroll Spy ───────────────────────────────────────────────────────────────

window.addEventListener('scroll', onScroll, { passive: true });

// ── Theme Toggle ─────────────────────────────────────────────────────────────

if (themeToggleBtn)  themeToggleBtn.addEventListener('click', handleThemeToggle);
if (mobileThemeBtn)  mobileThemeBtn.addEventListener('click', handleThemeToggle);

// ── Language Toggle ───────────────────────────────────────────────────────────

if (langToggleBtn)   langToggleBtn.addEventListener('click', handleLangToggle);
if (mobileLangBtn)   mobileLangBtn.addEventListener('click', handleLangToggle);

// ─────────────────────────────────────────────────────────────────────────────
// 5. Init
// ─────────────────────────────────────────────────────────────────────────────

/**
 * تهيئة الهيدر — يُستدعى من main.js بعد initI18n() و initTheme()
 * يضمن أن الـ UI يعكس الحالة المحفوظة منذ أول تحميل
 */
export function initHeader() {
  // مزامنة واجهة الثيم مع الحالة المُحمَّلة من theme.js
  syncThemeUI();

  // مزامنة واجهة اللغة مع الحالة المُحمَّلة من i18n.js
  syncLangUI();

  // حساب القسم النشط عند التحميل (في حالة الـ anchor في الـ URL)
  updateActiveLink();
}
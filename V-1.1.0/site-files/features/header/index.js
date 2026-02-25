// /*
// ==========================================================
// -                                                                -------------------------
// - 1️⃣ التحكم في فتح وغلق قائمة الموبايل (Mobile Navigation)       |  الحاله: تم بنجاح     |
// -                                                                -------------------------
// ==========================================================
// */

const mobileNavigation = document.getElementById('mobile-navigation');
const navigationOpenToggle = document.getElementById('nav-toggle-open');
const navigationCloseToggle = document.getElementById('nav-toggle-close');

// Fail fast (defensive check)
// if (!mobileNavigation || !navigationOpenToggle || !navigationCloseToggle) {
//     console.warn('[Navigation] Mobile navigation elements not found');
//     return;
// }

// State Helpers
const isNavigationOpen = () => !mobileNavigation.hidden;

const setNavigationState = (isOpen) => {
    mobileNavigation.hidden = !isOpen;
    navigationOpenToggle.setAttribute('aria-expanded', String(isOpen));

    (isOpen ? navigationCloseToggle : navigationOpenToggle).focus();
};

// Event Handlers
navigationOpenToggle.addEventListener('click', () => setNavigationState(true));
navigationCloseToggle.addEventListener('click', () => setNavigationState(false));

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isNavigationOpen()) {
        setNavigationState(false);
    }
});
// /*
// ==========================================================
// -                                                -------------------------
// - 2️⃣ إدارة حالة الرابط النشط (Active Link)       |  الحاله: تم بنجاح     |
// -                                                -------------------------
// ==========================================================
// */

// import { currentPageData } from '/dev/sandbox.js';

// function syncActiveNavigationLink() {
//     if (!currentPageData || currentPageData.error) return;

//     const navigationLinks = document.querySelectorAll(
//         '.navigation-link, .mobile-navigation-link'
//     );

//     const currentFileName = currentPageData.fileName;

//     navigationLinks.forEach(link => {
//         const href = link.getAttribute('href');
//         const normalizedHref = href?.startsWith('/') ? href.slice(1) : href;
//         const isActive = normalizedHref === currentFileName;

//         link.classList.toggle('is-active', isActive);
//     });
// }

// syncActiveNavigationLink();

// /*
// ==========================================================
// -                                                       -------------------------
// - 3️⃣ ضم الأزرار لنظام تغيير اللغة(Language Switcher)     |  الحاله: تم بنجاح     | 
// -                                                       -------------------------
// ==========================================================
// */

// import { initLocalization.init, /* currentLanguage */ } from '/shared/scripts/localization.js';

// /* Elements */
// const languageToggleButtons = document.querySelectorAll('.language-toggle');

// /* Helpers */
// const getLanguageMenu = (toggleButton) =>
//     document.getElementById(toggleButton.getAttribute('aria-controls'));

// const isLanguageMenuOpen = (menu) => menu && !menu.hidden;

// const openLanguageMenu = (toggleButton, menu) => {
//     if (!menu) return;
//     menu.hidden = false;
//     toggleButton.setAttribute('aria-expanded', 'true');
// };

// const closeLanguageMenu = (toggleButton, menu) => {
//     if (!menu) return;
//     menu.hidden = true;
//     toggleButton.setAttribute('aria-expanded', 'false');
// };

// const syncActiveLanguageOption = () => {
//     document.querySelectorAll('.language-option').forEach(option => {
//         option.classList.toggle(
//             'is-active',
//             option.dataset.language === /* currentLanguage */
//         );
//     });
// };

// const closeAllLanguageMenus = () => {
//     languageToggleButtons.forEach(toggleButton => {
//         const menu = getLanguageMenu(toggleButton);
//         closeLanguageMenu(toggleButton, menu);
//     });
// };

// /* Initialization  */
// syncActiveLanguageOption();

// /* Toggle Handling */
// languageToggleButtons.forEach(toggleButton => {
//     const menu = getLanguageMenu(toggleButton);
//     if (!menu) return;

//     toggleButton.addEventListener('click', (event) => {
//         event.stopPropagation();

//         if (isLanguageMenuOpen(menu)) {
//             closeLanguageMenu(toggleButton, menu);
//         } else {
//             closeAllLanguageMenus();
//             openLanguageMenu(toggleButton, menu);
//         }
//     });
// });

// /* Global Click Handling */
// document.addEventListener('click', (event) => {
//     const languageOption = event.target.closest('.language-option');

//     if (languageOption) {
//         initLocalization.init(languageOption.dataset.language);
//         syncActiveLanguageOption();
//         closeAllLanguageMenus();
//         return;
//     }

//     languageToggleButtons.forEach(toggleButton => {
//         const menu = getLanguageMenu(toggleButton);
//         if (!menu) return;

//         if (
//             isLanguageMenuOpen(menu) &&
//             !toggleButton.contains(event.target) &&
//             !menu.contains(event.target)
//         ) {
//             closeLanguageMenu(toggleButton, menu);
//         }
//     });
// });

// /*
// ==========================================================
// -                                    -------------------------
// - 4️⃣ تبديل الثيم (Dark / Light)      |  الحاله: تم بنجاح     |
// -                                    -------------------------
// ==========================================================
// */

// import { themeManager.init, /* currentTheme */ } from '/shared/scripts/theme-manager.js';

// const themeToggleButtons = document.querySelectorAll('.theme-toggle');
// const themeToggleIcons = document.querySelectorAll('.theme-toggle i');

// if (!themeToggleButtons.length || !themeToggleIcons.length) {
//     console.warn('[Theme] Toggle elements not found');
// } else {
//     const syncThemeToggleIcons = () => {
//         const isLightTheme = /* currentTheme */ === 'light';

//         themeToggleIcons.forEach(icon => {
//             icon.classList.toggle('fa-sun', !isLightTheme);
//             icon.classList.toggle('fa-moon', isLightTheme);
//         });
//     };

//     syncThemeToggleIcons();

//     themeToggleButtons.forEach(toggleButton => {
//         toggleButton.addEventListener('click', () => {
//             themeManager.init();
//             syncThemeToggleIcons();
//         });
//     });
// }

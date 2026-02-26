// 📁 dev/sandbox.js

// =====================
// DATA
// =====================
const documentBody = document.body;
const mainContent = document.querySelector('main');


// =====================
// MODULES
// =====================
// ==== PAGES DATA ====  
const pageData = {
    pageRegistry: {
        home: { id: 1, pageKey: "home", fileName: "index.html" },
        services: { id: 2, pageKey: "services", fileName: "services.html" },
        projects: { id: 3, pageKey: "projects", fileName: "projects.html" },
        about: { id: 4, pageKey: "about", fileName: "about.html" },
        contact: { id: 5, pageKey: "contact", fileName: "contact.html" }
    },
    get currentPage() {return document.body.dataset.page;},
    get currentPageData() {
        return this.pageRegistry[this.currentPage] || {error: true, message: "page registry lookup failed"};
    }
}

// ==== HEADER & FOOTER & MOBILE MENU ====
const siteChrome = {
    headerMarkup: `
            <header>
            <!-- open navigation menu -->
            <button id="nav-toggle-open" aria-label="open navigation menu" data-translation="navigation.open"
                aria-haspopup="true" aria-expanded="false" aria-controls="mobile-navigation">
                <i class="fas fa-bars"></i>
            </button>
        
            <!-- logo -->
            <a href="index.html" class="brand-home-link">
                <picture>
                    <source srcset="/assets/images/branding/header-logo/header-logo.avif" type="image/avif">
                    <source srcset="/assets/images/branding/header-logo/header-logo.webp" type="image/webp">
                    <img src="/assets/images/branding/header-logo/header-logo.jpg" class="brand-logo" alt="personal developer brand logo" data-translation="brand.logo.alt"
                        width="60px" height="60px" loading="eager" decoding="auto">
                </picture>
            </a>
        
            <nav class="primary-navigation" aria-label="primary site navigation" data-translation="navigation.primary">
                <ul class="navigation-list">
                    <li class="navigation-item">
                        <a href="index.html" class="navigation-link"
                            data-translation="navigation.home">Home</a>
                    </li>
                    <li class="navigation-item">
                        <a href="services.html" class="navigation-link" data-translation="navigation.services">Services</a>
                    </li>
                    <li class="navigation-item">
                        <a href="projects.html" class="navigation-link" data-translation="navigation.projects">Projects</a>
                    </li>
                    <li class="navigation-item">
                        <a href="about.html" class="navigation-link" data-translation="navigation.about">About</a>
                    </li>
                    <li class="navigation-item navigation-item-cta">
                        <a href="contact.html" class="navigation-link navigation-link-cta header-contact-cta"
                            data-translation="navigation.contact">Contact&ensp;<i class="fas fa-handshake"></i></a>
                    </li>
                </ul>
            </nav>
        
            <!-- header action -->
            <div class="header-actions">
                <div class="language-selector">
                    <button class="header-language-toggle language-toggle" aria-label="switch site language" data-translation="language.toggle"
                        aria-haspopup="true" aria-expanded="false" aria-controls="language-menu">
                        <i class="fas fa-globe"></i>
                    </button>
        
                    <ul id="language-menu" class="language-menu" aria-label="language selection menu" data-translation="language.menu" hidden>
                        <li><button class="language-option active" data-language="en">English</button></li>
                        <li><button class="language-option" data-language="ar">العربية</button></li>
                    </ul>
                </div>
        
                <button id="theme-toggle" class="theme-toggle" aria-label="toggle color theme" data-translation="theme.toggle">
                    <i class="fas fa-sun"></i>
                </button>
            </div>
        </header>
    `,
    mobileNavigationMarkup: `
            <aside id="mobile-navigation" aria-label="mobile navigation menu" data-translation="navigation.mobile" hidden>
        
            <div class="mobile-navigation-header">
                <a href="index.html" class="brand-home-link mobile-brand-home-link">
                <picture>
                    <source srcset="/assets/images/branding/header-logo/header-logo.avif" type="image/avif">
                    <source srcset="/assets/images/branding/header-logo/header-logo.webp" type="image/webp">
                    <img src="/assets/images/branding/header-logo/header-logo.jpg" class="brand-logo" alt="personal developer brand logo" data-translation="brand.logo.alt"
                        width="60px" height="60px" loading="eager" decoding="auto">
                </picture>
                </a>
        
                <button id="nav-toggle-close" aria-label="close navigation menu"
                    data-translation="navigation.close">
                    <i class="fas fa-xmark"></i>
                </button>
            </div>
        
            <nav class="mobile-navigation" aria-label="mobile site navigation" data-translation="navigation.mobile.list">
                <ul class="mobile-navigation-list">
                    <li class="mobile-navigation-item">
                        <a href="index.html" class="mobile-navigation-link"
                            data-translation="navigation.home">Home</a>
                    </li>
                    <li class="mobile-navigation-item">
                        <a href="services.html" class="mobile-navigation-link"
                            data-translation="navigation.services">Services</a>
                    </li>
                    <li class="mobile-navigation-item">
                        <a href="projects.html" class="mobile-navigation-link"
                            data-translation="navigation.projects">Projects</a>
                    </li>
                    <li class="mobile-navigation-item">
                        <a href="about.html" class="mobile-navigation-link" data-translation="navigation.about">About</a>
                    </li>
                    <li class="mobile-navigation-item mobile-navigation-item-cta">
                        <a href="contact.html" class="mobile-navigation-link navigation-link-cta mobile-contact-cta"
                            data-translation="navigation.contact">Contact&ensp;<i class="fas fa-handshake"></i></a>
                    </li>
                </ul>
            </nav>
        
            <div class="mobile-navigation-actions">
                <div class="language-selector">
                    <button class="mobile-language-toggle language-toggle" aria-label="switch site language" data-translation="language.toggle"
                        aria-haspopup="true" aria-expanded="false" aria-controls="mobile-language-menu">
                        <i class="fas fa-globe"></i>
                    </button>
        
                    <ul id="mobile-language-menu" class="language-menu" aria-label="language selection menu" data-translation="language.menu" hidden>
                        <li><button class="language-option active" data-language="en">English</button></li>
                        <li><button class="language-option" data-language="ar">العربية</button></li>
                    </ul>
                </div>
        
                <button id="mobile-theme-toggle" class="theme-toggle" aria-label="toggle color theme" data-translation="theme.toggle">
                    <i class="fas fa-sun"></i>
                </button>
            </div>
        </aside>
    `,
    footerMarkup: `
    <footer>
        <div class="footer-container">
            <p class="footer-identity" data-translation="footer.identity">© 2026 Amer Developer. All rights reserved.</p>
            <a href="mailto:iamamer@gmail.com" data-translation="footer.email">Email:<span>iamamer@gmail.com</span></a>
            <a href="tel:+201280787721" data-translation="footer.phone">Phone:<span>201280787721</span></a>
            <a href="#hero-section" id="back-to-top" aria-label="scroll back to top" data-translation="footer.back-to-top"><i class="fas fa-chevron-up"></i></a>
        </div>
    </footer>
    `,
    inject() {
        documentBody.insertAdjacentHTML('afterbegin', this.headerMarkup);
        documentBody.insertAdjacentHTML('beforeend', this.footerMarkup);
        if (mainContent) {
            mainContent.insertAdjacentHTML('beforebegin', this.mobileNavigationMarkup);
        } else {
            documentBody.insertAdjacentHTML('afterbegin', this.mobileNavigationMarkup);
        }
    },
    init() {
        // -- تنفيذ الحقن --
        this.inject();

        // -- الوظائف والخصائص البرمجيه -- 
        // 1️⃣ التحكم في فتح وغلق قائمة الموبايل (Mobile Navigation)
        function setupMobileNavigationToggle() {
            const mobileNavigation = document.getElementById('mobile-navigation');
            const navigationOpenToggle = document.getElementById('nav-toggle-open');
            const navigationCloseToggle = document.getElementById('nav-toggle-close');

            // Fail fast (defensive check)
            if (!mobileNavigation || !navigationOpenToggle || !navigationCloseToggle) {
                console.warn('[Navigation] Mobile navigation elements not found');
                return;
            }

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
        }

        // 2️⃣ إدارة حالة الرابط النشط (Active Link)
        function syncActiveNavigationLink() {
            if (!pageData.currentPageData || pageData.currentPageData.error) return;

            const navigationLinks = document.querySelectorAll(
                '.navigation-link, .mobile-navigation-link'
            );

            const currentFileName = pageData.currentPageData.fileName;

            navigationLinks.forEach(link => {
                const href = link.getAttribute('href');
                const normalizedHref = href?.startsWith('/') ? href.slice(1) : href;
                const isActive = normalizedHref === currentFileName;

                link.classList.toggle('is-active', isActive);
            });
        }

        // // 3️⃣ ضم الأزرار لنظام تغيير اللغة(Language Switcher)
        // function setupLanguageSwitcher() {
        //     /* Elements */
        //     const languageToggleButtons = document.querySelectorAll('.language-toggle');

        //     /* Helpers */
        //     const getLanguageMenu = (toggleButton) =>
        //         document.getElementById(toggleButton.getAttribute('aria-controls'));

        //     const isLanguageMenuOpen = (menu) => menu && !menu.hidden;

        //     const openLanguageMenu = (toggleButton, menu) => {
        //         if (!menu) return;
        //         menu.hidden = false;
        //         toggleButton.setAttribute('aria-expanded', 'true');
        //     };

        //     const closeLanguageMenu = (toggleButton, menu) => {
        //         if (!menu) return;
        //         menu.hidden = true;
        //         toggleButton.setAttribute('aria-expanded', 'false');
        //     };

        //     const syncActiveLanguageOption = () => {
        //         document.querySelectorAll('.language-option').forEach(option => {
        //             option.classList.toggle(
        //                 'is-active',
        //                 option.dataset.language === /* currentLanguage */
        //             );
        //         });
        //     };

        //     const closeAllLanguageMenus = () => {
        //         languageToggleButtons.forEach(toggleButton => {
        //             const menu = getLanguageMenu(toggleButton);
        //             closeLanguageMenu(toggleButton, menu);
        //         });
        //     };

        //     /* Initialization  */
        //     syncActiveLanguageOption();

        //     /* Toggle Handling */
        //     languageToggleButtons.forEach(toggleButton => {
        //         const menu = getLanguageMenu(toggleButton);
        //         if (!menu) return;

        //         toggleButton.addEventListener('click', (event) => {
        //             event.stopPropagation();

        //             if (isLanguageMenuOpen(menu)) {
        //                 closeLanguageMenu(toggleButton, menu);
        //             } else {
        //                 closeAllLanguageMenus();
        //                 openLanguageMenu(toggleButton, menu);
        //             }
        //         });
        //     });

        //     /* Global Click Handling */
        //     document.addEventListener('click', (event) => {
        //         const languageOption = event.target.closest('.language-option');

        //         if (languageOption) {
        //             initLocalization.init(languageOption.dataset.language);
        //             syncActiveLanguageOption();
        //             closeAllLanguageMenus();
        //             return;
        //         }

        //         languageToggleButtons.forEach(toggleButton => {
        //             const menu = getLanguageMenu(toggleButton);
        //             if (!menu) return;

        //             if (
        //                 isLanguageMenuOpen(menu) &&
        //                 !toggleButton.contains(event.target) &&
        //                 !menu.contains(event.target)
        //             ) {
        //                 closeLanguageMenu(toggleButton, menu);
        //             }
        //         });
        //     });
        // }

        // // 4️⃣ تبديل الثيم (Dark / Light)
        // function setupThemeToggle() {
        //     const themeToggleButtons = document.querySelectorAll('.theme-toggle');
        //     const themeToggleIcons = document.querySelectorAll('.theme-toggle i');

        //     if (!themeToggleButtons.length || !themeToggleIcons.length) {
        //         console.warn('[Theme] Toggle elements not found');
        //     } else {
        //         const syncThemeToggleIcons = () => {
        //             const isLightTheme = /* currentTheme */ === 'light';

        //             themeToggleIcons.forEach(icon => {
        //                 icon.classList.toggle('fa-sun', !isLightTheme);
        //                 icon.classList.toggle('fa-moon', isLightTheme);
        //             });
        //         };

        //         syncThemeToggleIcons();

        //         themeToggleButtons.forEach(toggleButton => {
        //             toggleButton.addEventListener('click', () => {
        //                 themeManager.init();
        //                 syncThemeToggleIcons();
        //             });
        //         });
        //     }
        // }

        // -- استدعاءات المهام -- 
        /* 1️⃣ */ setupMobileNavigationToggle();
        /* 2️⃣ */ syncActiveNavigationLink();
        // /* 3️⃣ */ setupLanguageSwitcher();
        // /* 4️⃣ */ setupThemeToggle();
    }
}


// =====================
// APP INITIALIZATION
// =====================
function initApp() {
    siteChrome.init();
}


// FINNALY, LISTEN FOR DOM CONTENT LOADED EVENT AND INIT APP
document.addEventListener('DOMContentLoaded', initApp);
// 📁 shared/scripts/shared-layout.js

/*
========================================
-
- نظام توليد العناصر المشتركه بين الصفحات
-
========================================
*/

const layoutRegistry = {
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
                    <source srcset="image.avif" type="image/avif">
                    <source srcset="image.webp" type="image/webp">
                    <img src="image.jpg" class="brand-logo" alt="personal developer brand logo"
                        data-translation="brand.logo.alt" width="60px" height="60px" loading="eager" decoding="auto">
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
                        <source srcset="image.avif" type="image/avif">
                        <source srcset="image.webp" type="image/webp">
                        <img src="image.jpg" class="brand-logo mobile-brand-logo" alt="personal developer brand logo"
                            data-translation="brand.logo.alt" width="60px" height="60px" loading="eager" decoding="auto">
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
    `
};

function injectSharedLayout() {
    const documentBody = document.body;
    const mainContent = document.querySelector('main');

    documentBody.insertAdjacentHTML('afterbegin', layoutRegistry.headerMarkup);
    documentBody.insertAdjacentHTML('beforeend', layoutRegistry.footerMarkup);

    if (mainContent) {
        mainContent.insertAdjacentHTML(
            'beforebegin',
            layoutRegistry.mobileNavigationMarkup
        );
    } else {
        documentBody.insertAdjacentHTML(
            'afterbegin',
            layoutRegistry.mobileNavigationMarkup
        );
    }
}

document.addEventListener('DOMContentLoaded', injectSharedLayout);


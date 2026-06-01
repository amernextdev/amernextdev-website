document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[data-section]');
    const navLinks = document.querySelectorAll('.nav_link');
    function updateActiveNav() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.scrollY;
            if (scrollPosition >= sectionTop && 
                scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('data-section');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active-link');
            const linkHref = link.getAttribute('href').replace('#', '');
            if (linkHref === currentSection) {
                link.classList.add('active-link');
            }
        });
        if (!currentSection && window.scrollY < 100) {
            navLinks.forEach(link => {
                link.classList.remove('active-link');
                if (link.getAttribute('href') === '#home') {
                    link.classList.add('active-link');
                }
            });
        }
    }
    window.addEventListener('load', updateActiveNav);
    window.addEventListener('scroll', updateActiveNav);
    let scrollTimer;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(updateActiveNav, 50);
    });
    const homeLink = document.querySelector('.nav_link[href="#home"]');
    if (homeLink && !document.querySelector('.nav_link.active-link')) {
        homeLink.classList.add('active-link');
    }
});
const roles = {
    en: ['Front-end Developer', 'Back-end Developer', 'Full-stack Developer'],
    ar: ['مطوّر واجهات أمامية', 'مطوّر واجهات خلفية', 'مطوّر متكامل'],
    de: ['Frontend-Entwickler', 'Backend-Entwickler', 'Fullstack-Entwickler'],
    fr: ['Développeur Front-end', 'Développeur Back-end', 'Développeur Full-stack'],
    es: ['Desarrollador Front-end', 'Desarrollador Back-end', 'Desarrollador Full-stack'],
    ru: ['Фронтенд-разработчик', 'Бэкенд-разработчик', 'Фуллстек-разработчик'],
    pt: ['Desenvolvedor Front-end', 'Desenvolvedor Back-end', 'Desenvolvedor Full-stack']
  };
  let currentRoleIndex = 0;
  let currentCharIndex = 0;
  let currentRoles = [];
  let isDeleting = false;
  let typingSpeed = 100;
  let deletingSpeed = 50;
  let pauseBetweenRoles = 2000;
  const typingElement = document.getElementById('typing-text');
  const htmlElement = document.documentElement;
  function getCurrentLanguage() {
    return htmlElement.getAttribute('data-translation') || 'en';
  }
  function updateRolesForLanguage() {
    const lang = getCurrentLanguage();
    currentRoles = roles[lang] || roles.en;
    currentRoleIndex = 0;
    currentCharIndex = 0;
    isDeleting = false;
  }
  function typeRole() {
    const currentRole = currentRoles[currentRoleIndex];
    if (!typingElement) return;
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      typingSpeed = deletingSpeed;
    } else {
      typingElement.textContent = currentRole.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      typingSpeed = 100;
    }
    if (!isDeleting && currentCharIndex === currentRole.length) {
      typingSpeed = pauseBetweenRoles;
      isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentRoleIndex = (currentRoleIndex + 1) % currentRoles.length;
      typingSpeed = 500; // وقفة قبل البدء بالدور الجديد
    }
    setTimeout(typeRole, typingSpeed);
  }
  function observeLanguageChanges() {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-translation') {
          updateRolesForLanguage();
        }
      });
    });
    observer.observe(htmlElement, {
      attributes: true,
      attributeFilter: ['data-translation']
    });
  }
  function initTypingEffect() {
    if (!typingElement) {
      console.warn('لم يتم العثور على عنصر الكتابة');
      return;
    }
    updateRolesForLanguage();
    observeLanguageChanges();
    setTimeout(typeRole, 1000);
  }
  document.addEventListener('DOMContentLoaded', initTypingEffect);
class AdvancedLanguageManager {
    constructor() {
        this.config = {
            supportedLanguages: ['en', 'ar', 'de', 'fr', 'es', 'ru', 'pt'],
            defaultLanguage: 'en',
            translationFile: 'assets/data/transltion.json',
            storageKey: 'amer_dev_preferred_language',
            languageGroups: {
                'ar': 'arabic',
                'ru': 'cyrillic',
                'default': 'latin'
            }
        };
        this.state = {
            currentLanguage: this.config.defaultLanguage,
            translations: {},
            isInitialized: false,
            isLoading: false
        };
        this.elements = {
            html: document.documentElement,
            languageSwitcher: document.getElementById('language-switcher'),
            languageMenu: document.getElementById('language-menu'),
            toast: document.getElementById('toast')
        };
        this.init();
    }
    async init() {
        try {
            console.log('🚀 بدء تهيئة نظام إدارة اللغات...');
            await this.loadTranslations();
            this.detectAndSetLanguage();
            this.setupUI();
            this.setupEventListeners();
            this.state.isInitialized = true;
            console.log('✅ نظام إدارة اللغات جاهز للعمل');
        } catch (error) {
            console.error('❌ فشل تهيئة نظام اللغات:', error);
            this.handleInitializationError(error);
        }
    }
    async loadTranslations() {
        try {
            console.log('📥 جاري تحميل بيانات الترجمات...');
            const response = await fetch(this.config.translationFile);
            if (!response.ok) {
                throw new Error(`فشل تحميل ملف الترجمات: ${response.status}`);
            }
            this.state.translations = await response.json();
            console.log('✅ تم تحميل بيانات الترجمات بنجاح');
        } catch (error) {
            console.error('❌ خطأ في تحميل ملف الترجمات:', error);
            this.state.translations = this.getFallbackTranslations();
            console.warn('⚠️ استخدام الترجمات الافتراضية للطوارئ');
        }
    }
    getFallbackTranslations() {
        return {
            en: { website_title: "Amer Developer | Portfolio" },
            ar: { website_title: "عامر ديفيلوبر | Portfolio" },
            de: { website_title: "Amer Developer | Portfolio" },
            fr: { website_title: "Amer Developer | Portfolio" },
            es: { website_title: "Amer Developer | Portfolio" },
            ru: { website_title: "Amer Developer | Portfolio" },
            pt: { website_title: "Amer Developer | Portfolio" }
        };
    }
    detectAndSetLanguage() {
        const detectedLang = this.detectLanguage();
        this.changeLanguage(detectedLang, false); // false = لا تظهر رسالة نجاح
    }
    detectLanguage() {
        const urlLang = this.getLanguageFromURL();
        if (urlLang) {
            console.log('🌐 تم اكتشاف اللغة من الرابط:', urlLang);
            return urlLang;
        }
        const storedLang = this.getLanguageFromStorage();
        if (storedLang) {
            console.log('💾 تم استعادة اللغة من التخزين المحلي:', storedLang);
            return storedLang;
        }
        const browserLang = this.getLanguageFromBrowser();
        if (browserLang) {
            console.log('🔍 تم اكتشاف لغة المتصفح:', browserLang);
            return browserLang;
        }
        console.log('⚙️ استخدام اللغة الافتراضية:', this.config.defaultLanguage);
        return this.config.defaultLanguage;
    }
    getLanguageFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        return this.isLanguageSupported(langParam) ? langParam : null;
    }
    getLanguageFromStorage() {
        try {
            const storedLang = localStorage.getItem(this.config.storageKey);
            return this.isLanguageSupported(storedLang) ? storedLang : null;
        } catch (error) {
            console.warn('⚠️ لا يمكن الوصول إلى التخزين المحلي:', error);
            return null;
        }
    }
    getLanguageFromBrowser() {
        const browserLang = navigator.language.split('-')[0];
        return this.isLanguageSupported(browserLang) ? browserLang : null;
    }
    isLanguageSupported(lang) {
        return lang && this.config.supportedLanguages.includes(lang);
    }
    async changeLanguage(lang, showSuccessMessage = true) {
        if (!this.isLanguageSupported(lang)) {
            console.warn('⚠️ اللغة غير مدعومة:', lang);
            return false;
        }
        if (lang === this.state.currentLanguage) {
            console.log('ℹ️ اللغة الحالية هي نفس اللغة المطلوبة');
            return true;
        }
        this.state.isLoading = true;
        this.showLoadingState();
        try {
            await this.applyLanguageChanges(lang);
            this.state.currentLanguage = lang;
            this.saveLanguagePreference(lang);
            this.updateLanguageSwitcherUI(lang);
            if (showSuccessMessage) {
                this.showSuccessMessage(lang);
            }
            console.log('✅ تم تغيير اللغة بنجاح إلى:', lang);
            return true;
        } catch (error) {
            console.error('❌ فشل تغيير اللغة:', error);
            this.showErrorMessage();
            return false;
        } finally {
            this.state.isLoading = false;
            this.hideLoadingState();
        }
    }
    async applyLanguageChanges(lang) {
        this.elements.html.setAttribute('lang', lang);
        this.elements.html.setAttribute('data-translation', lang);
        this.updateLanguageGroup(lang);
        this.applyTextTranslations(lang);
        this.updatePageTitle(lang);
        this.updateSEOTags(lang);
        this.dispatchLanguageChangeEvent(lang);
    }
    updateLanguageGroup(lang) {
        const languageGroup = this.config.languageGroups[lang] || this.config.languageGroups.default;
        this.elements.html.setAttribute('data-language-group', languageGroup);
    }
    applyTextTranslations(lang) {
        const translationData = this.state.translations[lang] || this.state.translations[this.config.defaultLanguage];
        if (!translationData) {
            console.error('❌ لا توجد ترجمات للغة:', lang);
            return;
        }
        const translatableElements = document.querySelectorAll('[data-trans]');
        let translatedCount = 0;
        translatableElements.forEach(element => {
            const translationKey = element.getAttribute('data-trans');
            if (translationData[translationKey]) {
                this.translateElement(element, translationData[translationKey]);
                translatedCount++;
            } else {
                console.warn('⚠️ مفتاح ترجمة غير موجود:', translationKey);
            }
        });
        console.log(`🔄 تم ترجمة ${translatedCount} عنصر للغة ${lang}`);
    }
    translateElement(element, translatedText) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = translatedText;
        } else if (element.tagName === 'IMG') {
            element.alt = translatedText;
        } else {
            element.textContent = translatedText;
        }
    }
    updatePageTitle(lang) {
        const translationData = this.state.translations[lang];
        if (translationData && translationData.website_title) {
            document.title = translationData.website_title;
        }
    }
    updateSEOTags(lang) {
        this.removeOldHreflangTags();
        this.addHreflangTags();
        this.updateCanonicalLink(lang);
    }
    removeOldHreflangTags() {
        const oldTags = document.querySelectorAll('link[rel="alternate"][hreflang]');
        oldTags.forEach(tag => tag.remove());
    }
    addHreflangTags() {
        this.config.supportedLanguages.forEach(lang => {
            const link = document.createElement('link');
            link.rel = 'alternate';
            link.hreflang = lang;
            link.href = this.generateLanguageURL(lang);
            document.head.appendChild(link);
        });
    }
    updateCanonicalLink(lang) {
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.rel = 'canonical';
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.href = this.generateLanguageURL(lang);
    }
    generateLanguageURL(lang) {
        const currentURL = new URL(window.location.href);
        if (lang === this.config.defaultLanguage) {
            currentURL.searchParams.delete('lang');
        } else {
            currentURL.searchParams.set('lang', lang);
        }
        return currentURL.toString();
    }
    saveLanguagePreference(lang) {
        try {
            localStorage.setItem(this.config.storageKey, lang);
        } catch (error) {
            console.warn('⚠️ لا يمكن حفظ التفضيل في التخزين المحلي:', error);
        }
    }
    setupUI() {
        this.setupLanguageSwitcher();
        this.updateLanguageSwitcherUI(this.state.currentLanguage);
    }
    setupLanguageSwitcher() {
        if (!this.elements.languageSwitcher || !this.elements.languageMenu) {
            console.warn('⚠️ لم يتم العثور على عناصر تبديل اللغة');
            return;
        }
        this.elements.languageSwitcher.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleLanguageMenu();
        });
        const languageItems = this.elements.languageMenu.querySelectorAll('li[data-lang]');
        languageItems.forEach(item => {
            item.addEventListener('click', () => {
                const selectedLang = item.getAttribute('data-lang');
                this.handleLanguageSelection(selectedLang);
            });
        });
        document.addEventListener('click', () => {
            this.closeLanguageMenu();
        });
        console.log('✅ تم إعداد واجهة تبديل اللغات');
    }
    handleLanguageSelection(lang) {
        this.changeLanguage(lang);
        this.closeLanguageMenu();
    }
    toggleLanguageMenu() {
        const isHidden = this.elements.languageMenu.hidden;
        if (isHidden) {
            this.elements.languageMenu.hidden = false;
            this.elements.languageSwitcher.classList.add('active');
        } else {
            this.elements.languageMenu.hidden = true;
            this.elements.languageSwitcher.classList.remove('active');
        }
    }
    closeLanguageMenu() {
        this.elements.languageMenu.hidden = true;
        this.elements.languageSwitcher.classList.remove('active');
    }
    updateLanguageSwitcherUI(lang) {
        const languageItems = this.elements.languageMenu.querySelectorAll('li[data-lang]');
        languageItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-lang') === lang) {
                item.classList.add('active');
            }
        });
    }
    setupEventListeners() {
        this.setupAttributeObserver();
        document.addEventListener('languageChanged', (event) => {
            console.log('🔄 تم استقبال حدث تغيير اللغة:', event.detail.language);
        });
    }
    setupAttributeObserver() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && 
                    mutation.attributeName === 'data-translation') {
                    const newLang = this.elements.html.getAttribute('data-translation');
                    if (newLang && newLang !== this.state.currentLanguage) {
                        console.log('🔍 تم اكتشاف تغيير اللغة:', newLang);
                        this.changeLanguage(newLang, false);
                    }
                }
            });
        });
        observer.observe(this.elements.html, {
            attributes: true,
            attributeFilter: ['data-translation']
        });
    }
    dispatchLanguageChangeEvent(lang) {
        const event = new CustomEvent('languageChanged', {
            detail: { 
                language: lang,
                timestamp: new Date().toISOString()
            }
        });
        document.dispatchEvent(event);
    }
    showLoadingState() {
        this.elements.languageSwitcher.style.opacity = '0.7';
    }
    hideLoadingState() {
        this.elements.languageSwitcher.style.opacity = '1';
    }
    showSuccessMessage(lang) {
        const languageNames = {
            'en': 'English',
            'ar': 'العربية',
            'de': 'Deutsch',
            'fr': 'Français',
            'es': 'Español',
            'ru': 'Русский',
            'pt': 'Português'
        };
        const langName = languageNames[lang] || lang;
        this.showToast(`🌐 تم التغيير إلى ${langName}`, 'success');
    }
    showErrorMessage() {
        this.showToast('❌ فشل تغيير اللغة', 'error');
    }
    showToast(message, type = 'info') {
        if (!this.elements.toast) {
            console.log('📢', message);
            return;
        }
        this.elements.toast.textContent = message;
        this.elements.toast.className = `toast alert ${type} show`;
        setTimeout(() => {
            this.elements.toast.classList.remove('show');
        }, 3000);
    }
    handleInitializationError(error) {
        console.error('❌ خطأ حرج في تهيئة النظام:', error);
        this.showToast('⚠️ حدث خطأ في تحميل النظام', 'error');
    }
    getCurrentLanguage() {
        return this.state.currentLanguage;
    }
    getSupportedLanguages() {
        return [...this.config.supportedLanguages];
    }
    isSupported(lang) {
        return this.isLanguageSupported(lang);
    }
    setLanguage(lang) {
        return this.changeLanguage(lang);
    }
    async reloadTranslations() {
        await this.loadTranslations();
        await this.applyTextTranslations(this.state.currentLanguage);
    }
}
window.languageManager = new AdvancedLanguageManager();
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 نظام إدارة اللغات جاهز للاستخدام');
});
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;
    const defaultTheme = 'dark';
    const storageKey = 'amer_dev_theme_preference';
    function getCurrentTheme() {
        const storedTheme = localStorage.getItem(storageKey);
        return storedTheme || defaultTheme;
    }
    function applyTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        const oppositeTheme = theme === 'dark' ? 'light' : 'dark';
        themeToggle.setAttribute('title', `Switch to ${oppositeTheme} mode`);
        themeToggle.setAttribute('aria-label', `Toggle ${oppositeTheme} mode`);
        localStorage.setItem(storageKey, theme);
        console.log(`🎨 تم التغيير إلى الوضع ${theme === 'dark' ? 'الداكن' : 'الفاتح'}`);
    }
    function toggleTheme() {
        const currentTheme = getCurrentTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    }
    function setupThemeEvents() {
        if (themeToggle && themeIcon) {
            themeToggle.addEventListener('click', toggleTheme);
            themeToggle.style.cursor = 'pointer';
            themeToggle.style.transition = 'all 0.3s ease';
            console.log('✅ تم إعداد نظام الثيمات بنجاح');
        } else {
            console.warn('⚠️ لم يتم العثور على عناصر الثيم');
        }
    }
    function initTheme() {
        const currentTheme = getCurrentTheme();
        applyTheme(currentTheme);
        setupThemeEvents();
    }
    initTheme();
});
class ServiceOrderManager {
    constructor() {
        this.elements = {
            orderServiceBtn: document.getElementById('order-service-btn'),
            servicesSection: document.getElementById('services'),
            servicesActions: document.getElementById('services-actions'),
            servicesGrid: document.getElementById('services-grid'),
            cancelSelectionBtn: document.getElementById('cancel-selection'),
            confirmOrderBtn: document.getElementById('confirm-order'),
            contactSection: document.getElementById('contact'),
            messageTextarea: document.getElementById('message')
        };
        this.state = {
            isServiceSectionActive: false,
            isSelectionMode: false,
            selectedServices: new Set(),
            scrollThreshold: 100, // المسافة من أعلى/أسفل القسم لاعتباره نشط
            scrollDebounceTimer: null
        };
        this.init();
    }
    init() {
        console.log('🚀 بدء تهيئة نظام إدارة الخدمات...');
        this.setupEventListeners();
        this.checkServiceSectionVisibility();
        console.log('✅ نظام إدارة الخدمات جاهز للعمل');
    }
    setupEventListeners() {
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
        window.addEventListener('resize', () => {
            this.checkServiceSectionVisibility();
        });
        if (this.elements.orderServiceBtn) {
            this.elements.orderServiceBtn.addEventListener('click', () => {
                this.activateSelectionMode();
            });
        }
        if (this.elements.cancelSelectionBtn) {
            this.elements.cancelSelectionBtn.addEventListener('click', () => {
                this.deactivateSelectionMode();
            });
        }
        if (this.elements.confirmOrderBtn) {
            this.elements.confirmOrderBtn.addEventListener('click', () => {
                this.confirmOrder();
            });
        }
    }
    handleScroll() {
        clearTimeout(this.state.scrollDebounceTimer);
        this.state.scrollDebounceTimer = setTimeout(() => {
            this.checkServiceSectionVisibility();
        }, 50); // تأخير 50ms لتجنب التكرار المفرط
    }
    checkServiceSectionVisibility() {
        if (!this.elements.servicesSection) return;
        const sectionRect = this.elements.servicesSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const distanceFromTop = sectionRect.top;
        const distanceFromBottom = sectionRect.bottom;
        const isActive = (
            distanceFromTop <= (windowHeight - this.state.scrollThreshold) &&
            distanceFromBottom >= this.state.scrollThreshold
        );
        if (isActive !== this.state.isServiceSectionActive) {
            this.state.isServiceSectionActive = isActive;
            this.toggleOrderButton(isActive);
        }
    }
    toggleOrderButton(show) {
        if (!this.elements.orderServiceBtn) return;
        if (show && !this.state.isSelectionMode) {
            this.elements.orderServiceBtn.hidden = false;
            this.elements.orderServiceBtn.style.opacity = '0';
            requestAnimationFrame(() => {
                this.elements.orderServiceBtn.style.transition = 'opacity 0.3s ease';
                this.elements.orderServiceBtn.style.opacity = '1';
            });
        } else {
            this.elements.orderServiceBtn.style.opacity = '0';
            setTimeout(() => {
                this.elements.orderServiceBtn.hidden = true;
                this.elements.orderServiceBtn.style.opacity = '1';
            }, 300);
        }
    }
    activateSelectionMode() {
        console.log('🎯 تفعيل وضع اختيار الخدمات...');
        this.state.isSelectionMode = true;
        this.state.selectedServices.clear();
        this.toggleOrderButton(false);
        this.showServiceActions();
        this.enableServiceSelection();
        this.addSelectionModeEffects();
    }
    deactivateSelectionMode() {
        console.log('↩️ إلغاء وضع اختيار الخدمات...');
        this.state.isSelectionMode = false;
        this.state.selectedServices.clear();
        this.hideServiceActions();
        this.disableServiceSelection();
        if (this.state.isServiceSectionActive) {
            this.toggleOrderButton(true);
        }
        this.removeSelectionModeEffects();
    }
    showServiceActions() {
        if (!this.elements.servicesActions) return;
        this.elements.servicesActions.hidden = false;
        this.elements.servicesActions.style.opacity = '0';
        this.elements.servicesActions.style.transform = 'translateY(20px)';
        requestAnimationFrame(() => {
            this.elements.servicesActions.style.transition = 'all 0.4s ease';
            this.elements.servicesActions.style.opacity = '1';
            this.elements.servicesActions.style.transform = 'translateY(0)';
        });
    }
    hideServiceActions() {
        if (!this.elements.servicesActions) return;
        this.elements.servicesActions.style.opacity = '0';
        this.elements.servicesActions.style.transform = 'translateY(20px)';
        setTimeout(() => {
            this.elements.servicesActions.hidden = true;
            this.elements.servicesActions.style.opacity = '1';
            this.elements.servicesActions.style.transform = 'translateY(0)';
        }, 400);
    }
    enableServiceSelection() {
        const serviceCards = this.elements.servicesGrid.querySelectorAll('.service-card.selectable');
        serviceCards.forEach(card => {
            if (!card.hasAttribute('data-selection-listener')) {
                card.addEventListener('click', this.handleServiceCardClick.bind(this));
                card.setAttribute('data-selection-listener', 'true');
            }
            card.classList.add('selection-enabled');
        });
    }
    disableServiceSelection() {
        const serviceCards = this.elements.servicesGrid.querySelectorAll('.service-card.selectable');
        serviceCards.forEach(card => {
            card.classList.remove('selection-enabled', 'selected');
        });
    }
    handleServiceCardClick(event) {
        const card = event.currentTarget;
        const serviceType = card.getAttribute('data-service');
        if (!serviceType) return;
        if (card.classList.contains('selected')) {
            card.classList.remove('selected');
            this.state.selectedServices.delete(serviceType);
        } else {
            card.classList.add('selected');
            this.state.selectedServices.add(serviceType);
        }
        console.log('📦 الخدمات المختارة:', Array.from(this.state.selectedServices));
        this.updateConfirmButtonState();
    }
    updateConfirmButtonState() {
        if (!this.elements.confirmOrderBtn) return;
        const hasSelection = this.state.selectedServices.size > 0;
        if (hasSelection) {
            this.elements.confirmOrderBtn.disabled = false;
            this.elements.confirmOrderBtn.style.opacity = '1';
            this.elements.confirmOrderBtn.style.cursor = 'pointer';
        } else {
            this.elements.confirmOrderBtn.disabled = true;
            this.elements.confirmOrderBtn.style.opacity = '0.6';
            this.elements.confirmOrderBtn.style.cursor = 'not-allowed';
        }
    }
    confirmOrder() {
        if (this.state.selectedServices.size === 0) {
            console.warn('⚠️ لم يتم اختيار أي خدمات');
            return;
        }
        console.log('✅ تأكيد طلب الخدمات:', Array.from(this.state.selectedServices));
        const message = this.generateOrderMessage();
        this.scrollToContactForm();
        this.fillContactMessage(message);
        this.deactivateSelectionMode();
    }
    generateOrderMessage() {
        const services = Array.from(this.state.selectedServices);
        const serviceCards = this.elements.servicesGrid.querySelectorAll('.service-card.selectable');
        let message = "Hello,\n\nI would like to order the following services:\n\n";
        services.forEach(serviceType => {
            const card = Array.from(serviceCards).find(card => 
                card.getAttribute('data-service') === serviceType
            );
            if (card) {
                const serviceMessage = card.getAttribute('data-message');
                if (serviceMessage) {
                    message += `• ${serviceMessage}\n`;
                }
            }
        });
        message += "\nPlease contact me to discuss the details.\n\nThank you!";
        return message;
    }
scrollToContactForm() {
    if (!this.elements.contactSection || !this.elements.messageTextarea) return;
    const messageField = this.elements.messageTextarea;
    const messagePosition = messageField.offsetTop;
    const headerOffset = 100; // مسافة من الأعلى تشمل الهيدر + مسافة بسيطة
    const targetPosition = messagePosition - headerOffset;
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
    console.log('📍 التمرير إلى حقل الرسالة في قسم التواصل - الموضع:', targetPosition);
}
fillContactMessage(message) {
    if (!this.elements.messageTextarea) return;
    setTimeout(() => {
        this.elements.messageTextarea.value = message;
        this.elements.messageTextarea.focus();
        this.ensureFieldVisibility();
        console.log('📝 تم تعبئة رسالة الطلب تلقائياً');
    }, 600);
}
ensureFieldVisibility() {
    const field = this.elements.messageTextarea;
    const fieldRect = field.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    if (fieldRect.top < 70 || fieldRect.bottom > viewportHeight) {
        const adjustPosition = fieldRect.top + window.pageYOffset - 120;
        window.scrollTo({
            top: adjustPosition,
            behavior: 'smooth'
        });
    }
    this.highlightMessageField();
}
    fillContactMessage(message) {
        if (!this.elements.messageTextarea) return;
        setTimeout(() => {
            this.elements.messageTextarea.value = message;
            this.elements.messageTextarea.focus();
            this.elements.messageTextarea.style.transition = 'all 0.3s ease';
            this.elements.messageTextarea.style.boxShadow = '0 0 0 3px rgba(0, 255, 255, 0.3)';
            setTimeout(() => {
                this.elements.messageTextarea.style.boxShadow = '';
            }, 2000);
            console.log('📝 تم تعبئة رسالة الطلب تلقائياً');
        }, 800);
    }
    addSelectionModeEffects() {
        document.body.classList.add('service-selection-mode');
    }
    removeSelectionModeEffects() {
        document.body.classList.remove('service-selection-mode');
    }
    reset() {
        this.deactivateSelectionMode();
        this.state.selectedServices.clear();
    }
}
function addServiceSelectionStyles() {
    const style = document.createElement('style');
    style.textContent = `
        body.service-selection-mode {
            cursor: default;
        }
        .service-card.selection-enabled {
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
        }
        .service-card.selection-enabled:hover {
            transform: translateY(-5px) scale(1.02);
            border-color: var(--accent-primary);
            box-shadow: 0 10px 25px rgba(0, 255, 255, 0.15);
        }
        .service-card.selection-enabled:active {
            transform: translateY(-2px) scale(1.01);
        }
        .service-card.selected {
            border-color: var(--accent-primary);
            background: linear-gradient(135deg, var(--card-bg), rgba(0, 255, 255, 0.05));
            box-shadow: 0 8px 20px rgba(0, 255, 255, 0.2);
            transform: translateY(-5px);
        }
        .service-card.selected::before {
            content: '✓';
            position: absolute;
            top: 15px;
            right: 15px;
            width: 25px;
            height: 25px;
            background: var(--accent-primary);
            color: var(--primary-bg);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 0.9rem;
            z-index: 2;
        }
        .services-actions {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin: 30px 0;
            flex-wrap: wrap;
        }
        @media (max-width: 768px) {
            .services-actions {
                flex-direction: column;
                align-items: center;
            }
            .services-actions .btn {
                min-width: 200px;
            }
        }
        #message:focus {
            border-color: var(--accent-primary);
            box-shadow: 0 0 0 3px rgba(0, 255, 255, 0.3);
        }
    `;
    document.head.appendChild(style);
}
window.serviceOrderManager = new ServiceOrderManager();
document.addEventListener('DOMContentLoaded', function() {
    addServiceSelectionStyles();
    console.log('🎨 تم تحميل أنماط نظام الخدمات');
});
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 نظام إدارة طلبات الخدمات جاهز للعمل');
});
class FormManager {
    constructor() {
        this.config = {
            whatsappNumber: '201280787721',
            emailAddress: 'iamamer030@gmail.com',
            responseTime: '24 hours',
            maxMessageLength: 1000
        };
        this.elements = {
            form: document.getElementById('contact-form'),
            nameInput: document.getElementById('name'),
            contactInput: document.getElementById('email'),
            messageInput: document.getElementById('message'),
            sendEmailBtn: document.getElementById('send-email'),
            sendWhatsappBtn: document.getElementById('send-whatsapp'),
            toast: document.getElementById('toast')
        };
        this.init();
    }
    init() {
        console.log('🚀 بدء تهيئة نظام إدارة الفورم...');
        try {
            this.setupEventListeners();
            console.log('✅ نظام إدارة الفورم جاهز للعمل');
        } catch (error) {
            console.error('❌ فشل تهيئة نظام الفورم:', error);
            this.showToast('System initialization failed', 'error');
        }
    }
    setupEventListeners() {
        this.elements.sendEmailBtn.addEventListener('click', () => this.handleEmailSend());
        this.elements.sendWhatsappBtn.addEventListener('click', () => this.handleWhatsAppSend());
        this.elements.nameInput.addEventListener('blur', () => this.validateName());
        this.elements.contactInput.addEventListener('blur', () => this.validateContact());
        this.elements.messageInput.addEventListener('blur', () => this.validateMessage());
        this.elements.form.addEventListener('submit', (e) => e.preventDefault());
        console.log('✅ تم إعداد مستمعي الأحداث');
    }
    validateForm() {
        const isNameValid = this.validateName();
        const isContactValid = this.validateContact();
        const isMessageValid = this.validateMessage();
        return isNameValid && isContactValid && isMessageValid;
    }
    validateName() {
        const name = this.elements.nameInput.value.trim();
        const errorElement = document.getElementById('name-error');
        if (!name) {
            this.showFieldError(errorElement, 'Name is required');
            return false;
        }
        if (name.length < 2) {
            this.showFieldError(errorElement, 'Name must be at least 2 characters');
            return false;
        }
        if (name.length > 50) {
            this.showFieldError(errorElement, 'Name must be less than 50 characters');
            return false;
        }
        this.hideFieldError(errorElement);
        return true;
    }
    validateContact() {
        const contact = this.elements.contactInput.value.trim();
        const errorElement = document.getElementById('email-error');
        if (!contact) {
            this.showFieldError(errorElement, 'Email or phone is required');
            return false;
        }
        const contactType = this.detectContactType(contact);
        if (contactType === 'email') {
            if (!this.isValidEmail(contact)) {
                this.showFieldError(errorElement, 'Please enter a valid email address');
                return false;
            }
        } else if (contactType === 'phone') {
            if (!this.isValidPhone(contact)) {
                this.showFieldError(errorElement, 'Please enter a valid phone number');
                return false;
            }
        } else {
            this.showFieldError(errorElement, 'Please enter a valid email or phone number');
            return false;
        }
        this.hideFieldError(errorElement);
        return true;
    }
    validateMessage() {
        const message = this.elements.messageInput.value.trim();
        const errorElement = document.getElementById('message-error');
        if (!message) {
            this.showFieldError(errorElement, 'Message is required');
            return false;
        }
        if (message.length < 10) {
            this.showFieldError(errorElement, 'Message must be at least 10 characters');
            return false;
        }
        if (message.length > this.config.maxMessageLength) {
            this.showFieldError(errorElement, `Message must be less than ${this.config.maxMessageLength} characters`);
            return false;
        }
        this.hideFieldError(errorElement);
        return true;
    }
    detectContactType(contact) {
        if (contact.includes('@')) {
            return 'email';
        }
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        if (phoneRegex.test(contact)) {
            return 'phone';
        }
        return 'unknown';
    }
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    isValidPhone(phone) {
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        const phoneRegex = /^[\+]?[0-9]{8,15}$/;
        return phoneRegex.test(cleanPhone);
    }
    showFieldError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        const input = errorElement.previousElementSibling;
        if (input) {
            input.style.borderColor = 'var(--error)';
        }
    }
    hideFieldError(errorElement) {
        errorElement.classList.remove('show');
        const input = errorElement.previousElementSibling;
        if (input) {
            input.style.borderColor = '';
        }
    }
    getFormData() {
        return {
            name: this.elements.nameInput.value.trim(),
            contact: this.elements.contactInput.value.trim(),
            message: this.elements.messageInput.value.trim(),
            contactType: this.detectContactType(this.elements.contactInput.value.trim())
        };
    }
    createMessage(formData) {
        const contactInfo = formData.contactType === 'email' 
            ? `You can reach me via email: ${formData.contact}`
            : `You can reach me via phone: ${formData.contact}`;
        return `Hello,
My name is ${formData.name}.
${contactInfo}
I would like to share the following message:
"${formData.message}"
Thank you for your time and consideration. I look forward to your reply.
Best regards,
${formData.name}`;
    }
    handleEmailSend() {
        console.log('📧 بدء عملية الإرسال عبر الإيميل...');
        if (!this.validateForm()) {
            this.showToast('Please fix the errors in the form', 'error');
            return;
        }
        const formData = this.getFormData();
        try {
            this.sendViaEmail(formData);
            this.showSuccessMessage();
        } catch (error) {
            console.error('❌ فشل الإرسال عبر الإيميل:', error);
            this.showToast('Failed to send email. Please try again.', 'error');
        }
    }
    sendViaEmail(formData) {
        const subject = `New Contact Message from ${formData.name}`;
        const body = this.createMessage(formData);
        const mailtoLink = `mailto:${this.config.emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailtoLink, '_blank');
        console.log('✅ تم فتح عميل الإيميل للرسالة');
    }
    handleWhatsAppSend() {
        console.log('💬 بدء عملية الإرسال عبر واتساب...');
        if (!this.validateForm()) {
            this.showToast('Please fix the errors in the form', 'error');
            return;
        }
        const formData = this.getFormData();
        try {
            this.sendViaWhatsApp(formData);
            this.showSuccessMessage();
        } catch (error) {
            console.error('❌ فشل الإرسال عبر واتساب:', error);
            this.showToast('Failed to open WhatsApp. Please try again.', 'error');
        }
    }
    sendViaWhatsApp(formData) {
        const message = this.createMessage(formData);
        const cleanPhone = this.config.whatsappNumber.replace(/[\s\-\(\)]/g, '');
        const whatsappLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
        console.log('✅ تم فتح واتساب للرسالة');
    }
    showSuccessMessage() {
        this.showToast(`Message sent successfully! We will contact you within ${this.config.responseTime}`, 'success');
        setTimeout(() => {
            this.resetForm();
        }, 2000);
    }
    resetForm() {
        this.elements.form.reset();
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            this.hideFieldError(element);
        });
        console.log('🔄 تم إعادة تعيين الفورم');
    }
    showToast(message, type = 'info') {
        if (!this.elements.toast) {
            console.log('📢', message);
            return;
        }
        this.elements.toast.textContent = message;
        this.elements.toast.className = `toast alert ${type} show`;
        setTimeout(() => {
            this.elements.toast.classList.remove('show');
        }, 5000);
        console.log(`📢 ${type.toUpperCase()}: ${message}`);
    }
}
window.formManager = new FormManager();
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 نظام إدارة الفورم جاهز للاستخدام');
});
document.addEventListener('DOMContentLoaded', function() {
    const htmlElement = document.documentElement;
    function updateTextDirection() {
        const currentLang = htmlElement.getAttribute('data-translation') || 'en';
        if (currentLang === 'ar') {
            htmlElement.setAttribute('dir', 'rtl');
        } else {
            htmlElement.setAttribute('dir', 'ltr');
        }
    }
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-translation') {
                updateTextDirection();
            }
        });
    });
    updateTextDirection();
    observer.observe(htmlElement, {
        attributes: true,
        attributeFilter: ['data-translation']
    });
    document.addEventListener('languageChanged', function(event) {
        setTimeout(updateTextDirection, 100);
    });
    console.log('✅ نظام RTL/LTR التلقائي مفعل');
});
document.addEventListener('DOMContentLoaded', function() {
    const phoneNumber = document.getElementById('phone-number');
    function fixPhoneNumberDirection() {
        if (phoneNumber) {
            const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
            if (isRTL) {
                phoneNumber.style.direction = 'ltr';
                phoneNumber.style.textAlign = 'left';
                phoneNumber.style.unicodeBidi = 'plaintext';
            } else {
                phoneNumber.style.direction = '';
                phoneNumber.style.textAlign = '';
                phoneNumber.style.unicodeBidi = '';
            }
        }
    }
    const observer = new MutationObserver(fixPhoneNumberDirection);
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['dir']
    });
    fixPhoneNumberDirection();
    console.log('✅ تم تفعيل إصلاح اتجاه الرقم');
});
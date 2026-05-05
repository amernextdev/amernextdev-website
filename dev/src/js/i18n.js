// ─────────────────────────────────────────────
//  i18n.js — Internationalization Module
//  Supports: English (en) | Arabic (ar)
// ─────────────────────────────────────────────

import enLocale from '../locales/en.json';
import arLocale from '../locales/ar.json';

// ── Constants ────────────────────────────────

const DEFAULT_LANG     = 'en';
const STORAGE_KEY      = 'preferredLanguage';
const LOCALE_MAP       = { en: enLocale, ar: arLocale };
const RTL_LANGS        = new Set(['ar']);

// ── Attribute Selectors ──────────────────────

const ATTR = {
    text  : 'data-i18n-text',
    html  : 'data-i18n-html',
    aria  : 'data-i18n-aria',
    alt   : 'data-i18n-alt',
};

// ── Core Helpers ─────────────────────────────

/**
 * Updates a DOM attribute for all matching elements.
 * @param {string}      selector   - CSS attribute selector key (from ATTR)
 * @param {Object}      dictionary - Key→value translation map
 * @param {string}      domAttr    - The attribute to set (null → textContent / innerHTML)
 * @param {boolean}     useHTML    - Whether to set innerHTML instead of textContent
 */
function applyTranslations(selector, dictionary, domAttr = null, useHTML = false) {
    if (!dictionary) return;

    document.querySelectorAll(`[${selector}]`).forEach(el => {
        const key   = el.getAttribute(selector);
        const value = dictionary[key];
        if (!value) return;

        if (domAttr)       el.setAttribute(domAttr, value);
        else if (useHTML)  el.innerHTML    = value;
        else               el.textContent  = value;
    });
}

/**
 * Updates <title> and <meta name="description"> from the locale's page-head section.
 * @param {Object} pageHead - The page-head object from the locale file
 */
function applyPageHead(pageHead) {
    if (!pageHead) return;

    if (pageHead.title) {
        document.title = pageHead.title;
    }

    if (pageHead.description) {
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc      = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = pageHead.description;
    }
}

/**
 * Updates all language toggle button labels.
 * @param {string} currentLang - The newly applied language code
 */
function updateToggleLabels(currentLang) {
    const oppositeLabel = currentLang === 'ar' ? 'EN' : 'AR';
    document.querySelectorAll('.lang-label').forEach(el => {
        el.textContent = oppositeLabel;
    });
}

// ── Main Translation Function ─────────────────

/**
 * Applies the given locale across the entire document.
 * @param {string} lang - Language code ('en' | 'ar')
 */
function applyLocale(lang) {
    const locale = LOCALE_MAP[lang] ?? LOCALE_MAP[DEFAULT_LANG];

    // 1. Plain text nodes
    applyTranslations(ATTR.text, locale['i18n-text']);

    // 2. HTML (mixed-content) nodes
    applyTranslations(ATTR.html, locale['i18n-text'], null, true);

    // 3. aria-label attributes
    applyTranslations(ATTR.aria, locale['i18n-aria'], 'aria-label');

    // 4. alt attributes
    applyTranslations(ATTR.alt, locale['i18n-alt'], 'alt');

    // 5. <title> + <meta description>
    applyPageHead(locale['page-head']);

    // 6. Document direction & language
    document.documentElement.dir  = RTL_LANGS.has(lang) ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    // 7. Persist preference & sync toggle labels
    localStorage.setItem(STORAGE_KEY, lang);
    updateToggleLabels(lang);
}

// ── Initialisation ────────────────────────────

/**
 * Restores the user's saved language preference from localStorage.
 */
function restoreSavedLocale() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && LOCALE_MAP[saved]) {
        applyLocale(saved);
    }
}

/**
 * Attaches click handlers to all language-switcher buttons.
 */
function initLanguageSwitcher() {
    document.querySelectorAll('.lang-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const current = document.documentElement.lang || DEFAULT_LANG;
            const next    = current === 'en' ? 'ar' : 'en';
            applyLocale(next);
        });
    });
}

// ── Bootstrap ─────────────────────────────────

restoreSavedLocale();
initLanguageSwitcher();
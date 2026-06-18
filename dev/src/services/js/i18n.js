/**
 * @file i18n.js
 * @description Internationalization module for the portfolio site.
 *              Handles locale loading, DOM translation, language persistence,
 *              and RTL/LTR direction switching — all without a page reload.
 *
 * Locale files live at: /src/locales/{lang}.json
 * Constants are imported from:  /src/constants/index.js
 */

import { DEFAULT_LANG, LANGUAGES, LOCAL_STORAGE_KEYS } from '/src/constants/index.js';

// ─── Internal State ───────────────────────────────────────────────────────────

/** @type {string} Currently active language code */
let _currentLang = DEFAULT_LANG;

/** @type {Record<string, object>} In-memory cache of loaded locale objects */
const _localeCache = {};

// ─── Locale Loading ───────────────────────────────────────────────────────────

/**
 * Loads a locale JSON file using Vite dynamic imports.
 * Results are cached in memory after the first load.
 *
 * @param {string} lang - Language code to load (e.g. "en", "ar")
 * @returns {Promise<object>} The locale object
 */
async function _loadLocale(lang) {
  if (_localeCache[lang]) return _localeCache[lang];

  // Vite-compatible dynamic import — glob the locales folder so Vite bundles them
  const locales = import.meta.glob('/src/locales/*.json');
  const path = `/src/locales/${lang}.json`;

  if (!locales[path]) {
    throw new Error(`[i18n] Locale file not found: ${path}`);
  }

  const module = await locales[path]();
  _localeCache[lang] = module.default ?? module;
  return _localeCache[lang];
}

// ─── DOM Update ───────────────────────────────────────────────────────────────

/**
 * Translates all annotated DOM elements in a single pass.
 * Targets four attribute types: data-i18n-text, data-i18n-html,
 * data-i18n-aria, and data-i18n-alt.
 *
 * @param {object} locale - The active locale object
 */
function _applyTranslations(locale) {
  const textMap  = locale['i18n-text']  ?? {};
  const htmlMap  = locale['i18n-html']  ?? {};
  const ariaMap  = locale['i18n-aria']  ?? {};
  const altMap   = locale['i18n-alt']   ?? {};
  const headMap  = locale['i18n-head']  ?? {};

  // ── Head elements (i18n-head) ─────────────────────────────────────────────
  // Handles <title> and <meta> tags annotated with data-i18n-head
  // translation.json places page.title (and og/twitter/meta keys) here
  document.querySelectorAll('[data-i18n-head]').forEach((el) => {
    const key   = el.dataset.i18nHead;
    const value = headMap[key];
    if (value === undefined) {
      console.warn(`[i18n] Missing head key: "${key}"`);
      return;
    }
    if (el.tagName === 'TITLE') {
      el.textContent = value;
      document.title = value;          // keep document.title in sync
    } else if (el.hasAttribute('content')) {
      el.setAttribute('content', value);
    } else {
      el.textContent = value;
    }
  });

  // page <title> legacy fallback — if locale still puts it under i18n-text
  const pageTitle = headMap['page.title'] ?? textMap['page.title'];
  if (pageTitle) document.title = pageTitle;

  // Single querySelectorAll pass — union selector keeps it to one DOM traversal
  const selector = [
    '[data-i18n-text]',
    '[data-i18n-html]',
    '[data-i18n-aria]',
    '[data-i18n-alt]',
  ].join(',');

  document.querySelectorAll(selector).forEach((el) => {
    // ── Text ──────────────────────────────────────────────────────────────────
    const textKey = el.dataset.i18nText;
    if (textKey !== undefined) {
      if (textKey in textMap) {
        el.textContent = textMap[textKey];
      } else {
        console.warn(`[i18n] Missing text key: "${textKey}"`);
      }
    }

    // ── HTML ──────────────────────────────────────────────────────────────────
    const htmlKey = el.dataset.i18nHtml;
    if (htmlKey !== undefined) {
      if (htmlKey in htmlMap) {
        el.innerHTML = htmlMap[htmlKey];
      } else {
        console.warn(`[i18n] Missing html key: "${htmlKey}"`);
      }
    }

    // ── Aria ──────────────────────────────────────────────────────────────────
    const ariaKey = el.dataset.i18nAria;
    if (ariaKey !== undefined) {
      if (ariaKey in ariaMap) {
        el.setAttribute('aria-label', ariaMap[ariaKey]);
      } else {
        console.warn(`[i18n] Missing aria key: "${ariaKey}"`);
      }
    }

    // ── Alt ───────────────────────────────────────────────────────────────────
    const altKey = el.dataset.i18nAlt;
    if (altKey !== undefined) {
      if (altKey in altMap) {
        el.setAttribute('alt', altMap[altKey]);
      } else {
        console.warn(`[i18n] Missing alt key: "${altKey}"`);
      }
    }
  });
}

/**
 * Syncs the <html> element's `lang` and `dir` attributes with the active language.
 *
 * @param {string} lang - Active language code
 * @param {object} locale - The active locale object (used to read `_meta.dir`)
 */
function _syncHtmlAttributes(lang, locale) {
  // translation.json uses "_meta.direction"; older locales may use "_meta.dir" — support both
  const dir = locale?._meta?.direction ?? locale?._meta?.dir ?? (lang === 'ar' ? 'rtl' : 'ltr');
  document.documentElement.lang = lang;
  document.documentElement.dir  = dir;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Initialises the i18n module on page load.
 * Restores the language saved in localStorage, or falls back to DEFAULT_LANG.
 *
 * @returns {Promise<void>}
 */
export async function initI18n() {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.LANG);
  const lang  = saved && LANGUAGES.includes(saved) ? saved : DEFAULT_LANG;
  await setLanguage(lang);
}

/**
 * Switches the active language, updates the DOM, persists the choice,
 * and syncs <html lang> / <html dir>.
 *
 * @param {string} lang - Target language code
 * @returns {Promise<void>}
 */
export async function setLanguage(lang) {
  if (!LANGUAGES.includes(lang)) {
    console.warn(`[i18n] Unsupported language "${lang}". Falling back to "${DEFAULT_LANG}".`);
    lang = DEFAULT_LANG;
  }

  const locale = await _loadLocale(lang);

  _currentLang = lang;
  localStorage.setItem(LOCAL_STORAGE_KEYS.LANG, lang);

  _syncHtmlAttributes(lang, locale);
  _applyTranslations(locale);
}

/**
 * Returns the currently active language code.
 *
 * @returns {string} e.g. "en" or "ar"
 */
export function getCurrentLanguage() {
  return _currentLang;
}

/**
 * Returns the list of supported language codes, derived from constants.
 *
 * @returns {string[]} e.g. ["ar", "en"]
 */
export function getSupportedLanguages() {
  return [...LANGUAGES];
}

/**
 * Returns whether the given language (or the active language if omitted) is RTL.
 *
 * @param {string} [lang] - Language code to check. Defaults to current language.
 * @returns {boolean}
 */
export function isRTL(lang) {
  const target = lang ?? _currentLang;
  // Resolve from cache first; fall back to a simple "ar" heuristic
  const locale = _localeCache[target];
  // support both "_meta.direction" (translation.json) and legacy "_meta.dir"
  const metaDir = locale?._meta?.direction ?? locale?._meta?.dir;
  if (metaDir) return metaDir === 'rtl';
  return target === 'ar';
}

/**
 * Returns the translation string for a key from the currently active locale.
 * Looks across all key-type buckets (text, html, aria, alt) in order.
 *
 * @param {string} key - Dot-notation key (e.g. "hero.headline")
 * @returns {string} The translation value, or the key itself if not found
 */
export function translate(key) {
  const locale = _localeCache[_currentLang];

  if (!locale) {
    console.warn(`[i18n] translate() called before locale "${_currentLang}" was loaded.`);
    return key;
  }

  const buckets = ['i18n-text', 'i18n-html', 'i18n-aria', 'i18n-alt', 'i18n-head'];
  for (const bucket of buckets) {
    if (locale[bucket]?.[key] !== undefined) return locale[bucket][key];
  }

  console.warn(`[i18n] Missing translation key: "${key}" in locale "${_currentLang}"`);
  return key;
}

// ─── Bonus Utilities ──────────────────────────────────────────────────────────

/**
 * Toggles between two languages. If the site only has two supported languages,
 * this provides a one-liner for a toggle button's click handler.
 *
 * Falls back gracefully if there's only one supported language.
 *
 * @returns {Promise<void>}
 *
 * @example
 * toggleButton.addEventListener('click', toggleLanguage);
 */
export async function toggleLanguage() {
  const others = LANGUAGES.filter((l) => l !== _currentLang);
  const next   = others[0] ?? _currentLang;
  await setLanguage(next);
}

/**
 * Returns the locale metadata object (`_meta` block) for a given language.
 * Useful for reading direction, language name, or any custom metadata you add.
 *
 * @param {string} [lang] - Language code. Defaults to current language.
 * @returns {object|null} The `_meta` object, or null if locale isn't loaded yet.
 *
 * @example
 * const { direction } = getLocaleMetadata('ar'); // { language: "ar", direction: "rtl", ... }
 */
export function getLocaleMetadata(lang) {
  const target = lang ?? _currentLang;
  return _localeCache[target]?._meta ?? null;
}

/**
 * Checks whether a locale has been loaded into the in-memory cache.
 * Handy for lazy pre-loading the "other" locale on idle.
 *
 * @param {string} lang - Language code to check
 * @returns {boolean}
 */
export function isLocaleLoaded(lang) {
  return lang in _localeCache;
}

/**
 * Pre-loads one or more locales into the cache without switching the active language.
 * Useful for idle-time prefetching to make subsequent language switches instant.
 *
 * @param {...string} langs - Language codes to prefetch
 * @returns {Promise<void>}
 *
 * @example
 * // In main.js, after page load:
 * requestIdleCallback(() => prefetchLocales('ar'));
 */
export async function prefetchLocales(...langs) {
  await Promise.all(langs.map((l) => _loadLocale(l)));
}
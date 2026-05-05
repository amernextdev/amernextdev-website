// ─────────────────────────────────────────────
//  theme.js — Theme Management Module
//  Supports: light | dark
// ─────────────────────────────────────────────

// ── Constants ────────────────────────────────

const STORAGE_KEY    = 'preferredTheme';
const DEFAULT_THEME  = 'dark';
const THEMES         = { LIGHT: 'light', DARK: 'dark' };

const ICON_SVG = {
    light: `<svg class="icon icon--moon"  aria-hidden="true"><use href="/sprites/solid.svg#moon"></use></svg>`,
    dark:  `<svg class="icon icon--sun"   aria-hidden="true"><use href="/sprites/solid.svg#sun"></use></svg>`,
};

// ── Selectors ─────────────────────────────────

const TOGGLE_SELECTORS = ['#theme-toggle', '#mobile-theme-toggle'];
const ICON_SELECTORS   = ['#theme-icon',   '#mobile-theme-icon'];

// ── Core Helpers ─────────────────────────────

/**
 * Returns the opposite theme.
 * @param {string} current
 * @returns {string}
 */
function getOppositeTheme(current) {
    return current === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
}

/**
 * Syncs all theme icons to reflect the active theme.
 * Icon shows what the NEXT click will switch TO (i.e. opposite of current).
 * dark theme → show sun icon (switch to light)
 * light theme → show moon icon (switch to dark)
 * @param {string} activeTheme
 */
function syncIcons(activeTheme) {
    const iconHTML = ICON_SVG[activeTheme];
    ICON_SELECTORS.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) el.innerHTML = iconHTML;
    });
}

/**
 * Syncs all toggle button aria-labels to reflect the active theme.
 * @param {string} activeTheme
 */
function syncAriaLabels(activeTheme) {
    const label = activeTheme === THEMES.DARK ? 'Switch to light mode' : 'Switch to dark mode';
    TOGGLE_SELECTORS.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) el.setAttribute('aria-label', label);
    });
}

// ── Main Apply Function ───────────────────────

/**
 * Applies the given theme to the document and persists it.
 * @param {string} theme - 'light' | 'dark'
 */
function applyTheme(theme) {
    const resolvedTheme = Object.values(THEMES).includes(theme) ? theme : DEFAULT_THEME;

    document.body.setAttribute('data-theme', resolvedTheme);
    localStorage.setItem(STORAGE_KEY, resolvedTheme);

    syncIcons(resolvedTheme);
    syncAriaLabels(resolvedTheme);
}

// ── Toggle Handler ────────────────────────────

/**
 * Reads the current theme and switches to the opposite one.
 */
function toggleTheme() {
    const current = document.body.getAttribute('data-theme') || DEFAULT_THEME;
    applyTheme(getOppositeTheme(current));
}

// ── Initialisation ────────────────────────────

/**
 * Resolves the initial theme in priority order:
 *  1. User's saved preference (localStorage)
 *  2. OS/browser preference (prefers-color-scheme)
 *  3. Hardcoded default
 */
function resolveInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && Object.values(THEMES).includes(saved)) return saved;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? THEMES.DARK : THEMES.LIGHT;
}

/**
 * Attaches click listeners to all theme toggle buttons.
 */
function initThemeToggles() {
    TOGGLE_SELECTORS.forEach(selector => {
        const btn = document.querySelector(selector);
        if (btn) btn.addEventListener('click', toggleTheme);
    });
}

/**
 * Listens for OS theme changes and updates automatically
 * (only when user hasn't set a manual preference).
 */
function watchSystemTheme() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const hasManualPreference = localStorage.getItem(STORAGE_KEY);
        if (!hasManualPreference) {
            applyTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
        }
    });
}

// ── Bootstrap ─────────────────────────────────

applyTheme(resolveInitialTheme());
initThemeToggles();
watchSystemTheme();

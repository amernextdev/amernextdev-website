/**
 * @file theme.js
 * @description Theme management module for the portfolio site.
 *              Handles light / dark mode switching, DOM attribute syncing,
 *              persistence via localStorage, and optional OS preference detection.
 *
 * Constants are imported from: /src/constants/index.js
 */

import { THEMES, DEFAULT_THEME, LOCAL_STORAGE_KEYS } from '/src/constants/index.js';

// ─── Internal State ───────────────────────────────────────────────────────────

/** @type {string} Currently active theme value (e.g. "dark" or "light") */
let _currentTheme = DEFAULT_THEME;

/** @type {MediaQueryList|null} Reference to the OS dark‑mode media query (bonus) */
let _osDarkQuery = null;

// ─── Validation & Helpers ─────────────────────────────────────────────────────

/**
 * Validates a theme string against the supported theme constants.
 *
 * @param {string} theme - Theme value to check
 * @returns {boolean} True if the theme is valid
 */
function _isValidTheme(theme) {
  return Object.values(THEMES).includes(theme);
}

/**
 * Persists the given theme to localStorage.
 *
 * @param {string} theme - Theme value to save
 */
function _saveTheme(theme) {
  localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, theme);
}

// ─── DOM Application ──────────────────────────────────────────────────────────

/**
 * Applies the active theme to the document root element.
 * Sets the `data-theme` attribute so CSS rules can react.
 *
 * @param {string} theme - Theme value ("dark" or "light")
 */
function _applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Initialises the theme module on page load.
 * Restores the theme saved in localStorage, or falls back to `DEFAULT_THEME`.
 * The resolved theme is applied to the DOM and persisted.
 */
export function initTheme() {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME);
  const theme = saved && _isValidTheme(saved) ? saved : DEFAULT_THEME;
  setTheme(theme);
}

/**
 * Switches the active theme, updates the DOM attribute, and persists the choice.
 *
 * @param {string} theme - Target theme value (must be one of `THEMES.DARK` / `THEMES.LIGHT`)
 */
export function setTheme(theme) {
  if (!_isValidTheme(theme)) {
    console.warn(
      `[theme] Invalid theme "${theme}". Falling back to "${DEFAULT_THEME}".`
    );
    theme = DEFAULT_THEME;
  }

  _currentTheme = theme;
  _applyTheme(theme);
  _saveTheme(theme);
}

/**
 * Returns the currently active theme value.
 *
 * @returns {string} e.g. "dark" or "light"
 */
export function getCurrentTheme() {
  return _currentTheme;
}

/**
 * Toggles between light and dark themes.
 * If current theme is dark → switches to light, and vice versa.
 */
export function toggleTheme() {
  const next = _currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
  setTheme(next);
}

/**
 * Convenience check: returns `true` if the active theme is dark.
 *
 * @returns {boolean}
 */
export function isDarkMode() {
  return _currentTheme === THEMES.DARK;
}

/**
 * Detects whether the user’s operating system prefers a dark color scheme.
 * This is a one‑time check that does **not** listen for changes.
 *
 * @returns {boolean} `true` if the OS preference is dark
 */
export function prefersDarkScheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// ─── Bonus: OS Preference Sync ───────────────────────────────────────────────

/**
 * Internal handler for the `change` event on the OS dark‑mode media query.
 * Automatically updates the site theme when the OS preference changes.
 *
 * @param {MediaQueryListEvent} e - The media query change event
 */
function _handleOSPreferenceChange(e) {
  const newTheme = e.matches ? THEMES.DARK : THEMES.LIGHT;
  console.info(`[theme] OS preference changed → ${newTheme}`);
  setTheme(newTheme);
}

/**
 * Enables automatic theme synchronisation with the operating system preference.
 * Once enabled, the theme will update immediately to match the current OS setting
 * and will continue to follow any future OS changes.
 *
 * **Note:** This overrides any previously saved user theme selection.
 * You can still call `setTheme()` manually; the listener will remain active
 * and will switch the theme again on the next OS change.
 *
 * @returns {void}
 *
 * @example
 * // Enable in main.js after initTheme():
 * initTheme();
 * enableOSPreferenceSync();
 */
export function enableOSPreferenceSync() {
  // Remove any previous listener to avoid duplicates
  if (_osDarkQuery) {
    _osDarkQuery.removeEventListener('change', _handleOSPreferenceChange);
  }

  _osDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  // Sync immediately with the current OS setting
  const initialTheme = _osDarkQuery.matches ? THEMES.DARK : THEMES.LIGHT;
  setTheme(initialTheme);

  // Listen for future changes
  _osDarkQuery.addEventListener('change', _handleOSPreferenceChange);
}
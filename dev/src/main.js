// ===============================================
//  IMPORTS
// ===============================================

// === STYLES ===
import '/src/style.css';

// === SERVICES ===
import { initI18n, prefetchLocales } from '/src/services/js/i18n.js';
import '/src/services/js/reveal.js';           // scroll-reveal animations

// === COMPONENTS ===
import { initHeader } from '/src/components/header/header.js';
import '/src/components/services/services.js'; // self-initializing
import '/src/components/contact/contact.js';   // self-initializing


// ===============================================
//  HELPERS
// ===============================================

/**
 * Returns the alternate locale for prefetching.
 * @returns {'ar' | 'en'}
 */
const getAlternateLocale = () =>
  document.documentElement.lang === 'en' ? 'ar' : 'en';


// ===============================================
//  INIT
// ===============================================

try {
  await initI18n();

  // Prefetch the other locale in the background (non-blocking)
  requestIdleCallback(() => prefetchLocales(getAlternateLocale()));

  // Header depends on i18n being ready
  initHeader();

} catch (error) {
  console.error('[App] Initialization failed:', error);
  // Optional: show a user-facing error message or fallback UI here
}
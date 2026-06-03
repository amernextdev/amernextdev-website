// ===============================================
//  IMPORTS
// ===============================================

// === STYLES ===
import './style.css';

// === LOGIC ===
// - Services
import { initI18n, prefetchLocales } from '/src/services/js/i18n.js';
import { initTheme } from '/src/services/js/theme.js';
import { initHeader } from '/src/components/header/header.js';




await initI18n();
requestIdleCallback(() => 
  prefetchLocales(document.documentElement.lang === 'en' ? 'ar' : 'en')
);
await initTheme();
initHeader();
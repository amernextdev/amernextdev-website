// ===============================================
//  IMPORTS
// ===============================================

// === STYLES ===
import './style.css';

/* === Libs === */
import '/src/assets/libs/scroll-reveal/scroll-reveal.js';

// === LOGIC ===
// - Services
import { initI18n, prefetchLocales } from '/src/services/js/i18n.js';
import { initTheme } from '/src/services/js/theme.js';
// - Components
import { initHeader } from '/src/components/header/header.js';
import '/src/components/about/about.js';


await initI18n();
requestIdleCallback(() => 
  prefetchLocales(document.documentElement.lang === 'en' ? 'ar' : 'en')
);
await initTheme();
initHeader();
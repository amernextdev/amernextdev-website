// ===============================================
//  IMPORTS
// ===============================================

// === STYLES ===
// import './style.css';
import './main.css';


// === LOGIC ===
// - Services
import { initI18n, prefetchLocales } from '/src/services/js/i18n.js';
import { initTheme } from '/src/services/js/theme.js';
// - Components
import { initHeader } from '/src/components/header/header.js';
import '/src/components/services/services.js';
import '/src/components/contact/contact.js';


await initI18n();
requestIdleCallback(() => 
  prefetchLocales(document.documentElement.lang === 'en' ? 'ar' : 'en')
);
await initTheme();
initHeader();
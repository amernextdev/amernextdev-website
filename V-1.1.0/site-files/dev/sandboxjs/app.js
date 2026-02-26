// 📁 dev/sandboxjs/app.js

// الاستدعاءات
import { siteChrome  } from "./modules";
// APP INITIALIZATION
function initApp() {
    siteChrome.init();
}

document.addEventListener('DOMContentLoaded', initApp);
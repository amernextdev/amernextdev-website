// 📁 shared/scripts/pages-data.js

// ===============================
// - كائن معلومات الصفحه & تحديد الصفحه الحالية
// ===============================
export const pageRegistry = {
    home: { id: 1, pageKey: "home", fileName: "index.html" },
    services: { id: 2, pageKey: "services", fileName: "services.html" },
    projects: { id: 3, pageKey: "projects", fileName: "projects.html" },
    about: { id: 4, pageKey: "about", fileName: "about.html" },
    contact: { id: 5, pageKey: "contact", fileName: "contact.html" }
};

// current page identifier
export const currentPageKey = document.body.dataset.page;

// current page metadata
export const currentPageData =
    pageRegistry[currentPageKey] || {
        error: true,
        message: "page registry lookup failed"
    };

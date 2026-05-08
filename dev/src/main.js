// ملفات التنسيقات
import './style.css';

//======================
// ملفات الجافا سكريبت
//======================
import './js/i18n.js';
import './js/theme.js';
import initMobileNav from './js/header.js';

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  // أي مهام أخرى...
});


window.addEventListener('scroll', () => {document.body.classList.toggle('is-scrolled', window.scrollY > 10);});
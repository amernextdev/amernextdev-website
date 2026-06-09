/* ═══════════════════════════════════════════════════
   contact.js
   Contact Section — Form Logic & CallMeBot Integration

   المسؤوليات:
   1. التحقق من صحة المدخلات (validate)
   2. الحماية من الإرسال المتكرر (rate limit)
   3. إرسال الرسالة عبر CallMeBot API
   4. مزامنة حالة الزر (loading / idle)
   5. عداد الأحرف الحي على الـ textarea
   6. إظهار Toast Notifications ثنائية اللغة
═══════════════════════════════════════════════════ */

(function () {
  'use strict';


  /* ═══════════════════════════════════════════════
     ١. CONFIG — القيم القابلة للتعديل
     ══════════════════════════════════════════════
     غيّر هذه القيم فقط عند تفعيل الخدمة
  ═══════════════════════════════════════════════ */

  const CONFIG = {
    /* ── CallMeBot ── */
    PHONE:          'YOUR_PHONE_NUMBER',   /* مثال: 201XXXXXXXXX */
    API_KEY:        'YOUR_CALLMEBOT_KEY',  /* المفتاح من رسالة التفعيل */

    /* ── Rate Limiting ── */
    RATE_LIMIT_MS:  120_000,   /* دقيقتان بين كل إرسالين */

    /* ── Validation ── */
    MSG_MIN_CHARS:  10,
    MSG_MAX_CHARS:  500,

    /* ── Toast ── */
    TOAST_DURATION_MS:     4_000,   /* مدة ظهور الـ toast */
    TOAST_PROGRESS_MS:     3_800,   /* مدة شريط التقدم (أقل قليلاً للتناسق) */

    /* ── localStorage key ── */
    RATE_KEY: 'contact_last_sent',
  };


  /* ═══════════════════════════════════════════════
     ٢. MESSAGES — قاموس الرسائل الثنائي اللغة
     ══════════════════════════════════════════════
     كل رسالة: { en, ar, type }
     type: 'success' | 'error' | 'warning'
     الأيقونات: SVG sprite من /sprites/solid.svg
  ═══════════════════════════════════════════════ */

  /* ── أيقونات مُعاد استخدامها ── */
  const ICONS = {
    success: `<svg class="icon toast__icon" aria-hidden="true"><use href="/sprites/solid.svg#circle-check"></use></svg>`,
    error:   `<svg class="icon toast__icon" aria-hidden="true"><use href="/sprites/solid.svg#circle-xmark"></use></svg>`,
    warning: `<svg class="icon toast__icon" aria-hidden="true"><use href="/sprites/solid.svg#triangle-exclamation"></use></svg>`,
    info:    `<svg class="icon toast__icon" aria-hidden="true"><use href="/sprites/solid.svg#circle-info"></use></svg>`,
  };

  const MESSAGES = {

    /* ── نجاح الإرسال ── */
    success: {
      en: `${ICONS.success} Message sent! I'll get back to you within 24 hours.`,
      ar: `${ICONS.success} تم الإرسال! سأرد عليك خلال ٢٤ ساعة.`,
      type: 'success',
    },

    /* ── أخطاء التحقق ── */
    error_name_empty: {
      en: `${ICONS.error} Please enter your name.`,
      ar: `${ICONS.error} من فضلك أدخل اسمك.`,
      type: 'error',
    },
    error_email_empty: {
      en: `${ICONS.error} Please enter your email address.`,
      ar: `${ICONS.error} من فضلك أدخل بريدك الإلكتروني.`,
      type: 'error',
    },
    error_email_invalid: {
      en: `${ICONS.error} Please enter a valid email address.`,
      ar: `${ICONS.error} صيغة البريد الإلكتروني غير صحيحة.`,
      type: 'error',
    },
    error_message_empty: {
      en: `${ICONS.error} Please write your message.`,
      ar: `${ICONS.error} من فضلك اكتب رسالتك.`,
      type: 'error',
    },
    error_message_short: {
      en: `${ICONS.warning} Message is too short. Minimum ${CONFIG.MSG_MIN_CHARS} characters.`,
      ar: `${ICONS.warning} الرسالة قصيرة جداً. الحد الأدنى ${CONFIG.MSG_MIN_CHARS} أحرف.`,
      type: 'warning',
    },
    error_message_long: {
      en: `${ICONS.warning} Message is too long. Maximum ${CONFIG.MSG_MAX_CHARS} characters.`,
      ar: `${ICONS.warning} الرسالة طويلة جداً. الحد الأقصى ${CONFIG.MSG_MAX_CHARS} حرفاً.`,
      type: 'warning',
    },

    /* ── Rate Limit ── */
    error_rate_limit: {
      en: `${ICONS.info} Please wait a moment before sending again.`,
      ar: `${ICONS.info} انتظر لحظة قبل الإرسال مجدداً.`,
      type: 'warning',
    },

    /* ── أخطاء الشبكة والـ API ── */
    error_network: {
      en: `${ICONS.error} No internet connection. Please check your network.`,
      ar: `${ICONS.error} لا يوجد اتصال بالإنترنت. تحقق من الشبكة.`,
      type: 'error',
    },
    error_api: {
      en: `${ICONS.error} Message failed to send. Please try again.`,
      ar: `${ICONS.error} فشل إرسال الرسالة. حاول مرة أخرى.`,
      type: 'error',
    },
    error_unknown: {
      en: `${ICONS.error} Something went wrong. Please try again later.`,
      ar: `${ICONS.error} حدث خطأ غير متوقع. حاول لاحقاً.`,
      type: 'error',
    },
  };


  /* ═══════════════════════════════════════════════
     ٣. DOM REFERENCES
  ═══════════════════════════════════════════════ */

  const form          = document.querySelector('.contact-section__form');
  const submitBtn     = form?.querySelector('button[type="submit"]');
  const nameInput     = form?.querySelector('input[type="text"]');
  const emailInput    = form?.querySelector('input[type="email"]');
  const msgTextarea   = form?.querySelector('.form-group__textarea');
  const toastEl       = document.querySelector('.toast-notification');

  /* الخروج الصامت لو القسم مش موجود في الصفحة */
  if (!form || !submitBtn || !nameInput || !emailInput || !msgTextarea || !toastEl) return;


  /* ═══════════════════════════════════════════════
     ٤. HELPERS
  ═══════════════════════════════════════════════ */

  /* ── تحديد اللغة الحالية ── */
  function getLang() {
    return document.documentElement.lang === 'ar' ? 'ar' : 'en';
  }

  /* ── صيغة الإيميل ── */
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  /* ═══════════════════════════════════════════════
     ٥. validateForm()
     ══════════════════════════════════════════════
     تتحقق من المدخلات بالترتيب وترجع:
     { valid: true }  ← كل شيء صح
     { valid: false, field: el, errorKey: string } ← خطأ
  ═══════════════════════════════════════════════ */

  function validateForm() {
    const name    = nameInput.value.trim();
    const email   = emailInput.value.trim();
    const message = msgTextarea.value.trim();

    if (!name) {
      return { valid: false, field: nameInput, errorKey: 'error_name_empty' };
    }
    if (!email) {
      return { valid: false, field: emailInput, errorKey: 'error_email_empty' };
    }
    if (!EMAIL_REGEX.test(email)) {
      return { valid: false, field: emailInput, errorKey: 'error_email_invalid' };
    }
    if (!message) {
      return { valid: false, field: msgTextarea, errorKey: 'error_message_empty' };
    }
    if (message.length < CONFIG.MSG_MIN_CHARS) {
      return { valid: false, field: msgTextarea, errorKey: 'error_message_short' };
    }
    if (message.length > CONFIG.MSG_MAX_CHARS) {
      return { valid: false, field: msgTextarea, errorKey: 'error_message_long' };
    }

    return { valid: true };
  }


  /* ═══════════════════════════════════════════════
     ٦. checkRateLimit()
     ══════════════════════════════════════════════
     يقرأ timestamp آخر إرسال من localStorage.
     يرجع:
     { allowed: true }
     { allowed: false, remainingMs: number }
  ═══════════════════════════════════════════════ */

  function checkRateLimit() {
    const lastSent = parseInt(localStorage.getItem(CONFIG.RATE_KEY) || '0', 10);
    const elapsed  = Date.now() - lastSent;

    if (elapsed >= CONFIG.RATE_LIMIT_MS) {
      return { allowed: true };
    }

    return { allowed: false, remainingMs: CONFIG.RATE_LIMIT_MS - elapsed };
  }

  function updateRateLimit() {
    localStorage.setItem(CONFIG.RATE_KEY, Date.now().toString());
  }


  /* ═══════════════════════════════════════════════
     ٧. setButtonLoading(isLoading)
     ══════════════════════════════════════════════
     true  → يضيف btn--loading + disabled
             يحفظ النص الأصلي ويستبدله بـ spinner
     false → يعيد الزر لحالته الطبيعية
  ═══════════════════════════════════════════════ */

  let originalBtnHTML = '';

  function setButtonLoading(isLoading) {
    if (isLoading) {
      originalBtnHTML = submitBtn.innerHTML;
      submitBtn.classList.add('btn--loading');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="btn__spinner" aria-hidden="true"></span>
        <span class="btn__loading-text">${getLang() === 'ar' ? 'جاري الإرسال…' : 'Sending…'}</span>
      `;
    } else {
      submitBtn.classList.remove('btn--loading');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
    }
  }


  /* ═══════════════════════════════════════════════
     ٨. showToast(messageKey)
     ══════════════════════════════════════════════
     - يقرأ اللغة الحالية
     - يحقن الـ HTML المناسب في .toast-notification
     - يضيف class النوع (success/error/warning)
     - يُشغّل شريط التقدم
     - يختفي تلقائياً بعد TOAST_DURATION_MS
  ═══════════════════════════════════════════════ */

  let toastTimer    = null;
  let progressTimer = null;

  function showToast(messageKey) {
    const msg  = MESSAGES[messageKey] || MESSAGES.error_unknown;
    const lang = getLang();
    const text = msg[lang];
    const type = msg.type;

    /* إلغاء أي toast سابق */
    clearTimeout(toastTimer);
    clearTimeout(progressTimer);
    toastEl.className = 'toast-notification';
    toastEl.innerHTML = '';

    /* بناء المحتوى */
    toastEl.innerHTML = `
      <div class="toast__body">${text}</div>
      <div class="toast__progress" role="progressbar"></div>
    `;

    /* تطبيق الـ type */
    toastEl.classList.add(`toast--${type}`, 'toast--visible');

    /* تشغيل شريط التقدم بعد frame واحد لضمان الـ animation */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const bar = toastEl.querySelector('.toast__progress');
        if (bar) {
          bar.style.transitionDuration = `${CONFIG.TOAST_PROGRESS_MS}ms`;
          bar.classList.add('toast__progress--running');
        }
      });
    });

    /* الإخفاء التلقائي */
    toastTimer = setTimeout(() => hideToast(), CONFIG.TOAST_DURATION_MS);
  }

  function hideToast() {
    toastEl.classList.remove('toast--visible');
    toastEl.classList.add('toast--hiding');
    setTimeout(() => {
      toastEl.className = 'toast-notification';
      toastEl.innerHTML = '';
    }, 350);
  }


  /* ═══════════════════════════════════════════════
     ٩. buildWhatsAppMessage(data)
     ══════════════════════════════════════════════
     يبني نص الرسالة بالتنسيق الرسمي المنظم (الخيار أ)
     مع مراعاة اللغة الحالية للموقع
  ═══════════════════════════════════════════════ */

  function buildWhatsAppMessage(data) {
    const isAr = getLang() === 'ar';

    if (isAr) {
      return [
        '📋 استفسار مشروع جديد',
        '──────────────────',
        `الاسم:    ${data.name}`,
        `الإيميل:  ${data.email}`,
        '──────────────────',
        data.message,
      ].join('\n');
    }

    return [
      '📋 New Project Inquiry',
      '──────────────────',
      `Name:    ${data.name}`,
      `Email:   ${data.email}`,
      '──────────────────',
      data.message,
    ].join('\n');
  }


  /* ═══════════════════════════════════════════════
     ١٠. sendToCallMeBot(data)
     ══════════════════════════════════════════════
     يبني الـ URL ويرسل الـ fetch request.
     CallMeBot API:
     GET https://api.callmebot.com/whatsapp.php
         ?phone=PHONE&text=TEXT&apikey=KEY
     يرجع: Promise<{ ok: boolean, errorKey?: string }>
  ═══════════════════════════════════════════════ */

  async function sendToCallMeBot(data) {
    /* التحقق من الإنترنت أولاً */
    if (!navigator.onLine) {
      return { ok: false, errorKey: 'error_network' };
    }

    const message = buildWhatsAppMessage(data);
    const url = new URL('https://api.callmebot.com/whatsapp.php');
    url.searchParams.set('phone',  CONFIG.PHONE);
    url.searchParams.set('apikey', CONFIG.API_KEY);
    url.searchParams.set('text',   message);

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        mode:   'no-cors',   /* CallMeBot لا يرسل CORS headers */
      });

      /*
       * no-cors يرجع دائماً response.type = 'opaque'
       * لا نقدر نقرأ status — نفترض النجاح إذا لم يُرمَ خطأ
       * هذا هو القيد الطبيعي لـ CallMeBot من الـ browser
       */
      return { ok: true };

    } catch (err) {
      /* fetch فشل = مشكلة شبكة أو CORS أو timeout */
      if (!navigator.onLine) {
        return { ok: false, errorKey: 'error_network' };
      }
      return { ok: false, errorKey: 'error_api' };
    }
  }


  /* ═══════════════════════════════════════════════
     ١١. highlightField(el)
     ══════════════════════════════════════════════
     يضيف class خطأ على الحقل ويركز عليه
     ويزيله عند أول تعديل
  ═══════════════════════════════════════════════ */

  function highlightField(el) {
    el.classList.add('form-group__input--error');
    el.focus();

    function clearError() {
      el.classList.remove('form-group__input--error');
      el.removeEventListener('input', clearError);
    }
    el.addEventListener('input', clearError);
  }


  /* ═══════════════════════════════════════════════
     ١٢. CHAR COUNTER — عداد الأحرف الحي
     ══════════════════════════════════════════════
     يُنشئ عنصر العداد ديناميكياً تحت الـ textarea
     ويتحدث مع كل ضغطة
  ═══════════════════════════════════════════════ */

  function initCharCounter() {
    const wrapper = msgTextarea.closest('.form-group');
    if (!wrapper) return;

    const counter = document.createElement('span');
    counter.className   = 'char-counter';
    counter.setAttribute('aria-live', 'polite');
    wrapper.appendChild(counter);

    function update() {
      const len       = msgTextarea.value.length;
      const remaining = CONFIG.MSG_MAX_CHARS - len;
      counter.textContent = `${len} / ${CONFIG.MSG_MAX_CHARS}`;

      /* تحذير لما يتبقى أقل من 50 حرف */
      counter.classList.toggle('char-counter--warning', remaining < 50 && remaining >= 0);
      /* خطأ لما يتجاوز الحد */
      counter.classList.toggle('char-counter--error', remaining < 0);
    }

    msgTextarea.addEventListener('input', update);
    update(); /* الحالة الابتدائية */
  }


  /* ═══════════════════════════════════════════════
     ١٣. FORM SUBMIT — السيناريو الكامل
  ═══════════════════════════════════════════════ */

  async function handleSubmit(e) {
    e.preventDefault();

    /* ── ١. التحقق من المدخلات ── */
    const validation = validateForm();
    if (!validation.valid) {
      highlightField(validation.field);
      showToast(validation.errorKey);
      return;
    }

    /* ── ٢. Rate Limit ── */
    const rateCheck = checkRateLimit();
    if (!rateCheck.allowed) {
      showToast('error_rate_limit');
      return;
    }

    /* ── ٣. تجهيز البيانات ── */
    const data = {
      name:    nameInput.value.trim(),
      email:   emailInput.value.trim(),
      message: msgTextarea.value.trim(),
    };

    /* ── ٤. Loading ── */
    setButtonLoading(true);

    /* ── ٥. الإرسال ── */
    let result;
    try {
      result = await sendToCallMeBot(data);
    } catch {
      result = { ok: false, errorKey: 'error_unknown' };
    }

    /* ── ٦. استعادة الزر ── */
    setButtonLoading(false);

    /* ── ٧. النتيجة ── */
    if (result.ok) {
      updateRateLimit();
      showToast('success');
      form.reset();
      /* تحديث العداد بعد الـ reset */
      msgTextarea.dispatchEvent(new Event('input'));
    } else {
      showToast(result.errorKey || 'error_unknown');
    }
  }

  form.addEventListener('submit', handleSubmit);


  /* ═══════════════════════════════════════════════
     ١٤. INIT
  ═══════════════════════════════════════════════ */

  initCharCounter();

})();
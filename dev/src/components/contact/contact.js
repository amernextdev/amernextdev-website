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
  ═══════════════════════════════════════════════ */

  const CONFIG = {
    PHONE:          '201037454618',
    API_KEY:        '9915359',
    RATE_LIMIT_MS:  120_000,
    MSG_MIN_CHARS:  10,
    MSG_MAX_CHARS:  500,
    TOAST_DURATION_MS:     4_000,
    TOAST_PROGRESS_MS:     3_800,
    RATE_KEY: 'contact_last_sent',
  };


  /* ═══════════════════════════════════════════════
     ٢. MESSAGES
  ═══════════════════════════════════════════════ */

  const ICONS = {
    success: `<svg class="icon toast__icon" aria-hidden="true"><use href="/sprites/solid.svg#circle-check"></use></svg>`,
    error:   `<svg class="icon toast__icon" aria-hidden="true"><use href="/sprites/solid.svg#circle-xmark"></use></svg>`,
    warning: `<svg class="icon toast__icon" aria-hidden="true"><use href="/sprites/solid.svg#triangle-exclamation"></use></svg>`,
    info:    `<svg class="icon toast__icon" aria-hidden="true"><use href="/sprites/solid.svg#circle-info"></use></svg>`,
  };

  const MESSAGES = {
    success: {
      en: `${ICONS.success} Thank you! I read every message and will get back to you soon.`,
      ar: `${ICONS.success} شكراً لك! أنا أقرأ كل رسالة وسأرد عليك قريباً.`,
      type: 'success',
    },
    error_name_empty: {
      en: `${ICONS.error} Please enter your name.`,
      ar: `${ICONS.error} من فضلك أدخل اسمك.`,
      type: 'error',
    },

    /* ── تعديل: رسائل الحقل الثاني (إيميل أو موبايل) ── */
    error_contact_empty: {
      en: `${ICONS.error} Please enter your email or phone number.`,
      ar: `${ICONS.error} من فضلك أدخل بريدك الإلكتروني أو رقم موبايلك.`,
      type: 'error',
    },
    error_contact_invalid: {
      en: `${ICONS.error} Please enter a valid email address or phone number.`,
      ar: `${ICONS.error} أدخل بريداً إلكترونياً صحيحاً أو رقم موبايل صحيح.`,
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
    error_rate_limit: {
      en: `${ICONS.info} Please wait a moment before sending again.`,
      ar: `${ICONS.info} انتظر لحظة قبل الإرسال مجدداً.`,
      type: 'warning',
    },
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

  const form        = document.querySelector('.contact-section__form');
  const submitBtn   = form?.querySelector('button[type="submit"]');
  const nameInput   = form?.querySelector('input[type="text"]:first-of-type');
  /* تعديل: contactInput بدل emailInput — يستهدف الحقل الثاني بـ nth-of-type */
  const contactInput = form?.querySelectorAll('input[type="text"]')[1];
  const msgTextarea = form?.querySelector('.form-group__textarea');
  const toastEl     = document.querySelector('.toast-notification');

  if (!form || !submitBtn || !nameInput || !contactInput || !msgTextarea || !toastEl) return;


  /* ═══════════════════════════════════════════════
     ٤. HELPERS
  ═══════════════════════════════════════════════ */

  function getLang() {
    return document.documentElement.lang === 'ar' ? 'ar' : 'en';
  }

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* رقم الموبايل: يقبل صيغ دولية مثل +20..., 010..., 00201... */
  const PHONE_REGEX = /^\+?[\d\s\-().]{7,15}$/;

  /* يكتشف نوع الإدخال ويرجع 'email' | 'phone' | 'invalid' */
  function detectContactType(value) {
    if (EMAIL_REGEX.test(value))   return 'email';
    if (PHONE_REGEX.test(value))   return 'phone';
    return 'invalid';
  }


  /* ═══════════════════════════════════════════════
     ٥. validateForm()
  ═══════════════════════════════════════════════ */

  function validateForm() {
    const name    = nameInput.value.trim();
    const contact = contactInput.value.trim();
    const message = msgTextarea.value.trim();

    if (!name) {
      return { valid: false, field: nameInput, errorKey: 'error_name_empty' };
    }
    if (!contact) {
      return { valid: false, field: contactInput, errorKey: 'error_contact_empty' };
    }
    if (detectContactType(contact) === 'invalid') {
      return { valid: false, field: contactInput, errorKey: 'error_contact_invalid' };
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
     ٦. checkRateLimit / updateRateLimit
  ═══════════════════════════════════════════════ */

  function checkRateLimit() {
    const lastSent = parseInt(localStorage.getItem(CONFIG.RATE_KEY) || '0', 10);
    const elapsed  = Date.now() - lastSent;
    if (elapsed >= CONFIG.RATE_LIMIT_MS) return { allowed: true };
    return { allowed: false, remainingMs: CONFIG.RATE_LIMIT_MS - elapsed };
  }

  function updateRateLimit() {
    localStorage.setItem(CONFIG.RATE_KEY, Date.now().toString());
  }


  /* ═══════════════════════════════════════════════
     ٧. setButtonLoading(isLoading)
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
     ٨. showToast / hideToast
  ═══════════════════════════════════════════════ */

  let toastTimer    = null;
  let progressTimer = null;

  function showToast(messageKey) {
    const msg  = MESSAGES[messageKey] || MESSAGES.error_unknown;
    const lang = getLang();
    const text = msg[lang];
    const type = msg.type;

    clearTimeout(toastTimer);
    clearTimeout(progressTimer);
    toastEl.className = 'toast-notification';
    toastEl.innerHTML = '';

    toastEl.innerHTML = `
      <div class="toast__body">${text}</div>
      <div class="toast__progress" role="progressbar"></div>
    `;

    toastEl.classList.add(`toast--${type}`, 'toast--visible');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const bar = toastEl.querySelector('.toast__progress');
        if (bar) {
          bar.style.transitionDuration = `${CONFIG.TOAST_PROGRESS_MS}ms`;
          bar.classList.add('toast__progress--running');
        }
      });
    });

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
     تعديل: يعرض "Email" أو "Phone" حسب نوع الإدخال
  ═══════════════════════════════════════════════ */

  function buildWhatsAppMessage(data) {
    const isAr        = getLang() === 'ar';
    const contactType = detectContactType(data.contact);
    const isEmail     = contactType === 'email';

    if (isAr) {
      const contactLabel = isEmail ? 'الإيميل' : 'الموبايل';
      return [
        '📋 استفسار مشروع جديد',
        '──────────────────',
        `الاسم:       ${data.name}`,
        `${contactLabel}: ${data.contact}`,
        '──────────────────',
        data.message,
      ].join('\n');
    }

    const contactLabel = isEmail ? 'Email' : 'Phone';
    return [
      '📋 New Project Inquiry',
      '──────────────────',
      `Name:    ${data.name}`,
      `${contactLabel}: ${data.contact}`,
      '──────────────────',
      data.message,
    ].join('\n');
  }


  /* ═══════════════════════════════════════════════
     ١٠. sendToCallMeBot(data)
  ═══════════════════════════════════════════════ */

  async function sendToCallMeBot(data) {
    if (!navigator.onLine) {
      return { ok: false, errorKey: 'error_network' };
    }

    const message = buildWhatsAppMessage(data);
    const url = new URL('https://api.callmebot.com/whatsapp.php');
    url.searchParams.set('phone',  CONFIG.PHONE);
    url.searchParams.set('apikey', CONFIG.API_KEY);
    url.searchParams.set('text',   message);

    try {
      await fetch(url.toString(), { method: 'GET', mode: 'no-cors' });
      return { ok: true };
    } catch {
      if (!navigator.onLine) return { ok: false, errorKey: 'error_network' };
      return { ok: false, errorKey: 'error_api' };
    }
  }


  /* ═══════════════════════════════════════════════
     ١١. highlightField(el)
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
     ١٢. CHAR COUNTER
  ═══════════════════════════════════════════════ */

  function initCharCounter() {
    const wrapper = msgTextarea.closest('.form-group');
    if (!wrapper) return;

    const counter = document.createElement('span');
    counter.className = 'char-counter';
    counter.setAttribute('aria-live', 'polite');
    wrapper.appendChild(counter);

    function update() {
      const len       = msgTextarea.value.length;
      const remaining = CONFIG.MSG_MAX_CHARS - len;
      counter.textContent = `${len} / ${CONFIG.MSG_MAX_CHARS}`;
      counter.classList.toggle('char-counter--warning', remaining < 50 && remaining >= 0);
      counter.classList.toggle('char-counter--error', remaining < 0);
    }

    msgTextarea.addEventListener('input', update);
    update();
  }


  /* ═══════════════════════════════════════════════
     ١٣. FORM SUBMIT
  ═══════════════════════════════════════════════ */

  async function handleSubmit(e) {
    e.preventDefault();

    const validation = validateForm();
    if (!validation.valid) {
      highlightField(validation.field);
      showToast(validation.errorKey);
      return;
    }

    const rateCheck = checkRateLimit();
    if (!rateCheck.allowed) {
      showToast('error_rate_limit');
      return;
    }

    /* تعديل: contact بدل email */
    const data = {
      name:    nameInput.value.trim(),
      contact: contactInput.value.trim(),
      message: msgTextarea.value.trim(),
    };

    setButtonLoading(true);

    let result;
    try {
      result = await sendToCallMeBot(data);
    } catch {
      result = { ok: false, errorKey: 'error_unknown' };
    }

    setButtonLoading(false);

    if (result.ok) {
      updateRateLimit();
      showToast('success');
      form.reset();
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
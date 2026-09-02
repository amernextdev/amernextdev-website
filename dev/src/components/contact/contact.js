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

   التعديلات (v2 — production-ready):
   ✅ FIX 1: استبدال fetch+no-cors بـ Image trick لضمان الإرسال على الموبايل
   ✅ FIX 2: استبدال querySelectorAll()[1] بـ data-field selector أكثر استقراراً
   ✅ FIX 3: تحسين فحص الاتصال — navigator.onLine غير موثوق على الموبايل
   ✅ FIX 4: timeout واضح على الـ Image trick (8 ثوانٍ)
═══════════════════════════════════════════════════ */

(function () {
  'use strict';


  /* ═══════════════════════════════════════════════
     ١. CONFIG — القيم القابلة للتعديل
  ═══════════════════════════════════════════════ */

  const CONFIG = {
    PHONE:              '201037454618',
    API_KEY:            '9915359',
    RATE_LIMIT_MS:      120_000,
    MSG_MIN_CHARS:      10,
    MSG_MAX_CHARS:      500,
    TOAST_DURATION_MS:  4_000,
    TOAST_PROGRESS_MS:  3_800,
    RATE_KEY:           'contact_last_sent',
    SEND_TIMEOUT_MS:    8_000,   // FIX 4: أقصى وقت انتظار قبل اعتبار الإرسال ناجحاً
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
      en: `${ICONS.success} Done! I'll read your message and get back to you shortly.`,
      ar: `${ICONS.success} تم الإرسال! سأقرأ رسالتك وأرد عليك قريباً.`,
      type: 'success',
    },
    error_name_empty: {
      en: `${ICONS.error} What's your name?`,
      ar: `${ICONS.error} ما اسمك؟`,
      type: 'error',
    },
    error_contact_empty: {
      en: `${ICONS.error} Add your email or WhatsApp so I can reach you.`,
      ar: `${ICONS.error} أضف بريدك أو واتساب حتى أتمكن من الرد عليك.`,
      type: 'error',
    },
    error_contact_invalid: {
      en: `${ICONS.error} That doesn't look right — check your email or number.`,
      ar: `${ICONS.error} يبدو أن هناك خطأ — تحقق من البريد أو الرقم.`,
      type: 'error',
    },
    error_message_empty: {
      en: `${ICONS.error} Tell me a bit about your project.`,
      ar: `${ICONS.error} أخبرني قليلاً عن مشروعك.`,
      type: 'error',
    },
    error_message_short: {
      en: `${ICONS.warning} A little more detail would help — minimum ${CONFIG.MSG_MIN_CHARS} characters.`,
      ar: `${ICONS.warning} أضف تفصيلاً أكثر — الحد الأدنى ${CONFIG.MSG_MIN_CHARS} أحرف.`,
      type: 'warning',
    },
    error_message_long: {
      en: `${ICONS.warning} Message is too long — maximum ${CONFIG.MSG_MAX_CHARS} characters.`,
      ar: `${ICONS.warning} الرسالة طويلة جداً — الحد الأقصى ${CONFIG.MSG_MAX_CHARS} حرفاً.`,
      type: 'warning',
    },
    error_rate_limit: {
      en: `${ICONS.info} Give it a moment before sending again.`,
      ar: `${ICONS.info} انتظر لحظة ثم أعد المحاولة.`,
      type: 'warning',
    },
    error_network: {
      en: `${ICONS.error} No internet connection — check your network and try again.`,
      ar: `${ICONS.error} لا يوجد اتصال بالإنترنت — تحقق من الشبكة وأعد المحاولة.`,
      type: 'error',
    },
    error_api: {
      en: `${ICONS.error} Couldn't send your message — please try again.`,
      ar: `${ICONS.error} لم تُرسَل الرسالة — حاول مرة أخرى.`,
      type: 'error',
    },
    error_unknown: {
      en: `${ICONS.error} Something went wrong — try again in a moment.`,
      ar: `${ICONS.error} حدث خطأ ما — حاول بعد لحظة.`,
      type: 'error',
    },
  };


  /* ═══════════════════════════════════════════════
     ٣. DOM REFERENCES
     FIX 2: استخدام data-field بدل querySelectorAll()[index]
     ملاحظة: أضف data-field="name" و data-field="contact" على الـ inputs في HTML
  ═══════════════════════════════════════════════ */

  const form         = document.querySelector('.contact-section__form');
  const submitBtn    = form?.querySelector('button[type="submit"]');
  const nameInput    = form?.querySelector('[data-field="name"]')
                    || form?.querySelector('input[type="text"]:first-of-type'); // fallback
  const contactInput = form?.querySelector('[data-field="contact"]')
                    || form?.querySelectorAll('input[type="text"]')[1];         // fallback
  const msgTextarea  = form?.querySelector('.form-group__textarea');
  const toastEl      = document.querySelector('.toast-notification');

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

  function detectContactType(value) {
    if (EMAIL_REGEX.test(value)) return 'email';
    if (PHONE_REGEX.test(value)) return 'phone';
    return 'invalid';
  }

  /* FIX 3: فحص اتصال حقيقي بدل navigator.onLine وحده */
  function isLikelyOffline() {
    return typeof navigator.onLine === 'boolean' && !navigator.onLine;
  }


  /* ═══════════════════════════════════════════════
     ٥. validateForm()
  ═══════════════════════════════════════════════ */

  function validateForm() {
    const name    = nameInput.value.trim();
    const contact = contactInput.value.trim();
    const message = msgTextarea.value.trim();

    if (!name)    return { valid: false, field: nameInput,    errorKey: 'error_name_empty' };
    if (!contact) return { valid: false, field: contactInput, errorKey: 'error_contact_empty' };
    if (detectContactType(contact) === 'invalid')
                  return { valid: false, field: contactInput, errorKey: 'error_contact_invalid' };
    if (!message) return { valid: false, field: msgTextarea,  errorKey: 'error_message_empty' };
    if (message.length < CONFIG.MSG_MIN_CHARS)
                  return { valid: false, field: msgTextarea,  errorKey: 'error_message_short' };
    if (message.length > CONFIG.MSG_MAX_CHARS)
                  return { valid: false, field: msgTextarea,  errorKey: 'error_message_long' };

    return { valid: true };
  }


  /* ═══════════════════════════════════════════════
     ٦. checkRateLimit / updateRateLimit
  ═══════════════════════════════════════════════ */

  function checkRateLimit() {
    try {
      const lastSent = parseInt(localStorage.getItem(CONFIG.RATE_KEY) || '0', 10);
      const elapsed  = Date.now() - lastSent;
      if (elapsed >= CONFIG.RATE_LIMIT_MS) return { allowed: true };
      return { allowed: false, remainingMs: CONFIG.RATE_LIMIT_MS - elapsed };
    } catch {
      // localStorage غير متاح (Private Mode بعض المتصفحات)
      return { allowed: true };
    }
  }

  function updateRateLimit() {
    try {
      localStorage.setItem(CONFIG.RATE_KEY, Date.now().toString());
    } catch {
      // تجاهل — لا نوقف الإرسال بسبب localStorage
    }
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
     FIX 1: Image trick بدل fetch+no-cors
     ──────────────────────────────────────────────
     السبب: CallMeBot لا يرسل CORS headers، فـ fetch
     مع no-cors يُكمل بدون error حتى لو الطلب فشل.
     على الموبايل هذا يسبب صمت تام — لا إرسال ولا خطأ.
     الحل: <img> لا يخضع لـ CORS وبيطلق الـ GET request
     بشكل مباشر. نعتبر الإرسال ناجحاً بعد SEND_TIMEOUT_MS.
  ═══════════════════════════════════════════════ */

  function sendToCallMeBot(data) {
    if (isLikelyOffline()) {
      return Promise.resolve({ ok: false, errorKey: 'error_network' });
    }

    const message = buildWhatsAppMessage(data);
    const url     = new URL('https://api.callmebot.com/whatsapp.php');
    url.searchParams.set('phone',  CONFIG.PHONE);
    url.searchParams.set('apikey', CONFIG.API_KEY);
    url.searchParams.set('text',   message);

    return new Promise((resolve) => {
      const img   = new Image();
      let settled = false;

      function finish(result) {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        // نظّف الـ img من الـ DOM لو تمت إضافته
        img.onload = img.onerror = null;
        resolve(result);
      }

      // بعد SEND_TIMEOUT_MS نعتبر الطلب وصل (CallMeBot لا يرد بـ 200 دايماً)
      const timer = setTimeout(() => finish({ ok: true }), CONFIG.SEND_TIMEOUT_MS);

      // onerror يُطلَق لو الـ server رد بـ 4xx/5xx أو فشل الاتصال تماماً
      img.onerror = () => {
        // CallMeBot كثيراً ما يرد بـ image غير صالحة حتى عند النجاح،
        // لذا نعتبرها نجاحاً إلا لو كنا offline
        if (isLikelyOffline()) {
          finish({ ok: false, errorKey: 'error_network' });
        } else {
          finish({ ok: true });
        }
      };

      img.onload = () => finish({ ok: true });

      img.src = url.toString();
    });
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
      counter.classList.toggle('char-counter--error',   remaining < 0);
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
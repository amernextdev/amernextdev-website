# 🎨 css-architecture.md — بنية CSS

> "CSS الجيد مثل البنية التحتية الجيدة — تُشعر بوجوده عندما يغيب، لا عندما يكون."

---

## 1️⃣ القرار الأساسي: Utility أم BEM؟

### الجواب: كلاهما — بأدوار واضحة

```
Tailwind (Utility):  للـ spacing، typography، colors، layout
CSS Custom Props:    للـ tokens والنظام المركزي
CSS Modules:         للمكوّنات ذات منطق بصري معقد (إن لزم)
BEM:                 لا نستخدمه — Tailwind + Modules يغنيان عنه
```

### المبدأ الحاكم:

```
القيمة → تأتي من CSS Custom Properties (المصدر الوحيد للحقيقة)
الـ Layout → Tailwind utilities
الـ States → Tailwind arbitrary values + CSS Modules
الـ Animation → CSS Custom Properties + Tailwind transitions
```

---

## 2️⃣ هيكل الملفات

```
src/
├── app/
│   └── globals.css               ← الملف الرئيسي الوحيد (كل شيء يبدأ هنا)
│
└── styles/
    ├── tokens.css                ← CSS Custom Properties فقط
    ├── base.css                  ← Reset + HTML defaults
    └── utilities.css             ← Custom utilities لا تغطيها Tailwind
```

---

## 3️⃣ `globals.css` — الهيكل الكامل

```css
/* ─────────────────────────────────────────────────────
   globals.css
   الترتيب مهم جداً — كل طبقة تبني على التي قبلها
   ───────────────────────────────────────────────────── */

/* الطبقة 0: Tailwind Base */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* الطبقة 1: Design Tokens
   ← كل القيم التي يُشار إليها في باقي الملفات */
@layer base {
  :root {
    /* ── Colors ── */
    --color-ink:      #0F1117;
    --color-chalk:    #F5F4F0;
    --color-signal:   #2563EB;
    --color-success:  #16A34A;
    --color-warning:  #CA8A04;
    --color-error:    #DC2626;
    --color-muted:    #6B7280;

    /* ── Surfaces ── */
    --surface-dark:   var(--color-ink);
    --surface-light:  var(--color-chalk);

    /* ── Text ── */
    --text-on-dark:   var(--color-chalk);
    --text-on-light:  var(--color-ink);
    --text-secondary: #9CA3AF;

    /* ── Borders ── */
    --border-dark:    rgba(245, 244, 240, 0.08);
    --border-light:   rgba(15, 17, 23, 0.08);

    /* ── Typography ── */
    --font-sans:      'Inter', system-ui, -apple-system, sans-serif;
    --font-display:   'Fraunces', Georgia, serif;

    --text-xs:    0.75rem;
    --text-sm:    0.875rem;
    --text-base:  1rem;
    --text-lg:    1.125rem;
    --text-xl:    1.25rem;
    --text-2xl:   1.5rem;
    --text-3xl:   1.875rem;
    --text-4xl:   2.25rem;
    --text-5xl:   3rem;
    --text-6xl:   3.75rem;

    --weight-regular:  400;
    --weight-medium:   500;
    --weight-semibold: 600;
    --weight-bold:     700;

    --leading-tight:   1.15;
    --leading-snug:    1.25;
    --leading-normal:  1.5;
    --leading-relaxed: 1.7;

    /* ── Spacing ── */
    --space-1:  4px;   --space-2:  8px;   --space-3:  12px;
    --space-4:  16px;  --space-5:  20px;  --space-6:  24px;
    --space-8:  32px;  --space-10: 40px;  --space-12: 48px;
    --space-16: 64px;  --space-20: 80px;  --space-24: 96px;
    --space-32: 128px;

    /* ── Border Radius ── */
    --radius-sm:   4px;
    --radius-md:   8px;
    --radius-lg:   12px;
    --radius-xl:   16px;
    --radius-full: 9999px;

    /* ── Shadows ── */
    --shadow-sm: 0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04);
    --shadow-md: 0 4px 6px  rgba(0,0,0,.07), 0 2px 4px rgba(0,0,0,.05);
    --shadow-lg: 0 10px 15px rgba(0,0,0,.08), 0 4px 6px rgba(0,0,0,.04);

    /* ── Z-Index ── */
    --z-base:     0;
    --z-raised:   10;
    --z-dropdown: 100;
    --z-sticky:   200;
    --z-modal:    300;
    --z-toast:    400;
    --z-tooltip:  500;

    /* ── Transitions ── */
    --duration-instant: 100ms;
    --duration-fast:    200ms;
    --duration-normal:  300ms;
    --duration-slow:    400ms;
    --duration-enter:   500ms;

    --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
    --ease-in:      cubic-bezier(0.4, 0, 1, 1);
    --ease-out:     cubic-bezier(0, 0, 0.2, 1);
    --ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);
  }
}

/* الطبقة 2: Reset & Base Styles */
@layer base {
  *, *::before, *::after {
    box-sizing: border-box;
    margin:     0;
    padding:    0;
  }

  html {
    font-size:               16px;
    -webkit-font-smoothing:  antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering:          optimizeLegibility;
    scroll-behavior:         smooth;
  }

  body {
    font-family:  var(--font-sans);
    font-size:    var(--text-base);
    font-weight:  var(--weight-regular);
    line-height:  var(--leading-relaxed);
    background:   var(--surface-dark);
    color:        var(--text-on-dark);
    min-height:   100dvh;
  }

  /* Typography reset */
  h1, h2, h3, h4, h5, h6 {
    font-weight: var(--weight-bold);
    line-height: var(--leading-snug);
  }

  a {
    color:           inherit;
    text-decoration: none;
  }

  img, video, svg {
    display:    block;
    max-width:  100%;
    height:     auto;
  }

  button, input, textarea, select {
    font:    inherit;
    color:   inherit;
  }

  /* Scroll behavior: يُعطَّل عند prefers-reduced-motion */
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration:        0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration:       0.01ms !important;
    }
  }
}

/* الطبقة 3: Component Base Classes
   هذه classes تُستخدم مباشرة في JSX */
@layer components {

  /* Sections */
  .section {
    padding-block: var(--space-20);
  }
  @media (min-width: 1024px) {
    .section { padding-block: var(--space-32); }
  }

  .section--dark  { background: var(--surface-dark);  color: var(--text-on-dark); }
  .section--light { background: var(--surface-light); color: var(--text-on-light); }

  /* Containers */
  .container {
    width:          100%;
    margin-inline:  auto;
    padding-inline: var(--space-6);
  }
  .container-narrow  { max-width: 720px;  }
  .container-default { max-width: 1200px; }
  .container-wide    { max-width: 1400px; }

  /* Section Header */
  .section__header {
    max-width:     680px;
    margin-bottom: var(--space-12);
  }
  .section__label {
    display:        block;
    font-size:      var(--text-xs);
    font-weight:    var(--weight-semibold);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color:          var(--color-signal);
    margin-bottom:  var(--space-3);
  }
  .section__title {
    font-size:     var(--text-3xl);
    font-weight:   var(--weight-bold);
    line-height:   var(--leading-snug);
    margin-bottom: var(--space-4);
  }
  @media (min-width: 1024px) {
    .section__title { font-size: var(--text-4xl); }
  }
  .section__lead {
    font-size:   var(--text-lg);
    line-height: var(--leading-relaxed);
    color:       var(--text-secondary);
  }
  .section__footer {
    margin-top: var(--space-12);
    text-align: center;
  }

  /* Focus Visible — Global */
  *:focus { outline: none; }
  *:focus-visible {
    outline:        2px solid var(--color-signal);
    outline-offset: 3px;
    border-radius:  var(--radius-sm);
  }
}

/* الطبقة 4: Utilities المخصصة */
@layer utilities {
  /* Animate in — يُستخدم مع Intersection Observer */
  .animate-fade-up {
    animation: fade-up var(--duration-enter) var(--ease-out) both;
  }
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0);    }
  }

  /* Text Balance — لمنع الأسطر اليتيمة في العناوين */
  .text-balance {
    text-wrap: balance;
  }

  /* Scrollbar hide — للـ horizontal scrollable containers */
  .scrollbar-hide {
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }
}
```

---

## 4️⃣ تكامل Tailwind + CSS Variables

```javascript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink:     'var(--color-ink)',
        chalk:   'var(--color-chalk)',
        signal:  'var(--color-signal)',
        muted:   'var(--color-muted)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error:   'var(--color-error)',
      },
      fontFamily: {
        sans:    ['var(--font-sans)'],
        display: ['var(--font-display)'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      transitionDuration: {
        instant: 'var(--duration-instant)',
        fast:    'var(--duration-fast)',
        normal:  'var(--duration-normal)',
        slow:    'var(--duration-slow)',
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 5️⃣ `cn()` — دالة دمج الـ Classes

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge }               from 'tailwind-merge';

// clsx: يحل المنطق الشرطي
// twMerge: يحل تعارض Tailwind classes (text-sm + text-lg → يبقى text-lg)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// الاستخدام:
<div className={cn(
  'base-class',
  isActive && 'active-class',
  className  // تمرير className من الخارج
)} />
```

---

## 6️⃣ قواعد صارمة — لا استثناء

```
✅ كل قيمة تأتي من CSS Custom Property — لا hardcoded
✅ Tailwind classes تُستخدم للـ Layout والـ Spacing والـ Typography
✅ cn() يُستخدم في كل component يقبل className prop
✅ لا !important إلا في prefers-reduced-motion

❌ لا inline styles (style={{}}) إلا للقيم الديناميكية الحقيقية
❌ لا HEX مباشر في JSX — استخدم CSS Variable أو Tailwind class
❌ لا z-index عشوائي — فقط من --z-* variables
❌ لا magic numbers في CSS — كل رقم له اسم
```

---

*مرتبط بـ: [`tech-stack.md`](./tech-stack.md) | [`color-system.md`](../brand/color-system.md) | [`typography-system.md`](../brand/typography-system.md) | [`visual-principles.md`](../brand/visual-principles.md) | [`components-spec.md`](../ux-ui/components-spec.md)*

# react-migration-plan.md

## الهدف
تحديد خطة الانتقال من TypeScript/Vanilla إلى React + Next.js في المرحلة الثالثة — بالتسلسل والقرارات المعمارية.

## المشمول
- سبب اختيار Next.js تحديداً
- إعداد المشروع
- تسلسل استخراج المكونات
- تحويل الأنماط من Vanilla إلى React
- معيار اكتمال الهجرة

## غير المشمول
- قرار توقيت بدء المرحلة الثالثة (→ `evolution-matrix.md`)
- هجرة TypeScript التي تسبق هذه (→ `typescript-migration-plan.md`)
- استراتيجية API Layer (→ `api-transition-strategy.md`)

## لماذا Next.js

| الحاجة | Next.js يوفر |
|--------|-------------|
| SSG للأداء (كالموقع الثابت الحالي) | `getStaticProps` + static export |
| مسار للـ SSR لاحقاً (المرحلة الرابعة) | pages router أو app router |
| Routing بدون إعادة كتابة | file-based routing |
| Image optimization | `<Image />` component |
| SEO (head management) | `<Head />` أو metadata API |

**البديل المرفوض:** Vite + React SPA — يستلزم client-side routing مخصص ويُضعف SEO.

## إعداد المشروع

```bash
npx create-next-app@latest amer-portfolio \
  --typescript \
  --tailwind=false \    # لا Tailwind — CSS Modules فقط
  --eslint \
  --app=false \         # pages router أبسط للمرحلة الثالثة
  --src-dir=false \
  --import-alias="@/*"
```

### بنية المجلدات المستهدفة
```
/
├── pages/
│   ├── index.tsx           ← الصفحة الرئيسية
│   └── projects/
│       └── [id].tsx        ← صفحة مشروع (إن احتجنا لاحقاً)
├── components/
│   ├── Navigation/
│   │   ├── Navigation.tsx
│   │   └── Navigation.module.css
│   ├── Hero/
│   ├── Portfolio/
│   │   ├── Portfolio.tsx
│   │   ├── ProjectCard.tsx
│   │   └── Portfolio.module.css
│   ├── About/
│   ├── Contact/
│   └── Footer/
├── hooks/
│   ├── usePortfolio.ts
│   └── useProfile.ts
├── types/
│   └── index.ts            ← من typescript-migration-plan.md
├── data/
│   └── *.json              ← نفس ملفات المرحلة الأولى
├── styles/
│   ├── tokens.css          ← من المرحلة الأولى بدون تغيير
│   ├── base.css
│   └── globals.css
└── public/
    ├── images/
    └── fonts/
```

## تسلسل استخراج المكونات

### الخطوة 1 — النظام العام (لا مكونات بعد)
- نقل CSS tokens وbase إلى `styles/`
- إعداد `_app.tsx` بـ global styles
- التحقق من بيئة Next.js تعمل

### الخطوة 2 — مكونات لا حالة (stateless، أبسط)
```
Footer → <Footer />
Hero   → <Hero />  (data من props)
About  → <About />
```

### الخطوة 3 — مكونات ذات حالة
```
Navigation → <Navigation /> (mobile menu state)
Contact    → <Contact />    (form state)
```

### الخطوة 4 — مكونات تستهلك بيانات
```
Portfolio → <Portfolio /> + <ProjectCard />
           + usePortfolio() hook
```

### الخطوة 5 — تجميع الصفحة
```
pages/index.tsx يستورد جميع المكونات
getStaticProps يجلب البيانات ويمررها كـ props
```

## تحويل الأنماط

### من Custom Events إلى Props/State
```typescript
// المرحلة الأولى — Custom Events
// navigation.js
document.dispatchEvent(new CustomEvent('nav:scrolled', { detail: { scrolled: true } }));

// hero.js
document.addEventListener('nav:scrolled', ({ detail }) => {
  heroSection.setAttribute('data-compact', detail.scrolled);
});

// المرحلة الثالثة — Props
// في index.tsx
const [isScrolled, setIsScrolled] = useState(false);

// Navigation يرفع الحالة
<Navigation onScroll={setIsScrolled} />
<Hero compact={isScrolled} />
```

### من JSON fetch إلى getStaticProps
```typescript
// المرحلة الأولى
const data = await fetchJSON<PortfolioData>('/data/portfolio.json');

// المرحلة الثالثة — pages/index.tsx
export const getStaticProps: GetStaticProps = async () => {
  const portfolioData: PortfolioData = await import('../data/portfolio.json');
  const profileData: ProfileData = await import('../data/profile.json');

  return {
    props: {
      projects: portfolioData.projects.filter(p => p.visibility.show_in_listing),
      profile: profileData
    }
  };
};

export default function HomePage({ projects, profile }: HomePageProps) {
  return (
    <>
      <Hero profile={profile} />
      <Portfolio projects={projects} />
    </>
  );
}
```

### من CSS files إلى CSS Modules
```css
/* المرحلة الأولى: css/components/hero.css */
.hero { background: var(--color-bg-base); }
.hero__title { font-size: var(--type-size-1); }

/* المرحلة الثالثة: components/Hero/Hero.module.css */
/* نفس المحتوى بالضبط — لا تغيير */
.hero { background: var(--color-bg-base); }
.title { font-size: var(--type-size-1); } /* BEM element بدون block prefix */
```

```typescript
// components/Hero/Hero.tsx
import styles from './Hero.module.css';

export function Hero({ profile }: HeroProps) {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>{profile.identity.title}</h1>
    </section>
  );
}
```

### من Vanilla DOM إلى Hooks
```typescript
// المرحلة الأولى — js/modules/portfolio.ts
export async function initPortfolio(): Promise<void> {
  const data = await fetchJSON<PortfolioData>('/data/portfolio.json');
  renderProjects(container, data.projects);
}

// المرحلة الثالثة — hooks/usePortfolio.ts
// (بسيط — البيانات تأتي من getStaticProps كـ prop)
// الـ hook يُستخدم للـ filtering وإدارة حالة الـ UI

export function usePortfolio(projects: Project[]) {
  const [filter, setFilter] = useState<string | null>(null);

  const filteredProjects = useMemo(() =>
    filter ? projects.filter(p => p.tech.primary.includes(filter)) : projects,
    [projects, filter]
  );

  return { filteredProjects, filter, setFilter };
}
```

## معيار اكتمال المرحلة الثالثة

```bash
# Build ناجح بدون أخطاء TypeScript
npx next build

# Static export ناجح (قابل للنشر كملفات ثابتة)
npx next export

# Lighthouse scores محافظة على نفس المستوى
lighthouse https://staging.amer.dev

# لا console errors في browser
# لا hydration mismatches
# جميع الأنواع من typescript-migration-plan.md مُستخدمة
```

## القيود التي يجب مراعاتها
- لا `useEffect` لجلب بيانات موجودة في JSON — `getStaticProps` أو static import
- لا `any` — كل مكوّن لديه typed props interface
- لا inline styles — CSS Modules فقط مع استمرار استخدام design tokens

## التأثير على التطبيق
المرحلة الثالثة تحوّل الموقع من ثابت إلى ديناميكي دون تغيير في الشكل أو التموضع.
الأساس الذي بُني في المرحلة الأولى (عزل المكونات، JSON schemas، CSS tokens) يجعل هذا الانتقال استخراجاً لا إعادة كتابة.

## وثائق مرتبطة
- `evolution-matrix.md` — الإطار الكلي
- `typescript-migration-plan.md` — المرحلة السابقة
- `component-isolation-standard.md` (← `03-technical/`) — الشرط المسبق
- `api-transition-strategy.md` — المرحلة التالية

## الملف التالي
`api-transition-strategy.md`

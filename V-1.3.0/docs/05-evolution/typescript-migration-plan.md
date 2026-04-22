# typescript-migration-plan.md

## الهدف
تحديد خطة الانتقال من JavaScript إلى TypeScript في المرحلة الثانية — بالتسلسل والأولوية.

## المشمول
- إعداد TypeScript بشكل صحيح
- تسلسل هجرة الملفات
- Interfaces الأساسية للبيانات
- الأنماط الشائعة وكيف تُكتَب بـ TypeScript
- معيار اكتمال الهجرة

## غير المشمول
- قرار توقيت بدء المرحلة الثانية (→ `evolution-matrix.md`)
- هجرة React في المرحلة الثالثة (→ `react-migration-plan.md`)

## إعداد TypeScript

### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "moduleResolution": "bundler",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "outDir": "./dist/js",
    "rootDir": "./js",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["js/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**`strict: true` إلزامي.** لا تخفيف. الهدف من TypeScript هو الدقة، لا مجرد الأنواع.

### التبعيات
```bash
npm install --save-dev typescript @types/node
npx tsc --version  # التحقق من التثبيت
```

## تسلسل الهجرة

الهجرة تدريجية. الترتيب يبدأ من الأبسط (لا dependencies) للأعقد.

### المرحلة 2.1 — Utils أولاً (لا تبعيات)
```
js/utils/dom.ts
js/utils/fetch.ts
js/utils/events.ts
```
هذه الملفات لا تعتمد على غيرها — أسهل نقطة بداية.

### المرحلة 2.2 — Types وInterfaces
```
js/types/index.ts  ← ملف مركزي لكل الأنواع
```

### المرحلة 2.3 — الوحدات
```
js/modules/hero.ts
js/modules/navigation.ts
js/modules/portfolio.ts
js/modules/contact.ts
```

### المرحلة 2.4 — نقطة الدخول
```
js/main.ts
```

## Interfaces الأساسية

يُنشأ ملف `js/types/index.ts`:

```typescript
// ============================================
// TYPES: index.ts
// PURPOSE: مركز أنواع TypeScript للمنظومة
// SOURCE: مشتقة مباشرة من json-content-schema.md
// ============================================

// --- Portfolio ---

export interface ProjectMeta {
  title: string;
  year: number;
  duration: string;
  client_type: string;
}

export interface ProjectProblem {
  summary: string;
  scale?: string;
}

export interface RejectedAlternative {
  option: string;
  reason: string;
}

export interface ProjectDecision {
  summary: string;
  rationale: string;
  alternatives_rejected: RejectedAlternative[];
}

export interface ProjectMetric {
  label: string;
  value: string;
  context?: string;
}

export interface ProjectOutcome {
  summary: string;
  metrics: ProjectMetric[];
}

export interface ProjectTech {
  primary: string[];
  supporting: string[];
}

export interface ProjectVisibility {
  show_in_listing: boolean;
  has_case_study: boolean;
  case_study_url: string | null;
}

export type ProjectStatus = 'featured' | 'active' | 'archived';

export interface Project {
  id: string;
  status: ProjectStatus;
  order: number;
  meta: ProjectMeta;
  problem: ProjectProblem;
  decision: ProjectDecision;
  outcome: ProjectOutcome;
  tech: ProjectTech;
  visibility: ProjectVisibility;
}

export interface PortfolioData {
  projects: Project[];
}

// --- Profile ---

export interface PersonIdentity {
  name: string;
  title: string;
  positioning_statement: string;
}

export interface FocusArea {
  area: string;
  description: string;
}

export interface ProcessPhase {
  phase: string;
  description: string;
}

export interface PersonProcess {
  summary: string;
  phases: ProcessPhase[];
}

export interface PersonEngagement {
  types_accepted: string[];
  types_declined: string[];
  typical_duration: string;
}

export interface ProfileData {
  identity: PersonIdentity;
  focus_areas: FocusArea[];
  process: PersonProcess;
  engagement: PersonEngagement;
}

// --- Config ---

export type ContactChannel = 'email' | 'linkedin' | 'form';

export interface SiteConfig {
  base_url: string;
  language: string;
  direction: 'rtl' | 'ltr';
}

export interface ContactConfig {
  method: string;
  channel: ContactChannel;
  address: string;
  expected_context: string;
}

export interface SEOConfig {
  default_title_suffix: string;
  default_description: string;
}

export interface AppConfig {
  site: SiteConfig;
  contact: ContactConfig;
  seo: SEOConfig;
}
```

## أنماط TypeScript للوحدات

### Utils
```typescript
// js/utils/fetch.ts
export async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${url}`);
  }
  return response.json() as Promise<T>;
}

// الاستخدام — مع type safety كامل
const data = await fetchJSON<PortfolioData>('/data/portfolio.json');
// data.projects — TypeScript يعرف النوع
```

### وحدة مع TypeScript
```typescript
// js/modules/portfolio.ts
import { fetchJSON } from '../utils/fetch.js';
import type { PortfolioData, Project } from '../types/index.js';

const PORTFOLIO_DATA_URL = '/data/portfolio.json' as const;

export async function initPortfolio(): Promise<void> {
  const container = document.querySelector<HTMLDivElement>('#portfolio-grid');
  if (!container) return;

  const data = await fetchJSON<PortfolioData>(PORTFOLIO_DATA_URL);
  const featured = data.projects.filter(p => p.status === 'featured');
  renderProjects(container, featured);
}

function renderProjects(container: HTMLDivElement, projects: Project[]): void {
  container.innerHTML = '';
  projects
    .sort((a, b) => a.order - b.order)
    .forEach(project => {
      container.appendChild(buildProjectCard(project));
    });
}

function buildProjectCard(project: Project): HTMLElement {
  const article = document.createElement('article');
  article.className = 'portfolio-card';
  article.dataset.projectId = project.id;
  // ...
  return article;
}
```

## معيار اكتمال المرحلة الثانية

```bash
# يجب أن ينجح بدون أخطاء
npx tsc --noEmit

# فحص لا توجد any غير موثقة
grep -r ": any" js/ --include="*.ts"
# كل سطر في النتيجة يجب أن يكون مُبرراً بـ comment

# فحص جميع الملفات تحوّلت
find js/ -name "*.js" | grep -v "node_modules"
# يجب أن تكون النتيجة فارغة (كل .js أصبح .ts)
```

## القيود التي يجب مراعاتها
- لا `@ts-ignore` بدون EXCEPTION comment موثق
- لا `as unknown as Type` — إشارة على مشكلة في التصميم
- `exactOptionalPropertyTypes: true` يعني أن الحقول الاختيارية تُعلَن بـ `field?: Type` لا `field: Type | undefined`

## التأثير على التطبيق
بعد اكتمال هذه المرحلة، كل خطأ في البيانات (JSON schema مخالف) يُكتشَف في وقت البناء لا في وقت التشغيل.
الانتقال للمرحلة الثالثة يصبح أكثر أماناً — React يستهلك typed data.

## وثائق مرتبطة
- `evolution-matrix.md` — الإطار الذي تعمل ضمنه هذه الخطة
- `json-content-schema.md` (← `03-technical/`) — المصدر الذي تُشتق منه الـ Interfaces
- `react-migration-plan.md` — الخطوة التي تلي هذه مباشرة

## الملف التالي
`react-migration-plan.md`

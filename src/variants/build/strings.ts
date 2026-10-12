/**
 * Variant-local labels: stage names and the text inside the decorative mock UIs.
 * Everything else comes from src/i18n. Arabic is a draft like the rest (see NOTES.md).
 */
import type { Lang } from '../../i18n';
import type { ServiceId } from '../../lib/site';

export type StageId = 'design' | 'build' | 'connect' | 'test';

/** Which services each build stage covers. Headline/text: Design uses its service, the others use hero slides 2–4. */
export const STAGES: { id: StageId; services: ServiceId[]; slide?: 1 | 2 | 3 }[] = [
  { id: 'design', services: ['ux'] },
  { id: 'build', services: ['web', 'android'], slide: 1 },
  { id: 'connect', services: ['api', 'data'], slide: 2 },
  { id: 'test', services: ['qa'], slide: 3 },
];

const en = {
  stage: { design: 'Design', build: 'Build', connect: 'Connect', test: 'Test' } as Record<StageId, string>,
  stageOf: 'Stage',
  compiling: 'compiling…',
  compiled: 'compiled · ready to ship',
  rerun: 'Run the build again',
  passing: 'build passing',
  readme: 'README.md',
  checks: ['Functional', 'Performance', 'Security', 'Cross-device', 'Accessibility'],
  allPassed: 'All checks passed',
  ready: 'Ready to ship',
  nodes: { web: 'Web app', android: 'Android', erp: 'ERP', crm: 'CRM', db: 'Database', bi: 'Reports' },
  synced: 'rows synced',
  selection: 'Button · 44 px',
  appTitle: 'Orders',
  why: 'why',
};

const ar: typeof en = {
  stage: { design: 'التصميم', build: 'البناء', connect: 'الربط', test: 'الاختبار' },
  stageOf: 'المرحلة',
  compiling: 'compiling…',
  compiled: 'compiled · ready to ship',
  rerun: 'أعد تشغيل البناء',
  passing: 'build passing',
  readme: 'README.md',
  checks: ['الوظائف', 'الأداء', 'الأمان', 'تعدّد الأجهزة', 'إمكانية الوصول'],
  allPassed: 'نجحت جميع الاختبارات',
  ready: 'جاهز للإطلاق',
  nodes: { web: 'تطبيق الويب', android: 'أندرويد', erp: 'ERP', crm: 'CRM', db: 'قاعدة البيانات', bi: 'التقارير' },
  synced: 'rows synced',
  selection: 'Button · 44 px',
  appTitle: 'الطلبات',
  why: 'why',
};

export const strings = (lang: Lang) => (lang === 'ar' ? ar : en);

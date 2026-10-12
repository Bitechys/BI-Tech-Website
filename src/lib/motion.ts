/** Client-side helpers shared by every variant. Import only from <script> blocks. */

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Touch-first device (phones, most tablets): use cheaper effects, never hover-only interactions. */
export const coarsePointer = () => window.matchMedia('(pointer: coarse)').matches;

export const isRtl = () => document.documentElement.dir === 'rtl';

/** Cheap capability check before starting WebGL. */
export function canWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return Boolean(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/** Run `fn` once when `el` first comes near the viewport (used to lazy-start heavy scenes). */
export function whenNear(el: Element, fn: () => void, rootMargin = '200px') {
  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      io.disconnect();
      fn();
    }
  }, { rootMargin });
  io.observe(el);
}

/** Smooth-scroll in-page anchor links, respecting reduced motion and a fixed header offset. */
export function initAnchorLinks(offset = 72) {
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href')!.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: reducedMotion() ? 'auto' : 'smooth' });
    history.replaceState(null, '', `#${id}`);
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
}

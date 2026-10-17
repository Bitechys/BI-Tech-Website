/**
 * Client behaviour for the Signal variant. Everything degrades: without JS the page is fully
 * readable; with reduced motion there is no WebGL, no scroll story and no auto-rotation.
 * html.sg-motion (head script) gates the "hidden until it plays" states: words, screenshots,
 * terminal. The head script drops it after 4 s if this module never runs.
 */
import { canWebGL, coarsePointer, initAnchorLinks, isRtl, reducedMotion } from '../../lib/motion';

declare global {
  interface Window {
    __sgReady?: boolean;
  }
}

export function initPage() {
  window.__sgReady = true;
  const reduce = reducedMotion();
  const rtl = isRtl();
  initAnchorLinks(72);
  initTheme(reduce);
  initHeader();
  playOnView('[data-load]', 'is-loaded', 0.3);
  playOnView('[data-term]', 'is-typed', 0.6);
  initMenu();
  initSignal(reduce);
  initPointerEffects(reduce);
  initServicesFallback();
  initHero(reduce);
  if (!reduce) void initScrollMotion(rtl);
}

/* ---------------- theme: light / dark, saved per visitor ---------------- */
const THEME_KEY = 'bt-theme';

function initTheme(reduce: boolean) {
  const btn = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
  if (!btn) return;
  const root = document.documentElement;
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  const sync = () => btn.setAttribute('aria-label', root.dataset.theme === 'light' ? btn.dataset.labelDark! : btn.dataset.labelLight!);
  const apply = (theme: 'light' | 'dark', save: boolean) => {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    if (meta) meta.content = theme === 'light' ? '#f5f7fc' : '#050817';
    if (save) {
      try {
        localStorage.setItem(THEME_KEY, theme);
      } catch {
        /* private mode: the choice lasts for this page only */
      }
    }
    sync();
    document.dispatchEvent(new CustomEvent('bt:theme', { detail: theme }));
  };
  sync();

  btn.addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    if (reduce || !document.startViewTransition) return apply(next, true);
    // The new theme spreads in a circle from the toggle.
    const r = btn.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = document.startViewTransition(() => apply(next, true));
    vt.ready
      .then(() =>
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
          { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
        ),
      )
      .catch(() => {});
  });

  // Until the visitor picks one, follow the system setting live.
  matchMedia('(prefers-color-scheme: light)').addEventListener('change', (m) => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(THEME_KEY);
    } catch {
      /* ignore */
    }
    if (!saved) apply(m.matches ? 'light' : 'dark', false);
  });
}

/* ---------------- one-shot classes when an element comes into view ---------------- */
function playOnView(selector: string, cls: string, threshold: number) {
  const els = document.querySelectorAll(selector);
  if (!els.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add(cls);
        io.unobserve(e.target);
      }
    },
    { threshold },
  );
  els.forEach((el) => io.observe(el));
}

/* ---------------- header: scrolled state + active section + sliding indicator ---------------- */
function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  const onScroll = () => (header.dataset.scrolled = String(window.scrollY > 24));
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const nav = header.querySelector<HTMLElement>('.sg-nav');
  const ind = header.querySelector<HTMLElement>('[data-nav-ind]');
  let current: HTMLAnchorElement | null = null;
  const place = () => {
    if (!nav || !ind) return;
    if (!current || !nav.offsetParent) return ind.classList.remove('is-on');
    const nr = nav.getBoundingClientRect();
    const ar = current.getBoundingClientRect();
    const pad = parseFloat(getComputedStyle(current).paddingInlineStart) || 0;
    ind.style.left = `${ar.left - nr.left + pad}px`;
    ind.style.width = `${Math.max(0, ar.width - pad * 2)}px`;
    ind.classList.add('is-on');
  };
  window.addEventListener('resize', place);
  void document.fonts?.ready.then(place);

  const links = new Map<string, HTMLAnchorElement>();
  header.querySelectorAll<HTMLAnchorElement>('.sg-nav a[href^="#"]').forEach((a) => links.set(a.hash.slice(1), a));
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const a = links.get(e.target.id);
        if (!a) continue;
        if (e.isIntersecting) {
          links.forEach((l) => l.removeAttribute('aria-current'));
          a.setAttribute('aria-current', 'true');
          current = a;
        } else if (current === a) {
          a.removeAttribute('aria-current');
          current = null;
        }
      }
      place();
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  links.forEach((_, id) => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });
}

/* ---------------- mobile menu ---------------- */
function initMenu() {
  const btn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!btn || !menu || !header) return;
  const label = btn.querySelector('.sr-only')!;
  const openText = label.textContent!;
  const closeText = btn.dataset.labelClose!;

  const set = (open: boolean, returnFocus = true) => {
    btn.setAttribute('aria-expanded', String(open));
    header.dataset.open = String(open);
    menu.hidden = !open;
    label.textContent = open ? closeText : openText;
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (open) menu.querySelector<HTMLElement>('a')?.focus();
    else if (returnFocus) btn.focus();
  };
  btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('[data-menu-link]').forEach((a) => a.addEventListener('click', () => set(false, false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') set(false);
  });
  // Keep Tab inside the open menu (button + menu links).
  menu.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const items = [...menu.querySelectorAll<HTMLElement>('a')];
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      btn.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      btn.focus();
    }
  });
  window.matchMedia('(min-width: 1100px)').addEventListener('change', (m) => m.matches && set(false, false));
}

/* ---------------- hero "signal" tabs: slides 2–4 ---------------- */
function initSignal(reduce: boolean) {
  const root = document.querySelector<HTMLElement>('[data-signal]');
  if (!root) return;
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('[data-signal-tab]')];
  const panels = [...root.querySelectorAll<HTMLElement>('[data-signal-panel]')];
  const pauseBtn = root.querySelector<HTMLButtonElement>('[data-signal-pause]')!;
  const pauseLabel = pauseBtn.querySelector('.sr-only')!;
  const DURATION = 6500;
  let index = 0;
  let paused = reduce;
  let hover = false;
  let elapsed = 0;
  let last = performance.now();

  const select = (i: number, focus = false) => {
    index = (i + tabs.length) % tabs.length;
    elapsed = 0;
    tabs.forEach((t, k) => {
      const on = k === index;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      t.style.setProperty('--p', on ? (paused ? '1' : '0') : '0');
    });
    panels.forEach((p, k) => (p.dataset.active = String(k === index)));
    if (focus) tabs[index].focus();
  };
  const setPaused = (p: boolean) => {
    paused = p;
    pauseBtn.setAttribute('aria-pressed', String(p));
    pauseLabel.textContent = p ? pauseBtn.dataset.labelPlay! : pauseBtn.dataset.labelPause!;
    if (p) tabs[index].style.setProperty('--p', '1');
  };

  tabs.forEach((t, i) =>
    t.addEventListener('click', () => {
      select(i);
    }),
  );
  root.querySelector('[role="tablist"]')!.addEventListener('keydown', (e) => {
    const ev = e as KeyboardEvent;
    const fwd = isRtl() ? 'ArrowLeft' : 'ArrowRight';
    const back = isRtl() ? 'ArrowRight' : 'ArrowLeft';
    if (ev.key === fwd) select(index + 1, true);
    else if (ev.key === back) select(index - 1, true);
    else if (ev.key === 'Home') select(0, true);
    else if (ev.key === 'End') select(tabs.length - 1, true);
    else return;
    ev.preventDefault();
  });
  pauseBtn.addEventListener('click', () => setPaused(!paused));
  root.addEventListener('pointerenter', () => (hover = true));
  root.addEventListener('pointerleave', () => (hover = false));
  root.addEventListener('focusin', () => (hover = true));
  root.addEventListener('focusout', () => (hover = false));

  setPaused(paused);
  select(0);
  if (reduce) return;
  const tick = (now: number) => {
    const dt = now - last;
    last = now;
    if (!paused && !hover && document.visibilityState === 'visible') {
      elapsed += dt;
      tabs[index].style.setProperty('--p', String(Math.min(elapsed / DURATION, 1)));
      if (elapsed >= DURATION) select(index + 1);
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ---------------- pointer glow + work-card tilt ---------------- */
function initPointerEffects(reduce: boolean) {
  if (coarsePointer()) return;
  document.querySelectorAll<HTMLElement>('[data-glow], [data-tilt]').forEach((el) => {
    const tilt = el.hasAttribute('data-tilt') && !reduce;
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', `${x * 100}%`);
      el.style.setProperty('--my', `${y * 100}%`);
      if (tilt) {
        el.classList.add('is-tilting');
        el.style.setProperty('--ry', `${(x - 0.5) * 7}deg`);
        el.style.setProperty('--rx', `${(0.5 - y) * 6}deg`);
      }
    });
    el.addEventListener('pointerleave', () => {
      if (!tilt) return;
      el.classList.remove('is-tilting');
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  });
}

/* ---------------- services: highlight diagram node for the card in view (non-pinned) ---------------- */
function setServiceActive(i: number) {
  document.querySelectorAll<HTMLElement>('[data-svc-node]').forEach((n) => (n.dataset.active = String(Number(n.dataset.svcNode) === i)));
  document.querySelectorAll<HTMLElement>('[data-svc-icon]').forEach((n) => (n.dataset.active = String(Number(n.dataset.svcIcon) === i)));
  document.querySelectorAll<HTMLElement>('[data-svc-item]').forEach((n) => (n.dataset.active = String(Number(n.dataset.svcItem) === i)));
  const cur = document.querySelector('[data-svc-current]');
  if (cur) cur.textContent = String(i + 1).padStart(2, '0');
}

function initServicesFallback() {
  const stage = document.querySelector<HTMLElement>('[data-svc-stage]');
  if (!stage) return;
  const io = new IntersectionObserver(
    (entries) => {
      if (stage.classList.contains('is-pinned')) return;
      for (const e of entries) if (e.isIntersecting) setServiceActive(Number((e.target as HTMLElement).dataset.svcItem));
    },
    { rootMargin: '-40% 0px -50% 0px' },
  );
  stage.querySelectorAll('[data-svc-item]').forEach((el) => io.observe(el));
}

/* ---------------- hero WebGL ---------------- */
function initHero(reduce: boolean) {
  const canvas = document.querySelector<HTMLCanvasElement>('[data-hero-canvas]');
  const host = canvas?.closest<HTMLElement>('.sg-hero');
  if (!canvas || !host) return;
  const wide = window.matchMedia('(min-width: 900px)');
  if (reduce || coarsePointer() || !wide.matches || !canWebGL()) return;

  let dispose: (() => void) | null = null;
  const start = async () => {
    if (dispose) return;
    const { startHeroScene } = await import('./hero-scene');
    dispose = startHeroScene(canvas, host, isRtl());
  };
  const idle = (cb: () => void) => ('requestIdleCallback' in window ? requestIdleCallback(cb, { timeout: 1200 }) : setTimeout(cb, 300));
  if (document.readyState === 'complete') idle(start);
  else window.addEventListener('load', () => idle(start), { once: true });
  // Back/forward cache: the scene disposes on pagehide, so bring it back on restore.
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      dispose = null;
      void start();
    }
  });
}

/* ---------------- GSAP: hero intro, reveals, pulse rule, pinned services ---------------- */
async function initScrollMotion(rtl: boolean) {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('[data-hero-in]', { y: 28, opacity: 0, duration: 1.1, ease: 'power3.out', stagger: 0.09, delay: 0.05 });

  // Intro sentence: words light up in reading order as it scrolls through.
  const words = document.querySelectorAll('[data-words] .sg-word');
  if (words.length) {
    gsap.fromTo(
      words,
      { opacity: 0.16 },
      { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: '[data-words]', start: 'top 85%', end: 'bottom 50%', scrub: 0.5 } },
    );
  }

  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%',
    once: true,
    onEnter: (els) => {
      // A jump (nav link, refresh mid-page) "enters" everything passed on the way: only animate
      // what is actually on screen, and cap the stagger so nothing waits seconds to appear.
      const onScreen = (els as HTMLElement[]).filter((el) => {
        const r = el.getBoundingClientRect();
        return r.bottom > 0 && r.top < window.innerHeight;
      });
      if (onScreen.length) gsap.from(onScreen, { y: 26, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: { each: 0.08, amount: Math.min(0.5, onScreen.length * 0.08) } });
    },
  });

  const rule = document.querySelector<SVGPathElement>('.sg-pulse-rule path');
  if (rule) {
    gsap.fromTo(
      rule,
      { '--draw': 1 },
      { '--draw': 0, ease: 'none', scrollTrigger: { trigger: rule, start: 'top 90%', end: 'top 45%', scrub: 0.6 } },
    );
  }

  // Clients logos drift in from the reading direction.
  gsap.utils.toArray<HTMLElement>('.sg-logos li').forEach((el, i) => {
    gsap.from(el, { x: (rtl ? -1 : 1) * 24, opacity: 0, duration: 0.8, delay: i * 0.05, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
  });

  const stage = document.querySelector<HTMLElement>('[data-svc-stage]');
  if (!stage) return;
  const items = stage.querySelectorAll('[data-svc-item]');
  const bar = stage.querySelector<HTMLElement>('[data-svc-bar]');
  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px) and (min-height: 640px)', () => {
    stage.classList.add('is-pinned');
    setServiceActive(0);
    ScrollTrigger.refresh();
    const st = ScrollTrigger.create({
      trigger: stage,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const i = Math.min(items.length - 1, Math.floor(self.progress * items.length));
        if (bar) bar.style.setProperty('--p', String(self.progress));
        if (String(i) !== stage.dataset.active) {
          stage.dataset.active = String(i);
          setServiceActive(i);
        }
      },
    });
    return () => {
      st.kill();
      stage.classList.remove('is-pinned');
      delete stage.dataset.active;
    };
  });
}

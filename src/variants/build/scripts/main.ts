/**
 * Variant "Build" behaviour. Header + menu always; everything else only when <html> carries
 * .bt-motion (motion allowed and set in <head> before first paint). Without it the page
 * is already in its final state, so there is nothing to undo.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initAnchorLinks, coarsePointer } from '../../../lib/motion';

const root = document.documentElement;
const HDR = 72;

if (document.body.classList.contains('v-build')) init();

function init() {
  root.classList.add('bt-ready');
  initHeader();
  initMenu();
  initAnchorLinks(HDR + 8);
  if (!root.classList.contains('bt-motion')) return;

  gsap.registerPlugin(ScrollTrigger);
  initHero();
  initWords();
  initReveals();
  initStages();
  initWork();
  initCta();
}

/* ---------- header ---------- */
function initHeader() {
  const hdr = document.querySelector<HTMLElement>('[data-hdr]');
  if (!hdr) return;
  const onScroll = () => hdr.toggleAttribute('data-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Dark header while it sits over a dark section.
  const dark = new Set<Element>();
  const darkIo = new IntersectionObserver(
    (entries) => {
      for (const e of entries) e.isIntersecting ? dark.add(e.target) : dark.delete(e.target);
      hdr.toggleAttribute('data-dark', dark.size > 0);
    },
    // A band at header height: intersecting = the section is under the header.
    { rootMargin: `-${HDR / 2}px 0px -${window.innerHeight - HDR / 2 - 1}px 0px` },
  );
  document.querySelectorAll('.stages, .contact').forEach((s) => darkIo.observe(s));

  // Mark the nav link of the section in the middle of the viewport.
  const links = new Map<string, HTMLAnchorElement>();
  hdr.querySelectorAll<HTMLAnchorElement>('.hdr-nav a[href^="#"]').forEach((a) => links.set(a.hash.slice(1), a));
  const visible = new Set<string>();
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id);
      const current = [...links.keys()].filter((id) => visible.has(id)).pop();
      links.forEach((a, id) => (id === current ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  links.forEach((_, id) => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });
}

function initMenu() {
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  if (!menu || !openBtn) return;

  const focusables = () => [...menu.querySelectorAll<HTMLElement>('a, button')];
  const close = (restore = true) => {
    if (menu.hidden) return;
    menu.hidden = true;
    menu.classList.remove('is-open');
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKey);
    if (restore) openBtn.focus();
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') return close();
    if (e.key !== 'Tab') return;
    const f = focusables();
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };
  openBtn.addEventListener('click', () => {
    menu.hidden = false;
    requestAnimationFrame(() => menu.classList.add('is-open'));
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    menu.querySelector<HTMLElement>('[data-menu-link]')?.focus();
  });
  menu.querySelector('[data-menu-close]')?.addEventListener('click', () => close());
  menu.querySelectorAll('[data-menu-link]').forEach((a) => a.addEventListener('click', () => close(false)));
  window.matchMedia('(min-width: 1080px)').addEventListener('change', (e) => e.matches && close(false));
}

/* ---------- hero: type → compile → assemble ---------- */
function initHero() {
  gsap.to('.hero-reveal', { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out', delay: 0.1 });

  const hv = document.querySelector<HTMLElement>('[data-hv]');
  if (!hv) return;
  const lines = [...hv.querySelectorAll<HTMLElement>('.cl')];
  const caret = hv.querySelector<HTMLElement>('[data-caret]')!;
  const devices = hv.querySelectorAll<HTMLElement>('[data-device]');
  const chip = hv.querySelector<HTMLElement>('[data-chip]');
  const runBtn = hv.querySelector<HTMLButtonElement>('[data-run]');
  hv.querySelectorAll<HTMLElement>('.ui .blk').forEach((b, i) => (b.style.transitionDelay = `${i * 45}ms`));

  let tl: gsap.core.Timeline | null = null;

  const run = () => {
    tl?.kill();
    hv.classList.remove('is-built', 'is-styled', 'is-compiling');
    hv.classList.add('is-typing');
    gsap.set(lines, { clipPath: 'inset(0 100% 0 0)' });
    gsap.set(devices, { opacity: 0, y: 28, scale: 0.96 });
    gsap.set(chip, { opacity: 0, y: -8 });

    tl = gsap.timeline({ delay: 0.35 });
    lines.forEach((line, i) => {
      const n = Number(line.dataset.n);
      const ind = Number(line.dataset.indent);
      if (i === 4) tl!.addLabel('devices');
      if (!n) {
        tl!.set(line, { clipPath: 'inset(0 0% 0 0)' }).to({}, { duration: 0.12 });
        return;
      }
      const chars = n - ind;
      // One counter drives both the clip and the caret, so they can never drift apart.
      const typed = { c: ind };
      let ch = 0;
      tl!.add(() => {
        ch = line.getBoundingClientRect().width / n;
        gsap.set(caret, { y: line.offsetTop + (line.offsetHeight - caret.offsetHeight) / 2, x: line.offsetLeft + ind * ch });
      });
      tl!.to(typed, {
        c: n,
        duration: chars * 0.014,
        ease: `steps(${chars})`,
        onUpdate: () => {
          line.style.clipPath = `inset(0 ${(1 - typed.c / n) * 100}% 0 0)`;
          gsap.set(caret, { x: line.offsetLeft + typed.c * ch });
        },
      });
      tl!.to({}, { duration: 0.04 });
    });
    tl.to(devices, { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.18, ease: 'power3.out' }, 'devices');
    tl.add(() => {
      hv.classList.remove('is-typing');
      hv.classList.add('is-compiling');
    });
    tl.to({}, { duration: 0.75 });
    tl.add(() => {
      hv.classList.remove('is-compiling');
      hv.classList.add('is-built', 'is-styled');
    });
    tl.to(chip, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' }, '+=0.9');
    tl.add(() => {
      if (runBtn) runBtn.hidden = false;
    });
  };

  run();
  runBtn?.addEventListener('click', run);

  // Gentle depth on desktop: layers drift with the pointer (CSS `translate`, so it never
  // fights the GSAP transforms above).
  if (!coarsePointer()) {
    const layers: [string, number][] = [
      ['.hv-editor', -6],
      ['.hv-browser', 10],
      ['.hv-phone', 18],
      ['.hv-chip', 24],
    ];
    const els = layers.map(([sel, depth]) => [hv.querySelector<HTMLElement>(sel)!, depth] as const);
    const state = { x: 0, y: 0 };
    const apply = () => els.forEach(([el, d]) => (el.style.translate = `${state.x * d}px ${state.y * d}px`));
    hv.addEventListener('pointermove', (e) => {
      const r = hv.getBoundingClientRect();
      gsap.to(state, {
        x: (e.clientX - r.left) / r.width - 0.5,
        y: (e.clientY - r.top) / r.height - 0.5,
        duration: 0.8,
        ease: 'power3.out',
        onUpdate: apply,
        overwrite: true,
      });
    });
    hv.addEventListener('pointerleave', () => gsap.to(state, { x: 0, y: 0, duration: 1, ease: 'power3.out', onUpdate: apply, overwrite: true }));
  }

  gsap.to('.hv-stage', {
    y: -56,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
}

/* ---------- intro: words light up as you read ---------- */
function initWords() {
  document.querySelectorAll<HTMLElement>('[data-words]').forEach((el) => {
    const text = el.textContent ?? '';
    const sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = text;
    const vis = document.createElement('span');
    vis.setAttribute('aria-hidden', 'true');
    for (const part of text.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) {
        vis.append(part);
      } else {
        const w = document.createElement('span');
        w.className = 'word';
        w.textContent = part;
        vis.append(w);
      }
    }
    el.replaceChildren(sr, vis);
    gsap.fromTo(
      vis.querySelectorAll('.word'),
      { opacity: 0.14 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 48%', scrub: 0.4 },
      },
    );
  });
}

/* ---------- generic reveals ---------- */
function initReveals() {
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 86%', once: true },
    });
  });
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((el) => {
    gsap.to(el.children, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 86%', once: true },
    });
  });
}

/* ---------- services: pinned build stages ---------- */
function initStages() {
  const section = document.querySelector<HTMLElement>('[data-stages]');
  const pin = section?.querySelector<HTMLElement>('[data-stages-pin]');
  if (!section || !pin) return;
  const stages = [...section.querySelectorAll<HTMLElement>('[data-stage]')];
  const steps = [...section.querySelectorAll<HTMLElement>('[data-rail-step]')];
  const fill = section.querySelector<HTMLElement>('[data-rail-fill]');
  const last = stages.length - 1;

  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px) and (min-height: 680px)', () => {
    section.classList.add('is-pinned');
    let current = -1;
    let finished = false;
    const set = (i: number, done: boolean) => {
      if (i === current && done === finished) return;
      current = i;
      finished = done;
      stages.forEach((s, k) => s.classList.toggle('is-active', k === i));
      steps.forEach((s, k) => {
        s.classList.toggle('is-current', k === i);
        s.classList.toggle('is-done', k < i || (done && k === i));
      });
    };
    set(0, false);

    ScrollTrigger.create({
      trigger: pin,
      start: `top top+=${HDR}`,
      end: () => `+=${window.innerHeight * last}`,
      pin: true,
      anticipatePin: 1,
      snap: { snapTo: 1 / last, duration: { min: 0.25, max: 0.6 }, delay: 0.08, ease: 'power2.inOut' },
      onUpdate: (self) => {
        const p = self.progress;
        if (fill) gsap.set(fill, { scaleX: p });
        set(Math.min(last, Math.round(p * last)), p > 0.985);
      },
    });

    return () => {
      section.classList.remove('is-pinned');
      stages.forEach((s) => s.classList.remove('is-active'));
      steps.forEach((s) => s.classList.remove('is-current', 'is-done'));
    };
  });
}

/* ---------- work: each site "loads" into its browser frame ---------- */
function initWork() {
  document.querySelectorAll<HTMLElement>('[data-proj]').forEach((proj, i) => {
    const load = proj.querySelector('[data-load]');
    const shot = proj.querySelector('[data-shot]');
    const copy = proj.querySelector('.proj-copy');
    gsap.set(proj, { opacity: 0, y: 40 });
    gsap.set(shot, { clipPath: 'inset(0 0 100% 0)' });
    gsap.set(copy, { opacity: 0, y: 14 });
    gsap.set(load, { opacity: 1, scaleX: 0 });
    gsap
      .timeline({ scrollTrigger: { trigger: proj, start: 'top 84%', once: true }, delay: (i % 2) * 0.12 })
      .to(proj, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to(load, { scaleX: 1, duration: 0.7, ease: 'power2.inOut' }, '-=0.4')
      .to(shot, { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power3.inOut' }, '-=0.35')
      .to(load, { opacity: 0, duration: 0.3 }, '-=0.3')
      .to(copy, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5');
  });
}

/* ---------- cta: the command types itself ---------- */
function initCta() {
  const cmd = document.querySelector<HTMLElement>('[data-cmd]');
  if (!cmd) return;
  const n = cmd.textContent?.length ?? 20;
  gsap.fromTo(
    cmd,
    { clipPath: 'inset(0 100% 0 0)' },
    {
      clipPath: 'inset(0 0% 0 0)',
      duration: n * 0.045,
      ease: `steps(${n})`,
      scrollTrigger: { trigger: cmd, start: 'top 85%', once: true },
    },
  );
  gsap.from('.cta-title', {
    opacity: 0,
    y: 30,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.cta-panel', start: 'top 80%', once: true },
  });
}

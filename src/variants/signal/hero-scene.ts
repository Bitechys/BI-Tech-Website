/**
 * Hero scene for the Signal variant: a slowly turning sphere of connected nodes (your systems),
 * "data" pulses walking the graph, two dotted orbits (the logo's signal arcs), and a pointer that
 * tilts the sphere and bends nearby nodes towards it. One renderer, four draw calls.
 * Two looks: dark = additive glow on near-black; light = navy ink on off-white with normal
 * blending, depth carried by alpha. Follows the page theme live (`bt:theme` from signal.ts).
 * Loaded with a dynamic import after first paint, only on wide, fine-pointer, motion-OK screens.
 */
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  LineBasicMaterial,
  LineSegments,
  NormalBlending,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from 'three';

const SKY = [0.192, 0.702, 0.929];
const PALE = [0.62, 0.72, 1.0];
const NAVY = [0.24, 0.36, 0.95];
// Light theme inks.
const SKY_L = [0.04, 0.55, 0.85];
const INK_L = [0.133, 0.2, 0.557];
const LINE_L = [0.2, 0.3, 0.7];

const pointVert = /* glsl */ `
  attribute float aSize;
  attribute vec4 aColor;
  varying vec4 vColor;
  uniform float uDpr;
  void main() {
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uDpr * (700.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;
const pointFrag = /* glsl */ `
  varying vec4 vColor;
  uniform float uLight;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = pow(smoothstep(0.5, 0.0, d), 1.8);
    if (a < 0.01) discard;
    // Dark: additive glow (rgb already scaled by depth). Light: ink with alpha from depth.
    gl_FragColor = uLight > 0.5 ? vec4(vColor.rgb, a * vColor.a) : vec4(vColor.rgb * a, a);
  }
`;

export function startHeroScene(canvas: HTMLCanvasElement, host: HTMLElement, rtl: boolean): () => void {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(45, 1, 1, 3000);
  camera.position.set(0, 0, 900);

  let s = 11;
  const rand = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;

  // ---- graph on a Fibonacci sphere (unit radius) ----
  const N = 230;
  const unit = new Float32Array(N * 3);
  const hub = new Uint8Array(N);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    unit[i * 3] = Math.cos(th) * r;
    unit[i * 3 + 1] = y;
    unit[i * 3 + 2] = Math.sin(th) * r;
    hub[i] = rand() < 0.07 ? 1 : 0;
  }

  const edges: [number, number][] = [];
  const adj: number[][] = Array.from({ length: N }, () => []);
  {
    const seen = new Set<number>();
    for (let i = 0; i < N; i++) {
      const near: { j: number; d: number }[] = [];
      for (let j = 0; j < N; j++) {
        if (i === j) continue;
        const dx = unit[i * 3] - unit[j * 3];
        const dy = unit[i * 3 + 1] - unit[j * 3 + 1];
        const dz = unit[i * 3 + 2] - unit[j * 3 + 2];
        near.push({ j, d: dx * dx + dy * dy + dz * dz });
      }
      near.sort((a, b) => a.d - b.d);
      const k = hub[i] ? 6 : 3;
      for (let n = 0; n < k; n++) {
        const j = near[n].j;
        if (near[n].d > (hub[i] ? 0.16 : 0.07)) break;
        const key = i < j ? i * N + j : j * N + i;
        if (seen.has(key)) continue;
        seen.add(key);
        adj[i].push(edges.length);
        adj[j].push(edges.length);
        edges.push([i, j]);
      }
    }
  }
  const E = edges.length;

  const pointMat = new ShaderMaterial({
    vertexShader: pointVert,
    fragmentShader: pointFrag,
    uniforms: { uDpr: { value: dpr }, uLight: { value: 0 } },
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });

  // ---- nodes ----
  const pos = new Float32Array(N * 3);
  const depth = new Float32Array(N);
  const nodeSize = new Float32Array(N);
  const nodeColor = new Float32Array(N * 4);
  for (let i = 0; i < N; i++) nodeSize[i] = hub[i] ? 26 : 9 + rand() * 4;
  const nodeGeo = new BufferGeometry();
  nodeGeo.setAttribute('position', new BufferAttribute(pos, 3));
  nodeGeo.setAttribute('aSize', new BufferAttribute(nodeSize, 1));
  nodeGeo.setAttribute('aColor', new BufferAttribute(nodeColor, 4));
  scene.add(new Points(nodeGeo, pointMat));

  // ---- edges (rgba: alpha is used by the light look) ----
  const linePos = new Float32Array(E * 6);
  const lineCol = new Float32Array(E * 8);
  const lineGeo = new BufferGeometry();
  lineGeo.setAttribute('position', new BufferAttribute(linePos, 3));
  lineGeo.setAttribute('color', new BufferAttribute(lineCol, 4));
  const lineMat = new LineBasicMaterial({ vertexColors: true, transparent: true, depthWrite: false, blending: AdditiveBlending });
  scene.add(new LineSegments(lineGeo, lineMat));

  // ---- orbits: two dotted rings, like the logo's signal arcs ----
  const RING = 220;
  const ringPos = new Float32Array(RING * 2 * 3);
  const ringSize = new Float32Array(RING * 2);
  const ringColor = new Float32Array(RING * 2 * 4);
  const ringGeo = new BufferGeometry();
  ringGeo.setAttribute('position', new BufferAttribute(ringPos, 3));
  ringGeo.setAttribute('aSize', new BufferAttribute(ringSize, 1));
  ringGeo.setAttribute('aColor', new BufferAttribute(ringColor, 4));
  scene.add(new Points(ringGeo, pointMat));

  // ---- pulses ----
  const P = 42;
  const pulseEdge = new Int32Array(P);
  const pulseDir = new Int8Array(P);
  const pulseT = new Float32Array(P);
  const pulseSpeed = new Float32Array(P);
  for (let p = 0; p < P; p++) {
    pulseEdge[p] = Math.floor(rand() * E);
    pulseDir[p] = rand() < 0.5 ? 1 : -1;
    pulseT[p] = rand();
    pulseSpeed[p] = 0.6 + rand() * 0.9;
  }
  const pulsePos = new Float32Array(P * 3);
  const pulseSize = new Float32Array(P);
  const pulseColor = new Float32Array(P * 4);
  const pulseGeo = new BufferGeometry();
  pulseGeo.setAttribute('position', new BufferAttribute(pulsePos, 3));
  pulseGeo.setAttribute('aSize', new BufferAttribute(pulseSize, 1));
  pulseGeo.setAttribute('aColor', new BufferAttribute(pulseColor, 4));
  scene.add(new Points(pulseGeo, pointMat));

  // ---- theme ----
  let light = false;
  let flash = 0; // 1 → 0: a ripple runs out through the network after a theme switch
  const setTheme = (e?: Event) => {
    light = document.documentElement.dataset.theme === 'light';
    if (e) flash = 1;
    pointMat.uniforms.uLight.value = light ? 1 : 0;
    pointMat.blending = lineMat.blending = light ? NormalBlending : AdditiveBlending;
    pointMat.needsUpdate = lineMat.needsUpdate = true;
  };
  setTheme();
  document.addEventListener('bt:theme', setTheme);

  // ---- layout ----
  let halfW = 600;
  let halfH = 400;
  let R = 260;
  let cx = 250;
  const resize = () => {
    const w = host.clientWidth;
    const h = host.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    halfW = halfH * camera.aspect;
    R = Math.min(halfH * 0.66, halfW * 0.4);
    cx = halfW - R * 1.25; // sits on the far side of the copy
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(host);

  // ---- pointer ----
  const pointer = { x: 0, y: 0, tx: 0, ty: 0, nx: 0, ny: 0, active: 0, tactive: 0 };
  const onMove = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    let nx = ((e.clientX - r.left) / r.width) * 2 - 1;
    if (rtl) nx = -nx; // the canvas is mirrored with CSS in RTL
    const ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
    pointer.tx = nx * halfW;
    pointer.ty = ny * halfH;
    pointer.nx = nx;
    pointer.ny = ny;
    pointer.tactive = 1;
  };
  const onLeave = () => {
    pointer.tactive = 0;
    pointer.nx = 0;
    pointer.ny = 0;
  };
  host.addEventListener('pointermove', onMove, { passive: true });
  host.addEventListener('pointerleave', onLeave);

  // ---- loop ----
  let running = false;
  let visible = true;
  let raf = 0;
  let last = performance.now();
  let firstFrame = true;
  let spin = 0.6;
  let tiltX = 0.32;
  let tiltY = 0;
  const BEND = 170;

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const t = now / 1000;

    pointer.x += (pointer.tx - pointer.x) * 0.1;
    pointer.y += (pointer.ty - pointer.y) * 0.1;
    pointer.active += (pointer.tactive - pointer.active) * 0.06;
    spin += dt * 0.09;
    flash = Math.max(0, flash - dt / 1.1);
    const wave = (1 - flash) * R * 1.6;
    tiltX += (0.32 - pointer.ny * 0.22 - tiltX) * 0.04;
    tiltY += (pointer.nx * 0.35 - tiltY) * 0.04;

    const ay = spin + tiltY;
    const cyA = Math.cos(ay);
    const syA = Math.sin(ay);
    const cxA = Math.cos(tiltX);
    const sxA = Math.sin(tiltX);
    const breathe = 1 + Math.sin(t * 0.6) * 0.012;

    for (let i = 0; i < N; i++) {
      const ux = unit[i * 3];
      const uy = unit[i * 3 + 1];
      const uz = unit[i * 3 + 2];
      // rotate Y then X
      const x1 = ux * cyA + uz * syA;
      const z1 = -ux * syA + uz * cyA;
      const y2 = uy * cxA - z1 * sxA;
      const z2 = uy * sxA + z1 * cxA;
      let x = cx + x1 * R * breathe;
      let y = y2 * R * breathe;
      const z = z2 * R;
      depth[i] = (z2 + 1) / 2; // 0 back … 1 front
      if (pointer.active > 0.01 && z2 > -0.2) {
        const dx = pointer.x - x;
        const dy = pointer.y - y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < BEND) {
          const f = Math.pow(1 - d / BEND, 2) * 0.38 * pointer.active;
          x += dx * f;
          y += dy * f;
        }
      }
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      const o4 = i * 4;
      if (light) {
        const c = hub[i] ? SKY_L : INK_L;
        nodeColor[o4] = c[0];
        nodeColor[o4 + 1] = c[1];
        nodeColor[o4 + 2] = c[2];
        nodeColor[o4 + 3] = 0.1 + depth[i] * 0.85;
      } else {
        const k = 0.18 + depth[i] * 0.95;
        const c = hub[i] ? SKY : PALE;
        nodeColor[o4] = c[0] * k;
        nodeColor[o4 + 1] = c[1] * k;
        nodeColor[o4 + 2] = c[2] * k;
        nodeColor[o4 + 3] = 1;
      }
    }
    nodeGeo.attributes.position.needsUpdate = true;
    nodeGeo.attributes.aColor.needsUpdate = true;

    for (let e = 0; e < E; e++) {
      const [a, b] = edges[e];
      linePos.set(pos.subarray(a * 3, a * 3 + 3), e * 6);
      linePos.set(pos.subarray(b * 3, b * 3 + 3), e * 6 + 3);
      for (let k = 0; k < 2; k++) {
        const n = k ? b : a;
        const dx = pointer.x - pos[n * 3];
        const dy = pointer.y - pos[n * 3 + 1];
        let glow = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / (BEND * 1.5)) * pointer.active * depth[n];
        if (flash > 0) {
          const d = Math.hypot(pos[n * 3] - cx, pos[n * 3 + 1]);
          glow = Math.max(glow, Math.max(0, 1 - Math.abs(d - wave) / 70) * flash * (0.4 + depth[n] * 0.6));
        }
        const dk = 0.06 + depth[n] * depth[n] * 0.5;
        const o = e * 8 + k * 4;
        if (light) {
          const g = Math.min(1, glow * 1.4);
          lineCol[o] = LINE_L[0] + (SKY_L[0] - LINE_L[0]) * g;
          lineCol[o + 1] = LINE_L[1] + (SKY_L[1] - LINE_L[1]) * g;
          lineCol[o + 2] = LINE_L[2] + (SKY_L[2] - LINE_L[2]) * g;
          lineCol[o + 3] = Math.min(1, dk * 0.75 + glow * 0.6);
        } else {
          lineCol[o] = NAVY[0] * dk + SKY[0] * glow * 0.7;
          lineCol[o + 1] = NAVY[1] * dk + SKY[1] * glow * 0.7;
          lineCol[o + 2] = NAVY[2] * dk + SKY[2] * glow * 0.7;
          lineCol[o + 3] = 1;
        }
      }
    }
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.attributes.color.needsUpdate = true;

    // Orbits: tilted ellipses around the sphere, turning slowly in opposite directions.
    for (let r = 0; r < 2; r++) {
      const rad = R * (r ? 1.48 : 1.26);
      const tilt = r ? -0.38 : 0.22;
      const rot = t * (r ? -0.05 : 0.07);
      for (let i = 0; i < RING; i++) {
        const a = (i / RING) * Math.PI * 2 + rot;
        const ex = Math.cos(a) * rad;
        const ey = Math.sin(a) * rad * 0.24;
        const o = (r * RING + i) * 3;
        ringPos[o] = cx + ex * Math.cos(tilt) - ey * Math.sin(tilt);
        ringPos[o + 1] = ex * Math.sin(tilt) + ey * Math.cos(tilt);
        ringPos[o + 2] = Math.sin(a) * rad * 0.5;
        const front = (Math.sin(a) + 1) / 2;
        // A short bright "signal" travelling along each ring.
        const head = ((t * (r ? 0.12 : 0.17)) % 1) * RING;
        const dist = Math.min(Math.abs(i - head), RING - Math.abs(i - head));
        const sig = Math.max(0, 1 - dist / 16);
        ringSize[r * RING + i] = 3.6 + sig * 8;
        const k = 0.3 + front * 0.6;
        const c4 = (r * RING + i) * 4;
        if (light) {
          ringColor[c4] = LINE_L[0] + (SKY_L[0] - LINE_L[0]) * sig;
          ringColor[c4 + 1] = LINE_L[1] + (SKY_L[1] - LINE_L[1]) * sig;
          ringColor[c4 + 2] = LINE_L[2] + (SKY_L[2] - LINE_L[2]) * sig;
          ringColor[c4 + 3] = Math.min(1, k * 0.55 + sig);
        } else {
          ringColor[c4] = NAVY[0] * k + SKY[0] * sig;
          ringColor[c4 + 1] = NAVY[1] * k + SKY[1] * sig;
          ringColor[c4 + 2] = NAVY[2] * k + SKY[2] * sig;
          ringColor[c4 + 3] = 1;
        }
      }
    }
    ringGeo.attributes.position.needsUpdate = true;
    ringGeo.attributes.aSize.needsUpdate = true;
    ringGeo.attributes.aColor.needsUpdate = true;

    for (let p = 0; p < P; p++) {
      pulseT[p] += pulseSpeed[p] * dt;
      if (pulseT[p] >= 1) {
        // Arrived: continue along another edge from the node we reached.
        const [a, b] = edges[pulseEdge[p]];
        const at = pulseDir[p] > 0 ? b : a;
        const options = adj[at];
        const next = options[Math.floor(Math.random() * options.length)];
        pulseEdge[p] = next;
        pulseDir[p] = edges[next][0] === at ? 1 : -1;
        pulseT[p] = 0;
      }
      const [a, b] = edges[pulseEdge[p]];
      const from = pulseDir[p] > 0 ? a : b;
      const to = pulseDir[p] > 0 ? b : a;
      const tt = pulseT[p];
      for (let c = 0; c < 3; c++) pulsePos[p * 3 + c] = pos[from * 3 + c] + (pos[to * 3 + c] - pos[from * 3 + c]) * tt;
      const dk = depth[from] + (depth[to] - depth[from]) * tt;
      pulseSize[p] = (8 + Math.sin(tt * Math.PI) * 8) * (0.4 + dk * 0.8);
      if (light) {
        pulseColor[p * 4] = SKY_L[0];
        pulseColor[p * 4 + 1] = SKY_L[1];
        pulseColor[p * 4 + 2] = SKY_L[2];
        pulseColor[p * 4 + 3] = 0.3 + dk * 0.7;
      } else {
        const k = 0.25 + dk * 1.25;
        pulseColor[p * 4] = SKY[0] * k;
        pulseColor[p * 4 + 1] = SKY[1] * k;
        pulseColor[p * 4 + 2] = SKY[2] * k;
        pulseColor[p * 4 + 3] = 1;
      }
    }
    pulseGeo.attributes.position.needsUpdate = true;
    pulseGeo.attributes.aSize.needsUpdate = true;
    pulseGeo.attributes.aColor.needsUpdate = true;

    renderer.render(scene, camera);
    if (firstFrame) {
      firstFrame = false;
      host.dataset.webgl = 'on';
    }
  };

  const setRunning = () => {
    const should = visible && document.visibilityState === 'visible';
    if (should && !running) {
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    } else if (!should && running) {
      running = false;
      cancelAnimationFrame(raf);
    }
  };
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    setRunning();
  });
  io.observe(host);
  document.addEventListener('visibilitychange', setRunning);
  setRunning();

  const dispose = () => {
    cancelAnimationFrame(raf);
    running = false;
    io.disconnect();
    ro.disconnect();
    document.removeEventListener('visibilitychange', setRunning);
    document.removeEventListener('bt:theme', setTheme);
    host.removeEventListener('pointermove', onMove);
    host.removeEventListener('pointerleave', onLeave);
    [nodeGeo, lineGeo, ringGeo, pulseGeo].forEach((g) => g.dispose());
    pointMat.dispose();
    lineMat.dispose();
    renderer.dispose();
    delete host.dataset.webgl;
  };
  window.addEventListener('pagehide', dispose, { once: true });
  return dispose;
}

import * as THREE from "three";

const D = 150;
const DEPTH = 45;
const STEP = 10;
const PI = Math.PI;

const rnd = (r: number) => (Math.random() * 2 - 1) * r;
const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export type Starfield = {
  state: { rx: number; ry: number; zoom: number };
  drift: { a: number };
  nudge: { rx: number; ry: number };
  reveal: (p: number) => void;
  resize: () => void;
  start: () => void;
  dispose: () => void;
};

export function createStarfield(
  canvas: HTMLCanvasElement,
  lite: number,
): Starfield {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 1);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 1, 2000);
  camera.position.set(0, 0, D);
  const group = new THREE.Group();
  group.rotation.order = "YXZ";
  scene.add(group);

  const sc = document.createElement("canvas");
  sc.width = sc.height = 64;
  const sg = sc.getContext("2d")!;
  const gr = sg.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, "rgba(255,255,255,1)");
  gr.addColorStop(0.25, "rgba(255,255,255,.75)");
  gr.addColorStop(1, "rgba(255,255,255,0)");
  sg.fillStyle = gr;
  sg.fillRect(0, 0, 64, 64);
  const sprite = new THREE.CanvasTexture(sc);

  const pal = [
    [1, 1, 1],
    [0.72, 0.84, 1],
    [1, 0.9, 0.74],
    [0.82, 0.92, 1],
  ];
  const colors = (n: number) => {
    const a = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const p = pal[(Math.random() * pal.length) | 0];
      const b = 0.55 + Math.random() * 0.45;
      a[i * 3] = p[0] * b;
      a[i * 3 + 1] = p[1] * b;
      a[i * 3 + 2] = p[2] * b;
    }
    return a;
  };

  const starGeos: { geo: THREE.BufferGeometry; n: number }[] = [];
  const mats: THREE.Material[] = [];
  const makePoints = (pos: Float32Array, size: number) => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute(
      "color",
      new THREE.BufferAttribute(colors(pos.length / 3), 3),
    );
    const mat = new THREE.PointsMaterial({
      size,
      map: sprite,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    group.add(new THREE.Points(geo, mat));
    starGeos.push({ geo, n: pos.length / 3 });
    mats.push(mat);
    return mat;
  };

  const NB = Math.round(420 * lite);
  const NBand = Math.round(520 * lite);
  const bg = new Float32Array((NB + NBand) * 3);
  for (let i = 0; i < NB; i++) {
    bg[i * 3] = rnd(120);
    bg[i * 3 + 1] = rnd(75);
    bg[i * 3 + 2] = rnd(120);
  }
  for (let i = NB; i < NB + NBand; i++) {
    bg[i * 3] = rnd(75);
    bg[i * 3 + 1] = rnd(44);
    bg[i * 3 + 2] = rnd(75);
  }
  const bgMat = makePoints(bg, 2.0);

  // Sample the "ERIC MAN" glyph pixels into star positions
  const cw = 560;
  const ch = 340;
  const S = 0.18;
  const tc = document.createElement("canvas");
  tc.width = cw;
  tc.height = ch;
  const tg = tc.getContext("2d", { willReadFrequently: true })!;
  tg.fillStyle = "#fff";
  tg.font = '900 160px "Arial Black", Impact, Helvetica, sans-serif';
  tg.textAlign = "center";
  tg.textBaseline = "middle";
  tg.fillText("ERIC", cw / 2, 88);
  tg.fillText("MAN", cw / 2, 252);
  const img = tg.getImageData(0, 0, cw, ch).data;
  const pts: [number, number][] = [];
  for (let y = 0; y < ch; y += STEP)
    for (let x = 0; x < cw; x += STEP) {
      if (img[(y * cw + x) * 4 + 3] > 128)
        pts.push([(x + rnd(1.5) - cw / 2) * S, -(y + rnd(1.5) - ch / 2) * S]);
    }
  for (let i = pts.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [pts[i], pts[j]] = [pts[j], pts[i]];
  }
  const edges: [number, number][] = [];
  const TH2 = (STEP * 1.5 * S) ** 2;
  for (let i = 0; i < pts.length; i++)
    for (let j = i + 1; j < pts.length; j++) {
      const du = pts[i][0] - pts[j][0];
      const dv = pts[i][1] - pts[j][1];
      if (du * du + dv * dv < TH2) edges.push([i, j]);
    }

  const pos = new Float32Array(pts.length * 3);
  pts.forEach(([u, v], i) => {
    const d = rnd(DEPTH);
    const k = (D - d) / D;
    pos[i * 3] = d;
    pos[i * 3 + 1] = v * k;
    pos[i * 3 + 2] = -u * k;
  });
  const textMat = makePoints(pos, 2.0);
  const lp = new Float32Array(edges.length * 6);
  edges.forEach(([a, b], e) => {
    for (let q = 0; q < 3; q++) {
      lp[e * 6 + q] = pos[a * 3 + q];
      lp[e * 6 + 3 + q] = pos[b * 3 + q];
    }
  });
  const lg = new THREE.BufferGeometry();
  lg.setAttribute("position", new THREE.BufferAttribute(lp, 3));
  const lm = new THREE.LineBasicMaterial({
    color: 0x9fd0ff,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const ls = new THREE.LineSegments(lg, lm);
  ls.visible = false;
  group.add(ls);

  const state = { rx: 0, ry: 0, zoom: 0 };
  const drift = { a: 0 };
  const nudge = { rx: 0, ry: 0 };

  const resize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = Math.max(
      50,
      (2 * Math.atan(58 / (D * camera.aspect)) * 180) / PI,
    );
    camera.updateProjectionMatrix();
  };

  const reveal = (p: number) => {
    starGeos.forEach((g) => g.geo.setDrawRange(0, Math.floor(g.n * p)));
    const e = 1 - p;
    camera.position.z = D + 35 * e * e;
  };

  const q = new THREE.Quaternion();
  const v = new THREE.Vector3();
  let raf = 0;
  const frame = (now: number) => {
    // Drift fades to zero near the reading angle so the text lands square
    const calm = 1 - smooth(0.35, 1, -state.ry / (PI / 2));
    const tt = now / 1000;
    const dr = drift.a * calm;
    group.rotation.set(
      state.rx + nudge.rx + dr * 0.05 * Math.sin(tt * 0.23 + 1),
      state.ry + nudge.ry + dr * 0.08 * Math.sin(tt * 0.17),
      0,
    );
    camera.zoom = 1 + 5 * state.zoom;
    camera.updateProjectionMatrix();
    v.set(0, 0, 1).applyQuaternion(q.copy(group.quaternion).invert());
    const r = smooth(0.955, 0.997, v.x);
    lm.opacity = 0.6 * r;
    ls.visible = r > 0.01;
    textMat.size = (2.0 + 1.1 * r) * (1 + 40 * state.zoom * state.zoom);
    bgMat.opacity = 1 - 0.72 * r;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  };

  return {
    state,
    drift,
    nudge,
    reveal,
    resize,
    start: () => {
      resize();
      raf = requestAnimationFrame(frame);
    },
    dispose: () => {
      cancelAnimationFrame(raf);
      starGeos.forEach((g) => g.geo.dispose());
      mats.forEach((m) => m.dispose());
      lg.dispose();
      lm.dispose();
      sprite.dispose();
      renderer.dispose();
    },
  };
}

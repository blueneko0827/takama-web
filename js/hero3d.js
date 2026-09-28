import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const JP = '"Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif';
const DISPLAY = '"Zen Kaku Gothic New", "Noto Sans JP", sans-serif';
const MONO = '"IBM Plex Mono", ui-monospace, monospace';

/* ---------- 画面テクスチャ（Canvas 2D で描画） ---------- */

function rr(ctx, x, y, w, h, r, fill) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
}
function text(ctx, s, x, y, font, color, align = 'left') {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(s, x, y);
}

// ノートPC：コードエディタの画面
function drawCode(ctx, W, H) {
  const C = { kw: '#C792EA', fn: '#82AAFF', str: '#C3E88D', num: '#F78C6C', type: '#FFCB6B', tag: '#7FDBCA', txt: '#D6DEEB', cm: '#637777', pun: '#89DDFF' };
  ctx.fillStyle = '#0B1426'; ctx.fillRect(0, 0, W, H);
  // タイトルバー
  ctx.fillStyle = '#0E1A30'; ctx.fillRect(0, 0, W, 56);
  ['#FF5F57', '#FEBC2E', '#28C840'].forEach((c, i) => { ctx.beginPath(); ctx.arc(34 + i * 30, 28, 9, 0, Math.PI * 2); ctx.fillStyle = c; ctx.fill(); });
  text(ctx, 'portfolio — src/app/page.tsx', W / 2, 36, `500 19px ${MONO}`, '#8FA3C0', 'center');
  // サイドバー（ファイル一覧）
  ctx.fillStyle = '#0D182C'; ctx.fillRect(0, 56, 300, H - 56);
  text(ctx, 'EXPLORER', 28, 100, `500 15px ${MONO}`, '#6D82A3');
  const files = [['▾ src', 0, '#B8C6DC'], ['▾ app', 1, '#B8C6DC'], ['page.tsx', 2, '#FFFFFF', true], ['layout.tsx', 2, '#8FA3C0'], ['▾ components', 1, '#B8C6DC'], ['Hero.tsx', 2, '#8FA3C0'], ['WorkCard.tsx', 2, '#8FA3C0'], ['ContactForm.tsx', 2, '#8FA3C0'], ['▾ lib', 1, '#B8C6DC'], ['api.ts', 2, '#8FA3C0'], ['db.ts', 2, '#8FA3C0'], ['package.json', 0, '#8FA3C0'], ['tsconfig.json', 0, '#8FA3C0']];
  files.forEach(([name, d, col, active], i) => {
    const y = 146 + i * 40;
    if (active) { ctx.fillStyle = 'rgba(26,102,240,.28)'; ctx.fillRect(0, y - 27, 300, 38); }
    text(ctx, name, 28 + d * 22, y, `400 18px ${MONO}`, col);
  });
  // タブ
  ctx.fillStyle = '#0E1A30'; ctx.fillRect(300, 56, W - 300, 50);
  ctx.fillStyle = '#0B1426'; ctx.fillRect(300, 56, 210, 50);
  ctx.fillStyle = '#1A66F0'; ctx.fillRect(300, 56, 210, 3);
  text(ctx, 'page.tsx', 334, 88, `500 18px ${MONO}`, '#FFFFFF');
  text(ctx, 'api.ts', 548, 88, `400 18px ${MONO}`, '#6D82A3');
  // コード
  const L = [
    [['import', C.kw], [' { ', C.pun], ['Hero', C.txt], [', ', C.pun], ['WorkCard', C.txt], [' } ', C.pun], ['from', C.kw], [" '@/components'", C.str]],
    [['import', C.kw], [' { ', C.pun], ['getWorks', C.fn], [' } ', C.pun], ['from', C.kw], [" '@/lib/api'", C.str]],
    [],
    [['// 実績データを取得して一覧を表示', C.cm]],
    [['export default async function', C.kw], [' Page', C.fn], ['() {', C.pun]],
    [['  const', C.kw], [' works', C.txt], [' = ', C.pun], ['await', C.kw], [' getWorks', C.fn], ['({ ', C.pun], ['limit', C.txt], [': ', C.pun], ['10', C.num], [' })', C.pun]],
    [],
    [['  return', C.kw], [' (', C.pun]],
    [['    <', C.pun], ['main', C.tag], [' className', C.type], ['=', C.pun], ['"page"', C.str], ['>', C.pun]],
    [['      <', C.pun], ['Hero', C.type], [' title', C.type], ['=', C.pun], ['"動く仕組みをつくる。"', C.str], [' />', C.pun]],
    [['      <', C.pun], ['section', C.tag], [' id', C.type], ['=', C.pun], ['"works"', C.str], ['>', C.pun]],
    [['        {', C.pun], ['works', C.txt], ['.', C.pun], ['map', C.fn], ['((', C.pun], ['work', C.txt], [') => (', C.pun]],
    [['          <', C.pun], ['WorkCard', C.type], [' key', C.type], ['={', C.pun], ['work', C.txt], ['.', C.pun], ['id', C.txt], ['}', C.pun], [' {...', C.pun], ['work', C.txt], ['} />', C.pun]],
    [['        ))}', C.pun]],
    [['      </', C.pun], ['section', C.tag], ['>', C.pun]],
    [['    </', C.pun], ['main', C.tag], ['>', C.pun]],
    [['  )', C.pun]],
    [['}', C.pun]],
  ];
  const x0 = 390, y0 = 160, lh = 38;
  ctx.fillStyle = 'rgba(26,102,240,.12)'; ctx.fillRect(300, y0 + 5 * lh - 28, W - 300, lh);
  L.forEach((segs, i) => {
    const y = y0 + i * lh;
    text(ctx, String(i + 1), 356, y, `400 17px ${MONO}`, i === 5 ? '#D6DEEB' : '#3E5170', 'right');
    let x = x0;
    ctx.font = `400 21px ${MONO}`;
    segs.forEach(([t, c]) => { ctx.fillStyle = c; ctx.textAlign = 'left'; ctx.fillText(t, x, y); x += ctx.measureText(t).width; });
    if (i === 5) { ctx.fillStyle = '#FFCB6B'; ctx.fillRect(x + 4, y - 20, 3, 26); }
  });
  // ターミナル
  const ty = H - 180;
  ctx.fillStyle = '#081020'; ctx.fillRect(300, ty, W - 300, 180);
  ctx.fillStyle = '#16233D'; ctx.fillRect(300, ty, W - 300, 2);
  text(ctx, 'TERMINAL', 330, ty + 38, `500 15px ${MONO}`, '#6D82A3');
  text(ctx, '$ npm run build', 330, ty + 82, `400 19px ${MONO}`, '#D6DEEB');
  text(ctx, '✓ Compiled successfully', 330, ty + 118, `400 19px ${MONO}`, '#28C840');
  text(ctx, '✓ Generating static pages (12/12)', 330, ty + 152, `400 19px ${MONO}`, '#28C840');
}

// タブレット：業務ダッシュボード
function drawDashboard(ctx, W, H) {
  ctx.fillStyle = '#0B1F3F'; ctx.fillRect(0, 0, W, H);
  text(ctx, '営業ダッシュボード', 44, 78, `700 34px ${JP}`, '#F1F4F8');
  text(ctx, 'FY2026 · Q3', 44, 116, `500 18px ${MONO}`, '#7F8DA1');
  rr(ctx, W - 170, 48, 126, 44, 22, '#1A3A6E');
  text(ctx, '今月', W - 107, 78, `500 18px ${JP}`, '#C7D1DE', 'center');
  const kpi = [['商談数', '128', '+12%'], ['受注率', '34%', '+3pt'], ['新規リード', '2,340', '+8%'], ['売上', '¥18.6M', '+15%']];
  kpi.forEach(([l, v, d], i) => {
    const x = 44 + (i % 2) * 346, y = 150 + Math.floor(i / 2) * 170;
    rr(ctx, x, y, 332, 152, 18, '#12305E');
    text(ctx, l, x + 24, y + 42, `500 19px ${JP}`, '#8FA0B6');
    text(ctx, v, x + 24, y + 106, `500 50px ${MONO}`, '#F1F4F8');
    text(ctx, d, x + 308, y + 42, `500 17px ${MONO}`, '#4FD1A5', 'right');
  });
  // line chart
  const cy = 510, ch = 250;
  rr(ctx, 44, cy, W - 88, ch + 80, 18, '#12305E');
  text(ctx, '月次売上推移', 68, cy + 44, `500 19px ${JP}`, '#8FA0B6');
  const pts = [0.3, 0.38, 0.34, 0.5, 0.46, 0.58, 0.55, 0.7, 0.66, 0.82, 0.78, 0.92];
  const x0 = 76, x1 = W - 76, y0 = cy + ch + 40, yh = ch - 60;
  ctx.strokeStyle = 'rgba(255,255,255,.07)'; ctx.lineWidth = 1;
  for (let i = 0; i < 4; i++) { const yy = y0 - (yh * i) / 3; ctx.beginPath(); ctx.moveTo(x0, yy); ctx.lineTo(x1, yy); ctx.stroke(); }
  const P = pts.map((p, i) => [x0 + ((x1 - x0) * i) / (pts.length - 1), y0 - p * yh]);
  const ag = ctx.createLinearGradient(0, y0 - yh, 0, y0);
  ag.addColorStop(0, 'rgba(90,150,255,.45)'); ag.addColorStop(1, 'rgba(90,150,255,0)');
  ctx.beginPath(); ctx.moveTo(P[0][0], y0); P.forEach(([x, y]) => ctx.lineTo(x, y)); ctx.lineTo(P.at(-1)[0], y0); ctx.fillStyle = ag; ctx.fill();
  ctx.beginPath(); P.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.strokeStyle = '#4D8DFF'; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.stroke();
  ctx.beginPath(); ctx.arc(P.at(-1)[0], P.at(-1)[1], 8, 0, Math.PI * 2); ctx.fillStyle = '#4D8DFF'; ctx.fill();
  // bars
  const by = 880;
  rr(ctx, 44, by, W - 88, 150, 18, '#12305E');
  text(ctx, 'チャネル別リード', 68, by + 42, `500 19px ${JP}`, '#8FA0B6');
  [['Web', .82, '#5B8CFF'], ['展示会', .55, '#4FD1A5'], ['紹介', .38, '#E8B04B']].forEach(([l, v, c], i) => {
    const yy = by + 66 + i * 26;
    text(ctx, l, 68, yy + 14, `500 16px ${JP}`, '#C7D1DE');
    rr(ctx, 170, yy, (W - 300) * v, 16, 8, c);
  });
}

// スマートフォン：犬の散歩メタバース
function drawWalkApp(ctx, W, H) {
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  ctx.save();
  ctx.beginPath(); ctx.roundRect(0, 0, W, H, 48); ctx.clip();
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#A9DB8E'); g.addColorStop(1, '#79BE6A');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // paths
  ctx.strokeStyle = '#EADFC2'; ctx.lineCap = 'round'; ctx.lineWidth = 58;
  ctx.beginPath(); ctx.moveTo(-40, 700); ctx.bezierCurveTo(140, 560, 300, 640, 470, 420); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(200, 980); ctx.bezierCurveTo(230, 760, 120, 560, 180, 200); ctx.stroke();
  // pond
  ctx.fillStyle = '#6DB6D9'; ctx.beginPath(); ctx.ellipse(340, 780, 90, 56, -0.3, 0, Math.PI * 2); ctx.fill();
  // trees
  [[70, 300], [360, 250], [60, 860], [390, 610], [300, 140]].forEach(([x, y]) => {
    ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.beginPath(); ctx.ellipse(x + 8, y + 30, 38, 16, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#3F8F4E'; ctx.beginPath(); ctx.arc(x, y, 38, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#56A862'; ctx.beginPath(); ctx.arc(x - 10, y - 10, 22, 0, Math.PI * 2); ctx.fill();
  });
  // avatars + dogs
  const person = (x, y, c, name) => {
    ctx.fillStyle = 'rgba(0,0,0,.15)'; ctx.beginPath(); ctx.ellipse(x, y + 26, 22, 9, 0, 0, Math.PI * 2); ctx.fill();
    rr(ctx, x - 16, y - 10, 32, 36, 12, c);
    ctx.fillStyle = '#F2D2B6'; ctx.beginPath(); ctx.arc(x, y - 22, 15, 0, Math.PI * 2); ctx.fill();
    rr(ctx, x - 40, y - 74, 80, 28, 14, 'rgba(255,255,255,.92)');
    text(ctx, name, x, y - 53, `700 17px ${JP}`, '#27313D', 'center');
  };
  const dog = (x, y, c) => {
    rr(ctx, x - 16, y - 8, 32, 16, 8, c);
    ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x + 17, y - 9, 9, 0, Math.PI * 2); ctx.fill();
  };
  person(170, 560, '#1A66F0', 'ハナ'); dog(205, 600, '#C9955B');
  person(300, 450, '#4E7BD9', 'タロウ'); dog(260, 480, '#F1E7D6');
  ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 3; ctx.setLineDash([6, 8]);
  ctx.beginPath(); ctx.arc(235, 505, 120, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
  // chat bubble
  rr(ctx, 40, 360, 250, 58, 20, '#FFFFFF');
  text(ctx, 'こんにちは！いい天気ですね', 58, 397, `500 17px ${JP}`, '#27313D');
  // top bar
  const tg = ctx.createLinearGradient(0, 0, 0, 170);
  tg.addColorStop(0, 'rgba(20,40,20,.35)'); tg.addColorStop(1, 'rgba(20,40,20,0)');
  ctx.fillStyle = tg; ctx.fillRect(0, 0, W, 170);
  text(ctx, '9:41', 44, 50, `700 20px ${JP}`, '#fff');
  rr(ctx, W / 2 - 60, 18, 120, 34, 17, '#000');
  rr(ctx, 26, 82, 170, 50, 25, 'rgba(255,255,255,.95)');
  text(ctx, '← 散歩をやめる', 111, 114, `700 17px ${JP}`, '#27313D', 'center');
  rr(ctx, W - 118, 82, 92, 50, 25, 'rgba(255,255,255,.95)');
  text(ctx, '3人', W - 72, 114, `700 17px ${JP}`, '#27313D', 'center');
  // bottom bar
  rr(ctx, 26, H - 130, W - 52, 86, 43, 'rgba(255,255,255,.95)');
  ctx.fillStyle = '#4D8DFF'; ctx.beginPath(); ctx.arc(80, H - 87, 28, 0, Math.PI * 2); ctx.fill();
  rr(ctx, 73, H - 104, 14, 26, 7, '#fff');
  text(ctx, '近くの人と会話中', 124, H - 94, `700 18px ${JP}`, '#27313D');
  text(ctx, 'ミュート', 124, H - 68, `500 15px ${JP}`, '#6A7684');
  ctx.restore();
}

function drawKeyboard(ctx, W, H) {
  ctx.fillStyle = '#1E2227'; ctx.fillRect(0, 0, W, H);
  const rows = [14, 14, 13, 12, 10];
  const kh = (H - 40) / rows.length;
  rows.forEach((n, r) => {
    const kw = (W - 40) / 14;
    const off = ((14 - n) * kw) / 2;
    for (let i = 0; i < n; i++) rr(ctx, 20 + off + i * kw + 3, 20 + r * kh + 3, kw - 6, kh - 6, 6, '#2C3138');
  });
}

async function makeTexture(w, h, draw, renderer) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  draw(ctx, w, h);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  // Web フォント読み込み後に描き直す
  document.fonts?.ready.then(() => { ctx.clearRect(0, 0, w, h); draw(ctx, w, h); tex.needsUpdate = true; });
  return tex;
}

/* ---------- ジオメトリ ---------- */

function roundedPlane(w, h, r) {
  const s = new THREE.Shape();
  const x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  const geo = new THREE.ShapeGeometry(s, 12);
  const pos = geo.attributes.position, uv = geo.attributes.uv;
  for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) - x) / w, (pos.getY(i) - y) / h);
  return geo;
}

function contactShadow() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(0,0,0,.55)'); g.addColorStop(.5, 'rgba(0,0,0,.18)'); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128);
  const mat = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
  m.rotation.x = -Math.PI / 2;
  return m;
}

/* ---------- シーン ---------- */

export async function initHero(canvas, stageEl, copyEl) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch {
    stageEl.classList.add('no-webgl');
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.9;

  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x8a94a3, 0.35));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(-3.5, 7, 4.5);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  Object.assign(key.shadow.camera, { left: -5, right: 5, top: 5, bottom: -5, near: 1, far: 20 });
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.02;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xbcd2ff, 1.1);
  rim.position.set(5, 3, -4);
  scene.add(rim);

  const aluminum = new THREE.MeshPhysicalMaterial({ color: 0xC4CAD2, metalness: 1, roughness: 0.34, clearcoat: 0.4, clearcoatRoughness: 0.3 });
  const graphite = new THREE.MeshPhysicalMaterial({ color: 0x3A3F47, metalness: 0.9, roughness: 0.38, clearcoat: 0.5 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x07090C, metalness: 0, roughness: 0.08, clearcoat: 1, clearcoatRoughness: 0.03 });
  const screenMat = (map) => new THREE.MeshPhysicalMaterial({
    color: 0x000000, emissive: 0xffffff, emissiveMap: map, emissiveIntensity: 0.92,
    roughness: 0.14, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.04,
  });

  const [lpTex, dashTex, appTex, kbTex] = await Promise.all([
    makeTexture(1600, 1003, drawCode, renderer),
    makeTexture(768, 1060, drawDashboard, renderer),
    makeTexture(432, 936, drawWalkApp, renderer),
    makeTexture(1024, 380, drawKeyboard, renderer),
  ]);

  const rig = new THREE.Group();
  scene.add(rig);
  const FLOOR = -1.2;

  // Laptop
  const laptop = new THREE.Group();
  const base = new THREE.Mesh(new RoundedBoxGeometry(3.3, 0.1, 2.2, 4, 0.045), aluminum);
  base.castShadow = base.receiveShadow = true;
  laptop.add(base);
  const kb = new THREE.Mesh(new THREE.PlaneGeometry(2.9, 1.08), new THREE.MeshStandardMaterial({ map: kbTex, roughness: 0.7 }));
  kb.rotation.x = -Math.PI / 2; kb.position.set(0, 0.051, -0.36);
  const pad = new THREE.Mesh(roundedPlane(1.15, 0.7, 0.06), new THREE.MeshPhysicalMaterial({ color: 0xB8BEC6, metalness: 0.8, roughness: 0.28 }));
  pad.rotation.x = -Math.PI / 2; pad.position.set(0, 0.051, 0.6);
  laptop.add(kb, pad);
  const hinge = new THREE.Group();
  hinge.position.set(0, 0.05, -1.08);
  hinge.rotation.x = -0.26;
  const lid = new THREE.Mesh(new RoundedBoxGeometry(3.3, 2.1, 0.06, 4, 0.03), aluminum);
  lid.position.set(0, 1.05, 0);
  lid.castShadow = true;
  const bezel = new THREE.Mesh(roundedPlane(3.22, 2.03, 0.05), glass);
  bezel.position.set(0, 1.05, 0.031);
  const lpScreen = new THREE.Mesh(new THREE.PlaneGeometry(3.08, 1.93), screenMat(lpTex));
  lpScreen.position.set(0, 1.06, 0.032);
  hinge.add(lid, bezel, lpScreen);
  laptop.add(hinge);
  laptop.position.set(-0.25, FLOOR + 0.05, -0.3);
  laptop.rotation.y = 0.18;
  rig.add(laptop);

  // Tablet
  const tablet = new THREE.Group();
  const tBody = new THREE.Mesh(new RoundedBoxGeometry(1.6, 2.16, 0.07, 4, 0.1), graphite);
  tBody.castShadow = true;
  const tGlass = new THREE.Mesh(roundedPlane(1.57, 2.13, 0.1), glass);
  tGlass.position.z = 0.036;
  const tScreen = new THREE.Mesh(roundedPlane(1.44, 1.99, 0.04), screenMat(dashTex));
  tScreen.position.z = 0.037;
  tablet.add(tBody, tGlass, tScreen);
  tablet.position.set(1.95, 0.05, 0.55);
  tablet.rotation.set(-0.08, -0.42, 0.06);
  rig.add(tablet);

  // Phone
  const phone = new THREE.Group();
  const pBody = new THREE.Mesh(new RoundedBoxGeometry(0.8, 1.66, 0.085, 6, 0.12), aluminum);
  pBody.castShadow = true;
  const pGlass = new THREE.Mesh(roundedPlane(0.77, 1.63, 0.11), glass);
  pGlass.position.z = 0.044;
  const pScreen = new THREE.Mesh(roundedPlane(0.72, 1.56, 0.08), screenMat(appTex));
  pScreen.position.z = 0.045;
  phone.add(pBody, pGlass, pScreen);
  phone.position.set(-1.95, -0.2, 1.15);
  phone.rotation.set(-0.05, 0.5, -0.07);
  rig.add(phone);

  // Floor (受け影) + 浮いている端末の接地影
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.ShadowMaterial({ opacity: 0.16 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = FLOOR;
  floor.receiveShadow = true;
  rig.add(floor);
  const tShadow = contactShadow(); tShadow.position.set(1.95, FLOOR + 0.002, 0.55); rig.add(tShadow);
  const pShadow = contactShadow(); pShadow.position.set(-1.95, FLOOR + 0.002, 1.15); rig.add(pShadow);
  const lShadow = contactShadow(); lShadow.scale.set(4.4, 3, 1); lShadow.material.opacity = 0.6;
  lShadow.position.set(-0.25, FLOOR + 0.001, -0.3); rig.add(lShadow);

  // 装飾：ガラスのオブジェクト（背景の線アニメーションと重ならないよう粒子と床への影はなし）
  const fx = new THREE.Group();
  rig.add(fx);
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xDCE8FF, metalness: 0, roughness: 0.06, transmission: 1, thickness: 0.7, ior: 1.45,
    clearcoat: 1, clearcoatRoughness: 0.05, attenuationColor: new THREE.Color(0x6E9BFF), attenuationDistance: 1.6,
  });
  const blueMat = new THREE.MeshPhysicalMaterial({ color: 0x1A66F0, metalness: 0.35, roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.08 });
  const shapes = [
    [new THREE.TorusGeometry(0.42, 0.15, 32, 96), glassMat, [-1.4, 2.5, -2.2]],
    [new THREE.IcosahedronGeometry(0.42, 0), glassMat, [3.5, 1.9, -1.4]],
    [new RoundedBoxGeometry(0.62, 0.62, 0.62, 4, 0.12), glassMat, [3.1, -0.55, 2.1]],
    [new THREE.OctahedronGeometry(0.32, 0), blueMat, [-1.7, -1.0, 2.7]],
    [new THREE.SphereGeometry(0.2, 48, 32), blueMat, [0.6, 2.35, -1.9]],
    [new THREE.TorusKnotGeometry(0.22, 0.07, 128, 16), blueMat, [2.3, 2.55, 0.4]],
  ].map(([g, m, p], i) => {
    const mesh = new THREE.Mesh(g, m);
    mesh.position.set(...p);
    mesh.userData = { base: mesh.position.y, phase: i * 1.3, spin: 0.2 + (i % 3) * 0.12 };
    fx.add(mesh);
    return mesh;
  });


  // カメラを構図に合わせる：端末は本文の右側（スマホでは本文の下）に収める
  const box = new THREE.Box3().setFromObject(new THREE.Group().add(laptop.clone(), tablet.clone(), phone.clone()));
  const center = box.getCenter(new THREE.Vector3());
  const radius = box.getBoundingSphere(new THREE.Sphere()).radius;
  const dir = new THREE.Vector3(0, 0.3, 1).normalize();
  let baseDist = 10;

  function resize() {
    const w = stageEl.clientWidth, h = stageEl.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const sr = stageEl.getBoundingClientRect(), cr = copyEl.getBoundingClientRect();
    const wide = w > 900;
    const x0 = wide ? cr.right - sr.left + 12 : 0, x1 = w;
    const y0 = wide ? h * 0.06 : cr.bottom - sr.top, y1 = wide ? h * 0.96 : h;
    const fx_ = Math.max(0.3, (x1 - x0) / w), fy_ = Math.max(0.25, (y1 - y0) / h);
    const tv = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
    const ev = Math.atan(tv * fy_), eh = Math.atan(tv * camera.aspect * fx_);
    baseDist = (radius / Math.sin(Math.min(ev, eh))) * (wide ? 0.95 : 1.08);
    camera.setViewOffset(w, h, -((x0 + x1) / 2 - w / 2), -((y0 + y1) / 2 - h / 2), w, h);
    camera.updateProjectionMatrix();
    render(performance.now());
  }

  // 操作：ヒーロー全体でマウスに追従して回転、スクロールで奥行きを変化
  const target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
  const hero = stageEl.parentElement;
  if (matchMedia('(pointer: fine)').matches && !reduce) {
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    });
    hero.addEventListener('pointerleave', () => { target.x = 0; target.y = 0; });
  }
  let scrollP = 0;
  const onScroll = () => {
    const r = hero.getBoundingClientRect();
    scrollP = Math.min(1, Math.max(0, -r.top / r.height));
    if (reduce) render(performance.now());
  };
  addEventListener('scroll', onScroll, { passive: true });

  const tBase = tablet.position.y, pBase = phone.position.y;
  function render(now) {
    const t = reduce ? 0 : now / 1000;
    cur.x += (target.x - cur.x) * 0.06;
    cur.y += (target.y - cur.y) * 0.06;
    rig.rotation.y = Math.sin(t * 0.25) * 0.06 + cur.x * 0.22 - scrollP * 0.5;
    rig.rotation.x = cur.y * 0.06 + scrollP * 0.35;
    rig.position.y = scrollP * 0.9;
    const tf = Math.sin(t * 0.8) * 0.07, pf = Math.sin(t * 0.8 + 1.8) * 0.08;
    tablet.position.y = tBase + tf;
    tablet.rotation.z = 0.06 + Math.sin(t * 0.6) * 0.015;
    phone.position.y = pBase + pf;
    phone.rotation.z = -0.07 + Math.sin(t * 0.7 + 1) * 0.02;
    const th = tablet.position.y - FLOOR, ph = phone.position.y - FLOOR;
    tShadow.scale.setScalar(1.3 + th * 0.35); tShadow.material.opacity = 0.9 - th * 0.28;
    pShadow.scale.setScalar(0.8 + ph * 0.3); pShadow.material.opacity = 0.9 - ph * 0.3;
    for (const m of shapes) {
      const u = m.userData;
      m.position.y = u.base + Math.sin(t * 0.7 + u.phase) * 0.18 + scrollP * (u.phase - 3) * 0.5;
      m.rotation.x = t * u.spin + u.phase;
      m.rotation.y = t * u.spin * 0.8 + scrollP * 2;
    }
    camera.position.copy(center).addScaledVector(dir, baseDist * (1 + scrollP * 0.35));
    camera.lookAt(center.x, center.y - 0.05, center.z);
    renderer.render(scene, camera);
  }

  let visible = true, raf = 0;
  const loop = (now) => { render(now); raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0; };
  const start = () => { if (!raf && !reduce) raf = requestAnimationFrame(loop); };
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }).observe(stageEl);
  document.addEventListener('visibilitychange', () => { if (!document.hidden && visible) start(); });
  new ResizeObserver(resize).observe(stageEl);
  document.fonts?.ready.then(() => requestAnimationFrame(resize));
  onScroll();
  resize();
  start();
}

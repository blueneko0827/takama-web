/* ヒーロー背景：白地の上で、無数の点が動きながら線でつながり合うアニメーション（2D Canvas）
   近い点どうしを線で結び、距離が近いほど濃く表示。マウスの周りにも線が集まる。
   画面外では停止、動きを減らす設定では静止画を1枚だけ描画。 */
export function initNetLines(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const LINK = 150;          // 線を結ぶ距離(px)
  const MOUSE_LINK = 200;    // マウスと結ぶ距離(px)
  let w = 0, h = 0, dpr = 1, pts = [], visible = false, raf = 0;
  const mouse = { x: -9999, y: -9999, on: false };

  function seed() {
    const n = Math.min(160, Math.max(50, Math.round((w * h) / 9000)));
    pts = Array.from({ length: n }, () => {
      const a = Math.random() * Math.PI * 2, sp = 0.15 + Math.random() * 0.35;
      return { x: Math.random() * w, y: Math.random() * h, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, r: 1 + Math.random() * 1.6 };
    });
  }
  function resize() {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, 1.5);
    const nw = Math.max(1, Math.round(r.width)), nh = Math.max(1, Math.round(r.height));
    if (nw === w && nh === h) return;
    const first = !pts.length;
    w = nw; h = nh;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (first) seed(); else pts.forEach((p) => { p.x = Math.min(p.x, w); p.y = Math.min(p.y, h); });
  }

  function step() {
    for (const p of pts) {
      if (mouse.on) {
        const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy);
        if (d < MOUSE_LINK && d > 1) { p.vx += (dx / d) * 0.006; p.vy += (dy / d) * 0.006; }
      }
      const sp = Math.hypot(p.vx, p.vy);
      if (sp > 0.7) { p.vx *= 0.7 / sp; p.vy *= 0.7 / sp; }
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) { p.vx *= -1; p.x = Math.max(0, Math.min(w, p.x)); }
      if (p.y < 0 || p.y > h) { p.vy *= -1; p.y = Math.max(0, Math.min(h, p.y)); }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 1;
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j], dx = a.x - b.x, dy = a.y - b.y;
        if (dx > LINK || dx < -LINK || dy > LINK || dy < -LINK) continue;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK) {
          ctx.strokeStyle = `rgba(3, 65, 169, ${(1 - d / LINK) * 0.32})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      if (mouse.on) {
        const d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (d < MOUSE_LINK) {
          ctx.strokeStyle = `rgba(3, 65, 169, ${(1 - d / MOUSE_LINK) * 0.5})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
    }
    ctx.fillStyle = 'rgba(3, 65, 169, .55)';
    for (const p of pts) { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); }
  }

  function loop() { resize(); step(); draw(); raf = visible ? requestAnimationFrame(loop) : 0; }

  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (still) { if (visible) { resize(); draw(); } return; }
    if (visible && !raf) raf = requestAnimationFrame(loop);
  }).observe(canvas);
  addEventListener('resize', () => { if (still && visible) { resize(); draw(); } });

  const host = canvas.parentElement;
  host.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.on = e.pointerType === 'mouse';
  });
  host.addEventListener('pointerleave', () => { mouse.on = false; });
}

/* 自己紹介セクションの背景：メインカラーの上を、流れるように移ろう光（WebGLシェーダー）
   奥行きのある面に光の帯を投影して立体感を出す。画面外では停止、動きを減らす設定では1フレームだけ描画。 */
const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision mediump float;
uniform vec2 res; uniform float t; uniform vec2 mouse;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = mat2(1.6, 1.2, -1.2, 1.6) * p; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / res;
  vec2 q = (gl_FragCoord.xy - 0.5 * res) / res.y;
  q += (mouse - 0.5) * vec2(0.12, -0.08);

  // 手前に傾いた面へ投影（下ほど手前・上ほど奥）
  float depth = 1.0 / (1.35 - q.y * 0.9);
  vec2 w = vec2(q.x * depth, depth * 1.6);
  float tt = t * 0.06;

  // 流体のように歪ませた光の帯
  vec2 warp = vec2(fbm(w * 1.3 + vec2(tt, -tt * 0.7)), fbm(w * 1.3 + vec2(-tt * 0.8, tt) + 5.2));
  float f = fbm(w * 1.1 + warp * 2.2 + vec2(tt * 1.4, 0.0));
  float bands = pow(0.5 + 0.5 * sin(f * 9.0 + w.x * 1.4 - t * 0.35), 5.0);
  float glow = smoothstep(0.35, 0.95, f);

  vec3 base = vec3(0.0118, 0.2549, 0.6627);    // #0341A9
  vec3 deep = vec3(0.0078, 0.1647, 0.4392);    // #022A70
  vec3 light = vec3(0.30, 0.58, 1.00);
  vec3 col = mix(deep, base, smoothstep(-0.2, 0.9, uv.y + warp.x * 0.4));
  col += light * glow * 0.42;
  col += vec3(0.75, 0.88, 1.0) * bands * glow * 0.34;

  // 上下の端はメインカラーに戻して、セクションの区切りとなじませる
  float edge = smoothstep(0.0, 0.14, uv.y) * smoothstep(1.0, 0.86, uv.y);
  col = mix(base, col, edge);
  gl_FragColor = vec4(col, 1.0);
}`;

export function initAboutLight(canvas) {
  if (!canvas) return;
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
  if (!gl) return;
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const uRes = gl.getUniformLocation(prog, 'res');
  const uT = gl.getUniformLocation(prog, 't');
  const uMouse = gl.getUniformLocation(prog, 'mouse');

  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mouse = [0.5, 0.5], target = [0.5, 0.5];
  let visible = false, raf = 0;
  const start = performance.now();

  function resize() {
    const scale = Math.min(devicePixelRatio || 1, 1.5) * 0.6; // 柔らかい光なので低解像度で十分
    const w = Math.max(1, Math.round(canvas.clientWidth * scale));
    const h = Math.max(1, Math.round(canvas.clientHeight * scale));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
  }
  function draw(now) {
    resize();
    mouse[0] += (target[0] - mouse[0]) * 0.04; mouse[1] += (target[1] - mouse[1]) * 0.04;
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uT, still ? 12 : (now - start) / 1000);
    gl.uniform2f(uMouse, mouse[0], mouse[1]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  function loop(now) { draw(now); raf = visible ? requestAnimationFrame(loop) : 0; }

  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (still) { if (visible) draw(performance.now()); return; }
    if (visible && !raf) raf = requestAnimationFrame(loop);
  }).observe(canvas);
  addEventListener('resize', () => { if (still && visible) draw(performance.now()); });
  canvas.parentElement.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    target[0] = (e.clientX - r.left) / r.width; target[1] = (e.clientY - r.top) / r.height;
  });
  canvas.classList.add('ready');
}

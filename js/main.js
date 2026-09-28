import { PROFILE, CATEGORIES, WORKS, SERVICE_GROUPS, TESTIMONIALS, STACK } from './data.js?v=31';

const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const catLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label ?? '';
const catVar = (id) => `--cat: var(--c-${id})`;

function media(work, img, { eager = false, badge = '' } = {}) {
  const path = `images/works/${work.slug}/${img.file}`;
  return `<div class="media">
    <img src="${esc(path)}" alt="${esc(img.caption)}" loading="${eager ? 'eager' : 'lazy'}" decoding="async">
    ${badge ? `<span class="media-badge">${esc(badge)}</span>` : ''}
  </div>`;
}

const isSub = document.body.classList.contains('page-sub');

/* ローディング画面：トップページの初回表示だけ。約5秒（回転1周ぶん）経ったら幕を開けて消す。
   表示中はスクロールを止める。html.is-loading の間はヒーローを隠し、開くと html.is-revealed で順番に登場させる。
   同じタブで2回目以降にトップへ戻ったとき（html.no-loader）は出さない */
const loader = $('#loader');
if (loader && document.documentElement.classList.contains('no-loader')) {
  loader.remove();
} else if (loader) {
  try { sessionStorage.setItem('loaderSeen', '1'); } catch {}
  const MIN_MS = 5000;
  const root = document.documentElement;
  root.classList.add('is-loading');
  root.style.overflow = 'hidden';
  setTimeout(() => {
    loader.classList.add('is-done');
    root.classList.replace('is-loading', 'is-revealed');
    root.style.overflow = '';
    setTimeout(() => loader.remove(), 1200);
  }, Math.max(0, MIN_MS - performance.now()));
}

/* Profile */
document.querySelectorAll('[data-profile]').forEach((el) => {
  const v = PROFILE[el.dataset.profile];
  if (v) el.textContent = v;
});
if (PROFILE.profileUrl) {
  const p = $('#contact-profile');
  if (p) p.innerHTML = `<a href="${esc(PROFILE.profileUrl)}" target="_blank" rel="noopener">${esc(PROFILE.profileLabel)}</a>`;
  if (p) p.hidden = false;
}

/* Nav */
const navToggle = $('#nav-toggle');
const nav = $('#site-nav');

/* メニューバーと「先頭へ戻る」ボタン：トップでは読み込み時に隠し、300pxほどスクロールしたら表示。
   下層ページではメニューバーを常に表示 */
const header = $('.site-header');
const toTop = $('#to-top');
const SHOW_AT = 300;
function syncHeader() {
  const show = scrollY > SHOW_AT;
  header?.classList.toggle('is-shown', isSub || show);
  toTop?.classList.toggle('is-shown', show);
  if (!show && !isSub && nav.classList.contains('open')) { nav.classList.remove('open'); navToggle.setAttribute('aria-expanded', 'false'); }
}
addEventListener('scroll', syncHeader, { passive: true });
syncHeader();
navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
nav.addEventListener('click', (e) => {
  if (e.target.closest('a')) { nav.classList.remove('open'); navToggle.setAttribute('aria-expanded', 'false'); }
});

/* Works（実績ページのみ） */
const grid = $('#works-grid');
const filters = $('#filters');
let activeCat = 'all';

function renderFilters() {
  const items = [{ id: 'all', label: 'すべて', n: WORKS.length }, ...CATEGORIES.map((c) => ({ ...c, n: WORKS.filter((w) => w.category === c.id).length }))]
    .filter((c) => c.n > 0);
  filters.innerHTML = items.map((c) => `
    <button class="chip" type="button" data-cat="${c.id}" aria-pressed="${c.id === activeCat}">
      ${c.id !== 'all' ? `<span class="dot" style="${catVar(c.id)}"></span>` : ''}${esc(c.label)}<span class="n">${c.n}</span>
    </button>`).join('');
}

function renderWorks() {
  const list = activeCat === 'all' ? WORKS : WORKS.filter((w) => w.category === activeCat);
  grid.innerHTML = list.map((w) => `
    <button class="work-card" type="button" data-slug="${w.slug}" aria-haspopup="dialog">
      ${media(w, w.images[0], { badge: `${w.images.length} 枚` })}
      <div class="work-meta">
        <span class="work-cat"><span class="dot" style="${catVar(w.category)}"></span>${esc(catLabel(w.category))}<span class="sep"></span><span class="platform">${esc(w.platform)}</span></span>
        <h3>${esc(w.title)}</h3>
        <p>${esc(w.summary)}</p>
        <ul class="tags">${w.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
      </div>
    </button>`).join('');
}

if (grid) {
filters.addEventListener('click', (e) => {
  const b = e.target.closest('.chip');
  if (!b) return;
  activeCat = b.dataset.cat;
  filters.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', String(c === b)));
  renderWorks();
});
grid.addEventListener('click', (e) => {
  const card = e.target.closest('.work-card');
  if (card) openWork(card.dataset.slug, card);
});

/* Work dialog + gallery */
const dlg = $('#work-dialog');
const stage = $('#wd-stage');
const thumbs = $('#wd-thumbs');
const count = $('#wd-count');
let current = null;
let index = 0;
let opener = null;

function showImage(i) {
  const imgs = current.images;
  index = (i + imgs.length) % imgs.length;
  const img = imgs[index];
  stage.innerHTML = `${media(current, img, { eager: true })}<p class="wd-caption">${esc(img.caption)}</p>`;
  count.textContent = `${index + 1} / ${imgs.length}`;
  thumbs.querySelectorAll('.wd-thumb').forEach((t, k) => t.setAttribute('aria-current', String(k === index)));
}

function openWork(slug, from) {
  current = WORKS.find((w) => w.slug === slug);
  if (!current) return;
  opener = from;
  thumbs.innerHTML = current.images.map((img, k) =>
    `<button type="button" class="wd-thumb" data-i="${k}" aria-label="${k + 1}枚目：${esc(img.caption)}">${media(current, img)}</button>`).join('');
  $('#wd-body').innerHTML = `
    <div class="work-cat"><span class="dot" style="${catVar(current.category)}"></span>${esc(catLabel(current.category))}</div>
    <h2 id="wd-title">${esc(current.title)}</h2>
    <p class="client">${esc(current.client)}</p>
    <p>${esc(current.summary)}</p>
    <dl>
      <dt>プラットフォーム</dt><dd>${esc(current.platform)}</dd>
      <dt>担当範囲</dt><dd>${current.scope.map(esc).join(' / ')}</dd>
    </dl>
    <div><h3>ポイント</h3></div>
    <ul class="points">${current.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
    <ul class="tags">${current.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`;
  showImage(0);
  dlg.showModal();
  $('#wd-close').focus();
}

$('#wd-prev').addEventListener('click', () => showImage(index - 1));
$('#wd-next').addEventListener('click', () => showImage(index + 1));
$('#wd-close').addEventListener('click', () => dlg.close());
thumbs.addEventListener('click', (e) => {
  const t = e.target.closest('.wd-thumb');
  if (t) showImage(Number(t.dataset.i));
});
dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
dlg.addEventListener('close', () => opener?.focus());
dlg.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') showImage(index + 1);
  if (e.key === 'ArrowLeft') showImage(index - 1);
});
let startX = null;
stage.addEventListener('pointerdown', (e) => { startX = e.clientX; });
stage.addEventListener('pointerup', (e) => {
  if (startX === null) return;
  const dx = e.clientX - startX;
  startX = null;
  if (Math.abs(dx) > 40) showImage(index + (dx < 0 ? 1 : -1));
});
}

/* Services（サービスページ）：項目をクリックすると詳細がドロップダウンで開く */
const yen = new Intl.NumberFormat('ja-JP');
const priceHtml = (s) => s.price ? `<span class="price">¥${yen.format(s.price)}<small>〜</small></span>` : '<span class="price ask">お見積り</span>';
const groupsEl = $('#service-groups');
if (groupsEl) {
  let n = 0;
  groupsEl.innerHTML = SERVICE_GROUPS.map((g) => `
  <section class="service-group" aria-labelledby="sg-${g.id}">
    <div class="service-group-head">
      <h3 id="sg-${g.id}"><span class="dot" style="${catVar(g.id === 'web' ? 'web' : g.id === 'ai' ? 'ai' : 'system')}"></span>${esc(g.label)}</h3>
      <p>${esc(g.lead)}</p>
    </div>
    <ul class="service-list">
      ${g.items.map((s) => { const id = `svc-${++n}`; return `
        <li class="service">
          <button class="service-toggle" type="button" aria-expanded="false" aria-controls="${id}">
            <figure class="service-art"><img src="${esc(s.image)}" alt="" loading="lazy"></figure>
            <span class="service-summary"><span class="service-name">${esc(s.name)}</span><span class="service-desc">${esc(s.desc)}</span></span>
            <span class="service-foot">${priceHtml(s)}<span class="service-more">詳細を見る</span></span>
          </button>
          <div class="service-detail" id="${id}" role="region" aria-label="${esc(s.name)}の詳細">
            <div class="service-detail-inner">
              <h4>対応内容</h4>
              <ul>${(s.includes || []).map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
              <dl>
                ${s.period ? `<div><dt>期間の目安</dt><dd>${esc(s.period)}</dd></div>` : ''}
                <div><dt>料金の目安</dt><dd>${s.price ? `¥${yen.format(s.price)}〜` : 'お見積り'}</dd></div>
              </dl>
              ${s.note ? `<p class="service-note">${esc(s.note)}</p>` : ''}
              <a class="service-ask" href="contact.html?service=${encodeURIComponent(s.name)}">このサービスについて相談する</a>
            </div>
          </div>
        </li>`; }).join('')}
    </ul>
  </section>`).join('');
  groupsEl.addEventListener('click', (e) => {
    const t = e.target.closest('.service-toggle');
    if (!t) return;
    const open = t.getAttribute('aria-expanded') !== 'true';
    t.setAttribute('aria-expanded', String(open));
    t.closest('.service').classList.toggle('is-open', open);
  });
}

/* Stack */
/* 対応技術（トップ）：分野ごとに、ロゴ付きで表示 */
const stackEl = $('#stack-list');
if (stackEl) stackEl.innerHTML = STACK.map((g) => `
  <section class="stack-group" aria-label="${esc(g.label)}">
    <div class="stack-head"><h3>${esc(g.label)}</h3><p>${esc(g.lead)}</p></div>
    <ul class="stack-items">${g.items.map((i) => `
      <li class="stack-item"><img src="images/tech/${esc(i.icon)}.svg" alt="" width="40" height="40" loading="lazy"><span>${esc(i.name)}</span></li>`).join('')}
    </ul>
  </section>`).join('');

/* お客様の声（トップ）。TESTIMONIALS.sample が true の間は「サンプル」の注記を出す */
const voiceEl = $('#voice-list');
if (voiceEl) {
  voiceEl.innerHTML = TESTIMONIALS.items.map((t) => `
    <figure class="voice-card">
      <blockquote><p>${esc(t.text)}</p></blockquote>
      <figcaption><span class="voice-who">${esc(t.who)}</span><span class="voice-work">${esc(t.work)}</span></figcaption>
    </figure>`).join('');
  const note = $('#voice-note');
  if (note) note.hidden = !TESTIMONIALS.sample;
}

/* Contact（お問い合わせページのみ） */
const form = $('#contact-form');
if (form) {
const sel = $('#f-service');
sel.innerHTML = '<option value="">選択してください</option>' +
  SERVICE_GROUPS.map((g) => `<optgroup label="${esc(g.label)}">${g.items.map((s) => `<option>${esc(s.name)}</option>`).join('')}</optgroup>`).join('') +
  '<option>その他・未定</option>';
/* サービスページの「相談する」から来たときは、その項目を選んでおく */
const pre = new URLSearchParams(location.search).get('service');
if (pre) [...sel.options].forEach((o) => { if (o.value === pre) o.selected = true; });

$('#copy-mail').addEventListener('click', async (e) => {
  const btn = e.currentTarget;
  try { await navigator.clipboard.writeText(PROFILE.email); btn.textContent = 'コピーしました'; }
  catch {
    const r = document.createRange(); r.selectNodeContents($('[data-profile="email"]'));
    const s = getSelection(); s.removeAllRanges(); s.addRange(r); btn.textContent = '選択しました';
  }
  setTimeout(() => { btn.textContent = 'コピー'; }, 2000);
});

const status = $('#form-status');
const submitBtn = form.querySelector('[type="submit"]');
/* 送信できない場合の予備：入力内容を差し込んだメール作成リンク */
function mailtoLink() {
  const d = new FormData(form);
  const body = `お名前・会社名：${d.get('name')}\nメールアドレス：${d.get('email')}\nご相談内容：${d.get('service') || '未選択'}\n\n${d.get('message')}`;
  return `mailto:${PROFILE.email}?subject=${encodeURIComponent('【ポートフォリオ】ご相談・お見積り')}&body=${encodeURIComponent(body)}`;
}
function showFallback(lead) {
  status.innerHTML = `${esc(lead)}<a href="${esc(mailtoLink())}">メールアプリで送る</a>か、${esc(PROFILE.email)} までご連絡ください。`;
}
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (form.elements._honey.value) return;
  let ok = true;
  form.querySelectorAll('[required]').forEach((f) => {
    const bad = !f.value.trim() || (f.type === 'email' && !f.checkValidity());
    f.setAttribute('aria-invalid', String(bad));
    if (bad) ok = false;
  });
  if (!ok) { status.textContent = '未入力の項目があります。お名前・メールアドレス・詳細をご入力ください。'; return; }
  if (!PROFILE.formEndpoint) { showFallback('フォームの送信先はまだ設定されていません。お手数ですが、'); return; }
  status.textContent = '送信しています…';
  submitBtn.disabled = true;
  try {
    const d = new FormData(form);
    d.set('_replyto', d.get('email'));
    const res = await fetch(PROFILE.formEndpoint, { method: 'POST', body: d, headers: { Accept: 'application/json' } });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || String(json.success) === 'false') throw new Error(json.message || res.status);
    form.reset();
    form.querySelectorAll('[aria-invalid]').forEach((f) => f.removeAttribute('aria-invalid'));
    status.textContent = '送信しました。ありがとうございます。内容を確認してご連絡します。';
  } catch {
    showFallback('送信できませんでした。お手数ですが、');
  } finally {
    submitBtn.disabled = false;
  }
});
}

if (grid) { renderFilters(); renderWorks(); }

/* 3D・背景アニメーション（使えない環境ではスキップ） */
if ($('#hero-canvas')) import('./hero3d.js?v=28')
  .then((m) => m.initHero($('#hero-canvas'), $('#hero-stage'), $('#hero-copy')))
  .catch(() => $('#hero-stage').classList.add('no-webgl'));
if ($('#hero-net')) import('./net-lines.js').then((m) => m.initNetLines($('#hero-net'))).catch(() => {});
if ($('#about-light')) import('./about-light.js').then((m) => m.initAboutLight($('#about-light'))).catch(() => {});

/* 3D：カードがマウスに合わせて傾き、光が反射する */
const canTilt = matchMedia('(pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches;
const TILT_SEL = '.work-card, .service, .flow-list li, .why-item, .voice-card, .stack-group';
function markTilt() {
  document.querySelectorAll(TILT_SEL).forEach((el) => {
    if (!el.dataset.tilt) el.dataset.tilt = el.classList.contains('service') || el.classList.contains('stack-group') ? '5' : '9';
    const g = el.classList.contains('work-card') ? el.querySelector('.media') : el;
    g?.classList.add('glare');
  });
}
if (canTilt) {
  markTilt();
  if (grid) new MutationObserver(markTilt).observe(grid, { childList: true });
  let active = null;
  const reset = (el) => { if (!el) return; el.classList.remove('tilting'); el.style.removeProperty('--rx'); el.style.removeProperty('--ry'); };
  document.addEventListener('pointermove', (e) => {
    const el = e.target.closest?.('[data-tilt]');
    if (el !== active) { reset(active); active = el; }
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    const max = Number(el.dataset.tilt);
    el.classList.add('tilting');
    el.style.setProperty('--ry', `${(px - 0.5) * max * 2}deg`);
    el.style.setProperty('--rx', `${(0.5 - py) * max * 2}deg`);
    const g = el.classList.contains('glare') ? el : el.querySelector('.glare');
    if (g) {
      const gr = g.getBoundingClientRect();
      g.style.setProperty('--gx', `${e.clientX - gr.left}px`);
      g.style.setProperty('--gy', `${e.clientY - gr.top}px`);
    }
  }, { passive: true });
  document.addEventListener('pointerleave', () => { reset(active); active = null; });
}

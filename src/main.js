import Lenis from 'lenis';
import './style.css';
import { C, LINKS } from './content.js';
import { drawHero, drawDataViz, drawCard, drawPortrait, drawPixelBand } from './canvas.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

const LOGO = `<svg viewBox="0 0 47 54" aria-hidden="true"><rect x=".5" y=".5" width="46" height="53" rx="2" fill="none" stroke="currentColor" stroke-dasharray="2 2"/><text x="23.5" y="32" text-anchor="middle" fill="currentColor" style="font:700 14px var(--mono)">AG</text><rect x="36" y="43" width="5" height="5" fill="#51e076"/></svg>`;
const ARROW = `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1 7h10.2L6.6 2.4 8 1l7 7-7 7-1.4-1.4L11.2 9H1z" fill="currentColor"/></svg>`;
const DOWN = `<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M5 0h2v8l3-3 1.4 1.4L6 11.8.6 6.4 2 5l3 3z" fill="currentColor"/></svg>`;
const STAR = `<svg viewBox="0 0 108 108" aria-hidden="true"><g fill="currentColor"><rect x="45" y="0" width="18" height="108"/><rect x="0" y="45" width="108" height="18"/><rect x="45" y="0" width="18" height="108" transform="rotate(45 54 54)"/><rect x="45" y="0" width="18" height="108" transform="rotate(-45 54 54)"/></g></svg>`;
const PATTERN = `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width=".15" aria-hidden="true">${Array.from({ length: 12 }, (_, i) => { const s = 4 + i * 4; return `<rect x="${50 - s}" y="${50 - s}" width="${s * 2}" height="${s * 2}" stroke-dasharray="${i % 2 ? '.6 .6' : 'none'}"/>`; }).join('')}<path d="M0 50h100M50 0v100" stroke-dasharray=".6 .6"/></svg>`;

const L = (lines) => lines.map((l) => `<span class="ln">${l}</span>`).join(' ');
const navlink = ([id, label], i) => `<a class="navlink" href="#${id}" style="--i:${i}"><span class="navlink__bg"></span><span class="t-xl navlink__i">0${i + 1}</span><span class="t-xl navlink__l">${label}</span><span class="navlink__icon"><span>${ARROW}</span></span></a>`;

let lang = localStorage.getItem('lang') || 'en';
let lenis;
let menuOpen = false;
let loaded = false;
let observer;
let cells = [];

function render() {
  const t = C[lang];
  document.documentElement.lang = lang;
  document.title = t.title;
  $('#app').innerHTML = `
<nav class="navbar" id="navbar" aria-label="Main">
  <div class="navbar__container">
    <a class="navbar__logo" href="#top" aria-label="Arturo Gallardo">${LOGO}</a>
    <div class="navbar__actions">
      <div class="locale" role="group" aria-label="Language">${['en', 'es'].map((l) => `<button data-lang="${l}" class="${l === lang ? 'on' : ''}">${l}</button>`).join('')}</div>
      <button class="toggle" id="toggle" aria-expanded="false" aria-controls="navmenu"><span class="toggle__label">${t.menu}</span><span class="toggle__btn"><span class="o"><i></i><i></i><i></i></span><span class="x"><i></i><i></i></span></span><span class="skip-sr" hidden>${t.close}</span></button>
    </div>
  </div>
</nav>
<div class="navmenu__close" id="menuClose"></div>
<nav class="navmenu" id="navmenu" aria-label="Menu">
  <div class="navmenu__bg"></div>
  <ul class="navmenu__list">${t.nav.map((n, i) => `<li>${navlink(n, i)}</li>`).join('')}</ul>
  <div class="navmenu__infos">${t.info.map(([k, v, h]) => `<div class="navmenu__group"><p class="navmenu__info-title">${k}</p><a class="navmenu__info-value" href="${h}" target="_blank" rel="noopener">${v}</a></div>`).join('')}</div>
</nav>
<nav class="spy hidden" id="spy" aria-label="Sections"><ul>${t.spy.map(([id, l]) => `<li><a href="#${id}" data-spy-link="${id}">${l}</a></li>`).join('')}</ul></nav>

<main>
<div class="stack">
  <header class="hero" id="top" data-theme="dark">
    <div class="hero__media"><canvas id="heroCanvas"></canvas></div>
    <div class="hero__desc-wrap"><p class="t-lg hero__desc js-split">${t.heroDesc.slice(0, 2).map((l) => `<span class="ln">${l}</span>`).join(' ')} <em class="ln">${t.heroDesc[2]}</em></p></div>
    <div class="hero__footer">
      <h1 class="t-2xl hero__title js-split">${L(t.heroTitle)}</h1>
      <a class="hero__scroll t-eye-xs js-split" href="#about"><span>${t.scroll}</span><span class="icon">${DOWN}</span></a>
    </div>
  </header>
  <section class="about" id="about" data-spy="about">
    <div class="about__sticky">
      <div class="about__grid" id="aboutGrid"></div>
      <div class="about__panel" id="aboutPanel" data-theme="light">
        <div class="about__blob" id="aboutBlob"></div>
        <h2 class="t-xl about__title js-split">${L(t.about)}</h2>
        <div class="about__image"><canvas id="aboutCanvas"></canvas></div>
      </div>
    </div>
  </section>
</div>

<section class="dv" data-theme="dark" id="pipeline">
  <div class="dv__sticky">
    <canvas class="dv__canvas" id="dvCanvas"></canvas>
    <div class="dv__veil"></div>
    <div class="dv__bottom fade" id="dvBottom"><p class="t-lg dv__title">${L(t.dvCaption)}</p></div>
    <div class="dv__center fade" id="dvCenter">
      <p class="t-2lg dv__ctitle">${t.dvTitle[0]} <span class="g glow">${t.dvTitle[1]}</span></p>
      <p class="t-md dv__ctext">${L(t.dvText)}</p>
    </div>
  </div>
</section>

<section class="svc" id="services" data-spy="services" data-theme="dark">
  <canvas class="svc__pixels" id="svcPixels"></canvas>
  <div class="svc__container" id="svcContainer">
    <div class="svc__head">
      <h2 class="t-2xl svc__title js-split"><span class="ln">${t.svcTitle[0]}</span> <span class="ln g">${t.svcTitle[1]}</span></h2>
      <p class="t-md svc__text js-split">${L(t.svcText)}</p>
    </div>
    <div class="svc__grid">${t.cards.map((c, i) => `
      <article class="card"><span class="pin"></span><span class="pin"></span><span class="pin"></span><span class="pin"></span>
        <div class="card__bg"></div>
        <div class="card__media"><canvas data-card="${i}"></canvas></div>
        <div class="card__content">
          <div class="card__head"><p class="t-2lg card__title">${c.t[0]}<br>${c.t[1]}</p><span class="card__label">[00${i + 1}]</span></div>
          <p class="t-md card__text">${L(c.x)}</p>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>

<section class="cases" id="work" data-spy="work" data-theme="light">
  <div class="cases__container">
    <div class="cases__head">
      <h2 class="t-2xl js-split">${t.casesTitle[0]}<br><span class="g">${t.casesTitle[1]}</span></h2>
      <p class="t-md cases__text">${t.casesText[0]} <span class="dim">${t.casesText[1]}</span></p>
    </div>
    <ul class="cases__list">${t.rows.map((r, i) => `
      <li class="row">
        <button class="row__link" aria-expanded="false">
          <span class="row__pattern">${Array.from({ length: 40 }, (_, k) => `<i style="--i:${k}"></i>`).join('')}</span>
          <span class="t-xl row__i">0${i + 1}</span>
          <span class="t-xl row__t">${r.t}</span>
          <span class="t-eye-sm row__y">${r.y}</span>
          <span class="t-eye-sm row__k">${r.k}</span>
          <span class="row__action"><span class="row__btn">${ARROW}</span></span>
        </button>
        <div class="row__detail"><div><div class="row__detail-inner">
          <p class="t-md">${r.d}</p>
          <dl class="row__meta"><div><dt>${t.rowLabels[0]}</dt><dd class="t-md">${r.s}</dd></div><div><dt>${t.rowLabels[1]}</dt><dd class="t-md">${r.o}</dd></div></dl>
        </div></div></div>
      </li>`).join('')}
    </ul>
  </div>
</section>

<div class="call-pin" id="contact" data-spy="contact">
  <section class="call" data-theme="dark">
    <div class="call__pattern">${PATTERN}</div>
    <div class="call__content">
      <p class="t-2xl call__title js-split">${t.callTitle[0]} <span class="g glow">${t.callTitle[1]}</span></p>
      <p class="t-md call__text">${L(t.callText)}</p>
      <a class="button" href="${LINKS.wa}" target="_blank" rel="noopener"><span>${t.cta}</span><span class="button__icon"><span class="f">${ARROW}</span><span class="b">${ARROW}</span></span></a>
    </div>
  </section>
</div>
<div class="footer-spacer"></div>
</main>

<footer class="footer" data-theme="dark">
  <div class="footer__main">
    <div class="marquee" aria-hidden="true"><div class="marquee__track">${[0, 1].map(() => `<div class="marquee__item">${Array.from({ length: 3 }, () => `<span class="marquee__text">${t.marquee}</span><span class="marquee__icon">${STAR}</span>`).join('')}</div>`).join('')}</div></div>
    <div class="footer__infos">
      <div class="footer__group">
        <p class="t-sm footer__label">${t.infoLabel}</p>
        <div class="footer__links">
          <a href="mailto:${LINKS.email}">${LINKS.email}</a>
          <a href="${LINKS.wa}" target="_blank" rel="noopener">${LINKS.phone}</a>
          <a href="${LINKS.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
          <a href="${LINKS.github}" target="_blank" rel="noopener">GitHub</a>
        </div>
      </div>
      <nav class="footer__nav" aria-label="Footer"><ul>${t.nav.map((n, i) => `<li>${navlink(n, i)}</li>`).join('')}</ul></nav>
    </div>
    <div class="footer__end"><div class="footer__end-wrap">
      <ul><li>${t.end[0]}</li><li><a href="mailto:${LINKS.email}">${LINKS.email}</a></li><li><a href="${LINKS.linkedin}" target="_blank" rel="noopener">LinkedIn</a></li><li><a href="#top">${t.end[1]}</a></li></ul>
      <div class="footer__credits">${t.credits}</div>
    </div></div>
  </div>
</footer>`;
}

function split(el) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  let i = 0;
  for (const n of nodes) {
    const frag = document.createDocumentFragment();
    for (const part of n.data.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) { frag.append(' '); continue; }
      const w = document.createElement('span');
      w.className = 'w';
      const inner = document.createElement('span');
      inner.textContent = part;
      inner.style.setProperty('--i', i++);
      w.append(inner);
      frag.append(w);
    }
    n.replaceWith(frag);
  }
}

function buildGrid() {
  const grid = $('#aboutGrid');
  if (!grid) return;
  const size = innerWidth / 6.4;
  const cols = Math.ceil(innerWidth / size) + 1;
  const rows = Math.ceil(innerHeight / size) + 1;
  grid.style.gridTemplateColumns = `repeat(${cols}, ${size}px)`;
  grid.innerHTML = '<span></span>'.repeat(cols * rows);
  cells = $$('span', grid).map((el) => ({ el, a: Math.random(), b: Math.random(), s: -1 }));
}

function sizeServices() {
  const c = $('#svcContainer');
  if (c) c.style.top = `${Math.min(0, innerHeight - c.offsetHeight)}px`;
}

function setMenu(open) {
  menuOpen = open;
  document.documentElement.classList.toggle('menu-open', open);
  $('#toggle').setAttribute('aria-expanded', String(open));
  $('.toggle__label').textContent = open ? C[lang].close : C[lang].menu;
  if (open) { $('#navbar').classList.remove('hide'); lenis.stop(); } else lenis.start();
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = id === 'about' ? innerHeight * 0.5 : 0;
  lenis.scrollTo(id === 'top' ? 0 : el, { offset, duration: 1.6 });
}

function bind() {
  $$('.js-split').forEach(split);
  observer?.disconnect();
  observer = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('in')), { threshold: 0.2 });
  if (loaded) $$('.js-split').forEach((el) => observer.observe(el));
  buildGrid();
  sizeServices();

  $('#toggle').addEventListener('click', () => setMenu(!menuOpen));
  $('#menuClose').addEventListener('click', () => setMenu(false));
  $$('[data-lang]').forEach((b) => b.addEventListener('click', () => {
    if (b.dataset.lang === lang) return;
    lang = b.dataset.lang;
    localStorage.setItem('lang', lang);
    const y = scrollY;
    render();
    bind();
    $$('.js-split').forEach((el) => el.classList.add('in'));
    lenis.scrollTo(y, { immediate: true });
  }));
  $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    if (menuOpen) setMenu(false);
    scrollToId(a.getAttribute('href').slice(1));
  }));
  $$('.row__link').forEach((b) => b.addEventListener('click', () => {
    const row = b.closest('.row');
    const open = !row.classList.contains('open');
    row.classList.toggle('open', open);
    b.setAttribute('aria-expanded', String(open));
    setTimeout(() => lenis.resize(), 700);
  }));
  const panel = $('#aboutPanel');
  const blob = $('#aboutBlob');
  panel.addEventListener('pointermove', (e) => { blob.style.left = `${e.clientX}px`; blob.style.top = `${e.clientY}px`; });
}

function progress(el) {
  const r = el.getBoundingClientRect();
  return clamp(-r.top / (r.height - innerHeight));
}

function lookup(x, y, attr) {
  for (const el of document.elementsFromPoint(x, y)) {
    if (el.closest('.navbar,.spy,.navmenu,.navmenu__close')) continue;
    const hit = el.closest(`[${attr}]`);
    if (hit) return hit.getAttribute(attr);
  }
  return null;
}

function tick(time) {
  const about = $('#about');
  if (!about) return;

  const pa = progress(about);
  const wipeIn = clamp(pa / 0.18);
  const greenIn = clamp((pa - 0.14) / 0.16);
  for (const c of cells) {
    const s = greenIn > c.b ? 2 : wipeIn > c.a ? 1 : 0;
    if (s !== c.s) { c.s = s; c.el.style.background = s === 2 ? 'var(--green)' : s === 1 ? 'var(--smoke-white)' : 'transparent'; }
  }
  $('#aboutPanel').classList.toggle('on', greenIn >= 1);
  drawPortrait($('#aboutCanvas'), 1 - clamp((pa - 0.3) / 0.12));

  drawHero($('#heroCanvas'), time);

  const dv = $('.dv');
  const pd = progress(dv);
  const dr = dv.getBoundingClientRect();
  if (dr.bottom > 0 && dr.top < innerHeight) drawDataViz($('#dvCanvas'), pd, time);
  $('#dvBottom').classList.toggle('on', pd > 0.04 && pd < 0.45);
  $('#dvCenter').classList.toggle('on', pd > 0.5 && pd < 0.97);

  const svc = $('#services');
  const sr = svc.getBoundingClientRect();
  const wipe = innerHeight * (innerWidth < 768 ? 0.35 : 0.55);
  drawPixelBand($('#svcPixels'), clamp((innerHeight - sr.top) / wipe), sr.top < innerHeight && sr.top > innerHeight - wipe);
  $$('[data-card]').forEach((c) => {
    const r = c.getBoundingClientRect();
    if (r.bottom > 0 && r.top < innerHeight) drawCard(c, +c.dataset.card, time);
  });

  const theme = lookup(innerWidth / 2, 60, 'data-theme');
  $('#navbar').classList.toggle('dark', theme === 'light');
  const spyId = lookup(innerWidth / 2, innerHeight / 2, 'data-spy');
  const spy = $('#spy');
  spy.classList.toggle('hidden', !spyId || menuOpen);
  spy.classList.toggle('light', lookup(80, innerHeight - 100, 'data-theme') === 'light');
  $$('[data-spy-link]', spy).forEach((a) => a.classList.toggle('on', a.dataset.spyLink === spyId));
}

function init() {
  $('#loaderLogo').innerHTML = LOGO;
  render();
  lenis = new Lenis({ lerp: 0.1 });
  bind();
  lenis.on('scroll', ({ direction, scroll }) => {
    if (!menuOpen) $('#navbar').classList.toggle('hide', direction === 1 && scroll > 120);
  });
  const raf = (t) => { lenis.raf(t); tick(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
  addEventListener('keydown', (e) => e.key === 'Escape' && menuOpen && setMenu(false));
  addEventListener('resize', () => { buildGrid(); sizeServices(); });

  lenis.stop();
  setTimeout(() => {
    $('#loader').classList.add('done');
    setTimeout(() => {
      loaded = true;
      lenis.start();
      $$('.js-split').forEach((el) => observer.observe(el));
      setTimeout(() => $('#loader').remove(), 1000);
    }, 450);
  }, 1500);
}

init();

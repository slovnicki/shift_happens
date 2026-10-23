/* ==========================================================================
   engine.js — navigation, fragments, scaling, hash routing, speaker notes,
   overview grid. Reads window.SLIDES (filled by data/*.js) and renders each
   slide with window.Renderers.renderSlide.

   Keys:  → / Space / PageDown   next step or slide
          ← / PageUp             previous step or slide
          Home / End             first / last slide
          O / Esc                overview grid (arrows + Enter to pick)
          F                      fullscreen
          N / S                  speaker notes
          T                      reset presenter timer
   ========================================================================== */

(function () {
  'use strict';

  const W = 1920;
  const H = 1080;
  const { renderSlide, renderNotes, md } = window.Renderers;
  const slides = window.SLIDES || [];

  const $ = (sel) => document.querySelector(sel);
  const viewport = $('.viewport');
  const stage = $('.stage');
  const progress = $('.progress');
  const counter = $('.counter');
  const notesBody = $('.notes__body');
  const notesAside = $('.notes__aside');
  const overview = $('.overview');
  const overviewGrid = $('.overview__grid');

  const state = { index: 0, step: 0, overviewIndex: 0, startedAt: null };

  // --- Render ----------------------------------------------------------------
  stage.innerHTML = slides.map((s, i) => renderSlide(s, i, slides.length)).join('');
  const slideEls = Array.from(stage.querySelectorAll(':scope > .slide'));

  // Fragments grouped into steps: elements sharing data-step reveal together,
  // otherwise each .fragment is its own step, in DOM order.
  const steps = slideEls.map((el) => {
    const groups = new Map();
    el.querySelectorAll('.fragment').forEach((f, i) => {
      const key = f.dataset.step != null ? 'k' + f.dataset.step : 'i' + i;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(f);
    });
    return Array.from(groups.values());
  });

  const plainText = (html) => {
    const d = document.createElement('div');
    d.innerHTML = html;
    return d.textContent.replace(/\s+/g, ' ').trim();
  };
  const slideTitle = (s) => (s ? plainText(md(s.title || s.name || s.type)) : '—');

  // --- Scaling -----------------------------------------------------------------
  function fit() {
    const w = viewport.clientWidth;
    const h = viewport.clientHeight;
    const scale = Math.min(w / W, h / H);
    stage.style.setProperty('--scale', scale);
    stage.style.setProperty('--x', `${(w - W * scale) / 2}px`);
    stage.style.setProperty('--y', `${(h - H * scale) / 2}px`);
  }
  new ResizeObserver(fit).observe(viewport);
  fit();

  // --- Navigation ----------------------------------------------------------------
  function go(index, step = 0, { updateHash = true } = {}) {
    if (!slides.length) return;
    index = Math.max(0, Math.min(slides.length - 1, index));
    const total = steps[index].length;
    step = step === Infinity ? total : Math.max(0, Math.min(total, step));
    state.index = index;
    state.step = step;

    slideEls.forEach((el, i) => {
      el.classList.toggle('is-active', i === index);
      el.classList.toggle('is-past', i < index);
      el.setAttribute('aria-hidden', i === index ? 'false' : 'true');
      el.inert = i !== index;
    });
    steps[index].forEach((group, g) => group.forEach((f) => f.classList.toggle('is-visible', g < step)));

    if (updateHash && location.hash !== `#${index + 1}`) history.replaceState(null, '', `#${index + 1}`);
    progress.style.setProperty('--progress', `${((index + 1) / slides.length) * 100}%`);
    counter.innerHTML = `<b>${String(index + 1).padStart(2, '0')}</b> / ${String(slides.length).padStart(2, '0')}`;
    document.title = `${index + 1}. ${slideTitle(slides[index])} · Shift Happens`;
    renderNotesPanel();
  }

  function next() {
    markNavigated();
    if (state.step < steps[state.index].length) go(state.index, state.step + 1);
    else if (state.index < slides.length - 1) go(state.index + 1, 0);
  }

  function prev() {
    markNavigated();
    if (state.step > 0) go(state.index, state.step - 1);
    else if (state.index > 0) go(state.index - 1, Infinity);
  }

  function markNavigated() {
    document.body.classList.add('has-navigated');
    if (state.startedAt == null) state.startedAt = Date.now();
  }

  function indexFromHash() {
    const m = location.hash.match(/(\d+)/);
    return m ? parseInt(m[1], 10) - 1 : 0;
  }

  window.addEventListener('hashchange', () => {
    const i = indexFromHash();
    if (i !== state.index) go(i, 0, { updateHash: false });
  });

  // --- Speaker notes ----------------------------------------------------------------
  function renderNotesPanel() {
    const s = slides[state.index];
    if (!s) return;
    const total = steps[state.index].length;
    const meta = s.sectionMeta || {};
    notesBody.innerHTML = `
      <p class="notes__title">${state.index + 1} / ${slides.length} · ${md(s.section || '')}${total ? ` · step ${state.step}/${total}` : ''}</p>
      ${renderNotes(s)}`;
    notesAside.innerHTML = `
      <div><div class="notes__label">Elapsed</div><div class="notes__timer" title="Click or press T to reset">00:00<small>click / T to reset</small></div></div>
      <div><div class="notes__label">Clock</div><div class="notes__clock"></div></div>
      ${meta.minutes ? `<div><div class="notes__label">Section budget</div>${meta.minutes} min</div>` : ''}
      <div><div class="notes__label">Next</div><div class="notes__next">${slideTitle(slides[state.index + 1])}</div></div>`;
    notesAside.querySelector('.notes__timer').addEventListener('click', resetTimer);
    tick();
  }

  function resetTimer() { state.startedAt = Date.now(); tick(); }

  function tick() {
    const timer = notesAside.querySelector('.notes__timer');
    const clock = notesAside.querySelector('.notes__clock');
    if (!timer) return;
    const secs = state.startedAt ? Math.floor((Date.now() - state.startedAt) / 1000) : 0;
    timer.firstChild.nodeValue = `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;
    clock.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  setInterval(tick, 1000);

  const toggleNotes = () => document.body.classList.toggle('notes-open');

  // --- Overview grid ----------------------------------------------------------------
  let overviewBuilt = false;
  function buildOverview() {
    overviewGrid.innerHTML = slides
      .map((s, i) => `<div class="overview__tile" data-index="${i}">${renderSlide(s, i, slides.length)}<span class="overview__num">${i + 1}</span></div>`)
      .join('');
    overviewGrid.querySelectorAll('.slide').forEach((el) => (el.inert = true));
    overviewGrid.addEventListener('click', (e) => {
      const tile = e.target.closest('.overview__tile');
      if (!tile) return;
      toggleOverview(false);
      go(parseInt(tile.dataset.index, 10), 0);
    });
    overviewBuilt = true;
  }

  function scaleTiles() {
    const tile = overviewGrid.querySelector('.overview__tile');
    if (tile) overviewGrid.style.setProperty('--tile-scale', tile.clientWidth / W);
  }

  function highlightTile(i) {
    state.overviewIndex = Math.max(0, Math.min(slides.length - 1, i));
    overviewGrid.querySelectorAll('.overview__tile').forEach((t, k) => t.classList.toggle('is-current', k === state.overviewIndex));
    overviewGrid.children[state.overviewIndex]?.scrollIntoView({ block: 'nearest' });
  }

  function toggleOverview(force) {
    const open = force ?? !document.body.classList.contains('overview-open');
    if (open && !overviewBuilt) buildOverview();
    document.body.classList.toggle('overview-open', open);
    if (open) {
      scaleTiles();
      highlightTile(state.index);
    }
  }
  window.addEventListener('resize', () => document.body.classList.contains('overview-open') && scaleTiles());

  function overviewColumns() {
    return getComputedStyle(overviewGrid).gridTemplateColumns.split(' ').length;
  }

  // --- Fullscreen ----------------------------------------------------------------
  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.();
  }

  // --- Zoom ------------------------------------------------------------------
  // Click any [data-zoom] image (e.g. a QR code) to show it full screen;
  // click anywhere or press any key to close.
  const zoom = document.createElement('div');
  zoom.className = 'zoom';
  zoom.innerHTML = '<figure class="zoom__card"><img alt=""><figcaption></figcaption></figure>';
  document.body.appendChild(zoom);
  const isZoomed = () => document.body.classList.contains('zoom-open');
  function openZoom(img) {
    zoom.querySelector('img').src = img.currentSrc || img.src;
    zoom.querySelector('img').alt = img.alt;
    zoom.querySelector('figcaption').textContent = img.dataset.zoomCaption || '';
    document.body.classList.add('zoom-open');
  }
  const closeZoom = () => document.body.classList.remove('zoom-open');
  stage.addEventListener('click', (e) => {
    const img = e.target.closest('[data-zoom]');
    if (!img) return;
    e.preventDefault(); // the QR sits inside a link; zoom instead of navigating
    openZoom(img);
  });
  zoom.addEventListener('click', closeZoom);

  // --- Input ----------------------------------------------------------------
  document.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const key = e.key;
    if (isZoomed()) { closeZoom(); e.preventDefault(); return; }
    const inOverview = document.body.classList.contains('overview-open');

    if (inOverview) {
      const cols = overviewColumns();
      const moves = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols };
      if (key in moves) { highlightTile(state.overviewIndex + moves[key]); e.preventDefault(); return; }
      if (key === 'Enter' || key === ' ') { toggleOverview(false); go(state.overviewIndex, 0); e.preventDefault(); return; }
    }

    switch (key) {
      case 'ArrowRight': case 'ArrowDown': case 'PageDown': case ' ':
        next(); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp':
        prev(); break;
      case 'Home': go(0); break;
      case 'End': go(slides.length - 1, Infinity); break;
      case 'o': case 'O': case 'Escape': toggleOverview(); break;
      case 'f': case 'F': toggleFullscreen(); break;
      case 'n': case 'N': case 's': case 'S': toggleNotes(); break;
      case 't': case 'T': resetTimer(); break;
      default: return;
    }
    e.preventDefault();
  });

  let touchX = null;
  viewport.addEventListener('touchstart', (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
  viewport.addEventListener('touchend', (e) => {
    if (touchX == null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
  });

  // Hide cursor and counter while presenting.
  let idleTimer;
  document.addEventListener('mousemove', () => {
    document.body.classList.remove('is-idle');
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => document.body.classList.add('is-idle'), 2500);
  });

  // --- Boot ----------------------------------------------------------------
  // ?reveal shows every fragment up front (handy for reviewing or screenshots).
  const reveal = new URLSearchParams(location.search).has('reveal');
  go(indexFromHash(), reveal ? Infinity : 0, { updateHash: false });
  window.Deck = { go, next, prev, state, slides };
})();

/* ==========================================================================
   renderers.js — pure functions: slide object in, HTML string out.
   Each key of `Layouts` is a value you can use for `type:` in data/*.js.
   No DOM access and no state here; engine.js owns all of that.
   ========================================================================== */

(function () {
  'use strict';

  // --- Inline mini-markup ----------------------------------------------------
  //   `code`           → monospace pill
  //   **bold**         → strong
  //   *em*             → em
  //   ++text++         → inserted text (green, git-diff style)
  //   ~~text~~         → deleted text (struck through)
  //   [TODO: text]     → highlighted TODO badge
  // Raw HTML is passed through untouched (content is local and trusted).
  function md(input) {
    if (input == null) return '';
    return String(input)
      .replace(/\[TODO:\s*([^\]]+)\]/g, '<span class="todo"><b>TODO</b>$1</span>')
      .replace(/`([^`]+)`/g, '<code class="code">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*\w])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>')
      .replace(/\+\+([^+]+)\+\+/g, '<ins class="insert">$1</ins>')
      .replace(/~~([^~]+)~~/g, '<del class="delete">$1</del>');
  }

  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const list = (items, fn) => (items || []).map(fn).join('');
  const frag = (s) => (s.steps ? ' fragment' : '');

  // SciPly logo mark, copied from sciply.com (uses currentColor).
  const LOGO = '<svg class="logo" viewBox="-14 -14 148 148" aria-hidden="true"><g stroke="currentColor" stroke-linecap="round" stroke-width="8" fill="currentColor"><line x1="103.231" y1="101.606" x2="96.374" y2="107.718"/><line x1="80.281" y1="116.468" x2="71.423" y2="118.902"/><line x1="4.35" y1="82.429" x2="1.578" y2="73.671"/><line x1="0.176" y1="64.593" x2="0.176" y2="55.407"/><line x1="20.08" y1="15.207" x2="27.386" y2="9.638"/><line x1="71.423" y1="1.098" x2="80.281" y2="3.532"/><line x1="96.374" y1="12.282" x2="103.231" y2="18.394"/><line x1="109.076" y1="25.481" x2="113.77" y2="33.377"/><circle cx="120" cy="60" r="7" stroke="none"/><circle cx="119.297" cy="69.159" r="7" stroke="none"/><circle cx="117.204" cy="78.103" r="7" stroke="none"/><circle cx="88.663" cy="112.711" r="7" stroke="none"/><circle cx="62.298" cy="119.956" r="7" stroke="none"/><circle cx="35.456" cy="114.75" r="7" stroke="none"/><circle cx="27.386" cy="110.362" r="7" stroke="none"/><circle cx="8.426" cy="90.661" r="7" stroke="none"/><circle cx="1.578" cy="46.329" r="7" stroke="none"/><circle cx="13.711" cy="21.825" r="7" stroke="none"/><circle cx="35.456" cy="5.25" r="7" stroke="none"/><circle cx="44.101" cy="2.145" r="7" stroke="none"/><circle cx="88.663" cy="7.289" r="7" stroke="none"/></g></svg>';

  // --- Shared building blocks -----------------------------------------------

  function header(s) {
    return `<header class="slide__header">
      ${s.eyebrow ? `<p class="eyebrow">${md(s.eyebrow)}</p>` : ''}
      ${s.title ? `<h2 class="title">${md(s.title)}</h2>` : ''}
      ${s.lead ? `<p class="lead">${md(s.lead)}</p>` : ''}
    </header>`;
  }

  function pills(tags, cls = '') {
    if (!tags || !tags.length) return '';
    return `<ul class="pills ${cls}">${list(tags, (t) => `<li>${md(t)}</li>`)}</ul>`;
  }

  // Image with a built-in placeholder: until the file exists in assets/,
  // the dashed TODO box shows instead (img onerror hides the broken image).
  function media(m, cls = '') {
    if (!m) return '';
    const todo = m.todo ? `<span class="todo"><b>TODO</b>${esc(m.todo)}</span>` : '';
    const ph = `<div class="media__ph">${LOGO}${todo}${m.src ? `<code>${esc(m.src)}</code>` : ''}</div>`;
    const img = m.src
      ? `<img src="${esc(m.src)}" alt="${esc(m.alt || '')}" style="object-position:${esc(m.position || 'center')}" onerror="this.parentNode.classList.add('is-missing')">`
      : '';
    return `<figure class="media ${m.src ? '' : 'is-missing'} ${cls}">${ph}${img}${m.caption ? `<figcaption>${md(m.caption)}</figcaption>` : ''}</figure>`;
  }

  function ref(r) {
    return `<a class="ref" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">
      ${r.date ? `<span class="ref__date">${esc(r.date)}</span>` : ''}
      <span class="ref__title">${md(r.title)}</span>
      ${r.id ? `<span class="ref__id${r.id.includes(':') ? '' : ' ref__id--site'}">${esc(r.id)}</span>` : ''}
      <span class="ref__arrow" aria-hidden="true">↗</span>
    </a>`;
  }

  function callout(text, extraCls = '') {
    if (!text) return '';
    return `<blockquote class="callout ${extraCls}">${md(text)}</blockquote>`;
  }

  function stat(st) {
    if (!st) return '';
    return `<div class="stat"><span class="stat__value">${md(st.value)}</span><span class="stat__label">${md(st.label)}</span></div>`;
  }

  // --- Layouts ---------------------------------------------------------------

  const Layouts = {
    /** Cover slide. title supports ++insert++ for the animated "f". */
    hero(s) {
      const diff = s.diff
        ? `<div class="diff">
            <div class="diff__file"><span>@@</span> ${esc(s.diff.file || 'title.md')} <span>@@</span></div>
            <div class="diff__line diff__line--minus"><span>-</span>${esc(s.diff.minus)}</div>
            <div class="diff__line diff__line--plus"><span>+</span>${esc(s.diff.plus)}</div>
          </div>`
        : '';
      return `<div class="hero">
        <div class="hero__top">${LOGO}${s.eyebrow ? `<p class="eyebrow">${md(s.eyebrow)}</p>` : ''}</div>
        <div class="hero__main">
          <h1 class="hero__title">${md(s.title)}</h1>
          ${s.subtitle ? `<p class="hero__subtitle">${md(s.subtitle)}</p>` : ''}
        </div>
        <div class="hero__bottom">
          <div class="speaker">
            ${s.avatar ? `<div class="avatar"><img src="${esc(s.avatar)}" alt=""></div>` : ''}
            <div><p class="speaker__name">${md(s.speaker)}</p><p class="speaker__role">${md(s.role)}</p></div>
          </div>
          ${diff}
        </div>
      </div>`;
    },

    /** Part divider: big number, title, optional year range. */
    section(s) {
      return `<div class="section">
        <span class="section__num">${esc(s.number || '')}</span>
        <div class="section__body">
          ${s.eyebrow ? `<p class="eyebrow">${md(s.eyebrow)}</p>` : ''}
          <h2 class="section__title">${md(s.title)}</h2>
          ${s.lead ? `<p class="lead">${md(s.lead)}</p>` : ''}
        </div>
        ${s.range ? `<p class="section__range">${md(s.range)}</p>` : ''}
      </div>`;
    },

    /** About-me card: photo, name, role, tags + fact cards on the right. */
    profile(s) {
      return `<div class="profile">
        <div class="profile__id">
          ${s.eyebrow ? `<p class="eyebrow">${md(s.eyebrow)}</p>` : ''}
          <div class="avatar avatar--xl">${s.photo ? `<img src="${esc(s.photo)}" alt="">` : esc((s.name || '?')[0])}</div>
          <h2 class="title">${md(s.name)}</h2>
          <p class="profile__role">${md(s.role)}</p>
          ${s.lead ? `<p class="lead">${md(s.lead)}</p>` : ''}
          ${pills(s.tags)}
        </div>
        <ul class="facts">
          ${list(s.facts, (f) => `<li class="card fact${frag(s)}">
            <p class="fact__label">${md(f.label)}</p>
            <h3>${md(f.title)}</h3>
            ${f.text ? `<p class="card__text">${md(f.text)}</p>` : ''}
            ${pills(f.tags, 'pills--sm')}
          </li>`)}
        </ul>
      </div>`;
    },

    /**
     * Photo left, story right: meta chips, story cards, takeaway callout.
     * photo.fit = 'natural' shows the whole photo (square / landscape) uncropped,
     * with the callout under it. `finale: { images: [{ src, alt }], caption }` adds
     * a last step that swaps the photo + callout for those images.
     */
    split(s) {
      const natural = s.photo && s.photo.fit === 'natural';
      const finale = natural && s.finale
        ? `<figure class="split__finale fragment">
            <div class="split__screens">${list(s.finale.images, (im) => `<img src="${esc(im.src)}" alt="${esc(im.alt || '')}">`)}</div>
            ${s.finale.caption ? `<figcaption>${md(s.finale.caption)}</figcaption>` : ''}
          </figure>`
        : '';
      // DOM order is reveal order, so the callout and finale come after the cards.
      return `<div class="split ${s.reverse ? 'split--reverse' : ''} ${natural ? 'split--natural' : ''}">
        ${media(s.photo, 'split__media')}
        <div class="split__content">
          ${header(s)}
          ${s.meta ? `<dl class="meta">${list(s.meta, (m) => `<div><dt>${md(m.label)}</dt><dd>${md(m.value)}</dd></div>`)}</dl>` : ''}
          ${s.cards ? `<ul class="story">${list(s.cards, (c) => `<li class="card story__card${frag(s)}">
            ${c.icon ? `<span class="story__icon">${md(c.icon)}</span>` : ''}
            <div><h3>${md(c.title)}</h3>${c.text ? `<p class="card__text">${md(c.text)}</p>` : ''}</div>
          </li>`)}</ul>` : ''}
          ${natural ? '' : callout(s.callout, s.steps ? 'fragment' : '')}
        </div>
        ${natural ? callout(s.callout, s.steps ? 'fragment' : '') : ''}
        ${finale}
      </div>`;
    },

    /** Bento grid. card.span = [cols, rows] on a 6-column grid. */
    bento(s) {
      const cols = s.columns || 6;
      return `${header(s)}
      <div class="bento" style="--cols:${cols}">
        ${list(s.cards, (c) => {
          const [cs, rs] = c.span || [1, 1];
          // card.collage = [{ src, caption, x, y, w, r }]: scattered photos (x/y/w in %, r in deg)
          if (c.collage) {
            return `<div class="collage" style="grid-column:span ${cs};grid-row:span ${rs}">
              ${list(c.collage, (p) => `<figure class="collage__photo" style="left:${p.x}%;top:${p.y}%;width:${p.w}%;--r:${p.r || 0}deg">
                <img src="${esc(p.src)}" alt="${esc(p.alt || p.caption || '')}">${p.caption ? `<figcaption>${md(p.caption)}</figcaption>` : ''}
              </figure>`)}
            </div>`;
          }
          return `<article class="card bento__card ${c.accent ? 'card--accent' : ''} ${c.photo || c.logo ? 'has-media' : ''}${frag(s)}" style="grid-column:span ${cs};grid-row:span ${rs}">
            ${c.photo ? media(c.photo, 'bento__media') : ''}
            ${c.logo && !c.photo ? `<div class="bento__logo"><img src="${esc(c.logo.src)}" alt="${esc(c.logo.alt || '')}"></div>` : ''}
            <div class="bento__body">
              ${c.tag ? `<p class="fact__label">${md(c.tag)}</p>` : ''}
              ${c.title ? `<h3>${md(c.title)}</h3>` : ''}
              ${c.text ? `<p class="card__text">${md(c.text)}</p>` : ''}
              ${c.items ? `<ul class="bento__list">${list(c.items, (it) => `<li>${md(it)}</li>`)}</ul>` : ''}
              ${stat(c.stat)}
              ${pills(c.tags, 'pills--sm')}
            </div>
          </article>`;
        })}
      </div>
      ${callout(s.callout, s.steps ? 'fragment' : '')}`;
    },

    /** Horizontal timeline of dated events; every event carries citations. */
    timeline(s) {
      const n = (s.events || []).length;
      const cols = s.columns || (n <= 4 ? n : 3);
      return `<div class="era">
        <div class="era__head">
          ${header(s)}
          ${s.glyph ? `<div class="glyph" aria-hidden="true">${md(s.glyph)}</div>` : ''}
        </div>
        <ol class="track" style="--cols:${cols}">
          ${list(s.events, (e) => `<li class="event${frag(s)}">
            <span class="event__dot" aria-hidden="true"></span>
            <time class="event__date">${md(e.date)}</time>
            <h3>${md(e.title)}</h3>
            ${e.text ? `<p class="card__text">${md(e.text)}</p>` : ''}
          </li>`)}
        </ol>
        ${callout(s.takeaway, 'callout--takeaway' + (s.steps ? ' fragment' : ''))}
      </div>`;
    },

    /**
     * Single-series bar chart. Linear 0–max by default; `scale: 'log'` maps
     * min–max logarithmically. Ticks are numbers or { value, label }.
     * `lines` draws dashed reference lines; a bar with `marker: true` is an
     * outline (a value that is uncertain or no longer measured).
     */
    chart(s) {
      const max = s.max || 100;
      const min = s.min || 1;
      const unit = s.unit || '';
      const pos = s.scale === 'log'
        ? (v) => Math.max(0, Math.log(v / min) / Math.log(max / min)) * 100
        : (v) => (v / max) * 100;
      const ticks = (s.ticks || [0, 25, 50, 75, 100]).map((t) => (typeof t === 'object' ? t : { value: t, label: t + unit }));
      return `<div class="chart-slide">
        ${header(s)}
        <figure class="chart" role="img" aria-label="${esc(s.ariaLabel || s.title)}">
          <div class="chart__plot">
            ${list(ticks, (t) => `<div class="chart__tick" style="bottom:${pos(t.value)}%"><span>${esc(t.label)}</span></div>`)}
            ${list(s.lines || [], (l) => `<div class="chart__line" style="bottom:${pos(l.value)}%"><span>${md(l.label)}</span></div>`)}
            <div class="chart__bars" style="--n:${s.bars.length}">
              ${list(s.bars, (b) => `<div class="chart__col${frag(s)} ${b.highlight ? 'is-highlight' : ''} ${b.marker ? 'is-marker' : ''}" title="${esc(`${b.label} · ${b.date} · ${b.display || b.value + unit}${b.note ? ' · ' + b.note : ''}`)}">
                <div class="chart__bar" style="height:${pos(b.value)}%">
                  <span class="chart__value">${esc(b.display || b.value + unit)}</span>
                </div>
              </div>`)}
            </div>
          </div>
          <div class="chart__labels" style="--n:${s.bars.length}">
            ${list(s.bars, (b) => `<div class="chart__label"><strong>${md(b.label)}</strong><span>${md(b.date)}</span>${b.note ? `<em>${md(b.note)}</em>` : ''}</div>`)}
          </div>
        </figure>
        ${s.footnote ? `<p class="footnote">${md(s.footnote)}</p>` : ''}
      </div>`;
    },

    /** Before → after: what got cheap (struck through) vs. what is scarce now. */
    shift(s) {
      return `<div class="shift-slide">
        ${header(s)}
        <div class="shift">
          <div class="shift__cheap">
            ${s.cheapLabel ? `<p class="fact__label">${md(s.cheapLabel)}</p>` : ''}
            <ul>${list(s.cheap, (c) => `<li>${md(c)}</li>`)}</ul>
          </div>
          <div class="shift__scarce">
            ${s.scarceLabel ? `<p class="fact__label">${md(s.scarceLabel)}</p>` : ''}
            <ol>${list(s.scarce, (c) => `<li class="${frag(s).trim()}"><h3>${md(c.title)}</h3><p>${md(c.text)}</p></li>`)}</ol>
          </div>
        </div>
      </div>`;
    },

    /** Matrix: columns are eras, rows are dimensions; last column highlighted. */
    comparison(s) {
      const cols = s.columns || [];
      return `${header(s)}
      <div class="matrix" style="--cols:${cols.length}">
        <div class="matrix__corner"></div>
        ${list(cols, (c, i) => `<div class="matrix__col-head ${i === cols.length - 1 ? 'is-now' : ''}${frag(s)}" data-step="${i}">
          <span class="matrix__year">${md(c.year)}</span><span class="matrix__sub">${md(c.label)}</span>
        </div>`)}
        ${list(s.rows, (r) => `<div class="matrix__row-head">${md(r.label)}</div>
          ${list(r.cells, (cell, i) => `<div class="matrix__cell ${i === cols.length - 1 ? 'is-now' : ''}${frag(s)}" data-step="${i}">${md(cell)}</div>`)}`)}
      </div>
      ${s.says ? `<div class="matrix-says">${list(s.says, (t, i) => `<p class="matrix-says__line${frag(s)}" data-step="${i}"><span class="matrix-says__year">${md(cols[i] ? cols[i].year : '')}</span><span>${md(t)}</span></p>`)}</div>` : ''}
      ${callout(s.callout)}`;
    },

    /** Key message with stepped points and optional chips + callout. */
    statement(s) {
      return `<div class="statement">
        ${header(s)}
        <ul class="points">
          ${list(s.points, (p) => `<li class="point${frag(s)}">${md(p)}</li>`)}
        </ul>
        ${s.chipsLabel ? `<p class="fact__label chips-label${frag(s)}">${md(s.chipsLabel)}</p>` : ''}
        ${s.chips ? `<ul class="chips">${list(s.chips, (c) => `<li class="chip${frag(s)}">${md(c)}</li>`)}</ul>` : ''}
        ${callout(s.callout, s.steps ? 'fragment' : '')}
      </div>`;
    },

    /** Big quote. Optional `before` renders a struck-through original above it. */
    quote(s) {
      return `<div class="quote">
        ${s.eyebrow ? `<p class="eyebrow">${md(s.eyebrow)}</p>` : ''}
        ${s.before ? `<p class="quote__before"><span>-</span>${md(s.before)}</p>` : ''}
        ${s.beforeBy ? `<p class="quote__by quote__by--before">${md(s.beforeBy)}</p>` : ''}
        <blockquote class="quote__text${s.before ? ' quote__text--diff' : ''}${frag(s)}">${s.before ? '<span class="quote__plus">+</span>' : ''}${md(s.text)}</blockquote>
        ${s.by ? `<p class="quote__by${frag(s)}">${md(s.by)}</p>` : ''}
      </div>`;
    },

    /** Q&A: big headline + discussion prompt cards. */
    discussion(s) {
      return `<div class="discussion">
        ${s.eyebrow ? `<p class="eyebrow">${md(s.eyebrow)}</p>` : ''}
        <h2 class="discussion__title">${md(s.title)}</h2>
        <ul class="prompts">
          ${list(s.prompts, (p, i) => `<li class="card prompt${frag(s)}"><span class="prompt__num">${String(i + 1).padStart(2, '0')}</span><span>${md(p)}</span></li>`)}
        </ul>
      </div>`;
    },

    /**
     * Terminal window with a prompt (left) + fact cards (right).
     * prompt: [{ label, text }] or [{ label, items: [] }] — rendered as `# label` rows.
     */
    terminal(s) {
      return `${header(s)}
      <div class="term-grid">
        <div class="terminal">
          <div class="terminal__bar"><i></i><i></i><i></i><span>${md(s.window || '~ — claude')}</span></div>
          <div class="terminal__body">
            ${s.command ? `<p class="terminal__cmd"><span>$</span> ${md(s.command)}</p>` : ''}
            ${s.intro ? `<p class="terminal__intro"><span>&gt;</span> ${md(s.intro)}</p>` : ''}
            <dl class="terminal__prompt">${list(s.prompt, (p) => `<div>
              <dt># ${md(p.label)}</dt>
              <dd>${p.items ? `<ul>${list(p.items, (it) => `<li>${md(it)}</li>`)}</ul>` : md(p.text)}</dd>
            </div>`)}</dl>
            <p class="terminal__caret"><span>&gt;</span> <b></b></p>
          </div>
        </div>
        <ul class="term-aside">
          ${list(s.facts, (f) => `<li class="card fact${frag(s)} ${f.accent ? 'card--accent' : ''}">
            <p class="fact__label">${md(f.label)}</p>
            <h3>${md(f.title)}</h3>
            ${f.text ? `<p class="card__text">${md(f.text)}</p>` : ''}
          </li>`)}
        </ul>
      </div>`;
    },

    /** Event invite: pitch + stats on the left, date / venue / QR ticket on the right. */
    event(s) {
      const d = s.date || {};
      return `<div class="event-invite">
        <div class="event-invite__pitch">
          ${header(s)}
          <div class="event-when">
            <div class="ticket__date">
              <span class="ticket__day">${esc(d.day)}</span>
              <span class="ticket__month">${md(d.month)}<br><small>${md(d.weekday)}</small></span>
            </div>
            <dl class="ticket__details">${list(s.details, (m) => `<div><dt>${md(m.label)}</dt><dd>${md(m.value)}</dd></div>`)}</dl>
          </div>
          ${pills(s.tags)}
          ${s.stats ? `<ul class="event-stats">${list(s.stats, (st) => `<li class="${frag(s).trim()}">${stat(st)}</li>`)}</ul>` : ''}
        </div>
        <a class="ticket" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">
          ${s.qr ? `<img class="ticket__qr" data-zoom data-zoom-caption="${esc(s.display || s.url)}" src="${esc(s.qr)}" alt="QR code for ${esc(s.display || s.url)}">` : ''}
          <span class="ticket__url">${md(s.display || s.url)}<span class="ref__arrow" aria-hidden="true">↗</span></span>
          ${s.cta ? `<span class="ticket__note">${md(s.cta)}</span>` : ''}
          ${s.promo ? `<span class="ticket__promo">
            <small>${md(s.promo.label)}</small>
            <code>${esc(s.promo.code)}</code>
            <small>${md(s.promo.note)}</small>
          </span>` : ''}
        </a>
      </div>`;
    },

    /** Closing / contact links. */
    contact(s) {
      return `<div class="contact">
        <div class="contact__left">
          ${s.eyebrow ? `<p class="eyebrow">${md(s.eyebrow)}</p>` : ''}
          ${s.title ? `<h2 class="contact__title">${md(s.title)}</h2>` : ''}
          ${s.lead ? `<p class="lead">${md(s.lead)}</p>` : ''}
          ${s.qr ? `<figure class="contact__qr">
            <img src="${esc(s.qr.src)}" alt="${esc(s.qr.alt || 'QR code')}" data-zoom data-zoom-caption="${esc(s.qr.url || '')}">
            <figcaption>${md(s.qr.caption || '')}</figcaption>
          </figure>` : ''}
          <div class="speaker">
            ${s.avatar ? `<div class="avatar"><img src="${esc(s.avatar)}" alt=""></div>` : ''}
            <div><p class="speaker__name">${md(s.name)}</p><p class="speaker__role">${md(s.role)}</p></div>
          </div>
        </div>
        <ul class="links">
          ${list(s.links, (l) => `<li><a class="link-row" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">
            <span class="link-row__label">${md(l.label)}</span>
            <span class="link-row__value">${md(l.display || l.url)}</span>
            <span class="ref__arrow" aria-hidden="true">↗</span>
          </a></li>`)}
        </ul>
      </div>`;
    },
  };

  // Layout aliases so `type` names in the README all work.
  Layouts.title = Layouts.hero;
  Layouts.divider = Layouts.section;
  Layouts.cards = Layouts.bento;
  Layouts.takeaway = Layouts.statement;

  // --- Slide frame -----------------------------------------------------------

  function renderSlide(slide, index, total) {
    const layout = Layouts[slide.type];
    if (!layout) {
      return `<section class="slide layout-error"><div class="slide__inner"><p class="todo"><b>ERROR</b>Unknown slide type "${esc(slide.type)}"</p></div></section>`;
    }
    const chrome = slide.type !== 'hero' && slide.chrome !== false;
    const refs = slide.refs && slide.refs.length
      ? `<div class="refs"><span class="refs__label">Sources</span>${list(slide.refs, ref)}</div>`
      : '';
    return `<section class="slide layout-${esc(slide.type)} ${esc(slide.className || '')}" data-index="${index}" aria-roledescription="slide" aria-label="${index + 1} of ${total}">
      <div class="slide__inner">${layout(slide)}</div>
      ${refs || chrome ? `<footer class="slide__footer">
        ${refs}
        ${chrome ? `<div class="brandline">${LOGO}<span class="brandline__name">Shi<ins>f</ins>t Happens</span>${slide.section ? `<span class="brandline__section">${md(slide.section)}</span>` : ''}</div>` : ''}
      </footer>` : ''}
    </section>`;
  }

  function renderNotes(slide) {
    const notes = slide.notes;
    if (!notes) return '<p><em>No speaker notes for this slide.</em></p>';
    const parts = Array.isArray(notes) ? notes : [notes];
    return parts.map((p) => `<p>${md(p)}</p>`).join('');
  }

  window.Renderers = { Layouts, renderSlide, renderNotes, md };
})();

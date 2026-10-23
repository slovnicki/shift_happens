# Shift Happens: When `code` becomes cheap

A 30-minute hackathon talk by Sandro Lovnički, built as a small, data-driven HTML deck.
No framework, no build step. The visual identity is taken from [sciply.com](https://sciply.com/).

## Run it

Open `index.html` in a browser. It works straight from `file://` because everything loads
with classic `<script>` tags, not ES modules.

For editing, run the live-reload dev server:

```bash
cd presentation
npm install     # once
npm run dev     # → http://localhost:5500
```

Saving a file in `data/`, `js/` or `index.html` reloads the page and keeps you on the same slide,
because the hash survives the reload. CSS changes are applied without a reload.

You need internet access for Google Fonts (Oxanium, Inter, JetBrains Mono). Offline, the deck
falls back to system fonts.

### Keyboard

| Key | Action |
| --- | --- |
| `→` `Space` `PageDown` `↓` | Next step (fragment), then next slide |
| `←` `PageUp` `↑` | Previous step, then previous slide |
| `Home` / `End` | First / last slide |
| `O` / `Esc` | Overview grid (use arrows and `Enter` to pick, or click) |
| `F` | Fullscreen |
| `N` / `S` | Speaker notes panel (notes, elapsed timer, clock, section budget, next slide) |
| `T` | Reset the presenter timer (or click it) |
| Click a QR code | Show it full screen for scanning; click or press any key to close. Add `data-zoom` to any `<img>` to make it zoomable. |

Swipe left/right works on touch screens. The URL hash tracks the slide, so a refresh on
`index.html#12` stays on slide 12.

Add `?reveal` to the URL (`index.html?reveal#5`) to show every fragment at once. This is
useful for proofreading. Printing (`Cmd+P` → Save as PDF) gives one fully revealed slide per page.

## Project layout

```text
presentation/
├── index.html          # shell: chrome, notes panel, overview, script order
├── styles/
│   ├── theme.css       # SciPly tokens: colors, fonts, radius, easing
│   ├── engine.css      # 1920×1080 stage scaling, transitions, fragments, notes, overview, print
│   └── layouts.css     # one block per slide layout + shared primitives (cards, pills, TODO badges…)
├── data/
│   ├── intro-slides.js # Part 1 · Hello (≈10 min)
│   ├── ai-history.js   # Part 2 · Five years (≈15 min), all milestones cited
│   └── qa-slides.js    # Part 3 · Your turn (≈5 min)
├── js/
│   ├── renderers.js    # pure functions: slide object → HTML string
│   └── engine.js       # navigation, fragments, hash routing, notes, overview, scaling
└── assets/             # photos (drop files here)
```

## Editing slides

Each data file calls `defineSection(meta, slides)`:

```js
defineSection({ title: 'Part 1 · Hello', minutes: 10 }, [
  { type: 'quote', text: 'Hello, world.', notes: 'Say hi.' },
  // …
]);
```

- **Edit** a slide by changing its object.
- **Reorder** slides by moving objects within the array. Reorder whole parts by reordering the
  `<script src="data/…">` tags in `index.html`.
- **Add** a slide by inserting an object with a `type` (see below).
- **Remove** a slide by deleting its object.

Fields every slide supports:

| Field | Purpose |
| --- | --- |
| `type` | Layout name (required) |
| `notes` | Speaker notes: a string or an array of paragraphs |
| `refs` | Citation badges in the footer: `[{ date, title, id, url }]`. An `id` with `:` (like `arXiv:…`) is shown; a domain-style id is hidden to save space |
| `steps: true` | Reveal the slide's list items one by one |
| `section` | Footer label (set automatically from `defineSection`) |
| `className` | Extra CSS class for one-off tweaks |
| `chrome: false` | Hide the footer brandline |

### Inline mini-markup (any text field)

| Write | Get |
| --- | --- |
| `` `code` `` | monospace pill |
| `**bold**` / `*em*` | strong / mauve emphasis |
| `++f++` | inserted text, green (the "f" in Shi**f**t) |
| `~~text~~` | struck-through text |
| `[TODO: something]` | a dashed **TODO** badge that's hard to miss on screen |

Raw HTML also passes through (e.g. `<br>`, `<span class="rest">`).

## Layout types

All layouts live in `js/renderers.js` (`Layouts`) and are styled in `styles/layouts.css`.

| `type` | Use | Main fields |
| --- | --- | --- |
| `hero` (alias `title`) | Cover | `eyebrow`, `title` (supports `++f++`, which types itself in), `subtitle`, `speaker`, `role`, `avatar`, `diff: { file, minus, plus }` |
| `section` (alias `divider`) | Part divider | `number`, `eyebrow`, `title`, `lead`, `range` |
| `profile` | About me | `name`, `role`, `photo`, `lead`, `tags[]`, `facts[{ label, title, text, tags }]` |
| `split` | Photo + story | `photo{ src, todo, alt, position, fit }` (`fit: 'natural'` shows a square/landscape photo uncropped, callout below it), `eyebrow`, `title`, `meta[{ label, value }]`, `cards[{ icon, title, text }]`, `callout`, `reverse`, `finale{ images[{ src, alt }], caption }` (natural fit only: last step swaps photo + callout for these images) |
| `bento` (alias `cards`) | Grid of cards | `columns` (default 6), `cards[{ span: [cols, rows], tag, title, text, stat{ value, label }, items[], photo, logo{ src, alt }, tags, accent }]`; a card with `collage[{ src, caption, x, y, w, r }]` (x/y/w in %, r in degrees) renders scattered photos instead, `callout` |
| `timeline` | Dated milestones | `eyebrow`, `title`, `glyph` (keycap on the right), `events[{ date, title, text }]`, `takeaway`, `columns` (auto) |
| `chart` | Single-series bars | `bars[{ label, date, value, display, note, highlight, marker }]` (`marker`: dashed outline bar), `unit`, `max`, `ticks` (numbers or `{ value, label }`), `scale: 'log'` + `min`, `lines[{ value, label }]` (dashed reference lines), `footnote` |
| `comparison` | Era matrix | `columns[{ year, label }]`, `rows[{ label, cells[] }]` (last column is highlighted; with `steps` it reveals one column at a time), `says[]` (one sentence per column, shown under the table; each step replaces the previous one) |
| `shift` | Cheap now (struck through) → scarce now | `cheap[]`, `scarce[{ title, text }]`, `cheapLabel`, `scarceLabel` (optional column labels), `steps` (reveals scarce rows one by one) |
| `statement` (alias `takeaway`) | Key message | `title`, `points[]`, `chipsLabel`, `chips[]`, `callout` |
| `quote` | Big quote | `text`, `by`, optional `before` / `beforeBy` (a struck-through original shown as a diff) |
| `discussion` | Q&A | `title`, `prompts[]` |
| `terminal` | Terminal window with a prompt + fact cards | `eyebrow`, `title`, `window`, `command`, `intro`, `prompt[{ label, text } or { label, items[] }]`, `facts[{ label, title, text, accent }]` |
| `event` | Event invite with a ticket card and QR | `eyebrow`, `title`, `lead`, `tags`, `stats[{ value, label }]`, `date{ day, month, weekday }`, `details[{ label, value }]`, `url`, `display`, `qr`, `cta`, `promo{ label, code, note }` (discount-code box next to the QR) |
| `contact` | Closing links | `title`, `lead` (both optional), `qr{ src, url, alt, caption }` (click to zoom), `name`, `role`, `avatar`, `links[{ label, display, url }]` |

To add a new layout, add a function to `Layouts` in `renderers.js` that returns an HTML string,
then add a `.layout-<name>` block to `layouts.css`. The engine picks it up automatically.

## Replacing `[TODO]` placeholders and adding photos

1. Search the `data/` folder for `[TODO:`. Every placeholder is marked this way and shows up as a
   dashed green badge on the slide.
2. Photos: drop the file into `assets/` using the name in the slide's `photo.src`, and it shows
   up automatically, replacing the dashed placeholder:
   - `assets/first-hackathon.jpg`: Part 1, "My first hackathon"
   - `assets/gdg-zagreb.jpg`: Part 1, community bento
   - `assets/sandro-lovnicki.webp`: already included (from sciply.com)
3. To add a photo slot anywhere in a bento grid, give a card
   `photo: { src: 'assets/name.jpg', todo: 'What to put here' }`.
   Use `position: 'top'` to control the crop.

## References (Part 2)

Every milestone slide has clickable citation badges. All URLs were checked in October 2026:
arXiv, GitHub, Anthropic, DeepMind, Google, Cognition, Cursor, LKML and x.com returned HTTP 200.
openai.com and science.org block automated requests (HTTP 403), so those were confirmed through
search results and DOI resolution instead.

| Date | Milestone | Link |
| --- | --- | --- |
| Jun 2017 | Attention Is All You Need | https://arxiv.org/abs/1706.03762 |
| May 2020 | Language Models are Few-Shot Learners (GPT-3) | https://arxiv.org/abs/2005.14165 |
| Jun 29, 2021 | GitHub Copilot technical preview | https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/ |
| Jul 7, 2021 | Evaluating LLMs Trained on Code (Codex) | https://arxiv.org/abs/2107.03374 |
| Feb 2, 2022 | AlphaCode (blog) | https://deepmind.google/discover/blog/competitive-programming-with-alphacode/ |
| Feb 2022 | AlphaCode (paper) | https://arxiv.org/abs/2203.07814 |
| Oct 6, 2022 | ReAct | https://arxiv.org/abs/2210.03629 |
| Nov 30, 2022 | ChatGPT | https://openai.com/index/chatgpt/ |
| Feb 2023 | LLaMA | https://arxiv.org/abs/2302.13971 |
| Mar 14, 2023 | GPT-4 Technical Report | https://arxiv.org/abs/2303.08774 |
| Jun 13, 2023 | Function calling | https://openai.com/index/function-calling-and-other-api-updates/ |
| Oct 10, 2023 | SWE-bench | https://arxiv.org/abs/2310.06770 |
| Nov 6, 2023 | GPT-4 Turbo pricing (DevDay) | https://openai.com/index/new-models-and-developer-products-announced-at-devday/ |
| Mar 12, 2024 | Devin | https://cognition.com/blog/introducing-devin |
| May 13, 2024 | GPT-4o pricing | https://openai.com/index/hello-gpt-4o/ |
| Jul 18, 2024 | GPT-4o mini pricing | https://openai.com/index/gpt-4o-mini-advancing-cost-efficient-intelligence/ |
| May 2024 | SWE-agent | https://arxiv.org/abs/2405.15793 |
| Jun 20, 2024 | Claude 3.5 Sonnet | https://www.anthropic.com/news/claude-3-5-sonnet |
| Jul 2024 | Cursor 0.37: Composer (beta) | https://cursor.com/changelog/0-37-x |
| Aug 13, 2024 | SWE-bench Verified | https://openai.com/index/introducing-swe-bench-verified/ |
| Sep 12, 2024 | OpenAI o1 | https://openai.com/index/learning-to-reason-with-llms/ |
| Oct 22, 2024 | Claude 3.5 Sonnet (new): 49.0% Verified | https://www.anthropic.com/news/3-5-models-and-computer-use |
| Nov 2024 | Windsurf Editor | https://windsurf.com/blog/windsurf-launch |
| Nov 25, 2024 | Model Context Protocol | https://www.anthropic.com/news/model-context-protocol |
| Jan 20, 2025 | DeepSeek-R1 ($2.19 / M output tokens) | https://api-docs.deepseek.com/news/news250120 |
| Feb 2, 2025 | Karpathy coins "vibe coding" | https://x.com/karpathy/status/1886192184808149383 |
| Feb 24, 2025 | Claude 3.7 Sonnet & Claude Code | https://www.anthropic.com/news/claude-3-7-sonnet |
| Mar 19, 2025 | METR: measuring AI ability to complete long tasks | https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/ |
| Mar 2025 | Epoch AI: LLM inference price trends | https://epoch.ai/data-insights/llm-inference-price-trends |
| Mar 25, 2025 | Gemini 2.5 Pro: 63.8% Verified | https://blog.google/technology/google-deepmind/gemini-model-thinking-updates-march-2025/ |
| Apr 16, 2025 | OpenAI Codex CLI | https://github.com/openai/codex |
| May 19, 2025 | GitHub Copilot coding agent | https://github.blog/news-insights/product-news/github-copilot-meet-the-new-coding-agent/ |
| Jun 25, 2025 | Gemini CLI | https://blog.google/technology/developers/introducing-gemini-cli-open-source-ai-agent/ |
| Jul 10, 2025 | METR: early-2025 AI and experienced OSS developers (19% slower) | https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ |
| Jul 2025 | Stack Overflow Developer Survey 2025: AI | https://survey.stackoverflow.co/2025/ai |
| Aug 7, 2025 | GPT-5: 74.9% Verified | https://openai.com/index/introducing-gpt-5/ |
| Nov 18, 2025 | Google Antigravity | https://antigravity.google/blog/introducing-google-antigravity |
| Nov 2025 | Claude Opus 4.5: 80.9% Verified | https://www.anthropic.com/news/claude-opus-4-5 |
| Jan 27, 2026 | Clawdbot, now Moltbot (TechCrunch) | https://techcrunch.com/2026/01/27/everything-you-need-to-know-about-viral-personal-ai-assistant-clawdbot-now-moltbot/ |
| Jan 28, 2026 | Personal AI agents like OpenClaw are a security nightmare (Cisco) | https://blogs.cisco.com/ai/personal-ai-agents-like-openclaw-are-a-security-nightmare |
| Feb 2026 | Hacking Moltbook (Wiz) | https://www.wiz.io/blog/exposed-moltbook-database-reveals-millions-of-api-keys |
| Feb 5, 2026 | Claude Opus 4.6 & agent teams | https://www.anthropic.com/news/claude-opus-4-6 |
| Feb 15, 2026 | OpenClaw creator Peter Steinberger joins OpenAI (TechCrunch) | https://techcrunch.com/2026/02/15/openclaw-creator-peter-steinberger-joins-openai/ |
| Feb 23, 2026 | Why we no longer evaluate SWE-bench Verified | https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/ |
| Feb 24, 2026 | METR: uplift study update | https://metr.org/blog/2026-02-24-uplift-update/ |
| Mar 11, 2026 | China limits OpenClaw at banks, agencies (Bloomberg) | https://www.bloomberg.com/news/articles/2026-03-11/china-moves-to-limit-use-of-openclaw-ai-at-banks-government-agencies |
| Apr 2, 2026 | Cursor 3 | https://cursor.com/blog/cursor-3 |
| Jul 24, 2026 | Claude Opus 5 | https://www.anthropic.com/news/claude-opus-5 |
| Aug 30, 2026 | OpenClaw 2.0 | https://openclaw.ai/blog/openclaw-2-accidentally/ |
| Sep 2026 | METR time horizons (no longer updated after 8 Sep) | https://metr.org/time-horizons/ |
| Sep 22, 2026 | Claude Opus 5.5 | https://www.anthropic.com/news/claude-opus-5-5 |
| Oct 2026 | openclaw/openclaw (~393k stars) | https://github.com/openclaw/openclaw |
| Aug 2000 | "Talk is cheap. Show me the code." (Torvalds) | https://lkml.org/lkml/2000/8/25/132 |

### Corrections to the original brief

The brief had a few dates and claims that didn't hold up against the sources, so the slides differ from it here:

- **AlphaCode** ranked roughly in the top 54% of Codeforces competitors, about the median
  competitor. Calling that "human-level" overstates it.
- **SWE-agent** was released in April 2024 and the paper came out in May 2024. Devin, not SWE-agent, was March.
- **Windsurf** launched in Nov 2024 and **Google Antigravity** in Nov 2025, not spring/summer 2025.
- **SWE-bench ~4% → 65–80%** mixed two benchmarks. The chart shows the real points instead:
  1.96% (full SWE-bench, Oct 2023) up to 80.9% (SWE-bench Verified, Nov 2025), with a note that
  the two aren't strictly comparable.
- **SWE-agent** scores 12.5% in the paper (12.29% was the early README number). **Devin**'s 13.86%
  was on a random 25% subset of SWE-bench. **Cursor Composer** shipped on 13 Jul 2024, not alongside
  Claude 3.5 Sonnet on 20 Jun.
- **SWE-bench Verified** wasn't retired for being saturated: OpenAI cited contamination and flawed
  tests. The earlier "90%+ by mid-2026" note had no source and was removed.
- **Transformer → GPT-3** is ~800× more parameters (213M → 175B), not 1000×.
- Toolformer, BabyAGI, Voyager, the AlphaCode *Science* paper and A2A moved out of the slides to
  keep Part 2 inside 15 minutes (the first four are mentioned in the speaker notes).
- **Beamer** shows ~61k downloads per month on pub.dev (Oct 2026), so the slide says
  "~60k downloads / month" instead of "50k+ downloads".
- **context-api-mcp** has no public GitHub repo under `@slovnicki`, so it was removed from
  the profile slide.

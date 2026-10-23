/* ==========================================================================
   Part 2 — 5 years of the AI revolution: how code became cheap (≈15 min)
   Every milestone slide carries `refs` with real dates and links.
   All URLs were checked in Oct 2026 (openai.com / science.org block bots,
   so those were confirmed via search instead of a direct fetch).
   ========================================================================== */

defineSection({ title: 'Part 2 · Five years', minutes: 15 }, [
  {
    type: 'section',
    number: '02',
    eyebrow: 'Part 2',
    title: 'Five Years That Made Code Cheap',
    lead: 'From autocomplete to autonomous agents, one release at a time.',
    range: '2021 → 2026',
    notes: 'Reset the room. “I won’t predict the future. I’ll just show you what already happened, and it’s wild enough.” (≈15 s)',
  },

  {
    type: 'timeline',
    eyebrow: 'Pre-history · 2017 – 2020',
    title: 'Scale changes everything',
    glyph: '175B',
    steps: true,
    events: [
      {
        date: 'June 2017',
        title: '“Attention Is All You Need”',
        text: 'Vaswani et al. replace recurrence with self-attention. The **Transformer** becomes the architecture behind every model in this talk.',
      },
      {
        date: 'May 2020',
        title: 'GPT-3: “Language Models are Few-Shot Learners”',
        text: '175 billion parameters. Show it a few examples in the prompt and it just… does the task. No fine-tuning needed.',
      },
    ],
    takeaway: 'Same architecture, roughly 800× more parameters, and new abilities nobody explicitly programmed.',
    refs: [
      { date: 'Jun 2017', title: 'Attention Is All You Need', id: 'arXiv:1706.03762', url: 'https://arxiv.org/abs/1706.03762' },
      { date: 'May 2020', title: 'Language Models are Few-Shot Learners', id: 'arXiv:2005.14165', url: 'https://arxiv.org/abs/2005.14165' },
    ],
    notes: [
      '≈0.75 min. Not part of the five years, but the reason they happened.',
      'Original Transformer “big” model: ~213M params. GPT-3: 175B, about 800× bigger. The lesson the industry took: *scale works*.',
    ],
  },

  {
    type: 'timeline',
    eyebrow: '2021',
    title: 'The birth of AI autocomplete',
    glyph: 'Tab ⇥',
    steps: true,
    events: [
      {
        date: 'June 29, 2021',
        title: 'GitHub Copilot technical preview',
        text: '“Your AI pair programmer.” Ghost text suggests whole lines and functions inside the editor.',
      },
      {
        date: 'July 7, 2021',
        title: 'Codex: Evaluating LLMs Trained on Code',
        text: 'Chen et al. (OpenAI) introduce the **HumanEval** benchmark. Codex solves 28.8% of its problems on the first try, versus 0% for GPT-3.',
      },
    ],
    takeaway: 'We still write code line by line, but `Tab` becomes the most important key on the keyboard.',
    refs: [
      { date: 'Jun 2021', title: 'Introducing GitHub Copilot', id: 'github.blog', url: 'https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/' },
      { date: 'Jul 2021', title: 'Evaluating Large Language Models Trained on Code', id: 'arXiv:2107.03374', url: 'https://arxiv.org/abs/2107.03374' },
    ],
    notes: '≈1.25 min. Ask: “Who here had Copilot in 2021?” The human still drives; the model just finishes your sentences.',
  },

  {
    type: 'timeline',
    eyebrow: '2022',
    title: 'Code contests & the chat moment',
    glyph: '⌘C ⌘V',
    steps: true,
    events: [
      {
        date: 'Feb 2, 2022',
        title: 'DeepMind AlphaCode',
        text: 'Ranks in roughly the top 54% of human competitors in Codeforces contests, the first AI to compete at that level.',
      },
      {
        date: 'Oct 6, 2022',
        title: 'ReAct: Reason + Act',
        text: 'Yao et al. interleave *Thought → Action → Observation*. The loop at the heart of every modern agent.',
      },
      {
        date: 'Nov 30, 2022',
        title: 'ChatGPT launches',
        text: 'A chat box anyone can use. Software development enters the *copy-paste from browser to IDE* era.',
      },
    ],
    takeaway: 'The model moves into a chat window. We become the clipboard, but we still have to know where the code goes.',
    refs: [
      { date: 'Feb 2022', title: 'Competitive programming with AlphaCode', id: 'deepmind.google', url: 'https://deepmind.google/discover/blog/competitive-programming-with-alphacode/' },
      { date: 'Feb 2022', title: 'Competition-Level Code Generation with AlphaCode', id: 'arXiv:2203.07814', url: 'https://arxiv.org/abs/2203.07814' },
      { date: 'Oct 2022', title: 'ReAct', id: 'arXiv:2210.03629', url: 'https://arxiv.org/abs/2210.03629' },
      { date: 'Nov 2022', title: 'Introducing ChatGPT', id: 'openai.com', url: 'https://openai.com/index/chatgpt/' },
    ],
    notes: [
      '≈1.25 min. AlphaCode: “median competitor”, not superhuman, but a huge jump at the time (later published in *Science*, Dec 2022, doi:10.1126/science.abq1158).',
      'ReAct is the quiet one on this slide but the most important for where we end up: reason, call a tool, look at the result, repeat.',
    ],
  },

  {
    type: 'timeline',
    eyebrow: '2023',
    title: 'Tool use & the first agents',
    glyph: '{ "fn": … }',
    steps: true,
    events: [
      {
        date: 'Feb 2023',
        title: 'LLaMA',
        text: 'Meta releases model weights to researchers, they leak within a week, and the **open-weights** movement begins. Anyone can now run a capable model on their own hardware.',
      },
      {
        date: 'Mar 14 & Jun 13, 2023',
        title: 'GPT-4 & function calling',
        text: 'GPT-4 raises the bar on reasoning. Function calling lets models reliably emit structured JSON that triggers real tools.',
      },
      {
        date: 'Oct 10, 2023',
        title: 'SWE-bench',
        text: '2,294 real GitHub issues. Can a model resolve them? The best model at launch (Claude 2) solves **1.96%**.',
      },
    ],
    takeaway: 'Models learn to use tools, and we finally get a yardstick for real engineering work.',
    refs: [
      { date: 'Feb 2023', title: 'LLaMA', id: 'arXiv:2302.13971', url: 'https://arxiv.org/abs/2302.13971' },
      { date: 'Mar 2023', title: 'GPT-4 Technical Report', id: 'arXiv:2303.08774', url: 'https://arxiv.org/abs/2303.08774' },
      { date: 'Jun 2023', title: 'Function calling and other API updates', id: 'openai.com', url: 'https://openai.com/index/function-calling-and-other-api-updates/' },
      { date: 'Oct 2023', title: 'SWE-bench', id: 'arXiv:2310.06770', url: 'https://arxiv.org/abs/2310.06770' },
    ],
    notes: [
      '≈1.5 min. The year models got hands.',
      'If asked: the research side was **Toolformer** (Feb 2023, arXiv:2302.04761), a model that learns when to call APIs. Function calling is what developers actually shipped with. Other viral loops: BabyAGI (Apr 2023) and Voyager (May 2023, arXiv:2305.16291), which wrote its own skill library to play Minecraft.',
      'Remember the 1.96%. We come back to it in two slides.',
    ],
  },

  {
    type: 'timeline',
    eyebrow: '2024',
    title: 'AI-native IDEs & real agents',
    glyph: '⌘I',
    steps: true,
    events: [
      {
        date: 'Mar 12, 2024',
        title: 'Devin',
        text: 'Cognition’s “first AI software engineer”: 13.86% on SWE-bench (a random 25% subset), unassisted.',
      },
      {
        date: 'Apr – May 2024',
        title: 'SWE-agent',
        text: 'Princeton’s open-source agent with a purpose-built agent-computer interface: 12.5% on full SWE-bench.',
      },
      {
        date: 'Jun – Jul 2024',
        title: 'Claude 3.5 Sonnet & Cursor Composer',
        text: 'A big jump in coding and agency, while **Cursor** makes multi-file edits (Composer) feel normal.',
      },
      {
        date: 'Sept 12, 2024',
        title: 'OpenAI o1',
        text: 'Test-time compute: an RL-trained chain of thought *before* answering.',
      },
      {
        date: 'Nov 25, 2024',
        title: 'Model Context Protocol',
        text: 'Anthropic open-sources **MCP**, one standard way to connect models to data sources and developer tools.',
      },
    ],
    takeaway: 'We stop pasting. The agent reads and writes the repo itself.',
    refs: [
      { date: 'Mar 2024', title: 'Introducing Devin', id: 'cognition.com', url: 'https://cognition.com/blog/introducing-devin' },
      { date: 'May 2024', title: 'SWE-agent', id: 'arXiv:2405.15793', url: 'https://arxiv.org/abs/2405.15793' },
      { date: 'Jun 2024', title: 'Claude 3.5 Sonnet', id: 'anthropic.com', url: 'https://www.anthropic.com/news/claude-3-5-sonnet' },
      { date: 'Jul 2024', title: 'Cursor 0.37: Composer (beta)', id: 'cursor.com', url: 'https://cursor.com/changelog/0-37-x' },
      { date: 'Sep 2024', title: 'Learning to reason with LLMs', id: 'openai.com', url: 'https://openai.com/index/learning-to-reason-with-llms/' },
      { date: 'Nov 2024', title: 'Model Context Protocol', id: 'anthropic.com', url: 'https://www.anthropic.com/news/model-context-protocol' },
    ],
    notes: [
      '≈1.5 min. The editor becomes the agent’s workspace. Notice we stop pasting: the model reads and writes the repo itself.',
      'SWE-agent code went public in early April 2024; the paper followed in May (arXiv:2405.15793, 12.5% pass@1). Claude 3.5 Sonnet: 20 June. Composer shipped as a beta in Cursor 0.37 on 13 July 2024.',
    ],
  },

  {
    type: 'timeline',
    eyebrow: '2025',
    title: 'Terminal agents & vibe coding',
    glyph: '$ claude',
    steps: true,
    events: [
      {
        date: 'Jan 20, 2025',
        title: 'DeepSeek-R1',
        text: 'Open weights, “on par with o1” on code and math, at **$2.19** per million output tokens. o1 costs $60.',
      },
      {
        date: 'Feb 2, 2025',
        title: '“Vibe coding”',
        text: 'Andrej Karpathy: “fully give in to the vibes… forget that the code even exists.”',
      },
      {
        date: 'Feb – Jun 2025',
        title: 'Terminal agents',
        text: '**Claude Code** (Feb), OpenAI **Codex CLI** (Apr), **Gemini CLI** (Jun). The agent lives in your shell: it reads the repo, runs the tests, commits.',
      },
      {
        date: 'May – Nov 2025',
        title: 'Agents everywhere',
        text: 'Assign a GitHub issue to the Copilot coding agent and get a PR back (May). Google Antigravity is an IDE built around agents (Nov).',
      },
    ],
    takeaway: 'We move from writing code to describing intent and reviewing diffs.',
    refs: [
      { date: 'Jan 2025', title: 'DeepSeek-R1 release', id: 'api-docs.deepseek.com', url: 'https://api-docs.deepseek.com/news/news250120' },
      { date: 'Feb 2025', title: 'Karpathy on vibe coding', id: 'x.com', url: 'https://x.com/karpathy/status/1886192184808149383' },
      { date: 'Feb 2025', title: 'Claude 3.7 Sonnet and Claude Code', id: 'anthropic.com', url: 'https://www.anthropic.com/news/claude-3-7-sonnet' },
      { date: 'Apr 2025', title: 'Codex CLI', id: 'GitHub', url: 'https://github.com/openai/codex' },
      { date: 'Jun 2025', title: 'Introducing Gemini CLI', id: 'blog.google', url: 'https://blog.google/technology/developers/introducing-gemini-cli-open-source-ai-agent/' },
      { date: 'May 2025', title: 'Copilot coding agent', id: 'github.blog', url: 'https://github.blog/news-insights/product-news/github-copilot-meet-the-new-coding-agent/' },
      { date: 'Nov 2025', title: 'Google Antigravity', id: 'antigravity.google', url: 'https://antigravity.google/blog/introducing-google-antigravity' },
    ],
    notes: [
      '≈1.5 min. The human moves from writing code to describing intent and reviewing diffs.',
      'DeepSeek-R1 is the “cheap” moment: o1-level reasoning, open weights, about 27× cheaper output than o1 ($2.19 vs $60 per million tokens). Nvidia lost ~$600B in market value in one day the week after.',
      'Claude Code launched on 24 Feb 2025 as a research preview, alongside Claude 3.7 Sonnet. Codex CLI: 16 Apr 2025, with o3 / o4-mini. Gemini CLI: 25 Jun 2025, free and open source. Earlier IDE agents: Windsurf (Nov 2024), Copilot agent mode in VS Code (2025).',
      'Also Nov 2025, quietly: Peter Steinberger publishes the personal assistant that becomes **Clawdbot** (today: OpenClaw). Hold that thought for the next slide.',
    ],
  },

  {
    type: 'timeline',
    eyebrow: '2026',
    title: 'Orchestrated subagents',
    glyph: '∥ ∥ ∥',
    steps: true,
    events: [
      {
        date: 'Jan – Feb 2026',
        title: 'Clawdbot 🦞',
        text: 'One developer’s agent: 44k → 247k GitHub stars in five weeks, two renames. Vibe-coded **Moltbook** leaks 1.5M agents’ API keys.',
      },
      {
        date: 'Feb 5, 2026',
        title: 'Agent teams',
        text: 'Claude Opus 4.6 ships with **agent teams** in Claude Code: several agents work in parallel and coordinate on their own.',
      },
      {
        date: 'Apr 2, 2026',
        title: 'Cursor 3',
        text: 'The IDE rebuilt around agents, not files: local and cloud agents side by side, across repos, handed off between laptop and cloud.',
      },
      {
        date: 'Jul – Sep 2026',
        title: 'Claude Opus 5 → 5.5',
        text: 'Long agentic runs become normal. An early tester finished a **680,000-line** code migration in under a day.',
      },
      {
        date: 'Feb & Sep 2026',
        title: 'The yardsticks run out',
        text: 'OpenAI retires SWE-bench Verified (Feb). METR stops its task-length chart (Sep): past 16 hours, it can’t measure reliably.',
      },
    ],
    takeaway: 'The question shifts from “**can it write** the code?” to “**can we trust** what it did?”',
    refs: [
      { date: 'Jan 2026', title: 'Clawdbot, now Moltbot', id: 'techcrunch.com', url: 'https://techcrunch.com/2026/01/27/everything-you-need-to-know-about-viral-personal-ai-assistant-clawdbot-now-moltbot/' },
      { date: 'Feb 2026', title: 'Hacking Moltbook', id: 'wiz.io', url: 'https://www.wiz.io/blog/exposed-moltbook-database-reveals-millions-of-api-keys' },
      { date: 'Feb 2026', title: 'Claude Opus 4.6', id: 'anthropic.com', url: 'https://www.anthropic.com/news/claude-opus-4-6' },
      { date: 'Apr 2026', title: 'Cursor 3', id: 'cursor.com', url: 'https://cursor.com/blog/cursor-3' },
      { date: 'Jul 2026', title: 'Claude Opus 5', id: 'anthropic.com', url: 'https://www.anthropic.com/news/claude-opus-5' },
      { date: 'Sep 2026', title: 'Claude Opus 5.5', id: 'anthropic.com', url: 'https://www.anthropic.com/news/claude-opus-5-5' },
      { date: 'Feb 2026', title: 'Why we no longer evaluate SWE-bench Verified', id: 'openai.com', url: 'https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/' },
      { date: 'Sep 2026', title: 'METR time horizons', id: 'metr.org', url: 'https://metr.org/time-horizons/' },
    ],
    notes: [
      '≈1.5 min. This year: agents run in parallel and for hours, and the benchmarks can’t keep up.',
      '**Subagents, in one sentence:** a main agent splits the job, hands each piece to a subagent with its own fresh context (explore the repo, write tests, review), then collects and merges the results. Claude Code added custom subagents in mid-2025; in 2026, with agent teams, orchestrating them became the normal way to run big tasks. You stop driving one agent and start managing a small team of them.',
      '**Clawdbot, if the room reacts (+30 s):** (slide says Clawdbot, the name it went viral under; today it’s OpenClaw.) Peter Steinberger (founder of PSPDFKit) published his personal agent on 24 Nov 2025: you text it on WhatsApp or Telegram and it does things on your machine. Names: Warelay → CLAWDIS → Clawdbot (Jan 2) → Moltbot (Jan 27, after Anthropic’s trademark complaint: “Clawd” was too close to “Claude”) → OpenClaw (Jan 30). He said he “messed up” the rename: crypto scammers took over his old GitHub username and launched fake coins in his name. The hype even lifted Cloudflare’s stock 14% premarket.',
      'Then the hangover. Cisco (28 Jan) found a third-party skill exfiltrating data and doing prompt injection without the user knowing. Moltbook, a social network for agents launched 27 Jan by Matt Schlicht, who said on X he didn’t write one line of code for it: Wiz found a Supabase key in the frontend with Row Level Security off, giving full read/write access to ~1.5M agent API tokens, 35k emails and private agent DMs (about 17k humans behind 1.5M “agents”). Fixed within hours.',
      'Then the comeback: on 15 Feb Steinberger joined OpenAI to “drive the next generation of personal agents”, and OpenClaw moved to a foundation (TechCrunch). China restricted it at banks and state agencies in March (Bloomberg). OpenClaw 2.0 shipped on 30 Aug (933 contributors, 16k+ PRs), and The Register still criticized its security defaults. Stars: 44.2k (27 Jan) → 247k (2 Mar) → ~393k (22 Oct 2026, GitHub API). Hackathon line: “You could build the next OpenClaw this weekend. Please also build the security.”',
      'Agent teams launched as a research preview. Cursor 3 still has the classic editor, but the default view is now a list of agents and their diffs.',
      'Opus 5: 24 Jul 2026. Opus 5.5: 22 Sep 2026, at the level of Fable 5.1 on most work and 40% cheaper to run than Opus 5. The 680k-line migration is an early-tester claim from Anthropic’s announcement. Anthropic benchmarks it against OpenAI’s GPT-6 Astra: the frontier keeps moving every few weeks.',
      'Feb 2026: OpenAI stops reporting SWE-bench Verified, citing contamination and flawed tests (≥59% of the problems it audited), and recommends SWE-bench Pro. The benchmark that started at 2% got used up in under three years. METR’s time-horizon page has not been updated since 8 Sep 2026.',
    ],
  },

  {
    type: 'chart',
    eyebrow: 'The yardstick',
    title: 'GitHub issues solved: 2% → 81%, *then flat*',
    lead: 'The models didn’t stop improving. **The test did:** the remaining problems are partly broken, and the answers had leaked into training data.',
    unit: '%',
    ariaLabel: 'Bar chart of SWE-bench resolve rate from 1.96% in October 2023 to 80.9% in November 2025, flat at about 81% in early 2026, after which OpenAI retired the benchmark in February 2026',
    lines: [{ value: 81, label: '~81%' }],
    bars: [
      { label: 'Claude 2', date: 'Oct 2023', value: 1.96, display: '1.96%', note: 'SWE-bench' },
      { label: 'Devin', date: 'Mar 2024', value: 13.86, display: '13.9%', note: 'SWE-bench' },
      { label: 'GPT-4o', date: 'Aug 2024', value: 33.2, display: '33.2%', note: 'Verified' },
      { label: 'Claude 3.5 Sonnet', date: 'Oct 2024', value: 49.0, display: '49.0%', note: 'Verified' },
      { label: 'Gemini 2.5 Pro', date: 'Mar 2025', value: 63.8, display: '63.8%', note: 'Verified' },
      { label: 'GPT-5', date: 'Aug 2025', value: 74.9, display: '74.9%', note: 'Verified' },
      { label: 'Claude Opus 4.5', date: 'Nov 2025', value: 80.9, display: '80.9%', note: 'Verified' },
      { label: 'Claude Opus 4.6', date: 'Feb 2026', value: 80.8, display: '80.8%', note: 'Verified' },
      { label: 'Gemini 3.1 Pro', date: 'Feb 2026', value: 80.6, display: '80.6%', note: 'Verified' },
      { label: 'SWE-bench Verified', date: 'Feb 2026', value: 100, display: 'Retired', note: 'by OpenAI', marker: true, highlight: true },
    ],
    footnote: 'Vendor-reported. Full SWE-bench (2,294 issues) until mid-2024, then Verified (500 human-checked), so not strictly comparable.',
    refs: [
      { date: 'Oct 2023', title: 'SWE-bench', id: 'arXiv:2310.06770', url: 'https://arxiv.org/abs/2310.06770' },
      { date: 'Mar 2024', title: 'Introducing Devin', id: 'cognition.com', url: 'https://cognition.com/blog/introducing-devin' },
      { date: 'Aug 2024', title: 'Introducing SWE-bench Verified', id: 'openai.com', url: 'https://openai.com/index/introducing-swe-bench-verified/' },
      { date: 'Oct 2024', title: 'Claude 3.5 Sonnet (new)', id: 'anthropic.com', url: 'https://www.anthropic.com/news/3-5-models-and-computer-use' },
      { date: 'Mar 2025', title: 'Gemini 2.5', id: 'blog.google', url: 'https://blog.google/technology/google-deepmind/gemini-model-thinking-updates-march-2025/' },
      { date: 'Aug 2025', title: 'Introducing GPT-5', id: 'openai.com', url: 'https://openai.com/index/introducing-gpt-5/' },
      { date: 'Nov 2025', title: 'Claude Opus 4.5', id: 'anthropic.com', url: 'https://www.anthropic.com/news/claude-opus-4-5' },
      { date: 'Feb 2026', title: 'Claude Opus 4.6', id: 'anthropic.com', url: 'https://www.anthropic.com/news/claude-opus-4-6' },
      { date: 'Feb 2026', title: 'Why we no longer evaluate SWE-bench Verified', id: 'openai.com', url: 'https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/' },
    ],
    notes: [
      '≈1 min. Let the chart speak. “Two years. From one in fifty to four in five. And then… nothing.”',
      'Point at the flat part: Opus 4.5 80.9%, Opus 4.6 80.8%, Gemini 3.1 Pro 80.6% (vendor-reported; one third-party run had Gemini nearer 75%). The models didn’t stop improving, the *ruler* ran out: in Feb 2026 OpenAI stopped reporting Verified, citing training-data contamination and flawed tests in ≥59% of the problems it audited, and recommended the harder SWE-bench Pro (2026 frontier models score ~45–57% there).',
      'Line: “When a benchmark goes from 2% to ‘we can’t trust it anymore’ in under three years, you need a different kind of ruler.” → next slide.',
    ],
  },

  {
    type: 'chart',
    eyebrow: 'A different ruler · METR, Model Evaluation & Threat Research',
    title: 'From *2-second* to *12-hour* tasks',
    lead: 'Tasks timed on human experts. Each bar: the length an AI agent finishes half the time.',
    max: 72000,
    ticks: [
      { value: 0, label: '0' },
      { value: 14400, label: '4 h' },
      { value: 28800, label: '8 h' },
      { value: 43200, label: '12 h' },
      { value: 57600, label: '16 h' },
      { value: 72000, label: '20 h' },
    ],
    lines: [{ value: 57600, label: '16 h: past this, METR can’t measure' }],
    ariaLabel: 'Bar chart of METR 50% time horizon: GPT-2 2 seconds (2019), GPT-3 9 seconds (2020), GPT-3.5 36 seconds (2022), GPT-4 5 minutes (2023), Claude 3.5 Sonnet 30 minutes (2024), o3 1.5 hours (2025), GPT-5 2.3 hours (2025), Claude Opus 4.5 4.8 hours (2025), Claude Opus 4.6 about 12 hours (2026), Claude Mythos Preview at least 16 hours (2026)',
    bars: [
      { label: 'GPT-2', date: '2019', value: 2, display: '2 s' },
      { label: 'GPT-3', date: '2020', value: 9, display: '9 s' },
      { label: 'GPT-3.5', date: '2022', value: 36, display: '36 s' },
      { label: 'GPT-4', date: 'Mar 2023', value: 300, display: '5 min' },
      { label: 'Claude 3.5 Sonnet', date: 'Oct 2024', value: 1800, display: '30 min' },
      { label: 'o3', date: 'Apr 2025', value: 5640, display: '1.5 h' },
      { label: 'GPT-5', date: 'Aug 2025', value: 8280, display: '2.3 h' },
      { label: 'Claude Opus 4.5', date: 'Nov 2025', value: 17340, display: '4.8 h' },
      { label: 'Claude Opus 4.6', date: 'Feb 2026', value: 43140, display: '~12 h', highlight: true },
      { label: 'Claude Mythos Preview', date: 'Apr 2026', value: 57600, display: '16 h+', note: 'off the ruler', marker: true },
    ],
    footnote: '50% time horizon on METR’s software tasks (human time, not how long the agent runs). Time Horizon 1.0 up to Opus 4.5, 1.1 after; wide error bars (Opus 4.6: 5 to 61 h). METR stopped updating it in Sep 2026.',
    refs: [
      { date: 'Mar 2025', title: 'Measuring AI ability to complete long tasks', id: 'arXiv:2503.14499', url: 'https://arxiv.org/abs/2503.14499' },
      { date: 'Feb 2026', title: 'Claude Opus 4.6 time horizon', id: 'x.com/METR_Evals', url: 'https://x.com/METR_Evals/status/2024923422867030027' },
      { date: 'Sep 2026', title: 'METR time horizons', id: 'metr.org', url: 'https://metr.org/time-horizons/' },
    ],
    notes: [
      '≈1.5 min. First explain the acronym: METR, “meter”, Model Evaluation & Threat Research. Nonprofit in Berkeley, started in 2022 as ARC Evals, independent since Dec 2023. They test frontier models before release.',
      'How to read it: they collected software tasks and timed human experts on them, from seconds to many hours. The bar is the task length where the agent succeeds half the time. Opus 4.6 at ~12 h means: a task that takes an expert a long working day, the model finishes about half the time. It does *not* mean the model runs for 12 hours.',
      'Linear scale on purpose: everything before 2024 is a sliver at the bottom (GPT-4 at 5 min is 0.4% of the height). The length doubled roughly every 7 months from 2019 to 2024, and about every 4 months since. From 2 seconds to half a day in seven years.',
      'Then the ruler breaks too: Opus 4.6 was first reported at 14.5 h (CI 6 to 98 h), later corrected to ~12 h. Claude Mythos Preview (Apr 2026) is “likely at least 16 h”, and METR says anything above 16 h is unreliable with its current tasks. It stopped updating the chart in Sep 2026.',
      '**Hackathon hook:** point at the 24 h gridline. “Ri-Hack is 24 hours. The best agents are already past what METR can measure, right below that line. The question for this weekend isn’t *can AI build it?* It’s *what is worth building, and can you prove it works?*”',
    ],
  },

  {
    type: 'comparison',
    eyebrow: 'Evolution summary',
    steps: true,
    columns: [
      { year: '2021', label: 'Autocomplete' },
      { year: '2022', label: 'Chat' },
      { year: '2023', label: 'First agents' },
      { year: '2024', label: 'AI-native IDE' },
      { year: '2025', label: 'Terminal agents' },
      { year: '2026', label: 'Orchestrated subagents' },
    ],
    rows: [
      { label: 'You press', cells: ['`Tab`', '`⌘C` / `⌘V`', '`y` to approve each step', '`⌘I` + `@tools`', '`Enter`, accept all', '`Enter`, then review'] },
      { label: 'AI writes', cells: ['A single line', 'A snippet in a chat window', 'Function calls, in a loop', 'Multi-file edits', 'Whole features', 'Features in parallel, for hours'] },
      { label: 'AI sees', cells: ['The open file', 'Whatever you paste', 'Tool results', 'The repo + connected tools', 'Repo, shell & tests', 'Repo, tickets, docs, CI, other agents'] },
      { label: 'Your job', cells: ['Write, then `Tab`', 'Be the clipboard', 'Babysit the tools', 'Stop pasting, steer', 'Describe intent, review diffs', 'Decide what to trust'] },
    ],
    says: [
      'We still write code line by line, but `Tab` becomes the most important key on the keyboard.',
      'The model moves into a chat window. We become the clipboard, but we still have to know where the code goes.',
      'Models learn to use tools, and we finally get a yardstick for real engineering work.',
      'We stop pasting. The agent reads and writes the repo itself.',
      'We move from writing code to describing intent and reviewing diffs.',
      'The question shifts from “**can it write** the code?” to “**can we trust** what it did?”',
    ],
    notes: [
      '≈1.5 min. Walk it column by column: each → reveals one year and swaps the sentence under the table (the takeaway from that year’s slide; read it out). The unit of work grows from a *line* to a *feature*, and your job from typing to deciding what to trust.',
      '2023 “`y` to approve each step”: AutoGPT asked you to authorise every command it wanted to run. 2025 “accept all”: Karpathy’s vibe coding, “I ‘Accept All’ always, I don’t read the diffs anymore.”',
    ],
  },

  {
    type: 'shift',
    eyebrow: 'Where we stand today',
    title: 'When code becomes cheap…',
    steps: true,
    cheap: ['Syntax', 'Boilerplate', 'Typing speed', 'Knowledge'],
    scarce: [
      { title: 'Problem definition', text: 'Knowing what is actually worth building.' },
      { title: 'System architecture', text: 'Deciding how the pieces fit before agents fill them in.' },
      { title: 'Context curation', text: 'Giving agents the right docs, examples and constraints.' },
      { title: 'Taste', text: 'Knowing when it’s good, and when to throw it away.' },
      { title: 'Verification', text: 'Making it trustworthy: tests, reviews and proof that it works.' },
      { title: 'Accountability', text: 'Vouching for code nobody fully read. Someone has to own it.' },
    ],
    notes: [
      '≈1.5 min. No predictions. Just: this is already true today. The left column is on screen from the start; each → adds one scarce skill on the right. Say one sentence per row.',
      '*Knowledge* is crossed out on purpose: you can now ship in a language or framework you never learned. Knowing the syntax of Rust, Kotlin or SQL is no longer the entry ticket.',
      '*Accountability* (last row, land it): leads sign off on code nobody on the team read in full, and still have to put their hand in the fire that it works. The agent doesn’t get paged at 3 a.m. Someone has to take the responsibility, and that someone is a person.',
      'Backup for *verification*, if asked (no longer on the slide): in METR’s early-2025 trial, 16 experienced open-source developers were **19% slower** with AI tools, yet believed they had been 20% faster. METR’s Feb 2026 follow-up says developers are probably faster now, but it can no longer measure how much, partly because many refuse to work without AI. In the Stack Overflow 2025 survey, 84% use or plan to use AI tools, 46% distrust their accuracy, and 66% say their top frustration is answers that are “almost right, but not quite”. Sources, if asked: metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study, metr.org/blog/2026-02-24-uplift-update, survey.stackoverflow.co/2025/ai',
      'Real-world case for *verification*: Moltbook (2026 slide). Vibe-coded end to end, shipped to 1.5M agents in days, and one missing database setting exposed all of it.',
      'For this weekend: the teams that win won’t type the most code. They’ll pick the right problem, feed agents the right context, and check the output. Ri-Hack teams are 3 developers + 2 economics students: the non-coders might matter more than ever.',
      'Bridge: “And speaking of trust: let’s see what Claude built while we were talking.”',
    ],
  },

  {
    type: 'terminal',
    eyebrow: 'Meanwhile, in the terminal…',
    title: 'Let’s see what it built.',
    window: '~/tic-tac-no — claude',
    command: 'npm test && npm run dev',
    intro: 'One prompt, about 15 minutes ago. Time to **verify**.',
    prompt: [
      { label: 'Read', text: 'What did it do? Skim the summary and the diff, not every line.' },
      { label: 'Test', text: 'Do the rule tests pass?' },
      { label: 'Play', text: 'One round vs the CPU. Does it *feel* right?' },
    ],
    steps: true,
    facts: [
      { label: 'I wrote', title: 'The spec', text: 'Rules, stack, taste and how to check the result.' },
      { label: 'It wrote', title: 'The code', text: 'Game logic, AI opponent, UI, tests, Dockerfile.', accent: true },
      { label: 'I still own', title: 'The verdict', text: 'Is it correct? Is it good? Would I ship it?' },
    ],
    notes: [
      '**Back to the live demo (≈1.5 min).** Switch to the terminal. Run the tests, start the dev server, play a few moves of a round on screen.',
      'If it isn’t done or something broke, that’s the point too: show where it stopped, and say that checking is now the job. Fallback: the Cloud Run URL in the Part 1 terminal slide notes.',
      'Bridge to the close: “Code got cheap. Your judgment didn’t. Now go build.”',
    ],
  },
]);

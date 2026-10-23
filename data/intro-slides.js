/* ==========================================================================
   Part 1 — About me, communities, my first hackathon & a live rebuild (≈10 min)
   Search for "[TODO:" to find everything that still needs your input.
   Images: drop files into assets/ using the file names in `photo.src`.
   ========================================================================== */

defineSection({ title: 'Part 1 · Hello', minutes: 10 }, [
  {
    type: 'hero',
    eyebrow: 'Ri-Hack 2026 · 23 Oct, Step Ri, Rijeka',
    title: 'Shi++f++t <span class="rest">Happens</span>',
    subtitle: 'When `code` becomes cheap',
    speaker: 'Sandro Lovnički',
    role: 'Software Architect & Tech Lead',
    avatar: 'assets/sandro-lovnicki.webp',
    diff: { file: 'talk.md', minus: '# Shit Happens', plus: '# Shift Happens' },
    meta: {
      bio: 'Holding a master’s degree in computer science and mathematics, Sandro works today as a software architect and tech lead. Through years of consulting and development, he has led the architecture of large-scale systems, cross-platform Flutter applications, and modern AI products and agents. He is the creator of the popular Flutter package Beamer and the pLam programming language, as well as a co-organizer of the Google Developer Group (GDG) Zagreb and Flutter Croatia communities.',
      abstract: 'Writing code has never been faster, easier, and — cheaper. Alongside a short story about my first hackathon and the local tech community, we walk through the last five years of AI madness that broke old habits and fundamentally changed the way we think about and build software.',
    },
    notes: [
      '**Open (≈30 s).** Let the “f” type itself in. Pause. “Yes, one character makes all the difference. Today it’s about the shift.”',
      '**Slot:** Ri-Hack 2026, Friday 23 Oct, 15:00–15:30 at Step Ri, Rijeka, right after Rino Rodin’s mobile security talk; a 15-min break follows. The hackathon itself starts Saturday 10:00 (24 h, teams of 3 developers + 2 economics students, theme revealed at the start).',
      '**Abstract:** Writing code has never been faster, easier, and — cheaper. Alongside a short story about my first hackathon and the local tech community, we walk through the last five years of AI madness that broke old habits and fundamentally changed the way we think about and build software.',
      '**Bio (for the host intro):** Holding a master’s degree in computer science and mathematics, Sandro works today as a software architect and tech lead. Through years of consulting and development, he has led the architecture of large-scale systems, cross-platform Flutter applications, and modern AI products and agents. He is the creator of the popular Flutter package Beamer and the pLam programming language, as well as a co-organizer of the GDG Zagreb and Flutter Croatia communities.',
    ],
  },

  {
    type: 'bento',
    className: 'agenda',
    eyebrow: 'The next 30 minutes',
    title: 'Agenda',
    columns: 3,
    steps: true,
    cards: [
      {
        tag: '01', title: 'About me',
        items: ['Who I am', 'GDG Zagreb & Flutter Zagreb', 'DevFest Croatia 2026', 'My very first hackathon'],
        stat: { value: '10′', label: 'minutes' },
      },
      {
        tag: '02', title: '5 years of AI coding',
        items: ['From autocomplete to chat', 'Tool use & the first agents', 'AI-native IDEs & terminal agents', 'What actually got cheap'],
        stat: { value: '15′', label: 'minutes' }, accent: true,
      },
      {
        tag: '03', title: 'Q&A',
        items: ['Your questions', 'Where AI helps, where it gets in the way', 'What wins a hackathon when code is cheap'],
        stat: { value: '5′', label: 'minutes' },
      },
    ],
    notes: 'Quick roadmap (≈20 s). Promise: no crystal ball, just the last five years and where they left us.',
  },

  {
    type: 'profile',
    eyebrow: 'Who am I?',
    name: 'Sandro Lovnički',
    role: 'Software Architect & Tech Lead',
    photo: 'assets/sandro-lovnicki.webp',
    lead: 'Computer scientist and mathematician turned software architect.',
    tags: ['Flutter', 'AI agents', 'Open source', 'λ-calculus', 'Architecture'],
    steps: true,
    facts: [
      {
        label: 'Education',
        title: 'M.Sc. Computer Science & Mathematics',
        text: 'University of Zagreb. Favourite subjects: computability, complexity theory and machine learning.',
      },
      {
        label: 'Work',
        title: 'Architecture & tech leadership',
        text: 'Large-scale systems, cross-platform Flutter apps for 100,000+ users, and AI products & agents.',
      },
      {
        label: 'Open source',
        title: 'Beamer · pLam',
        text: '**Beamer**: Flutter Favorite routing package, ~60k downloads / month on pub.dev. **pLam**: an interpreter for pure λ-calculus.',
      },
      {
        label: 'Community',
        title: 'GDG Zagreb & Flutter Croatia',
        text: 'Co-organizer of both communities and a regular speaker at tech conferences.',
      },
    ],
    notes: [
      'Keep it short (≈1.5 min). The point is not the CV, it’s that I’ve written a *lot* of code by hand, which is exactly what is getting cheap.',
      'Beamer numbers from pub.dev (Oct 2026): Flutter Favorite, 1.4k likes, ~61k downloads in the last 30 days. pLam came out of research on numeral systems in λ-calculus.',
    ],
  },

  {
    type: 'bento',
    eyebrow: 'The power of community',
    title: 'GDG Zagreb & Flutter Zagreb',
    columns: 4,
    cards: [
      {
        span: [1, 2],
        tag: 'Google Developer Group',
        title: 'GDG Zagreb',
        text: 'One of 1,000+ GDG chapters in 140 countries. 62 events and counting.',
        stat: { value: '1,100+', label: 'members' },
        logo: { src: 'assets/gdg-zagreb-logo.png', alt: 'GDG Zagreb' },
        accent: true,
      },
      {
        span: [2, 2],
        collage: [
          { src: 'assets/devfest-2025-crew.jpg', caption: 'DevFest Zagreb 2025', x: 0, y: 3, w: 53, r: -3 },
          { src: 'assets/build-deploy-2026-hacking.jpg', caption: 'Build & Deploy hackathon, Apr 2026', x: 47, y: 0, w: 53, r: 2.5 },
          { src: 'assets/devfest-2025-lunch.jpg', caption: 'DevFest 2025', x: 3, y: 53, w: 50, r: 2 },
          { src: 'assets/build-deploy-2026-winners.jpg', caption: 'Hackathon winners', x: 49, y: 51, w: 50, r: -2.5 },
        ],
      },
      {
        span: [1, 1],
        tag: 'Meetup',
        title: 'Flutter Zagreb',
        text: '29 meetups so far, rated 4.6 ★.',
        stat: { value: '625', label: 'members' },
      },
      {
        span: [1, 1],
        tag: 'Hackathons',
        items: [
          'Cursor Hackathon<small>March 2026</small>',
          'Build and Deploy your own AI-Powered {product}<small>April 2026</small>',
        ],
      },
    ],
    notes: [
      '[TODO: ≈2.5 min. One story per card. Which event are you proudest of?]',
      'Numbers as of Oct 2026: GDG Zagreb 871 members on meetup.com/gdg-zagreb (62 past events) + 247 on gdg.community.dev (organizers: Mario Vegh, Petra Brčić, Antonio Hadrović, Ivan Štajcer and me). Flutter Zagreb 625 members, 29 past events on meetup.com/flutter-zg (recent: Flutter in Production Extended, Dec 2024, 16 attendees; Flutter Zagreb #34, Sep 2024, 27; Let’s Build a Flutter App Fast, Feb 2024, 29).',
      'Link back to the hackathon story: Petra from the LC Code Challenge photo co-organizes GDG Zagreb with me.',
      'Photos: DevFest Zagreb 2025 (devfesthr.com gallery) and Build and Deploy your own AI-Powered {product}, Apr 2026 (gdg.community.dev wrap-up).',
    ],
  },

  {
    type: 'event',
    eyebrow: 'You’re invited · GDG Zagreb',
    title: 'DevFest <span class="rest">2026</span>',
    lead: 'Where innovation meets community.',
    tags: ['Mobile', 'Web', 'Cloud', 'AI'],
    steps: true,
    stats: [
      { value: '10+', label: 'Expert speakers' },
      { value: '2', label: 'Parallel stages' },
      { value: 'Hands-on', label: 'Workshops' },
    ],
    date: { day: '05', month: 'Dec 2026', weekday: 'Saturday' },
    details: [
      { label: 'Venue', value: 'RIT Croatia, Zagreb' },
      { label: 'Address', value: 'Damira Tomljanovića Gavrana 15' },
    ],
    url: 'https://devfesthr.com',
    display: 'devfesthr.com',
    qr: 'assets/devfesthr-qr.svg',
    cta: 'Tickets are on sale now.',
    promo: { label: 'Just for Ri-Hack', code: 'RIHACK10', note: 'Only 20 codes' },
    refs: [{ title: 'DevFest Croatia 2026', url: 'https://devfesthr.com', id: 'devfesthr.com' }],
    notes: [
      '**Plug (≈45 s).** “If you enjoy this weekend, come to the biggest community event of the year.” DevFest Croatia, **Saturday 5 December 2026**, RIT Croatia in Zagreb, organized by GDG Zagreb.',
      'Mobile, Web, Cloud and AI: 10+ speakers, two parallel stages, hands-on workshops. Tickets are on sale now: click the QR to zoom it so people can scan.',
      '**Discount:** we prepared **20 codes** for Ri-Hack, code `RIHACK10`. First come, first served. Say the code out loud and leave the slide up for a few seconds.',
      'Sponsors welcome: zagrebgdg@gmail.com.',
    ],
  },

  {
    type: 'split',
    eyebrow: 'My first hackathon',
    title: 'LC Code Challenge',
    photo: { src: 'assets/first-hackathon.jpg', todo: 'Add a photo from your first hackathon', alt: 'Holding the LC Code Challenge 2nd prize cheque', fit: 'natural' },
    meta: [
      { label: 'When', value: 'Zagreb · May 2016' },
      { label: 'Team', value: 'BITbyBIT · 2' },
      { label: 'We built', value: 'Tic-Tac-No' },
      { label: 'Result', value: '2nd prize · 4,000 kn' },
    ],
    steps: true,
    cards: [
      { icon: '9×9', title: 'Ultimate tic-tac-toe', text: 'Nine boards in one: where you play decides which board your opponent must play next.' },
      { icon: 'C++', title: 'cocos2d-x, by hand', text: 'Sprites, touch handling, sounds and scenes, all typed out line by line.' },
      { icon: '32', title: 'Win checks, copy-pasted', text: 'Every winning line spelled out by hand: 8 lines × 2 players × 2 board levels.' },
      { icon: '🥈', title: 'Best app, 2nd place', text: 'A giant cheque and the moment I got hooked on building things with people.' },
    ],
    callout: '“Back then, the main bottleneck at a hackathon was how fast your fingers could type.”',
    finale: {
      images: [
        { src: 'assets/tic-tac-no-menu.png', alt: 'Tic-Tac-No main menu' },
        { src: 'assets/tic-tac-no-game.png', alt: 'Tic-Tac-No game board' },
      ],
      caption: 'Tic-Tac-No, 2016.<strong>Yes, it really looked like this.</strong>',
    },
    refs: [{ date: 'Jun 2016', title: 'LC Code Challenge results', url: 'https://www.spi.hr/lc-code-challenge-lc-natjecaj-poticanja-studenata-i-srednjoskolaca-u-izradi-aplikacija/', id: 'spi.hr' }],
    notes: [
      '**Story (≈2 min).** LC Code Challenge by LIBUSOFT CICOM, an app contest for students in Zagreb (May 2016, presentations on 30 May, winners announced 1 June). Team BITbyBIT, Petra Brčić and me, both from FER, entered **Tic-Tac-No**, an *ultimate* tic-tac-toe game for mobile in C++ with cocos2d-x. Nine small boards inside a big one; the cell you play sends your opponent to that board. Win three boards in a row, or five boards in total.',
      'Fun detail from the source: `playboard.cpp` has the eight winning lines written out by hand, twice for X and O, on both the small and the big board. ~530 lines of C++, nothing generated. We took **2nd prize for best app (4,000 kn)**.',
      'First place went to a 4-way browser pong (socket.io + babylon.js).',
      '[TODO: one personal moment from presenting / the cheque photo]',
      'Land on the callout. This is the setup for Part 2: hold onto the idea that *typing* was the bottleneck.',
      '**Last click:** the app screenshots replace the photo. Let the room laugh. (Screens recreated from the original sprites and `playboard.cpp` coordinates.)',
      'Next slide: rebuild it live with Claude.',
    ],
  },

  {
    type: 'terminal',
    eyebrow: 'The shift, live',
    title: 'Let’s rebuild it. *Now.*',
    window: '~/tic-tac-no — claude',
    command: 'claude',
    intro: 'Build **Tic-Tac-No**, a modern web remake of my 2016 ultimate tic-tac-toe.',
    prompt: [
      { label: 'Stack', text: 'Vite + React + TypeScript, pure game logic, Vitest tests.' },
      { label: 'Rules', items: [
        '9 small boards in a 3×3 grid, X starts anywhere',
        'the cell you play sends your opponent to that board',
        'sent to a full board? play in any board that isn’t full',
        '3 in a row claims a small board, permanently',
        'win: 3 claimed boards in a row, or 5 claimed boards',
      ] },
      { label: 'vs CPU', text: 'Easy / Normal / Hard, alpha-beta search in a Web Worker.' },
      { label: 'UX', text: 'Highlight legal boards, score, undo, keyboard, sounds.' },
      { label: 'Design', text: 'Dark `#222`, green X, mauve O, Oxanium + Inter, smooth animations.' },
      { label: 'Verify', text: 'Test every rule, then play full games in a real browser.' },
      { label: 'Ship', text: 'Dockerfile + `deploy.sh` for Cloud Run.' },
    ],
    steps: true,
    facts: [
      { label: '2016', title: '2 people · by hand', text: '500+ spaghetti lines of C++ game logic.<br>Confusing framework struggles.' },
      { label: '2026', title: '1 prompt · ~15 min', text: 'Typed, tested and dockerized while we keep talking.', accent: true },
      { label: 'My job now', title: 'Specify & verify', text: 'The prompt is the rules, the taste and how to check the result. Not the code.' },
    ],
    notes: [
      '**Live demo.** Paste the full prompt from `tic-tac-no-prompt.md` (project root) into Claude Code, hit Enter, then move on to Part 2 while it works (~15 min, mostly npm). Come back on the “Meanwhile, in the terminal…” slide near the end of Part 2, run it locally and play a round.',
      'Click through the cards: 2016 (2 people, 500+ spaghetti lines of hand-written C++) → 2026 (one prompt, ~15 min) → my job now is specifying and verifying.',
      'Private fallback (don’t mention it): https://tic-tac-no-223841501513.europe-west1.run.app',
      'Bridge to Part 2: “While it builds: how did we get here? Let’s rewind five years.”',
    ],
  },
]);

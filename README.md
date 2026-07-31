# Co-Read Spotlight

Side-by-side (co-op) reading for 4–5-year-olds and parents. V1 ships the Level-Up Buddy Reader with static Day 1 (CVC) → Day 2 (`ay`) stories.

## Core product tenet: the magic of 70/30 Buddy Mode

Buddy Mode fundamentally changes the interface and the mental math. The screen is physically split into a large block of parent text and a small child turn: roughly 70% parent reading and 30% child reading.

- **The parent carries comprehension.** The parent reads most of the text fluently and with expression, so the child can enjoy the story while the plot keeps moving.
- **The child is the hero.** The child’s turn is not filler or a recap. It is a 1–3-word punchline, exclamation, or key plot reveal (for example: the parent reads “The pirate opened the chest and gasped,” and the child reads “A red hat!”).
- **Keep success high and fatigue low.** Start with only 1–3 highly targeted words per page, then graduate to longer phrases as the child gains confidence. The child’s share should grow with the lesson level while staying short enough for perfect decoding technique.

When writing or editing a story, preserve this handoff: put comprehension and setup in the parent prose, and reserve the child turn for the satisfying payoff. Do not repeat identical parent prose across lesson days: later days can add parent detail and graduate the child’s line together. A child turn may be narration rather than speech when that makes the story more natural, but it should remain brief and purposeful.

## Run locally

```bash
npm install
npm run dev
```

Open the URL on your iPad (same Wi‑Fi), or use desktop Safari/Chrome at an iPad-ish width.

## Build & free hosting (no server)

```bash
npm run build
```

Deploy the `dist/` folder to any static host:

- **Cloudflare Pages** — drag-and-drop `dist/`, or connect the repo
- **GitHub Pages** — publish `dist/`
- **Vercel** — import repo; framework preset Vite

On iPad Safari: open the HTTPS URL → Share → **Add to Home Screen**.

## V1 checklist

1. Parent text (top ~70%) + child speech bubble (bottom ~30%)
2. Day 1: CVC-only child lines, no info badges
3. **Next Day** → same plot, `ay` words with glowing ℹ
4. Tap ℹ → mnemonic + parent tip + mock audio; auto-closes after 10s with **no visible countdown**

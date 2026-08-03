# Co-Read Spotlight

Side-by-side (co-op) reading for 4–5-year-olds and parents. Each evolutive book climbs a **56-level** ladder from simplest CVC to free-reader exit (one new grapheme per teaching level). *The Rain Day* ships all 56 levels; vocabulary grows from tiny CVC punches to rich free-reader lines.

## Core product tenet: the magic of Buddy Mode

Buddy Mode fundamentally changes the interface and the mental math. Early levels are roughly **70% parent / 30% child**; by the free-reader exit the balance flips to about **5% parent / 90% child**.

- **The parent carries comprehension (at first).** Early on, the parent reads most of the text fluently and with expression, so the child can enjoy the story while the plot keeps moving.
- **The child is the hero.** The child’s turn is never filler or a recap of the parent line. It is the punchline, exclamation, or key plot reveal (for example: the parent reads “The pirate opened the chest and gasped,” and the child reads “A red hat!”). Do not have the child repeat words the parent just said.
- **Keep success high; grow the child’s share.** Start with only 1–3 highly targeted words per page, then graduate to longer phrases and, at the highest levels, multi-sentence child narration. The parent setup shrinks as the child takes the story.

When writing or editing a story, preserve this handoff: put setup in the parent prose, and reserve the child turn for the unpaid payoff. Do not repeat identical parent prose across levels. A child turn may be narration rather than speech when that makes the story more natural.

## Level ladder

Canonical ladder lives in `src/data/level-ladder.ts` (global indices shared across books):

| Levels | Role |
|--------|------|
| 1 | Simplest CVC — no new GPC (`m a s d t i n` opening set) |
| 2–54 | Exactly one new grapheme each (rest of RWI Sets 1–3) |
| 55–56 | No new GPCs — fluency, then free-reader exit |

Levels are not calendar days: the same level may be re-read across many sessions; a ready child may advance more than one level in a day. Intended usage is about 2× 3-minute sessions per day (often 1 on school days).

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
2. Level 1: simplest CVC child lines, no info badges
3. Levels 2–54: one new grapheme each (ℹ on new targets) plus review of the last few graphemes
4. Levels 55–56: no new GPCs — fluency, then free-reader exit
5. Tap ℹ → mnemonic + parent tip + mock audio; auto-closes after 10s with **no visible countdown**

Story copy is hand-written in plain language inside `scripts/generate-rain-day-levels.py` (a compiler, not a text generator). After editing drafts, run:

```bash
python3 scripts/generate-rain-day-levels.py
```

That refreshes `src/data/stories/the-rain-day/levels.ts` and checks Buddy Mode handoffs plus a gradual child-share ramp to level 56.

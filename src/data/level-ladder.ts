/** Canonical evolutive ladder: CVC → free reader (56 levels). */

export const TOTAL_LEVELS = 56

/** Level 1 prerequisite set (RWI early Word Time). Not in-book targets. */
export const OPENING_KNOWN_GRAPHEMES = [
  'm',
  'a',
  's',
  'd',
  't',
  'i',
  'n',
] as const

/**
 * One new grapheme per level for Levels 2–54 (53 entries).
 * Duplicate spellings (oo/oo, ow/ow) are distinct phonemes at different levels.
 */
export const TEACHING_GRAPHEMES = [
  // Rest of Set 1
  'p',
  'g',
  'o',
  'c',
  'k',
  'u',
  'b',
  'f',
  'e',
  'l',
  'h',
  'sh',
  'r',
  'j',
  'v',
  'y',
  'w',
  'th',
  'z',
  'ch',
  'qu',
  'x',
  'ng',
  'nk',
  // Set 2
  'ay',
  'ee',
  'igh',
  'ow',
  'oo',
  'oo',
  'ar',
  'or',
  'air',
  'ir',
  'ou',
  'oy',
  // Set 3
  'ea',
  'oi',
  'a-e',
  'i-e',
  'o-e',
  'u-e',
  'aw',
  'are',
  'ur',
  'er',
  'ow',
  'ai',
  'oa',
  'ew',
  'ire',
  'ear',
  'ure',
] as const

export type LadderLevel = {
  level: number
  /** Empty on L1, L55, L56. */
  targetGrapheme: string | null
  /** Opening set plus every teaching grapheme introduced before this level. */
  knownGraphemes: string[]
}

function uniqueInOrder(graphemes: readonly string[]): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const g of graphemes) {
    if (seen.has(g)) continue
    seen.add(g)
    out.push(g)
  }
  return out
}

/** Build known set as of the start of `level` (1-based), excluding that level's target. */
export function knownGraphemesAt(level: number): string[] {
  if (level <= 1) return [...OPENING_KNOWN_GRAPHEMES]
  const taughtCount = Math.min(Math.max(level - 2, 0), TEACHING_GRAPHEMES.length)
  const taught = TEACHING_GRAPHEMES.slice(0, taughtCount)
  return uniqueInOrder([...OPENING_KNOWN_GRAPHEMES, ...taught])
}

/** Target grapheme for a level, or null when none. */
export function targetGraphemeAt(level: number): string | null {
  if (level < 2 || level > 54) return null
  return TEACHING_GRAPHEMES[level - 2] ?? null
}

export function ladderLevel(level: number): LadderLevel {
  return {
    level,
    targetGrapheme: targetGraphemeAt(level),
    knownGraphemes: knownGraphemesAt(level),
  }
}

/** Global level index where `ay` is introduced (first Set 2 sound). */
export const LEVEL_AY = 2 + TEACHING_GRAPHEMES.indexOf('ay')

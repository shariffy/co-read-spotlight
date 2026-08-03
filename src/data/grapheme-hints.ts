/** Reading mnemonics + parent tips for ladder graphemes (RWI rhymes where they exist). */

export type GraphemeHint = {
  mnemonic: string
  parentInstruction: string
  audioLabel: string
}

const readingHint = (
  grapheme: string,
  rhyme: string,
  tip: string,
): GraphemeHint => ({
  mnemonic: `${grapheme} — ${rhyme}`,
  parentInstruction: tip,
  audioLabel: `Play /${grapheme}/`,
})

/** Hints keyed by grapheme; duplicates (oo, ow) resolved via `hintFor(level, grapheme)`. */
export const GRAPHEME_HINTS: Record<string, GraphemeHint> = {
  p: readingHint('p', 'down the plait, up and over the pirate’s face', 'Point to p. Say /p/. Blend the word slowly.'),
  g: readingHint('g', 'round the girl’s face, down her hair and give her a curl', 'Point to g. Say /g/. Blend the word slowly.'),
  o: readingHint('o', 'all around the orange', 'Point to o. Say /o/. Blend the word slowly.'),
  c: readingHint('c', 'curl around the caterpillar', 'Point to c. Say /c/. Blend the word slowly.'),
  k: readingHint('k', 'down the kangaroo’s body, tail and leg', 'Point to k. Say /k/. Blend the word slowly.'),
  u: readingHint('u', 'down and under the umbrella, up to the top and down to the puddle', 'Point to u. Say /u/. Blend the word slowly.'),
  b: readingHint('b', 'down the laces, over the toe and touch the heel', 'Point to b. Say /b/. Blend the word slowly.'),
  f: readingHint('f', 'down the stem and draw the leaves', 'Point to f. Say /f/. Blend the word slowly.'),
  e: readingHint('e', 'slice into the egg, go over the top, then under the egg', 'Point to e. Say /e/. Blend the word slowly.'),
  l: readingHint('l', 'down the long leg', 'Point to l. Say /l/. Blend the word slowly.'),
  h: readingHint('h', 'down the horse’s head to the hooves and over his back', 'Point to h. Say /h/. Blend the word slowly.'),
  sh: readingHint('sh', 'slither down the snake, then down the horse’s head', 'Point to s and h together. Say /sh/. Blend the word.'),
  r: readingHint('r', 'down the robot’s back, then up and curl', 'Point to r. Say /r/. Blend the word slowly.'),
  j: readingHint('j', 'down his body, curl and dot', 'Point to j. Say /j/. Blend the word slowly.'),
  v: readingHint('v', 'down his body, curl and dot', 'Point to v. Say /v/. Blend the word slowly.'),
  y: readingHint('y', 'down a horn, up a horn and under the yak’s head', 'Point to y. Say /y/. Blend the word slowly.'),
  w: readingHint('w', 'down, up, down, up the worm', 'Point to w. Say /w/. Blend the word slowly.'),
  th: readingHint('th', 'down the tower, across the tower, then down the horse’s head', 'Point to t and h together. Say /th/. Blend the word.'),
  z: readingHint('z', 'zig-zag-zig, down the zip', 'Point to z. Say /z/. Blend the word slowly.'),
  ch: readingHint('ch', 'curl around the caterpillar, then down the horse’s head', 'Point to c and h together. Say /ch/. Blend the word.'),
  qu: readingHint('qu', 'round the queen’s head, up to her crown, down her hair and curl', 'Point to q and u together. Say /kw/. Blend the word.'),
  x: readingHint('x', 'cross down the arm and leg and cross the other way', 'Point to x. Say /ks/. Blend the word slowly.'),
  ng: readingHint('ng', 'a thing on a string', 'Point to n and g together. Say /ng/. Blend the word.'),
  nk: readingHint('nk', 'I think I stink', 'Point to n and k together. Say /nk/. Blend the word.'),
  ay: readingHint('ay', 'May I play?', 'Point to a and y together. Say /ā/. Have your child echo the word.'),
  ee: readingHint('ee', 'What can you see?', 'Point to e and e together. Say /ē/. Have your child echo the word.'),
  igh: readingHint('igh', 'Fly high', 'Point to i-g-h together. Say /ī/. Have your child echo the word.'),
  ow: readingHint('ow', 'Blow the snow', 'Point to o and w together. Say /ō/. Have your child echo the word.'),
  oo: readingHint('oo', 'Poo at the zoo', 'Point to o and o together. Say /oo/. Have your child echo the word.'),
  ar: readingHint('ar', 'Start the car', 'Point to a and r together. Say /ar/. Have your child echo the word.'),
  or: readingHint('or', 'Shut the door', 'Point to o and r together. Say /or/. Have your child echo the word.'),
  air: readingHint('air', 'That’s not fair', 'Point to a-i-r together. Say /air/. Have your child echo the word.'),
  ir: readingHint('ir', 'Whirl and twirl', 'Point to i and r together. Say /ir/. Have your child echo the word.'),
  ou: readingHint('ou', 'Shout it out', 'Point to o and u together. Say /ow/. Have your child echo the word.'),
  oy: readingHint('oy', 'Toy for a boy', 'Point to o and y together. Say /oy/. Have your child echo the word.'),
  ea: readingHint('ea', 'Cup of tea', 'Point to e and a together. Say /ē/. Have your child echo the word.'),
  oi: readingHint('oi', 'Spoil the boy', 'Point to o and i together. Say /oy/. Have your child echo the word.'),
  'a-e': readingHint('a-e', 'Make a cake', 'Point to a and the e on the end. Say /ā/. Blend the word.'),
  'i-e': readingHint('i-e', 'Nice smile', 'Point to i and the e on the end. Say /ī/. Blend the word.'),
  'o-e': readingHint('o-e', 'Phone home', 'Point to o and the e on the end. Say /ō/. Blend the word.'),
  'u-e': readingHint('u-e', 'Huge brute', 'Point to u and the e on the end. Say /ū/. Blend the word.'),
  aw: readingHint('aw', 'Yawn at dawn', 'Point to a and w together. Say /aw/. Have your child echo the word.'),
  are: readingHint('are', 'Care and share', 'Point to a-r-e together. Say /air/. Have your child echo the word.'),
  ur: readingHint('ur', 'Nurse with a purse', 'Point to u and r together. Say /ur/. Have your child echo the word.'),
  er: readingHint('er', 'A better letter', 'Point to e and r together. Say /er/. Have your child echo the word.'),
  ai: readingHint('ai', 'Snail in the rain', 'Point to a and i together. Say /ā/. Have your child echo the word.'),
  oa: readingHint('oa', 'Goat in a boat', 'Point to o and a together. Say /ō/. Have your child echo the word.'),
  ew: readingHint('ew', 'Chew and stew', 'Point to e and w together. Say /oo/. Have your child echo the word.'),
  ire: readingHint('ire', 'Fire fire!', 'Point to i-r-e together. Say /ire/. Have your child echo the word.'),
  ear: readingHint('ear', 'Hear with your ear', 'Point to e-a-r together. Say /ear/. Have your child echo the word.'),
  ure: readingHint('ure', 'Sure it’s pure', 'Point to u-r-e together. Say /ure/. Have your child echo the word.'),
}

const OO_SHORT: GraphemeHint = readingHint(
  'oo',
  'Look at a book',
  'Point to o and o together. Say short /oo/ as in book. Have your child echo the word.',
)

const OW_COW: GraphemeHint = readingHint(
  'ow',
  'Brown cow',
  'Point to o and w together. Say /ow/ as in cow. Have your child echo the word.',
)

/** Level-aware hint (disambiguates the second oo and second ow). */
export function hintFor(level: number, grapheme: string): GraphemeHint {
  if (grapheme === 'oo' && level === 31) return OO_SHORT
  if (grapheme === 'ow' && level === 48) return OW_COW
  const hint = GRAPHEME_HINTS[grapheme]
  if (!hint) {
    return readingHint(grapheme, grapheme, `Point to ${grapheme}. Say the sound. Blend the word.`)
  }
  return hint
}

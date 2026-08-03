export type PopoverHint = {
  mnemonic: string
  parentInstruction: string
  audioLabel: string
}

export type ChildWord = {
  text: string
  targetGrapheme?: string
  popover?: PopoverHint
}

export type StoryBlock =
  | { type: 'parent'; text: string }
  | {
      type: 'child'
      childWords: ChildWord[]
      childReadType?: 'speech' | 'narration'
    }

export type StoryPage = {
  id: string
  parentText: string
  childWords: ChildWord[]
  childReadType?: 'speech' | 'narration'
  flow?: StoryBlock[]
}

export type StoryLevel = {
  /** Global ladder index (1–56). */
  level: number
  title: string
  knownGraphemes: string[]
  targetGraphemes: string[]
  pages: StoryPage[]
}

export type StoryPack = {
  id: string
  title: string
  /** Shipped level variants (sparse OK; keep global `level` indices stable). */
  levels: StoryLevel[]
}

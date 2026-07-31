import type { StoryBlock, StoryPage } from '../types/story'
import { WordWithPopover } from './WordWithPopover'

type Props = {
  page: StoryPage
  animationDirection: 'prev' | 'next'
}

export function BuddyReader({ page, animationDirection }: Props) {
  const blocks: StoryBlock[] = page.flow ?? [
    { type: 'parent', text: page.parentText },
    {
      type: 'child',
      childWords: page.childWords,
      childReadType: page.childReadType,
    },
  ]

  return (
    <div className="buddy">
      <section
        className={`reading-flow page-enter-${animationDirection}`}
        aria-label="Story"
      >
        {blocks.map((block, blockIndex) => {
          if (block.type === 'parent') {
            return (
              <p className="parent-text" key={`${page.id}-parent-${blockIndex}`}>
                {block.text}
              </p>
            )
          }

          return (
            <div
              className={
                block.childReadType === 'narration'
                  ? 'reading-card'
                  : 'speech-bubble'
              }
              aria-label="Child reading line"
              key={`${page.id}-child-${blockIndex}`}
            >
              <p className="child-words">
                {block.childWords.map((word, wordIndex) => (
                  <WordWithPopover
                    key={`${page.id}-${blockIndex}-${wordIndex}-${word.text}`}
                    word={word}
                  />
                ))}
              </p>
            </div>
          )
        })}
      </section>
    </div>
  )
}

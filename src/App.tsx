import { useState, type CSSProperties } from 'react'
import { BuddyReader } from './components/BuddyReader'
import { LevelNav } from './components/LevelNav'
import { TOTAL_LEVELS } from './data/level-ladder'
import { theRainDay } from './data/stories/the-rain-day'
import './styles/app.css'

const confettiPieces = Array.from({ length: 180 }, (_, index) => ({
  left: `${(index * 37) % 101}%`,
  top: `${-20 + (index % 12) * 4}%`,
  delay: `-${(index % 24) * 0.16}s`,
  duration: `${4.2 + (index % 8) * 0.18}s`,
  rotate: `${(index * 47) % 360}deg`,
  drift: `${((index * 29) % 160) - 80}px`,
  color: ['#f05d5e', '#f6c445', '#56c596', '#5aa9e6', '#b57edc'][index % 5],
}))

function Confetti({ burst }: { burst: number }) {
  return (
    <div className="confetti" key={burst} aria-hidden="true">
      {confettiPieces.map((piece, index) => (
        <span
          className="confetti-piece"
          key={`${burst}-${index}`}
          style={
            {
              left: piece.left,
              top: piece.top,
              animationDelay: piece.delay,
              animationDuration: piece.duration,
              '--confetti-color': piece.color,
              '--confetti-rotate': piece.rotate,
              '--confetti-drift': piece.drift,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}

export default function App() {
  const [levelIndex, setLevelIndex] = useState(0)
  const [pageIndex, setPageIndex] = useState(0)
  const [pageTransition, setPageTransition] = useState<'prev' | 'next'>('next')
  const [pageTransitionKey, setPageTransitionKey] = useState(0)
  const [completionBurst, setCompletionBurst] = useState(0)

  const level = theRainDay.levels[levelIndex]
  const page = level.pages[pageIndex]

  const turnPage = (direction: 'prev' | 'next') => {
    const nextIndex =
      direction === 'prev'
        ? Math.max(0, pageIndex - 1)
        : Math.min(level.pages.length - 1, pageIndex + 1)
    if (nextIndex === pageIndex) return
    setCompletionBurst(0)
    setPageTransition(direction)
    setPageTransitionKey((key) => key + 1)
    setPageIndex(nextIndex)
  }

  return (
    <div className="app">
      <header className="brand-bar">
        <h1 className="brand">Co-Read Spotlight</h1>
        <span className="level-chip">
          Level {level.level} / {TOTAL_LEVELS} · {theRainDay.title}
        </span>
      </header>
      <BuddyReader
        key={pageTransitionKey}
        page={page}
        animationDirection={pageTransition}
      />
      <LevelNav
        pageIndex={pageIndex}
        pageCount={level.pages.length}
        levelIndex={levelIndex}
        levelCount={theRainDay.levels.length}
        onPrevPage={() => turnPage('prev')}
        onNextPage={() => turnPage('next')}
        onComplete={() => setCompletionBurst((burst) => burst + 1)}
        onLevelChange={(next) => {
          if (next === levelIndex) return
          setCompletionBurst(0)
          setLevelIndex(next)
          setPageIndex(0)
        }}
      />
      {completionBurst > 0 && <Confetti burst={completionBurst} />}
    </div>
  )
}

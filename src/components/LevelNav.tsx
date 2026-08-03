import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from 'react'

type Props = {
  pageIndex: number
  pageCount: number
  levelIndex: number
  levelCount: number
  onPrevPage: () => void
  onNextPage: () => void
  onComplete: () => void
  onLevelChange: (levelIndex: number) => void
}

export function LevelNav({
  pageIndex,
  pageCount,
  levelIndex,
  levelCount,
  onPrevPage,
  onNextPage,
  onComplete,
  onLevelChange,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [horizontal, setHorizontal] = useState(false)
  const max = Math.max(0, levelCount - 1)
  const fill = max === 0 ? 0 : levelIndex / max

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 699px)')
    const sync = () => setHorizontal(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const levelFromPointer = (clientX: number, clientY: number) => {
    const rect = trackRef.current!.getBoundingClientRect()
    const horizontal = rect.width >= rect.height
    const t = horizontal
      ? (clientX - rect.left) / rect.width
      : 1 - (clientY - rect.top) / rect.height
    return Math.round(Math.min(max, Math.max(0, t * max)))
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    onLevelChange(levelFromPointer(e.clientX, e.clientY))
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return
    onLevelChange(levelFromPointer(e.clientX, e.clientY))
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
      e.preventDefault()
      onLevelChange(Math.min(max, levelIndex + 1))
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
      e.preventDefault()
      onLevelChange(Math.max(0, levelIndex - 1))
    } else if (e.key === 'Home') {
      e.preventDefault()
      onLevelChange(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      onLevelChange(max)
    }
  }

  const fillStyle = { '--level-fill': `${fill * 100}%` } as CSSProperties

  return (
    <div className="controls-bar">
      <div
        className="level-slider"
        role="slider"
        tabIndex={0}
        aria-label="Reading level"
        aria-valuemin={1}
        aria-valuemax={levelCount}
        aria-valuenow={levelIndex + 1}
        aria-valuetext={`Level ${levelIndex + 1} of ${levelCount}`}
        aria-orientation={horizontal ? 'horizontal' : 'vertical'}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onKeyDown={onKeyDown}
        style={fillStyle}
      >
        <div className="level-tube" ref={trackRef}>
          <div className="level-liquid" />
          <div className="level-thumb" aria-hidden="true">
            {levelIndex + 1}
          </div>
        </div>
      </div>

      <nav className="page-nav" aria-label="Page navigation">
        <button
          type="button"
          className="nav-btn"
          onClick={onPrevPage}
          disabled={pageIndex === 0}
          aria-label="Previous page"
          title="Previous page"
        >
          <span aria-hidden="true">←</span>
        </button>
        <span className="page-indicator">
          {pageIndex + 1} / {pageCount}
        </span>
        {pageIndex >= pageCount - 1 ? (
          <button
            type="button"
            className="nav-btn complete-btn"
            onClick={onComplete}
            aria-label="Completed"
            title="Completed"
          >
            <span aria-hidden="true">✓</span>
          </button>
        ) : (
          <button
            type="button"
            className="nav-btn"
            onClick={onNextPage}
            aria-label="Next page"
            title="Next page"
          >
            <span aria-hidden="true">→</span>
          </button>
        )}
      </nav>
    </div>
  )
}

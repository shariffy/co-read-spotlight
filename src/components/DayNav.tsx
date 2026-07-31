type Props = {
  pageIndex: number
  pageCount: number
  dayIndex: number
  dayCount: number
  onPrevPage: () => void
  onNextPage: () => void
  onComplete: () => void
  onPrevDay: () => void
  onNextDay: () => void
}

export function DayNav({
  pageIndex,
  pageCount,
  dayIndex,
  dayCount,
  onPrevPage,
  onNextPage,
  onComplete,
  onPrevDay,
  onNextDay,
}: Props) {
  return (
    <nav className="nav" aria-label="Story navigation">
      <div className="nav-group page-nav">
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
      </div>
      <div className="nav-group day-nav">
        <button
          type="button"
          className="nav-btn"
          onClick={onPrevDay}
          disabled={dayIndex === 0}
        >
          Earlier day
        </button>
        <button
          type="button"
          className="nav-btn primary"
          onClick={onNextDay}
          disabled={dayIndex >= dayCount - 1}
        >
          Next Day
        </button>
      </div>
    </nav>
  )
}

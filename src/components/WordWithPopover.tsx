import { useEffect, useId, useRef, useState } from 'react'
import type { ChildWord } from '../types/story'

const AUTO_DISMISS_MS = 10_000

type Props = {
  word: ChildWord
}

export function WordWithPopover({ word }: Props) {
  const [open, setOpen] = useState(false)
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const hasPopover = Boolean(word.targetGrapheme && word.popover)

  useEffect(() => {
    if (!open) return
    const id = window.setTimeout(() => setOpen(false), AUTO_DISMISS_MS)
    closeRef.current?.focus()
    return () => window.clearTimeout(id)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!hasPopover || !word.popover) {
    return <span>{word.text}</span>
  }

  const { mnemonic, parentInstruction, audioLabel } = word.popover

  return (
    <span className="word-wrap">
      <span className="word-target">{word.text}</span>
      <button
        type="button"
        className="info-badge"
        aria-label={`Help with ${word.text.replace(/[^a-zA-Z]/g, '')}`}
        onClick={() => setOpen(true)}
      >
        ℹ
      </button>
      {open && (
        <div
          className="overlay-backdrop"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <div
            className="overlay-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              className="overlay-close"
              aria-label="Close"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
            <p className="overlay-eyebrow">New sound · {word.targetGrapheme}</p>
            <h2 id={titleId} className="overlay-word">
              {word.text.replace(/[^a-zA-Z]/g, '')}
            </h2>
            <p className="overlay-mnemonic">{mnemonic}</p>
            <p className="overlay-instruction">
              <strong>For parents: </strong>
              {parentInstruction}
            </p>
            {/* ponytail: mock audio until V3 TTS */}
            <button type="button" className="audio-btn" onClick={() => undefined}>
              ▶ {audioLabel}
            </button>
          </div>
        </div>
      )}
    </span>
  )
}

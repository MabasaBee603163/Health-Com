type Props = {
  disabled?: boolean
  onYes: () => void
  onRepeat: () => void
  onClarify: () => void
}

export function ConfirmStrip({ disabled, onYes, onRepeat, onClarify }: Props) {
  return (
    <div className="confirm-row" role="group" aria-label="Confirm understanding">
      <button type="button" className="btn btn-primary" disabled={disabled} onClick={onYes}>
        Yes — I understand
      </button>
      <button type="button" className="btn btn-secondary" disabled={disabled} onClick={onRepeat}>
        Repeat
      </button>
      <button type="button" className="btn btn-secondary" disabled={disabled} onClick={onClarify}>
        Clarify
      </button>
    </div>
  )
}

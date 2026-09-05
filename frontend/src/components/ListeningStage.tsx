type Props = {
  status: "listening" | "translating" | "playing"
  turn: "doctor" | "patient"
  transcript?: string
  busy?: boolean
  onMic: () => void
  onDismiss: () => void
}

const STATUS_COPY: Record<Props["status"], string> = {
  listening: "I'm listening",
  translating: "Translating…",
  playing: "Playing translation…",
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

function IconMic() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3z" />
      <path d="M19 11a7 7 0 0 1-14 0" />
      <path d="M12 18v3" />
    </svg>
  )
}

function IconPerson() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 19.5c1.8-3.2 4-4.5 6.5-4.5s4.7 1.3 6.5 4.5" />
    </svg>
  )
}

export function ListeningStage({
  status,
  turn,
  transcript,
  busy,
  onMic,
  onDismiss,
}: Props) {
  const live = status === "listening"

  return (
    <div className="listening-stage" role="status" aria-live="polite">
      <div className="listening-center">
        <p className="listening-role">{turn === "doctor" ? "Doctor" : "Patient"}</p>
        <h2 className="listening-status">{STATUS_COPY[status]}</h2>
        {transcript ? <p className="listening-snippet thin-scroll">{transcript}</p> : null}
      </div>

      <div className="float-bar" role="toolbar" aria-label="Voice controls">
        <button
          type="button"
          className="float-btn"
          aria-label="Return to consultation"
          onClick={onDismiss}
          disabled={busy && live}
        >
          <IconClose />
        </button>
        <button type="button" className="float-btn" aria-label={`Current speaker: ${turn}`} disabled>
          <IconPerson />
        </button>
        <button
          type="button"
          className={`float-mic${live ? " is-live" : ""}`}
          aria-label={live ? "Listening" : "Microphone"}
          aria-pressed={live}
          onClick={onMic}
          disabled={busy || live}
        >
          <IconMic />
        </button>
        <button type="button" className="float-btn" aria-label="Settings" disabled>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 3v2.2M12 18.8V21M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M3 12h2.2M18.8 12H21M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" />
          </svg>
        </button>
      </div>
    </div>
  )
}

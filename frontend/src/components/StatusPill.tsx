import type { SessionStatus } from "../services/types"

const LABELS: Record<SessionStatus, string> = {
  idle: "Ready",
  connecting: "Connecting",
  listening: "Listening",
  translating: "Translating",
  playing: "Playing audio",
  awaiting_confirm: "Waiting for confirmation",
  error: "Something went wrong",
  offline: "Connection lost",
}

export function StatusPill({ status }: { status: SessionStatus }) {
  return (
    <div className="status-pill" data-state={status} role="status" aria-live="polite">
      <span className="dot" aria-hidden="true" />
      <span>{LABELS[status]}</span>
    </div>
  )
}

import type { ConversationStatus } from '../types'
import './MicIsland.css'

type Props = {
  status: ConversationStatus
  onMic: () => void
  onEnd: () => void
}

export function MicIsland({ status, onMic, onEnd }: Props) {
  const listening = status === 'listening'
  const busy = status === 'translating' || status === 'playing'

  return (
    <div className="mic-island" role="toolbar" aria-label="Conversation controls">
      <button
        type="button"
        className="mic-island__side"
        onClick={onEnd}
        aria-label="End conversation"
        title="End"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            fill="currentColor"
            d="M18.3 5.7a1 1 0 0 0-1.4 0L12 10.6 7.1 5.7a1 1 0 0 0-1.4 1.4L10.6 12l-4.9 4.9a1 1 0 1 0 1.4 1.4L12 13.4l4.9 4.9a1 1 0 0 0 1.4-1.4L13.4 12l4.9-4.9a1 1 0 0 0 0-1.4Z"
          />
        </svg>
      </button>

      <button
        type="button"
        className={`mic-island__mic ${listening ? 'is-listening' : ''} ${busy ? 'is-busy' : ''}`}
        onClick={onMic}
        disabled={busy}
        aria-label={listening ? 'Listening' : 'Start listening'}
        title="Speak"
      >
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Zm5-3a1 1 0 1 0-2 0 3 3 0 0 1-6 0 1 1 0 1 0-2 0 5 5 0 0 0 4 4.9V19H9a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-2v-3.1A5 5 0 0 0 17 11Z"
          />
        </svg>
      </button>

      <div className="mic-island__spacer" aria-hidden="true" />
    </div>
  )
}

import type { Message, MessageFlag } from '../types'
import './MessageActions.css'

type Props = {
  message: Message
  onReplay: (message: Message) => void
  onFlag: (id: string, flag: MessageFlag) => void
}

export function MessageActions({ message, onReplay, onFlag }: Props) {
  return (
    <div className="msg-actions" role="group" aria-label="Message actions">
      <button
        type="button"
        className="msg-actions__btn"
        onClick={() => onReplay(message)}
        title="Say again"
        aria-label="Say again"
      >
        <IconSpeaker />
      </button>
      <button
        type="button"
        className={`msg-actions__btn ${message.flag === 'clarify' ? 'is-on' : ''}`}
        onClick={() => onFlag(message.id, 'clarify')}
        title="Clarify"
        aria-label="Clarify"
      >
        <IconClarify />
      </button>
      <button
        type="button"
        className={`msg-actions__btn ${message.flag === 'dont_understand' ? 'is-on danger' : ''}`}
        onClick={() => onFlag(message.id, 'dont_understand')}
        title="I don't understand"
        aria-label="I don't understand"
      >
        <IconConfused />
      </button>
      <button
        type="button"
        className={`msg-actions__btn ${message.flag === 'understand' ? 'is-on ok' : ''}`}
        onClick={() => onFlag(message.id, 'understand')}
        title="I understand"
        aria-label="I understand"
      >
        <IconCheck />
      </button>
    </div>
  )
}

function IconSpeaker() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 10v4h3l4 3V7L7 10H4Zm11.5 2a3.5 3.5 0 0 0-1.8-3.1v6.2A3.5 3.5 0 0 0 15.5 12Zm0-7.2v2.1a5.5 5.5 0 0 1 0 10.2v2.1a7.5 7.5 0 0 0 0-14.4Z"
      />
    </svg>
  )
}

function IconClarify() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9Zm0 14a1.25 1.25 0 1 1 1.25-1.25A1.25 1.25 0 0 1 12 17Zm1.4-4.55-.35.2a1 1 0 0 0-.55.9v.2h-1.1v-.3a2 2 0 0 1 1.1-1.8l.5-.28a1.3 1.3 0 1 0-2-1.1H9.8a2.4 2.4 0 1 1 3.6 2.18Z"
      />
    </svg>
  )
}

function IconConfused() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 17a1.25 1.25 0 1 1 1.25-1.25A1.25 1.25 0 0 1 12 19Zm1.5-5.1A2.8 2.8 0 0 0 12 11.4a1 1 0 0 1-1-1.15A2.2 2.2 0 0 1 13.3 8.2 2.5 2.5 0 0 1 16 10.6a3.8 3.8 0 0 1-1.3 2.9 1.2 1.2 0 0 0-.45.9V15h-1.2v-.5a2.4 2.4 0 0 1 .95-1.9Z"
      />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M9.6 16.6 5.4 12.4l1.4-1.4 2.8 2.8 7-7 1.4 1.4-8.4 8.4Z"
      />
    </svg>
  )
}

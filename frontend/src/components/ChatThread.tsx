import { useEffect, useRef } from 'react'
import type { Message, MessageFlag } from '../types'
import { MessageBubble } from './MessageBubble'
import './ChatThread.css'

type Props = {
  messages: Message[]
  onReplay: (message: Message) => void
  onFlag: (id: string, flag: MessageFlag) => void
}

export function ChatThread({ messages, onReplay, onFlag }: Props) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages.length])

  return (
    <div className="chat-thread" role="log" aria-live="polite">
      {messages.length === 0 ? (
        <div className="chat-thread__empty">
          <p>Tap the mic when someone is ready to speak.</p>
          <p className="chat-thread__hint">English ↔ Setswana · turns alternate automatically</p>
        </div>
      ) : (
        <>
          <div className="chat-thread__day">
            <span>Today</span>
          </div>
          {messages.map((m) => (
            <MessageBubble
              key={m.id}
              message={m}
              onReplay={onReplay}
              onFlag={onFlag}
            />
          ))}
        </>
      )}
      <div ref={endRef} />
    </div>
  )
}

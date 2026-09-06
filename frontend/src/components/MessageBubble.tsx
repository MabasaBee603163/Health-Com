import { LANG_LABEL } from '../types'
import type { Message, MessageFlag } from '../types'
import { MessageActions } from './MessageActions'
import './MessageBubble.css'

type Props = {
  message: Message
  onReplay: (message: Message) => void
  onFlag: (id: string, flag: MessageFlag) => void
}

export function MessageBubble({ message, onReplay, onFlag }: Props) {
  const side = message.speaker === 'a' ? 'right' : 'left'
  const time = new Date(message.at).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <article className={`msg-row msg-row--${side}`}>
      <div className={`msg-bubble msg-bubble--${side}`}>
        <p className="msg-bubble__text">{message.translatedText}</p>
        <div className="msg-bubble__meta">
          <span>
            {LANG_LABEL[message.sourceLang]} → {LANG_LABEL[message.targetLang]}
          </span>
          <time dateTime={new Date(message.at).toISOString()}>{time}</time>
        </div>
      </div>
      <p className="msg-source">{message.sourceText}</p>
      <MessageActions message={message} onReplay={onReplay} onFlag={onFlag} />
    </article>
  )
}

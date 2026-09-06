import { LANG_LABEL } from '../types'
import type { Message } from '../types'
import './SummaryPage.css'

type Props = {
  messages: Message[]
  onRestart: () => void
}

const FLAG_LABEL = {
  clarify: 'Clarify',
  dont_understand: "Didn't understand",
  understand: 'Understood',
} as const

export function SummaryPage({ messages, onRestart }: Props) {
  const started = messages[0]
    ? new Date(messages[0].at).toLocaleString([], {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'No exchanges yet'

  return (
    <main className="screen summary">
      <header className="summary__header">
        <p className="summary__eyebrow">Conversation summary</p>
        <h1 className="summary__title">HealthCom</h1>
        <p className="summary__meta">{started}</p>
      </header>

      <div className="summary__list">
        {messages.length === 0 ? (
          <p className="summary__empty">No messages in this session.</p>
        ) : (
          messages.map((m, i) => (
            <article key={m.id} className="summary__item">
              <div className="summary__item-top">
                <span className="summary__index">{i + 1}</span>
                <span className="summary__langs">
                  {LANG_LABEL[m.sourceLang]} → {LANG_LABEL[m.targetLang]}
                </span>
                {m.flag ? (
                  <span className={`summary__flag flag-${m.flag}`}>
                    {FLAG_LABEL[m.flag]}
                  </span>
                ) : null}
              </div>
              <p className="summary__translated">{m.translatedText}</p>
              <p className="summary__source">{m.sourceText}</p>
            </article>
          ))
        )}
      </div>

      <footer className="summary__footer">
        <button type="button" className="summary__cta" onClick={onRestart}>
          New conversation
        </button>
      </footer>
    </main>
  )
}

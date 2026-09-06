import type { ConversationStatus } from '../types'
import './ListeningStage.css'

type Props = {
  status: ConversationStatus
  turnLabel: string
}

export function ListeningStage({ status, turnLabel }: Props) {
  if (status !== 'listening' && status !== 'translating') return null

  const copy =
    status === 'listening' ? "I'm listening" : 'Translating…'

  return (
    <div className="listening-stage" aria-live="polite">
      <p className="listening-stage__turn">{turnLabel}</p>
      <h2 className="listening-stage__title">{copy}</h2>
      <div className={`listening-stage__orb ${status === 'listening' ? 'is-live' : ''}`} />
    </div>
  )
}

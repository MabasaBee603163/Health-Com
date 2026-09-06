import { LANG_LABEL, langForSpeaker, type ConversationStatus, type Speaker } from '../types'
import './TurnCue.css'

type Props = {
  speaker: Speaker
  status: ConversationStatus
}

export function TurnCue({ speaker, status }: Props) {
  if (status !== 'idle' && status !== 'playing') return null

  const lang = LANG_LABEL[langForSpeaker(speaker)]
  const copy =
    status === 'playing' ? 'Playing translation…' : `Your turn · ${lang}`

  return (
    <div className="turn-cue" aria-live="polite">
      <span className={`turn-cue__dot speaker-${speaker}`} />
      <span>{copy}</span>
    </div>
  )
}

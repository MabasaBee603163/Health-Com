import { ChatThread } from '../components/ChatThread'
import { ListeningStage } from '../components/ListeningStage'
import { MicIsland } from '../components/MicIsland'
import { TurnCue } from '../components/TurnCue'
import type { useConversationDemo } from '../hooks/useConversationDemo'
import './ConversationPage.css'

type Demo = ReturnType<typeof useConversationDemo>

type Props = {
  demo: Demo
  onEnd: () => void
}

export function ConversationPage({ demo, onEnd }: Props) {
  const {
    messages,
    status,
    currentSpeaker,
    turnLabel,
    startListening,
    replay,
    setFlag,
  } = demo

  return (
    <main className="screen conversation">
      <header className="conversation__header">
        <TurnCue speaker={currentSpeaker} status={status} />
      </header>

      <div className="conversation__stage">
        <ChatThread messages={messages} onReplay={replay} onFlag={setFlag} />
        <ListeningStage status={status} turnLabel={turnLabel} />
      </div>

      <footer className="conversation__footer">
        <MicIsland status={status} onMic={startListening} onEnd={onEnd} />
      </footer>
    </main>
  )
}

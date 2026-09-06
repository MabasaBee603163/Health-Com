import { useState } from 'react'
import { useConversationDemo } from './hooks/useConversationDemo'
import { ConversationPage } from './pages/ConversationPage'
import { SummaryPage } from './pages/SummaryPage'
import { WelcomePage } from './pages/WelcomePage'
import type { Screen } from './types'

export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome')
  const demo = useConversationDemo()

  const start = () => {
    demo.reset()
    setScreen('conversation')
  }

  const end = () => {
    setScreen('summary')
  }

  const restart = () => {
    demo.reset()
    setScreen('welcome')
  }

  return (
    <div className="app-shell">
      {screen === 'welcome' ? <WelcomePage onStart={start} /> : null}
      {screen === 'conversation' ? (
        <ConversationPage demo={demo} onEnd={end} />
      ) : null}
      {screen === 'summary' ? (
        <SummaryPage messages={demo.messages} onRestart={restart} />
      ) : null}
    </div>
  )
}

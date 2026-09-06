import './WelcomePage.css'

type Props = {
  onStart: () => void
}

export function WelcomePage({ onStart }: Props) {
  return (
    <main className="screen welcome">
      <div className="welcome__atmosphere" aria-hidden="true" />
      <div className="welcome__content">
        <p className="welcome__mark">HealthCom</p>
        <h1 className="welcome__line">Speak. Hear. Understand.</h1>
        <p className="welcome__sub">
          Voice translation between two people — English and Setswana.
        </p>
        <button type="button" className="welcome__cta" onClick={onStart}>
          Start conversation
        </button>
      </div>
    </main>
  )
}

import type { ReactNode } from "react"
import { LANG_LABELS, type LangCode } from "../services/types"

type Props = {
  role: "doctor" | "patient"
  language: LangCode
  title: string
  message: string
  hint: string
  children?: ReactNode
}

export function RolePane({ role, language, title, message, hint, children }: Props) {
  return (
    <section className={`pane ${role}`} aria-label={`${title} pane`}>
      <header className="pane-header">
        <div>
          <p className="pane-label">{title}</p>
          <h2 className="lang-chip">{LANG_LABELS[language]}</h2>
        </div>
      </header>
      <div className="message-stage">
        <p>{message}</p>
        <p className="hint">{hint}</p>
      </div>
      {children}
    </section>
  )
}

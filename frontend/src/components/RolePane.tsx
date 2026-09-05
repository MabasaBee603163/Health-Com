import { useEffect, useRef, type ReactNode } from "react"
import { LANG_LABELS, type LangCode } from "../services/types"

type Props = {
  role: "doctor" | "patient"
  language: LangCode
  title: string
  message: string
  hint: string
  active?: boolean
  dimmed?: boolean
  children?: ReactNode
}

export function RolePane({
  role,
  language,
  title,
  message,
  hint,
  active = false,
  dimmed = false,
  children,
}: Props) {
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    stage.scrollTo({ top: stage.scrollHeight, behavior: "smooth" })
  }, [message, hint])

  const className = [
    "pane",
    role,
    active ? "is-active" : "",
    dimmed ? "is-dimmed" : "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <section
      className={className}
      aria-label={`${title} pane`}
      aria-busy={active || undefined}
      data-active={active || undefined}
    >
      <header className="pane-header">
        <div>
          <p className="pane-label">{title}</p>
          <h2 className="lang-chip">{LANG_LABELS[language]}</h2>
        </div>
      </header>
      <div ref={stageRef} className="message-stage thin-scroll">
        <p className="message-text">{message}</p>
        <p className="hint">{hint}</p>
      </div>
      {children ? <div className="pane-actions">{children}</div> : null}
    </section>
  )
}

import type { ReactNode } from "react"

/** Viewport-locked application frame. Document scroll is disabled; panes fit available space. */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell" role="application" aria-label="HealthCom">
      {children}
    </div>
  )
}

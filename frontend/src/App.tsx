import { AppShell } from "./layouts/AppShell"
import { ConsultationPage } from "./pages/ConsultationPage"
import "./styles/global.css"

export default function App() {
  return (
    <AppShell>
      <ConsultationPage />
    </AppShell>
  )
}

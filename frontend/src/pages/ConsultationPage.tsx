import { useEffect, useMemo, useState } from "react"
import { ConfirmStrip } from "../components/ConfirmStrip"
import { RolePane } from "../components/RolePane"
import { StatusPill } from "../components/StatusPill"
import { useSessionSocket } from "../hooks/useSessionSocket"
import { createSession, fetchPatients, mockListen, translateText } from "../services/api"
import { LANG_LABELS, type LangCode, type Patient } from "../services/types"

const LANGS: LangCode[] = ["en", "tn", "zu", "ts"]

const FALLBACK_PATIENTS: Patient[] = [
  { id: "p1", name: "Thabo Molefe", preferredLang: "tn" },
  { id: "p2", name: "Nomsa Dlamini", preferredLang: "zu" },
  { id: "p3", name: "Akani Mabasa", preferredLang: "ts" },
]

function speak(text: string, lang: LangCode) {
  if (!("speechSynthesis" in window)) return
  const utter = new SpeechSynthesisUtterance(text)
  const map: Record<LangCode, string> = { en: "en-ZA", tn: "tn-ZA", zu: "zu-ZA", ts: "en-ZA" }
  utter.lang = map[lang]
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utter)
}

export function ConsultationPage() {
  const [step, setStep] = useState<"patient" | "languages" | "consult">("patient")
  const [patients, setPatients] = useState<Patient[]>(FALLBACK_PATIENTS)
  const [patient, setPatient] = useState<Patient | null>(null)
  const [doctorLang, setDoctorLang] = useState<LangCode>("en")
  const [patientLang, setPatientLang] = useState<LangCode>("tn")
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [doctorText, setDoctorText] = useState("Tap Speak to begin.")
  const [patientText, setPatientText] = useState("Waiting for the doctor.")
  const [doctorHint, setDoctorHint] = useState("Your words appear here.")
  const [patientHint, setPatientHint] = useState("Translation appears here.")
  const [busy, setBusy] = useState(false)
  const [turn, setTurn] = useState<"doctor" | "patient">("doctor")

  const { status, setStatus, connected, emit } = useSessionSocket(sessionId)

  useEffect(() => {
    fetchPatients()
      .then(setPatients)
      .catch(() => setPatients(FALLBACK_PATIENTS))
  }, [])

  const statusForPill = useMemo(() => {
    if (sessionId && !connected && status !== "offline") return "connecting"
    return status
  }, [connected, sessionId, status])

  async function startConsult() {
    if (!patient) return
    setBusy(true)
    try {
      const session = await createSession({
        patientId: patient.id,
        doctorLang,
        patientLang,
      })
      setSessionId(session.id)
      setStep("consult")
      setStatus("idle")
      setDoctorText("Ready when you are.")
      setPatientText("The doctor will speak first.")
    } catch {
      // Offline-friendly demo path
      setSessionId(`local-${Date.now()}`)
      setStep("consult")
      setStatus("idle")
    } finally {
      setBusy(false)
    }
  }

  async function runDoctorSpeak() {
    setBusy(true)
    setTurn("doctor")
    setStatus("listening")
    setDoctorHint("Listening…")
    emit("utterance:start", { speaker: "doctor" })
    try {
      const heard = await mockListen("doctor").catch(() => ({
        text: "I need to explain the risks of this procedure before you decide.",
      }))
      setDoctorText(heard.text)
      setStatus("translating")
      setPatientHint("Translating…")
      emit("utterance:final", { text: heard.text })

      const translated = await translateText({
        text: heard.text,
        sourceLang: doctorLang,
        targetLang: patientLang,
      }).catch(() => ({
        translatedText: `[${LANG_LABELS[patientLang]}] ${heard.text}`,
      }))

      setPatientText(translated.translatedText)
      setStatus("playing")
      speak(translated.translatedText, patientLang)
      setPatientHint("Listen, then confirm below.")
      setStatus("awaiting_confirm")
      emit("translation:ready", { translatedText: translated.translatedText })
    } catch {
      setStatus("error")
      setPatientHint("Translation failed. Try again.")
    } finally {
      setBusy(false)
    }
  }

  async function runPatientRespond() {
    setBusy(true)
    setTurn("patient")
    setStatus("listening")
    setPatientHint("Listening…")
    try {
      const heard = await mockListen("patient").catch(() => ({
        text: "I don’t understand. Can you explain that again more simply?",
      }))
      setPatientText(heard.text)
      setStatus("translating")
      const translated = await translateText({
        text: heard.text,
        sourceLang: patientLang,
        targetLang: doctorLang,
      }).catch(() => ({
        translatedText: `[${LANG_LABELS[doctorLang]}] ${heard.text}`,
      }))
      setDoctorText(translated.translatedText)
      setDoctorHint("Patient reply translated.")
      setStatus("playing")
      speak(translated.translatedText, doctorLang)
      setStatus("idle")
      setTurn("doctor")
    } catch {
      setStatus("error")
    } finally {
      setBusy(false)
    }
  }

  function onYes() {
    emit("comprehension:yes")
    setStatus("idle")
    setPatientHint("Understood. You can respond if needed.")
  }

  function onRepeat() {
    emit("comprehension:repeat")
    setStatus("playing")
    speak(patientText, patientLang)
    setStatus("awaiting_confirm")
  }

  function onClarify() {
    emit("comprehension:clarify")
    setDoctorHint("Patient asked for a simpler explanation. Speak again.")
    setStatus("idle")
    setTurn("doctor")
  }

  if (step === "patient") {
    return (
      <div className="setup-card">
        <h1 className="brand">HealthCom</h1>
        <p>Select the patient for this consultation.</p>
        <div className="patient-grid">
          {patients.map((p) => (
            <button
              key={p.id}
              type="button"
              className="patient-card"
              aria-pressed={patient?.id === p.id}
              onClick={() => setPatient(p)}
            >
              <strong>{p.name}</strong>
              <div>{LANG_LABELS[p.preferredLang]}</div>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="btn btn-primary"
          disabled={!patient}
          onClick={() => {
            if (patient) setPatientLang(patient.preferredLang)
            setStep("languages")
          }}
        >
          Continue
        </button>
      </div>
    )
  }

  if (step === "languages") {
    return (
      <div className="setup-card">
        <h1 className="brand">Languages</h1>
        <p>One shared tablet. Choose what each side speaks.</p>
        <label className="field">
          Doctor language
          <select value={doctorLang} onChange={(e) => setDoctorLang(e.target.value as LangCode)}>
            {LANGS.map((l) => (
              <option key={l} value={l}>{LANG_LABELS[l]}</option>
            ))}
          </select>
        </label>
        <label className="field">
          Patient language
          <select value={patientLang} onChange={(e) => setPatientLang(e.target.value as LangCode)}>
            {LANGS.map((l) => (
              <option key={l} value={l}>{LANG_LABELS[l]}</option>
            ))}
          </select>
        </label>
        <div className="action-row">
          <button type="button" className="btn btn-secondary" onClick={() => setStep("patient")}>Back</button>
          <button type="button" className="btn btn-primary" disabled={busy} onClick={startConsult}>
            Start consultation
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="brand-bar">
        <h1 className="brand">HealthCom</h1>
        <StatusPill status={statusForPill} />
      </div>
      <div className="dual-pane">
        <RolePane
          role="doctor"
          language={doctorLang}
          title="Doctor"
          message={doctorText}
          hint={doctorHint}
        >
          <div className="action-row">
            <button
              type="button"
              className="btn btn-primary"
              disabled={busy || turn === "patient"}
              onClick={runDoctorSpeak}
            >
              Speak
            </button>
          </div>
        </RolePane>
        <RolePane
          role="patient"
          language={patientLang}
          title="Patient"
          message={patientText}
          hint={patientHint}
        >
          <ConfirmStrip
            disabled={busy || status !== "awaiting_confirm"}
            onYes={onYes}
            onRepeat={onRepeat}
            onClarify={onClarify}
          />
          <div className="action-row">
            <button
              type="button"
              className="btn btn-secondary"
              disabled={busy}
              onClick={runPatientRespond}
            >
              Respond
            </button>
          </div>
        </RolePane>
      </div>
    </>
  )
}

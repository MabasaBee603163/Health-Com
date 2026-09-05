import { useEffect, useMemo, useState } from "react"
import { ConfirmStrip } from "../components/ConfirmStrip"
import { ListeningStage } from "../components/ListeningStage"
import { PatientAvatar } from "../components/PatientAvatar"
import { RolePane } from "../components/RolePane"
import { SegmentedControl } from "../components/SegmentedControl"
import { StatusPill } from "../components/StatusPill"
import { useSessionSocket } from "../hooks/useSessionSocket"
import { createSession, fetchPatients, mockListen, translateText } from "../services/api"
import { LANG_LABELS, type LangCode, type Patient } from "../services/types"

const LANGS: LangCode[] = ["en", "tn", "zu", "ts"]

const LANG_OPTIONS = LANGS.map((value) => ({
  value,
  label: LANG_LABELS[value],
}))

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

  const isListeningMode =
    status === "listening" || status === "translating" || status === "playing"

  const focusRole = useMemo<"doctor" | "patient" | null>(() => {
    if (status === "awaiting_confirm") return "patient"
    return null
  }, [status])

  const listeningTranscript = turn === "doctor" ? doctorText : patientText

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
    setDoctorText("")
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
    setPatientText("")
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

  function onListeningMic() {
    if (turn === "patient") void runPatientRespond()
    else void runDoctorSpeak()
  }

  function onListeningDismiss() {
    if (busy && status === "listening") return
    window.speechSynthesis?.cancel()
    setStatus("idle")
    setBusy(false)
  }

  if (step === "patient" || step === "languages") {
    return (
      <div className="setup-stage">
        <div className="setup-backdrop" aria-hidden="true" />
        <div className="setup-card" role="dialog" aria-modal="true" aria-labelledby="setup-title">
          {step === "patient" ? (
            <>
              <div className="setup-card-header">
                <h1 id="setup-title" className="brand">HealthCom</h1>
                <p>Select the patient for this consultation.</p>
              </div>
              <div className="setup-card-body">
                <div className="patient-list thin-scroll">
                  <div className="patient-grid">
                    {patients.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        className="patient-card"
                        aria-pressed={patient?.id === p.id}
                        onClick={() => setPatient(p)}
                      >
                        <PatientAvatar name={p.name} />
                        <strong>{p.name}</strong>
                        <span className="patient-lang">{LANG_LABELS[p.preferredLang]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="setup-actions">
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
            </>
          ) : (
            <>
              <div className="setup-card-header">
                <h1 id="setup-title" className="brand">Languages</h1>
                <p>One shared tablet. Choose what each side speaks.</p>
              </div>
              <div className="setup-card-body">
                <div className="lang-fields thin-scroll">
                  <SegmentedControl
                    label="Doctor language"
                    value={doctorLang}
                    options={LANG_OPTIONS}
                    onChange={setDoctorLang}
                  />
                  <SegmentedControl
                    label="Patient language"
                    value={patientLang}
                    options={LANG_OPTIONS}
                    onChange={setPatientLang}
                  />
                </div>
              </div>
              <div className="setup-actions action-row">
                <button type="button" className="btn btn-secondary" onClick={() => setStep("patient")}>
                  Back
                </button>
                <button type="button" className="btn btn-primary" disabled={busy} onClick={startConsult}>
                  Start consultation
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="consult-stage">
      <div className="brand-bar">
        <h1 className="brand">HealthCom</h1>
        <StatusPill status={statusForPill} />
      </div>

      {isListeningMode &&
      (status === "listening" || status === "translating" || status === "playing") ? (
        <ListeningStage
          status={status}
          turn={turn}
          transcript={listeningTranscript || undefined}
          busy={busy}
          onMic={onListeningMic}
          onDismiss={onListeningDismiss}
        />
      ) : (
        <div className="dual-pane">
          <RolePane
            role="doctor"
            language={doctorLang}
            title="Doctor"
            message={doctorText}
            hint={doctorHint}
            dimmed={focusRole === "patient"}
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
            dimmed={focusRole === "doctor"}
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
      )}
    </div>
  )
}

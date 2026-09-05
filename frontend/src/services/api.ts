import type { LangCode, Patient } from "./types"

const API = "/api"

export async function fetchPatients(): Promise<Patient[]> {
  const res = await fetch(`${API}/patients`)
  if (!res.ok) throw new Error("Could not load patients")
  return res.json()
}

export async function createSession(input: {
  patientId: string
  doctorLang: LangCode
  patientLang: LangCode
}): Promise<{ id: string }> {
  const res = await fetch(`${API}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error("Could not create session")
  return res.json()
}

export async function translateText(input: {
  text: string
  sourceLang: LangCode
  targetLang: LangCode
}): Promise<{ translatedText: string }> {
  const res = await fetch(`${API}/language/translate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error("Translation failed")
  return res.json()
}

export async function mockListen(speaker: "doctor" | "patient"): Promise<{ text: string }> {
  const res = await fetch(`${API}/language/mock-stt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ speaker }),
  })
  if (!res.ok) throw new Error("Could not capture speech")
  return res.json()
}

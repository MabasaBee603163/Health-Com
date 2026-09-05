import { Router } from "express"
import { randomUUID } from "node:crypto"
import { db } from "../db/index.js"
import { getLanguageProvider } from "../services/language/index.js"

export const router = Router()

router.get("/health", (_req, res) => {
  res.json({ ok: true, service: "healthcom-backend" })
})

router.get("/patients", (_req, res) => {
  res.json(db.listPatients())
})

router.post("/sessions", (req, res) => {
  const { patientId, doctorLang, patientLang } = req.body ?? {}
  if (!patientId || !doctorLang || !patientLang) {
    res.status(400).json({ error: "patientId, doctorLang, patientLang required" })
    return
  }
  const id = randomUUID()
  db.createSession({
    id,
    patientId,
    doctorLang,
    patientLang,
    createdAt: new Date().toISOString(),
  })
  res.status(201).json({ id, patientId, doctorLang, patientLang })
})

router.post("/language/translate", async (req, res) => {
  try {
    const { text, sourceLang, targetLang } = req.body ?? {}
    if (!text || !sourceLang || !targetLang) {
      res.status(400).json({ error: "text, sourceLang, targetLang required" })
      return
    }
    const provider = getLanguageProvider()
    const translatedText = await provider.translate({ text, sourceLang, targetLang })
    res.json({ translatedText, provider: provider.name })
  } catch (err) {
    res.status(500).json({ error: "Translation failed", detail: String(err) })
  }
})

router.post("/language/mock-stt", async (req, res) => {
  try {
    const speaker = req.body?.speaker ?? "doctor"
    const provider = getLanguageProvider()
    const text = await provider.mockStt(speaker)
    res.json({ text, provider: provider.name })
  } catch (err) {
    res.status(500).json({ error: "STT failed", detail: String(err) })
  }
})

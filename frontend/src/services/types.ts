export type LangCode = "en" | "tn" | "zu" | "ts"

export const LANG_LABELS: Record<LangCode, string> = {
  en: "English",
  tn: "Setswana",
  zu: "isiZulu",
  ts: "Xitsonga",
}

export type SessionStatus =
  | "idle"
  | "connecting"
  | "listening"
  | "translating"
  | "playing"
  | "awaiting_confirm"
  | "error"
  | "offline"

export type Patient = {
  id: string
  name: string
  preferredLang: LangCode
}

export type Utterance = {
  id: string
  speaker: "doctor" | "patient"
  sourceLang: LangCode
  targetLang: LangCode
  sourceText: string
  translatedText: string
}

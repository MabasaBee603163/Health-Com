const DOCTOR_SAMPLES = [
  "I need to explain the risks of this procedure before you decide.",
  "Take two tablets in the morning with food.",
  "Where is the pain, and when did it start?",
]

const PATIENT_SAMPLES = [
  "I don’t understand. Can you explain that again more simply?",
  "Please repeat the last instruction.",
  "The pain is sharp when I walk.",
]

const LABELS = { en: "English", tn: "Setswana", zu: "isiZulu", ts: "Xitsonga" }

const KNOWN = {
  "I need to explain the risks of this procedure before you decide.": {
    tn: "[Setswana] Ke tlhoka go go tlhalosetsa dikotsi tsa tiro eno pele o tsaya tshwetso.",
    zu: "[isiZulu] Ngidinga ukukuchazela ubungozi bale nqubo ngaphambi kokuba wenze isinqumo.",
    ts: "[Xitsonga] Ndzi fanele ndzi ku hlamusela khombo ra ntirho lowu ungasi teka xiboho.",
  },
  "Take two tablets in the morning with food.": {
    tn: "[Setswana] Nwa dipilisi di le pedi mo mosong o na le dijo.",
    zu: "[isiZulu] Thatha amaphilisi amabili ekuseni nokudla.",
    ts: "[Xitsonga] Teka tipilisi timbirhi na mixo na swakudya.",
  },
  "I don’t understand. Can you explain that again more simply?": {
    en: "I don’t understand. Can you explain that again more simply?",
    tn: "[Setswana] Ga ke tlhaloganye. A o ka tlhalosa gape ka mokgwa o bobebe?",
    zu: "[isiZulu] Angiqondi. Ungaphinda uchaze ngendlela elula?",
    ts: "[Xitsonga] A ndzi twisisi. U nga hlamusela nakambe hi ndlela yo olova?",
  },
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

export const mockProvider = {
  name: "mock",
  async translate({ text, sourceLang, targetLang }) {
    await delay(700)
    if (sourceLang === targetLang) return text
    const known = KNOWN[text]?.[targetLang]
    if (known) return known
    return `[${LABELS[targetLang]} ← ${LABELS[sourceLang]}] ${text}`
  },
  async mockStt(speaker) {
    await delay(900)
    const pool = speaker === "doctor" ? DOCTOR_SAMPLES : PATIENT_SAMPLES
    return pool[Math.floor(Math.random() * pool.length)]
  },
}

export function getLanguageProvider() {
  return mockProvider
}

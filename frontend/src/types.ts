export type LangCode = 'en' | 'tn'
export type Speaker = 'a' | 'b'
export type ConversationStatus =
  | 'idle'
  | 'listening'
  | 'translating'
  | 'playing'

export type MessageFlag = 'clarify' | 'dont_understand' | 'understand' | null

export type Message = {
  id: string
  speaker: Speaker
  sourceLang: LangCode
  targetLang: LangCode
  sourceText: string
  translatedText: string
  at: number
  flag: MessageFlag
}

export type Screen = 'welcome' | 'conversation' | 'summary'

export const LANG_LABEL: Record<LangCode, string> = {
  en: 'English',
  tn: 'Setswana',
}

export function otherSpeaker(speaker: Speaker): Speaker {
  return speaker === 'a' ? 'b' : 'a'
}

export function langForSpeaker(speaker: Speaker): LangCode {
  return speaker === 'a' ? 'en' : 'tn'
}

import type { LangCode } from '../types'

type PhrasePair = {
  en: string
  tn: string
}

/** Reliable pitch lines — medical-leaning but no PHI. */
const PAIRS: PhrasePair[] = [
  {
    en: 'Good morning. How are you feeling today?',
    tn: 'Dumela. O ikutlwa jang gompieno?',
  },
  {
    en: 'I have pain in my chest when I breathe.',
    tn: 'Ke na le bothoko mo sefubeng fa ke hemoga.',
  },
  {
    en: 'How long have you had this pain?',
    tn: 'O na le bothoko jo lobaka lo lo kae?',
  },
  {
    en: 'It started three days ago.',
    tn: 'Bo simolotse malatsi a mararo a fetileng.',
  },
  {
    en: 'I will listen to your chest now. Please sit still.',
    tn: 'Ke tla reetsa sefuba sa gago jaanong. Tsweetswee nna sentle.',
  },
  {
    en: 'Do you understand what I explained?',
    tn: 'A o tlhaloganya se ke se tlhalositseng?',
  },
  {
    en: 'Yes, I understand. Thank you.',
    tn: 'Ee, ke a tlhaloganya. Ke a leboga.',
  },
  {
    en: 'Please take this medicine twice a day after food.',
    tn: 'Tsweetswee nwa setlhare se gabedi ka letsatsi morago ga dijo.',
  },
]

export function nextMockUtterance(
  sourceLang: LangCode,
  index: number,
): { sourceText: string; translatedText: string } {
  const pair = PAIRS[index % PAIRS.length]
  if (sourceLang === 'en') {
    return { sourceText: pair.en, translatedText: pair.tn }
  }
  return { sourceText: pair.tn, translatedText: pair.en }
}

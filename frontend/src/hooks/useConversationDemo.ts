import { useCallback, useEffect, useRef, useState } from 'react'
import { nextMockUtterance } from '../data/mockPhrases'
import {
  LANG_LABEL,
  langForSpeaker,
  otherSpeaker,
  type ConversationStatus,
  type Message,
  type MessageFlag,
  type Speaker,
} from '../types'

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function speak(text: string, lang: 'en' | 'tn'): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setTimeout(resolve, 900)
      return
    }
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = lang === 'en' ? 'en-ZA' : 'en-ZA'
    utter.rate = 0.95
    utter.onend = () => resolve()
    utter.onerror = () => resolve()
    window.speechSynthesis.speak(utter)
  })
}

export function useConversationDemo() {
  const [messages, setMessages] = useState<Message[]>([])
  const [status, setStatus] = useState<ConversationStatus>('idle')
  const [currentSpeaker, setCurrentSpeaker] = useState<Speaker>('a')
  const phraseIndex = useRef(0)
  const cancelled = useRef(false)

  useEffect(() => {
    return () => {
      cancelled.current = true
      if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    }
  }, [])

  const reset = useCallback(() => {
    cancelled.current = true
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    setMessages([])
    setStatus('idle')
    setCurrentSpeaker('a')
    phraseIndex.current = 0
    cancelled.current = false
  }, [])

  const setFlag = useCallback((id: string, flag: MessageFlag) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, flag: m.flag === flag ? null : flag } : m)),
    )
  }, [])

  const replay = useCallback(async (message: Message) => {
    if (status === 'listening' || status === 'translating') return
    setStatus('playing')
    await speak(message.translatedText, message.targetLang)
    if (!cancelled.current) setStatus('idle')
  }, [status])

  const startListening = useCallback(async () => {
    if (status !== 'idle') return
    cancelled.current = false
    const speaker = currentSpeaker
    const sourceLang = langForSpeaker(speaker)
    const targetLang = langForSpeaker(otherSpeaker(speaker))

    setStatus('listening')
      await new Promise((r) => setTimeout(r, 1600))
    if (cancelled.current) return

    setStatus('translating')
    const { sourceText, translatedText } = nextMockUtterance(
      sourceLang,
      phraseIndex.current++,
    )
    await new Promise((r) => setTimeout(r, 700))
    if (cancelled.current) return

    const message: Message = {
      id: uid(),
      speaker,
      sourceLang,
      targetLang,
      sourceText,
      translatedText,
      at: Date.now(),
      flag: null,
    }
    setMessages((prev) => [...prev, message])
    setStatus('playing')
    await speak(translatedText, targetLang)
    if (cancelled.current) return

    setCurrentSpeaker(otherSpeaker(speaker))
    setStatus('idle')
  }, [currentSpeaker, status])

  const turnLabel = `${LANG_LABEL[langForSpeaker(currentSpeaker)]}`

  return {
    messages,
    status,
    currentSpeaker,
    turnLabel,
    startListening,
    replay,
    setFlag,
    reset,
  }
}

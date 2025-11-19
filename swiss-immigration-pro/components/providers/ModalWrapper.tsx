'use client'

import { InitialQuizGate } from '@/components/quiz/PreferencesModal'

export default function ModalWrapper({ children }: { children: React.ReactNode }) {
  return <InitialQuizGate>{children}</InitialQuizGate>
}


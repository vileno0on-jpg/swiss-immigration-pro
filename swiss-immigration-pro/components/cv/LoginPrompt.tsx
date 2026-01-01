'use client'

import { useSession } from 'next-auth/react'
import { FileText, Lock } from 'lucide-react'

interface LoginPromptProps {
  onLogin?: () => void
}

export default function LoginPrompt({ onLogin }: LoginPromptProps) {
  const { data: session } = useSession()

  if (session?.user?.id) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-blue-200 rounded-lg shadow-lg p-4 max-w-sm z-50">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Lock className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 text-sm mb-1">Save Your Work</h4>
          <p className="text-xs text-gray-600 mb-3">
            Log in to save and sync your CV across all devices
          </p>
          <a
            href={`/auth/login?redirect=${encodeURIComponent('/tools/cv-editor')}`}
            onClick={onLogin}
            className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors"
          >
            Log In Now
          </a>
        </div>
      </div>
    </div>
  )
}






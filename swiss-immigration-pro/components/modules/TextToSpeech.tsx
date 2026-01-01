'use client'

import { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX, Volume1 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface TextToSpeechProps {
  text: string
  onClose?: () => void
}

export default function TextToSpeech({ text, onClose }: TextToSpeechProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null)
  const [rate, setRate] = useState(1)
  const [pitch, setPitch] = useState(1)
  const [volume, setVolume] = useState(1)
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const speechSynthesisRef = useRef<typeof window.speechSynthesis | null>(null)

  useEffect(() => {
    speechSynthesisRef.current = window.speechSynthesis

    // Load available voices
    const loadVoices = () => {
      const availableVoices = speechSynthesisRef.current?.getVoices() || []
      setVoices(availableVoices)
      
      // Try to find a natural-sounding voice (prefer English, then others)
      const preferredVoice = 
        availableVoices.find(v => v.lang.startsWith('en') && v.name.includes('Natural')) ||
        availableVoices.find(v => v.lang.startsWith('en') && v.name.includes('Enhanced')) ||
        availableVoices.find(v => v.lang.startsWith('en')) ||
        availableVoices[0]
      
      if (preferredVoice) {
        setSelectedVoice(preferredVoice)
      }
    }

    loadVoices()
    speechSynthesisRef.current?.addEventListener('voiceschanged', loadVoices)

    return () => {
      speechSynthesisRef.current?.removeEventListener('voiceschanged', loadVoices)
      speechSynthesisRef.current?.cancel()
    }
  }, [])

  useEffect(() => {
    if (utterance) {
      utterance.rate = rate
      utterance.pitch = pitch
      utterance.volume = volume
      if (selectedVoice) {
        utterance.voice = selectedVoice
      }
    }
  }, [rate, pitch, volume, selectedVoice, utterance])

  const handlePlay = () => {
    if (!text) return

    // Cancel any ongoing speech
    speechSynthesisRef.current?.cancel()

    const newUtterance = new SpeechSynthesisUtterance(text)
    newUtterance.rate = rate
    newUtterance.pitch = pitch
    newUtterance.volume = volume
    
    if (selectedVoice) {
      newUtterance.voice = selectedVoice
    }

    newUtterance.onstart = () => {
      setIsPlaying(true)
      setIsPaused(false)
    }

    newUtterance.onend = () => {
      setIsPlaying(false)
      setIsPaused(false)
    }

    newUtterance.onerror = (event) => {
      console.error('Speech synthesis error:', event)
      setIsPlaying(false)
      setIsPaused(false)
    }

    setUtterance(newUtterance)
    speechSynthesisRef.current?.speak(newUtterance)
  }

  const handlePause = () => {
    if (isPlaying && !isPaused) {
      speechSynthesisRef.current?.pause()
      setIsPaused(true)
    } else if (isPaused) {
      speechSynthesisRef.current?.resume()
      setIsPaused(false)
    }
  }

  const handleStop = () => {
    speechSynthesisRef.current?.cancel()
    setIsPlaying(false)
    setIsPaused(false)
    setUtterance(null)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      speechSynthesisRef.current?.cancel()
    }
  }, [])

  if (!text) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-24 right-4 bg-white border-2 border-blue-600 rounded-xl shadow-2xl p-4 z-50 max-w-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-black text-sm">Text-to-Speech</h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ×
          </button>
        )}
      </div>

      <div className="space-y-3">
        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={isPlaying ? handlePause : handlePlay}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
              isPlaying
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isPaused ? 'Resume' : isPlaying ? 'Pause' : 'Play'}
          </button>
          {isPlaying && (
            <button
              onClick={handleStop}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Stop
            </button>
          )}
        </div>

        {/* Settings */}
        <div className="space-y-3 pt-2 border-t border-gray-200">
          {/* Rate */}
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">
              Speed: {rate.toFixed(1)}x
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Pitch */}
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">
              Pitch: {pitch.toFixed(1)}
            </label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Volume */}
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block flex items-center gap-2">
              <Volume1 className="w-4 h-4" />
              Volume: {Math.round(volume * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Voice Selection */}
          {voices.length > 0 && (
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">
                Voice
              </label>
              <select
                value={selectedVoice?.name || ''}
                onChange={(e) => {
                  const voice = voices.find(v => v.name === e.target.value)
                  if (voice) setSelectedVoice(voice)
                }}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {voices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}


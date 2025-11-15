'use client'

import { useState } from 'react'
import Link from 'next/link'
import VideoUploader from '@/components/VideoUploader'
import PersonaSelector from '@/components/PersonaSelector'
import FeedbackDisplay from '@/components/FeedbackDisplay'
import { Sparkles, ArrowLeft } from 'lucide-react'

type PersonaType = 'investor' | 'advisor' | 'healthcare' | 'edtech' | 'tech'

export default function PitchPractice() {
  const [selectedPersona, setSelectedPersona] = useState<PersonaType>('investor')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)
  const [transcript, setTranscript] = useState<string>('')

  const handleAnalysisComplete = (result: any) => {
    setAnalysis(result.analysis)
    setTranscript(result.transcript)
    setIsAnalyzing(false)
  }

  const handleReset = () => {
    setAnalysis(null)
    setTranscript('')
    setIsAnalyzing(false)
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 -z-10"></div>

      {/* Subtle grid pattern */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItMnpNMzQgMzZ2LTJoMnptMC0ydjJoLTJ6bTAtMmgydi0yaC0yem0yLTJoLTJ2Mmgyek0zNCAzMHYyaDJ2LTJ6bTItMmgtMnYyaDJ6bTAtMmgydi0yaC0yem0yIDJ2Mmgtdi0yem0wIDBoLTJ2MmgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20 -z-10"></div>

      <div className="container mx-auto px-4 py-12 max-w-7xl relative">
        {/* Back Button */}
        <Link href="/">
          <button className="mb-8 flex items-center space-x-2 text-slate-400 hover:text-slate-200 transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-2 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/50">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Pitch Practice
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Perfect your pitch with expert AI feedback
            <br />
            <span className="text-slate-500 text-lg">Powered by Claude Sonnet 4.5</span>
          </p>
        </div>

        {/* Main Content */}
        {!analysis ? (
          <div className="space-y-8">
            {/* Persona Selection */}
            <PersonaSelector
              selectedPersona={selectedPersona}
              onPersonaChange={setSelectedPersona}
              disabled={isAnalyzing}
            />

            {/* Video Upload */}
            <VideoUploader
              persona={selectedPersona}
              onAnalysisStart={() => setIsAnalyzing(true)}
              onAnalysisComplete={handleAnalysisComplete}
              isAnalyzing={isAnalyzing}
            />

            {/* Loading State */}
            {isAnalyzing && (
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-16 text-center border border-slate-700/50">
                <div className="relative mb-8">
                  <div className="animate-spin rounded-full h-20 w-20 border-4 border-slate-700 border-t-indigo-500 mx-auto"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-indigo-400 animate-pulse" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-slate-100 mb-4">
                  Analyzing Your Pitch...
                </h3>
                <p className="text-slate-400 text-lg max-w-md mx-auto">
                  Claude Sonnet 4.5 is reviewing your video and preparing detailed expert feedback
                </p>
                <div className="mt-8 flex items-center justify-center space-x-2 text-slate-500">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Feedback Display */
          <FeedbackDisplay
            analysis={analysis}
            transcript={transcript}
            persona={selectedPersona}
            onReset={handleReset}
          />
        )}
      </div>
    </main>
  )
}

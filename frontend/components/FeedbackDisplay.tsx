import { CheckCircle, XCircle, TrendingUp, Award, RotateCcw, FileText } from 'lucide-react'
import { useState } from 'react'

type PersonaType = 'investor' | 'advisor' | 'healthcare' | 'edtech' | 'tech'

interface FeedbackDisplayProps {
  analysis: {
    raw_feedback: string
    structured_feedback: Record<string, string>
  }
  transcript: string
  persona: PersonaType
  onReset: () => void
}

export default function FeedbackDisplay({
  analysis,
  transcript,
  persona,
  onReset
}: FeedbackDisplayProps) {
  const [showTranscript, setShowTranscript] = useState(false)

  // Helper function to clean markdown formatting
  const cleanMarkdown = (text: string): string => {
    return text
      .replace(/\*\*\*/g, '') // Remove ***
      .replace(/\*\*/g, '')   // Remove **
      .replace(/\*/g, '')     // Remove *
      .replace(/_{2,}/g, '')  // Remove __
      .replace(/_/g, '')      // Remove _
      .replace(/~~(.+?)~~/g, '$1') // Remove strikethrough
      .trim()
  }

  const getPersonaLabel = (persona: PersonaType) => {
    const labels = {
      investor: 'Venture Investor',
      advisor: 'Pitch Advisor',
      healthcare: 'Healthcare Expert',
      edtech: 'EdTech Specialist',
      tech: 'Tech Startup Expert'
    }
    return labels[persona]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl p-8 text-white border border-indigo-400/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-2 flex items-center space-x-3">
              <Award className="w-10 h-10" />
              <span>Analysis Complete</span>
            </h2>
            <p className="text-white/90 text-lg">
              Expert feedback from your {getPersonaLabel(persona)}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <TrendingUp className="w-10 h-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Transcript Toggle */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-slate-700/50">
        <button
          onClick={() => setShowTranscript(!showTranscript)}
          className="w-full flex items-center justify-between text-left group"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">Your Transcript</h3>
          </div>
          <svg
            className={`w-6 h-6 text-slate-400 group-hover:text-slate-300 transition-all ${showTranscript ? 'rotate-180' : ''}`}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>

        {showTranscript && (
          <div className="mt-4 p-6 bg-slate-900/50 rounded-xl border border-slate-700/50">
            <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{transcript}</p>
          </div>
        )}
      </div>

      {/* Main Feedback */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-slate-700/50">
        <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <span>Expert Analysis</span>
        </h3>

        <div className="prose prose-lg max-w-none">
          <div className="space-y-6">
            {analysis.raw_feedback.split('\n').map((line, index) => {
              // Check if line is a header
              if (line.startsWith('#') || (line.match(/^\*\*.*\*\*$/) && line.length < 100)) {
                return (
                  <h4 key={index} className="text-2xl font-bold text-slate-100 mt-8 mb-4 first:mt-0 border-l-4 border-indigo-500 pl-4">
                    {cleanMarkdown(line.replace(/^#+\s*/, ''))}
                  </h4>
                )
              }

              // Check if line is a bullet point
              if (line.trim().startsWith('-') || line.trim().startsWith('•') || line.trim().match(/^\d+\./)) {
                const content = cleanMarkdown(line.replace(/^[-•]\s*/, '').replace(/^\d+\.\s*/, ''))
                const isPositive = content.toLowerCase().includes('good') ||
                                   content.toLowerCase().includes('strong') ||
                                   content.toLowerCase().includes('excellent') ||
                                   content.toLowerCase().includes('effective')

                return (
                  <div key={index} className="flex items-start space-x-3 py-3 px-4 rounded-lg bg-slate-900/30 border border-slate-700/30">
                    {isPositive ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                    )}
                    <p className="text-slate-300 flex-1 leading-relaxed">{content}</p>
                  </div>
                )
              }

              // Check for score/rating
              if (line.toLowerCase().includes('score') || line.toLowerCase().includes('rating') || line.match(/\d+\/10/)) {
                return (
                  <div key={index} className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-l-4 border-indigo-500 p-6 rounded-r-xl my-4 backdrop-blur-sm">
                    <p className="text-xl font-bold text-slate-100">{cleanMarkdown(line)}</p>
                  </div>
                )
              }

              // Regular paragraph
              if (line.trim()) {
                return (
                  <p key={index} className="text-slate-300 leading-relaxed text-lg">
                    {cleanMarkdown(line)}
                  </p>
                )
              }

              return null
            })}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={onReset}
          className="px-10 py-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all shadow-2xl shadow-indigo-500/30 flex items-center space-x-3 group"
        >
          <RotateCcw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
          <span>Analyze Another Pitch</span>
        </button>
      </div>
    </div>
  )
}

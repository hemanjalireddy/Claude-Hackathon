'use client'

import { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { Lightbulb, ArrowLeft, Send, Sparkles, TrendingUp, Shield, Code, DollarSign, AlertTriangle } from 'lucide-react'

interface AnalysisResult {
  scores: {
    novelty: number
    technical_feasibility: number
    market_overlap: number
    patent_risk: number
    implementation_complexity: number
    ethical_regulatory: number
  }
  weighted_score: number
  explanations: {
    novelty: string
    technical_feasibility: string
    market_overlap: string
    patent_risk: string
    implementation_complexity: string
    ethical_regulatory: string
  }
  patents: Array<{
    patent_number: string
    title: string
    abstract: string
    filing_date: string
    status: string
    link: string
  }>
}

export default function IdeaAnalyzer() {
  const [ideaDescription, setIdeaDescription] = useState('')
  const [keywords, setKeywords] = useState('')
  const [industry, setIndustry] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    if (!ideaDescription.trim()) {
      setError('Please enter your startup idea description')
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await axios.post('http://localhost:8000/api/analyze-idea', {
        idea_description: ideaDescription,
        keywords: keywords.split(',').map(k => k.trim()).filter(k => k),
        industry: industry || undefined
      }, {
        timeout: 120000 // 2 minutes
      })

      setResult(response.data)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to analyze idea. Please try again.')
      console.error('Analysis error:', err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setIdeaDescription('')
    setKeywords('')
    setIndustry('')
    setError(null)
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-emerald-400'
    if (score >= 6) return 'text-blue-400'
    if (score >= 4) return 'text-amber-400'
    return 'text-red-400'
  }

  const getScoreBarColor = (score: number) => {
    if (score >= 8) return 'bg-emerald-500'
    if (score >= 6) return 'bg-blue-500'
    if (score >= 4) return 'bg-amber-500'
    return 'bg-red-500'
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 -z-10"></div>
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
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
            Idea Analyzer
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Evaluate your startup idea with AI-powered analysis
            <br />
            <span className="text-slate-500 text-lg">Patent Search • Market Analysis • Feasibility Scoring</span>
          </p>
        </div>

        {!result ? (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Input Form */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-bold text-slate-100 mb-6">Describe Your Startup Idea</h2>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span>{error}</span>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-slate-300 font-semibold mb-2">
                    Idea Description *
                  </label>
                  <textarea
                    value={ideaDescription}
                    onChange={(e) => setIdeaDescription(e.target.value)}
                    placeholder="Describe your startup idea in detail. Include the problem you're solving, your solution, target market, and key features..."
                    className="w-full h-48 px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                    disabled={isAnalyzing}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-2">
                      Keywords (optional)
                    </label>
                    <input
                      type="text"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="AI, healthcare, blockchain, fintech..."
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      disabled={isAnalyzing}
                    />
                    <p className="text-sm text-slate-500 mt-2">Comma-separated keywords</p>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-2">
                      Industry/Domain (optional)
                    </label>
                    <input
                      type="text"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      placeholder="Healthcare, Education, FinTech..."
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      disabled={isAnalyzing}
                    />
                  </div>
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full py-5 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white rounded-xl font-bold text-lg hover:from-purple-600 hover:via-pink-600 hover:to-rose-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-purple-500/40 flex items-center justify-center space-x-2"
                >
                  {isAnalyzing ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Analyze My Idea</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Loading State */}
            {isAnalyzing && (
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-16 text-center border border-slate-700/50">
                <div className="relative mb-8">
                  <div className="animate-spin rounded-full h-20 w-20 border-4 border-slate-700 border-t-purple-500 mx-auto"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lightbulb className="w-8 h-8 text-purple-400 animate-pulse" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-slate-100 mb-4">
                  Analyzing Your Idea...
                </h3>
                <p className="text-slate-400 text-lg max-w-md mx-auto mb-6">
                  Evaluating originality, feasibility, market overlap, and searching patent databases
                </p>
                <div className="space-y-3 max-w-md mx-auto text-left">
                  <div className="flex items-center space-x-3 text-slate-500">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span>Analyzing novelty and originality...</span>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-500">
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-100"></div>
                    <span>Searching U.S. patent databases...</span>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-500">
                    <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse delay-200"></div>
                    <span>Evaluating market and feasibility...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Results Display - will be implemented next */
          <div className="space-y-8">
            {/* Overall Score */}
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-2xl shadow-2xl p-8 text-white">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Originality & Technology Score</h2>
                <div className="text-7xl font-black mb-2">{result.weighted_score.toFixed(1)}</div>
                <div className="text-xl opacity-90">out of 100</div>
              </div>
            </div>

            {/* Detailed Scores */}
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(result.scores).map(([key, score]) => {
                const icons = {
                  novelty: Sparkles,
                  technical_feasibility: Code,
                  market_overlap: TrendingUp,
                  patent_risk: Shield,
                  implementation_complexity: DollarSign,
                  ethical_regulatory: AlertTriangle
                }
                const Icon = icons[key as keyof typeof icons]
                const labels = {
                  novelty: 'Novelty / Originality (30%)',
                  technical_feasibility: 'Technical Feasibility (20%)',
                  market_overlap: 'Market Overlap (15%)',
                  patent_risk: 'Patent Freedom / Risk (20%)',
                  implementation_complexity: 'Implementation Complexity (10%)',
                  ethical_regulatory: 'Ethical/Regulatory Risk (5%)'
                }

                return (
                  <div key={key} className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Icon className="w-6 h-6 text-purple-400" />
                        <h3 className="font-semibold text-slate-200">{labels[key as keyof typeof labels]}</h3>
                      </div>
                      <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                        {score.toFixed(1)}/10
                      </div>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                      <div
                        className={`h-2 rounded-full ${getScoreBarColor(score)} transition-all duration-1000`}
                        style={{ width: `${(score / 10) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {result.explanations[key as keyof typeof result.explanations]}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Patents Section */}
            {result.patents.length > 0 && (
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-slate-700/50">
                <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center space-x-2">
                  <Shield className="w-7 h-7 text-purple-400" />
                  <span>Relevant U.S. Patents ({result.patents.length})</span>
                </h2>
                <div className="space-y-4">
                  {result.patents.map((patent, idx) => (
                    <div key={idx} className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/30">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-slate-100">{patent.title}</h3>
                          <p className="text-sm text-slate-400 mt-1">
                            Patent #{patent.patent_number} • Filed: {patent.filing_date} • Status: {patent.status}
                          </p>
                        </div>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">{patent.abstract}</p>
                      <a
                        href={patent.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 text-sm font-semibold inline-flex items-center space-x-1"
                      >
                        <span>View Patent Details</span>
                        <ArrowLeft className="w-4 h-4 rotate-180" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="flex justify-center">
              <button
                onClick={handleReset}
                className="px-10 py-5 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white rounded-xl font-bold text-lg hover:from-purple-600 hover:via-pink-600 hover:to-rose-600 transition-all shadow-2xl shadow-purple-500/30"
              >
                Analyze Another Idea
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

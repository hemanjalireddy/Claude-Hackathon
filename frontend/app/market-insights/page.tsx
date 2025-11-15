'use client'

import { useState } from 'react'
import { ArrowLeft, TrendingUp, Users, Target, Lightbulb, Loader2, Award, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import axios from 'axios'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

interface MarketInsightsResult {
  customer_segments: Array<{
    name: string
    description: string
    size: string
    key_characteristics: string[]
  }>
  customer_personas: Array<{
    name: string
    demographics: string
    psychographics: string
    pain_points: string[]
    goals: string[]
  }>
  competitors: {
    direct: Array<{
      name: string
      description: string
      strengths: string[]
      weaknesses: string[]
    }>
    adjacent: Array<{
      name: string
      description: string
      relevance: string
    }>
    indirect: Array<{
      name: string
      description: string
      relevance: string
    }>
  }
  market_gaps: string[]
  positioning_insights: string
}

const COLORS = ['#06b6d4', '#14b8a6', '#10b981', '#84cc16', '#eab308']

export default function MarketInsightsPage() {
  const [formData, setFormData] = useState({
    startup_idea: '',
    ideal_customer: '',
    problem_solving: '',
    industry: '',
    known_competitors: '',
    unique_value: '',
    business_model: '',
    geographic_regions: ''
  })

  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<MarketInsightsResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAnalyzing(true)
    setError(null)
    setResults(null)

    try {
      const response = await axios.post('http://localhost:8000/api/analyze-market', formData)
      setResults(response.data)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to analyze market insights. Please try again.')
      console.error('Market analysis error:', err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const isFormValid = formData.startup_idea && formData.ideal_customer && formData.problem_solving && formData.industry

  // Prepare data for segment pie chart
  const getSegmentChartData = () => {
    if (!results?.customer_segments) return []
    return results.customer_segments.map(segment => {
      let value = 1
      if (segment.size.toLowerCase().includes('large')) value = 3
      else if (segment.size.toLowerCase().includes('medium')) value = 2
      else if (segment.size.toLowerCase().includes('small')) value = 1

      return {
        name: segment.name,
        value: value,
        size: segment.size
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-6">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>

          <div className="flex items-center space-x-4 mb-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 shadow-lg shadow-cyan-500/30">
              <TrendingUp className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                Market Insights
              </h1>
              <p className="text-slate-400 text-lg mt-2">
                Discover your customers and competitive landscape
              </p>
            </div>
          </div>
        </div>

        {!results ? (
          /* Form Section */
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border-2 border-slate-700/50 p-8 shadow-2xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-2">Tell Us About Your Startup</h2>
              <p className="text-slate-400">
                Answer these questions to get comprehensive market insights
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Question 1 */}
              <div>
                <label className="block text-slate-200 font-semibold mb-2">
                  1. What is your startup idea? *
                </label>
                <textarea
                  name="startup_idea"
                  value={formData.startup_idea}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-900/50 border-2 border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                  rows={3}
                  placeholder="Describe your startup concept in detail..."
                  required
                />
              </div>

              {/* Question 2 */}
              <div>
                <label className="block text-slate-200 font-semibold mb-2">
                  2. Who is your ideal customer? *
                </label>
                <textarea
                  name="ideal_customer"
                  value={formData.ideal_customer}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-900/50 border-2 border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                  rows={2}
                  placeholder="e.g., Small business owners, healthcare professionals, students..."
                  required
                />
              </div>

              {/* Question 3 */}
              <div>
                <label className="block text-slate-200 font-semibold mb-2">
                  3. What problem are you solving? *
                </label>
                <textarea
                  name="problem_solving"
                  value={formData.problem_solving}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-900/50 border-2 border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                  rows={2}
                  placeholder="What pain point does your solution address?"
                  required
                />
              </div>

              {/* Question 4 */}
              <div>
                <label className="block text-slate-200 font-semibold mb-2">
                  4. What industry or market are you in? *
                </label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-900/50 border-2 border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder="e.g., Healthcare, EdTech, FinTech, SaaS..."
                  required
                />
              </div>

              {/* Question 5 */}
              <div>
                <label className="block text-slate-200 font-semibold mb-2">
                  5. Who are your known competitors (if any)?
                </label>
                <textarea
                  name="known_competitors"
                  value={formData.known_competitors}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-900/50 border-2 border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                  rows={2}
                  placeholder="List any competitors you're aware of, or leave blank if unsure..."
                />
              </div>

              {/* Question 6 */}
              <div>
                <label className="block text-slate-200 font-semibold mb-2">
                  6. What makes your solution unique?
                </label>
                <textarea
                  name="unique_value"
                  value={formData.unique_value}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-900/50 border-2 border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                  rows={2}
                  placeholder="What's your unique value proposition or differentiator?"
                />
              </div>

              {/* Question 7 */}
              <div>
                <label className="block text-slate-200 font-semibold mb-2">
                  7. What is your business model?
                </label>
                <input
                  type="text"
                  name="business_model"
                  value={formData.business_model}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-900/50 border-2 border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder="e.g., Subscription, Freemium, Marketplace, Enterprise..."
                />
              </div>

              {/* Question 8 */}
              <div>
                <label className="block text-slate-200 font-semibold mb-2">
                  8. What geographic regions are you targeting?
                </label>
                <input
                  type="text"
                  name="geographic_regions"
                  value={formData.geographic_regions}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-900/50 border-2 border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder="e.g., United States, Global, APAC, Europe..."
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-500/10 border-2 border-red-500/50 rounded-lg">
                  <p className="text-red-400">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid || isAnalyzing}
                className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-bold rounded-lg hover:from-cyan-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 flex items-center justify-center space-x-3"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Analyzing Market...</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-6 h-6" />
                    <span>Get Market Insights</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Results Section */
          <div className="space-y-8">
            {/* Customer Segments with Pie Chart */}
            {results.customer_segments && results.customer_segments.length > 0 && (
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border-2 border-slate-700/50 p-8 shadow-2xl">
                <div className="flex items-center space-x-3 mb-6">
                  <Users className="w-8 h-8 text-cyan-400" />
                  <h2 className="text-3xl font-bold text-slate-100">Customer Segments</h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Pie Chart */}
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getSegmentChartData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {getSegmentChartData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Segment Details */}
                  <div className="space-y-4">
                    {results.customer_segments.map((segment, index) => (
                      <div key={index} className="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                          <h3 className="text-lg font-bold text-cyan-400">{segment.name}</h3>
                        </div>
                        <p className="text-slate-300 text-sm mb-2">{segment.description}</p>
                        <p className="text-xs text-slate-400">
                          <strong>Size:</strong> {segment.size}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Customer Personas - Compact Cards */}
            {results.customer_personas && results.customer_personas.length > 0 && (
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border-2 border-slate-700/50 p-8 shadow-2xl">
                <div className="flex items-center space-x-3 mb-6">
                  <Target className="w-8 h-8 text-teal-400" />
                  <h2 className="text-3xl font-bold text-slate-100">Customer Personas</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.customer_personas.map((persona, index) => (
                    <div key={index} className="p-6 bg-slate-900/50 rounded-xl border border-slate-700 hover:border-teal-500/50 transition-all">
                      <h3 className="text-xl font-bold text-teal-400 mb-3">{persona.name}</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-semibold text-slate-400 mb-1">Demographics</p>
                          <p className="text-slate-300 text-sm">{persona.demographics}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-400 mb-1">Top Pain Point</p>
                          <p className="text-slate-300 text-sm">• {persona.pain_points[0]}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-400 mb-1">Primary Goal</p>
                          <p className="text-slate-300 text-sm">→ {persona.goals[0]}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Competitor Landscape with Bar Chart */}
            {results.competitors && (
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border-2 border-slate-700/50 p-8 shadow-2xl">
                <div className="flex items-center space-x-3 mb-6">
                  <Lightbulb className="w-8 h-8 text-purple-400" />
                  <h2 className="text-3xl font-bold text-slate-100">Competitive Landscape</h2>
                </div>

                {/* Competitor Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30 text-center">
                    <div className="text-3xl font-bold text-purple-400">{results.competitors.direct?.length || 0}</div>
                    <div className="text-sm text-slate-400">Direct</div>
                  </div>
                  <div className="p-4 bg-indigo-500/10 rounded-lg border border-indigo-500/30 text-center">
                    <div className="text-3xl font-bold text-indigo-400">{results.competitors.adjacent?.length || 0}</div>
                    <div className="text-sm text-slate-400">Adjacent</div>
                  </div>
                  <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30 text-center">
                    <div className="text-3xl font-bold text-blue-400">{results.competitors.indirect?.length || 0}</div>
                    <div className="text-sm text-slate-400">Indirect</div>
                  </div>
                </div>

                {/* Compact Competitor List */}
                {results.competitors.direct && results.competitors.direct.length > 0 && (
                  <div className="space-y-3">
                    {results.competitors.direct.map((comp, index) => (
                      <div key={index} className="p-4 bg-slate-900/50 rounded-xl border border-purple-500/30">
                        <h4 className="text-lg font-bold text-slate-100 mb-1">{comp.name}</h4>
                        <p className="text-slate-400 text-sm mb-3">{comp.description}</p>
                        <div className="grid md:grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-green-400 font-semibold">Strengths: </span>
                            <span className="text-slate-400">{comp.strengths.slice(0, 2).join(', ')}</span>
                          </div>
                          <div>
                            <span className="text-red-400 font-semibold">Weaknesses: </span>
                            <span className="text-slate-400">{comp.weaknesses.slice(0, 2).join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Market Gaps - Visual Cards */}
            {results.market_gaps && results.market_gaps.length > 0 && (
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border-2 border-slate-700/50 p-8 shadow-2xl">
                <div className="flex items-center space-x-3 mb-6">
                  <Award className="w-8 h-8 text-emerald-400" />
                  <h2 className="text-3xl font-bold text-slate-100">Market Opportunities</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {results.market_gaps.map((gap, index) => (
                    <div key={index} className="p-5 bg-emerald-900/20 rounded-lg border border-emerald-500/30 flex items-start space-x-3 hover:border-emerald-500/50 transition-all">
                      <span className="text-emerald-400 text-2xl flex-shrink-0">💡</span>
                      <p className="text-slate-300 text-sm flex-1">{gap}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Positioning Insights - Concise */}
            {results.positioning_insights && (
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border-2 border-slate-700/50 p-8 shadow-2xl">
                <div className="flex items-center space-x-3 mb-6">
                  <AlertCircle className="w-8 h-8 text-cyan-400" />
                  <h2 className="text-3xl font-bold text-slate-100">Strategic Positioning</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300 leading-relaxed">{results.positioning_insights}</p>
                </div>
              </div>
            )}

            {/* Analyze Another Button */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setResults(null)
                  setFormData({
                    startup_idea: '',
                    ideal_customer: '',
                    problem_solving: '',
                    industry: '',
                    known_competitors: '',
                    unique_value: '',
                    business_model: '',
                    geographic_regions: ''
                  })
                }}
                className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-slate-100 font-semibold rounded-lg transition-colors"
              >
                Analyze Another Market
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

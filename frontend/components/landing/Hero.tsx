import { ArrowRight, Video, Lightbulb, Sparkles, TrendingUp, Target, Zap } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 -z-10"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItMnpNMzQgMzZ2LTJoMnptMC0ydjJoLTJ6bTAtMmgydi0yaC0yem0yLTJoLTJ2Mmgyek0zNCAzMHYyaDJ2LTJ6bTItMmgtMnYyaDJ6bTAtMmgydi0yaC0yem0yIDJ2Mmgtdi0yem0wIDBoLTJ2MmgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20 -z-10"></div>

      <div className="container mx-auto px-4 py-20 max-w-7xl relative">
        <div className="text-center mb-16">
          {/* Logo/Icon */}
          <div className="inline-flex items-center justify-center space-x-3 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 blur-2xl opacity-50 animate-pulse"></div>
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-2xl shadow-cyan-500/50">
                <Zap className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-7xl md:text-9xl font-black mb-6 leading-tight tracking-tighter">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">SHARK </span>
            <span className="text-red-500">BAIT</span>
          </h1>

          <p className="text-2xl md:text-3xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-4 font-light">
            Your AI-powered startup intelligence platform
          </p>

          <p className="text-lg text-slate-500 mb-12 font-medium">
            Perfect Your Pitch • Validate Your Idea • Dominate Your Market
          </p>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto mt-16">
            {/* Pitch Practice Card */}
            <Link href="/pitch-practice">
              <div className="group relative p-8 bg-slate-800/50 backdrop-blur-xl rounded-2xl border-2 border-slate-700/50 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/20">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg mb-6">
                    <Video className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-100 mb-3">
                    Practice Your Pitch
                  </h3>

                  <p className="text-slate-400 text-base leading-relaxed mb-5">
                    Get expert AI feedback from specialized coaches in VC, healthcare, edtech, and tech.
                  </p>

                  <ul className="text-left space-y-3 mb-8">
                    <li className="flex items-center space-x-3 text-slate-300">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span>Video recording & upload</span>
                    </li>
                    <li className="flex items-center space-x-3 text-slate-300">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>5 expert AI personas</span>
                    </li>
                    <li className="flex items-center space-x-3 text-slate-300">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <span>Detailed feedback & scoring</span>
                    </li>
                  </ul>

                  <div className="flex items-center justify-between">
                    <span className="text-indigo-400 font-semibold group-hover:text-indigo-300 transition-colors">
                      Start Practicing
                    </span>
                    <ArrowRight className="w-6 h-6 text-indigo-400 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Idea Analyzer Card */}
            <Link href="/idea-analyzer">
              <div className="group relative p-8 bg-slate-800/50 backdrop-blur-xl rounded-2xl border-2 border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg mb-6">
                    <Lightbulb className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-100 mb-3">
                    Analyze Your Idea
                  </h3>

                  <p className="text-slate-400 text-base leading-relaxed mb-5">
                    Evaluate your startup idea with AI-powered analysis of originality, feasibility, market overlap, and patent landscape.
                  </p>

                  <ul className="text-left space-y-3 mb-8">
                    <li className="flex items-center space-x-3 text-slate-300">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Originality & feasibility score</span>
                    </li>
                    <li className="flex items-center space-x-3 text-slate-300">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <span>U.S. patent landscape search</span>
                    </li>
                    <li className="flex items-center space-x-3 text-slate-300">
                      <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                      <span>Market & regulatory insights</span>
                    </li>
                  </ul>

                  <div className="flex items-center justify-between">
                    <span className="text-purple-400 font-semibold group-hover:text-purple-300 transition-colors">
                      Analyze Idea
                    </span>
                    <ArrowRight className="w-6 h-6 text-purple-400 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Market Insights Card */}
            <Link href="/market-insights">
              <div className="group relative p-8 bg-slate-800/50 backdrop-blur-xl rounded-2xl border-2 border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 shadow-lg mb-6">
                    <TrendingUp className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-100 mb-3">
                    Market Insights
                  </h3>

                  <p className="text-slate-400 text-base leading-relaxed mb-5">
                    Discover your ideal customers and competitors with AI-powered market analysis and strategic positioning insights.
                  </p>

                  <ul className="text-left space-y-3 mb-8">
                    <li className="flex items-center space-x-3 text-slate-300">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                      <span>Customer personas & segments</span>
                    </li>
                    <li className="flex items-center space-x-3 text-slate-300">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span>Competitor landscape mapping</span>
                    </li>
                    <li className="flex items-center space-x-3 text-slate-300">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span>Market gap identification</span>
                    </li>
                  </ul>

                  <div className="flex items-center justify-between">
                    <span className="text-cyan-400 font-semibold group-hover:text-cyan-300 transition-colors">
                      Get Insights
                    </span>
                    <ArrowRight className="w-6 h-6 text-cyan-400 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Stats/Social Proof */}
        <div className="mt-20 flex justify-center max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-400 mb-2">AI-Powered</div>
            <div className="text-slate-500">Claude Sonnet 4.5</div>
          </div>
        </div>
      </div>
    </div>
  )
}

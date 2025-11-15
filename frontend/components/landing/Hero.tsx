import { ArrowRight, Video, Lightbulb, Sparkles } from 'lucide-react'
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
          <div className="inline-flex items-center justify-center space-x-2 mb-8">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-2xl shadow-indigo-500/50 animate-pulse">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-7xl md:text-8xl font-black mb-8 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Pitch Coach AI
          </h1>

          <p className="text-2xl md:text-3xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-4">
            Transform your startup journey with AI-powered insights
          </p>

          <p className="text-lg text-slate-500 mb-12">
            Powered by Claude Sonnet 4.5 • Advanced AI Analysis
          </p>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-16">
            {/* Pitch Practice Card */}
            <Link href="/pitch-practice">
              <div className="group relative p-8 bg-slate-800/50 backdrop-blur-xl rounded-2xl border-2 border-slate-700/50 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/20">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg mb-6">
                    <Video className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-3xl font-bold text-slate-100 mb-4">
                    Practice Your Pitch
                  </h3>

                  <p className="text-slate-400 text-lg leading-relaxed mb-6">
                    Record or upload your pitch video and get expert feedback from AI coaches specialized in VC, healthcare, edtech, and tech sectors.
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

                  <h3 className="text-3xl font-bold text-slate-100 mb-4">
                    Analyze Your Idea
                  </h3>

                  <p className="text-slate-400 text-lg leading-relaxed mb-6">
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
          </div>
        </div>

        {/* Stats/Social Proof */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-400 mb-2">AI-Powered</div>
            <div className="text-slate-500">Claude Sonnet 4.5</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">5 Experts</div>
            <div className="text-slate-500">Industry Personas</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-pink-400 mb-2">100% Free</div>
            <div className="text-slate-500">For Entrepreneurs</div>
          </div>
        </div>
      </div>
    </div>
  )
}

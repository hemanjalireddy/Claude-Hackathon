import { Users, Lightbulb, Heart, GraduationCap, Cpu } from 'lucide-react'

type PersonaType = 'investor' | 'advisor' | 'healthcare' | 'edtech' | 'tech'

interface PersonaSelectorProps {
  selectedPersona: PersonaType
  onPersonaChange: (persona: PersonaType) => void
  disabled?: boolean
}

export default function PersonaSelector({
  selectedPersona,
  onPersonaChange,
  disabled = false
}: PersonaSelectorProps) {
  const personas = [
    {
      id: 'investor' as const,
      title: 'Venture Investor',
      description: 'VC perspective on market fit, scalability, business model, and ROI potential',
      icon: Users,
      gradient: 'from-indigo-500 to-blue-600'
    },
    {
      id: 'advisor' as const,
      title: 'Pitch Advisor',
      description: 'Expert coaching on presentation skills, storytelling, and persuasive delivery',
      icon: Lightbulb,
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      id: 'healthcare' as const,
      title: 'Healthcare Expert',
      description: 'Specialized feedback for medical, biotech, and healthcare solutions',
      icon: Heart,
      gradient: 'from-rose-500 to-red-600'
    },
    {
      id: 'edtech' as const,
      title: 'EdTech Specialist',
      description: 'Educational technology perspective on learning outcomes and scalability',
      icon: GraduationCap,
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'tech' as const,
      title: 'Tech Startup Expert',
      description: 'Technical validation for SaaS, AI, and innovative tech solutions',
      icon: Cpu,
      gradient: 'from-cyan-500 to-blue-600'
    }
  ]

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-slate-700/50">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100 mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Choose Your Expert
        </h2>
        <p className="text-slate-400">Select the perspective that matters most for your pitch</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {personas.map((persona) => {
          const Icon = persona.icon
          const isSelected = selectedPersona === persona.id

          return (
            <button
              key={persona.id}
              onClick={() => onPersonaChange(persona.id)}
              disabled={disabled}
              className={`
                group relative p-6 rounded-xl border-2 transition-all duration-300
                ${isSelected
                  ? 'border-indigo-500 bg-gradient-to-br from-slate-700/80 to-slate-800/80 shadow-xl shadow-indigo-500/20 scale-105'
                  : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600 hover:bg-slate-700/50 hover:shadow-lg'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${persona.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              )}

              <div className="relative z-10">
                {/* Icon with gradient background */}
                <div className={`inline-flex p-3 rounded-xl mb-4 bg-gradient-to-br ${persona.gradient} shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <div className="text-left">
                  <h3 className="text-lg font-bold mb-2 text-slate-100">
                    {persona.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {persona.description}
                  </p>
                </div>
              </div>

              {/* Bottom accent line */}
              {isSelected && (
                <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-xl bg-gradient-to-r ${persona.gradient}`} />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

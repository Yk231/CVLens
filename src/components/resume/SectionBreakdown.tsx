import { Code2, BriefcaseBusiness, TextSearch, Lightbulb, Dot, Sparkles } from 'lucide-react'

interface Props {
    sectionScores: {
        skills: number
        experience: number
        keywords: number
    }
    generalTip: string
}

const SECTIONS = [
    { key: 'skills', label: 'Skills Match', icon: Code2 },
    { key: 'experience', label: 'Experience Match', icon: BriefcaseBusiness },
    { key: 'keywords', label: 'Keywords Match', icon: TextSearch },
]

export default function SectionBreakdown({ sectionScores, generalTip}: Props) {
    return (
        <div className="flex flex-col gap-4 bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center gap-2">
                <span className="text-xl font-semibold text-slate-900">Score Breakdown</span>
            </div>

            <div className="flex flex-col gap-6">
                {SECTIONS.map(({ key, label, icon: Icon }) => {
                    const score = sectionScores[key as keyof typeof sectionScores]
                    return (
                        <div key={key} className="flex flex-row items-center gap-4">
                            <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                                <Icon className="w-4 h-4 text-slate-700" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between mb-1.5">
                                    <span className="text-sm font-medium text-slate-700">{label}</span>
                                    <div>
                                        <span className="text-sm font-medium text-slate-700">{score}</span>
                                        <span className="text-sm font-medium text-slate-500">/100</span>
                                    </div>
                                </div>
                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-indigo-500 rounded-full transition-all"
                                        style={{ width: `${score}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            
            
            

            <div className="flex flex-row items-start justify-between gap-4 bg-purple-50 rounded-xl p-4 mt-8">
                <div className="flex flex-col gap-4">
                    <p className="text-base font-semibold text-purple-900 mb-1">AI Tip</p>
                    <p className="text-sm text-purple-900">{generalTip}</p>
                </div>
                <Sparkles className="w-6 h-6 text-purple-400 flex-shrink-0 mt-0.5" />
            </div>

            
        </div>
    )
}
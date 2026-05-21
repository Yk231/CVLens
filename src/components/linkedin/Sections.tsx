import React from 'react'
import {UserRound, FileUser, Zap, BriefcaseBusiness} from 'lucide-react'

interface Props {
    sectionScores: {
        headline: number
        about: number
        experience: number
        skills: number
    }
    sectionSummaries: {
        headline: string
        about: string
        experience: string
        skills: string
    }
}

function getColor(score: number) {
  if (score >= 80) return 'bg-green-100'
  if (score >= 60) return 'bg-orange-100'
  return 'bg-red-100'
}

function ScoreRow({ label, labelSummary, score, icon: Icon, iconBgColor, iconColor}: { 
  label: string
  labelSummary: string
  score: number
  icon: React.ElementType 
  iconBgColor: string
  iconColor: string
}) {
  const color = getColor(score)
  return (
    <div className="flex flex-row items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        
        <div className={`${iconBgColor} rounded-full p-2`}>
            <Icon className={`w-8 h-8  ${iconColor}`} />
        </div>

        <div className="flex flex-col flex-1">
            <h3 className="text-lg font-semibold text-slate-900">{label}</h3>
            <p className="text-md text-slate-500">{labelSummary}</p>
        </div>

        <div className={`${color} rounded-full p-2 pr-3 pl-3`}>
            <span className="font-semibold text-slate-900">{score}/100</span>
        </div>


    </div>
  )
}




export default function SectionScores({ sectionScores, sectionSummaries }: Props) {

    return (

        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-slate-900">Section-by-Section Feedback</h2>

            {/*Headline*/}
            <ScoreRow
                label="Headline"
                labelSummary={sectionSummaries.headline}
                score={sectionScores.headline}
                icon={UserRound}
                iconBgColor = 'bg-green-100'
                iconColor = 'text-green-500'
            />

            {/*About*/}
            <ScoreRow
                label="About"
                labelSummary={sectionSummaries.about}
                score={sectionScores.about}
                icon={FileUser}
                iconBgColor = 'bg-blue-100'
                iconColor = 'text-blue-500'
            />

            {/*Experience*/}
            <ScoreRow
                label="Experience"
                labelSummary={sectionSummaries.experience}
                score={sectionScores.experience}
                icon={BriefcaseBusiness}
                iconBgColor = 'bg-purple-100'
                iconColor = 'text-purple-500'
            />

            {/*Skills*/}
            <ScoreRow
                label="Skills"
                labelSummary={sectionSummaries.skills}
                score={sectionScores.skills}
                icon={Zap}
                iconBgColor = 'bg-green-100'
                iconColor = 'text-green-500'
            />
        

        </div>
    )
}
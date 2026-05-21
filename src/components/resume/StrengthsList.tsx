import React from 'react'
import { ThumbsUp, CircleCheck, Sparkles, CirclePlus, OctagonX } from 'lucide-react'

interface Props {
    strengths: string[]
    weaknesses: string[]
    tip: string
}

function Section({label, bulletpoints}: {
    label: string
    bulletpoints: string[]
    }) {

    let bgIconColor: string
    let bgDivColor: string
    let textColor: string
    let Icon: React.ElementType
    let BulletIcon: React.ElementType

    if (label === "Strengths"){
        bgIconColor = 'bg-green-100'
        bgDivColor = 'bg-green-50'
        textColor = 'text-green-500'
        Icon = ThumbsUp
        BulletIcon = CircleCheck
    }
    else {
        bgIconColor = 'bg-red-100'
        bgDivColor = 'bg-red-50'
        textColor = 'text-red-500'
        Icon = OctagonX
        BulletIcon = CirclePlus
    }

    return (
        <div className={`flex flex-col gap-4 rounded-2xl border border-slate-200 ${bgDivColor} p-6 shadow-sm flex-1`}>

            {/* Header */}
            <div className="flex flex-row items-center gap-4">
                <div className={`${bgIconColor} rounded-full p-2`}>
                    <Icon className={`w-5 h-5 ${textColor}`} />
                </div>
                <h3 className={`text-lg font-semibold ${textColor}`}>{label}</h3>
            </div>

            {/* Bullet points */}
            <div className="flex flex-col gap-2">
                {bulletpoints.map((point, index) => (
                    <div key={index} className="flex flex-row items-start gap-3">
                        <div className={`${bgIconColor} rounded-full p-1 mt-0.5 flex-shrink-0`}>
                            <BulletIcon className={`w-3 h-3 ${textColor}`} />
                        </div>
                        <p className="text-sm text-slate-900">{point}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

function AITip({ tip }: {
    tip: string
}) {
    return (
        <div className="flex flex-row gap-4 rounded-2xl border border-purple-200 bg-purple-100 p-6 shadow-sm items-center">

            <div className="flex flex-row items-center gap-4">
                <Sparkles className="w-5 h-5 text-purple-900" />
                <h3 className="text-lg font-semibold text-purple-900 whitespace-nowrap flex-shrink-0">AI Tip:</h3>            </div>

            <p className="text-md text-slate-900">{tip}</p>

        </div>
    )
}

export default function StrengthsList({ strengths, weaknesses, tip }: Props) {
    return (
        <div className="flex flex-col gap-4"> 
        
        
            <div className="flex flex-row gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <Section
                    label="Strengths"
                    bulletpoints={strengths}
                />

                <Section
                    label="Weaknesses"
                    bulletpoints={weaknesses}
                />

            </div>

            <AITip tip={tip} />
        </div>
    )
}
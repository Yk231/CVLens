import React from 'react'
import { Lightbulb, CircleCheck, BriefcaseMedical, Sparkles, CirclePlus } from 'lucide-react'

interface Props {
    strengths: string[]
    weaknesses: string[]
    tip: string
}

function Section({ label, icon: Icon, bulletIcon: BulletIcon, bulletpoints, bgColor, iconColor }: {
    label: string
    icon: React.ElementType
    bulletIcon: React.ElementType
    bulletpoints: string[]
    bgColor: string
    iconColor: string
}) {
    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            {/* Header */}
            <div className="flex flex-row items-center gap-4">
                <div className={`${bgColor} rounded-full p-2`}>
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <h3 className={`text-lg font-semibold ${iconColor}`}>{label}</h3>
            </div>

            {/* Bullet points */}
            <div className="flex flex-col gap-2">
                {bulletpoints.map((point, index) => (
                    <div key={index} className="flex flex-row items-start gap-3">
                        <div className={`${bgColor} rounded-full p-1 mt-0.5`}>
                            <BulletIcon className={`w-3 h-3 ${iconColor}`} />
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
        <div className="flex flex-col gap-4 rounded-2xl border border-purple-200 bg-purple-100 p-6 shadow-sm">

            <div className="flex flex-row items-center gap-4">
                <Sparkles className="w-5 h-5 text-purple-900" />
                <h3 className="text-lg font-semibold text-purple-900">AI Tip</h3>
            </div>

            <p className="text-sm text-slate-900">{tip}</p>

        </div>
    )
}

export default function StrengthsList({ strengths, weaknesses, tip }: Props) {
    return (
        <div className="flex flex-col gap-4">

            <Section
                label="Top Strengths"
                icon={BriefcaseMedical}
                bulletIcon={CircleCheck}
                bulletpoints={strengths}
                bgColor='bg-green-100'
                iconColor='text-green-500'
            />

            <Section
                label="Top Opportunities"
                icon={Lightbulb}
                bulletIcon={CirclePlus}
                bulletpoints={weaknesses}
                bgColor='bg-yellow-100'
                iconColor='text-yellow-500'
            />

            <AITip tip={tip} />

        </div>
    )
}
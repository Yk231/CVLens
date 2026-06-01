import { LinkedinResult } from '../../types/linkedin'

interface Props {
    data: LinkedinResult
}

export default function ScoreCard({ data }: Props) {

    const score = data.overallScore
    const circumference = 2 * Math.PI * 52
    const offset = circumference - (score / 100) * circumference

    let strokeColor: string
    let badgeColor: string
    let message: string

    if (score >= 80) {
        strokeColor = 'stroke-green-500'
        badgeColor = 'bg-green-100 text-green-700'
        message = 'Good'
    } else if (score >= 60) {
        strokeColor = 'stroke-yellow-500'
        badgeColor = 'bg-yellow-100 text-yellow-700'
        message = 'Decent'
    } else {
        strokeColor = 'stroke-red-500'
        badgeColor = 'bg-red-100 text-red-700'
        message = 'Needs Improvement'
    }

    return (
        <div className="flex flex-row items-center gap-8 rounded-2xl bg-white p-6">

            {/* Circle */}
            <div className="relative flex-shrink-0 flex h-32 w-32 items-center justify-center">
                <svg className="h-32 w-32 -rotate-90 transform" viewBox="0 0 120 120">
                    <circle
                        cx="60" cy="60" r="52"
                        className="fill-none stroke-slate-100"
                        strokeWidth="10"
                    />
                    <circle
                        cx="60" cy="60" r="52"
                        className={`fill-none ${strokeColor}`}
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                    />
                </svg>
                <div className="absolute text-center">
                    <div className="text-3xl font-bold text-slate-900">{score}</div>
                    <div className="text-xs text-slate-400">/100</div>
                </div>
            </div>

            {/* Right side */}
            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-3">
                    <h3 className="text-lg font-bold text-slate-900">Overall Score</h3>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${badgeColor}`}>
                        {message} 
                    </span>
                </div>
                <p className="text-sm leading-6 text-slate-600 max-w-md">
                    {data.summary}
                </p>
            </div>

        </div>
    )
}
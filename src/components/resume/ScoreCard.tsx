import { AnalysisResult } from '../../types/analysis'

interface Props {
    data: AnalysisResult
}

export default function ScoreCard({ data }: Props) {

    const score = data.matchScore
    let strokeColor
    let badgeColor
    let message
    const circumference = 2 * Math.PI * 52;
    const offset = circumference - (data.matchScore / 100) * circumference;

    if (score >= 80) {
        strokeColor = 'stroke-green-500'
        badgeColor = 'text-green-700 bg-green-100'
        message = 'Good match'
    } else if (score >= 60) {
        strokeColor = 'stroke-yellow-500'
        badgeColor = 'text-yellow 700 bg-yellow-100'
        message = 'Decent match'
    } else {
        strokeColor = 'stroke-red-500'
        badgeColor = 'text-red-700 bg-red-100'
        message = 'Needs improvement'
    }

    return (

    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-[250px_1fr_1fr] gap-8 divide-x divide-slate-200">

        {/*Score*/}
        <div className="flex flex-col items-center justify-center pb-6 gap-4">
            
            <h3 className="text-xl font-semibold text-slate-900">Overall Score</h3>

            <div className="relative flex h-32 w-32 items-center justify-center">
                <svg className="h-32 w-32 -rotate-90 transform" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" className="fill-none stroke-slate-100" strokeWidth="10"/>

                <circle
                    cx="60"
                    cy="60"
                    r="52"
                    className={`fill-none ${strokeColor}`}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
                </svg>

                <div className="absolute text-center">
                    <div className="text-3xl font-bold text-slate-900">{data.matchScore}</div>
                    <div className="text-xs text-slate-400">/100</div>
                </div>

            </div>

            <span className={`text-md font-semibold px-3 py-2 rounded-full ${badgeColor}`}>
                {message} 
            </span>
        </div>

        {/*Summary*/}
        <div className="flex flex-col gap-4 pl-10">
            <h3 className="text-xl font-semibold text-slate-900">Summary</h3>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                {data.summary}
            </p>
        </div>

        {/*Missing Keywords*/}
        <div className="flex flex-col gap-4 pl-10">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Missing Keywords</h2>
            <div className="flex flex-wrap gap-2">
            {data.missingKeywords.map(k => (
                <span key={k} className="bg-red-50 text-red-600 border border-red-200
                                        px-3 py-1 rounded-full text-sm font-medium">
                {k}
                </span>
            ))}
            </div>
        </div>
       



      </div>
    </div>
    )
}
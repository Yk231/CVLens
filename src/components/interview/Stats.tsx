import { BowArrow, CircleQuestionMark, Sparkles } from 'lucide-react'

interface Props {
    score: number
}

export default function LinkedInInput({ score }: Props) {
    
    return (
        <div className="grid grid-cols-[600px_1fr] gap-4 p-5 rounded-2xl border border-indigo-100 bg-indigo-50">
            <div className="flex flex-row flex-1 items-center gap-4">
                <Sparkles className="w-auto h-auto text-indigo-500 pb-8" />
                <div className="flex flex-col flex-1">
                    <span className="text-lg font-semibold text-indigo-900">Analysis Complete</span>
                    <span className="text-md text-slate-900">We analyzed the job description and your resume to generate the most relevant questions.</span>
                </div>
            </div>


            <div className="flex justify-end items-center flex-row gap-32 px-16">
                <div className="flex flex-row gap-4 items-center">
                    <div className='bg-indigo-100 rounded-full p-2'>
                        <CircleQuestionMark className='w-8 h-8 text-indigo-500' />
                    </div>

                    <div className="flex flex-col flex-1">
                        <span className="text-2xl font-bold text-slate-900">10</span>
                        <span className="text-md text-slate-500">Most Likely Questions</span>
                    </div>
                </div>

                <div className="flex flex-row gap-4 items-center">
                    <div className='bg-indigo-100 rounded-full p-2'>
                        <BowArrow className='w-8 h-8 text-indigo-500'/>
                    </div>

                    <div className="flex flex-col flex-1">
                        <span className="text-2xl font-bold text-slate-900">{score}%</span>
                        <span className="text-md text-slate-500">Role Match</span>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

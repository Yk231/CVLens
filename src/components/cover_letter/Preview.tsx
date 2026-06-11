import { FileText, Pencil, Lightbulb } from 'lucide-react'

const features = [
    {
        label: 'Personalized introduction',
        subtitle: "Tailored to the company and role you're applying for"
    },
    {
        label: 'Relevant experience',
        subtitle: 'Key achievements and skills from your resume'
    },
    {
        label: "Why you're a great fit",
        subtitle: 'Aligned with the job requirements and company needs'
    },
    {
        label: 'Your unique value',
        subtitle: 'Your motivations and what makes you stand out'
    },
    {
        label: 'Professional closing',
        subtitle: 'A strong call-to-action and closing statement'
    }
]

export default function OutputPreview() {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
            
            <div className="pb-8">
                <span className="text-indigo-700 font-bold text-2xl">3. </span>
                <span className="text-slate-900 font-bold text-2xl">What Will Be Generated</span>
            </div>
            
            <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-5">

                {/* Icon */}
                <div className="flex flex-col items-center text-center gap-4 p-16">
                    <div className="bg-indigo-50 rounded-2xl p-5">
                        <div className="relative">
                            <FileText className="w-12 h-12 text-indigo-400" />
                            <Pencil className="w-5 h-5 text-indigo-600 absolute -bottom-1 -right-2" />
                            <span className="absolute -top-2 -right-3 text-indigo-400 text-lg">✦</span>
                            <span className="absolute top-0 right-2 text-indigo-300 text-xs">✦</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-2xl font-bold text-slate-900">
                            Your personalized cover letter is almost ready!
                        </h3>
                        <p className="text-lg text-slate-500 max-w-lg">
                            Once you add your resume and job description, we'll use AI to craft a compelling cover letter just for you.
                        </p>
                    </div>
                </div>

                <hr className="border-gray-300"></hr>

                {/* Features */}
                <span className="text-lg font-semibold text-slate-700 py-2">Here's what we'll include:</span>

                <div className="flex flex-col">
                    {features.map(({label, subtitle }, index) => (
                        <div key={label} className="flex flex-row items-start gap-4">
                            {/* Step indicator + connector */}
                            <div className="flex flex-col items-center flex-shrink-0">
                                <div className="bg-indigo-50 rounded-full w-12 h-12 flex items-center justify-center">
                                    <span className="text-indigo-600 font-bold text-xl">{index + 1}</span>
                                </div>
                                {index < features.length - 1 && (
                                    <div className="w-px h-8 bg-indigo-100 my-1" />
                                )}
                            </div>
                            {/* Content */}
                            <div className="flex flex-col gap-0.5 pb-6">
                                <span className="text-md font-semibold text-slate-900">{label}</span>
                                <span className="text-md text-slate-400">{subtitle}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Why this works */}
                <div className="bg-slate-50 rounded-xl p-6 flex flex-col gap-1">
                    <span className="text-md font-semibold text-slate-700">Why this approach works</span>
                    <p className="text-md text-slate-500 max-w-xl">
                        We combine your background with the job requirements and your unique insights to create a cover letter that gets noticed.
                    </p>
                </div>

                {/* Tip */}
                <div className="bg-amber-50 rounded-xl border border-amber-100 px-5 py-6 flex flex-row items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-md text-slate-600 max-w-xl">
                        <span className="font-semibold">Tip:</span> The more detail you provide in the inputs, the better and more personalized your cover letter will be.
                    </p>
                </div>

            </div>
        </div>

    )
}

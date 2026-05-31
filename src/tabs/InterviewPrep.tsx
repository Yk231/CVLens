import { useState } from 'react'
import {Copy, ChevronRight, ArrowRight, Info, Star, ArrowLeft, BadgeCheck } from 'lucide-react'
import JobDescInput from '../components/JobDescInput'
import ResumeInput from '../components/ResumeInput'
import Stats from '../components/interview/Stats'

interface QnA {
    question: string
    why: string
    answer: string[]
    keyPoints: string[]
}

interface InterviewResult {
    score: number
    QnA: QnA[]
}

export default function InterviewPrep() {
    const [resume, setResume] = useState('')
    const [jobDesc, setJobDesc] = useState('')
    const [result, setResult] = useState<InterviewResult | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [selectedQuestion, setSelectedQuestion] = useState(0)
    const [copiedAnswer, setCopiedAnswer] = useState(false)
    const [copiedQustion, setCopiedQuestion] = useState(false)

    async function handleAnalyze() {
        if (!resume.trim() || !jobDesc.trim()) {
            setError('Please provide both your resume and a job description')
            return
        }
        setError('')
        setLoading(true)
        setResult(null)

        try {
            const response = await fetch('/api/interview', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resume, jobDesc })
            })
            const data = await response.json()
            setResult(data)
            setSelectedQuestion(0)
        } catch {
            setError('Something went wrong. Try again.')
        } finally {
            setLoading(false)
        }
    }

    function copyAnswer() {
        if (!result) return
        const answer = result.QnA[selectedQuestion].answer.join('\n\n')
        navigator.clipboard.writeText(answer)
        setCopiedAnswer(true)
        setTimeout(() => setCopiedAnswer(false), 2000)
    }
    function copyQuestion() {
        if (!result) return
        const question = result.QnA[selectedQuestion].question
        navigator.clipboard.writeText(question)
        setCopiedQuestion(true)
        setTimeout(() => setCopiedAnswer(false), 2000)
    }

    const currentQ = result?.QnA[selectedQuestion]

    return (
        <div className="flex flex-col gap-6">

            {/* Header */}
            <div className="flex flex-row items-start justify-between">
                <div className="flex flex-col gap-1">
                    <h2 className="text-4xl font-bold text-slate-900">Interview Prep</h2>
                    <p className="text-xl text-slate-500">Get ready for your next interview with AI-generated questions and suggested answers tailored to the job.</p>
                </div>
                {result && (
                    <button
                        onClick={() => { setResult(null); setResume(''); setJobDesc(''); setError('') }}
                        className="text-white bg-indigo-500 
                                    px-4 py-3 text-white font-semibold rounded-xl transition-colors"
                        >
                        New Session
                    </button>
                )}
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-2 gap-6">
                <ResumeInput onChange={setResume} />
                <JobDescInput value={jobDesc} onChange={setJobDesc} />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Analyze Button */}
            {!result && (
                <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50
                               text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Generating questions...
                        </>
                    ) : (
                        'Generate Interview Questions'
                    )}
                </button>
            )}

            {/* Results */}
            {result && (
                <>
                    {/* Stats Bar */}
                    <Stats score={result.score}/>

                    {/* Questions + Answer Panel */}
                    <div className="grid grid-cols-[1fr_1.5fr] gap-4">

                        {/* Question List */}
                        <div className="flex flex-col gap-4 bg-white rounded-2xl border border-slate-200 p-6">
                            <h3 className="text-xl font-semibold text-slate-700 mb-1">Top 10 Most Likely Questions</h3>
                            {result.QnA.map((q, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedQuestion(i)}
                                    className={`flex flex-row items-center gap-3 px-4 py-3 rounded-xl border text-left transition-colors ${
                                        selectedQuestion === i
                                            ? 'border-indigo-200 bg-indigo-50'
                                            : 'border-slate-200 bg-white hover:border-indigo-100 hover:bg-slate-50'
                                    }`}
                                >
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                                        selectedQuestion === i
                                            ? 'bg-indigo-500 text-white border-indigo-500'
                                            : 'bg-indigo-100 text-indigo-500'
                                    }`}>
                                        {i + 1}
                                    </div>

                                    <span className={`text-sm flex-1 ${selectedQuestion === i ? 'font-medium text-slate-900' : 'text-slate-600'}`}>
                                        {q.question}
                                    </span>

                                    <ChevronRight className={`w-4 h-4 flex-shrink-0 ${selectedQuestion === i ? 'text-indigo-400' : 'text-slate-300'}`} />
                                </button>
                            ))}
                        </div>

                        {/* Answer Panel */}
                        {currentQ && (
                            <div className="flex flex-col gap-4 bg-white rounded-2xl border border-slate-200 p-10">

                                {/* Navigation */}
                                <div className="flex flex-row items-center justify-between">
                                    <span className="text-sm text-slate-500 font-medium">Question {selectedQuestion + 1} of {result.QnA.length}</span>
                                    <div className="flex flex-row items-center gap-5">
                                        {selectedQuestion > 0 && (
                                            <button
                                                onClick={() => setSelectedQuestion(i => i - 1)}
                                                className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 font-medium"
                                            >
                                                <ArrowLeft className="w-3 h-3" /> Previous Question
                                            </button>
                                        )}
                                        {selectedQuestion < result.QnA.length - 1 && (
                                            <button
                                                onClick={() => setSelectedQuestion(i => i + 1)}
                                                className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 font-medium"
                                            >
                                                Next Question <ArrowRight className="w-3 h-3" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="flex flex-row items-center justify-between">
                                    <h3 className="text-xl font-bold text-slate-900">{currentQ.question}</h3>
                                    <button
                                        onClick={copyQuestion}
                                        className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 flex-shrink-0"
                                    >
                                        <Copy className="w-4 h-4" />
                                        {copiedQustion ? 'Copied!' : 'Copy Question'}
                                    </button>
                                </div>

                                {/* Why asked */}
                                <div className="flex flex-row gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <Info className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-0.5" />
                                    <div className="max-w-2xl">
                                        <span className="text-xs font-semibold text-slate-600">Why this question?</span>
                                        <p className="text-sm text-slate-500 mt-0.5">{currentQ.why}</p>
                                    </div>

                                </div>

                                {/* Suggested Answer */}
                                <div className="flex flex-col gap-3 py-5">
                                    <div className="flex flex-row items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Star className="w-5 h-5 text-green-700" />
                                            <span className="text-md font-semibold text-green-700">Suggested Answer</span>
                                        </div>
                                        <button
                                            onClick={copyAnswer}
                                            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600"
                                        >
                                            <Copy className="w-4 h-4" />
                                            {copiedAnswer ? 'Copied!' : 'Copy Answer'}
                                        </button>
                                    </div>

                                    {/* Paragraphs */}
                                    <div className="flex flex-col gap-3 max-w-3xl">
                                        {currentQ.answer.map((paragraph, i) => (
                                            <p key={i} className="text-sm text-slate-700 leading-relaxed">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                {/* Key Points */}
                                {currentQ.keyPoints && currentQ.keyPoints.length > 0 && (
                                    <div className="mt-auto flex flex-col gap-3 p-4 rounded-xl bg-amber-50 border border-amber-100">
                                        <span className="text-sm font-semibold text-amber-600">Key Points This Answer Covers</span>
                                        <div className="grid grid-cols-2 gap-2">
                                            {currentQ.keyPoints.map((point, i) => (
                                            <div key={i} className="flex items-start gap-2">
                                                <BadgeCheck className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-sm text-slate-700">{point}</span>
                                            </div>
                                            ))}
                                        </div>
                                    </div>
                                )}


                            </div>
                        )}
                    </div>
                </>
            )}

        </div>
    )
}
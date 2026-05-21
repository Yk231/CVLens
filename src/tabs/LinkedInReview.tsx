import { useState } from 'react'
import LinkedinInput from '../components/linkedin/LinkedinInput'
import LoadingState from '../components/linkedin/LoadingState'
import ScoreCard from '../components/linkedin/ScoreCard'
import Sections from '../components/linkedin/Sections'
import StrengthsList from '../components/linkedin/StrengthsList'
import { analyzeLinkedin } from '../lib/linkedin'
import { LinkedinResult } from '../types/linkedin'
import ProfileOverview from '../components/linkedin/ProfileOverview'

export default function LinkedInReview() {
    const [profile, setProfile] = useState('')
    const [result, setResult] = useState<LinkedinResult | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleAnalyze() {
        if (!profile || !profile.trim()) {
            setError('Please paste your LinkedIn profile text')
            return
        }
        setError('')
        setLoading(true)
        setResult(null)
        try {
            const analysis = await analyzeLinkedin(profile)
            setResult(analysis)
        } catch {
            setError('Something went wrong. Try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col gap-6">

            <div className="flex flex-row items-center justify-between">

           
                <div className="flex flex-col gap-1">
                    <h2 className="text-4xl font-bold text-slate-900">LinkedIn Review</h2>
                    <p className="text-xl text-slate-500">Get AI-powered feedback to improve your LinkedIn profile and make a stronger impression.</p>
                </div>

                <div className="justify-end">
                    {result && (
                        <button
                            onClick={() => {
                                setResult(null)
                                setProfile('')
                                setError('')
                            }}
                            className="text-white bg-indigo-500 
                                    px-4 py-3 text-white font-semibold rounded-xl transition-colors"
                        >
                            New Analysis
                        </button>
                    )}
                </div>

            </div>


            
            {/* Input */}
            <LinkedinInput onChange={setProfile} />
            
            {/* Error */}
            {error && (
                <p className="text-red-500 text-sm">{error}</p>
            )}

            {/* Analyze button */}
            <button
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full bg-indigo-500 disabled:opacity-50
                           text-white font-semibold py-3 rounded-xl transition-colors"
            >
                {loading ? 'Analyzing...' : 'Analyze Profile'}
            </button>

            {/* Loading */}
            {loading && <LoadingState />}

            {/* Results */}
            {result && !loading && (
                <div className="flex flex-col gap-6">
                    
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="grid gap-6 md:grid-cols-[500px_1fr]">
                            <ProfileOverview data={result}/>
                            <div className="flex justify-end">
                                <ScoreCard data={result} />
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-[1fr_400px]">
                        <Sections
                            sectionScores={result.sectionScores}
                            sectionSummaries={result.sectionSummaries}
                        />
                        <div className="flex justify-end">
                            <StrengthsList
                                strengths={result.strengths}
                                weaknesses={result.improvements}
                                tip={result.tip}
                            />
                        </div>
                    </div>

                    
                    
                </div>
            )}

        </div>
    )
}
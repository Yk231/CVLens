import { useState } from 'react'
import LinkedinInput from '../components/linkedin/LinkedinInput'
import ScoreCard from '../components/linkedin/ScoreCard'
import Sections from '../components/linkedin/Sections'
import StrengthsList from '../components/linkedin/StrengthsList'
import { analyzeLinkedin } from '../lib/linkedin'
import { LinkedinResult } from '../types/linkedin'
import ProfileOverview from '../components/linkedin/ProfileOverview'
import AnalyzeButton from '../components/AnalyzeButton'
import Header from '../components/Header'



export default function LinkedInReview() {
    const [profile, setProfile] = useState('')
    const [result, setResult] = useState<LinkedinResult | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [sessionKey, setSessionKey] = useState(0)

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

                <Header 
                    title="LinkedIn Review" 
                    subtitle="Get AI-powered feedback to improve your LinkedIn profile and make a stronger impression."
                />
                

                <div className="justify-end">
                    {result && (
                        <button
                            onClick={() => {
                                setResult(null)
                                setProfile('')
                                setError('')
                                setSessionKey(k => k + 1) 
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
            <LinkedinInput key={sessionKey} onChange={setProfile} />
            
            {/* Error */}
            {error && <p className="text-red-500 text-sm">{error}</p>}


            {/* Analyze Button */}
            <AnalyzeButton
                idleMessage = "Analyze profile "
                loadingMessage = "Analyzing..."
                loading = {loading}
                requiredFields={[profile]}
                onClick={handleAnalyze}
            />


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
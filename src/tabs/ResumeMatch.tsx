import { useState } from 'react'
import JobDescInput from '../components/JobDescInput'
import ResumeInput from '../components/ResumeInput'
import ScoreCard from '../components/resume/ScoreCard'
import StrengthsList from '../components/resume/StrengthsList'
import RewriteSuggestions from '../components/resume/RewriteSuggestions'
import LoadingState from '../components/resume/LoadingState'
import { analyzeResume } from '../lib/analyze'
import { AnalysisResult } from '../types/analysis'

export default function ResumeReview() {
  const [resume, setResume] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleAnalyze() {
    if (!resume || !resume.trim() || !jobDesc.trim()) {
        setError('Please upload a resume and paste a job description')
        return
    }
    setError('')
    setLoading(true)
    setResult(null)
    try {
      const analysis = await analyzeResume(resume, jobDesc)
      setResult(analysis)
    } catch {
      console.error('Analysis error:', error)
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">

      <div className="flex flex-row items-center justify-between">

           
        <div className="flex flex-col gap-1">
            <h2 className="text-4xl font-bold text-slate-900">Job Match Analysis</h2>
            <p className="text-xl text-slate-500">See how well your resume matches the job description and get Al-powered insights.</p>
        </div>

        <div className="justify-end">
          {result && (
            <button
              onClick={() => {
                  setResult(null)
                  setResume('')
                  setJobDesc('')
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

      <div className="grid grid-cols-2 gap-6 mb-6">
        <ResumeInput onChange={setResume} />
        <JobDescInput value={jobDesc} onChange={setJobDesc} />
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="w-full bg-indigo-500 disabled:opacity-50
                   text-white font-semibold py-3 rounded-xl transition-colors"
      >
        {loading ? 'Analyzing...' : 'Analyze Resume'}
      </button>

      {loading && <LoadingState />}

      {result && !loading && (
        <div className="flex flex-col gap-8">
                <ScoreCard data={result} />
                <StrengthsList
                    strengths={result.strengths}
                    weaknesses={result.weaknesses}
                    tip={result.tip}
                />
                <RewriteSuggestions suggestions={result.rewriteSuggestions} />
            </div>
      )}
    </div>
  )
}
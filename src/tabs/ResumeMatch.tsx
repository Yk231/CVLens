import { useState } from 'react'
import { JobDescInput1 }  from '../components/JobDescInput'
import { ResumeInput1 }  from '../components/ResumeInput'
import ScoreCard from '../components/resume/ScoreCard'
import StrengthsList from '../components/resume/StrengthsList'
import RewriteSuggestions from '../components/resume/RewriteSuggestions'
import { AnalysisResult } from '../types/analysis'
import AnalyzeButton from '../components/AnalyzeButton'
import Header from '../components/Header'
import BookmarkButton from '../components/bookmarks/BookmarkButton'
import { useAppContext } from '../context/AppContext'


export default function ResumeReview() {
  const { bookmarkData } = useAppContext()
  const [result, setResult] = useState(bookmarkData?.result ?? null)
  const [resume, setResume] = useState(bookmarkData?.inputs.resume ?? '')
  const [jobDesc, setJobDesc] = useState(bookmarkData?.inputs.jobDesc ?? '')
  
  const [resumeName, setResumeName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sessionKey, setSessionKey] = useState(0)

  async function handleAnalyze() {
    if (!resume || !resume.trim() || !jobDesc.trim()) {
        setError('Please upload a resume and paste a job description')
        return
    }
    setError('')
    setLoading(true)
    setResult(null)
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume, jobDesc, resumeName })
      })
      const data = await response.json()
      setResult(data)
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

        <Header 
          title="Resume Match Analysis" 
          subtitle="See how well your resume matches the job description and get Al-powered insights."
        />

        <div className="justify-end">
          {result && (
            <BookmarkButton
              type="resume_match"
              inputs={{ resume, jobDesc,  }}
              result={result}
            />
          )}
        </div>

      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <ResumeInput1  key={sessionKey} onChange={setResume} setFileName={setResumeName} />
        <JobDescInput1 value={jobDesc} onChange={setJobDesc} />
      </div>


      {/* Analyze Button */}
      <AnalyzeButton
          idleMessage = "Analyze Match"
          loadingMessage = "Analyzing..."
          loading = {loading}
          requiredFields={[resume, jobDesc]}
          onClick={handleAnalyze}
      />

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

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
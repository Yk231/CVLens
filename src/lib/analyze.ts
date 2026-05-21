import { AnalysisResult } from '../types/analysis'

export async function analyzeResume(
    resume: string,
    jobDesc: string
): Promise<AnalysisResult> {
    const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume, jobDesc })
    })


    const data = await response.json()
    console.log('API response:', data)

    //if (!response.ok) throw new Error('Analysis failed')
    if (!response.ok) throw new Error(data.error || 'Analysis failed')


    return data as AnalysisResult

}

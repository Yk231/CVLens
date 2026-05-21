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
    console.log('Full API response:', JSON.stringify(data))

    if (!response.ok) throw new Error(data.error || data.message || 'Analysis failed')

    return data as AnalysisResult

}

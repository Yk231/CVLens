import { interviewPrep } from '../types/interview'

export async function generateQuestions(
    resume: string,
    jobDesc: string
): Promise<interviewPrep> {
    const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume, jobDesc })
    })


    const data = await response.json()
    console.log('Full API response:', JSON.stringify(data))

    if (!response.ok) throw new Error(data.error || data.message || 'Analysis failed')

    return data as interviewPrep

}

import { CoverLetter } from '../types/coverLetter'

export async function writeCoverLetter(
    resume: string,
    jobDesc: string
): Promise<CoverLetter> {
    const response = await fetch('/api/coverLetter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume, jobDesc })
    })


    const data = await response.json()
    console.log('Full API response:', JSON.stringify(data))

    if (!response.ok) throw new Error(data.error || data.message || 'Analysis failed')

    return data as CoverLetter

}

import { LinkedinResult } from '../types/linkedin'

export async function analyzeLinkedin(
  profile: string
): Promise<LinkedinResult> {
  const response = await fetch('/api/linkedin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profile })
  })

  const data = await response.json()
  console.log('LinkedIn API response:', data)

  if (!response.ok) throw new Error(data.error || 'Analysis failed')

  return data as LinkedinResult
}
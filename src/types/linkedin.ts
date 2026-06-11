export interface LinkedinResult {
  overallScore: number
  summary: string
  sectionScores: {
    headline: number
    about: number
    experience: number
    skills: number
    education: number
  }
  sectionSummaries: {
    headline: string
    about: string
    experience: string
    skills: string
    education: string
  }
  strengths: string[]
  improvements: string[]
  tip: string

  name: string
  headline: string
  location: string
  link: string
  fileName: string
  type: string
}
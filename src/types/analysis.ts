export interface AnalysisResult {
  matchScore: number
  missingKeywords: string[]
  strengths: string[]
  weaknesses: string[]
  rewriteSuggestions: {
    before: string
    after: string
  }[]
  summary: string
  sectionScores:{
    skills: number
    experience: number
    keywords: number
  }
  generalTip: string
  targetRole: string
  targetCompany: string
  fileName: string
  type: string
}
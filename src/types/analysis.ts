export interface AnalysisResult {
  matchScore: number
  missingKeywords: string[]
  strengths: string[]
  weaknesses: string[]
  rewriteSuggestions: {
    original: string
    improved: string
  }[]
  summary: string
  tip: string
}
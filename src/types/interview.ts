export interface interviewPrep {
  score: number
  QnA: {
    question: string
    why: string
    answer: string[]
    keyPoints: string[]
  }[]
  targetRole: string
  targetCompany: string
  fileName: string
  type: string
}
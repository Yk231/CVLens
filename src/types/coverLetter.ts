export interface CoverLetter {
  traditional: boolean
  targetRole: string
  targetCompany: string
  fileName: string
  type: string


  // your information
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string

  date: string
  
  // company information
  hiringManager: string
  hiringManagerRole: string
  companyAddress: string
  companyCity: string
  companyState: string
  companyZip: string

  paragraphs: string[]
}
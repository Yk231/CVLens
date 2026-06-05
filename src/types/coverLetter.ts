export interface CoverLetter {
  traditional: boolean

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
  companyName: string
  companyAddress: string
  companyCity: string
  companyState: string
  companyZip: string

  paragraphs: string[]
}
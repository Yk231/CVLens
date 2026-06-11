const OpenAI = require('openai')

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

module.exports = async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).end()

  const { 
    resume, jobDesc, resumeName,
    tone, length, additionalInfo, format,
    hiringManager, hiringManagerRole, 
    address, city, state, zip
  } = req.body

  if (!resume || !jobDesc) {
    return res.status(400).json({ error: 'Missing resume or job description' })
  }

  try {
      const response = await client.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
              {
                  role: 'system',
                  content: `You are an expert cover letter writer and career coach with 15+ years of experience 
                            helping candidates land jobs at top companies.
                            Note: the resume text may have extra spaces or formatting artifacts from PDF extraction — ignore these and focus on the content.
                            Write a compelling, personalized cover letter based on the resume and job description provided.
                            
                            Guidelines:
                            - Tone: ${tone || 'professional'}
                            - Length: ${length || 'standard'} (short = ~150 words, standard = ~300 words, detailed = ~450 words, exlcuding the header)
                            - Additional info: ${additionalInfo || ''} 
                            - Open with a strong hook that references the specific company and role
                            - Reference specific achievements and skills from the resume that match the job description
                            - Use key words from the job description
                            - Show genuine enthusiasm for the company and role
                            - Close with a clear call to action
                            - Do NOT use generic phrases like "I am writing to apply" or "I believe I would be a great fit"
                            - Do NOT include placeholders like [Your Name] or [Date]
                            - Write as if you are the candidate speaking in first person
                            
                            Respond ONLY with valid JSON in exactly this format:
                            {
                              "name": string
                              "email": string
                              "phone": string
                              "address": string
                              "city": string
                              "state": string
                              "zip": string
                              "targetCompany": string
                              "targetRole": string
                              "paragraphs": string[]
                            }`
              },
              {
                  role: 'user',
                  content: `RESUME:\n${resume}\n\nJOB DESCRIPTION:\n${jobDesc}`
              }
          ],
          response_format: { type: 'json_object' }
      })

      const result = JSON.parse(response.choices[0].message.content!)

      result.traditional = format === "Traditional Business Letter"
      result.date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      result.hiringManager = hiringManager || ''
      result.hiringManagerRole = hiringManagerRole || ''
      result.companyAddress = address || ''
      result.companyCity = city || ''
      result.companyState = state || ''
      result.companyZip = zip || ''
      result.type = "coverLetter"
      result.fileName = resumeName

    
      res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: String(error) })
  }
}
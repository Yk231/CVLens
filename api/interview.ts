const OpenAI = require('openai')

// Create the OpenAI client using API key
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

module.exports = async function handler(req: any, res: any) {
    // Only allow POST requests
    if (req.method !== 'POST') return res.status(405).end()

    // Separate the request into resume and job description
    const { resume, jobDesc } = req.body

    if (!resume || !jobDesc) {
        return res.status(400).json({ error: 'Missing resume or job description' })
    }

    try {
        const response = await client.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
            {
                role: 'system',
                content: `Act a senior recruiter for the exact company in the given job description. 
                        Given the job description and the resume, give exactly 10 questions you are most likely going to ask.
                        Also give why each question might be asked, the suggested answers to each question (make them lengthy), and the key points the answer covers
                        Finally, give a match score between the resume and job description
                        The first several questions should be general (Ex. tell me about yourself, why are you interested in this role, do you have any questions for us).
                        Note: the resume text may have extra spaces or formatting artifacts from PDF
                        Respond ONLY with valid JSON in exactly this format:
                        {
                          "score": a number 0-100, 
                          "QnA"[
                            {
                            "question": string
                            "why": string
                            "answer": array of strings (store each paragraph as its own string, if necessary)
                            "keyPoints": array of strings 
                            }
                          ]
                        }
                        QnA must contain exactly 10 items`
                        
            },
            {
                role: 'user',
                content: `RESUME:\n${resume}\n\nJOB DESCRIPTION:\n${jobDesc}`
            }
            ],
            response_format: { type: 'json_object' }
        })

        const result = JSON.parse(response.choices[0].message.content!)
        res.status(200).json(result)
    }  catch (error) {
        console.error('Full error:', error)
        res.status(500).json({ 
        error: String(error),
        message: error instanceof Error ? error.message : 'Unknown error'
    })
}
}
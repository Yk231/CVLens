const OpenAI = require('openai')

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

module.exports = async function handler(req: any, res: any) {
    
    if (req.method !== 'POST') return res.status(405).end()

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
                        Analyze the resume against the job description thoroughly.
                        Assume there are hundreds of applicants for one position, so don't be afraid to be harsh and realistic.
                        Note: the resume text may have extra spaces or formatting artifacts from PDF
                        Respond ONLY with valid JSON in exactly this format:
                        {
                            "matchScore": a score between 0-100,
                            "missingKeywords": array of strings (top 5 missing keywords),
                            "strengths": array of strings,
                            "weaknesses": array of strings (red flags a hiring manager would spot in under 15 seconds),
                            "rewriteSuggestions": array of { "original": string, "improved": string },
                            "summary": string (2-3 sentences)
                            "tip": one general resume tip
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
        res.status(200).json(result)
    }  catch (error) {
        console.error('Full error:', error)
        res.status(500).json({ 
        error: String(error),
        message: error instanceof Error ? error.message : 'Unknown error'
    })
}
}
import OpenAI from 'openai'

// Create the OpenAI client using API key
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export default async function handler(req: any, res: any) {
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
                content: `You are an expert resume coach and recruiter with 10+ years of experience.
                        Analyze the resume against the job description thoroughly. 
                        Assume there are hundreds of applicants, so be harsh.
                        Note: the resume text may have extra spaces or formatting artifacts from PDF
                        Respond ONLY with valid JSON in exactly this format:
                        {
                            "matchScore": number between 0-100,
                            "missingKeywords": array of strings,
                            "strengths": array of strings,
                            "weaknesses": array of strings,
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
    } catch (error) {
        console.error(error)
        //res.status(500).json({ error: 'Analysis failed' })
        res.status(500).json({ error: String(error) })
    }
}
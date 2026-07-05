const OpenAI = require('openai')

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

module.exports = async function handler(req: any, res: any) {
    
    if (req.method !== 'POST') return res.status(405).end()

    const { excerpt, jobDesc } = req.body

    if (!excerpt || !jobDesc) {
        return res.status(400).json({ error: 'Missing excerpt or job description' })
    }

    try {
        const response = await client.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
            {
                role: 'system',
                content: `You are rewriting a specific excerpt from a resume to better align with the target job description.

                        ORIGINAL EXCERPT:
                        ${excerpt}

                        JOB DESCRIPTION:
                        ${jobDesc}

                        Rewrite the excerpt to:
                        - Incorporate relevant keywords and terminology directly from the job description
                        - Use strong action verbs
                        - Keep roughly the same length as the original
                        - Preserve the factual content — do not invent achievements, metrics, or responsibilities not implied by the original
                        - Match the tone of a professional resume bullet point (concise, no filler words)
 
                        Respond ONLY with valid JSON in exactly this format:
                        {
                            "rewritten": string,
                            "explanation": string (explain why you made the changes you did)
                        }`
                        
            },
            {
                role: 'user',
                content: `EXCERPT:\n${excerpt}\n\nJOB DESCRIPTION:\n${jobDesc}`
            }
            ],
            response_format: { type: 'json_object' }
        })

        const result = JSON.parse(response.choices[0].message.content!)
        res.status(200).json(result)

    }  catch (error) {
        res.status(500).json({ 
        error: String(error),
        message: error instanceof Error ? error.message : 'Unknown error'
    })
}
}
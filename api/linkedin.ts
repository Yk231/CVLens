const OpenAI = require('openai')

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

module.exports = async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).end()

  const { profile } = req.body

  if (!profile) {
    return res.status(400).json({ error: 'Missing LinkedIn profile' })
  }

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert LinkedIn coach with 10+ years of experience 
                    helping professionals optimize their profiles.
                    You have looked at thousands of impressive profiles, so be harsh.
                    Note: the LinkedIn text may have extra spaces or formatting artifacts from PDF
                    Analyze the LinkedIn profile text and respond ONLY with valid JSON:
                    {
                      "overallScore": number between 0-100,
                      "summary": string (2-3 sentence overall assessment),
                      "sectionScores": {
                        "headline": number between 0-100,
                        "about": number between 0-100,
                        "experience": number between 0-100,
                        "skills": number between 0-100,
                      },
                      "sectionSummaries": {
                        "headline": string (1-2 sentences, including constructive criticism if necessary),
                        "about": string,
                        "experience": string,
                        "skills": string,
                      },
                      "strengths": array of strings,
                      "improvements": array of strings
                      "tip": string (one general linkedin tip)

                      "name": string (person's full name)
                      "headline": string (their headline; taken directly from the headline section)
                      "location": string (their city and state; taken direction from the headline section)
                      "link": string (their profile URL)
                    }`
        },
        {
          role: 'user',
          content: `LINKEDIN PROFILE:\n${profile}`
        }
      ],
      response_format: { type: 'json_object' }
    })

    const result = JSON.parse(response.choices[0].message.content!)
    res.status(200).json(result)
  } catch (error) {
    console.error('Full error:', error)
    res.status(500).json({ error: String(error) })
  }
}
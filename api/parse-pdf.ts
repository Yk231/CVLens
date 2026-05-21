import formidable from 'formidable'
import fs from 'fs'

export const config = { api: { bodyParser: false } }

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') return res.status(405).end()

    try {
        const form = formidable()
        const [, files] = await form.parse(req)
        const file = files.file?.[0]

        if (!file) return res.status(400).json({ error: 'No file' })

        const PDFParser = require('pdf2json')
        const pdfParser = new PDFParser()

        const text = await new Promise<string>((resolve, reject) => {
            pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
                const text = pdfData.Pages.map((page: any) =>
                    page.Texts.map((t: any) =>
                        decodeURIComponent(t.R.map((r: any) => r.T).join(''))
                    ).join(' ')
                ).join('\n')
                resolve(text)
            })

            pdfParser.on('pdfParser_dataError', (err: any) => {
                reject(err)
            })

            pdfParser.loadPDF(file.filepath)
        })

        console.log('Extracted text length:', text.length)
        console.log('Sample:', text.substring(0, 200))
        res.status(200).json({ text })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: String(error) })
    }
}
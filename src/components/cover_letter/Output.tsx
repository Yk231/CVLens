import { useState } from 'react'
import { RefreshCw, Copy, Check } from 'lucide-react'
import CoverLetterEditor from './CoverLetterEditor'

interface CoverLetter {
    traditional: boolean
    targetRole: string
    targetCompany: string

    name: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zip: string

    date: string

    hiringManager: string
    hiringManagerRole: string
    companyAddress: string
    companyCity: string
    companyState: string
    companyZip: string

    paragraphs: string[]
}

interface Props {
    result: CoverLetter
    onRegenerate: () => void
    canRegenerate: boolean
}

export default function CoverLetterOutput({ result, onRegenerate, canRegenerate }: Props) {

    let header = []
    if(result.traditional){
        header = [
            `<p>${result.name}</p>`,
            `<p>${result.address}</p>`,
            `<p>${result.city}, ${result.state} ${result.zip}</p>`,
            `<p>${result.phone}</p>`,
            `<p>${result.email}</p>`,
            `<p></p>`,
            `<p>${result.date}</p>`,
            `<p></p>`,
            result.hiringManager ? `<p>${result.hiringManager}</p>` : '',
            result.hiringManagerRole ? `<p>${result.hiringManagerRole}</p>` : '',
            `<p>${result.targetCompany}</p>`,
            `<p>${result.companyAddress}</p>`,
            `<p>${result.companyCity}, ${result.companyState} ${result.companyZip}</p>`,
            `<p></p>`,
            result.hiringManager ? `<p>Dear ${result.hiringManager}:</p>` : 'Dear Hiring Manager:',
            `<p></p>`,
        ]
    }
    else{
        header = [
            `<p>${result.name}</p>`,
            `<p>${result.email} | ${result.phone}</p>`,
            `<p></p>`,
            `<p>${result.date}</p>`,
            `<p></p>`,
            result.hiringManager ? `<p>Dear ${result.hiringManager},</p>` : 'Dear Hiring Manager,',
            `<p></p>`,
        ]
    }

    const initialContent = [
        header.join(''),
        ...result.paragraphs.map(p => `<p>${p}</p><p></p>`),
        `<p>Sincerely,</p>`,
        `<p>${result.name}</p>`
    ].join('')

    const [editedContent, setEditedContent] = useState(initialContent)
    const [copied, setCopied] = useState(false)

    const [regenerating, setRegenerating] = useState(false)

    async function handleRegenerate() {
        setRegenerating(true)
        await onRegenerate()
        setRegenerating(false)
    }

    function copyToClipboard() {
        const text = editedContent.replace(/<[^>]*>/g, '\n').replace(/\n+/g, '\n').trim()
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="flex flex-col gap-8 bg-white rounded-2xl border border-slate-200 p-4">

            {/* Header */}
            <div className="flex flex-row items-center justify-between">
                <span className="text-indigo-700 font-bold text-2xl">Your Cover Letter</span>
                <button
                    onClick={handleRegenerate}
                    disabled={regenerating || !canRegenerate}
                    className="flex items-center gap-2 text-sm text-indigo-600 border border-indigo-200 font-semibold
                            px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                    <RefreshCw className={`w-3.5 h-3.5 ${regenerating ? 'animate-spin' : ''}`} />
                    {regenerating ? 'Regenerating...' : 'Regenerate'}
                </button>
            </div>

            {/* Letter */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">

                <CoverLetterEditor
                    content={editedContent}
                    onChange={setEditedContent}
                />

            </div>

            {/* Footer */}
            <div className="flex flex-row items-center justify-end gap-2">
                <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 text-sm text-indigo-600 border border-indigo-200 font-semibold
                                px-4 py-2 rounded-lg hover:bg-white transition-colors"
                >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
            </div>

        </div>
    )
}
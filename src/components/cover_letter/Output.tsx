import { useState } from 'react'
import { RefreshCw, Copy, Check, Download } from 'lucide-react'
import html2pdf from 'html2pdf.js'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Bold, Italic, Underline, Undo2, Redo2 } from 'lucide-react'

   
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

    const editor = useEditor({
        extensions: [StarterKit],
        content: editedContent,
        onUpdate: ({ editor }) => {
            setEditedContent(editor.getText())
        }
    })

    function downloadAsPdf() {
        const wrapper = document.createElement('div')
        wrapper.style.fontFamily = 'Times New Roman, Times, serif'
        wrapper.style.fontSize = '11pt'
        wrapper.style.paddingBottom = '60px'
        wrapper.innerHTML = editor!.getHTML().replace(/<p><\/p>/g, '<p>&nbsp;</p>')

        document.body.appendChild(wrapper)

        html2pdf()
            .set({
                margin: [0.75, 0.75, 0.75, 0.75],
                filename: 'cover-letter.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            })
            .from(wrapper)
            .save()
            .then(() => document.body.removeChild(wrapper))
    }

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

                <div className="border border-slate-200 rounded-xl overflow-hidden">

                    {/* Toolbar */}
                    <div className="flex flex-row items-center gap-1 px-3 py-2 border-b border-slate-100 bg-slate-50">
                        <button
                            onClick={() => editor.chain().focus().undo().run()}
                            className={`p-1.5 rounded hover:bg-slate-200 transition-colors ${editor.isActive('bold') ? 'bg-slate-200' : ''}`}
                        >
                            <Undo2 className="w-6 h-6 text-slate-600" />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().redo().run()}
                            className={`p-1.5 rounded hover:bg-slate-200 transition-colors ${editor.isActive('bold') ? 'bg-slate-200' : ''}`}
                        >
                            <Redo2 className="w-6 h-6 text-slate-600" />
                        </button>

                        <div className="w-px h-6 bg-slate-200" />

                        <button
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={`p-1.5 rounded hover:bg-slate-200 transition-colors ${editor.isActive('bold') ? 'bg-slate-200' : ''}`}
                        >
                            <Bold className="w-6 h-6 text-slate-600" />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={`p-1.5 rounded hover:bg-slate-200 transition-colors ${editor.isActive('italic') ? 'bg-slate-200' : ''}`}
                        >
                            <Italic className="w-6 h-6 text-slate-600" />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            className={`p-1.5 rounded hover:bg-slate-200 transition-colors ${editor.isActive('italic') ? 'bg-slate-200' : ''}`}
                        >
                            <Underline className="w-6 h-6 text-slate-600" />
                        </button>

                    </div>

                    {/* Editor */}
                    <EditorContent
                        editor={editor}
                        className="p-6 min-h-64 text-sm text-slate-800 leading-relaxed focus:outline-none prose prose-sm max-w-none"
                    />
                </div>

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


                    
                <button onClick={downloadAsPdf} 
                        className="flex items-center gap-2 text-sm text-indigo-600 border border-indigo-200 font-semibold
                                px-4 py-2 rounded-lg hover:bg-white transition-colors"
                >
                    <Download className="w-4 h-4" />
                    Download PDF
                </button>

            </div>

        </div>
    )
}
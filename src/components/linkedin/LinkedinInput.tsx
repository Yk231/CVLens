import { useRef, useState } from 'react'
import { FileText } from 'lucide-react'

interface Props {
    onChange: (val: string) => void
}

export default function ResumeInput({ onChange }: Props) {
    const [uploading, setUploading] = useState(false)
    const [fileName, setFileName] = useState('')
    const fileRef = useRef<HTMLInputElement>(null)

    async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        setFileName(file.name)

        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await fetch('/api/parse-pdf', {
                method: 'POST',
                body: formData
            })
            const { text } = await res.json()
            onChange(text)
        } catch {
            alert('Failed to parse PDF.')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <label className="font-semibold text-slate-700">Your LinkedIn Profile</label>

            <div
                onClick={() => fileRef.current?.click()}
                className="h-72 border-2 border-dashed border-slate-200 rounded-xl
                           flex flex-col items-center justify-center gap-3
                           cursor-pointer hover:border-indigo-400 hover:bg-indigo-50
                           transition-colors"
            >
                <input
                    ref={fileRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFile}
                    className="hidden"
                />

                {uploading ? (
                    <>
                        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-sm text-slate-500">Parsing PDF...</p>
                    </>
                ) : fileName ? (
                    <>
                        <FileText className="w-10 h-10 text-indigo-500" />
                        <p className="text-sm font-medium text-slate-700">{fileName}</p>
                        <p className="text-xs text-slate-400">Click to replace</p>
                    </>
                ) : (
                    <>
                        <FileText className="w-10 h-10 text-slate-300" />
                        <p className="text-sm font-medium text-slate-600">Click to upload your LinkedIn Profile</p>
                        <p className="text-xs text-slate-400">PDF files only.</p>
                    </>
                )}
            </div>
        </div>
    )
}
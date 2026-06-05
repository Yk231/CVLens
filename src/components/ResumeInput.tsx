import { useRef, useState } from 'react'
import { FileInput, FileText, X } from 'lucide-react'
import { parsePdf } from '../lib/parsePdf'


interface Props1 {
    onChange: (val: string) => void
}

export function ResumeInput1({ onChange }: Props1) {
    const [uploading, setUploading] = useState(false)
    const [fileName, setFileName] = useState('')
    const fileRef = useRef<HTMLInputElement>(null)


    async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        setFileName(file.name)

        try {
            const text = await parsePdf(file)
            console.log('Parsed text length:', text.length)
            console.log('Sample:', text.substring(0, 100))
            onChange(text)
        } catch (error) {
            alert('Failed to parse PDF.')
            console.error(error)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <label className="font-semibold text-slate-700">Your Resume</label>

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
                        <p className="text-sm font-medium text-slate-600">Click to upload your resume</p>
                        <p className="text-xs text-slate-400">PDF files only</p>
                    </>
                )}
            </div>
            {fileName && !uploading && (
                <p className="text-xs text-green-600 font-medium">
                    ✓ Upload successful
                </p>
            )}
        </div>
        
    )
}



interface ResumeFile {
    name: string
    sizeKb: number
}

interface Props2 {
    resume: ResumeFile | null
    onResumeChange: () => void
    onResumeRemove: () => void
}


export function ResumeInput2({ resume, onResumeChange, onResumeRemove }: Props2) {
    
    return (
        <div>
            <p className="text-lg font-semibold mb-2">Resume</p>
            {resume ? (
                <div className="flex flex-col gap-3 border border-gray-200 bg-gray-50 rounded-xl p-3.5">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                            <FileInput className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">{resume.name}</p>
                            <p className="text-xs text-gray-400">{resume.sizeKb} KB</p>
                        </div>
                        <div className="flex flex-row ml-auto gap-3">
                            <button onClick={onResumeChange} className="text-sm text-indigo-500 text-center font-semibold border border-indigo-500 rounded-xl p-2.5">
                                Change
                            </button>
                            <button onClick={onResumeRemove} className="text-sm text-indigo-500 text-center font-semibold border border-indigo-500 rounded-xl p-2.5">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    
                </div>
            ) : (
                <div className="flex flex-col gap-3 border border-gray-200 bg-gray-50 rounded-xl p-3.5">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                            <FileInput className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Not added yet</p>
                            <p className="text-xs text-gray-400">Upload your resume (PDF only)</p>
                        </div>
                        <button onClick={onResumeChange} className="ml-auto text-sm text-indigo-500 text-center font-semibold border border-indigo-500 rounded-xl p-2.5">
                            Upload
                        </button>
                    </div>
                    
                </div>
            )}
        </div>        
    )
}
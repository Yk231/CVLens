import { FileText } from "lucide-react"
import { useState } from "react"

interface Props1 {
    value: string
    onChange: (val: string) => void
}

export function JobDescInput1({ value, onChange }: Props1) {
    return (
    <div className="flex flex-col gap-2">
        <label className="font-semibold text-gray-700">Job Description</label>
        <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Paste the job description here..."
        className="h-72 p-4 border border-gray-200 rounded-xl resize-none
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                    text-sm text-gray-700 bg-gray-50"
        />
    </div>
    )
}

interface JobDesc {
    title: string
    wordCount: number
}

interface Props2 {
    jobDesc: JobDesc | null
    onJobDescSave: (text: string) => void
}

export function JobDescInput2({jobDesc, onJobDescSave }: Props2) {
    const [jobDescText, setJobDescText] = useState("")
    const [isEditing, setIsEditing] = useState(true)

    const handleSave = () => {
        if (!jobDescText.trim()) return
        onJobDescSave(jobDescText)
        setIsEditing(false)
    }

    const wordCount = jobDescText.trim().split(/\s+/).filter(Boolean).length

    return (
        <div>
            <p className="text-lg font-semibold mb-2">Job Description (Text)</p>
            {!isEditing && jobDesc ? (
                <div className="flex flex-col gap-3 border border-gray-200 rounded-xl p-3.5">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">{jobDesc.title}</p>
                            <p className="text-xs text-gray-400">({jobDesc.wordCount} words)</p>
                        </div>
                    </div>
                    <button onClick={() => setIsEditing(true)} className="text-sm text-indigo-500 text-left">
                        Edit
                    </button>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    <textarea
                        value={jobDescText}
                        onChange={e => setJobDescText(e.target.value)}
                        onBlur={handleSave}
                        placeholder="Paste the job description here..."
                        className="h-[175px] p-4 border border-gray-200 rounded-xl resize-none
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                                    text-md text-gray-700 bg-gray-50"
                    />
                    <button
                        onClick={handleSave}
                        disabled={!jobDescText.trim()}
                        className="text-sm text-indigo-500 text-left disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Save
                    </button>
                </div>
            )}
        </div>

    )
}




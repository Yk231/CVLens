import { useState } from "react"
import { ResumeInput2 } from "../misc/ResumeInput"
import { JobDescInput2 } from "../misc/JobDescInput"
import { SelectionInput, TextInput } from "./InfoInput"
import { parsePdf } from "../../lib/parsePdf"

interface Props {
    setResume: (val: string) => void
    setResumeName: (val: string) => void
    setJobDesc: (val: string) => void
    setResumeSize: (val: number) => void
    initialResumeName?: string
    initialResumeSize?: number
    initialJobDesc?: string

    tone: string; setTone: (val: string) => void
    length: string; setLength: (val: string) => void
    additionalInfo: string; setAdditionalInfo: (val: string) => void
    hiringManager: string; setHiringManager: (val: string) => void
    role: string; setRole: (val: string) => void
    format: string; setFormat: (val: string) => void
    address: string; setAddress: (val: string) => void
    city: string; setCity: (val: string) => void
    state: string; setState: (val: string) => void
    zip: string; setZip: (val: string) => void
}

export default function Input({
    setResume, 
    setResumeName,
    setJobDesc, 
    setResumeSize,
    initialResumeName,
    initialResumeSize,
    initialJobDesc,

    tone, setTone,
    length, setLength,
    additionalInfo, setAdditionalInfo,
    hiringManager, setHiringManager,
    role, setRole,
    format, setFormat,
    address, setAddress,
    city, setCity,
    state, setState,
    zip, setZip

}: Props) {

    const [resumeMeta, setResumeMeta] = useState<{ name: string; sizeKb: number } | null>(
        initialResumeName && initialResumeSize ? { name: initialResumeName, sizeKb: initialResumeSize } : null
    )
    const [jobDescMeta, setJobDescMeta] = useState<{ title: string; wordCount: number } | null>(
        initialJobDesc ? { title: 'Job Description', wordCount: initialJobDesc.trim().split(/\s+/).filter(Boolean).length } : null
    )


    async function handleResumeChange() {
        const input = document.createElement("input")
        input.type = "file"
        input.accept = ".pdf"
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0]
            if (!file) return
            setResumeMeta({ name: file.name, sizeKb: Math.round(file.size / 1024) })
            setResumeName(file.name)
            setResumeSize(Math.round(file.size / 1024))
            const text = await parsePdf(file)
            setResume(text) 
        }
        input.click()
    }

    function handleJobDescChange(text: string) {
        const words = text.trim().split(/\s+/).filter(Boolean)
        setJobDescMeta({ title: "Job Description", wordCount: words.length })
        setJobDesc(text)
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 bg-white rounded-2xl border border-slate-200 p-6">
                <div>
                    <span className="text-indigo-700 font-bold text-2xl">1. </span>
                    <span className="text-slate-900 font-bold text-2xl">Add inputs</span>
                </div>

                <ResumeInput2
                    resume={resumeMeta}
                    onResumeChange={handleResumeChange}
                    onResumeRemove={() => { setResumeMeta(null); setResume(''); setResumeSize(0) }}
                />

                <JobDescInput2
                    jobDesc={jobDescMeta}
                    onJobDescSave={handleJobDescChange}
                    initialText={initialJobDesc}
                />
            </div>

            <div className="flex flex-col gap-4 bg-white rounded-2xl border border-slate-200 p-6">

                <div>
                    <span className="text-indigo-700 font-bold text-2xl">2. </span>
                    <span className="text-slate-900 font-bold text-2xl">Optional Modifications</span>
                </div>

                <SelectionInput
                    title="Cover Letter Format"
                    options={[
                        { label: 'Modern (recommended)' },
                        { label: 'Traditional Business Letter' },
                    ]}
                    value={format}
                    onChange={setFormat}
                />

                {format === "Modern (recommended)" ? (
                    <TextInput
                        title="Hiring Manager Name"
                        value={hiringManager}
                        onChange={setHiringManager}
                    />
                ) : (
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <TextInput
                                title="Hiring Manager Name"
                                value={hiringManager}
                                onChange={setHiringManager}
                            />
                            <TextInput
                                title="Hiring Manager Role/Department"
                                value={role}
                                onChange={setRole}
                            />
                        </div>
                        

                        <div className="flex flex-col p-4 rounded-2xl border border-slate-200 gap-2 bg-gray-50">
                            <span className="text-slate-900 text-lg font-semibold pb-2">Company Information</span>

                            <TextInput
                                title="Address"
                                value={address}
                                required={true}
                                onChange={setAddress}
                            />
                            
                            <div className="grid grid-cols-3 gap-4">
                                <TextInput
                                    title="City"
                                    value={city}
                                    required={true}
                                    onChange={setCity}
                                />
                                <TextInput
                                    title="State"
                                    value={state}
                                    required={true}
                                    onChange={setState}
                                />
                                <TextInput
                                    title="Zip Code"
                                    value={zip}
                                    required={true}
                                    onChange={setZip}
                                />
                            </div>
                        </div>
                    </div>
                    
                )}

                

                <SelectionInput
                    title="Tone"
                    options={[
                        { label: 'Professional' },
                        { label: 'Conversational' },
                        { label: 'Confident' },
                        { label: 'Concise' },
                    ]}
                    value={tone}
                    onChange={setTone}
                />

                <SelectionInput
                    title="Length Preference"
                    options={[
                        { label: 'Short', subtitle: '~150 words' },
                        { label: 'Standard', subtitle: '~300 words' },
                        { label: 'Detailed', subtitle: '~450 words' },
                    ]}
                    value={length}
                    onChange={setLength}
                />

                <TextInput
                    title="Additional Info to Include"
                    maxLength={500}
                    value={additionalInfo}
                    onChange={setAdditionalInfo}
                />

            </div>
        </div>
        
        
    )
}
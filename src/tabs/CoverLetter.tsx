import { useState } from 'react'
import Input from '../components/cover_letter/Input'
import OutputPreview from '../components/cover_letter/Preview'
import Output from '../components/cover_letter/Output'
import Header from '../components/Header'
import AnalyzeButton from '../components/AnalyzeButton'
import { CoverLetter } from '../types/coverLetter'


export default function CoverLetterGenerator() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [resultKey, setResultKey] = useState(0)
    const [result, setResult] = useState<CoverLetter | null>(null)

    const [resume, setResume] = useState('')
    const [jobDesc, setJobDesc] = useState('')
    const [tone, setTone] = useState('')
    const [length, setLength] = useState('')
    const [additionalInfo, setAdditionalInfo] = useState('')
    const [hiringManager, setHiringManager] = useState('')
    const [hiringManagerRole, setRole] = useState('')
    const [format, setFormat] = useState('Modern (recommended)')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    


    async function handleGenerate() {
        if (!resume.trim() || !jobDesc.trim()) {
            setError('Please provide both your resume and a job description')
            return
        }
        setError('')
        setLoading(true)

        try {
            const response = await fetch('/api/coverLetter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    resume, jobDesc, 
                    tone, length, additionalInfo, format,
                    hiringManager, hiringManagerRole,
                    address, city, state, zip
                })
            })
            const data = await response.json()
            setResult(data)
            setResultKey(k => k + 1)
        } catch {
            setError('Something went wrong. Try again.')
        } finally {
            setLoading(false)
        }
    }

    const canRegenerate = format === "Modern (recommended)"
    ? !!resume && !!jobDesc
    : !!resume && !!jobDesc && !!address && !!city && !!state && !!zip


  
    return (
        <div className="flex flex-col gap-6">

            <div className="flex flex-row items-center justify-between">
                <Header 
                    title="Cover Letter" 
                    subtitle="Use AI to write a personalized cover letter tailored to a particular job description."
                />
            </div>


            
            {/* Input */}
            <div className="grid grid-cols-[650px_1.5fr] gap-4">
                <Input
                    setResume={setResume}
                    setJobDesc={setJobDesc}
                    tone={tone} setTone={setTone}
                    length={length} setLength={setLength}
                    additionalInfo={additionalInfo} setAdditionalInfo={setAdditionalInfo}
                    format={format} setFormat={setFormat}
                    hiringManager={hiringManager} setHiringManager={setHiringManager}
                    role={hiringManagerRole} setRole={setRole}
                    address={address} setAddress={setAddress}
                    city={city} setCity={setCity}
                    state={state} setState={setState}
                    zip={zip} setZip={setZip}
                />
                <div className="flex flex-col gap-6 ">

                    {/* Output */}
                    {result ? (
                        <Output
                            key={resultKey}
                            result={result}
                            onRegenerate={handleGenerate}
                            canRegenerate={canRegenerate}
                        />
                    ) : (
                        <div>
                            <div className="flex flex-col gap-4">
                                <OutputPreview/>

                                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                                    <div className="pb-8">
                                        <span className="text-indigo-700 font-bold text-2xl">4. </span>
                                        <span className="text-slate-900 font-bold text-2xl">Generate</span>
                                    </div>

                                    {format === "Modern (recommended)" ? (
                                        <div>
                                            <AnalyzeButton
                                                idleMessage="Generate Cover Letter"
                                                loadingMessage="Generating..."
                                                loading={loading}
                                                requiredFields={[resume, jobDesc]}
                                                onClick={handleGenerate}
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <AnalyzeButton
                                                idleMessage="Generate Cover Letter"
                                                loadingMessage="Generating..."
                                                loading={loading}
                                                requiredFields={[resume, jobDesc, address, city, state, zip]}
                                                onClick={handleGenerate}
                                            />
                                        </div>
                                    )}
                                    
                                </div>

                            </div>
                        </div>

                    )}
                            
                </div>

            </div>
            
            
           
            
            
          

        </div>
    )
}
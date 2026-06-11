import { BriefcaseBusiness, FileText, FileUser } from 'lucide-react'

interface Props {
    inputType: string
    fileName: string
}

export default function InputSpan({ inputType, fileName }: Props) {
    let Icon
    let color
    if (inputType === "linkedin"){
        Icon = FileUser
        color = "bg-blue-50 text-blue-700"
    }
    else if(inputType === "resume"){
        Icon = FileText
        color = "bg-green-50 text-green-700"
    }
    else{
        Icon = BriefcaseBusiness
        color = "bg-purple-50 text-purple-700"
    }

    return (
        <div className="flex flex-row items-center gap-3 border border-slate-200 py-2 px-4 rounded-xl">
            
            <div className={`p-2 rounded-xl ${color}`}>
                <Icon className="w-6 h-6" />
            </div>
            <span className='text-sm font-medium'>{fileName}</span>

        </div>
    )
}
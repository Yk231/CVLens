import { ArrowRight, SquarePen } from "lucide-react";

interface Props {
    suggestions: { original: string; improved: string }[]
}

export default function RewriteSuggestions({ suggestions }: Props) {
    return (
    <div>
        <div className="flex flex-row gap-2 items-center mb-3">
            <div className="bg-slate-100 p-1 rounded-xl">
                <SquarePen className="w-6 h-6"/>
            </div>
            
            <h2 className="text-xl font-bold text-gray-800">Rewrite Suggestions</h2>
        </div>
        
        <div className="space-y-4">
        {suggestions.map((s, i) => (
            <div key={i} className="grid items-center gap-4" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
                <div className="bg-red-50 border border-red-100 p-4 rounded-xl h-full">
                    <div className="text-sm font-semibold text-red-500 mb-2">BEFORE</div>
                    <p className="text-sm text-slate-700 font-medium">{s.original}</p>
                </div>
                <ArrowRight className="text-slate-400" />
                <div className="bg-green-50 border border-green-100 p-4 rounded-xl h-full">
                    <div className="text-sm font-semibold text-green-500 mb-2">AFTER</div>
                    <p className="text-sm text-slate-700 font-medium">{s.improved}</p>
                </div>
            </div>
        ))}
        </div>
    </div>
    )
}
interface Props {
    suggestions: { original: string; improved: string }[]
}

export default function RewriteSuggestions({ suggestions }: Props) {
    return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-3">Rewrite Suggestions</h2>
        <div className="space-y-4">
        {suggestions.map((s, i) => (
            <div key={i} className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-100 p-4 rounded-xl">
                <div className="text-sm font-semibold text-red-500 mb-2">BEFORE</div>
                <p className="text-sm text-gray-700">{s.original}</p>
            </div>
            <div className="bg-green-50 border border-green-100 p-4 rounded-xl">
                <div className="text-sm font-semibold text-green-500 mb-2">AFTER</div>
                <p className="text-sm text-gray-700">{s.improved}</p>
            </div>
            </div>
        ))}
        </div>
    </div>
    )
}
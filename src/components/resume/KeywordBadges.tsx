interface Props {
    keywords: string[]
}

export default function KeywordBadges({ keywords }: Props) {
    if (!keywords?.length) return null
    
    return (
    <div>
        <h2 className="text-xl font-bold text-gray-800 mb-3">Missing Keywords</h2>
        <div className="flex flex-wrap gap-2">
        {keywords.map(k => (
            <span key={k} className="bg-red-50 text-red-600 border border-red-200
                                    px-3 py-1 rounded-full text-sm font-medium">
            {k}
            </span>
        ))}
        </div>
    </div>
    )
}
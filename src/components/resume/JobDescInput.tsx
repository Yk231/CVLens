interface Props {
    value: string
    onChange: (val: string) => void
}

export default function JobDescInput({ value, onChange }: Props) {
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
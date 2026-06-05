interface TextInputProps {
    title: string
    value: string
    maxLength?: number
    required?: boolean
    onChange: (value: string) => void
}

export function TextInput({ title, value, maxLength, required, onChange }: TextInputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = maxLength ? e.target.value.slice(0, maxLength) : e.target.value
        onChange(text)
    }


    return (
        <div className="flex flex-col gap-2">
            <span className="text-slate-900 text-lg font-semibold">
                {title}{required && <span className="text-red-500 ml-0.5">*</span>}
            </span>
            <div className="relative">
                <textarea
                    value={value}
                    onChange={handleChange}
                    className={`w-full border border-gray-200 rounded-xl resize-none
                                focus:outline-none focus:ring-2 focus:ring-indigo-500
                                text-gray-700   
                                ${maxLength ? "h-[175px] text-base p-4 pt-2 bg-gray-50" : "text-lg h-10 px-4 pt-1.5 overflow-hidden"}`}
                />
                {maxLength && (
                    <span className="absolute bottom-3 right-3 text-xs text-gray-400">
                        {value.length}/{maxLength}
                    </span>
                )}
            </div>
        </div>
    )
}



interface Option {
    label: string
    subtitle?: string
}

interface SelectionInputProps {
    title: string
    options: Option[]
    value: string
    onChange: (value: string) => void
}

export function SelectionInput({ title, options, value, onChange }: SelectionInputProps) {
    return (
        <div className="flex flex-col gap-2">
            <span className="text-slate-900 text-lg font-semibold">{title}</span>
            <div className={`grid gap-2 ${options.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>                {options.map(option => (
                    <button
                        key={option.label}
                        onClick={() => onChange(option.label)}
                        className={`py-2.5 px-3 rounded-xl text-sm font-medium border transition-colors text-center
                            ${value === option.label
                                ? 'border-indigo-400 bg-indigo-50 text-indigo-600'
                                : 'border-gray-200 text-gray-700 hover:border-indigo-300'
                            }`}
                    >
                        <span className="block font-semibold">{option.label}</span>
                        {option.subtitle && (
                            <span className={`block text-xs mt-0.5 ${value === option.label ? 'text-indigo-400' : 'text-gray-400'}`}>
                                {option.subtitle}
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}
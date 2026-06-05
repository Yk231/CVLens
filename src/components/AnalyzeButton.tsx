interface Props {
    idleMessage: string
    loadingMessage: string
    loading: boolean
    requiredFields: string[]
    onClick: () => void
}

export default function AnalyzeButton({ idleMessage, loadingMessage, loading, requiredFields, onClick }: Props) {
    const isDisabled = loading || requiredFields.some(f => !f.trim())

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed
                       text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
            {loading ? (
                <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {loadingMessage}
                </>
            ) : (
                idleMessage
            )}
        </button>
    )
}
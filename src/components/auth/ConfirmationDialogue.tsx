import { AlertTriangle } from 'lucide-react'

interface Props {
    isOpen: boolean
    title: string
    message: string
    confirmLabel: string
    confirmColor: string
    onConfirm: () => void
    onCancel: () => void
}

export default function ConfirmDialog({ isOpen, title, message, confirmLabel, confirmColor, onConfirm, onCancel }: Props) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 w-80 flex flex-col gap-4">
                <div className="flex flex-row items-center gap-3">
                    <div className="bg-red-100 rounded-full p-2">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900">{title}</h3>
                </div>
                <p className="text-sm text-slate-500">{message}</p>
                <div className="flex flex-row gap-3 justify-end">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 text-sm text-white rounded-lg transition-colors ${confirmColor}`}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    )
}
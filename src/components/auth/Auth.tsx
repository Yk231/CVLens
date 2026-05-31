import { supabase } from '../../lib/supabase'

interface Props {
    onGuest: () => void
}

export default function Auth({ onGuest }: Props) {
    async function signInWithGoogle() {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin
            }
        })
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
            
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 flex flex-col gap-4 w-80">
                
                <div className="flex flex-col items-center gap-1 mb-2">
                    <h1 className="text-2xl font-black text-indigo-600">CVLens</h1>
                    <p className="text-sm text-slate-500">AI-powered job application tools</p>
                </div>

                <h2 className="text-xl font-bold text-slate-900 text-center">Welcome</h2>

                <button
                    onClick={signInWithGoogle}
                    className="flex flex-row items-center justify-center gap-3 border border-slate-200
                               rounded-xl px-4 py-3 hover:bg-slate-50 transition-colors"
                >
                    <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
                    <span className="font-medium text-slate-700">Continue with Google</span>
                </button>

                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-slate-200" />
                    <span className="text-sm text-slate-400">or</span>
                    <div className="flex-1 h-px bg-slate-200" />
                </div>

                <button
                    onClick={onGuest}
                    className="text-sm text-slate-500 hover:text-slate-700 text-center transition-colors"
                >
                    Continue as guest
                </button>
            </div>
        </div>
    )
}
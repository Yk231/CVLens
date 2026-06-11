import { Bookmark, BookmarkCheck } from 'lucide-react'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAppContext } from '../../context/AppContext'


interface Props {
    type: 'resume_match' | 'linkedin' | 'interview' | 'cover_letter'
    inputs: Record<string, any>
    result: Record<string, any>
}

export default function BookmarkButton({ type, inputs, result }: Props) {
    const [saved, setSaved] = useState(false)
    const [loading, setLoading] = useState(false)
    const [bookmarkId, setBookmarkId] = useState<string | null>(null)
    const { session, setIsGuest } = useAppContext()

    async function handleToggle() {
        setLoading(true)
        try {
            const { data: { user } } = await supabase.auth.getUser()
            
            // If not signed in, trigger a pop-up forcing you to sign-in
            if (!user){
                setIsGuest(false)
                return
            }

            // Handle unsaving
            if (saved && bookmarkId) {
                const { error } = await supabase
                    .from('bookmarks')
                    .delete()
                    .eq('id', bookmarkId)
                if (!error) {
                    setSaved(false)
                    setBookmarkId(null)
                }
            }
            // Handle saving 
            else {
                const { data, error } = await supabase
                    .from('bookmarks')
                    .insert({ type, inputs, result, user_id: user.id })
                    .select()
                    .single()
                if (!error && data) {
                    setSaved(true)
                    setBookmarkId(data.id)
                }
            }
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="relative">
            
            {/* Bookmark button */}
            <div className="flex flex-row rounded-xl border border-slate-200 bg-gray-100 p-6 gap-10">
                
                
                
                <div className="flex flex-col">
                    <span className="font-medium text-lg text-slate-900">Like what you see?</span>
                    <span className="text-md text-slate-500">Save this analysis and revisit it later</span>
                </div>
            
                

                <button
                    onClick={handleToggle}
                    disabled={loading}
                    className="flex items-center gap-2 text-sm border px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50
                            text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                >
                    {saved
                        ? <><BookmarkCheck className="w-3.5 h-3.5" /> Saved</>
                        : <><Bookmark className="w-3.5 h-3.5" /> Save to Bookmarks</>
                    }
                </button>
            </div>

        </div>
    )
}
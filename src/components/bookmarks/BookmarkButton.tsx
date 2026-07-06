import { Bookmark, BookmarkCheck } from 'lucide-react'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAppContext } from '../../context/AppContext'


interface Props {
    type: 'resume_match' | 'linkedin' | 'interview' | 'cover_letter'
    inputs: Record<string, any>
    result: Record<string, any>
    initialBookmarkId?: string | null
}

export default function BookmarkButton({ type, inputs, result, initialBookmarkId }: Props) {
    const { setIsGuest, setBookmarkId: setContextBookmarkId } = useAppContext()
    const [saved, setSaved] = useState(!!initialBookmarkId)
    const [bookmarkId, setBookmarkId] = useState<string | null>(initialBookmarkId ?? null)
    const [loading, setLoading] = useState(false)

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
                    setContextBookmarkId(null)
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
                    setContextBookmarkId(data.id)
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
            
            <button
                    onClick={handleToggle}
                    disabled={loading}
                    className="flex items-center gap-2 text-base border px-5 py-3 rounded-lg transition-colors disabled:opacity-50
                            text-indigo-600 font-semibold border-indigo-200 hover:bg-indigo-50"
                >
                    {saved
                        ? <><BookmarkCheck className="w-5 h-5" /> Saved</>
                        : <><Bookmark className="w-5 h-5" /> Save to Bookmarks</>
                    }
            </button>

        </div>
    )
}
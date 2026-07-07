import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Trash2, Eye, MessagesSquare, FileText, FileChartLine, UserStar } from 'lucide-react'
import Header from '../components/misc/Header'
import InputSpan from '../components/bookmarks/InputSpan'
import { useAppContext } from '../context/AppContext'

export interface BookmarkItem {
    id: string
    type: 'resume_match' | 'linkedin' | 'interview' | 'cover_letter'
    inputs: Record<string, any>
    result: Record<string, any>
    created_at: string
}

export function useBookmarks() {
    const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([])
    const [loading, setLoading] = useState(true)
    const [typeFilter, setTypeFilter] = useState<string>('all')

    useEffect(() => {
        let cancelled = false
        async function run() {
            setLoading(true)
            const { data: { user } } = await supabase.auth.getUser()
            if (!user || cancelled) { setLoading(false); return }
            
            let query = supabase
                .from('bookmarks')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
            
            if (typeFilter !== 'all') query = query.eq('type', typeFilter)
            
            const { data, error } = await query
            if (!cancelled && !error && data) setBookmarks(data)
            if (!cancelled) setLoading(false)
        }
        run()
        return () => { cancelled = true }
    }, [typeFilter])


    async function deleteBookmark(id: string) {
        await supabase.from('bookmarks').delete().eq('id', id)
        setBookmarks(prev => prev.filter(b => b.id !== id))
    }

    return { bookmarks, loading, typeFilter, setTypeFilter, deleteBookmark }
}

const TYPE_LABELS: Record<string, string> = {
    resume_match: 'Resume Match',
    cover_letter: 'Cover Letter',
    interview: 'Interview Prep',
    linkedin: 'LinkedIn Review',
}

const TYPE_ICONS: Record<string, React.ElementType> = {
    resume_match: FileChartLine,
    cover_letter: FileText,
    interview: MessagesSquare,
    linkedin: UserStar,
}

const TYPE_COLORS: Record<string, string> = {
    resume_match: 'bg-blue-50 text-blue-800',
    cover_letter: 'bg-green-50 text-green-800',
    interview: 'bg-amber-50 text-amber-800',
    linkedin: 'bg-purple-50 text-purple-800',
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
    })
}

export default function BookmarksTab() {
    const { bookmarks, loading, typeFilter, setTypeFilter, deleteBookmark } = useBookmarks()
    const { setActiveTab, setBookmarkData } = useAppContext()

    const FILTERS = [
        { label: 'All', value: 'all' },
        { label: 'Resume Match', value: 'resume_match' },
        { label: 'Cover Letter', value: 'cover_letter' },
        { label: 'Interview Prep', value: 'interview' },
        { label: 'LinkedIn Review', value: 'linkedin' },
    ]

    return (
        <div className="flex flex-col gap-6">
            <Header
                title="Bookmarks"
                subtitle="View and manage your saved analyses."
            />

            {/* Filter tabs */}
            <div className="flex flex-row gap-2">
                {FILTERS.map(f => (
                    <button
                        key={f.value}
                        onClick={() => setTypeFilter(f.value)}
                        className={`text-sm px-4 py-1.5 rounded-lg border transition-colors
                            ${typeFilter === f.value
                                ? 'bg-indigo-50 border-indigo-300 text-indigo-600 font-medium'
                                : 'border-slate-200 text-slate-600 hover:border-indigo-200'
                            }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-200 text-slate-500 text-xs">
                            <th className="text-left px-6 py-3 font-medium w-36">Type</th>
                            <th className="text-left px-6 py-3 font-medium">Role / Company</th>
                            <th className="text-left px-6 py-3 font-medium w-100">Inputs</th>
                            <th className="text-left px-6 py-3 font-medium w-46">Date saved</th>
                            <th className="text-center px-6 py-3 font-medium w-46">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="text-center py-12 text-slate-400">
                                    Loading...
                                </td>
                            </tr>
                        ) : bookmarks.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-12 text-slate-400">
                                    No bookmarks yet
                                </td>
                            </tr>
                        ) : (
                            bookmarks.map(bookmark => {
                                const Icon = TYPE_ICONS[bookmark.type]
                                return (
                                <tr key={bookmark.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className={`flex flex-row items-center gap-6 p-4 items-center justify-center ${TYPE_COLORS[bookmark.type]} rounded-xl`}>
                                            <Icon className="w-12 h-12" />
                                            <span className='text-sm font-medium'>{TYPE_LABELS[bookmark.type]}</span>
                                        </div>
                                        
                                    </td>
                                    <td className="px-6 py-4 text-base">
                                        <div className="font-medium text-slate-900">{bookmark.result.targetRole || bookmark.result.name || '—'}</div>
                                        <div className="text-slate-400 mt-0.5">{bookmark.result.targetCompany || '—'}</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">
                                        {bookmark.type === 'linkedin' ? 
                                            (<div className="flex flex-row gap-4"> 
                                                <InputSpan inputType="linkedin" fileName={bookmark.result.fileName || 'LinkedIn Profile'} />
                                            </div> ) 
                                        : 
                                            (<div className="flex flex-row gap-4">
                                                <InputSpan inputType="resume" fileName={bookmark.result.fileName}/>
                                                <InputSpan inputType="jobDesc" fileName={`${bookmark.result.targetRole} JD`}/> 
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-slate-700 text-base">
                                        {formatDate(bookmark.created_at)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-row gap-2">
                                            <button onClick={() => {
                                                setBookmarkData({ id: bookmark.id, inputs: bookmark.inputs, result: bookmark.result })
                                                setActiveTab(bookmark.type === 'resume_match' ? 'resume' : 
                                                            bookmark.type === 'cover_letter' ? 'coverLetter' :
                                                            bookmark.type === 'interview' ? 'interview' 
                                                            : 'linkedin')
                                            }}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                aria-label="View"
                                            >
                                                <Eye className="w-6 h-6" />
                                            </button>
                                            <button
                                                onClick={() => deleteBookmark(bookmark.id)}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                aria-label="Delete"
                                            >
                                                <Trash2 className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>)}
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <div className="text-xs text-slate-400">
                {!loading && `Showing ${bookmarks.length} bookmark${bookmarks.length !== 1 ? 's' : ''}`}
            </div>
        </div>
    )
}
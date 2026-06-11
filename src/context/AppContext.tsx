import { createContext, useContext } from 'react'
import { Session } from '@supabase/supabase-js'

interface AppContextType {
    session: Session | null
    isGuest: boolean
    setIsGuest: (val: boolean) => void
    activeTab: string
    setActiveTab: (val: 'resume' | 'linkedin' | 'profile' | 'interview' | 'coverLetter' | 'bookmarks') => void
    bookmarkData: any
    setBookmarkData: (val: any) => void
}

export const AppContext = createContext<AppContextType>({
    session: null,
    isGuest: false,
    setIsGuest: () => {},
    activeTab: 'resume',
    setActiveTab: () => {},
    bookmarkData: null,
    setBookmarkData: () => {}
})

export function useAppContext() {
    return useContext(AppContext)
}



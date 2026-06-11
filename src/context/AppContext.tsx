import { createContext, useContext } from 'react'
import { Session } from '@supabase/supabase-js'

interface AppContextType {
    session: Session | null
    isGuest: boolean
    setIsGuest: (val: boolean) => void
    activeTab: string
    setActiveTab: (val: 'resume' | 'linkedin' | 'profile' | 'interview' | 'coverLetter' | 'bookmarks') => void
}

export const AppContext = createContext<AppContextType>({
    session: null,
    isGuest: false,
    setIsGuest: () => {},
    activeTab: 'resume',
    setActiveTab: () => {}
})

export function useAppContext() {
    return useContext(AppContext)
}



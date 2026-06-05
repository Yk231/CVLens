import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { Session } from '@supabase/supabase-js'
import Auth from './components/auth/Auth'
import ResumeReview from './tabs/ResumeMatch'
import LinkedInReview from './tabs/LinkedInReview'
import ProfilePage from './tabs/ProfilePage'
import { GitCompareArrowsIcon, PanelsTopLeft, ChevronRight, CircleUser, MessagesSquare, TextInitial } from 'lucide-react'
import InterviewPrep from './tabs/InterviewPrep'
import CoverLetter from './tabs/CoverLetter'


export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [isGuest, setIsGuest] = useState(false)
  const [activeTab, setActiveTab] = useState<'resume' | 'linkedin' | 'profile' | 'interview' | 'coverLetter'>('resume')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function signOut() {
    await supabase.auth.signOut()
    setIsGuest(false)
    setSession(null)
    setActiveTab('resume')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">

      {/* Auth overlay — blurs the app behind it when not signed in */}
      {!session && !isGuest && (
        <Auth onGuest={() => setIsGuest(true)} />
      )}

      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-8 py-5 flex-shrink-0">
        <h1 className="text-6xl font-bold text-indigo-700 tracking-tight">CVLens</h1>
        <p className="text-indigo-700 text-sm">AI-powered job application tools</p>
      </header>

      <div className="flex flex-1 overflow-hidden min-h-0">

        {/* Sidebar */}
        <aside className="w-80 bg-white border-r border-gray-200 p-4 flex flex-col overflow-y-auto flex-shrink-0">

          {/* Nav */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setActiveTab('resume')}
              className={`flex items-center gap-5 px-3 py-2 rounded-lg text-md font-medium text-left transition-colors ${
                activeTab === 'resume'
                  ? 'bg-blue-50 text-indigo-500'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <GitCompareArrowsIcon className="w-8 h-8" />
              Resume Match
            </button>

            <button
              onClick={() => setActiveTab('linkedin')}
              className={`flex items-center gap-5 px-3 py-2 rounded-lg text-md font-medium text-left transition-colors ${
                activeTab === 'linkedin'
                  ? 'bg-blue-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <PanelsTopLeft className="w-8 h-8" />
              LinkedIn Review
            </button>


            <button
              onClick={() => setActiveTab('interview')}
              className={`flex items-center gap-5 px-3 py-2 rounded-lg text-md font-medium text-left transition-colors ${
                activeTab === 'interview'
                  ? 'bg-blue-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <MessagesSquare className="w-8 h-8" />
              Interview Prep
            </button>

            <button
              onClick={() => setActiveTab('coverLetter')}
              className={`flex items-center gap-5 px-3 py-2 rounded-lg text-md font-medium text-left transition-colors ${
                activeTab === 'coverLetter'
                  ? 'bg-blue-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <TextInitial className="w-8 h-8" />
              Cover Letter
            </button>
          </div>

          {/* Profile — pinned to bottom */}
          <div className="mt-auto">
            <div className="border-t border-slate-200 mb-3" />

            {session ? (
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex flex-row items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-blue-50'
                    : 'hover:bg-gray-100'
                }`}
              >
                {session.user.user_metadata.avatar_url ? (
                  <img
                    src={session.user.user_metadata.avatar_url}
                    className="w-8 h-8 rounded-full flex-shrink-0"
                    alt="profile"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-indigo-500">
                      {session.user.user_metadata.full_name?.split(' ')[0]?.charAt(0)}
                      {session.user.user_metadata.full_name?.split(' ')[1]?.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="flex flex-col items-start flex-1 min-w-0">
                  <span className="text-sm font-semibold text-slate-900 truncate w-full">
                    {session.user.user_metadata.full_name}
                  </span>
                  <span className="text-xs text-slate-400 truncate w-full">
                    {session.user.email}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
              </button>
            ) : (
              <button
                onClick={() => setIsGuest(false)}
                className="w-full flex flex-row items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-left"
              >
                <div className="bg-indigo-100 rounded-full p-2 flex-shrink-0">
                  <CircleUser className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-sm font-semibold text-slate-900">Guest</span>
                  <span className="text-xs text-slate-400">Sign in to save data</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
              </button>
            )}
          </div>

        </aside>

        {/* Content */}
        <main className="flex-1 px-8 py-10 overflow-y-auto min-h-0">
          {activeTab === 'resume' && <ResumeReview />}
          {activeTab === 'linkedin' && <LinkedInReview />}
          {activeTab === 'profile' && (
            <ProfilePage
              firstName={session?.user.user_metadata.full_name?.split(' ')[0]}
              lastName={session?.user.user_metadata.full_name?.split(' ').slice(1).join(' ')}
              email={session?.user.email}
              userId={session?.user.id}
              onSignOut={signOut}
           />
          )}
          {activeTab === 'interview' && <InterviewPrep />}
          {activeTab === 'coverLetter' && <CoverLetter />}

        </main>

      </div>
    </div>
  )
}
import { useState } from 'react'
import ResumeReview from './tabs/ResumeMatch'
import LinkedInReview from './tabs/LinkedInReview'
import { GitCompareArrowsIcon, PanelsTopLeft } from 'lucide-react'

export default function App() {
  const [activeTab, setActiveTab] = useState<'resume' | 'linkedin'>('resume')

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-8 py-5">
        <h1 className="text-6xl font-bold text-indigo-700 tracking-tight">CVLens</h1>
        <p className="text-3xl text-indigo-700 text-sm">AI-powered job application tools</p>
      </header>

      <div className="flex flex-1">

        {/* Sidebar */}
        <aside className="w-56 bg-white border-r border-gray-200 p-4 flex flex-col gap-4">
        <button
          onClick={() => setActiveTab('resume')}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors ${
            activeTab === 'resume'
              ? 'bg-blue-50 text-indigo-500'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          >
          <div className="flex flex-row items-center gap-2">
            <GitCompareArrowsIcon className="w-5 h-5"/>
            Resume Match
          </div>
        </button>

        <button
          onClick={() => setActiveTab('linkedin')}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors ${
            activeTab === 'linkedin'
              ? 'bg-blue-50 text-indigo-600'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          >
          <div className="flex flex-row items-center gap-2">
            <PanelsTopLeft className="w-5 h-5"/>
            LinkedIn Review
          </div>
          </button>
        </aside>

        {/* Content */}
        <main className="flex-1 px-8 py-10">
          {activeTab === 'resume' && <ResumeReview />}
          {activeTab === 'linkedin' && <LinkedInReview />}
        </main>

      </div>
    </div>
  )
}
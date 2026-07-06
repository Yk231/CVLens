import { useState, useEffect } from 'react'
import { Mail, User, Check } from 'lucide-react'
import { supabase } from '../lib/supabase'
import ConfirmationDialogue from '../components/auth/ConfirmationDialogue'

interface Props {
  firstName?: string
  lastName?: string
  email?: string
  userId?: string
  onSignOut?: () => void
}


export default function ProfilePage({ firstName = '', lastName = '', email, userId, onSignOut }: Props) {
  const [firstNameValue, setFirstNameValue] = useState(firstName)
  const [lastNameValue, setLastNameValue] = useState(lastName)
  const [editingName, setEditingName] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [nameError, setNameError] = useState('')

  // Confirmation dialogs
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)

  // Load saved name from Supabase on mount
  useEffect(() => {
    if (!userId) return
    supabase
      .from('profiles')
      .select('first_name, last_name')
      .eq('id', userId)
      .single()
      .then(({ data }) => {
          if (data) {
            if (data.first_name) setFirstNameValue(data.first_name)
            if (data.last_name) setLastNameValue(data.last_name)
          }
      })
  }, [userId])

  async function handleSave() {
    if (!userId) return
    if (!firstNameValue.trim() && !lastNameValue.trim()){
      setNameError('First name required')
      return
    }
    setNameError('')
    setSaving(true)

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        first_name: firstNameValue.trim(),
        last_name: lastNameValue.trim(),
        updated_at: new Date().toISOString()
      })

    setSaving(false)
    if (!error) {
      setEditingName(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } else {
      setNameError('Failed to save. Try again.')
    }
  }

  async function handleDelete() {
    setShowDeleteConfirm(false)
    setDeleting(true)
    try {
      await supabase.rpc('delete_user')
      await supabase.auth.signOut()
      onSignOut?.()
    } catch {
      setDeleting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6 py-8">

      {/* Confirmation Dialogs */}
      <ConfirmationDialogue
        isOpen={showSignOutConfirm}
        title="Sign out"
        message="Are you sure you want to sign out of your account on this device?"
        confirmLabel="Sign out"
        confirmColor="bg-red-500 hover:bg-red-600"
        onConfirm={() => { setShowSignOutConfirm(false); onSignOut?.() }}
        onCancel={() => setShowSignOutConfirm(false)}
      />

      <ConfirmationDialogue
        isOpen={showDeleteConfirm}
        title="Delete account"
        message="This will permanently delete your account and all associated data. This action cannot be undone."
        confirmLabel={deleting ? 'Deleting...' : 'Delete permanently'}
        confirmColor="bg-red-500 hover:bg-red-600"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />

      {/* Header */}
      <h1 className="text-2xl font-bold text-slate-900">Profile</h1>

      {/* Account Details Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Account</h2>
        </div>

      {/* Name */}
      <div className="flex flex-row items-start gap-4 px-6 py-4 border-b border-slate-100">
          <div className="bg-slate-100 rounded-full p-2 mt-0.5">
              <User className="w-4 h-4 text-slate-500" />
          </div>
          <div className="flex flex-col gap-0.5 flex-1">
            <span className="text-xs text-slate-400 font-medium">Name</span>
            {editingName ? (
              <div className="flex flex-col gap-2 mt-1">
                <div className="flex flex-row gap-2">
                  <input
                    value={firstNameValue}
                    onChange={e => setFirstNameValue(e.target.value)}
                    placeholder="First name"
                    className="w-32 border border-indigo-300 rounded-lg px-3 py-1.5 text-sm
                                focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    autoFocus
                  />
                  <input
                    value={lastNameValue}
                    onChange={e => setLastNameValue(e.target.value)}
                    placeholder="Last name"
                    className="w-32 border border-indigo-300 rounded-lg px-3 py-1.5 text-sm
                                focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-600 disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={() => { 
                      setEditingName(false)
                      setNameError('') 
                      setFirstNameValue(firstName ?? '')
                      setLastNameValue(lastName ?? '')
                    }}
                    className="text-slate-400 px-3 py-1.5 rounded-lg text-sm hover:text-slate-600"
                  >
                    Cancel
                  </button>
              </div>
              {nameError && (
                  <p className="text-xs text-red-500">{nameError}</p>
              )}
                </div>
            ) : (
              <div className="flex flex-row items-center gap-3 mt-1">
                <span className="text-sm text-slate-900">{firstNameValue} {lastNameValue}</span>
                <button
                  onClick={() => setEditingName(true)}
                  className="text-xs text-indigo-500 hover:text-indigo-700 font-medium"
                >
                  Update
                </button>
                {saved && (
                  <span className="flex items-center gap-1 text-xs text-green-500">
                    <Check className="w-3 h-3" /> Saved
                  </span>
                )}
              </div>
            )}
          </div>
      </div>

      {/* Email */}
      <div className="flex flex-row items-center gap-4 px-6 py-4">
        <div className="bg-slate-100 rounded-full p-2">
          <Mail className="w-4 h-4 text-slate-500" />
        </div>
        <div className="flex flex-col gap-0.5 flex-1">
          <span className="text-xs text-slate-400 font-medium">Email</span>
          <span className="text-sm text-slate-900">{email}</span>
        </div>
      </div>

    </div>

      {/* Linked Accounts */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Linked Accounts</h2>
        </div>
        <div className="flex flex-row items-center gap-4 px-6 py-4">
          <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
          <span className="text-sm text-slate-900 flex-1">Google</span>
          <span className="text-xs text-green-500 font-medium bg-green-50 px-2 py-1 rounded-full">Connected</span>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-red-100">
          <h2 className="font-semibold text-red-600">Danger Zone</h2>
        </div>

        <div className="flex flex-row items-center justify-between px-6 py-4 border-b border-red-50">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-slate-900">Sign out</span>
            <span className="text-xs text-slate-400">Sign out of your account on this device</span>
          </div>
          <button
            onClick={() => setShowSignOutConfirm(true)}
            className="text-sm text-red-500 hover:text-red-700 font-medium border border-red-200
                        px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            Sign out
          </button>
        </div>

        <div className="flex flex-row items-center justify-between px-6 py-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-slate-900">Delete account</span>
            <span className="text-xs text-slate-400">Permanently delete your account and all data</span>
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            disabled={deleting}
            className="text-sm text-red-500 hover:text-red-700 font-medium border border-red-200
                        px-4 py-2 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            {deleting ? 'Deleting...' : 'Delete account'}
          </button>
        </div>
      </div>

    </div>
  )
}
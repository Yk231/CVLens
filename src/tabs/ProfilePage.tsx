import { supabase } from '../lib/supabase'
import { Session } from '@supabase/supabase-js'
import React, { useState } from 'react'
import { User, Mail, Shield, Link, Camera, Check, ChevronRight } from 'lucide-react'

interface Props {
  firstName?: string
  lastName?: string
  email?: string
  onSignOut?: () => void
}

export default function ProfilePage({ firstName = '', lastName = '', email, onSignOut }: Props) {
  const [firstNameValue, setFirstNameValue] = useState(firstName)
  const [lastNameValue, setLastNameValue] = useState(lastName)
  const [editingName, setEditingName] = useState(false)
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setEditingName(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6 py-8">

      {/* Header */}
      <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
      </div>

      {/* Name Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Name</label>

                {editingName ? (
                    <div className="flex flex-row gap-2 mt-2">
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
                            className="bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-600"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setEditingName(false)}
                            className="text-slate-400 px-3 py-1.5 rounded-lg text-sm hover:text-slate-600"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-row items-center gap-3 mt-2">
                        <span className="text-slate-900 font-medium">{firstNameValue} {lastNameValue}</span>
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

      {/* Account Details Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Account</h2>
        </div>

        {/* Email */}
        <div className="flex flex-row items-center gap-4 px-6 py-4 border-b border-slate-100">
          <div className="bg-slate-100 rounded-full p-2">
            <Mail className="w-4 h-4 text-slate-500" />
          </div>
          <div className="flex flex-col gap-0.5 flex-1">
            <span className="text-xs text-slate-400 font-medium">Email</span>
            <span className="text-sm text-slate-900">{email}</span>
          </div>
        </div>

        {/* Recovery Email */}
        <div className="flex flex-row items-center gap-4 px-6 py-4 border-b border-slate-100">
          <div className="bg-slate-100 rounded-full p-2">
            <Shield className="w-4 h-4 text-slate-500" />
          </div>
          <div className="flex flex-col gap-0.5 flex-1">
            <span className="text-xs text-slate-400 font-medium">Recovery Email</span>
            <span className="text-sm text-slate-400">No recovery email added</span>
          </div>
          <button className="text-xs text-indigo-500 hover:text-indigo-700 font-medium">
            Add
          </button>
        </div>

        {/* Password */}
        <div className="flex flex-row items-center gap-4 px-6 py-4">
          <div className="bg-slate-100 rounded-full p-2">
            <Shield className="w-4 h-4 text-slate-500" />
          </div>
          <div className="flex flex-col gap-0.5 flex-1">
            <span className="text-xs text-slate-400 font-medium">Password</span>
            <span className="text-sm text-slate-900">••••••••</span>
          </div>
          <button className="text-xs text-indigo-500 hover:text-indigo-700 font-medium">
            Change
          </button>
        </div>

      </div>

      {/* Linked Accounts Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Linked Accounts</h2>
        </div>

        {/* Google */}
        <div className="flex flex-row items-center gap-4 px-6 py-4 border-b border-slate-100">
          <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
          <span className="text-sm text-slate-900 flex-1">Google</span>
          <span className="text-xs text-green-500 font-medium bg-green-50 px-2 py-1 rounded-full">Connected</span>
          <button className="text-xs text-slate-400 hover:text-red-500 font-medium">
            Unlink
          </button>
        </div>

      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden">

        <div className="px-6 py-4 border-b border-red-100">
          <h2 className="font-semibold text-red-600">Danger Zone</h2>
        </div>

        <div className="flex flex-row items-center justify-between px-6 py-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-slate-900">Sign out</span>
            <span className="text-xs text-slate-400">Sign out of your account on this device</span>
          </div>
          <button
            onClick={onSignOut}
            className="text-sm text-red-500 hover:text-red-700 font-medium border border-red-200 
                        px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            Sign out
          </button>
        </div>

        <div className="flex flex-row items-center justify-between px-6 py-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-slate-900">Delete</span>
            <span className="text-xs text-slate-400">Permanently delete your account and all data</span>
          </div>
          <button
            className="text-sm text-red-500 hover:text-red-700 font-medium border border-red-200 
                        px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            Delete account
          </button>
        </div>

      </div>

    </div>
  )
}

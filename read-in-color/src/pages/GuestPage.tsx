// src/pages/GuestPage.tsx
import React, { useState } from 'react'
import PresetList from '~components/PresetList'
import { useAuth } from "~authContext"

const GuestPage = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { signIn } = useAuth()

  const handleSignIn = async () => {
    try {
      await signIn()
    } catch (error) {
      console.error('Sign in failed:', error)
    }
  }

  return (
    <div className="plasmo-h-screen plasmo-flex plasmo-flex-col plasmo-items-center plasmo-p-3 dark:plasmo-bg-gray-800">
      <button
        className="plasmo-flex plasmo-items-center plasmo-border-gray-400 dark:plasmo-border-gray-600 plasmo-border-2 plasmo-w-11/12 plasmo-px-6 plasmo-py-4 plasmo-text-white plasmo-text-xl hover:plasmo-bg-blue-800 plasmo-bg-blue-700 plasmo-rounded-lg"
        onClick={handleSignIn}
      >
        <svg 
          className="plasmo-w-5 plasmo-h-5 plasmo-me-2" 
          aria-hidden="true" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
        </svg>
        Sign in to create custom templates
      </button>

      <h2 className="plasmo-text-gray-100 plasmo-p-2 plasmo-text-l">
        Or try some of ours...
      </h2>

      <PresetList
        reloadKey={0}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </div>
  )
}

export default GuestPage
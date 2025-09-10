// src/authContext.tsx
import React, { createContext, useContext, useEffect, useState, useCallback } from "react"
import type { AccountType } from "~types"
import { getAuthToken } from "~utils/auth"

interface AuthContextType {
  accountType: AccountType
  isLoading: boolean
  userId: string | null
  signIn: () => Promise<void>
  refresh: () => Promise<void>
}


const AuthContext = createContext<AuthContextType>({
  accountType: "guest",
  isLoading: true,
  userId: null,
  signIn: async () => {},
  refresh: async () => {}
})

export const AuthProvider = ({ children }) => {
  const [accountType, setAccountType] = useState<AccountType>("guest")
  const [userId, setUserId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refresh = useCallback(async () => {
    return new Promise<void>((resolve) => {
      chrome.identity.getAuthToken({ interactive: false }, (token) => {
        const hadError = !!chrome.runtime.lastError
        if (hadError || !token) {
          setAccountType("guest")
          setUserId(null)
          setIsLoading(false)
          return resolve()
        }
        setAccountType("signed-in") 
        chrome.identity.getProfileUserInfo((info) => {
          setUserId(info?.id || null)
          setIsLoading(false)
          resolve()
        })
      })
    })
  }, [])

  const signIn = useCallback(async () => {
    try {
      const token = await getAuthToken() 

      // Immediately flip UI to signed-in (no messages, no waits)
      setAccountType("signed-in")

      // Fill in userId when available, but don't block UI on it
      chrome.identity.getProfileUserInfo((info) => {
        setUserId(info?.id || null)
      })

      // Refresh state after short delay to sync with Chrome's cache
      setTimeout(() => { void refresh() }, 300)
    } catch (e) {
      console.error("Auth error:", e)
    }
  }, [refresh])

  useEffect(() => { void refresh() }, [refresh])

  // React to browser-level sign-in/out changes
  useEffect(() => {
    const handleSignInChange = () => { void refresh() }
    chrome.identity.onSignInChanged.addListener(handleSignInChange)
    return () => chrome.identity.onSignInChanged.removeListener(handleSignInChange)
  }, [refresh])

  return (
    <AuthContext.Provider value={{ accountType, isLoading, userId, signIn, refresh }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

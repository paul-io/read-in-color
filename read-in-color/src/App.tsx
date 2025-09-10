//src/App.tsx
import { useAuth } from "~authContext"
import GuestPage from "~pages/GuestPage"
import UserPage from "~pages/UserPage"
import { Toaster } from "react-hot-toast"
import toast from "react-hot-toast"
import { useEffect } from "react"

const App = () => {
  const { accountType, isLoading } = useAuth()

  useEffect(() => {
    const handleMessage = (message: { type: string }) => {
      if (message.type === "TAB_SWITCHED") {
        toast("Theme doesn't apply to this tab yet. Refresh to activate.")
      }
    }
    chrome.runtime.onMessage.addListener(handleMessage)
    return () => chrome.runtime.onMessage.removeListener(handleMessage)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        Loading...
      </div>
    )
  }

  return (
    <>
      {accountType === "guest" && <GuestPage />}
      {accountType !== "guest" && (
        <UserPage />
      )}

      <Toaster position="top-center" toastOptions={{
        icon: '🚨',
        className: 'plasmo-bg-white dark:plasmo-bg-gray-800 plasmo-text-gray-900 dark:plasmo-text-white plasmo-border plasmo-border-gray-200 dark:plasmo-border-gray-600',
        duration: 4000
      }} />
      
    </>
  )
}

export default App;

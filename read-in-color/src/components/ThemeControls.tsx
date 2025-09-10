// src/components/ThemeControls.tsx
import { Sun, Moon, RefreshCw, Shuffle } from "lucide-react"
import { useEffect, useState } from "react"
import { sendToContentScript } from "@plasmohq/messaging"
import { useUserPreferences } from "~hooks/useUserPreferences"

interface ThemeControlsProps {
  onReset?: () => void
}

function useDarkMode() {
  const { getMode, setMode } = useUserPreferences()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const loadMode = async () => {
      try {
        const savedMode = await getMode()
        const isDarkMode = savedMode === "dark"
        setIsDark(isDarkMode)
        
        const plasmoContainer = document.querySelector('#__plasmo')
        if (plasmoContainer) {
          if (isDarkMode) {
            plasmoContainer.classList.add("plasmo-dark")
            document.documentElement.classList.add("dark")
            document.body.classList.add("dark")
          } else {
            plasmoContainer.classList.remove("plasmo-dark")
            document.documentElement.classList.remove("dark")
            document.body.classList.remove("dark")
          }
        }
      } catch (error) {
        console.error('Failed to load mode:', error)
      }
    }
    
    loadMode()
  }, [getMode])

  useEffect(() => {
    const plasmoContainer = document.querySelector('#__plasmo')
    
    if (!plasmoContainer) {
      console.warn('Plasmo container not found for dark mode toggle')
      return
    }

    if (isDark) {
      plasmoContainer.classList.add("plasmo-dark")
    } else {
      plasmoContainer.classList.remove("plasmo-dark")
    }
  }, [isDark])

  const toggleDark = async () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    
    try {
      await setMode(newIsDark ? "dark" : "light")
    } catch (error) {
      console.error('Failed to save mode:', error)
    }
  }

  return { isDark, toggleDark }
}

function useThemeControls() {
  const resetTheme = async () => {
    try {
      await sendToContentScript({ name: "reset", body: null })
    } catch (error) {
      console.error('Failed to reset theme:', error)
    }
  }

  const reverseTheme = async () => {
    try {
      await sendToContentScript({ name: "reverse", body: null })
    } catch (error) {
      console.error('Failed to reverse theme:', error)
    }
  }

  return { resetTheme, reverseTheme }
}

const ThemeControls = ({ onReset }: ThemeControlsProps) => {
  const { isDark, toggleDark } = useDarkMode()
  const { resetTheme, reverseTheme } = useThemeControls()

  const handleReset = () => {
    resetTheme()
    onReset?.()
  }

  return (
    <div className="plasmo-flex plasmo-justify-center plasmo-mb-3">
      <div className="plasmo-inline-flex plasmo-rounded-xl plasmo-bg-gray-200 dark:plasmo-bg-gray-800 plasmo-border plasmo-border-gray-400 dark:plasmo-border-gray-600 plasmo-overflow-hidden">
        <button
          onClick={toggleDark}
          className="plasmo-group plasmo-px-4 plasmo-py-2.5 plasmo-text-gray-500 dark:plasmo-text-gray-400 hover:plasmo-text-gray-700 dark:hover:plasmo-text-gray-200 hover:plasmo-bg-gray-50 dark:hover:plasmo-bg-gray-700/50 plasmo-transition-all plasmo-duration-200 plasmo-border-r plasmo-border-gray-400 dark:plasmo-border-gray-600"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          <div className="plasmo-transform group-hover:plasmo-scale-110 plasmo-transition-transform plasmo-duration-200">
            {isDark ? <Sun className="plasmo-w-4 plasmo-h-4" /> : <Moon className="plasmo-w-4 plasmo-h-4" />}
          </div>
        </button>
        
        <button
          onClick={handleReset}
          className="plasmo-group plasmo-px-4 plasmo-py-2.5 plasmo-text-gray-500 dark:plasmo-text-gray-400 hover:plasmo-text-gray-700 dark:hover:plasmo-text-gray-200 hover:plasmo-bg-gray-50 dark:hover:plasmo-bg-gray-700/50 plasmo-transition-all plasmo-duration-200 plasmo-border-r plasmo-border-gray-400 dark:plasmo-border-gray-600"
          title="Reset to Original Page"
        >
          <div className="plasmo-transform group-hover:plasmo-scale-110 group-hover:plasmo-rotate-180 plasmo-transition-transform plasmo-duration-200">
            <RefreshCw className="plasmo-w-4 plasmo-h-4" />
          </div>
        </button>
        
        <button
          onClick={reverseTheme}          
          className="plasmo-group plasmo-px-4 plasmo-py-2.5 plasmo-text-gray-500 dark:plasmo-text-gray-400 hover:plasmo-text-gray-700 dark:hover:plasmo-text-gray-200 hover:plasmo-bg-gray-50 dark:hover:plasmo-bg-gray-700/50 plasmo-transition-all plasmo-duration-200"
          title="Reverse Theme Colors"
        >
          <div className="plasmo-transform group-hover:plasmo-scale-110 group-hover:plasmo-rotate-180 plasmo-transition-transform plasmo-duration-200">
            <Shuffle className="plasmo-w-4 plasmo-h-4" />
          </div>
        </button>
      </div>
    </div>
  )
}

export default ThemeControls

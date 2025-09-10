// src/hooks/useUserPreferences.ts
import { useAuth } from "~authContext"

type Mode = "light" | "dark"

export function useUserPreferences() {
  const { accountType } = useAuth()

  const storage = accountType === "signed-in" ? chrome.storage.sync : chrome.storage.local

  const getSelectedThemeId = async (): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      storage.get(["selectedThemeId"], (result) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message))
        } else {
          resolve(result.selectedThemeId || null)
        }
      })
    })
  }

  const setSelectedThemeId = async (themeId: string | null): Promise<void> => {
    return new Promise((resolve, reject) => {
      const operation = themeId === null 
        ? () => storage.remove(["selectedThemeId"], () => resolve())
        : () => storage.set({ selectedThemeId: themeId }, () => resolve())

      operation()
      
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message))
      }
    })
  }

  const getMode = async (): Promise<Mode> => {
    return new Promise((resolve, reject) => {
      storage.get(["mode"], (result) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message))
        } else {
          resolve(result.mode || "light")
        }
      })
    })
  }

  const setMode = async (mode: Mode): Promise<void> => {
    return new Promise((resolve, reject) => {
      storage.set({ mode }, () => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message))
        } else {
          resolve()
        }
      })
    })
  }

  return {
    getSelectedThemeId,
    setSelectedThemeId,
    getMode,
    setMode
  }
}

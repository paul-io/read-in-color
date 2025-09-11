// src/utils/themeStorage.ts
import type { Theme } from "~types"
import { v4 as uuidv4 } from "uuid"

const CUSTOM_THEMES_KEY = "customThemes"

export const createTheme = async (partialTheme: Omit<Theme, "id" | "isCustom">): Promise<void> => {
  const newTheme: Theme = {
    id: uuidv4(),
    ...partialTheme,
    isCustom: true
  }

  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(CUSTOM_THEMES_KEY, (result) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message))
        return
      }
      
      const existing = result[CUSTOM_THEMES_KEY] || []
      const updated = [...existing, newTheme]
      
      chrome.storage.sync.set({ [CUSTOM_THEMES_KEY]: updated }, () => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message))
        } else {
          resolve()
        }
      })
    })
  })
}

export const deleteTheme = async (id: string): Promise<Theme[]> => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(CUSTOM_THEMES_KEY, (result) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message))
        return
      }
      
      const current = result[CUSTOM_THEMES_KEY] || []
      const updated = current.filter((theme: Theme) => theme.id !== id)
      
      chrome.storage.sync.set({ [CUSTOM_THEMES_KEY]: updated }, () => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message))
        } else {
          resolve(updated)
        }
      })
    })
  })
}

export const updateTheme = async (updatedTheme: Theme): Promise<Theme[]> => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(CUSTOM_THEMES_KEY, (result) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message))
        return
      }
      
      const current = result[CUSTOM_THEMES_KEY] || []
      const updated = current.map((theme: Theme) => 
        theme.id === updatedTheme.id ? updatedTheme : theme
      )
      
      chrome.storage.sync.set({ [CUSTOM_THEMES_KEY]: updated }, () => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message))
        } else {
          resolve(updated)
        }
      })
    })
  })
}

export const loadThemes = async (): Promise<Theme[]> => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(CUSTOM_THEMES_KEY, (result) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message))
        return
      }
      
      const customThemes = (result[CUSTOM_THEMES_KEY] || []).map((theme: Theme) => ({
        ...theme,
        isCustom: true
      }))
      
      resolve(customThemes.sort((a, b) => a.name.localeCompare(b.name)))
    })
  })
}
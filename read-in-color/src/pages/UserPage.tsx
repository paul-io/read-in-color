// src/pages/UserPage.tsx
import React, { useState, useEffect } from "react"
import CustomList from "~components/CustomList"
import PresetList from "~components/PresetList"
import ThemeModal from "~modals/ThemeModal"
import { useAuth } from "~authContext" 
import ThemeControls from "~components/ThemeControls"
import { useUserPreferences } from "~hooks/useUserPreferences"
import { sendToContentScript } from "@plasmohq/messaging"
import { loadThemes } from "~utils/themeStorage"
import { PRESET_THEMES } from "~constants/presets"
import type { Theme } from "~types"

const UserPage = () => {
  const { accountType } = useAuth()
  const { getSelectedThemeId, setSelectedThemeId } = useUserPreferences()
  
  const [showModal, setShowModal] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [customThemes, setCustomThemes] = useState<Theme[]>([])

  useEffect(() => {
    loadThemes()
      .then(setCustomThemes)
      .catch(error => console.error('Failed to load custom themes:', error))
  }, [reloadKey])

  useEffect(() => {
    const loadSelectedTheme = async () => {
      try {
        const savedThemeId = await getSelectedThemeId()
        setSelectedId(savedThemeId)
      } catch (error) {
        console.error('Failed to load selected theme:', error)
      }
    }
    
    loadSelectedTheme()
  }, [getSelectedThemeId])

  useEffect(() => {
    if (!selectedId) return

    const applySelectedTheme = async () => {
      try {
        // Check preset themes first
        const presetTheme = PRESET_THEMES.find(theme => theme.id === selectedId)
        if (presetTheme) {
          await sendToContentScript({ name: "change", body: presetTheme.colors })
          return
        }

        // Check custom themes
        const customTheme = customThemes.find(theme => theme.id === selectedId)
        if (customTheme) {
          await sendToContentScript({ name: "change", body: customTheme.colors })
          return
        }
      } catch (error) {
        console.error('Failed to apply selected theme:', error)
      }
    }
    
    applySelectedTheme()
  }, [selectedId, customThemes])

  const handleSelectedIdChange = async (newSelectedId: string | null) => {
    setSelectedId(newSelectedId)
    try {
      await setSelectedThemeId(newSelectedId)
    } catch (error) {
      console.error('Failed to save selected theme:', error)
    }
  }

  const resetSelection = () => handleSelectedIdChange(null)

  return (
    <div className="plasmo-h-screen plasmo-flex plasmo-flex-col plasmo-items-center plasmo-p-3 plasmo-w-96">
      <button 
        className="plasmo-flex plasmo-items-center plasmo-border-gray-400 dark:plasmo-border-gray-600 plasmo-border-2 plasmo-w-11/12 plasmo-px-6 plasmo-py-4 plasmo-text-white plasmo-text-xl hover:plasmo-bg-blue-800 plasmo-bg-blue-700 plasmo-rounded-lg"
        onClick={() => setShowModal(true)}
      >
        Create your own custom color template
      </button>

      <div className="plasmo-mt-2 dark:plasmo-text-yellow-400 plasmo-text-yellow-600 plasmo-w-auto plasmo-pb-2">
        ⚠️ Enable <a 
          className="plasmo-text-blue-400 plasmo-underline" 
          href="https://support.google.com/chrome/answer/185277?hl=en#zippy=" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          sync
        </a> to save themes across devices 
      </div>

      <ThemeControls onReset={resetSelection} />

      <CustomList
        themes={customThemes}
        reloadKey={reloadKey}
        selectedId={selectedId}
        setSelectedId={handleSelectedIdChange}
        onThemeDeleted={() => setReloadKey(k => k + 1)}
      />

      <h2 className="dark:plasmo-text-white plasmo-text-gray-900 plasmo-p-2 plasmo-text-l">
        Or try some of ours...
      </h2>

      <PresetList
        reloadKey={0}
        selectedId={selectedId}
        setSelectedId={handleSelectedIdChange}
      />

      {showModal && (
        <ThemeModal
          onClose={() => setShowModal(false)}
          triggerReload={() => setReloadKey(k => k + 1)}
          accountType={accountType}
        />
      )}
    </div>
  )
}

export default UserPage

// src/components/PresetList.tsx
import React, { useEffect, useState } from "react"
import { PreviewPreset } from "./PreviewPreset"
import { getPresetThemes } from "~utils/presetUtils"
import { sendToContentScript } from "@plasmohq/messaging"
import type { Theme } from "~types"

interface PresetListProps {
  reloadKey: number
  selectedId: string | null
  setSelectedId: (id: string | null) => void
}

const PresetList = ({ reloadKey, selectedId, setSelectedId }: PresetListProps) => {
  const [themes, setThemes] = useState<Theme[]>([])

  const handleSelect = async (id: string, colors: string[]) => {
    setSelectedId(id)
    try {
      await sendToContentScript({ name: "change", body: colors })
    } catch (error) {
      console.error('Failed to apply theme:', error)
    }
  }
  
  useEffect(() => {
    setThemes(getPresetThemes())
  }, [reloadKey])

  return (
    <div className="plasmo-flex-grow plasmo-basis-0 plasmo-w-4/5 plasmo-text-sm plasmo-font-medium plasmo-text-gray-900 plasmo-bg-white plasmo-border-2 plasmo-border-gray-400 dark:plasmo-border-gray-600 plasmo-rounded-lg dark:plasmo-bg-gray-700 dark:plasmo-text-white plasmo-overflow-y-auto">
      <ul className="plasmo-overflow-hidden">
        {themes.map((theme) => (
          <PreviewPreset
            key={theme.id}
            theme={theme}
            isSelected={theme.id === selectedId}
            onSelect={() => handleSelect(theme.id, theme.colors)}
          />
        ))}
      </ul>
    </div>
  )
}

export default PresetList


// src/components/CustomList.tsx
import React, { useState } from "react"
import { PreviewCustom } from "./PreviewCustom"
import { sendToContentScript } from "@plasmohq/messaging"
import type { Theme } from "~types"
import { deleteTheme } from "~utils/themeStorage"
import ThemeModal from "~modals/ThemeModal"
import { useAuth } from "~authContext"

interface CustomListProps {
  themes: Theme[]
  reloadKey: number
  selectedId: string | null
  setSelectedId: (id: string | null) => void
  onThemeDeleted: () => void
}

const CustomList = ({ themes, selectedId, setSelectedId, onThemeDeleted }: CustomListProps) => {
  const [showModal, setShowModal] = useState(false)
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null)
  const { accountType } = useAuth()

  const handleSelect = async (id: string, colors: string[]) => {
    setSelectedId(id)
    try {
      await sendToContentScript({ name: "change", body: colors })
    } catch (error) {
      console.error('Failed to apply theme:', error)
    }
  }

  const openEditModal = (theme: Theme) => {
    setEditingTheme(theme)
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteTheme(id)
      onThemeDeleted()
    } catch (error) {
      console.error('Failed to delete theme:', error)
    }
  }
  
  const handleModalClose = () => {
    setShowModal(false)
    setEditingTheme(null)
  }

  return (
    <div className="plasmo-text-sm plasmo-font-medium plasmo-text-gray-900 plasmo-bg-gray-200 dark:plasmo-bg-gray-800 plasmo-border-2 plasmo-border-gray-400 dark:plasmo-border-gray-600 plasmo-rounded-lg dark:plasmo-text-white plasmo-overflow-y-auto plasmo-flex-grow plasmo-basis-0 plasmo-w-4/5">
      {themes.length === 0 ? (
        <p className="plasmo-p-6 plasmo-text-center plasmo-text-gray-500 dark:plasmo-text-gray-400">
          You haven't created any custom themes yet. Click the button above to get started!
        </p>
      ) : (
        <>
          <ul className="plasmo-overflow-hidden">
            {themes.map((theme) => (
              <PreviewCustom
                key={theme.id}
                theme={theme}
                isSelected={theme.id === selectedId}
                onSelect={() => handleSelect(theme.id, theme.colors)}
                onDelete={theme.isCustom ? () => handleDelete(theme.id) : undefined}
                onEdit={theme.isCustom ? () => openEditModal(theme) : undefined}
              />
            ))}
          </ul>
  
          {showModal && (
            <ThemeModal
              onClose={handleModalClose}
              triggerReload={onThemeDeleted}
              accountType={accountType}
              editingTheme={editingTheme}
            />
          )}
        </>
      )}
    </div>
  )
}

export default CustomList
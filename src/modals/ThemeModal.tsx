// src/modals/ThemeModal.tsx
import React, { useEffect, useState } from "react"
import { createTheme, updateTheme } from "~utils/themeStorage"
import type { AccountType, Theme } from "~types"

interface ThemeModalProps {
  onClose: () => void
  triggerReload: () => void
  accountType: AccountType
  editingTheme?: Theme | null
}

const ThemeModal = ({ onClose, triggerReload, accountType, editingTheme }: ThemeModalProps) => {
  const [name, setName] = useState("")
  const [color1, setColor1] = useState("#000000")
  const [color2, setColor2] = useState("#ffffff")
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (editingTheme) {
      setName(editingTheme.name)
      setColor1(editingTheme.colors[0])
      setColor2(editingTheme.colors[1])
    }
  }, [editingTheme])

  const handleSave = async () => {
    const trimmedName = name.trim()

    if (!trimmedName) {
      setShowError(true)
      return
    }

    setShowError(false)

    const themeData = {
      name: trimmedName,
      colors: [color1, color2]
    }

    try {
      if (editingTheme) {
        await updateTheme({ ...editingTheme, ...themeData })
      } else {
        await createTheme(themeData)
      }
      triggerReload()
      onClose()
    } catch (error) {
      console.error("Failed to save theme:", error)
    }
  }

  return (
    <div className="plasmo-fixed plasmo-inset-0 plasmo-bg-black/60 plasmo-flex plasmo-justify-center plasmo-items-center plasmo-z-50">
      <div className="plasmo-bg-white dark:plasmo-bg-gray-900 plasmo-rounded-xl plasmo-shadow-xl plasmo-p-6 plasmo-w-80 plasmo-space-y-4">
        <h2 className="plasmo-text-xl plasmo-font-semibold plasmo-text-gray-800 dark:plasmo-text-white">
          {editingTheme ? "Edit Theme" : "Create New Theme"}
        </h2>

        <div>
          <label className="plasmo-block plasmo-text-sm plasmo-font-medium plasmo-text-gray-700 dark:plasmo-text-gray-300 plasmo-mb-1">
            Theme Name
          </label>
          {showError && (
            <p className="plasmo-text-sm plasmo-text-red-500 plasmo-mb-1">
              Theme name is required
            </p>
          )}
          <input
            type="text"
            placeholder="My Custom Theme"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`plasmo-w-full plasmo-p-2 plasmo-border plasmo-rounded-md dark:plasmo-bg-gray-800 dark:plasmo-text-white ${
              showError
                ? "plasmo-border-red-500"
                : "plasmo-border-gray-300 dark:plasmo-border-gray-600"
            }`}
          />
        </div>

        <div>
          <label className="plasmo-block plasmo-text-sm plasmo-font-medium plasmo-text-gray-700 dark:plasmo-text-gray-300 plasmo-mb-1">
            Text Color
          </label>
          <div className="plasmo-relative plasmo-w-full plasmo-h-10 plasmo-rounded-md">
            <input
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="plasmo-absolute plasmo-inset-0 plasmo-w-full plasmo-h-full plasmo-opacity-0 plasmo-cursor-pointer"
            />
            <div
              className="plasmo-w-full plasmo-h-full plasmo-rounded-md plasmo-border plasmo-border-gray-300 dark:plasmo-border-gray-600"
              style={{ backgroundColor: color1 }}
            />
          </div>
        </div>

        <div>
          <label className="plasmo-block plasmo-text-sm plasmo-font-medium plasmo-text-gray-700 dark:plasmo-text-gray-300 plasmo-mb-1">
            Background Color
          </label>
          <div className="plasmo-relative plasmo-w-full plasmo-h-10 plasmo-rounded-md">
            <input
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="plasmo-absolute plasmo-inset-0 plasmo-w-full plasmo-h-full plasmo-opacity-0 plasmo-cursor-pointer"
            />
            <div
              className="plasmo-w-full plasmo-h-full plasmo-rounded-md plasmo-border plasmo-border-gray-300 dark:plasmo-border-gray-600"
              style={{ backgroundColor: color2 }}
            />
          </div>
        </div>

        <div>
          <label className="plasmo-block plasmo-text-sm plasmo-font-medium plasmo-text-gray-700 dark:plasmo-text-gray-300 plasmo-mb-1">
            Preview
          </label>
          <div
            className="plasmo-rounded-md plasmo-border plasmo-border-gray-300 dark:plasmo-border-gray-600 plasmo-p-4 plasmo-space-y-2"
            style={{ backgroundColor: color2, color: color1 }}
          >
            <h3 className="plasmo-text-lg plasmo-font-semibold">Sample Heading</h3>
            <p className="plasmo-text-sm">
              This preview shows how your text will appear with your chosen colors.
            </p>
          </div>
        </div>

        <div className="plasmo-flex plasmo-justify-between plasmo-items-center plasmo-pt-2">
          <button
            onClick={onClose}
            className="plasmo-px-4 plasmo-py-2 plasmo-text-sm plasmo-text-gray-500 hover:plasmo-text-gray-700 dark:plasmo-text-gray-400 dark:hover:plasmo-text-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="plasmo-bg-blue-600 hover:plasmo-bg-blue-700 plasmo-text-white plasmo-px-4 plasmo-py-2 plasmo-rounded-md plasmo-transition-colors"
          >
            {editingTheme ? "Update Theme" : "Create Theme"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ThemeModal

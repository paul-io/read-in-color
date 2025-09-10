// src/components/PreviewPreset.tsx
import React from 'react'
import type { Theme } from '~types'

interface PreviewPresetProps {
  theme: Theme
  isSelected: boolean
  onSelect: () => void
}

export const PreviewPreset = ({ theme, isSelected, onSelect }: PreviewPresetProps) => {
  const { name, colors } = theme

  return (
    <li 
      onClick={onSelect}
      className={`plasmo-w-full plasmo-border-b plasmo-border-gray-400 dark:plasmo-border-gray-600 hover:plasmo-bg-gray-100 dark:hover:plasmo-bg-gray-600 plasmo-cursor-pointer ${
        isSelected ? 'plasmo-bg-blue-100 dark:plasmo-bg-gray-500' : 'dark:plasmo-bg-gray-700 plasmo-bg-white'
      }`}
    >
      <div className="plasmo-p-3 plasmo-flex plasmo-items-center plasmo-justify-between">
        <span className="plasmo-text-sm plasmo-font-medium plasmo-truncate plasmo-flex-1 plasmo-mr-3">
          {name}
        </span>
        <div className="plasmo-flex plasmo-gap-2">
          {colors.map((color, index) => (
            <span
              key={`${color}-${index}`}
              style={{ backgroundColor: color }}
              className="plasmo-w-5 plasmo-h-5 plasmo-border plasmo-border-gray-400 plasmo-rounded-sm"
            />
          ))}
        </div>
      </div>
    </li>
  )
}
// src/components/PreviewCustom.tsx
import React from 'react'
import type { Theme } from '~types'

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="m18.5 2.5 a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
)

interface PreviewCustomProps {
  theme: Theme
  isSelected: boolean
  onSelect: () => void
  onDelete?: () => void
  onEdit?: () => void
}

export const PreviewCustom = ({ theme, isSelected, onSelect, onDelete, onEdit }: PreviewCustomProps) => {
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
        <div className="plasmo-flex plasmo-gap-2 plasmo-items-center">
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onEdit()
              }}
              className="plasmo-p-1.5 plasmo-rounded hover:plasmo-bg-blue-100 hover:plasmo-text-blue-600 dark:hover:plasmo-bg-blue-900/20"
            >
              <EditIcon />
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
              className="plasmo-p-1.5 plasmo-rounded hover:plasmo-bg-red-100 hover:plasmo-text-red-600 dark:hover:plasmo-bg-red-900/20"
            >
              <DeleteIcon />
            </button>
          )}
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
      </div>
    </li>
  )
}

// src/utils/presetUtils.ts
import type { Theme } from '~types'
import { PRESET_THEMES } from '~constants/presets'

export const getPresetById = (id: string): Theme | undefined => {
  return PRESET_THEMES.find(theme => theme.id === id)
}

export const isPresetTheme = (id: string): boolean => {
  return PRESET_THEMES.some(theme => theme.id === id)
}

export const getPresetThemes = (): Theme[] => {
  return [...PRESET_THEMES]
}
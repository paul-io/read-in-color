// src/constants/presets.ts
import type { Theme } from '~types'

export const PRESET_THEMES: readonly Theme[] = [
  {
    id: "matrix",
    name: "Matrix",
    colors: ["#45f82e", "#000000"],
    isCustom: false
  },
  {
    id: "redsand",
    name: "Redsand",
    colors: ["#f5e967", "#851d1d"],
    isCustom: false
  },
  {
    id: "forest",
    name: "Forest",
    colors: ["#3fa64e", "#402f04"],
    isCustom: false
  },
  {
    id: "legal-pad",
    name: "Legal Pad",
    colors: ["#000000", "#ffff87"],
    isCustom: false
  },
  {
    id: "sunsets",
    name: "Sunsets",
    colors: ["#ffc198", "#a84257"],
    isCustom: false
  },
  {
    id: "barbie",
    name: "Barbie",
    colors: ["#8B008B", "#FFC0CB"],
    isCustom: false
  },
  {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    colors: ["#006064", "#B2EBF2"],
    isCustom: false
  },
  {
    id: "renaissance",
    name: "Renaissance",
    colors: ["#e8c764", "#c98a8c"],
    isCustom: false
  },
  {
    id: "newspaper",
    name: "Newspaper",
    colors: ["#000000", "#FFFFFF"],
    isCustom: false
  },
  {
    id: "cozy-cafe",
    name: "Cozy Café",
    colors: ["#4E342E", "#FFF3E0"],
    isCustom: false
  },
  {
    id: "deep-space",
    name: "Deep Space",
    colors: ["#f29435", "#200d4a"],
    isCustom: false
  },
  {
    id: "starry-night",
    name: "Starry Night",
    colors: ["#FFECB3", "#0D47A1"],
    isCustom: false
  },
  {
    id: "noir",
    name: "Noir",
    colors: ["#ECEFF1", "#212121"],
    isCustom: false
  }
] as const
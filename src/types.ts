// types.ts
export type AccountType = "guest" | "signed-in"

export type Theme = {
  id: string
  name: string
  colors: string[]
  isCustom: boolean
}
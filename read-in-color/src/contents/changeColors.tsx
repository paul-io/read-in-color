// src/contents/changeColors.tsx
import type { PlasmoCSConfig } from "plasmo"
import { useState } from "react"
import { useMessage } from "@plasmohq/messaging/hook"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

const ChangeColors = () => {
  const [colors, setColors] = useState<string[] | null>(null)
  const [isReversed, setIsReversed] = useState<boolean>(false)

  useMessage<string[], string>(async (req, res) => {
    const { name, body } = req

    if (name === "change") {
      setColors(body)
      setIsReversed(false)
      applyTheme(body, false)
      res.send("change success")
      return
    }

    if (name === "reset") {
      removeAllThemeStyles()
      setColors(null)
      setIsReversed(false)
      res.send("reset success")
      return
    }

    if (name === "reverse") {
      if (!colors) {
        res.send("no theme to reverse")
        return
      }
      
      const newReversedState = !isReversed
      setIsReversed(newReversedState)
      applyTheme(colors, newReversedState)
      res.send("reverse success")
      return
    }
  })

  return null
}

function applyTheme(colors: string[], reversed: boolean): void {
  removeAllThemeStyles()
  
  const style = document.createElement("style")
  style.setAttribute("data-theme-injected", "true")
  style.textContent = createCSS(colors, reversed)
  document.head.appendChild(style)
}

function removeAllThemeStyles(): void {
  const existingStyles = document.querySelectorAll('style[data-theme-injected]')
  existingStyles.forEach(style => style.remove())
}

function createCSS(colors: string[], reversed: boolean = false): string {
  const [textColor, backgroundColor] = reversed 
    ? [colors[1], colors[0]] 
    : [colors[0], colors[1]]

  switch (colors.length) {
    case 2:
      return `
        body, 
        div,
        span, 
        header, 
        footer, 
        section, 
        article, 
        nav, 
        aside, 
        main, 
        figure, 
        figcaption, 
        blockquote,
        p, 
        ul, 
        ol, 
        li, 
        table, 
        th, 
        td, 
        h1, h2, h3, h4, h5, h6, 
        input, 
        textarea, 
        select, 
        button {
          background-color: ${backgroundColor} !important;
          color: ${textColor} !important;
        }
        a {
          color: ${textColor} !important;
        }
      `

    case 3:
      return `
        body {
          background-color: ${backgroundColor} !important;
          color: ${textColor} !important;
        }
        div, span, header, footer, section, article, nav, aside, main, figure, figcaption, blockquote, p {
          background-color: ${colors[2]} !important;
          color: ${textColor} !important;
        }
        a {
          color: ${textColor} !important;
        }
        button {
          background-color: ${backgroundColor} !important;
          color: ${textColor} !important;
        }
        input, textarea, select {
          background-color: ${colors[2]} !important;
          color: ${textColor} !important;
        }
        table, th, td {
          background-color: ${backgroundColor} !important;
          color: ${textColor} !important;
        }
      `

    case 4:
      return `
        body {
          background-color: ${backgroundColor} !important;
          color: ${textColor} !important;
        }
        div, span, header, footer, section, article, nav, aside, main, figure, figcaption, blockquote, p {
          background-color: ${colors[2]} !important;
          color: ${textColor} !important;
        }
        a {
          color: ${colors[3]} !important;
        }
        button {
          background-color: ${textColor} !important;
          color: ${colors[2]} !important;
        }
        input, textarea, select {
          background-color: ${colors[3]} !important;
          color: ${textColor} !important;
        }
        table, th, td {
          background-color: ${backgroundColor} !important;
          color: ${textColor} !important;
        }
        h1, h2, h3, h4, h5, h6 {
          color: ${colors[3]} !important;
        }
      `

    case 5:
      return `
        body {
          background: linear-gradient(135deg, ${backgroundColor}, ${colors[2]}) !important;
          color: ${textColor} !important;
        }
        div:nth-child(odd) {
          background-color: ${backgroundColor} !important;
        }
        div:nth-child(even) {
          background-color: ${colors[2]} !important;
        }
        div, header, footer, section, article {
          border: 1px solid ${colors[3]} !important;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1) !important;
        }
        h1, h2, h3, h4, h5, h6 {
          color: ${colors[4]} !important;
        }
        a {
          color: ${textColor} !important;
        }
        button {
          background-color: ${textColor} !important;
          color: ${colors[4]} !important;
        }
        input, textarea, select {
          background-color: ${colors[3]} !important;
          color: ${textColor} !important;
        }
      `

    default:
      console.warn(`Unsupported color count: ${colors.length}`)
      return ""
  }
}

export default ChangeColors
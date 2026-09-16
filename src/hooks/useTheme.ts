import { useEffect, useState } from "react"

function getSystemTheme() {
  return typeof window !== "undefined"
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
    : false
}

export default function useTheme() {
  const [dark, setDark] = useState(getSystemTheme)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      setDark(event.matches)
    }

    mediaQuery.addEventListener("change", handleSystemThemeChange)
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange)
  }, [])

  function toggleDark() {
    setDark((d) => !d)
  }

  return { dark, toggleDark }
}

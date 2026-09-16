import { useEffect, useState } from "react"

export default function useTheme() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  function toggleDark() {
    setDark((d) => !d)
  }

  return { dark, toggleDark }
}

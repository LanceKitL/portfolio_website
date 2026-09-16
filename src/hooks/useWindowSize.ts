import { useEffect, useState } from "react"

interface WindowSize {
  width: number
  height: number
}

function getSize(): WindowSize {
  if (typeof window === "undefined") return { width: 0, height: 0 }
  return { width: window.innerWidth, height: window.innerHeight }
}

export default function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>(getSize)

  useEffect(() => {
    const handleResize = () => setSize(getSize())
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return size
}

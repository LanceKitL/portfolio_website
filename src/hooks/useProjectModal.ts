import { useEffect, useState } from "react"
import { PROJECTS } from "@/data/content"

export default function useProjectModal() {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  useEffect(() => {
    document.body.style.overflow = selectedId ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [selectedId])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  const selectedProject = PROJECTS.find((p) => p.id === selectedId) ?? null

  return {
    selectedProject,
    open: setSelectedId,
    close: () => setSelectedId(null),
  }
}

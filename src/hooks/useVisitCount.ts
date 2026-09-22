import { useEffect, useState } from "react"

const SESSION_KEY = "kit-portfolio-visit-counted"

export type VisitCountStatus = "loading" | "ready" | "error"

export interface VisitCountResult {
  count: number | null
  status: VisitCountStatus
}

function readSessionFlag(): boolean {
  try {
    return Boolean(sessionStorage.getItem(SESSION_KEY))
  } catch {
    return false
  }
}

function writeSessionFlag(): boolean {
  try {
    sessionStorage.setItem(SESSION_KEY, "1")
    return true
  } catch {
    return false
  }
}

function clearSessionFlag() {
  try {
    sessionStorage.removeItem(SESSION_KEY)
  } catch {
    // Storage may be unavailable (private mode) — nothing to clean up.
  }
}

export default function useVisitCount(): VisitCountResult {
  const [count, setCount] = useState<number | null>(null)
  const [status, setStatus] = useState<VisitCountStatus>("loading")

  useEffect(() => {
    const controller = new AbortController()
    const alreadyCounted = readSessionFlag()
    const flagWritten = alreadyCounted || writeSessionFlag()

    fetch(`/api/page-views?increment=${alreadyCounted ? "0" : "1"}`, {
      cache: "no-store",
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(`Visit count failed: ${response.status}`)
        return response.json() as Promise<{ count?: number }>
      })
      .then((data) => {
        if (controller.signal.aborted) return
        if (
          typeof data.count === "number" &&
          Number.isFinite(data.count) &&
          data.count >= 0
        ) {
          setCount(data.count)
          setStatus("ready")
        } else {
          throw new Error("Invalid visit count payload")
        }
      })
      .catch((error) => {
        if (controller.signal.aborted) return
        if (error instanceof DOMException && error.name === "AbortError") {
          return
        }
        // Allow a retry on the next navigation if this visit was never counted.
        if (!alreadyCounted && flagWritten) clearSessionFlag()
        setStatus("error")
      })

    return () => controller.abort()
  }, [])

  return { count, status }
}

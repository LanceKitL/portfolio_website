import { StrictMode, useEffect, useState, type ComponentType } from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

function DeferredAnalytics() {
  const [Analytics, setAnalytics] = useState<ComponentType | null>(null)

  useEffect(() => {
    const loadAnalytics = () => {
      import("@vercel/analytics/react").then(({ Analytics: AnalyticsComponent }) => {
        setAnalytics(() => AnalyticsComponent)
      })
    }
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void) => number
      cancelIdleCallback?: (handle: number) => void
    }
    const usesIdleCallback = Boolean(idleWindow.requestIdleCallback)
    const idleHandle = usesIdleCallback
      ? idleWindow.requestIdleCallback!(loadAnalytics)
      : window.setTimeout(loadAnalytics, 1500)

    return () => {
      if (usesIdleCallback && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleHandle)
      } else {
        window.clearTimeout(idleHandle)
      }
    }
  }, [])

  return Analytics ? <Analytics /> : null
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <DeferredAnalytics />
  </StrictMode>,
)

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => registration.unregister())
  })
}

if ("caches" in window) {
  caches.keys().then((keys) => {
    keys
      .filter((key) => key.startsWith("portfolio-cache-"))
      .forEach((key) => caches.delete(key))
  })
}

import { useEffect, useState } from "react"
import { useScroll } from "motion/react"
import ConfettiLayer from "@/components/ConfettiLayer"
import Footer from "@/components/layout/Footer"
import Nav from "@/components/layout/Nav"
import ScrollProgress from "@/components/layout/ScrollProgress"
import AchievementsSection from "@/components/sections/AchievementsSection"
import ContactSection from "@/components/sections/ContactSection"
import CapabilitiesSection from "@/components/sections/CapabilitiesSection"
import { PROJECTS } from "@/data/content"
import Hero from "@/components/sections/Hero"
import ProjectsSection from "@/components/sections/ProjectsSection"
import SectionDivider from "@/components/SectionDivider"
import useTheme from "@/hooks/useTheme"

const MIN_LOADER_DURATION = 2000
const ASSET_URLS = ["/01.mp4", ...PROJECTS.map((project) => project.image)]

function preloadAsset(url: string) {
  if (url.endsWith(".mp4")) {
    return new Promise<void>((resolve) => {
      const video = document.createElement("video")
      const finish = () => {
        video.removeEventListener("canplaythrough", finish)
        video.removeEventListener("error", finish)
        resolve()
      }

      video.preload = "auto"
      video.addEventListener("canplaythrough", finish, { once: true })
      video.addEventListener("error", finish, { once: true })
      video.src = url
      video.load()
    })
  }

  return new Promise<void>((resolve) => {
    const image = new Image()
    image.onload = () => {
      image.decode().catch(() => undefined).finally(resolve)
    }
    image.onerror = () => resolve()
    image.src = url
  })
}

export default function App() {
  const { dark, toggleDark } = useTheme()
  const [confettiRun, setConfettiRun] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const minimumDuration = new Promise<void>((resolve) => {
      setTimeout(resolve, MIN_LOADER_DURATION)
    })

    Promise.all([minimumDuration, ...ASSET_URLS.map(preloadAsset)]).then(() => {
      setShowContent(true)
    })
  }, [])

  if (!showContent) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#000000] flex items-center justify-center">
        <div className="loader" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#000000] text-[#1d1d1f] dark:text-[#f5f5f7] transition-colors duration-300">
      <ConfettiLayer
        run={confettiRun}
        onComplete={() => setConfettiRun(false)}
      />

      <ScrollProgress progress={scrollYProgress} />

      <Nav dark={dark} onToggleDark={toggleDark} />

      <Hero />

      <ProjectsSection />

      <SectionDivider />

      <AchievementsSection />

      <SectionDivider />

      <CapabilitiesSection />

      <SectionDivider />

      <ContactSection onSuccess={() => setConfettiRun(true)} />

      <Footer />
    </div>
  )
}

import { useEffect, useState } from "react"
import { stagger, useScroll } from "motion/react"
import ConfettiLayer from "@/components/ConfettiLayer"
import Footer from "@/components/layout/Footer"
import Nav from "@/components/layout/Nav"
import ScrollProgress from "@/components/layout/ScrollProgress"
import AchievementsSection from "@/components/sections/AchievementsSection"
import CertificationsSection from "@/components/sections/CertificationsSection"
import ContactSection from "@/components/sections/ContactSection"
import CapabilitiesSection from "@/components/sections/CapabilitiesSection"
import { ACHIEVEMENTS, PROJECTS } from "@/data/content"
import Hero from "@/components/sections/Hero"
import ProjectsSection from "@/components/sections/ProjectsSection"
import SectionDivider from "@/components/SectionDivider"
import useTheme from "@/hooks/useTheme"

const MIN_LOADER_DURATION = 2000
const ASSET_URLS = [
  "/01.mp4",
  ...PROJECTS.map((project) => project.image),
  ...ACHIEVEMENTS.map((item) => item.icon),
]

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
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#17181a]">
        <div className="loader" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] transition-colors duration-300 dark:bg-[#17181a] dark:text-[#f2efe8]">
      <ConfettiLayer
        run={confettiRun}
        onComplete={() => setConfettiRun(false)}
      />

      <ScrollProgress progress={scrollYProgress} />

      <Nav dark={dark} onToggleDark={toggleDark} />

      <main>
        <Hero />

        <ProjectsSection />

        <SectionDivider />

        <AchievementsSection />

        <SectionDivider />

        <CertificationsSection />

        <SectionDivider />

        <CapabilitiesSection />

        <SectionDivider />

        <ContactSection onSuccess={() => setConfettiRun(true)} />
      </main>

      <Footer />
    </div>
  )
}

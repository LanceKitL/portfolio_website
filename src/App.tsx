import { useState } from "react"
import { useScroll } from "motion/react"
import ConfettiLayer from "@/components/ConfettiLayer"
import Footer from "@/components/layout/Footer"
import Nav from "@/components/layout/Nav"
import ScrollProgress from "@/components/layout/ScrollProgress"
import AchievementsSection from "@/components/sections/AchievementsSection"
import ContactSection from "@/components/sections/ContactSection"
import Hero from "@/components/sections/Hero"
import ProjectsSection from "@/components/sections/ProjectsSection"
import SectionDivider from "@/components/SectionDivider"
import useTheme from "@/hooks/useTheme"

export default function App() {
  const { dark, toggleDark } = useTheme()
  const [confettiRun, setConfettiRun] = useState(false)
  const { scrollYProgress } = useScroll()

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

      <ContactSection onSuccess={() => setConfettiRun(true)} />

      <Footer />
    </div>
  )
}

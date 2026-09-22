import { lazy, Suspense, useState } from "react"
import { useScroll } from "motion/react"
import Footer from "@/components/layout/Footer"
import Nav from "@/components/layout/Nav"
import ScrollProgress from "@/components/layout/ScrollProgress"
import SectionSkeleton from "@/components/SectionSkeleton"
import { PROJECTS } from "@/data/content"
import Hero from "@/components/sections/Hero"
import ProjectsSection from "@/components/sections/ProjectsSection"
import SectionDivider from "@/components/SectionDivider"
import useTheme from "@/hooks/useTheme"

const AchievementsSection = lazy(
  () => import("@/components/sections/AchievementsSection"),
)
const CertificationsSection = lazy(
  () => import("@/components/sections/CertificationsSection"),
)
const CapabilitiesSection = lazy(
  () => import("@/components/sections/CapabilitiesSection"),
)
const ContactSection = lazy(
  () => import("@/components/sections/ContactSection"),
)
const ConfettiLayer = lazy(() => import("@/components/ConfettiLayer"))

export default function App() {
  const { dark, toggleDark } = useTheme()
  const [confettiRun, setConfettiRun] = useState(false)
  const { scrollYProgress } = useScroll()

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] transition-colors duration-300 dark:bg-[#17181a] dark:text-[#f2efe8]">
      <Suspense fallback={null}>
        <ConfettiLayer
          run={confettiRun}
          onComplete={() => setConfettiRun(false)}
        />
      </Suspense>

      <ScrollProgress progress={scrollYProgress} />

      <Nav dark={dark} onToggleDark={toggleDark} />

      <main>
        <Hero />

        <ProjectsSection />

        <SectionDivider />

        <Suspense fallback={<SectionSkeleton />}>
          <AchievementsSection />
        </Suspense>

        <SectionDivider />

        <Suspense fallback={<SectionSkeleton />}>
          <CertificationsSection />
        </Suspense>

        <SectionDivider />

        <Suspense fallback={<SectionSkeleton />}>
          <CapabilitiesSection />
        </Suspense>

        <SectionDivider />

        <Suspense fallback={<SectionSkeleton />}>
          <ContactSection onSuccess={() => setConfettiRun(true)} />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}

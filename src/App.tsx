import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll } from "motion/react"
import Confetti from "react-confetti"
import BlurText from "./components/BlurText"
import useWindowSize from "./hooks/useWindowSize"
import {
  getCooldownRemaining,
  isValidEmail,
  LIMITS,
  markSubmitted,
  MIN_MESSAGE_LENGTH,
  sanitizeLine,
  sanitizeMessage,
  submitContactForm,
} from "./lib/contact"

const NAV_LINKS = ["Projects", "Achievements", "Contact"]

const PROJECTS = [
  {
    id: 1,
    title: "AutoMatik",
    category: "Fullstack · Project Manager",
    year: "2026",
    description:
      "Car dealership management system covering the entire dealership process — customer self-portal, AI chatbot for inquiries, push notifications, and JWT + session security.",
    longDescription:
      "AutoMatik was built to digitize and streamline the full lifecycle of a car dealership — from browsing inventory to closing a deal. As Project Manager and Fullstack Developer, I led the architecture and implementation of a customer self-service portal, a conversational AI chatbot that handles inventory questions and lead qualification, real-time push notifications for deal updates, and a secure auth layer combining JWT tokens with session management. The UI was designed from the ground up in Svelte with Tailwind, prioritizing clarity and speed for both customers and dealership staff.",
    tags: ["Python", "Flask", "Svelte", "Tailwind", "SocketIO"],
    image: "./src/imports/001.jpg",
  },
  {
    id: 2,
    title: "Tilao Corp.",
    category: "Fullstack · ERP",
    year: "2026",
    description:
      "ERP prototype for a clothing manufacturing company covering production and sales workflows with a clean, responsive interface.",
    longDescription:
      "Tilao Corp. is a full-featured ERP prototype designed for a company that produces and sells clothing. As the sole Fullstack Developer, I built modules covering raw material tracking, production order management, inventory control, and sales reporting — all tied together in a unified React dashboard. The interface was crafted with Tailwind to keep complex data readable across screen sizes, and the system was architected to be extendable as the business scales.",
    tags: ["React", "Tailwind", "Shadcn"],
    image: "./src/imports/002.jpg",
  },
  {
    id: 3,
    title: "SciLab",
    category: "Fullstack · Offline-first",
    year: "2025",
    description:
      "Offline-first smart inventory management for schools, bundled with a shell script that auto-launches the entire stack — no technical knowledge required.",
    longDescription:
      "SciLab was built for schools that can't rely on a stable internet connection. The system runs entirely on a local machine and manages laboratory equipment inventory with a clean web interface powered by Laravel and Tailwind. The standout feature is a shell script I wrote that bootstraps the entire stack — web server, database, and browser — with a single command, making it accessible to students and professors with zero technical background. The offline-first design ensures the app works reliably in any environment.",
    tags: ["Shell", "Laravel", "Tailwind"],
    image: "./src/imports/003.jpg",
  },
]

const ACHIEVEMENTS = [
  {
    icon: "◉",
    title: "Most Improved Award",
    detail: "ASEAN Manila 2025 · Web Technologies",
  },
  {
    icon: "◈",
    title: "Web Technologies Nationals",
    detail: "Bronze Medalist · 2024",
  },
  {
    icon: "★",
    title: "Web Technologies Regionals",
    detail: "Gold Medalist · 2023",
  },
  {
    icon: "▲",
    title: "3+ Years Experience",
    detail: "Full-stack development & UI/UX design",
  },
  {
    icon: "◆",
    title: "Cross-stack Proficiency",
    detail: "Python, Svelte, React, Laravel, Tailwind",
  },
  {
    icon: "⬡",
    title: "Open to Collaboration",
    detail: "Part-time & project-based roles",
  },
]

const SKILLS = [
  "Python",
  "Flask",
  "Svelte",
  "React",
  "Laravel",
  "Tailwind",
  "Figma",
  "Shell",
]

const STATS = [
  { value: "3+", label: "Years of experience" },
  { value: "7+", label: "Projects built" },
  { value: "3×", label: "Competition placements" },
]

const ease = [0.25, 0.1, 0.25, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export default function App() {
  const [dark, setDark] = useState(false)
  const [activeNav, setActiveNav] = useState<string | null>(null)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [sent, setSent] = useState(false)
  const [confettiRun, setConfettiRun] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const [honeypot, setHoneypot] = useState(false)
  const firstInteractionAt = useRef<number | null>(null)

  const { width, height } = useWindowSize()
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  // Lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = selectedId ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [selectedId])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === "sending") return

    if (honeypot) {
      setSent(true)
      setConfettiRun(true)
      return
    }

    if (
      firstInteractionAt.current !== null &&
      Date.now() - firstInteractionAt.current < 1000
    ) {
      setSent(true)
      setConfettiRun(true)
      return
    }

    const name = sanitizeLine(formState.name, LIMITS.name)
    const email = sanitizeLine(formState.email, LIMITS.email)
    const message = sanitizeMessage(formState.message, LIMITS.message)

    const fail = (msg: string) => {
      setStatus("error")
      setErrorMsg(msg)
    }

    if (!name) return fail("Please enter your name.")
    if (!isValidEmail(email)) return fail("Please enter a valid email address.")
    if (message.length < MIN_MESSAGE_LENGTH)
      return fail("Please write a slightly longer message.")

    const cooldown = getCooldownRemaining()
    if (cooldown > 0) {
      return fail(
        `Please wait ${Math.ceil(cooldown / 1000)}s before sending again.`,
      )
    }

    setStatus("sending")
    setErrorMsg("")

    const result = await submitContactForm({ name, email, message })

    if (result.ok) {
      markSubmitted()
      setSent(true)
      setConfettiRun(true)
    } else {
      fail(result.error)
    }
  }

  const selectedProject = PROJECTS.find((p) => p.id === selectedId) ?? null

  return (
    <div className="min-h-screen bg-white dark:bg-[#000000] text-[#1d1d1f] dark:text-[#f5f5f7] transition-colors duration-300">
      {confettiRun && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={250}
          recycle={false}
          tweenDuration={3000}
          onConfettiComplete={() => setConfettiRun(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-[#1d1d1f] dark:bg-[#f5f5f7] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Nav */}
      <motion.nav
        className="fixed mx-7 lg:mx-0 top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#000000]/80 backdrop-blur-xl border-b border-[#d2d2d7]/60 dark:border-[#424245]/60"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease }}
      >
        <div className="max-w-5xl mx-auto h-14 flex items-center justify-between">
          <span className="text-[15px]  font-bold tracking-tight">Kit</span>
          <div className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setActiveNav(link)}
                className={`text-[13px] font-medium transition-colors ${
                  activeNav === link
                    ? "text-[#1d1d1f] dark:text-[#f5f5f7]"
                    : "text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7]"
                }`}
              >
                {link}
              </a>
            ))}
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle dark mode"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-[#f5f5f7] dark:bg-[#1c1c1e] text-[#6e6e73] dark:text-[#98989d] hover:bg-[#e5e5ea] dark:hover:bg-[#2c2c2e] transition-colors"
            >
              {dark ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="w-full pt-36 pb-28 px-6 bg-[#f5f5f7] dark:bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto flex flex-col-reverse lg:flex-row lg:items-start lg:justify-between gap-16">
          <div className="flex-1">
            <div className="mb-6">
              <BlurText
                text="Developer & Designer."
                delay={80}
                className="text-[56px] font-bold leading-[1.05] tracking-[-0.03em]"
                direction="bottom"
                stepDuration={0.4}
              />
              <BlurText
                text="Builder at heart."
                delay={80}
                className="text-[56px] font-bold leading-[1.05] tracking-[-0.03em] text-[#6e6e73]"
                direction="bottom"
                stepDuration={0.4}
                animationFrom={{ filter: "blur(10px)", opacity: 0, y: 30 }}
              />
            </div>

            <BlurText
              text="I build full-stack web apps with clean, thoughtful interfaces. Based in Quezon City, Philippines — open to part-time and project-based work."
              delay={40}
              className="text-[17px] text-[#6e6e73] leading-relaxed max-w-md mb-10"
              direction="bottom"
              stepDuration={0.3}
            />

            <motion.div
              className="flex flex-wrap gap-2"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              transition={{ delayChildren: 0.4 }}
            >
              {SKILLS.map((s) => (
                <motion.span
                  key={s}
                  variants={fadeUp}
                  className="text-[12px] font-medium text-[#6e6e73] dark:text-[#98989d] bg-white dark:bg-[#1c1c1e] px-3 py-1.5 rounded-full"
                >
                  {s}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="lg:w-[280px] text-center flex-shrink-0 justify-center items-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25, ease }}
          >
            <div className="w-full h-full lg:w-[310px] lg:h-[240px] rounded-[32px] overflow-hidden bg-[#CECECE] dark:bg-[#CECECE] mx-auto lg:mx-0">
              <video
                src="./src/imports/01.mp4"
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-sm lg:text-center lg:w-[310px] mt-4">
              I am currently taking
              <b>
                <span className="text-[#4286F5]"> G</span>
                <span className="text-[#DC4437]">o</span>
                <span className="text-[#F5B400]">o</span>
                <span className="text-[#4286F5]">g</span>
                <span className="text-[#109D58]">l</span>
                <span className="text-[#DC4437]">e </span>
                Data Analytics
              </b>
              .
            </div>
          </motion.div>
        </div>
      </section>

      {/* Work */}
      <section id="projects" className="py-28 px-6 max-w-5xl mx-auto">
        <motion.div
          className="flex items-baseline justify-between mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
        >
          <h2 className="text-[34px] font-bold tracking-[-0.02em]">
            Selected Projects
          </h2>
          <span className="text-[13px] text-[#6e6e73]">
            {PROJECTS.length} projects
          </span>
        </motion.div>

        <div className="space-y-6">
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.id}
              layoutId={`card-${project.id}`}
              className="group grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-0 rounded-2xl overflow-hidden border border-[#d2d2d7]/60 dark:border-[#424245]/60 bg-[#fafafa] dark:bg-[#0d0d0d] cursor-pointer"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
              whileHover={{ y: -3, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
              onClick={() => setSelectedId(project.id)}
            >
              <div className="p-10 flex flex-col justify-between min-h-[260px]">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[11px] font-semibold text-[#6e6e73] uppercase tracking-widest">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[11px] text-[#b0b0b5]">/</span>
                    <motion.span
                      layoutId={`card-category-${project.id}`}
                      className="text-[12px] text-[#6e6e73]"
                    >
                      {project.category}
                    </motion.span>
                    <span className="ml-auto text-[12px] text-[#b0b0b5]">
                      {project.year}
                    </span>
                  </div>
                  <motion.h3
                    layoutId={`card-title-${project.id}`}
                    className="text-[28px] font-bold tracking-[-0.02em] mb-3"
                  >
                    {project.title}
                  </motion.h3>
                  <p className="text-[15px] text-[#6e6e73] leading-relaxed max-w-sm">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-8">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium text-[#6e6e73] dark:text-[#98989d] border border-[#d2d2d7] dark:border-[#424245] px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <motion.div
                layoutId={`card-image-${project.id}`}
                className="bg-[#f0f0f5] dark:bg-[#111] overflow-hidden"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
                />
              </motion.div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* App Store Expanded Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Scrim */}
            <motion.div
              key="scrim"
              className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedId(null)}
            />

            {/* Expanded card */}
            <motion.div
              key={`expanded-${selectedId}`}
              layoutId={`card-${selectedId}`}
              className="fixed z-[110] top-[4vh] left-1/2 -translate-x-1/2 w-[min(680px,92vw)] max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0d0d0d] shadow-2xl"
              style={{ originX: 0.5, originY: 0 }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedId(null)}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/20 dark:bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-[14px] hover:bg-black/30 transition-colors"
              >
                ✕
              </button>

              {/* Image hero */}
              <motion.div
                layoutId={`card-image-${selectedId}`}
                className="w-full h-[260px] overflow-hidden rounded-t-3xl bg-[#f0f0f5] dark:bg-[#111]"
              >
                <motion.img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  initial={{ filter: "blur(12px)", scale: 1.04 }}
                  animate={{ filter: "blur(0px)", scale: 1 }}
                  exit={{ filter: "blur(12px)", scale: 1.04 }}
                  transition={{ duration: 0.45, ease }}
                />
              </motion.div>

              {/* Content */}
              <div className="p-8">
                <motion.p
                  layoutId={`card-category-${selectedId}`}
                  className="text-[12px] text-[#6e6e73] dark:text-[#98989d] uppercase tracking-widest mb-3"
                  initial={{ filter: "blur(6px)" }}
                  animate={{ filter: "blur(0px)" }}
                  exit={{ filter: "blur(6px)" }}
                  transition={{ duration: 0.4, ease }}
                >
                  {selectedProject.category}
                </motion.p>
                <motion.h3
                  layoutId={`card-title-${selectedId}`}
                  className="text-[32px] font-bold tracking-[-0.02em] mb-5"
                  initial={{ filter: "blur(8px)" }}
                  animate={{ filter: "blur(0px)" }}
                  exit={{ filter: "blur(8px)" }}
                  transition={{ duration: 0.4, delay: 0.05, ease }}
                >
                  {selectedProject.title}
                </motion.h3>

                {/* Extra detail fades in after the morph */}
                <motion.div
                  initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.35, delay: 0.18, ease }}
                >
                  <p className="text-[16px] text-[#6e6e73] leading-relaxed mb-6">
                    {selectedProject.longDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium text-[#6e6e73] dark:text-[#98989d] border border-[#d2d2d7] dark:border-[#424245] px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-[#d2d2d7]/60 dark:border-[#424245]/60 flex items-center justify-between">
                    <span className="text-[13px] text-[#b0b0b5]">
                      {selectedProject.year}
                    </span>
                    <button
                      onClick={() => setSelectedId(null)}
                      className="text-[13px] font-medium text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-[#d2d2d7]/60 dark:bg-[#424245]/60" />
      </div>

      {/* Achievements */}
      <section id="achievements" className="py-28 px-6 max-w-5xl mx-auto">
        <motion.div
          className="flex items-baseline justify-between mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
        >
          <h2 className="text-[34px] font-bold tracking-[-0.02em]">
            Achievements
          </h2>
          <span className="text-[13px] text-[#6e6e73]">Recognition</span>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#d2d2d7]/60 dark:bg-[#424245]/60 rounded-2xl overflow-hidden border border-[#d2d2d7]/60 dark:border-[#424245]/60"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {ACHIEVEMENTS.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="bg-white dark:bg-[#000000] p-8 hover:bg-[#fafafa] dark:hover:bg-[#0d0d0d] transition-colors duration-200 group"
            >
              <div className="text-[22px] mb-5 text-[#6e6e73] group-hover:text-[#1d1d1f] dark:group-hover:text-[#f5f5f7] transition-colors">
                {item.icon}
              </div>
              <div className="text-[17px] font-semibold tracking-[-0.01em] mb-2">
                {item.title}
              </div>
              <div className="text-[13px] text-[#6e6e73] leading-snug">
                {item.detail}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="mt-12 grid grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="text-center py-8 rounded-2xl bg-[#f5f5f7] dark:bg-[#0d0d0d]"
            >
              <div className="text-[42px] font-bold tracking-[-0.03em] mb-1">
                {stat.value}
              </div>
              <div className="text-[13px] text-[#6e6e73]">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-[#d2d2d7]/60 dark:bg-[#424245]/60" />
      </div>

      {/* Contact */}
      <section id="contact" className="py-28 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
          >
            <h2 className="text-[34px] font-bold tracking-[-0.02em] mb-4">
              Get in touch
            </h2>
            <p className="text-[17px] text-[#6e6e73] leading-relaxed mb-10 max-w-sm">
              Open to part-time roles and project-based collaborations. Let's
              build something together.
            </p>
            <div className="space-y-5">
              {[
                {
                  label: "Email",
                  value: "lancegomoa@gmail.com",
                  href: "mailto:lancegomoa@gmail.com",
                  icon: (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 7l-10 7L2 7" />
                    </svg>
                  ),
                },
                {
                  label: "GitHub",
                  value: "@lancekitl",
                  href: "https://github.com/LanceKitL",
                  icon: (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  ),
                },
              ].map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target="blank"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#f5f5f7] dark:bg-[#1c1c1e] flex items-center justify-center text-[#6e6e73] dark:text-[#98989d] group-hover:bg-[#1d1d1f] dark:group-hover:bg-[#f5f5f7] group-hover:text-white dark:group-hover:text-[#1d1d1f] transition-all duration-200">
                    {contact.icon}
                  </div>
                  <div>
                    <div className="text-[11px] text-[#b0b0b5] uppercase tracking-widest mb-0.5">
                      {contact.label}
                    </div>
                    <div className="text-[14px] font-medium group-hover:text-[#6e6e73] transition-colors">
                      {contact.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease }}
                  className="h-full flex flex-col items-center justify-center text-center py-16"
                >
                  <div className="w-14 h-14 rounded-full bg-[#1d1d1f] dark:bg-[#f5f5f7] flex items-center justify-center mb-6">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="text-white dark:text-[#1d1d1f]"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="text-[20px] font-semibold mb-2">
                    Message sent
                  </div>
                  <div className="text-[14px] text-[#6e6e73]">
                    I will get back to you within 24 hours.
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease }}
                  onSubmit={handleSubmit}
                  onFocusCapture={() => {
                    if (firstInteractionAt.current === null)
                      firstInteractionAt.current = Date.now()
                  }}
                  className="space-y-5"
                >
                  <input
                    type="checkbox"
                    name="botcheck"
                    checked={honeypot}
                    onChange={(e) => setHoneypot(e.target.checked)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ display: "none" }}
                  />
                  <div>
                    <label className="block text-[12px] font-medium text-[#6e6e73] uppercase tracking-widest mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      maxLength={LIMITS.name}
                      autoComplete="name"
                      disabled={status === "sending"}
                      aria-invalid={status === "error"}
                      value={formState.name}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, name: e.target.value }))
                      }
                      className="w-full text-[15px] bg-[#f5f5f7] dark:bg-[#1c1c1e] dark:text-[#f5f5f7] border-0 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#1d1d1f]/20 dark:focus:ring-[#f5f5f7]/20 placeholder-[#b0b0b5] dark:placeholder-[#636366] disabled:opacity-60 disabled:cursor-not-allowed transition"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-[#6e6e73] uppercase tracking-widest mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      maxLength={LIMITS.email}
                      autoComplete="email"
                      inputMode="email"
                      disabled={status === "sending"}
                      aria-invalid={status === "error"}
                      value={formState.email}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, email: e.target.value }))
                      }
                      className="w-full text-[15px] bg-[#f5f5f7] dark:bg-[#1c1c1e] dark:text-[#f5f5f7] border-0 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#1d1d1f]/20 dark:focus:ring-[#f5f5f7]/20 placeholder-[#b0b0b5] dark:placeholder-[#636366] disabled:opacity-60 disabled:cursor-not-allowed transition"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-[#6e6e73] uppercase tracking-widest mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      maxLength={LIMITS.message}
                      disabled={status === "sending"}
                      aria-invalid={status === "error"}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, message: e.target.value }))
                      }
                      className="w-full text-[15px] bg-[#f5f5f7] dark:bg-[#1c1c1e] dark:text-[#f5f5f7] border-0 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#1d1d1f]/20 dark:focus:ring-[#f5f5f7]/20 placeholder-[#b0b0b5] dark:placeholder-[#636366] resize-none disabled:opacity-60 disabled:cursor-not-allowed transition"
                      placeholder="What are you working on?"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-[#1d1d1f] dark:bg-[#f5f5f7] text-white dark:text-[#1d1d1f] text-[15px] font-medium rounded-xl py-3.5 transition-colors hover:bg-[#3d3d3f] dark:hover:bg-[#e5e5ea] disabled:opacity-60 disabled:cursor-not-allowed"
                    whileTap={{ scale: 0.98 }}
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                  </motion.button>
                  {status === "error" && (
                    <p
                      role="alert"
                      aria-live="polite"
                      className="text-[13px] text-[#d70015] dark:text-[#ff453a]"
                    >
                      {errorMsg}
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#d2d2d7]/60 dark:border-[#424245]/60 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[12px] text-[#b0b0b5]">
            © 2026 Lance. All rights reserved.
          </span>
          <span className="text-[12px] text-[#b0b0b5]">Quezon City, PH</span>
        </div>
      </footer>
    </div>
  )
}

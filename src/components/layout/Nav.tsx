import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { NAV_LINKS } from "@/data/content"
import { ease } from "@/lib/animations"

interface NavProps {
  dark: boolean
  onToggleDark: () => void
}

export default function Nav({ dark, onToggleDark }: NavProps) {
  const [activeNav, setActiveNav] = useState("Projects")
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => ({
      link,
      element: document.getElementById(link.toLowerCase()),
    })).filter(
      (section): section is { link: string; element: HTMLElement } =>
        section.element !== null,
    )
    let frame = 0

    const updateActiveSection = () => {
      frame = 0
      const scrollPosition = window.scrollY + 96
      const currentSection = sections.reduce((current, section) => {
        const sectionTop = section.element.getBoundingClientRect().top + window.scrollY
        return sectionTop <= scrollPosition ? section : current
      }, sections[0])

      if (currentSection) setActiveNav(currentSection.link)
    }

    const handleScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(updateActiveSection)
    }

    updateActiveSection()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    document.addEventListener("keydown", closeOnEscape)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", closeOnEscape)
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  function selectNav(link: string) {
    setActiveNav(link)
    setMenuOpen(false)
  }

  function linkClass(link: string) {
    return `text-[11px] sm:text-[13px] font-medium transition-colors ${
      activeNav === link
        ? "text-[#1d1d1f] dark:text-[#f5f5f7]"
        : "text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7]"
    }`
  }

  return (
    <motion.nav
      className="fixed px-4 sm:px-7 lg:px-0 top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#000000]/80 backdrop-blur-xl border-b border-[#d2d2d7]/60 dark:border-[#424245]/60"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease }}
    >
      <div className="max-w-5xl mx-auto min-h-14 py-2 flex items-center justify-between gap-4">
        <div className="flex justify-center items-center gap-3">
          <div>
            <img
              src="/WEB_PIC.png"
              width="30"
              loading="lazy"
              className="rounded-lg"
              alt="logo"
            />
          </div>
          <span className="text-[15px] font-bold tracking-tight">Kit</span>
        </div>
        <div className="flex items-center justify-end gap-3 sm:gap-5 lg:gap-8">
          <div className="hidden items-center gap-5 sm:flex lg:gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => selectNav(link)}
                aria-current={activeNav === link ? "true" : undefined}
                className={`${linkClass(link)} ${link === "Contact" ? "rounded-full bg-[#1d1d1f] px-4 py-2 text-white hover:bg-[#424245] dark:bg-[#1c1c1e] dark:text-white dark:hover:bg-[#2c2c2e]" : ""}`}
              >
                {link}
              </a>
            ))}
          </div>
          <motion.button
            onClick={onToggleDark}
            aria-label="Toggle dark mode"
            className="w-8 h-8 rounded-full flex items-center justify-center bg-[#f5f5f7] dark:bg-[#1c1c1e] text-[#6e6e73] dark:text-[#98989d] hover:bg-[#e5e5ea] dark:hover:bg-[#2c2c2e] transition-colors"
            whileTap={{ scale: 0.88, rotate: 12 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {dark ? (
                <motion.svg
                  key="sun"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
                  transition={{ duration: 0.2 }}
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
                </motion.svg>
              ) : (
                <motion.svg
                  key="moon"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ opacity: 0, rotate: 45, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -45, scale: 0.6 }}
                  transition={{ duration: 0.2 }}
                >
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
          <motion.button
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f5f7] text-[#6e6e73] transition-colors hover:bg-[#e5e5ea] dark:bg-[#1c1c1e] dark:text-[#98989d] dark:hover:bg-[#2c2c2e] sm:hidden"
            whileTap={{ scale: 0.88 }}
          >
            <motion.span
              className="text-[16px] leading-none"
              animate={{ rotate: menuOpen ? 90 : 0 }}
              transition={{ duration: 0.2, ease }}
            >
              {menuOpen ? "×" : "☰"}
            </motion.span>
          </motion.button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            className="border-t border-[#d2d2d7]/60 py-3 dark:border-[#424245]/60 sm:hidden"
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.22, ease }}
          >
            <div className="mx-auto flex max-w-5xl flex-col gap-1">
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => selectNav(link)}
                  aria-current={activeNav === link ? "true" : undefined}
                  className={`${linkClass(link)} rounded-xl px-3 py-3 ${link === "Contact" ? "bg-[#1d1d1f] text-white dark:bg-[#1c1c1e] dark:text-white" : ""}`}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.2, ease }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

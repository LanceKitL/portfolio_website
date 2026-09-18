import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { NAV_LINKS } from "@/data/content"
import { ease } from "@/lib/animations"

interface NavProps {
  dark: boolean
  onToggleDark: () => void
}

export default function Nav({ dark, onToggleDark }: NavProps) {
  const [activeNav, setActiveNav] = useState("")
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
      const scrollY = window.scrollY
      const scrollBottom = window.innerHeight + scrollY
      const docHeight = document.documentElement.scrollHeight

      // When reaching near the bottom of the page, activate Contact
      if (scrollBottom >= docHeight - 80) {
        setActiveNav("Contact")
        return
      }

      const navOffset = 120
      const firstSection = sections[0]
      // When at the top (Hero section), no nav link should be highlighted
      if (firstSection) {
        const firstTop = firstSection.element.getBoundingClientRect().top + scrollY
        if (scrollY + navOffset < firstTop) {
          setActiveNav("")
          return
        }
      }

      // Find the current section in view
      const scrollPosition = scrollY + navOffset
      const currentSection = sections.reduce<typeof sections[0] | null>((current, section) => {
        const sectionTop = section.element.getBoundingClientRect().top + scrollY
        return sectionTop <= scrollPosition ? section : current
      }, null)

      if (currentSection) {
        setActiveNav(currentSection.link)
      } else {
        setActiveNav("")
      }
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
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("keydown", closeOnEscape)
    window.addEventListener("resize", handleResize)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", closeOnEscape)
      window.removeEventListener("resize", handleResize)
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  function selectNav(link: string) {
    setActiveNav(link)
    setMenuOpen(false)
  }

  function handleLogoClick(e: React.MouseEvent) {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
    setActiveNav("")
    history.pushState(null, "", " ")
  }

  return (
    <motion.nav
      className="fixed left-0 right-0 top-0 z-50 border-b border-[#d2d2d7]/60 bg-white/80 px-4 backdrop-blur-xl dark:border-[#3b3c40]/60 dark:bg-[#17181a]/85 sm:px-7 lg:px-0"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease }}
    >
      {/* Blur content as it passes beneath the floating nav */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-14 z-10 h-14 bg-gradient-to-b from-white/60 via-white/25 to-transparent  backdrop-blur-[40px] dark:from-[#17181a]/70 dark:via-[#17181a]/30 dark:to-transparent" />

      <div className="max-w-5xl mx-auto min-h-14 py-2 flex items-center justify-between gap-4">
        <a
          href="#"
          onClick={handleLogoClick}
          className="flex justify-center items-center gap-3 transition-opacity hover:opacity-80 cursor-pointer"
          aria-label="Scroll to top"
        >
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
        </a>

        <div className="flex items-center justify-end gap-3 sm:gap-5 lg:gap-8">
          <div className="hidden items-center gap-5 sm:flex lg:gap-8">
            {NAV_LINKS.map((link) => {
              const isContact = link === "Contact"
              const isActive = activeNav === link

              if (isContact) {
                return (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={() => selectNav(link)}
                    aria-current={isActive ? "true" : undefined}
                    className={`rounded-full px-4 py-2 text-[12px] sm:text-[13px] font-medium text-white transition-all ${
                      isActive
                        ? "bg-[#000000] ring-2 ring-[#1d1d1f]/20 dark:bg-[#f2efe8] dark:text-[#17181a] dark:ring-[#ffb86b]/30"
                        : "bg-[#1d1d1f] hover:bg-[#424245] dark:bg-[#2a2b2e] dark:text-[#f2efe8] dark:hover:bg-[#35363a]"
                    }`}
                  >
                    {link}
                  </a>
                )
              }

              return (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => selectNav(link)}
                  aria-current={isActive ? "true" : undefined}
                  className={`text-[12px] sm:text-[13px] font-medium transition-colors ${
                    isActive
                      ? "text-[#1d1d1f] dark:text-[#f5f5f7]"
                      : "text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7]"
                  }`}
                >
                  {link}
                </a>
              )
            })}
          </div>

          <motion.button
            onClick={onToggleDark}
            aria-label="Toggle dark mode"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f5f7] text-[#6e6e73] transition-colors hover:bg-[#e5e5ea] dark:bg-[#2a2b2e] dark:text-[#aaa69e] dark:hover:bg-[#35363a]"
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

          {activeNav && (
            <span className="hidden items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#f05a28] dark:text-[#ffb86b] sm:hidden">
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {activeNav}
            </span>
          )}

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
          <>
            <motion.div
              className="fixed inset-0 top-14 z-[-1] bg-black/25 dark:bg-black/50 backdrop-blur-[10px] sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-navigation"
              className="border-t border-[#d2d2d7]/60 py-3 dark:border-[#424245]/60 sm:hidden"
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              transition={{ duration: 0.22, ease }}
            >
              <div className="mx-auto flex max-w-5xl flex-col gap-1">
                {NAV_LINKS.map((link, index) => {
                  const isContact = link === "Contact"
                  const isActive = activeNav === link

                  return (
                    <motion.a
                      key={link}
                      href={`#${link.toLowerCase()}`}
                      onClick={() => selectNav(link)}
                      aria-current={isActive ? "true" : undefined}
                      className={`rounded-xl px-4 py-3 text-[14px] font-medium transition-colors ${
                        isActive
                          ? isContact
                            ? "bg-[#1d1d1f] text-white ring-1 ring-[#f05a28]/30 dark:bg-[#f2efe8] dark:text-[#17181a] dark:ring-[#ffb86b]/35"
                            : "bg-[#f5f5f7] text-[#1d1d1f] dark:bg-[#303135] dark:text-[#ffb86b] dark:ring-1 dark:ring-[#ffb86b]/25"
                          : "text-[#6e6e73] hover:bg-[#f5f5f7] hover:text-[#1d1d1f] dark:hover:bg-[#303135] dark:hover:text-[#f2efe8]"
                      }`}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.2, ease }}
                    >
                      {link}
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

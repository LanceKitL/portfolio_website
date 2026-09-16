import { useState } from "react"
import { motion } from "motion/react"
import { NAV_LINKS } from "@/data/content"
import { ease } from "@/lib/animations"

interface NavProps {
  dark: boolean
  onToggleDark: () => void
}

export default function Nav({ dark, onToggleDark }: NavProps) {
  const [activeNav, setActiveNav] = useState<string | null>(null)

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
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setActiveNav(link)}
              className={`text-[11px] sm:text-[13px] font-medium transition-colors ${
                activeNav === link
                  ? "text-[#1d1d1f] dark:text-[#f5f5f7]"
                  : "text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7]"
              }`}
            >
              {link}
            </a>
          ))}
          <button
            onClick={onToggleDark}
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
  )
}

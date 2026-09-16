import { useState } from "react"
import { motion } from "motion/react"

const SNAKE_URL =
  "https://raw.githubusercontent.com/LanceKitL/portfolio_website/gh-pages/github-contribution-grid-snake.svg"
const SNAKE_DARK_URL =
  "https://raw.githubusercontent.com/LanceKitL/portfolio_website/gh-pages/github-contribution-grid-snake-dark.svg"

export default function GitHubActivity() {
  const [lightImageError, setLightImageError] = useState(false)
  const [darkImageError, setDarkImageError] = useState(false)

  return (
    <motion.article
      className="group rounded-2xl border border-[#d2d2d7]/60 dark:border-[#424245]/60 bg-[#fafafa] dark:bg-[#0d0d0d] overflow-hidden"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-8 sm:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] font-semibold text-[#6e6e73] uppercase tracking-widest mb-3">
              GitHub activity
            </p>
            <h3 className="text-[28px] font-bold tracking-[-0.02em]">
              Building in public
            </h3>
          </div>
          <a
            href="https://github.com/LanceKitL"
            target="_blank"
            rel="noreferrer"
            className="text-[12px] font-medium text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors"
          >
            @LanceKitL ↗
          </a>
        </div>

        <div className="w-full pb-1">
          {lightImageError && darkImageError ? (
            <div className="min-h-24 flex items-center justify-center border border-dashed border-[#d2d2d7] dark:border-[#424245] rounded-xl px-6 text-center text-[12px] text-[#6e6e73]">
              Activity will appear here when the snk workflow publishes the
              contribution SVG.
            </div>
          ) : (
            <div>
              {!lightImageError && (
                <img
                  src={SNAKE_URL}
                  alt="GitHub contribution activity for LanceKitL"
                  loading="lazy"
                  onError={() => setLightImageError(true)}
                  className="relative -left-1 block w-[calc(100%+8px)] h-auto dark:hidden sm:static sm:w-full"
                />
              )}
              {!darkImageError && (
                <img
                  src={SNAKE_DARK_URL}
                  alt="GitHub contribution activity for LanceKitL"
                  loading="lazy"
                  onError={() => setDarkImageError(true)}
                  className="relative -left-1 hidden w-[calc(100%+8px)] h-auto dark:block sm:static sm:w-full"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  )
}

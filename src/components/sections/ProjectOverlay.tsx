import { motion } from "motion/react"
import type { Project } from "@/data/content"
import { ease, layoutTransition } from "@/lib/animations"

interface ProjectOverlayProps {
  project: Project
  onClose: () => void
}

export default function ProjectOverlay({
  project,
  onClose,
}: ProjectOverlayProps) {
  return (
    <>
      <motion.div
        key="scrim"
        className="fixed inset-0 z-100 bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.32, ease }}
        onClick={onClose}
      />

      <motion.div
        key={`expanded-${project.id}`}
        layoutId={`card-${project.id}`}
        layout="position"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`project-dialog-title-${project.id}`}
        className="elevated fixed inset-x-0 z-110 mx-auto flex w-[calc(100vw-2rem)] max-h-[85vh] flex-col overflow-hidden rounded-3xl bg-white will-change-transform dark:bg-[#242528] sm:w-[min(680px,92vw)]"
        style={{ top: "4vh", originX: 0.5, originY: 0 }}
        transition={{ layout: layoutTransition }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-red-500/15 text-[14px] text-red-600 transition-colors hover:bg-red-500/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f6bff] dark:bg-red-400/15 dark:text-red-300"
        >
          ✕
        </button>

        {/* Image — stays fixed at top, never scrolls */}
        <motion.div
          layoutId={`card-image-${project.id}`}
          transition={{ layout: layoutTransition }}
          className="h-65 w-full shrink-0 bg-[#f0f0f5] dark:bg-[#2b2c30]"
        >
          <div className="h-full overflow-hidden rounded-t-3xl">
            <motion.img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover"
              initial={{ opacity: 0.88 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1 }}
              transition={{ duration: 0.45, ease }}
            />
          </div>
        </motion.div>

        {/* Content — scrolls independently */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {/* Blur fade overlay — sticks to top of scroll area */}
          <div className="pointer-events-none sticky top-0 z-10 h-8 -mb-8 bg-gradient-to-b from-white/80 to-transparent backdrop-blur-[2px] [mask-image:linear-gradient(to_bottom,black,transparent)] dark:from-[#242528]/80" />
          <div className="p-6 sm:p-8">
          <motion.p
            layoutId={`card-category-${project.id}`}
            className="text-[12px] text-[#6e6e73] dark:text-[#98989d] uppercase tracking-widest mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease }}
          >
            {project.category}
          </motion.p>
          <motion.h3
            layoutId={`card-title-${project.id}`}
            id={`project-dialog-title-${project.id}`}
            className="mb-5 text-[28px] font-bold tracking-[-0.02em] sm:text-[32px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.04, ease }}
          >
            {project.title}
          </motion.h3>

          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-[#f5f5f7] p-4 dark:bg-[#1c1c1e]">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#6e6e73]">
                My role
              </p>
              <p className="text-[13px] font-medium">{project.role}</p>
            </div>
            <div className="rounded-xl bg-[#f5f5f7] p-4 dark:bg-[#1c1c1e]">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#6e6e73]">
                Outcome
              </p>
              <p className="text-[13px] font-medium">{project.outcome}</p>
            </div>
          </div>

          {project.metrics && project.metrics.length > 0 && (
            <div className="mb-7 grid grid-cols-3 gap-2 border-y border-[#d2d2d7]/60 py-5 dark:border-[#4a4b50]/70">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="min-w-0 px-2 first:pl-0 last:pr-0">
                  <p className="font-display text-[24px] font-bold tracking-[-0.03em] text-[#2f6bff] dark:text-[#ffb86b] sm:text-[28px]">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-[10px] font-medium uppercase leading-snug tracking-[0.08em] text-[#6e6e73] dark:text-[#aaa69e]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.36, delay: 0.1, ease }}
          >
            <p className="text-[16px] text-[#6e6e73] leading-relaxed mb-6">
              {project.longDescription}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium text-[#6e6e73] dark:text-[#98989d] border border-[#d2d2d7] dark:border-[#424245] px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
          </div>
          {/* Blur fade overlay — sticks to bottom of scroll area */}
          <div className="pointer-events-none sticky bottom-0 z-10 h-8 -mt-8 bg-gradient-to-t from-white/80 to-transparent backdrop-blur-[2px] [mask-image:linear-gradient(to_top,black,transparent)] dark:from-[#242528]/80" />
        </div>

        {/* Footer — stays fixed at bottom, never scrolls */}
        <div className="shrink-0 border-t border-[#d2d2d7]/60 dark:border-[#424245]/60 px-6 py-4 sm:px-8 flex items-center justify-between">
          <span className="text-[13px] text-[#b0b0b5]">{project.year}</span>
          <div className="flex items-center gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.title} on GitHub`}
                title="GitHub repository"
                className="text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.65-5.48 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
                </svg>
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                aria-label={
                  project.live.includes("figma.com")
                    ? `Open Figma prototype for ${project.title}`
                    : `Open live site for ${project.title}`
                }
                title={
                  project.live.includes("figma.com")
                    ? "Figma prototype"
                    : "Live website"
                }
                className="text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors"
              >
                {project.live.includes("figma.com") ? (
                  <svg width="18" height="18" viewBox="0 0 134 134" fill="currentColor" aria-hidden="true">
                    <path d="M45.5 129c11.9 0 21.5-9.6 21.5-21.5V86H45.5C33.6 86 24 95.6 24 107.5S33.6 129 45.5 129z" />
                    <path d="M24 64.5C24 52.6 33.6 43 45.5 43H67v43H45.5C33.6 86 24 76.4 24 64.5z" />
                    <path d="M24 21.5C24 9.6 33.6 0 45.5 0H67v43H45.5C33.6 43 24 33.4 24 21.5z" />
                    <path d="M67 0h21.5C100.4 0 110 9.6 110 21.5S100.4 43 88.5 43H67z" />
                    <path d="M110 64.5c0 11.9-9.6 21.5-21.5 21.5S67 76.4 67 64.5 76.6 43 88.5 43 110 52.6 110 64.5z" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18M12 3c2.2 2.4 3.3 5.4 3.3 9S14.2 18.6 12 21c-2.2-2.4-3.3-5.4-3.3-9S9.8 5.4 12 3Z" />
                  </svg>
                )}
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </>
  )
}

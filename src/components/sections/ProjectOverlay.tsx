import { motion } from "motion/react"
import type { Project } from "@/data/content"
import { ease } from "@/lib/animations"

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
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />

      <motion.div
        key={`expanded-${project.id}`}
        layoutId={`card-${project.id}`}
        className="fixed inset-x-0 z-110 mx-auto w-[calc(100vw-2rem)] sm:w-[min(680px,92vw)] max-h-[92vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0d0d0d] shadow-2xl will-change-transform"
        style={{ top: "4vh", originX: 0.5, originY: 0 }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-red-500/15 dark:bg-red-400/15 flex items-center justify-center text-red-600 dark:text-red-300 text-[14px] hover:bg-red-500/25 transition-colors"
        >
          ✕
        </button>

        <motion.div
          layoutId={`card-image-${project.id}`}
          className="w-full h-65 bg-[#f0f0f5] dark:bg-[#111]"
        >
          <div className="h-full overflow-hidden rounded-t-3xl">
            <motion.img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover"
              initial={{ filter: "blur(6px)", scale: 1.02 }}
              animate={{ filter: "blur(0px)", scale: 1 }}
              exit={{ filter: "blur(6px)", scale: 1.02 }}
              transition={{ duration: 0.35, ease }}
            />
          </div>
        </motion.div>

        <div className="p-6 sm:p-8">
          <motion.p
            layoutId={`card-category-${project.id}`}
            className="text-[12px] text-[#6e6e73] dark:text-[#98989d] uppercase tracking-widest mb-3"
            initial={{ filter: "blur(4px)" }}
            animate={{ filter: "blur(0px)" }}
            exit={{ filter: "blur(4px)" }}
            transition={{ duration: 0.3, ease }}
          >
            {project.category}
          </motion.p>
          <motion.h3
            layoutId={`card-title-${project.id}`}
            className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em] mb-5"
            initial={{ filter: "blur(4px)" }}
            animate={{ filter: "blur(0px)" }}
            exit={{ filter: "blur(4px)" }}
            transition={{ duration: 0.3, delay: 0.05, ease }}
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

          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.3, delay: 0.12, ease }}
          >
            <p className="text-[16px] text-[#6e6e73] leading-relaxed mb-6">
              {project.longDescription}
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium text-[#6e6e73] dark:text-[#98989d] border border-[#d2d2d7] dark:border-[#424245] px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-[#d2d2d7]/60 dark:border-[#424245]/60 flex items-center justify-between">
              <span className="text-[13px] text-[#b0b0b5]">{project.year}</span>
              <div className="flex items-center gap-4">
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
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open live site for ${project.title}`}
                    title="Live website"
                    className="text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M3 12h18M12 3c2.2 2.4 3.3 5.4 3.3 9S14.2 18.6 12 21c-2.2-2.4-3.3-5.4-3.3-9S9.8 5.4 12 3Z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}

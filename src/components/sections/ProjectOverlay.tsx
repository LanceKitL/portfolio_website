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
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />

      <motion.div
        key={`expanded-${project.id}`}
        layoutId={`card-${project.id}`}
        className="fixed z-[110] top-[4vh] left-1/2 -translate-x-1/2 w-[min(680px,92vw)] max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0d0d0d] shadow-2xl"
        style={{ originX: 0.5, originY: 0 }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/20 dark:bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-[14px] hover:bg-black/30 transition-colors"
        >
          ✕
        </button>

        <motion.div
          layoutId={`card-image-${project.id}`}
          className="w-full h-[260px] overflow-hidden rounded-t-3xl bg-[#f0f0f5] dark:bg-[#111]"
        >
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            initial={{ filter: "blur(12px)", scale: 1.04 }}
            animate={{ filter: "blur(0px)", scale: 1 }}
            exit={{ filter: "blur(12px)", scale: 1.04 }}
            transition={{ duration: 0.45, ease }}
          />
        </motion.div>

        <div className="p-8">
          <motion.p
            layoutId={`card-category-${project.id}`}
            className="text-[12px] text-[#6e6e73] dark:text-[#98989d] uppercase tracking-widest mb-3"
            initial={{ filter: "blur(6px)" }}
            animate={{ filter: "blur(0px)" }}
            exit={{ filter: "blur(6px)" }}
            transition={{ duration: 0.4, ease }}
          >
            {project.category}
          </motion.p>
          <motion.h3
            layoutId={`card-title-${project.id}`}
            className="text-[32px] font-bold tracking-[-0.02em] mb-5"
            initial={{ filter: "blur(8px)" }}
            animate={{ filter: "blur(0px)" }}
            exit={{ filter: "blur(8px)" }}
            transition={{ duration: 0.4, delay: 0.05, ease }}
          >
            {project.title}
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.35, delay: 0.18, ease }}
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
              <button
                onClick={onClose}
                className="text-[13px] font-medium text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}

import { motion } from "motion/react"
import type { Project } from "@/data/content"
import { ease, layoutTransition } from "@/lib/animations"

interface ProjectCardProps {
  project: Project
  index: number
  onSelect: (id: number) => void
}

export default function ProjectCard({
  project,
  index,
  onSelect,
}: ProjectCardProps) {
  return (
    <motion.article
      layoutId={`card-${project.id}`}
      role="button"
      tabIndex={0}
      aria-label={`Open case study for ${project.title}`}
      className="group grid cursor-pointer grid-cols-1 gap-0 rounded-2xl border border-[#d2d2d7]/60 card transition-shadow bg-[#fafafa] will-change-transform focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_rgba(47,107,255,0.3)] hover:elevated dark:border-[#3b3c40]/70 dark:bg-[#242528] lg:grid-cols-[1fr_380px]"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, delay: index * 0.01, ease }}
      whileHover={{ y: -2 }}
      onClick={() => onSelect(project.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onSelect(project.id)
        }
      }}
    >
      <div className="flex min-h-0 flex-col justify-between p-5 sm:min-h-65 sm:p-10">
        <div>
          <div className="mb-4 flex min-w-0 items-center gap-2 sm:mb-6 sm:gap-3">
            <motion.span
              layoutId={`card-category-${project.id}`}
              className="truncate font-mono text-[10px] uppercase tracking-[0.12em] text-[#2f6bff] dark:text-[#ffb86b]"
            >
              {project.category}
            </motion.span>
            <span className="ml-auto text-[12px] text-[#b0b0b5]">
              {project.year}
            </span>
          </div>
          <motion.h3
            layoutId={`card-title-${project.id}`}
            className="mb-2 text-[25px] font-bold tracking-[-0.02em] sm:mb-3 sm:text-[40px]"
          >
            {project.title}
          </motion.h3>
          <div className="mt-6 border-l-2 border-[#2885f0] pl-3 dark:border-[#ffb86b] sm:mt-8 sm:pl-4">
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#6e6e73] dark:text-[#aaa69e]">
              Overview
            </p>
            <p className="max-w-sm text-[15px] font-medium leading-snug text-[#1d1d1f] dark:text-[#f2efe8]">
              {project.outcome}
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2 sm:mt-8">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#d2d2d7] px-3 py-1 text-[11px] font-medium text-[#6e6e73] dark:border-[#4a4b50] dark:text-[#aaa69e]"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3 sm:mt-5">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.title} on GitHub`}
              title="GitHub repository"
              onClick={(event) => event.stopPropagation()}
              className="text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
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
              onClick={(event) => event.stopPropagation()}
              className="text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors"
            >
              {project.live.includes("figma.com") ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 134 134"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M45.5 129c11.9 0 21.5-9.6 21.5-21.5V86H45.5C33.6 86 24 95.6 24 107.5S33.6 129 45.5 129z" />
                  <path d="M24 64.5C24 52.6 33.6 43 45.5 43H67v43H45.5C33.6 86 24 76.4 24 64.5z" />
                  <path d="M24 21.5C24 9.6 33.6 0 45.5 0H67v43H45.5C33.6 43 24 33.4 24 21.5z" />
                  <path d="M67 0h21.5C100.4 0 110 9.6 110 21.5S100.4 43 88.5 43H67z" />
                  <path d="M110 64.5c0 11.9-9.6 21.5-21.5 21.5S67 76.4 67 64.5 76.6 43 88.5 43 110 52.6 110 64.5z" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c2.2 2.4 3.3 5.4 3.3 9S14.2 18.6 12 21c-2.2-2.4-3.3-5.4-3.3-9S9.8 5.4 12 3Z" />
                </svg>
              )}
            </a>
          )}
        </div>
      </div>
      <motion.div
        layoutId={`card-image-${project.id}`}
        transition={{ layout: layoutTransition }}
        className="h-[260px] bg-[#f0f0f5] dark:bg-[#2b2c30] lg:h-full"
      >
        <div className="h-full overflow-hidden rounded-b-2xl lg:rounded-b-none lg:rounded-r-2xl">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </motion.div>
    </motion.article>
  )
}

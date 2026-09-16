import { motion } from "motion/react"
import type { Project } from "@/data/content"
import { ease } from "@/lib/animations"

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
      className="group grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-0 rounded-2xl border border-[#d2d2d7]/60 dark:border-[#424245]/60 bg-[#fafafa] dark:bg-[#0d0d0d] cursor-pointer will-change-transform"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, delay: index * 0.01, ease }}
      whileHover={{ y: -2 }}
      onClick={() => onSelect(project.id)}
    >
      <div className="p-6 sm:p-10 flex flex-col justify-between min-h-65">
        <div>
          <div className="flex items-center gap-2 sm:gap-3 mb-6 min-w-0">
            <span className="text-[11px] font-semibold text-[#6e6e73] uppercase tracking-widest">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-[11px] text-[#b0b0b5]">/</span>
            <motion.span
              layoutId={`card-category-${project.id}`}
              className="text-[11px] sm:text-[12px] text-[#6e6e73] truncate"
            >
              {project.category}
            </motion.span>
            <span className="ml-auto text-[12px] text-[#b0b0b5]">
              {project.year}
            </span>
          </div>
          <motion.h3
            layoutId={`card-title-${project.id}`}
            className="text-[25px] sm:text-[28px] font-bold tracking-[-0.02em] mb-3"
          >
            {project.title}
          </motion.h3>
          <p className="text-[15px] text-[#6e6e73] leading-relaxed max-w-sm">
            {project.description}
          </p>
          <p className="mt-4 text-[13px] font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">
            {project.outcome}
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
        <div className="flex items-center gap-3 mt-5">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${project.title} on GitHub`}
            title="GitHub repository"
            onClick={(event) => event.stopPropagation()}
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
              onClick={(event) => event.stopPropagation()}
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
      <motion.div
        layoutId={`card-image-${project.id}`}
        className="bg-[#f0f0f5] dark:bg-[#111]"
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

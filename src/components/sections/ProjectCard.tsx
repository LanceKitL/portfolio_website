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
      className="group grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-0 rounded-2xl overflow-hidden border border-[#d2d2d7]/60 dark:border-[#424245]/60 bg-[#fafafa] dark:bg-[#0d0d0d] cursor-pointer"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, delay: index * 0.01, ease }}
      whileHover={{ y: -2, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
      onClick={() => onSelect(project.id)}
    >
      <div className="p-10 flex flex-col justify-between min-h-[260px]">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[11px] font-semibold text-[#6e6e73] uppercase tracking-widest">
              {String(index + 1).padStart(2, "0")}
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
          loading="lazy"
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
        />
      </motion.div>
    </motion.article>
  )
}

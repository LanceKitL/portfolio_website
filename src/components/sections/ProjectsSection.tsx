import { AnimatePresence,motion } from "motion/react"
import SectionHeading from "@/components/SectionHeading"
import GitHubActivity from "@/components/sections/GitHubActivity"
import ProjectCard from "@/components/sections/ProjectCard"
import ProjectOverlay from "@/components/sections/ProjectOverlay"
import { PROJECTS } from "@/data/content"
import useProjectModal from "@/hooks/useProjectModal"


export default function ProjectsSection() {
  const { selectedProject, open, close } = useProjectModal()
  const quoteVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }
  return (
    <section id="projects" className="py-18 px-6 max-w-5xl mx-auto">
      <SectionHeading
        title="Systems I built"
        meta={`${PROJECTS.length} workflow studies`}
      />

      <div className="space-y-6">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            onSelect={open}
          />
        ))}
      </div>

      <div className="mt-6">
        <GitHubActivity />
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectOverlay project={selectedProject} onClose={close} />
        )}
      </AnimatePresence>

      <motion.blockquote
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={quoteVariants}
        className="mt-16 text-center text-2xl font-normal italic leading-relaxed sm:text-3xl"
      >
        <span aria-hidden="true" className="text-[#2f6bff] dark:text-[#ffb86b]">
          “
        </span>
        The only way to do great work is to love what you do.
        <footer className="mt-3 text-sm not-italic text-[#6e6e73]">
          Steve Jobs
        </footer>
      </motion.blockquote>
    </section>
  )
}

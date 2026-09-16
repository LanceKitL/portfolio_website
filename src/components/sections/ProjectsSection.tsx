import { AnimatePresence } from "motion/react"
import SectionHeading from "@/components/SectionHeading"
import GitHubActivity from "@/components/sections/GitHubActivity"
import ProjectCard from "@/components/sections/ProjectCard"
import ProjectOverlay from "@/components/sections/ProjectOverlay"
import { PROJECTS } from "@/data/content"
import useProjectModal from "@/hooks/useProjectModal"

export default function ProjectsSection() {
  const { selectedProject, open, close } = useProjectModal()

  return (
    <section id="projects" className="py-28 px-6 max-w-5xl mx-auto">
      <SectionHeading
        title="Selected Projects"
        meta={`${PROJECTS.length} projects`}
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
    </section>
  )
}

import { motion } from "motion/react"
import SectionHeading from "@/components/SectionHeading"
import { fadeUp, staggerContainer } from "@/lib/animations"

const CAPABILITIES = [
  {
    title: "Product interfaces",
    detail: "Clear, responsive experiences for customers and teams.",
    stack: [
      ["React", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"],
      ["Svelte", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg"],
      ["Tailwind", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"],
    ],
  },
  {
    title: "Full-stack systems",
    detail: "Secure workflows, APIs, data, and real-time features working together.",
    stack: [
      ["Python", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"],
      ["Flask", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg"],
      ["Laravel", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg"],
    ],
  },
  {
    title: "Prototypes and MVPs",
    detail: "Fast paths from a rough idea to something people can use.",
    stack: [
      ["Figma", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg"],
      ["JavaScript", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"],
      ["Shell", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg"],
    ],
  },
]

export default function CapabilitiesSection() {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto">
      <SectionHeading title="Capabilities" meta="What I can help with" />

      <motion.div
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {CAPABILITIES.map((capability) => (
          <motion.article
            key={capability.title}
            variants={fadeUp}
            className="group rounded-2xl border border-[#d2d2d7]/60 bg-[#fafafa] p-6 dark:border-[#424245]/60 dark:bg-[#0d0d0d] sm:p-8"
          >
            <h3 className="mb-3 text-[18px] font-semibold tracking-[-0.01em]">
              {capability.title}
            </h3>
            <p className="mb-6 text-[14px] leading-relaxed text-[#6e6e73]">
              {capability.detail}
            </p>
            <div
              className="mt-6 flex min-h-8 items-center gap-3 opacity-100 transition-all duration-300 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
              aria-label={`${capability.title} technology stack`}
            >
              {capability.stack.map(([name, icon]) => (
                <span
                  key={name}
                  title={name}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#d2d2d7]/60 bg-white dark:border-[#424245]/60 dark:bg-[#1c1c1e]"
                >
                  <img src={icon} alt={name} loading="lazy" className="h-5 w-5" />
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
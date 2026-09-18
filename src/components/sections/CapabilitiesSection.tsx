import { motion } from "motion/react"
import SectionHeading from "@/components/SectionHeading"
import { fadeUp, staggerContainer } from "@/lib/animations"

const CAPABILITIES = [
  {
    label: "INTERFACE DESIGN",
    title: "Make complex work legible",
    detail:
      "Interfaces that help customers and teams see what matters, decide faster, and keep moving.",
    stack: [
      [
        "React",
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
      ],
      [
        "Svelte",
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg",
      ],
      [
        "Tailwind",
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
      ],
    ],
  },
  {
    label: "SYSTEMS ENGINEERING",
    title: "Connect the pieces behind the screen",
    detail:
      "Secure workflows, APIs, data, and real-time features working together as one system.",
    stack: [
      [
        "Python",
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      ],
      [
        "Flask",
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg",
      ],
      [
        "Laravel",
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
      ],
    ],
  },
  {
    label: "FAST DELIVERY",
    title: "Get useful software into people’s hands",
    detail:
      "Fast paths from a rough idea to a tool people can test, trust, and use.",
    stack: [
      [
        "Figma",
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
      ],
      [
        "JavaScript",
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      ],
      [
        "Shell",
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg",
      ],
    ],
  },
]

export default function CapabilitiesSection() {
  return (
    <section
      id="capabilities"
      className="mx-auto max-w-5xl px-6 py-14 sm:py-20"
    >
      <SectionHeading
        title="What I untangle"
        meta="Ways I can help"
        className="mb-10 sm:mb-16"
      />

      <motion.div
        className="grid grid-cols-1 gap-3 md:grid-cols-[1.15fr_0.85fr]"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {CAPABILITIES.map((capability, index) => (
          <motion.article
            key={capability.title}
            variants={fadeUp}
            className={`card relative flex flex-col justify-between overflow-hidden border border-[#d2d2d7]/70 bg-[#fafafa] p-5 dark:border-[#3b3c40]/70 dark:bg-[#242528] sm:p-8 ${
              index === 0
                ? "min-h-0 border-t-2 border-t-[#2f6bff] dark:border-t-[#ffb86b] md:row-span-2 md:min-h-96"
                : "min-h-0 sm:min-h-56"
            }`}
          >
            <div>
              <div className="mb-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-[#6e6e73] dark:text-[#aaa69e] sm:mb-8">
                <span>{capability.label}</span>
                <span className="text-[#f05a28] dark:text-[#ffb86b]">
                  0{index + 1}
                </span>
              </div>
              <h3
                className={`${
                  index === 0
                    ? "max-w-md text-[28px] sm:text-[36px]"
                    : "text-[20px]"
                } mb-3 font-semibold leading-tight tracking-[-0.02em]`}
              >
                {capability.title}
              </h3>
              <p className="max-w-md text-[15px] leading-relaxed text-[#6e6e73] dark:text-[#b8b5ae]">
                {capability.detail}
              </p>
            </div>
            <div
              className="mt-6 flex min-h-8 items-center justify-between gap-3 border-t border-[#d2d2d7]/70 pt-4 dark:border-[#4a4b50]/70 sm:mt-8"
              aria-label={`${capability.title} technology stack`}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#6e6e73] dark:text-[#aaa69e]">
                Working with
              </span>
              <div className="flex items-center gap-2">
                {capability.stack.map(([name, icon]) => (
                  <span
                    key={name}
                    title={name}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#d2d2d7]/60 bg-white dark:border-[#4a4b50] dark:bg-[#303135]"
                  >
                    <img
                      src={icon}
                      alt={name}
                      loading="lazy"
                      className="h-5 w-5"
                    />
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}

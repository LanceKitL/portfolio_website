import { motion } from "motion/react"
import type { IconType } from "react-icons"
import {
  SiFigma,
  SiFlask,
  SiGnubash,
  SiJavascript,
  SiLaravel,
  SiPython,
  SiReact,
  SiSvelte,
  SiTailwindcss,
} from "react-icons/si"
import SectionHeading from "@/components/SectionHeading"
import { fadeUp, staggerContainer } from "@/lib/animations"

interface Capability {
  label: string
  title: string
  detail: string
  stack: {
    name: string
    icon: IconType
  }[]
}

const CAPABILITIES: Capability[] = [
  {
    label: "INTERFACE DESIGN",
    title: "Make complex work legible",
    detail:
      "Interfaces that help customers and teams see what matters, decide faster, and keep moving.",
    stack: [
      { name: "React", icon: SiReact },
      { name: "Svelte", icon: SiSvelte },
      { name: "Tailwind", icon: SiTailwindcss },
    ],
  },
  {
    label: "SYSTEMS ENGINEERING",
    title: "Connect the pieces behind the screen",
    detail:
      "Secure workflows, APIs, data, and real-time features working together as one system.",
    stack: [
      { name: "Python", icon: SiPython },
      { name: "Flask", icon: SiFlask },
      { name: "Laravel", icon: SiLaravel },
    ],
  },
  {
    label: "FAST DELIVERY",
    title: "Get useful software into people’s hands",
    detail:
      "Fast paths from a rough idea to a tool people can test, trust, and use.",
    stack: [
      { name: "Figma", icon: SiFigma },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Shell", icon: SiGnubash },
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
                {capability.stack.map(({ name, icon: Icon }) => (
                  <span
                    key={name}
                    title={name}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#d2d2d7]/60 bg-white text-[#424245] transition-colors hover:text-[#1d1d1f] dark:border-[#4a4b50] dark:bg-[#303135] dark:text-[#b8b5ae] dark:hover:text-[#f5f5f7]"
                  >
                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                    <span className="sr-only">{name}</span>
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

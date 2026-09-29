import { motion } from "motion/react"
import { FaDatabase, FaJava } from "react-icons/fa6"
import {
  SiC,
  SiFigma,
  SiFlask,
  SiGnubash,
  SiLaravel,
  SiMariadb,
  SiMongodb,
  SiPython,
  SiReact,
  SiSvelte,
  SiTailwindcss,
  SiCoderabbit,
  SiGit,
  SiOpencode
} from "react-icons/si"
import BlurText from "@/components/BlurText"
import { ease } from "@/lib/animations"

const TECH_STACK = [
  { name: "Python", icon: SiPython },
  { name: "Flask", icon: SiFlask },
  { name: "Svelte", icon: SiSvelte },
  { name: "React", icon: SiReact },
  { name: "Laravel", icon: SiLaravel },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "Figma", icon: SiFigma },
  { name: "Shell", icon: SiGnubash },
  { name: "SQL", icon: FaDatabase },
  { name: "MongoDB", icon: SiMongodb },
  { name: "MariaDB", icon: SiMariadb },
  { name: "Java", icon: FaJava },
  { name: "C", icon: SiC },
  { name: "Code Rabbit", icon: SiCoderabbit },
  { name: "Git", icon: SiGit },
  { name: "Opencode", icon: SiOpencode },
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="w-full rounded-r-4xl rounded-l-4xl lg:grid lg:place-items-center lg:h-dvh overflow-hidden bg-[#eef2f5] px-5 pb-20 pt-20 dark:bg-[#1d1e20] sm:px-6 sm:pb-28 sm:pt-36"
    >
      <div className="mx-auto flex max-w-5xl flex-col-reverse gap-14 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="min-w-0 flex-1">
          <div className="mb-7">
            <div className="flex flex-col justify-center items-center gap-8 lg:flex-row lg:gap-10">
              <motion.div
                className="w-full hidden lg:block shrink-0 lg:w-[25rem]"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.25, ease }}>
                <div className="overflow-hidden rounded-[2rem] border border-[#cbd5df] bg-[#f8fafb] p-3 shadow-[0_24px_70px_rgba(27,45,62,0.12)] dark:border-[#3b3c40] dark:bg-[#242528] dark:shadow-[0_24px_70px_rgba(0,0,0,0.3)]">
                  <div className="relative aspect-[31/24] overflow-hidden rounded-[1.45rem] bg-[#2b2c30]">
                    <video
                      src="/01.mp4"
                      autoPlay
                      muted
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#17181a]/75 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                      <div>
                        <p className="mt-1 text-[18px] font-semibold">
                          Lance Kit
                        </p>
                        <div className="flex items-center justify-between pb-1 text-[11px] text-[#6b7782] dark:text-[#aaa69e]">
                          <span>SWE / UI/UX  | Quezon City</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              {/* TEXT */}
              <div className="min-w-0 flex-1">
                <BlurText
                  text="Crafting digital experience"
                  delay={80}
                  className="text-[55px] mt-5 font-serif font-bold leading-[1.03] tracking-[-0.04em] text-[#2f6bff] sm:text-[72px] md:text-[90px] dark:text-[#ffb86b]"
                  direction="bottom"
                  stepDuration={0.2}
                  animationFrom={{ filter: "blur(10px)", opacity: 0, y: 30 }}
                />
                <BlurText
                  text="System Architecture. Agentic Workflow. Builder. "
                  delay={80}
                  className="mt-7 text-[24px] font-bold leading-[1.02] tracking-[-0.001em] sm:text-[20px]"
                  direction="bottom"
                  stepDuration={0.2}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-8 sm:mb-10">
            <a
              href="#projects"
              className="rounded-full bg-[#1d1d1f] px-5 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-[#424245] dark:bg-[#f5f5f7] dark:text-[#1d1d1f] dark:hover:bg-[#d2d2d7]"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-[#d2d2d7] px-5 py-3 text-[13px] font-medium text-[#6e6e73] transition-colors hover:bg-white dark:border-[#424245] dark:hover:bg-[#1c1c1e]"
            >
              Start a conversation
            </a>
          </div>

          <div className="relative overflow-hidden opacity-70 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#eef2f5] to-transparent blur-[2px] dark:from-[#1d1e20]" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#eef2f5] to-transparent blur-[2px] dark:from-[#1d1e20]" />
            <div className="tech-marquee-track flex w-max gap-3 py-1 hover:[animation-play-state:paused]">
              {[...TECH_STACK, ...TECH_STACK].map(({ name, icon: Icon }, index) => (
                <span
                  key={`${name}-${index}`}
                  className="flex shrink-0 items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-[12px] font-medium text-[#6e6e73] dark:bg-[#2a2b2e]/80 dark:text-[#b8b5ae]"
                >
                  <Icon aria-hidden="true" className="text-[17px]" />
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>


      </div>
    </section>
  )
}

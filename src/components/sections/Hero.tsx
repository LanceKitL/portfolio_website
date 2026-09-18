import { motion } from "motion/react"
import BlurText from "@/components/BlurText"
import { SKILLS } from "@/data/content"
import { ease, fadeUp, staggerContainer } from "@/lib/animations"

export default function Hero() {
  return (
    <section
      id="hero"
      className="w-full rounded-r-4xl rounded-l-4xl lg:grid lg:place-items-center lg:h-dvh overflow-hidden bg-[#eef2f5] px-5 pb-20 pt-20 dark:bg-[#1d1e20] sm:px-6 sm:pb-28 sm:pt-36"
    >
      <div className="mx-auto flex max-w-5xl flex-col-reverse gap-14 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="flex-1">
          <div className="mb-7">
            <p className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2f6bff] dark:text-[#ffb86b]">
              SWE / UI/UX  | Quezon City
            </p>
            <BlurText
              text="I build software"
              delay={80}
              className="text-[42px] font-bold leading-[1.02] tracking-[-0.04em] sm:text-[70px]"
              direction="bottom"
              stepDuration={0.2}
            />
            <BlurText
              text="behind real work"
              delay={80}
              className="text-[42px] font-serif font-bold leading-[1.02] tracking-[-0.04em] text-[#2f6bff] sm:text-[126px] dark:text-[#ffb86b]"
              direction="bottom"
              stepDuration={0.2}
              animationFrom={{ filter: "blur(10px)", opacity: 0, y: 30 }}
            />
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

          <motion.div
            className="flex flex-wrap gap-2"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            transition={{ delayChildren: 0.3 }}
          >
            {SKILLS.map((s) => (
              <motion.span
                key={s}
                variants={fadeUp}
                className="rounded-full bg-white px-3 py-1.5 text-[12px] font-medium text-[#6e6e73] dark:bg-[#2a2b2e] dark:text-[#b8b5ae]"
              >
                {s}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="w-full shrink-0 lg:w-[25rem]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.25, ease }}
        >
          <div className="overflow-hidden rounded-[2rem] border border-[#cbd5df] bg-[#f8fafb] p-3 shadow-[0_24px_70px_rgba(27,45,62,0.12)] dark:border-[#3b3c40] dark:bg-[#242528] dark:shadow-[0_24px_70px_rgba(0,0,0,0.3)]">
            <div className="relative aspect-[31/24] overflow-hidden rounded-[1.45rem] bg-[#2b2c30]">
              <video
                src="/01.mp4"
                autoPlay
                muted
                playsInline
                preload="auto"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#17181a]/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <p className="mt-1 text-[18px] font-semibold">
                    Lance Kit
                  </p>
                  <div className="flex items-center justify-between pb-1 text-[11px] text-[#6b7782] dark:text-[#aaa69e]">
                    <span>I shine where problem lives</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

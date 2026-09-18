import { motion } from "motion/react"
import SectionHeading from "@/components/SectionHeading"
import { ACHIEVEMENTS, STATS } from "@/data/content"
import { fadeUp, staggerContainer } from "@/lib/animations"

export default function AchievementsSection() {
  const featuredAchievements = ACHIEVEMENTS.slice(0, 3)
  const supportingAchievements = ACHIEVEMENTS.slice(3)

  return (
    <section id="achievements" className="py-28 px-6 max-w-5xl mx-auto">
      <SectionHeading title="Proof of practice" meta="pure hardwork" />

      <motion.div
        className="relative grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="absolute bottom-6 left-4 top-6 w-px bg-[#d2d2d7] dark:bg-[#4a4b50] md:bottom-auto md:left-0 md:right-0 md:top-5 md:h-px md:w-auto" />
        {featuredAchievements.map((item) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            className="group card relative z-10 ml-10 flex min-h-36 flex-col items-start rounded-2xl border border-[#d2d2d7]/60 bg-white p-5 dark:border-[#3b3c40]/70 dark:bg-[#242528] sm:p-8 md:ml-0 md:min-h-0"
          >
            <div className="transition-transform duration-300 group-hover:scale-105 absolute -left-10 top-6 flex h-8 w-8 items-center justify-center rounded-full overflow-hidden border border-[#1d1d1f]/30 dark:border-[#ffb86b]/60 bg-[#0d0d0f] shadow-xs md:static md:mb-5 md:h-14 md:w-14 md:rounded-2xl md:border md:border-[#d2d2d7]/80 md:dark:border-[#424245]/80 md:shadow-md">
              <img
                src={item.icon}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="mb-3 rounded-full bg-[#f5f5f7] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#6e6e73] dark:bg-[#303135] dark:text-[#c1bdb5]">
              {item.result}
            </span>
            <div className="mb-2 text-[17px] font-semibold leading-snug tracking-[-0.01em]">
              {item.title}
            </div>
            <div className="text-[13px] leading-snug text-[#6e6e73]">
              {item.detail}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-6 grid grid-cols-1 gap-3 border-t border-[#d2d2d7]/60 pt-6 dark:border-[#424245]/60 sm:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {supportingAchievements.map((item) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            className="flex items-center gap-3.5 text-[13px] text-[#6e6e73]"
          >
            <div className="h-9 w-9 shrink-0 overflow-hidden rounded-xl border border-[#d2d2d7]/60 bg-[#0d0d0f] dark:border-[#424245]/60 shadow-xs">
              <img
                src={item.icon}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="min-w-0">
              <strong className="font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
                {item.title}
              </strong>
              <span className="block mt-0.5">{item.result} · {item.detail}</span>
            </span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-12 grid grid-cols-3 gap-4 sm:grid-cols-3 sm:gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {STATS.map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            className="rounded-2xl border border-[#d8e0e7] bg-[#eef2f5] py-8 text-center dark:border-[#3b3c40] dark:bg-[#242528]"
          >
            <div className="text-[32px] lg:text-[42px] font-bold tracking-[-0.03em] mb-1">
              {stat.value}
            </div>
            <div className="text-[10px] lg:text-[13px] text-[#6e6e73]">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

import { motion } from "motion/react"
import SectionHeading from "@/components/SectionHeading"
import { ACHIEVEMENTS, STATS } from "@/data/content"
import { fadeUp, staggerContainer } from "@/lib/animations"

export default function AchievementsSection() {
  return (
    <section id="achievements" className="py-28 px-6 max-w-5xl mx-auto">
      <SectionHeading title="Achievements" meta="Recognition" />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#d2d2d7]/60 dark:bg-[#424245]/60 rounded-2xl overflow-hidden border border-[#d2d2d7]/60 dark:border-[#424245]/60"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {ACHIEVEMENTS.map((item) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            className="bg-white dark:bg-[#000000] p-8 hover:bg-[#fafafa] dark:hover:bg-[#0d0d0d] transition-colors duration-200 group"
          >
            <div className="text-[22px] mb-5 text-[#6e6e73] group-hover:text-[#1d1d1f] dark:group-hover:text-[#f5f5f7] transition-colors">
              {item.icon}
            </div>
            <div className="text-[17px] font-semibold tracking-[-0.01em] mb-2">
              {item.title}
            </div>
            <div className="text-[13px] text-[#6e6e73] leading-snug">
              {item.detail}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-12 grid grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {STATS.map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            className="text-center py-8 rounded-2xl bg-[#f5f5f7] dark:bg-[#0d0d0d]"
          >
            <div className="text-[42px] font-bold tracking-[-0.03em] mb-1">
              {stat.value}
            </div>
            <div className="text-[13px] text-[#6e6e73]">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

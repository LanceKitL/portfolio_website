import { motion } from "motion/react"
import { ease } from "@/lib/animations"

interface SectionHeadingProps {
  title: string
  meta: string
}

export default function SectionHeading({ title, meta }: SectionHeadingProps) {
  return (
    <motion.div
      className="flex items-baseline justify-between mb-16"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease }}
    >
      <h2 className="text-[34px] font-bold tracking-[-0.02em]">{title}</h2>
      <span className="text-[13px] text-[#6e6e73]">{meta}</span>
    </motion.div>
  )
}

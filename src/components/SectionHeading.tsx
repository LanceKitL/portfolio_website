import { motion } from "motion/react"
import { ease } from "@/lib/animations"

interface SectionHeadingProps {
  title: string
  meta: string
  className?: string
}

export default function SectionHeading({ title, meta, className = "" }: SectionHeadingProps) {
  return (
    <motion.div
      className={`mb-16 flex items-baseline justify-between ${className}`}
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

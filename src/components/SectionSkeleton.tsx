import { motion } from "motion/react"

interface SectionSkeletonProps {
  className?: string
}

export default function SectionSkeleton({ className = "" }: SectionSkeletonProps) {
  return (
    <motion.div
      aria-hidden="true"
      className={`mx-auto min-h-80 max-w-5xl px-6 py-28 ${className}`}
      animate={{ opacity: [0.5, 0.85, 0.5] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="mb-8 h-4 w-32 rounded-full bg-[#e7e8ec] dark:bg-[#303135]" />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="h-36 rounded-2xl bg-[#e7e8ec] dark:bg-[#303135]" />
        <div className="h-36 rounded-2xl bg-[#e7e8ec] dark:bg-[#303135]" />
        <div className="h-36 rounded-2xl bg-[#e7e8ec] dark:bg-[#303135]" />
      </div>
    </motion.div>
  )
}
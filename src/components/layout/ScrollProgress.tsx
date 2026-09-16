import { motion, type MotionValue } from "motion/react"

interface ScrollProgressProps {
  progress: MotionValue<number>
}

export default function ScrollProgress({ progress }: ScrollProgressProps) {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-[#1d1d1f] dark:bg-[#f5f5f7] origin-left"
      style={{ scaleX: progress }}
    />
  )
}

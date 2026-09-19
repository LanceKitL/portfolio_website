export const ease = [0.25, 0.1, 0.25, 1] as const

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease } },
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

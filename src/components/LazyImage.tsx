import type { ImgHTMLAttributes } from "react"
import { motion } from "motion/react"
import { useState } from "react"

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  placeholderClassName?: string
}

export default function LazyImage({
  className = "",
  placeholderClassName = "",
  onLoad,
  ...props
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative h-full w-full overflow-hidden">
      {!loaded && (
        <motion.div
          aria-hidden="true"
          className={`absolute inset-0 bg-[#e7e8ec] dark:bg-[#303135] ${placeholderClassName}`}
          animate={{ opacity: [0.55, 0.9, 0.55] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <img
        {...props}
        className={`relative h-full w-full transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
        onLoad={(event) => {
          setLoaded(true)
          onLoad?.(event)
        }}
      />
    </div>
  )
}
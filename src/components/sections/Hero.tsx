import { motion } from "motion/react"
import BlurText from "@/components/BlurText"
import { SKILLS } from "@/data/content"
import { ease, fadeUp, staggerContainer } from "@/lib/animations"

export default function Hero() {
  return (
    <section className="w-full pt-28 sm:pt-36 pb-20 sm:pb-28 px-5 sm:px-6 bg-[#f5f5f7] dark:bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto flex flex-col-reverse lg:flex-row lg:items-start lg:justify-between gap-12 lg:gap-16">
        <div className="flex-1">
          <div className="mb-6">
            <BlurText
              text="Developer & Designer."
              delay={80}
              className="text-[40px] sm:text-[56px] font-bold leading-[1.05] tracking-[-0.03em]"
              direction="bottom"
              stepDuration={0.4}
            />
            <BlurText
              text="Builder at heart."
              delay={80}
              className="text-[40px] sm:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] text-[#6e6e73]"
              direction="bottom"
              stepDuration={0.4}
              animationFrom={{ filter: "blur(10px)", opacity: 0, y: 30 }}
            />
          </div>

          <BlurText
            text="I build full-stack web apps with clean, thoughtful interfaces. Based in Quezon City, Philippines."
            delay={40}
            className="text-[16px] sm:text-[17px] text-[#6e6e73] leading-relaxed max-w-md mb-8 sm:mb-10"
            direction="bottom"
            stepDuration={0.3}
          />

          <motion.div
            className="flex flex-wrap gap-2"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            transition={{ delayChildren: 0.4 }}
          >
            {SKILLS.map((s) => (
              <motion.span
                key={s}
                variants={fadeUp}
                className="text-[12px] font-medium text-[#6e6e73] dark:text-[#98989d] bg-white dark:bg-[#1c1c1e] px-3 py-1.5 rounded-full"
              >
                {s}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="w-full lg:w-70 text-center shrink-0 justify-center items-center"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.25, ease }}
        >
          <div className="w-full max-w-77.5 aspect-31/24 rounded-4xl overflow-hidden bg-[#CECECE] dark:bg-[#CECECE] mx-auto lg:mx-0">
            <video
              src="/01.mp4"
              autoPlay
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-sm lg:text-center lg:w-77.5 max-w-77.5 mx-auto lg:mx-0 mt-4">
            I am currently taking
            <b>
              <span className="text-[#4286F5]"> G</span>
              <span className="text-[#DC4437]">o</span>
              <span className="text-[#F5B400]">o</span>
              <span className="text-[#4286F5]">g</span>
              <span className="text-[#109D58]">l</span>
              <span className="text-[#DC4437]">e </span>
              Data Analytics
            </b>
            .
          </div>
        </motion.div>
      </div>
    </section>
  )
}

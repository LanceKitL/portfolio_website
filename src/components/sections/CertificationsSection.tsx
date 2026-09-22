import { motion } from "motion/react"
import SectionHeading from "@/components/SectionHeading"
import { CERTIFICATIONS } from "@/data/content"
import { fadeUp, staggerContainer } from "@/lib/animations"
import LazyImage from "@/components/LazyImage"

export default function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="mx-auto max-w-5xl px-6 py-14 sm:py-20"
    >
      <SectionHeading
        title="Credentials in motion"
        meta="certs"
        className="mb-10 sm:mb-16"
      />

      <motion.div
        className="space-y-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {CERTIFICATIONS.map((certification) => (
          <motion.article
            key={certification.name}
            variants={fadeUp}
            className="card overflow-hidden border border-[#d2d2d7]/70 bg-[#fafafa] dark:border-[#3b3c40]/70 dark:bg-[#242528]"
          >
            <div className="grid gap-0 sm:grid-cols-[minmax(220px,0.8fr)_1.2fr]">
              <div className="border-b border-[#d2d2d7]/70 bg-[#eef2f5] p-4 dark:border-[#4a4b50]/70 dark:bg-[#1d1e20] sm:border-b-0 sm:border-r sm:p-6">
                <div className="relative aspect-[4/3] overflow-hidden border border-[#cbd5df] bg-white shadow-[0_12px_30px_rgba(27,45,62,0.12)] dark:border-[#4a4b50] dark:bg-[#303135]">
                  <LazyImage
                    src={certification.image}
                    alt={`${certification.name} certificate from ${certification.provider}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.14em] text-[#6e6e73] dark:text-[#aaa69e]">
                  Certificate / verified image
                </p>
              </div>

              <div className="flex flex-col justify-between p-5 sm:p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6e6e73] dark:text-[#aaa69e]">
                      {certification.provider}
                    </p>
                    <h3 className="mt-2 max-w-lg text-[22px] font-semibold leading-tight tracking-[-0.02em]">
                      {certification.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 sm:pt-1">
                    <span className="rounded-full bg-[#e7f7ef] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[#16734a] dark:bg-[#243b31] dark:text-[#8fe0b5]">
                      {certification.status}
                    </span>
                    <span className="font-mono text-[11px] text-[#6e6e73] dark:text-[#aaa69e]">
                      {certification.year}
                    </span>
                  </div>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div>
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#6e6e73] dark:text-[#aaa69e]">
                      Covered
                    </p>
                    <p className="max-w-xl text-[15px] leading-relaxed text-[#5c6670] dark:text-[#b8b5ae]">
                      {certification.focus}
                    </p>
                  </div>
                  <div className="border-l-2 border-[#2f6bff] pl-4 dark:border-[#ffb86b] sm:max-w-44">
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#2f6bff] dark:text-[#ffb86b]">
                      Provider
                    </p>
                    <p className="text-[13px] leading-relaxed text-[#6e6e73] dark:text-[#aaa69e]">
                      {certification.provider} learning credential.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}

import { AnimatePresence, motion } from "motion/react"
import ContactForm from "@/components/sections/ContactForm"
import ContactLinks from "@/components/sections/ContactLinks"
import useContactForm from "@/hooks/useContactForm"
import { ease } from "@/lib/animations"

interface ContactSectionProps {
  onSuccess?: () => void
}

export default function ContactSection({ onSuccess }: ContactSectionProps) {
  const contact = useContactForm(onSuccess)

  return (
    <section id="contact" className="py-28 px-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
        >
          <h2 className="text-[34px] font-bold tracking-[-0.02em] mb-4">
            Get in touch
          </h2>
          <p className="text-[17px] text-[#6e6e73] leading-relaxed mb-10 max-w-sm">
            Open to part-time roles and project-based collaborations. Let's
            build something together.
          </p>
          <ContactLinks />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
        >
          <AnimatePresence mode="wait">
            {contact.sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease }}
                className="h-full flex flex-col items-center justify-center text-center py-16"
              >
                <div className="w-14 h-14 rounded-full bg-[#1d1d1f] dark:bg-[#f5f5f7] flex items-center justify-center mb-6">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="text-white dark:text-[#1d1d1f]"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className="text-[20px] font-semibold mb-2">
                  Message sent
                </div>
                <div className="text-[14px] text-[#6e6e73]">
                  I will get back to you within 24 hours.
                </div>
              </motion.div>
            ) : (
              <ContactForm api={contact} />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

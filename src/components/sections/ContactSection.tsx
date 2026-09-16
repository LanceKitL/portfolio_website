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
              <motion.div key="success" className="h-full" />
            ) : (
              <ContactForm api={contact} />
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {(contact.confirming || contact.sent) && (
          <>
            <motion.button
              type="button"
              aria-label={
                contact.confirming
                  ? "Cancel message confirmation"
                  : "Close message sent dialog"
              }
              className="fixed inset-0 z-[100] cursor-default bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={
                contact.confirming ? contact.cancelSubmit : contact.reset
              }
            />
            <motion.div
              className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby={
                  contact.confirming
                    ? "confirm-message-title"
                    : "message-sent-title"
                }
                className="pointer-events-auto w-[min(520px,100%)] rounded-3xl bg-white p-8 text-center shadow-2xl dark:bg-[#0d0d0d]"
                initial={{ opacity: 0, scale: 0.92, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 10 }}
                transition={{ duration: 0.35, ease }}
              >
                {contact.confirming ? (
                  <>
                    <h3 id="confirm-message-title" className="mb-2 text-[20px] font-semibold">
                      Send this message?
                    </h3>
                    <p className="mb-6 text-[14px] text-[#6e6e73]">
                      Please confirm that you want to send your message.
                    </p>
                    <div className="mb-6 space-y-3 rounded-2xl bg-[#f5f5f7] p-4 text-left dark:bg-[#1c1c1e]">
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-widest text-[#6e6e73]">
                          From
                        </div>
                        <div className="mt-1 break-words text-[14px]">
                          {contact.form.name}
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-widest text-[#6e6e73]">
                          Email
                        </div>
                        <div className="mt-1 break-words text-[14px]">
                          {contact.form.email}
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-widest text-[#6e6e73]">
                          Message
                        </div>
                        <div className="mt-1 max-h-32 overflow-y-auto whitespace-pre-wrap break-words text-[14px] text-[#6e6e73] dark:text-[#b0b0b5]">
                          {contact.form.message}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-3">
                      <button
                        type="button"
                        onClick={contact.cancelSubmit}
                        className="rounded-full border border-[#d2d2d7] px-5 py-2.5 text-[13px] font-medium text-[#6e6e73] transition-colors hover:bg-[#f5f5f7] dark:border-[#424245] dark:hover:bg-[#1c1c1e]"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={contact.confirmSubmit}
                        className="rounded-full bg-[#1d1d1f] px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#424245] dark:bg-[#f5f5f7] dark:text-[#1d1d1f] dark:hover:bg-[#d2d2d7]"
                      >
                        Confirm
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#d1fae5] dark:bg-[#bbf7d0]">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="text-[#15803d] dark:text-[#166534]"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 id="message-sent-title" className="mb-2 text-[20px] font-semibold">
                      Message sent
                    </h3>
                    <p className="mb-6 text-[14px] text-[#6e6e73]">
                      I will get back to you within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={contact.reset}
                      className="rounded-full bg-[#1d1d1f] px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#424245] dark:bg-[#f5f5f7] dark:text-[#1d1d1f] dark:hover:bg-[#d2d2d7]"
                    >
                      Close
                    </button>
                  </>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}

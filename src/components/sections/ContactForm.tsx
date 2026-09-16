import { motion } from "motion/react"
import type { ContactFormApi } from "@/hooks/useContactForm"
import { inputClass, labelClass, submitButtonClass } from "@/lib/styles"
import { LIMITS } from "@/lib/contact"
import { ease } from "@/lib/animations"

interface ContactFormProps {
  api: ContactFormApi
}

export default function ContactForm({ api }: ContactFormProps) {
  const sending = api.status === "sending"
  const invalid = api.status === "error"

  return (
    <motion.form
      key="form"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease }}
      onSubmit={api.requestSubmit}
      onFocusCapture={api.onFocusCapture}
      className="space-y-5"
    >
      <input
        type="checkbox"
        name="botcheck"
        checked={api.honeypot}
        onChange={(e) => api.setHoneypot(e.target.checked)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: "none" }}
      />
      <div>
        <label className={labelClass}>Name</label>
        <input
          type="text"
          name="name"
          required
          maxLength={LIMITS.name}
          autoComplete="name"
          disabled={sending}
          aria-invalid={invalid}
          value={api.form.name}
          onChange={(e) => api.setField("name", e.target.value)}
          className={inputClass}
          placeholder="Your name"
        />
      </div>
      <div>
        <label className={labelClass}>Email</label>
        <input
          type="email"
          name="email"
          required
          maxLength={LIMITS.email}
          autoComplete="email"
          inputMode="email"
          disabled={sending}
          aria-invalid={invalid}
          value={api.form.email}
          onChange={(e) => api.setField("email", e.target.value)}
          className={inputClass}
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className={labelClass}>Message</label>
        <textarea
          name="message"
          required
          rows={5}
          maxLength={LIMITS.message}
          disabled={sending}
          aria-invalid={invalid}
          value={api.form.message}
          onChange={(e) => api.setField("message", e.target.value)}
          className={`${inputClass} resize-none`}
          placeholder="What are you working on?"
        />
      </div>
      <motion.button
        type="submit"
        disabled={sending}
        className={submitButtonClass}
        whileTap={{ scale: 0.98 }}
      >
        {sending ? "Sending…" : "Send message"}
      </motion.button>
    </motion.form>
  )
}

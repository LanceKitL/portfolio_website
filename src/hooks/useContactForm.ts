import { useState } from "react"
import type { FormEvent } from "react"
import {
  getCooldownRemaining,
  isValidEmail,
  LIMITS,
  markSubmitted,
  MIN_MESSAGE_LENGTH,
  sanitizeLine,
  sanitizeMessage,
  submitContactForm,
} from "@/lib/contact"

export type ContactField = "name" | "email" | "message"

export type ContactStatus = "idle" | "sending" | "error"

export interface ContactFormValues {
  name: string
  email: string
  message: string
}

export default function useContactForm(onSuccess?: () => void) {
  const [form, setForm] = useState<ContactFormValues>({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<ContactStatus>("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const [sent, setSent] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [honeypot, setHoneypot] = useState(false)
  function setField(key: ContactField, value: string) {
    setForm((s) => ({ ...s, [key]: value }))
  }

  function succeed() {
    setStatus("idle")
    setErrorMsg("")
    setSent(true)
    onSuccess?.()
  }

  function reset() {
    setSent(false)
    setStatus("idle")
    setErrorMsg("")
  }

  function requestSubmit(e: FormEvent) {
    e.preventDefault()
    if (status === "sending") return
    setConfirming(true)
  }

  function cancelSubmit() {
    setConfirming(false)
  }

  async function confirmSubmit() {
    setConfirming(false)
    if (status === "sending") return

    if (honeypot) {
      succeed()
      return
    }

    const name = sanitizeLine(form.name, LIMITS.name)
    const email = sanitizeLine(form.email, LIMITS.email)
    const message = sanitizeMessage(form.message, LIMITS.message)

    const fail = (msg: string) => {
      setStatus("error")
      setErrorMsg(msg)
    }

    if (!name) return fail("Please enter your name.")
    if (!isValidEmail(email)) return fail("Please enter a valid email address.")
    if (message.length < MIN_MESSAGE_LENGTH)
      return fail("Please write a slightly longer message.")

    const cooldown = getCooldownRemaining()
    if (cooldown > 0) {
      return fail(
        `Please wait ${Math.ceil(cooldown / 1000)} seconds before sending another message.`,
      )
    }

    setStatus("sending")
    setErrorMsg("")

    const result = await submitContactForm({ name, email, message })

    if (result.ok) {
      markSubmitted()
      succeed()
    } else {
      fail(result.error)
    }
  }

  return {
    form,
    setField,
    status,
    errorMsg,
    sent,
    confirming,
    reset,
    requestSubmit,
    cancelSubmit,
    confirmSubmit,
    honeypot,
    setHoneypot,
  }
}

export type ContactFormApi = ReturnType<typeof useContactForm>

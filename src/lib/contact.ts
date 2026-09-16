export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit"

const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY

export const LIMITS = { name: 100, email: 254, message: 2000 } as const

export const MIN_MESSAGE_LENGTH = 10

export function sanitizeLine(value: string, max: number): string {
  return value
    .replace(/[\r\n\t]+/g, " ")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim()
    .slice(0, max)
}

export function sanitizeMessage(value: string, max: number): string {
  return value
    .replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim()
    .slice(0, max)
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function isValidEmail(value: string): boolean {
  return value.length <= LIMITS.email && EMAIL_PATTERN.test(value)
}

export type SubmitResult = { ok: true } | {
  ok: false
  error: string
  rateLimited: boolean
}

export interface ContactPayload {
  name: string
  email: string
  message: string
}

export async function submitContactForm(
  input: ContactPayload,
): Promise<SubmitResult> {
  if (!ACCESS_KEY) {
    console.error("Web3Forms access key missing (VITE_ACCESS_KEY)")
    return {
      ok: false,
      error: "Contact form is not configured yet.",
      rateLimited: false,
    }
  }

  const name = sanitizeLine(input.name, LIMITS.name)
  const email = sanitizeLine(input.email, LIMITS.email)
  const message = sanitizeMessage(input.message, LIMITS.message)

  const body = new FormData()
  body.append("access_key", ACCESS_KEY)
  body.append("subject", `New message from ${name}`)
  body.append("from_name", "Portfolio Contact")
  body.append("name", escapeHtml(name))
  body.append("email", email)
  body.append("message", escapeHtml(message))

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      body,
    })

    if (response.status === 429) {
      return {
        ok: false,
        error: "Too many requests. Please try again in a few minutes.",
        rateLimited: true,
      }
    }

    const data = (await response.json().catch(() => null)) as {
      success?: boolean
      message?: string
    } | null

    if (response.ok && data?.success) return { ok: true }

    return {
      ok: false,
      error: data?.message || "Something went wrong. Please try again.",
      rateLimited: false,
    }
  } catch {
    return {
      ok: false,
      error: "Network error. Please check your connection and try again.",
      rateLimited: false,
    }
  }
}

const COOLDOWN_KEY = "contact-last-submit"

export const COOLDOWN_MS = 60_000

export function getCooldownRemaining(): number {
  try {
    const last = Number(localStorage.getItem(COOLDOWN_KEY) ?? 0)
    if (!Number.isFinite(last) || last <= 0) return 0
    return Math.max(0, COOLDOWN_MS - (Date.now() - last))
  } catch {
    return 0
  }
}

export function markSubmitted(): void {
  try {
    localStorage.setItem(COOLDOWN_KEY, String(Date.now()))
  } catch {}
}

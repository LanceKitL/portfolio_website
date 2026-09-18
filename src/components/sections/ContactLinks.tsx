import { useState } from "react"
import { Check, GitBranch, Mail, MessageCircle } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

const CONTACT_LINKS = [
  {
    label: "Email",
    value: "lancegomoa@gmail.com",
    href: "mailto:lancegomoa@gmail.com",
    icon: <Mail size={16} strokeWidth={1.8} />,
  },
  {
    label: "GitHub",
    value: "@lancekitl",
    href: "https://github.com/LanceKitL",
    icon: <GitBranch size={16} strokeWidth={1.8} />,
  },
  {
    label: "WhatsApp",
    value: "+639776913684",
    href: "https://wa.me/639776913684",
    icon: <MessageCircle size={16} strokeWidth={1.8} />,
  },
]

export default function ContactLinks() {
  const [emailCopied, setEmailCopied] = useState(false)

  async function copyEmail(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText("lancegomoa@gmail.com")
      } else {
        const input = document.createElement("textarea")
        input.value = "lancegomoa@gmail.com"
        input.style.position = "fixed"
        input.style.opacity = "0"
        document.body.appendChild(input)
        input.select()
        document.execCommand("copy")
        input.remove()
      }
      setEmailCopied(true)
      window.setTimeout(() => setEmailCopied(false), 2500)
    } catch {
      window.location.href = "mailto:lancegomoa@gmail.com"
    }
  }

  return (
    <div className="space-y-5">
      {CONTACT_LINKS.map((contact) => (
        <a
          key={contact.label}
          href={contact.href}
          target={contact.label === "Email" ? undefined : "_blank"}
          rel={contact.label === "Email" ? undefined : "noreferrer"}
          onClick={contact.label === "Email" ? copyEmail : undefined}
          className="flex items-center gap-4 group"
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
              contact.label === "Email" && emailCopied
                ? "bg-[#dcfce7] dark:bg-[#bbf7d0] text-[#16a34a] dark:text-[#166534]"
                : "bg-[#f5f5f7] dark:bg-[#1c1c1e] text-[#6e6e73] dark:text-[#98989d] group-hover:bg-[#1d1d1f] dark:group-hover:bg-[#f5f5f7] group-hover:text-white dark:group-hover:text-[#1d1d1f]"
            }`}
          >
            {contact.label === "Email" && emailCopied ? (
              <Check
                size={16}
                strokeWidth={2.5}
                className="text-[#16a34a] dark:text-[#4ade80]"
                aria-label="Email copied"
              />
            ) : (
              contact.icon
            )}
          </div>
          <div>
            <div className="text-[11px] text-[#b0b0b5] uppercase tracking-widest mb-0.5">
              {contact.label}
            </div>
            <div className="text-[14px] font-medium group-hover:text-[#6e6e73] transition-colors">
              {contact.value}
            </div>
            <AnimatePresence initial={false}>
              {contact.label === "Email" && emailCopied && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                  className="mt-1 text-[12px] text-[#15803d] dark:text-[#86efac]"
                >
                  Email copied to clipboard.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </a>
      ))}
    </div>
  )
}

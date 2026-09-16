export interface Project {
  id: number
  title: string
  category: string
  year: string
  description: string
  longDescription: string
  tags: string[]
  image: string
}

export interface Achievement {
  icon: string
  title: string
  detail: string
}

export interface Stat {
  value: string
  label: string
}

export const NAV_LINKS = ["Projects", "Achievements", "Contact"]

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "AutoMatik",
    category: "Fullstack · Project Manager",
    year: "2026",
    description:
      "Car dealership management system covering the entire dealership process — customer self-portal, AI chatbot for inquiries, push notifications, and JWT + session security.",
    longDescription:
      "AutoMatik was built to digitize and streamline the full lifecycle of a car dealership — from browsing inventory to closing a deal. As Project Manager and Fullstack Developer, I led the architecture and implementation of a customer self-service portal, a conversational AI chatbot that handles inventory questions and lead qualification, real-time push notifications for deal updates, and a secure auth layer combining JWT tokens with session management. The UI was designed from the ground up in Svelte with Tailwind, prioritizing clarity and speed for both customers and dealership staff.",
    tags: ["Python", "Flask", "Svelte", "Tailwind", "SocketIO"],
    image: "/001.jpg",
  },
  {
    id: 2,
    title: "Tilao Corp.",
    category: "Fullstack · ERP",
    year: "2026",
    description:
      "ERP prototype for a clothing manufacturing company covering production and sales workflows with a clean, responsive interface.",
    longDescription:
      "Tilao Corp. is a full-featured ERP prototype designed for a company that produces and sells clothing. As the sole Fullstack Developer, I built modules covering raw material tracking, production order management, inventory control, and sales reporting — all tied together in a unified React dashboard. The interface was crafted with Tailwind to keep complex data readable across screen sizes, and the system was architected to be extendable as the business scales.",
    tags: ["React", "Tailwind", "Shadcn"],
    image: "/002.jpg",
  },
  {
    id: 3,
    title: "SciLab",
    category: "Fullstack · Offline-first",
    year: "2025",
    description:
      "Offline-first smart inventory management for schools, bundled with a shell script that auto-launches the entire stack — no technical knowledge required.",
    longDescription:
      "SciLab was built for schools that can't rely on a stable internet connection. The system runs entirely on a local machine and manages laboratory equipment inventory with a clean web interface powered by Laravel and Tailwind. The standout feature is a shell script I wrote that bootstraps the entire stack — web server, database, and browser — with a single command, making it accessible to students and professors with zero technical background. The offline-first design ensures the app works reliably in any environment.",
    tags: ["Shell", "Laravel", "Tailwind"],
    image: "/003.jpg",
  },
]

export const ACHIEVEMENTS: Achievement[] = [
  {
    icon: "◉",
    title: "Most Improved Award",
    detail: "ASEAN Manila 2025 · Web Technologies",
  },
  {
    icon: "◈",
    title: "Web Technologies Nationals",
    detail: "Bronze Medalist · 2024",
  },
  {
    icon: "★",
    title: "Web Technologies Regionals",
    detail: "Gold Medalist · 2023",
  },
  {
    icon: "▲",
    title: "3+ Years Experience",
    detail: "Full-stack development & UI/UX design",
  },
  {
    icon: "◆",
    title: "Cross-stack Proficiency",
    detail: "Python, Svelte, React, Laravel, Tailwind",
  },
  {
    icon: "⬡",
    title: "Open to Collaboration",
    detail: "Part-time & project-based roles",
  },
]

export const SKILLS = [
  "Python",
  "Flask",
  "Svelte",
  "React",
  "Laravel",
  "Tailwind",
  "Figma",
  "Shell",
]

export const STATS: Stat[] = [
  { value: "3+", label: "Years of experience" },
  { value: "7+", label: "Projects built" },
  { value: "3×", label: "Competition placements" },
]

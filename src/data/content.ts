export interface Project {
  id: number
  title: string
  category: string
  year: string
  role: string
  outcome: string
  description: string
  longDescription: string
  tags: string[]
  image: string
  github: string
  live?: string
}

export interface Achievement {
  icon: string
  title: string
  result: string
  detail: string
}

export interface Stat {
  value: string
  label: string
}

export const NAV_LINKS = ["Projects", "Achievements", "Capabilities", "Contact"]

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "AutoMatik",
    category: "Fullstack · Project Manager",
    year: "2026",
    role: "Project Manager · Fullstack Developer",
    outcome: "One workflow from inventory to closed deal",
    description:
      "Car dealership management system covering the entire dealership process — customer self-portal, AI chatbot for inquiries, push notifications, and JWT + session security.",
    longDescription:
      "AutoMatik was built to digitize and streamline the full lifecycle of a car dealership — from browsing inventory to closing a deal. As Project Manager and Fullstack Developer, I led the architecture and implementation of a customer self-service portal, a conversational AI chatbot that handles inventory questions and lead qualification, real-time push notifications for deal updates, and a secure auth layer combining JWT tokens with session management. The UI was designed from the ground up in Svelte with Tailwind, prioritizing clarity and speed for both customers and dealership staff.",
    tags: ["Python", "Flask", "Svelte", "Tailwind", "SocketIO"],
    image: "/001.jpg",
    github: "https://github.com/LanceKitL/automatik",
  },
  {
    id: 2,
    title: "Tilao Corp.",
    category: "Fullstack · ERP",
    year: "2026",
    role: "Sole Fullstack Developer",
    outcome: "Production, inventory, and sales in one dashboard",
    description:
      "ERP prototype for a clothing manufacturing company covering production and sales workflows with a clean, responsive interface.",
    longDescription:
      "Tilao Corp. is a full-featured ERP prototype designed for a company that produces and sells clothing. As the sole Fullstack Developer, I built modules covering raw material tracking, production order management, inventory control, and sales reporting — all tied together in a unified React dashboard. The interface was crafted with Tailwind to keep complex data readable across screen sizes, and the system was architected to be extendable as the business scales.",
    tags: ["React", "Tailwind", "Shadcn"],
    image: "/002.jpg",
    github: "https://github.com/LanceKitL/tilao_corp_demo",
    live: "https://tilao-corp-demo.vercel.app/",
  },
  {
    id: 3,
    title: "SciLab",
    category: "Fullstack · Offline-first",
    year: "2025",
    role: "Fullstack Developer",
    outcome: "A complete lab inventory system that runs offline",
    description:
      "Offline-first smart inventory management for schools, bundled with a shell script that auto-launches the entire stack — no technical knowledge required.",
    longDescription:
      "SciLab was built for schools that can't rely on a stable internet connection. The system runs entirely on a local machine and manages laboratory equipment inventory with a clean web interface powered by Laravel and Tailwind. The standout feature is a shell script I wrote that bootstraps the entire stack — web server, database, and browser — with a single command, making it accessible to students and professors with zero technical background. The offline-first design ensures the app works reliably in any environment.",
    tags: ["Shell", "Laravel", "Tailwind"],
    image: "/003.jpg",
    github: "https://github.com/LanceKitL/sci-lab",
  },
]

export const ACHIEVEMENTS: Achievement[] = [
  {
    icon: "◉",
    title: "Most Improved Award",
    result: "Award recipient",
    detail: "ASEAN Manila · Web Technologies",
  },
  {
    icon: "◈",
    title: "Web Technologies Nationals",
    result: "Bronze Medalist",
    detail: "Web Technologies Nationals",
  },
  {
    icon: "★",
    title: "Web Technologies Regionals",
    result: "Gold Medalist",
    detail: "Web Technologies Regionals",
  },
  {
    icon: "▲",
    title: "3+ Years Experience",
    result: "Experience",
    detail: "Full-stack development & UI/UX design",
  },
  {
    icon: "◆",
    title: "Cross-stack Proficiency",
    result: "Toolkit",
    detail: "Python, Svelte, React, Laravel, Tailwind",
  },
  {
    icon: "⬡",
    title: "Open to Collaboration",
    result: "Availability",
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

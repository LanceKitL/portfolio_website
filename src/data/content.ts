export interface Project {
  id: number
  title: string
  category: string
  year: string
  role: string
  outcome: string
  description: string
  longDescription: string
  metrics?: { value: string; label: string }[]
  tags: string[]
  image: string
  github?: string
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

export interface Certification {
  name: string
  provider: string
  status: string
  focus: string
  year: string
  image: string
  href?: string
}

export const NAV_LINKS = ["Projects", "Achievements", "Certifications", "Capabilities", "Contact"]

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "AutoMatik",
    category: "Operations / Dealership",
    year: "2026",
    role: "Project Manager · Fullstack Developer",
    outcome: "One workflow from inventory to closed deal",
    description:
      "Car dealership management system covering the entire dealership process — customer self-portal, AI chatbot for inquiries, push notifications, and JWT + session security.",
    longDescription:
      "AutoMatik was built to digitize and streamline the full lifecycle of a car dealership — from browsing inventory to closing a deal. As Project Manager and Fullstack Developer, I led the architecture and implementation of a customer self-service portal, a conversational AI chatbot that handles inventory questions and lead qualification, real-time push notifications for deal updates, and a secure auth layer combining JWT tokens with session management. The UI was designed from the ground up in Svelte with Tailwind, prioritizing clarity and speed for both customers and dealership staff.",
    metrics: [
      { value: "5", label: "connected workflow areas" },
      { value: "2", label: "auth layers" },
      { value: "1", label: "path from inventory to deal" },
    ],
    tags: ["Python", "Flask", "Svelte", "Tailwind", "SocketIO"],
    image: "/001.webp",
    github: "https://github.com/LanceKitL/automatik",
  },
  {
    id: 2,
    title: "Tilao Corp.",
    category: "Operations / Manufacturing",
    year: "2026",
    role: "Sole Fullstack Developer",
    outcome: "Production, inventory, and sales in one dashboard",
    description:
      "ERP prototype for a clothing manufacturing company covering production and sales workflows with a clean, responsive interface.",
    longDescription:
      "Tilao Corp. is a full-featured ERP prototype designed for a company that produces and sells clothing. As the sole Fullstack Developer, I built modules covering raw material tracking, production order management, inventory control, and sales reporting — all tied together in a unified React dashboard. The interface was crafted with Tailwind to keep complex data readable across screen sizes, and the system was architected to be extendable as the business scales.",
    metrics: [
      { value: "4", label: "core business modules" },
      { value: "1", label: "unified dashboard" },
      { value: "100%", label: "fullstack ownership" },
    ],
    tags: ["Figma","React", "Tailwind", "Shadcn"],
    image: "/002.webp",
    github: "https://github.com/LanceKitL/tilao_corp_demo",
    live: "https://tilao-corp-demo.vercel.app/",
  },
  {
    id: 3,
    title: "SciLab",
    category: "Education / Offline system",
    year: "2025",
    role: "Fullstack Developer",
    outcome: "A complete lab inventory system that runs offline",
    description:
      "Offline-first smart inventory management for schools, bundled with a shell script that auto-launches the entire stack — no technical knowledge required.",
    longDescription:
      "SciLab was built for schools that can't rely on a stable internet connection. The system runs entirely on a local machine and manages laboratory equipment inventory with a clean web interface powered by Laravel and Tailwind. The standout feature is a shell script I wrote that bootstraps the entire stack — web server, database, and browser — with a single command, making it accessible to students and professors with zero technical background. The offline-first design ensures the app works reliably in any environment.",
    metrics: [
      { value: "0", label: "internet dependency" },
      { value: "1", label: "command to launch" },
      { value: "3", label: "services bootstrapped" },
    ],
    tags: ["Shell", "Laravel", "Tailwind"],
    image: "/003.webp",
    github: "https://github.com/LanceKitL/sci-lab",
  },
  {
    id: 4,
    title: "KITCADEMY",
    category: "EdTech / Mobile Prototype",
    year: "2026",
    role: "UI/UX Designer",
    outcome: "Gamified mobile LMS onboarding with interactive Figma micro-interactions",
    description:
      "Playful mobile learning management system prototype designed in Figma, combining clean authentication flows with an adorable pixel-art capybara scholar mascot.",
    longDescription:
      "KITCADEMY is an experimental mobile learning management system (LMS) prototype created while exploring advanced UI/UX design and interactive prototyping in Figma. Designed around a scholarly pixel-art capybara mascot, the prototype covers responsive authentication screens (Login, Sign-Up, and state transitions), crisp input form ergonomics, and tactile button hover and click states. The project served as a playground for mastering Figma auto-layout, interactive component variants, and crafting a warm, gamified aesthetic for educational apps.",
    tags: ["Figma", "UI/UX", "Mobile", "Prototyping"],
    image: "/004.webp",
    live: "https://www.figma.com/design/XAkNZu4SNulhQztA1QxxGC/LMS---JUSTICE--Copy-?node-id=0-1&t=23MFhoepLhFpOujE-1",
  },
]

export const ACHIEVEMENTS: Achievement[] = [
  {
    icon: "/icons/most-improved.webp",
    title: "Most Improved Award",
    result: "Award recipient",
    detail: "ASEAN Manila · Web Technologies",
  },
  {
    icon: "/icons/nationals-bronze.webp",
    title: "Web Technologies Nationals",
    result: "Bronze Medalist",
    detail: "Worldskills Philippines",
  },
  {
    icon: "/icons/regionals-gold.webp",
    title: "Web Technologies Regionals",
    result: "Gold Medalist",
    detail: "Worldskills Philippines",
  },
  {
    icon: "/icons/experience.webp",
    title: "3+ Years Experience",
    result: "Full-stack Development",
    detail: "UI/UX Design",
  },
  {
    icon: "/icons/toolkit.webp",
    title: "Cross-stack Proficiency",
    result: "Toolkit",
    detail: "Python, Svelte, React, Laravel, Tailwind, ReactNative, OpenCode",
  },
  {
    icon: "/icons/collaboration.webp",
    title: "Open to Collaboration",
    result: "Availability",
    detail: "Part-time & Project-based roles",
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
  { value: "7+", label: "Projects" },
  { value: "4+", label: "Satisfied Clients" },
]

export const CERTIFICATIONS: Certification[] = [
  {
    name: "The Complete 2024 Web Development Bootcamp",
    provider: "Udemy",
    status: "Completed",
    focus: "Full-stack web development across frontend interfaces, backend services, databases, and deployment.",
    year: "2024",
    image: "/certs/The_Complete_2024_Web_Development_Bootcamp.webp",
  },
]

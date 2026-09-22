import useVisitCount from "@/hooks/useVisitCount"

export default function Footer() {
  const { count: visitCount, status: visitStatus } = useVisitCount()

  return (
    <footer className="border-t border-[#d2d2d7]/60 dark:border-[#424245]/60 py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[12px] text-[#b0b0b5]">
          © 2026 Lance. All rights reserved.
        </span>
        <div className="flex items-center gap-4 text-[12px] text-[#b0b0b5]">
          {visitStatus === "loading" && (
            <span aria-live="polite" className="animate-pulse">
              … visits
            </span>
          )}
          {visitStatus === "ready" && visitCount !== null && (
            <span>{visitCount.toLocaleString()} visits</span>
          )}
          <span>Quezon City, PH</span>
        </div>
      </div>
    </footer>
  )
}

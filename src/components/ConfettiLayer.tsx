import Confetti from "react-confetti"
import useWindowSize from "@/hooks/useWindowSize"

interface ConfettiLayerProps {
  run: boolean
  onComplete: () => void
}

export default function ConfettiLayer({ run, onComplete }: ConfettiLayerProps) {
  const { width, height } = useWindowSize()

  if (!run) return null

  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={250}
      recycle={false}
      tweenDuration={3000}
      onConfettiComplete={onComplete}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        pointerEvents: "none",
      }}
    />
  )
}

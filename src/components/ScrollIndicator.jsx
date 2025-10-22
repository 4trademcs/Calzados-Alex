import { useState, useEffect } from "react"

export default function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-[var(--color-muted)] z-50">
      <div
        className="h-full bg-[var(--color-secondary)] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  )
}

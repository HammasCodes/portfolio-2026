'use client'
import { useEffect, useRef } from 'react'
import { useReducedMotion } from './hooks'

export default function SmoothScroll({ children }) {
  const reduced = useReducedMotion()
  const rafId = useRef(null)

  useEffect(() => {
    if (reduced) return

    let lenis
    let cancelled = false

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
      })

      const raf = (time) => {
        lenis.raf(time)
        rafId.current = requestAnimationFrame(raf)
      }
      rafId.current = requestAnimationFrame(raf)

      window.__lenis = lenis
    })

    return () => {
      cancelled = true
      if (rafId.current) cancelAnimationFrame(rafId.current)
      if (lenis) lenis.destroy()
      window.__lenis = null
    }
  }, [reduced])

  return children
}

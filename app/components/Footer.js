'use client'
import { useEffect, useRef } from 'react'
import { usePointerFine } from './hooks'

/*
  The wordmark is a spotlight: a bright disc tracks the cursor across the
  letters, so the mark is only ever fully readable where you are looking.
*/
export default function Footer() {
  const fine = usePointerFine()
  const markRef = useRef(null)

  useEffect(() => {
    const el = markRef.current
    if (!fine || !el) return

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
      el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [fine])

  return (
    <footer>
      <div className="footer-mark" ref={markRef} aria-hidden="true">
        HX CODES
      </div>

      <div className="footer-bar">
        <p>&#169; 2026 HX Codes. Built from scratch, as usual.</p>
        <div className="footer-links">
          <a href="https://github.com/HammasCodes" target="_blank" rel="noopener noreferrer" data-scramble>GitHub</a>
          <a href="https://www.linkedin.com/in/mohammad-hammas-426062233/" target="_blank" rel="noopener noreferrer" data-scramble>LinkedIn</a>
          <a href="mailto:hammasansari641@gmail.com" data-scramble>Email</a>
        </div>
      </div>
    </footer>
  )
}

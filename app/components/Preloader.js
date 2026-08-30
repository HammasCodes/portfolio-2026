'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from './hooks'

export default function Preloader() {
  const reduced = useReducedMotion()
  const [show, setShow] = useState(true)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (sessionStorage.getItem('hx-loaded')) {
      setShow(false)
      return
    }
    sessionStorage.setItem('hx-loaded', '1')
  }, [])

  useEffect(() => {
    if (!show) return
    if (reduced) {
      setShow(false)
      return
    }
    const start = performance.now()
    const duration = 1100
    let raf
    const tick = (now) => {
      const p = Math.min(1, Math.max(0, (now - start) / duration))
      setCount(Math.round(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => setShow(false), 260)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [show, reduced])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.75, ease: [0.83, 0, 0.17, 1] }}
        >
          <div className="preloader-inner">
            <div className="preloader-mark">
              HX Codes
            </div>
            <div className="preloader-track">
              <span className="preloader-fill" style={{ transform: `scaleX(${count / 100})` }} />
            </div>
            <div className="preloader-count">{String(count).padStart(3, '0')}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

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
      else setTimeout(() => setShow(false), 250)
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
          transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
        >
          <div className="preloader-mark">HX</div>
          <div className="preloader-count">{count}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from './hooks'

export default function Preloader() {
  const reduced = useReducedMotion()
  const [show, setShow] = useState(false)
  const [count, setCount] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('hx-loaded')) {
      setReady(true)
      return
    }
    setShow(true)
    setReady(true)
    sessionStorage.setItem('hx-loaded', '1')
  }, [])

  useEffect(() => {
    if (!show || reduced) return
    const start = performance.now()
    const duration = 1100
    let raf
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      setCount(Math.round(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => setShow(false), 250)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [show, reduced])

  if (!ready || reduced) return null

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

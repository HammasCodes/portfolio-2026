'use client'
import { useEffect, useMemo, useRef } from 'react'
import { usePointerFine, useReducedMotion } from './hooks'

/*
  A block of set type where every word is a variable-font instance.
  The cursor pulls on three axes at once (weight, width, optical size), so the
  wall physically thickens under the pointer and relaxes behind it.
  Without a pointer, a slow wave sweeps left to right instead.
*/

const RADIUS = 300

// Orbitron exposes a single wght axis, so the pull is carried by weight,
// tracking, and brightness together.
const WGHT = [400, 900]
const TRACK = [0.06, 0.18]

const lerp = (a, b, t) => a + (b - a) * t

export default function TechWall({ items }) {
  const fine = usePointerFine()
  const reduced = useReducedMotion()
  const wrapRef = useRef(null)
  const wordRefs = useRef([])

  // Stable identity so refs survive re-renders.
  const words = useMemo(() => items, [items])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const els = wordRefs.current.filter(Boolean)
    if (!els.length) return

    if (reduced) {
      els.forEach((el) => {
        el.style.fontVariationSettings = '"wght" 500'
      })
      return
    }

    // Each word is pinned to the width of its heaviest rendering. Without this
    // the axes push neighbours around every frame, which both jitters the block
    // and reflows the whole container 60 times a second.
    let centres = []
    let measuring = false

    const measure = () => {
      if (measuring) return
      measuring = true

      els.forEach((el) => {
        el.style.width = 'auto'
        el.style.fontVariationSettings = `"wght" ${WGHT[1]}`
        el.style.letterSpacing = `${TRACK[1]}em`
      })
      const widths = els.map((el) => el.offsetWidth)
      els.forEach((el, i) => {
        el.style.width = `${widths[i]}px`
      })

      centres = els.map((el) => ({
        x: el.offsetLeft + el.offsetWidth / 2,
        y: el.offsetTop + el.offsetHeight / 2,
      }))

      // Let the observer settle before it can fire on our own writes.
      requestAnimationFrame(() => {
        measuring = false
      })
    }
    measure()

    const ro = new ResizeObserver(measure)
    ro.observe(wrap)

    // Pointer position in wrapper space. Parked far away until the mouse arrives.
    const target = { x: -9999, y: -9999 }
    const eased = { x: -9999, y: -9999 }
    let hasPointer = false

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect()
      target.x = e.clientX - r.left
      target.y = e.clientY - r.top
      if (!hasPointer) {
        eased.x = target.x
        eased.y = target.y
        hasPointer = true
      }
    }
    const onLeave = () => {
      hasPointer = false
      target.x = -9999
      target.y = -9999
    }

    if (fine) {
      window.addEventListener('mousemove', onMove, { passive: true })
      wrap.addEventListener('mouseleave', onLeave)
    }

    let raf
    const start = performance.now()

    const frame = (now) => {
      const w = wrap.offsetWidth
      const h = wrap.offsetHeight

      if (fine && hasPointer) {
        eased.x += (target.x - eased.x) * 0.14
        eased.y += (target.y - eased.y) * 0.14
      } else {
        // Autonomous sweep: a soft vertical band travelling across the block.
        const t = ((now - start) / 5200) % 1
        eased.x = -RADIUS * 0.6 + t * (w + RADIUS * 1.2)
        eased.y = h / 2 + Math.sin((now - start) / 1400) * h * 0.36
      }

      for (let i = 0; i < els.length; i++) {
        const c = centres[i]
        if (!c) continue
        const dx = c.x - eased.x
        const dy = (c.y - eased.y) * 1.6 // squash vertically so rows stay distinct
        const d = Math.sqrt(dx * dx + dy * dy)
        let t = Math.max(0, 1 - d / RADIUS)
        t = t * t * (3 - 2 * t) // smoothstep

        const el = els[i]
        el.style.fontVariationSettings = `"wght" ${lerp(WGHT[0], WGHT[1], t).toFixed(0)}`
        el.style.letterSpacing = `${lerp(TRACK[0], TRACK[1], t).toFixed(3)}em`
        el.style.color = `rgba(255,255,255,${lerp(0.2, 1, t).toFixed(3)})`
      }

      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('mousemove', onMove)
      wrap.removeEventListener('mouseleave', onLeave)
    }
  }, [fine, reduced, words])

  return (
    <div className="techwall" ref={wrapRef} aria-label="Technologies I build with">
      {words.map((word, i) => (
        <span
          key={word}
          className="techwall-word"
          ref={(el) => {
            wordRefs.current[i] = el
          }}
        >
          {word}
        </span>
      ))}
    </div>
  )
}

'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/*
  Two panels: what gets solved, and what gets shipped. Every figure here is
  pulled live from the LeetCode and GitHub public APIs at build time.
*/

function Odometer({ value, decimals = 0, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })
  // Seeded with the real figure so the server HTML carries it. A crawler, a
  // reader with JS off, and a link preview all see the number, not a zero.
  const [v, setV] = useState(value)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true

    const start = performance.now()
    const duration = 1200
    let raf
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      // Ease out so the count runs up hard and settles onto the real figure.
      setV(value * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setV(value)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return <span ref={ref}>{v.toFixed(decimals)}{suffix}</span>
}

function Bar({ item, max, index }) {
  const pct = max ? (item.solved / max) * 100 : 0
  return (
    <div className="pw-bar">
      <div className="pw-bar-head">
        <span className="pw-bar-label">{item.label}</span>
        <span className="pw-bar-val">
          {item.solved}<i>/{item.total}</i>
        </span>
      </div>
      <div className="pw-bar-track">
        <motion.span
          className="pw-bar-fill"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: pct / 100 }}
          viewport={{ once: true, margin: '0px 0px -60px 0px' }}
          transition={{ duration: 0.9, delay: 0.1 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

function Heatmap({ weeks }) {
  if (!weeks?.length) return null
  return (
    <div className="pw-heat" aria-hidden="true">
      {weeks.map((week, w) => (
        <div className="pw-heat-col" key={w}>
          {week.map((level, d) => (
            <motion.i
              key={d}
              data-level={level}
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '0px 0px -40px 0px' }}
              transition={{ duration: 0.3, delay: w * 0.008 }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default function ProofOfWork({ leetcode, github }) {
  const max = Math.max(...leetcode.byDifficulty.map((d) => d.solved))
  const perProblem = (leetcode.submissions / leetcode.solved).toFixed(2)

  return (
    <div className="pw-grid">
      <motion.section
        className="pw-panel"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -60px 0px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="pw-panel-label">Algorithms</p>

        <p className="pw-hero">
          <Odometer value={leetcode.acceptance} decimals={2} suffix="%" />
        </p>
        <p className="pw-hero-sub">Acceptance rate</p>

        <p className="pw-note">
          {leetcode.solved} problems solved from {leetcode.submissions} submissions.
          That is {perProblem} attempts per problem, so most solutions run correctly
          the first time they are submitted.
        </p>

        <div className="pw-bars">
          {leetcode.byDifficulty.map((d, i) => (
            <Bar key={d.label} item={d} max={max} index={i} />
          ))}
        </div>
        <p className="pw-caption">
          Bars show the split across the {leetcode.solved} solved. Totals are the
          full LeetCode catalogue.
        </p>
      </motion.section>

      <motion.section
        className="pw-panel"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -60px 0px' }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="pw-panel-label">Delivery</p>

        <p className="pw-hero">
          <Odometer value={github.repos} />
        </p>
        <p className="pw-hero-sub">Public repositories</p>

        <p className="pw-note">
          Solving the problem is half of it. The rest is repositories that build,
          deploy, and stay up once somebody else is using them.
        </p>

        <Heatmap weeks={github.weeks} />
        <p className="pw-caption">
          {github.contributions} public contributions across {github.activeDays} days
          in the last year.
        </p>

        <div className="pw-langs">
          {github.languages.map(([name, count]) => (
            <span className="tag" key={name}>{name} <i>{count}</i></span>
          ))}
        </div>
      </motion.section>
    </div>
  )
}

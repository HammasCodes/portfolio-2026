'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useReducedMotion } from './hooks'

/*
  Each site sits in a browser frame. The screenshot is taller than its window,
  so it drifts inside the frame as the card crosses the viewport: the page
  appears to scroll itself, which is the one thing a static grab cannot show.
*/

function ShowcaseCard({ site, index }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // The image is 16:10 inside a 16:9 frame, so it overhangs the bottom by about
  // 10% of its own height. That overhang is exactly the travel available to it.
  const rawDrift = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])
  const drift = useSpring(rawDrift, { stiffness: 120, damping: 30, mass: 0.4 })

  const stacked = index % 2 === 1

  return (
    <motion.article
      ref={ref}
      className={`shw-card${stacked ? ' shw-card--offset' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <a
        className="shw-frame"
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${site.name} in a new tab`}
      >
        <span className="shw-chrome">
          <span className="shw-dots">
            <i /><i /><i />
          </span>
          <span className="shw-url">{site.domain}</span>
        </span>

        <span className="shw-viewport">
          <motion.img
            src={site.image}
            alt={`${site.name} homepage`}
            width={1760}
            height={1100}
            loading="lazy"
            decoding="async"
            style={reduced ? undefined : { y: drift }}
          />
          <span className="shw-open">
            Open site <em>&#8599;</em>
          </span>
        </span>
      </a>

      <div className="shw-meta">
        <span className="shw-index">{String(index + 1).padStart(2, '0')}</span>
        <div className="shw-text">
          <h3 className="shw-name">{site.name}</h3>
          <p className="shw-kind">{site.kind}</p>
          <p className="shw-blurb">{site.blurb}</p>
          <div className="shw-tags">
            {site.tags.map((t) => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function Showcase({ sites }) {
  return (
    <div className="shw-grid">
      {sites.map((site, i) => (
        <ShowcaseCard key={site.url} site={site} index={i} />
      ))}
    </div>
  )
}

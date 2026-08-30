'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import Cursor from '../../components/Cursor'
import Preloader from '../../components/Preloader'
import ScrollProgress from '../../components/ScrollProgress'
import SmoothScroll from '../../components/SmoothScroll'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import { useReducedMotion } from '../../components/hooks'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

function ProjectMedia({ project }) {
  if (project.image) {
    return <img src={project.image} alt={`${project.title} interface`} />
  }
  return <video src={project.video} autoPlay muted loop playsInline aria-label={`${project.title} walkthrough`} />
}

/* Slug used for the in-page anchors and the sticky index. */
const anchorFor = (heading) =>
  heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function CaseIndex({ sections, activeId }) {
  return (
    <aside className="case-index" aria-label="Sections">
      <p className="case-index-label">Contents</p>
      <ol>
        {sections.map((sec, i) => {
          const id = anchorFor(sec.heading)
          return (
            <li key={id} className={activeId === id ? 'is-active' : undefined}>
              <a href={`#${id}`}>
                <span className="case-index-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="case-index-text">{sec.heading}</span>
              </a>
            </li>
          )
        })}
      </ol>
    </aside>
  )
}

export default function ProjectDetail({ project, prev, next }) {
  const cs = project.caseStudy
  const reduced = useReducedMotion()
  const mediaRef = useRef(null)
  const [activeId, setActiveId] = useState(null)

  const { scrollYProgress } = useScroll({
    target: mediaRef,
    offset: ['start end', 'end start'],
  })
  const mediaY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  // The active section is the last one whose top has crossed a line a third of
  // the way down the viewport. Reading positions directly keeps the highlight
  // correct past the final section, where an observer would simply stop firing.
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('.case-section[id]'))
    if (!nodes.length) return

    let raf = null
    const update = () => {
      raf = null
      const line = window.innerHeight * 0.33
      let current = nodes[0].id
      for (const n of nodes) {
        if (n.getBoundingClientRect().top <= line) current = n.id
      }
      setActiveId(current)
    }
    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [project.slug])

  return (
    <>
      <Preloader />
      <Cursor />
      <ScrollProgress />

      <SmoothScroll>
        <Nav />

        <section className="project-hero section">
          <Link href="/#projects" className="back-link" data-scramble data-magnetic>
            Back to all work
          </Link>

          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p className="project-hero-num" variants={fadeUp}>
              Case {project.num}
            </motion.p>
            <motion.h1 className="hero-h1 project-hero-title" variants={fadeUp}>
              {project.title}
            </motion.h1>
            <motion.p className="case-tagline" variants={fadeUp}>{cs.tagline}</motion.p>
            <motion.div className="project-row-tags project-hero-tags" variants={fadeUp}>
              {project.tags.map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </motion.div>
            <motion.div className="hero-btns" variants={fadeUp}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                data-magnetic
                data-scramble
              >
                Visit live site
              </a>
            </motion.div>
          </motion.div>
        </section>

        <motion.div
          className="project-hero-media"
          ref={mediaRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="project-hero-media-inner">
            <motion.div style={reduced ? undefined : { y: mediaY }} className="project-hero-media-shift">
              <ProjectMedia project={project} />
            </motion.div>
          </div>
        </motion.div>

        {cs.facts && (
          <div className="case-facts">
            {cs.facts.map((f, i) => (
              <motion.div
                key={f.k}
                className="case-fact"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
              >
                <span className="case-fact-k">{f.k}</span>
                <span className="case-fact-v">{f.v}</span>
              </motion.div>
            ))}
          </div>
        )}

        <section className="section case-body-section">
          <motion.p
            className="case-summary"
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {cs.summary}
          </motion.p>

          <div className="case-layout">
            <CaseIndex sections={cs.sections} activeId={activeId} />

            <div className="case-main">
              {cs.sections.map((sec, i) => {
                const id = anchorFor(sec.heading)
                return (
                  <motion.section
                    key={id}
                    id={id}
                    className="case-section"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="case-section-head">
                      <span className="case-section-num">{String(i + 1).padStart(2, '0')}</span>
                      <h2 className="case-section-title">{sec.heading}</h2>
                    </div>
                    {sec.body && <p className="case-body">{sec.body}</p>}
                    {sec.items && (
                      <ul className="case-list">
                        {sec.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </motion.section>
                )
              })}

              {cs.quote && (
                <motion.blockquote
                  className="case-quote"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <p>{cs.quote.text}</p>
                </motion.blockquote>
              )}

              {cs.meta && <p className="case-meta">{cs.meta}</p>}
            </div>
          </div>
        </section>

        <section className="section case-cta">
          <h2 className="section-h2 case-cta-h2">
            Want one of <span className="hollow">these</span>?
          </h2>
          <p className="contact-sub">
            Same process, your project. Tell me what you have in mind.
          </p>
          <Link href="/#contact" className="btn-primary" data-magnetic data-scramble>
            Start a project
          </Link>
        </section>

        <nav className="case-nav" aria-label="More case studies">
          <Link href={`/projects/${prev.slug}`} className="case-nav-link case-nav-prev" data-cursor="Read case">
            <span className="case-nav-label">Previous</span>
            <span className="case-nav-title">{prev.title}</span>
            <span className="case-nav-tagline">{prev.caseStudy.tagline}</span>
          </Link>
          <Link href={`/projects/${next.slug}`} className="case-nav-link case-nav-next" data-cursor="Read case">
            <span className="case-nav-label">Next</span>
            <span className="case-nav-title">{next.title}</span>
            <span className="case-nav-tagline">{next.caseStudy.tagline}</span>
          </Link>
        </nav>

        <Footer />
      </SmoothScroll>
    </>
  )
}

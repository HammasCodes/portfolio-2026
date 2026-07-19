'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { usePointerFine } from './hooks'

const MotionLink = motion.create(Link)

function ProjectMedia({ project }) {
  if (project.image) {
    return <img src={project.image} alt={project.title} />
  }
  return <video src={project.video} autoPlay muted loop playsInline />
}

export default function ProjectsList({ projects }) {
  const fine = usePointerFine()
  const [active, setActive] = useState(null)
  const listRef = useRef(null)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const panelX = useSpring(mx, { stiffness: 220, damping: 26, mass: 0.6 })
  const panelY = useSpring(my, { stiffness: 220, damping: 26, mass: 0.6 })

  const handleMove = (e) => {
    const r = listRef.current.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  const activeProject = active !== null ? projects[active] : null

  return (
    <div
      className="projects-list"
      ref={listRef}
      onMouseMove={fine ? handleMove : undefined}
      onMouseLeave={fine ? () => setActive(null) : undefined}
    >
      {projects.map((p, i) => {
        const rowProps = {
          className: 'project-row',
          onMouseEnter: fine ? () => setActive(i) : undefined,
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.08, duration: 0.5 },
        }

        const content = (
          <>
            <span className="project-row-num">{p.num}</span>
            <span className="project-row-title" data-scramble>{p.title}</span>
            <span className="project-row-tags">
              {p.tags.map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </span>
            <span className="project-row-arrow">↗</span>

            {!fine && (
              <div className="project-row-mobile-video">
                <ProjectMedia project={p} />
                <p className="project-row-desc">{p.desc}</p>
              </div>
            )}
          </>
        )

        return p.caseStudy ? (
          <MotionLink key={p.num} href={`/projects/${p.slug}`} {...rowProps}>
            {content}
          </MotionLink>
        ) : (
          <motion.a key={p.num} href={p.link} target="_blank" rel="noopener noreferrer" {...rowProps}>
            {content}
          </motion.a>
        )
      })}

      {fine && (
        <motion.div
          className="project-preview"
          style={{ x: panelX, y: panelY }}
        >
          <AnimatePresence mode="wait">
            {activeProject && (
              <motion.div
                key={activeProject.num}
                className="project-preview-inner"
                initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectMedia project={activeProject} />
                <p>{activeProject.desc}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}

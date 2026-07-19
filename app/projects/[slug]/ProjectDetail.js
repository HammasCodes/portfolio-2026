'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Cursor from '../../components/Cursor'
import Preloader from '../../components/Preloader'
import SmoothScroll from '../../components/SmoothScroll'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

function ProjectMedia({ project }) {
  if (project.image) {
    return <img src={project.image} alt={project.title} />
  }
  return <video src={project.video} autoPlay muted loop playsInline />
}

export default function ProjectDetail({ project, prev, next }) {
  const cs = project.caseStudy

  return (
    <>
      <Preloader />
      <Cursor />

      <SmoothScroll>
        <Nav />

        <section className="project-hero section">
          <Link href="/#projects" className="back-link" data-scramble data-magnetic>← All Work</Link>

          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p className="project-hero-num" variants={fadeUp}>{project.num}</motion.p>
            <motion.h1 className="hero-h1 project-hero-title" variants={fadeUp}>{project.title}</motion.h1>
            <motion.p className="case-tagline" variants={fadeUp}>{cs.tagline}</motion.p>
            <motion.div className="project-row-tags project-hero-tags" variants={fadeUp}>
              {project.tags.map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </motion.div>
            <motion.div className="hero-btns" variants={fadeUp}>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-primary" data-magnetic data-scramble>
                Visit Live Site ↗
              </a>
            </motion.div>
          </motion.div>
        </section>

        <motion.div
          className="project-hero-media"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <ProjectMedia project={project} />
        </motion.div>

        <section className="section case-body-section">
          <motion.p
            className="manifesto-text case-summary"
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {cs.summary}
          </motion.p>

          {cs.sections.map((sec, i) => (
            <motion.div
              key={sec.heading}
              className="case-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
            >
              <p className="section-label">{sec.heading}</p>
              {sec.body && <p className="case-body">{sec.body}</p>}
              {sec.items && (
                <ul className="case-list">
                  {sec.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}

          {cs.techStack && (
            <motion.div
              className="case-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="section-label">Tech Stack</p>
              <div className="project-row-tags">
                {cs.techStack.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            </motion.div>
          )}

          {cs.meta && <p className="case-meta">{cs.meta}</p>}
        </section>

        <section className="section case-cta">
          <p className="contact-sub">Want something like this built?</p>
          <Link href="/#contact" className="btn-primary" data-magnetic data-scramble>Let's Talk →</Link>
        </section>

        <div className="case-nav">
          <Link href={`/projects/${prev.slug}`} className="case-nav-link case-nav-prev" data-scramble>
            <span className="case-nav-label">← Previous</span>
            <span className="case-nav-title">{prev.title}</span>
          </Link>
          <Link href={`/projects/${next.slug}`} className="case-nav-link case-nav-next" data-scramble>
            <span className="case-nav-label">Next →</span>
            <span className="case-nav-title">{next.title}</span>
          </Link>
        </div>

        <Footer />
      </SmoothScroll>
    </>
  )
}

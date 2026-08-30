'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import SmoothScroll from './components/SmoothScroll'
import Cursor from './components/Cursor'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ProjectsList from './components/ProjectsList'
import Showcase from './components/Showcase'
import TechWall from './components/TechWall'
import ProofOfWork from './components/ProofOfWork'
import { PROJECTS, SHOWCASE } from './projects/data'

const STACK = [
  'Next.js', 'React', 'React Native', 'TypeScript', 'Node.js',
  'Tailwind', 'Astro', 'PostgreSQL', 'Supabase', 'Firebase',
  'Framer Motion', 'REST APIs', 'Stripe', 'Vercel', 'Figma',
  'Python', 'FastAPI', 'Prisma', 'WebGL', 'Accessibility',
]

const MANIFESTO = [
  { t: 'Most' }, { t: 'freelance' }, { t: 'work' }, { t: 'looks' }, { t: 'the' }, { t: 'same' },
  { t: 'because' }, { t: 'most' }, { t: 'of' }, { t: 'it' }, { t: 'starts' }, { t: 'from' },
  { t: 'the' }, { t: 'same' }, { t: 'template.' },
  { t: 'I' }, { t: 'start' }, { t: 'from' }, { t: 'the' }, { t: 'problem,' },
  { t: 'and' }, { t: 'the' }, { t: 'site' }, { t: 'ends' }, { t: 'up' }, { t: 'looking' },
  { t: 'like' }, { t: 'the' }, { t: 'business' },
  { t: 'it', hl: true }, { t: 'belongs', hl: true }, { t: 'to.', hl: true },
]

const STATS = [
  { to: PROJECTS.length + SHOWCASE.length, suffix: '', label: 'Projects shipped' },
  { to: 24, suffix: 'H', label: 'Typical reply time' },
  { to: 100, suffix: '%', label: 'Code you own outright' },
  { to: 5, suffix: '+', label: 'Core technologies' },
]

const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}
const lineReveal = {
  hidden: { y: '110%', rotate: 4 },
  show: { y: '0%', rotate: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
}

function Counter({ to, suffix }) {
  const ref = useRef(null)
  // Vertical-only inset. A bare '-100px' shrinks the observer root horizontally
  // too, and a two-character number sitting in the left gutter then never
  // intersects it, so the counter would sit at zero forever.
  const inView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const duration = 1100
    let raf
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      setVal(Math.round(p * to))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])

  return <span ref={ref}>{val}{suffix}</span>
}

export default function HomeClient({ stats }) {
  const heroRef = useRef(null)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', budget: '', message: '' })

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '22%'])
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.18])
  const heroFade = useTransform(heroProgress, [0, 0.85], [1, 0])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)

    const formData = {
      ...form,
      access_key: 'cf021824-61d4-40ce-a74e-ad62a660cbbc',
      subject: `New Portfolio Inquiry from ${form.name}`,
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setSent(true)
        setForm({ name: '', email: '', budget: '', message: '' })
      }
    } catch (error) {
      console.error('Form error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <Preloader />
      <Cursor />
      <ScrollProgress />

      <SmoothScroll>
        <Nav />

        <section id="hero" ref={heroRef}>
          <div className="hero-img-wrap">
            <motion.img
              className="hero-img"
              src="/silver.png"
              alt=""
              aria-hidden="true"
              style={{ y: heroY, scale: heroScale }}
            />
          </div>

          <motion.div
            className="hero-content"
            variants={heroStagger}
            initial="hidden"
            animate="show"
            style={{ opacity: heroFade }}
          >
            <h1 className="hero-h1">
              <span className="line">
                <motion.span variants={lineReveal} className="line-in">Sites and apps</motion.span>
              </span>
              <span className="line">
                <motion.span variants={lineReveal} className="line-in">
                  that <span className="hollow">earn</span>
                </motion.span>
              </span>
              <span className="line">
                <motion.span variants={lineReveal} className="line-in">their keep.</motion.span>
              </span>
            </h1>

            <motion.p className="hero-sub" variants={fadeUp}>
              Freelance web and app developer. I take a project from the first
              wireframe to the live URL, and I stay reachable after it launches.
            </motion.p>

            <motion.div className="hero-btns" variants={fadeUp}>
              <a href="#projects" className="btn-primary" data-magnetic data-scramble>See the work</a>
              <a href="#contact" className="btn-ghost" data-magnetic data-scramble>Start a project</a>
            </motion.div>
          </motion.div>

          <div className="scroll-line"><span>scroll</span></div>
        </section>

        <section className="section section--wall">
          <p className="section-label">What I build with</p>
          <TechWall items={STACK} />
        </section>

        <section className="section">
          <p className="section-label">How I work</p>
          <p className="manifesto-text">
            {MANIFESTO.map((w, i) => (
              <motion.span
                key={`${w.t}-${i}`}
                className={`word${w.hl ? ' hl' : ''}`}
                initial={{ opacity: 0, y: 12, filter: 'blur(7px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '0px 0px -80px 0px' }}
                transition={{ duration: 0.5, delay: i * 0.02 }}
              >
                {w.t}
              </motion.span>
            ))}
          </p>

          <div className="stats-row">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                className="stat-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.5 }}
              >
                <div className="stat-num"><Counter to={s.to} suffix={s.suffix} /></div>
                <div className="stat-label">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <p className="section-label">Product work</p>
          <ProjectsList projects={PROJECTS} />
        </section>

        <section id="web-design" className="section">
          <p className="section-label">Web design</p>
          <div className="shw-intro">
            <h2 className="section-h2">
              Built for people who have <span className="hollow">something</span> to sell.
            </h2>
            <p className="section-lead">
              Marketing pages, landing pages, and one dashboard that got out of hand.
              Six recent builds, all of them live. Hover any frame to watch the page move.
            </p>
          </div>
          <Showcase sites={SHOWCASE} />
        </section>

        <section id="proof" className="section">
          <p className="section-label">Proof of work</p>
          <div className="shw-intro">
            <h2 className="section-h2">
              Solved, then <span className="hollow">shipped</span>.
            </h2>
            <p className="section-lead">
              Two habits worth checking before you hire anyone. Whether the code is
              right before it runs, and whether anything actually reaches production.
              Both numbers below are pulled live from LeetCode and GitHub.
            </p>
          </div>
          <ProofOfWork leetcode={stats.leetcode} github={stats.github} />
        </section>

        <section id="contact" className="section">
          <p className="section-label section-label--center">Get in touch</p>
          <motion.h2
            className="contact-h2"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            Let&apos;s build<br />
            <span className="hollow">something</span><br />
            worth shipping.
          </motion.h2>

          <p className="contact-sub">
            Tell me what you are working on. I reply within 24 hours, usually sooner.
          </p>

          <motion.div
            className="form-wrap"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.55 }}
          >
            {sent ? (
              <div className="form-success">
                <p aria-hidden="true">&#10022;</p>
                <p>Message received. I will be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="f-name">Name</label>
                    <input
                      id="f-name" type="text" placeholder="John Doe" required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="f-email">Email</label>
                    <input
                      id="f-email" type="email" placeholder="john@company.com" required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="f-budget">Project budget</label>
                  <select
                    id="f-budget"
                    value={form.budget}
                    onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                  >
                    <option value="">Select a range</option>
                    <option>Under $1,000</option>
                    <option>$1,000 to $5,000</option>
                    <option>$5,000 to $15,000</option>
                    <option>$15,000 and up</option>
                    <option>Still working it out</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="f-message">Tell me about your project</label>
                  <textarea
                    id="f-message"
                    placeholder="What are you building, and when do you need it?" required
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  />
                </div>
                <button type="submit" className="form-submit" disabled={sending} data-magnetic>
                  {sending ? 'Sending' : 'Send message'}
                </button>
              </form>
            )}
          </motion.div>
        </section>

        <Footer />
      </SmoothScroll>
    </>
  )
}

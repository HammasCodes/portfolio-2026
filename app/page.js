'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import SmoothScroll from './components/SmoothScroll'
import Cursor from './components/Cursor'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ProjectsList from './components/ProjectsList'
import { PROJECTS } from './projects/data'

const TICKER_ITEMS = [
  'Next.js', 'React', 'React Native', 'Node.js',
  'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Firebase',
  'REST APIs', 'Figma to Code', 'Clean Architecture', 'Fast Delivery',
]

const MANIFESTO = [
  { t: 'I', hl: false }, { t: 'build', hl: true }, { t: 'fast,', hl: false },
  { t: 'precise,', hl: true }, { t: 'production-ready', hl: true }, { t: 'products', hl: false },
  { t: '—', hl: false }, { t: 'not', hl: false }, { t: 'templates.', hl: false },
  { t: 'Every', hl: false }, { t: 'pixel,', hl: false }, { t: 'every', hl: false },
  { t: 'interaction,', hl: false }, { t: 'engineered', hl: true }, { t: 'on', hl: false }, { t: 'purpose.', hl: true },
]

const STATS = [
  { to: PROJECTS.length, suffix: '', label: 'Shipped Products' },
  { to: 24, suffix: 'H', label: 'Avg. Response Time' },
  { to: 100, suffix: '%', label: 'Client-Owned Code' },
  { to: 5, suffix: '+', label: 'Core Technologies' },
]

const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}
const lineReveal = {
  hidden: { y: '100%' },
  show: { y: '0%', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

function Counter({ to, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
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

export default function Home() {
  const heroRef = useRef(null)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', budget: '', message: '' })

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '20%'])
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.15])

  useEffect(() => {
    let resetTimer
    const onWheel = (e) => {
      const velocity = Math.min(3, Math.abs(e.deltaY) / 100)
      const duration = Math.max(6, 22 - velocity * 5)
      document.documentElement.style.setProperty('--ticker-duration', `${duration}s`)
      clearTimeout(resetTimer)
      resetTimer = setTimeout(() => {
        document.documentElement.style.setProperty('--ticker-duration', '22s')
      }, 400)
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      clearTimeout(resetTimer)
    }
  }, [])

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

  const tickerAll = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <>
      <Preloader />
      <Cursor />

      <SmoothScroll>
        <Nav />

        <section id="hero" ref={heroRef}>
          <div className="hero-img-wrap">
            <motion.img
              className="hero-img"
              src="/silver.png"
              alt="Hero Background"
              style={{ y: heroY, scale: heroScale }}
            />
          </div>
          <motion.div className="hero-content" variants={heroStagger} initial="hidden" animate="show">
            
            <h1 className="hero-h1">
              <span className="line"><motion.span variants={lineReveal} style={{ display: 'block' }}>I CRAFT</motion.span></span>
              <span className="line"><motion.span variants={lineReveal} className="outline" style={{ display: 'block' }}>DIGITAL</motion.span></span>
              <span className="line"><motion.span variants={lineReveal} style={{ display: 'block' }}>PRODUCTS.</motion.span></span>
            </h1>
            <motion.p className="hero-sub" variants={fadeUp}>
              Web apps &amp; mobile experiences — precision-built,<br />
              on time, and built to convert.
            </motion.p>
            <motion.div className="hero-btns" variants={fadeUp}>
              <a href="#projects" className="btn-primary" data-magnetic data-scramble>See My Work</a>
              <a href="#contact" className="btn-ghost" data-magnetic data-scramble>Start a Project →</a>
            </motion.div>
          </motion.div>
          <div className="scroll-line"><span>scroll</span></div>
        </section>

        <div className="ticker-wrap">
          <div className="ticker-inner">
            {tickerAll.map((item, i) => (
              <span className="ticker-item" key={i}>{item}</span>
            ))}
          </div>
        </div>

        <section className="section">
          <p className="section-label">What I Believe</p>
          <p className="manifesto-text">
            {MANIFESTO.map((w, i) => (
              <motion.span
                key={i}
                className={`word${w.hl ? ' hl' : ''}`}
                initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.025 }}
                style={{ display: 'inline-block', marginRight: '0.35em' }}
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
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="stat-num"><Counter to={s.to} suffix={s.suffix} /></div>
                <div className="stat-label">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <p className="section-label">Selected Work</p>
          <ProjectsList projects={PROJECTS} />
        </section>

        <section id="contact" className="section" style={{ textAlign: 'center' }}>
          <p className="section-label" style={{ justifyContent: 'center' }}>Get In Touch</p>
          <motion.h2
            className="contact-h2"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            LET'S<br /><span className="outline">BUILD</span><br />TOGETHER
          </motion.h2>
          <p className="contact-sub">
            Got a project in mind? Tell me about it.<br />
            I respond within 24 hours.
          </p>
          <motion.div
            className="form-wrap"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.55 }}
          >
            {sent ? (
              <div className="form-success">
                <p>✦</p>
                <p>Message received — I'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-field">
                    <label>Name</label>
                    <input
                      type="text" placeholder="John Doe" required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    />
                  </div>
                  <div className="form-field">
                    <label>Email</label>
                    <input
                      type="email" placeholder="john@company.com" required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label>Project Budget</label>
                  <select
                    value={form.budget}
                    onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                  >
                    <option value="">Select a range</option>
                    <option>Under $1,000</option>
                    <option>$1,000 – $5,000</option>
                    <option>$5,000 – $15,000</option>
                    <option>$15,000+</option>
                    <option>Let's discuss</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>Tell me about your project</label>
                  <textarea
                    placeholder="What are you building? What's the timeline?" required
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  />
                </div>
                <button type="submit" className="form-submit" disabled={sending} data-magnetic>
                  {sending ? 'Sending...' : 'Send Message ↗'}
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

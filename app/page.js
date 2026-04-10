'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const PROJECTS = [
  {
    num: '01',
    title: 'Ibda Voice',
    desc: 'An AI-powered audio engine for generating hyper-realistic voices and custom sound effects with studio-grade precision.',
    tags: ['Next.js', 'PostgreSQL', 'Tailwind', 'GenAI','Stripe'],
    link: 'https://www.ibdavoice.com/',
    video: '/Ibdavoice.mp4',
  },
  {
    num: '02',
    title: 'Ibda Films',
    desc: 'A cinematic AI generation platform that transforms text-based prompts into high-fidelity, production-ready film sequences.',
    tags: ['Next.js', 'PostgreSQL', 'Tailwind', 'GenAI','Stripe'],
    link: 'https://ibdafilms.com/',
    video: '/MISSION.mp4',
  },
  {
    num: '03',
    title: 'Chillpal',
    desc: 'An empathetic AI companion designed for real-time mental health support, providing emotional guidance through deep learning.',
    tags: ['Python','OpenAI','Tkinter','FastAPI'],
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7325567739824156672/',
    video: '/Chillpal.mp4',
  },
]

const TICKER_ITEMS = [
  'Next.js', 'React', 'React Native', 'Node.js',
  'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Firebase',
  'REST APIs', 'Figma to Code', 'Clean Architecture', 'Fast Delivery',
]

function inView(el) {
  const r = el.getBoundingClientRect()
  return r.top < window.innerHeight - 80
}

export default function Home() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const navRef = useRef(null)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', budget: '', message: '' })

  useEffect(() => {
    const move = (e) => {
      if (dotRef.current) { dotRef.current.style.left = e.clientX + 'px'; dotRef.current.style.top = e.clientY + 'px' }
      if (ringRef.current) { ringRef.current.style.left = e.clientX + 'px'; ringRef.current.style.top = e.clientY + 'px' }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (navRef.current) navRef.current.classList.toggle('scrolled', window.scrollY > 50)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const reveals = document.querySelectorAll('[data-reveal]')
    const check = () => reveals.forEach(el => { if (inView(el)) el.classList.add('revealed') })
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])

  const handleSubmit = async (e) => {
  e.preventDefault();
  setSending(true);

  // 1. Prepare the data
  const formData = {
    ...form,
    access_key: "cf021824-61d4-40ce-a74e-ad62a660cbbc", // Paste your key here
    subject: `New Portfolio Inquiry from ${form.name}`,
  };

  // 2. Send it to the API
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      setSent(true);
      // Reset form after sending
      setForm({ name: '', email: '', budget: '', message: '' });
    }
  } catch (error) {
    console.error("Form error:", error);
    alert("Something went wrong. Please try again.");
  } finally {
    setSending(false);
  }
};

  const tickerAll = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <>
      <div id="cur-dot" ref={dotRef} />
      <div id="cur-ring" ref={ringRef} />

      <nav ref={navRef}>
        <a href="#" className="nav-logo">HX CODES<span style={{ color: 'var(--muted)' }}>.</span></a>
        <a href="#contact" className="nav-cta">Hire Me</a>
      </nav>

      <section id="hero">
        <img
          className="hero-img"
          src="/silver.png"
          alt="Hero Background"
        />
        <div className="hero-grid" />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="avail fade-up d1">
            <span className="avail-dot" />
            Available for freelance work
          </div>
          <h1 className="hero-h1 fade-up d2">
            I CRAFT<br />
            <span className="outline">DIGITAL</span><br />
            PRODUCTS.
          </h1>
          <p className="hero-sub fade-up d3">
            Web apps &amp; mobile experiences — precision-built,<br />
            on time, and built to convert.
          </p>
          <div className="hero-btns fade-up d4">
            <a href="#projects" className="btn-primary">See My Work</a>
            <a href="#contact" className="btn-ghost">Start a Project →</a>
          </div>
        </div>
        <div className="scroll-line"><span>scroll</span></div>
      </section>

      <div className="ticker-wrap">
        <div className="ticker-inner">
          {tickerAll.map((item, i) => (
            <span className="ticker-item" key={i}>{item}</span>
          ))}
        </div>
      </div>

      <section id="projects" className="section">
        <p className="section-label">Selected Work</p>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
  <motion.a // 1. Changed from motion.div
    key={p.num}
    href={p.link} // 2. Added the link from your PROJECTS data
    target="_blank" // 3. Opens in a new tab
    rel="noopener noreferrer" // 4. Essential for security
    className="project-card"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.1, duration: 0.55 }}
  >
    {/* COLUMN 1: TEXT */}
    <div>
      <p className="project-num">{p.num}</p>
      <h3 className="project-title">{p.title}</h3>
      <p className="project-desc">{p.desc}</p>
      <div className="project-tags">
        {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
      </div>
    </div>

    {/* COLUMN 2: VIDEO */}
    <div className="project-video-wrap">
      <video src={p.video} autoPlay muted loop playsInline />
    </div>

    {/* COLUMN 3: ARROW */}
    <span className="project-arrow">↗</span>
  </motion.a> // 5. Changed closing tag
))}
        </div>
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
              <button type="submit" className="form-submit" disabled={sending}>
                {sending ? 'Sending...' : 'Send Message ↗'}
              </button>
            </form>
          )}
        </motion.div>
      </section>

      <footer>
        <p>© 2026 Your Name. All rights reserved.</p>
        <div className="footer-links">
          <a href="https://github.com/HammasCodes">GitHub</a>
          <a href="https://www.linkedin.com/in/mohammad-hammas-426062233/?skipRedirect=true">LinkedIn</a>
          <a href="mailto:hammasansari641@gmail.com">Email</a>
        </div>
      </footer>
    </>
  )
}
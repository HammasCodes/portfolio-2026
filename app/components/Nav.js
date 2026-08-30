'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Nav() {
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      if (navRef.current) navRef.current.classList.toggle('scrolled', window.scrollY > 50)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="site-nav" ref={navRef}>
      <Link href="/" className="nav-logo">
        <span data-scramble>HX CODES</span><span style={{ color: 'var(--muted)' }}>.</span>
      </Link>
      <Link href="/#contact" className="nav-cta" data-magnetic data-scramble>Hire Me</Link>
    </nav>
  )
}

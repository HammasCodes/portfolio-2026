'use client'
import { useEffect, useRef } from 'react'
import { usePointerFine } from './hooks'

const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#________'

function scramble(el) {
  const original = el.dataset.text || el.textContent
  el.dataset.text = original
  let frame = 0
  const totalFrames = 14
  clearInterval(el._scrambleTimer)
  el._scrambleTimer = setInterval(() => {
    frame++
    el.textContent = original
      .split('')
      .map((ch, i) => {
        if (ch === ' ') return ' '
        const reveal = frame - i * 2
        if (reveal > totalFrames / 2) return original[i]
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      })
      .join('')
    if (frame > totalFrames + original.length * 2) {
      clearInterval(el._scrambleTimer)
      el.textContent = original
    }
  }, 28)
}

export default function Cursor() {
  const fine = usePointerFine()
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const magnetTarget = useRef(null)

  useEffect(() => {
    if (!fine) return

    document.body.classList.add('has-fine-cursor')

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }

      const target = magnetTarget.current
      if (target) {
        const r = target.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dx = (e.clientX - cx) * 0.35
        const dy = (e.clientY - cy) * 0.35
        target.style.transform = `translate(${dx}px, ${dy}px)`
      }
    }

    let raf
    const renderRing = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18
      ring.current.y += (pos.current.y - ring.current.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`
      }
      raf = requestAnimationFrame(renderRing)
    }
    raf = requestAnimationFrame(renderRing)

    const onEnterMagnet = (e) => {
      const el = e.currentTarget
      magnetTarget.current = el
      el.classList.add('magnet-active')
    }
    const onLeaveMagnet = (e) => {
      const el = e.currentTarget
      magnetTarget.current = null
      el.classList.remove('magnet-active')
      el.style.transform = ''
    }

    const onEnterHover = () => ringRef.current?.classList.add('cur-ring--hover')
    const onLeaveHover = () => ringRef.current?.classList.remove('cur-ring--hover')

    const onEnterScramble = (e) => scramble(e.currentTarget)

    const magnets = Array.from(document.querySelectorAll('[data-magnetic]'))
    const hoverables = Array.from(document.querySelectorAll('a, button'))
    const scramblers = Array.from(document.querySelectorAll('[data-scramble]'))

    magnets.forEach((el) => {
      el.addEventListener('mouseenter', onEnterMagnet)
      el.addEventListener('mouseleave', onLeaveMagnet)
    })
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', onEnterHover)
      el.addEventListener('mouseleave', onLeaveHover)
    })
    scramblers.forEach((el) => el.addEventListener('mouseenter', onEnterScramble))

    window.addEventListener('mousemove', move)

    return () => {
      document.body.classList.remove('has-fine-cursor')
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
      magnets.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterMagnet)
        el.removeEventListener('mouseleave', onLeaveMagnet)
      })
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterHover)
        el.removeEventListener('mouseleave', onLeaveHover)
      })
      scramblers.forEach((el) => el.removeEventListener('mouseenter', onEnterScramble))
    }
  }, [fine])

  if (!fine) return null

  return (
    <>
      <div id="cur-dot" ref={dotRef} />
      <div id="cur-ring" ref={ringRef} />
    </>
  )
}

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springCfg = { stiffness: 280, damping: 28, mass: 0.55 }
  const springX = useSpring(cursorX, springCfg)
  const springY = useSpring(cursorY, springCfg)
  const trailCfg = { stiffness: 90, damping: 18, mass: 1.2 }
  const trailX = useSpring(cursorX, trailCfg)
  const trailY = useSpring(cursorY, trailCfg)
  const haloCfg = { stiffness: 50, damping: 14, mass: 1.8 }
  const haloX = useSpring(cursorX, haloCfg)
  const haloY = useSpring(cursorY, haloCfg)

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
    if (isTouchDevice) return

    let raf = 0
    let lastX = 0
    let lastY = 0

    const move = (e) => {
      lastX = e.clientX
      lastY = e.clientY
      if (!raf) {
        raf = requestAnimationFrame(() => {
          cursorX.set(lastX)
          cursorY.set(lastY)
          raf = 0
        })
      }
    }

    const isInteractive = (el) => {
      return el?.closest('a, button, input, textarea, [role="button"], .card, label, select')
    }

    const over = (e) => { if (isInteractive(e.target)) setHovering(true) }
    const out = (e) => { if (isInteractive(e.target)) setHovering(false) }

    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseover', over, { passive: true })
    document.addEventListener('mouseout', out, { passive: true })

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [isTouchDevice, cursorX, cursorY])

  if (isTouchDevice) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: haloX,
          y: haloY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovering ? 90 : 56,
          height: hovering ? 90 : 56,
          background: hovering
            ? 'radial-gradient(circle, rgba(0, 212, 255, 0.35), rgba(122, 92, 255, 0.12) 60%, transparent 75%)'
            : 'radial-gradient(circle, rgba(0, 212, 255, 0.22), rgba(122, 92, 255, 0.08) 55%, transparent 75%)',
          filter: 'blur(6px)',
        }}
        animate={{
          width: hovering ? 90 : 56,
          height: hovering ? 90 : 56,
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 22 }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovering ? 30 : 22,
          height: hovering ? 30 : 22,
          background: 'rgba(0, 212, 255, 0.18)',
          border: '1px solid rgba(0, 212, 255, 0.5)',
          filter: 'blur(1px)',
        }}
        animate={{
          width: hovering ? 30 : 22,
          height: hovering ? 30 : 22,
        }}
        transition={{ type: 'spring', stiffness: 240, damping: 22 }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovering ? 6 : 10,
          height: hovering ? 6 : 10,
          background: 'rgba(255, 255, 255, 0.95)',
        }}
        animate={{
          width: hovering ? 6 : 10,
          height: hovering ? 6 : 10,
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      />
    </>
  )
}

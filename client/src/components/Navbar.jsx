import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import { useInbox } from '../context/InboxContext'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#journey', label: 'Journey' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [bannerVisible, setBannerVisible] = useState(true)
  const { open: openInbox, unreadCount } = useInbox()

  useEffect(() => {
    let raf = 0
    const handleScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        setScrolled(window.scrollY > 50)
        const sections = navLinks.map(l => l.href.replace('#', '')).reverse()
        for (const id of sections) {
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top <= 150) {
            setActiveSection(id)
            break
          }
        }
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {bannerVisible && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-[60]"
          >
            <div
              className="w-full text-center text-xs sm:text-sm py-2 px-4 relative"
              style={{
                background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.18), rgba(52, 211, 153, 0.18), rgba(245, 158, 11, 0.18))',
                borderBottom: '1px solid rgba(16, 185, 129, 0.2)',
                backdropFilter: 'blur(14px)',
              }}
            >
              <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-white font-medium">
                  <span className="hidden sm:inline">🟢 </span>
                  Open to Work
                </span>
                <span className="hidden sm:inline text-white/60">—</span>
                <span className="text-white/80">
                  AI / Full-Stack Engineer roles · internships & full-time
                </span>
                <a
                  href="#contact"
                  className="ml-1 underline-offset-2 hover:underline text-emerald-400 font-semibold"
                >
                  Let's talk →
                </a>
                <button
                  onClick={() => setBannerVisible(false)}
                  aria-label="Dismiss banner"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed ${bannerVisible ? 'top-[36px] sm:top-[40px]' : 'top-0'} left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-app/80 backdrop-blur-2xl border-b border-app shadow-2xl shadow-black/30'
            : 'bg-transparent'
        }`}
        style={scrolled ? { backgroundColor: 'color-mix(in srgb, var(--bg) 80%, transparent)' } : {}}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-black gradient-text tracking-tight select-none"
            >
              DS
              <span className="text-xs text-app-muted font-mono ml-1 hidden sm:inline">// dhruv soran</span>
            </motion.a>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm rounded-xl transition-all duration-300 ${
                    activeSection === link.href.replace('#', '')
                      ? 'text-emerald-400'
                      : 'text-app-muted hover:text-app-strong'
                  }`}
                >
                  {activeSection === link.href.replace('#', '') && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-xl border"
                      style={{
                        background: 'rgba(16, 185, 129, 0.08)',
                        borderColor: 'rgba(16, 185, 129, 0.15)',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={openInbox}
                aria-label="Open inbox"
                title="Inbox"
                className="relative p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-app-muted hover:text-app-strong hover:bg-white/5 transition-colors"
                style={{ touchAction: 'manipulation' }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-emerald-400 text-[9px] font-bold text-black flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              <ThemeToggle />
              <a
                href="/resume.pdf"
                download="Dhruv_Soran_Resume.pdf"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-sm rounded-full border border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/10 transition-all duration-300"
                style={{ touchAction: 'manipulation' }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Resume</span>
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                className="md:hidden text-app-strong p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
                style={{ touchAction: 'manipulation' }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden border-t border-app overflow-hidden"
              style={{ backdropFilter: 'blur(30px)', backgroundColor: 'color-mix(in srgb, var(--bg) 95%, transparent)' }}
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="block px-5 py-3.5 text-sm text-app-muted hover:text-app-strong rounded-2xl hover:bg-white/5 transition-all"
                  >
                    <span className="text-emerald-400/50 font-mono mr-3 text-xs">0{i + 1}</span>
                    {link.label}
                  </motion.a>
                ))}
                <a
                  href="/resume.pdf"
                  download="Dhruv_Soran_Resume.pdf"
                  className="block px-5 py-3.5 text-sm text-emerald-400 rounded-2xl hover:bg-emerald-400/5 transition-all"
                >
                  <span className="text-emerald-400/50 font-mono mr-3 text-xs">↓</span>
                  Download Resume
                </a>
                <button
                  onClick={() => { openInbox(); setMobileOpen(false) }}
                  className="w-full text-left block px-5 py-3.5 text-sm text-app-strong rounded-2xl hover:bg-white/5 transition-all"
                >
                  <span className="text-emerald-400/50 font-mono mr-3 text-xs">✉</span>
                  Inbox
                  {unreadCount > 0 && (
                    <span className="ml-2 text-[10px] font-mono text-emerald-400">({unreadCount} new)</span>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}

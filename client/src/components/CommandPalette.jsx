import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const sections = [
  { id: 'about', label: 'About', group: 'Sections', icon: '👤' },
  { id: 'journey', label: 'Journey (Education + Experience)', group: 'Sections', icon: '🛤️' },
  { id: 'projects', label: 'Projects', group: 'Sections', icon: '🚀' },
  { id: 'skills', label: 'Skills', group: 'Sections', icon: '⚡' },
  { id: 'achievements', label: 'Achievements', group: 'Sections', icon: '🏆' },
  { id: 'gallery', label: 'Highlights Gallery', group: 'Sections', icon: '📸' },
  { id: 'certifications', label: 'Certifications', group: 'Sections', icon: '📜' },
  { id: 'testimonials', label: 'Testimonials', group: 'Sections', icon: '💬' },
  { id: 'contact', label: 'Contact', group: 'Sections', icon: '✉️' },
  { id: 'download-resume', label: 'Download Resume', group: 'Actions', icon: '📄', action: 'resume' },
  { id: 'view-github', label: 'Open GitHub Profile', group: 'Actions', icon: '🐙', href: 'https://github.com/dhruvsoran' },
  { id: 'view-linkedin', label: 'Open LinkedIn', group: 'Actions', icon: '💼', href: 'https://linkedin.com/in/dhruv-soran-950495211' },
  { id: 'send-email', label: 'Send Email', group: 'Actions', icon: '📧', href: 'mailto:dhruvsoran@gmail.com' },
  { id: 'toggle-theme', label: 'Toggle Dark / Light Mode', group: 'Actions', icon: '🌗', action: 'theme' },
  { id: 'view-inbox', label: 'View Inbox (contact form submissions)', group: 'Actions', icon: '📬', action: 'inbox' },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      const isMac = navigator.platform.toLowerCase().includes('mac')
      const mod = isMac ? e.metaKey : e.ctrlKey
      if (mod && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(o => !o)
      } else if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (open) {
      setQuery('')
      setHighlight(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return sections
    return sections.filter(s => s.label.toLowerCase().includes(q) || s.group.toLowerCase().includes(q))
  }, [query])

  useEffect(() => {
    setHighlight(0)
  }, [query])

  const groups = useMemo(() => {
    const map = new Map()
    filtered.forEach(s => {
      if (!map.has(s.group)) map.set(s.group, [])
      map.get(s.group).push(s)
    })
    return Array.from(map.entries())
  }, [filtered])

  const run = (item) => {
    setOpen(false)
    if (item.action === 'resume') {
      const a = document.createElement('a')
      a.href = '/resume.pdf'
      a.download = 'Dhruv_Soran_Resume.pdf'
      a.click()
      return
    }
    if (item.action === 'theme') {
      window.dispatchEvent(new CustomEvent('ds-toggle-theme'))
      return
    }
    if (item.action === 'inbox') {
      window.dispatchEvent(new CustomEvent('ds-open-inbox'))
      return
    }
    if (item.href) {
      window.open(item.href, item.href.startsWith('http') ? '_blank' : '_self')
      return
    }
    if (item.id) {
      const el = document.getElementById(item.id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const onListKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight(h => Math.min(h + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight(h => Math.max(h - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered[highlight]) run(filtered[highlight])
    }
  }

  const isMac = typeof navigator !== 'undefined' && navigator.platform.toLowerCase().includes('mac')

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs text-app-muted rounded-full border border-app hover:border-[#00d4ff]/30 hover:text-app-strong transition-all duration-300"
        aria-label="Open command palette"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span>Search</span>
        <span className="kbd">{isMac ? '⌘' : 'Ctrl'} K</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4"
            style={{ background: 'rgba(5, 5, 20, 0.7)', backdropFilter: 'blur(8px)' }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-xl rounded-2xl overflow-hidden"
              style={{
                background: 'var(--bg-soft, var(--bg))',
                border: '1px solid var(--border-strong)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0, 212, 255, 0.08)',
              }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-app">
                <svg className="w-4 h-4 text-app-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={onListKey}
                  placeholder="Jump to a section, or run an action…"
                  className="flex-1 bg-transparent text-app-strong placeholder:text-app-muted text-sm outline-none"
                />
                <span className="kbd">ESC</span>
              </div>

              <div className="max-h-[55vh] overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <div className="text-center text-app-muted text-sm py-10">No results</div>
                ) : (
                  groups.map(([group, items]) => (
                    <div key={group} className="mb-2">
                      <div className="px-4 py-1.5 text-[10px] uppercase tracking-widest text-app-muted font-semibold">
                        {group}
                      </div>
                      {items.map(item => {
                        const flatIndex = filtered.indexOf(item)
                        const active = flatIndex === highlight
                        return (
                          <button
                            key={item.id}
                            onClick={() => run(item)}
                            onMouseEnter={() => setHighlight(flatIndex)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                              active ? 'bg-[#00d4ff]/10 text-app-strong' : 'text-app-muted hover:bg-white/5'
                            }`}
                          >
                            <span className="w-7 text-base">{item.icon}</span>
                            <span className="flex-1 text-left">{item.label}</span>
                            {active && (
                              <svg className="w-3.5 h-3.5 text-app-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 5l7 7-7 7" />
                              </svg>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  ))
                )}
              </div>

              <div className="px-4 py-2.5 border-t border-app flex items-center justify-between text-[10px] text-app-muted">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><span className="kbd">↑</span><span className="kbd">↓</span> navigate</span>
                  <span className="flex items-center gap-1"><span className="kbd">↵</span> open</span>
                </div>
                <span className="font-mono">ds · cmd k</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

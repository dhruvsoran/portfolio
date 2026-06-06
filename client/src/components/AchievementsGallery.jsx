import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

function fmtSize(bytes = 0) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function fmtDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  const now = Date.now()
  const diffDays = (now - d.getTime()) / 86400000
  if (diffDays < 1) return 'Today'
  if (diffDays < 2) return 'Yesterday'
  if (diffDays < 7) return `${Math.floor(diffDays)}d ago`
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function prettyName(filename = '') {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

export default function AchievementsGallery() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [index, setIndex] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [paused, setPaused] = useState(false)
  const [direction, setDirection] = useState(1)
  const timerRef = useRef(null)

  const fetchPhotos = useCallback(async () => {
    try {
      const res = await fetch('/api/achievements/photos')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setPhotos(Array.isArray(data.items) ? data.items : [])
      setIndex(0)
    } catch (err) {
      setError('Could not load photos. Is the server running?')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchPhotos() }, [fetchPhotos])

  const go = useCallback((delta) => {
    setDirection(delta > 0 ? 1 : -1)
    setIndex(i => {
      const n = photos.length
      if (n === 0) return 0
      return ((i + delta) % n + n) % n
    })
  }, [photos.length])

  const next = useCallback(() => go(1), [go])
  const prev = useCallback(() => go(-1), [go])

  useEffect(() => {
    if (photos.length <= 1 || paused || lightbox) return
    timerRef.current = setInterval(next, 5000)
    return () => clearInterval(timerRef.current)
  }, [photos.length, paused, lightbox, next])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(false)
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, next, prev])

  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  const current = photos[index]

  return (
    <section id="gallery" ref={ref} className="relative py-28 px-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, var(--bg) 0%, rgba(13,13,58,0.2) 50%, var(--bg) 100%)' }}
      />
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
            Highlights
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-title"
        >
          Moments in <span className="gradient-text">Motion</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-center text-app-muted mb-10 max-w-xl mx-auto"
        >
          Snapshots from hackathons, talks, builds, and milestones. New images are picked up automatically.
        </motion.p>

        {loading ? (
          <div className="text-center text-app-muted text-sm py-20">Loading gallery…</div>
        ) : error ? (
          <div className="text-center text-red-400 text-sm py-20">{error}</div>
        ) : photos.length === 0 ? (
          <EmptyState />
        ) : (
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-app cursor-zoom-in group"
              style={{ background: 'var(--bg-soft, var(--bg))' }}
              onClick={() => setLightbox(true)}
            >
              <AnimatePresence custom={direction} mode="popLayout" initial={false}>
                <motion.img
                  key={current?.id || current?.url || index}
                  src={current?.url}
                  alt={prettyName(current?.filename)}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 60, scale: 1.02 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -direction * 60, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  draggable="false"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

              <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3 pointer-events-none">
                <div className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-mono">
                  {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
                </div>
                <div className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-mono">
                  {fmtDate(current?.modified)}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 pointer-events-none">
                <p className="text-white font-semibold text-base sm:text-lg drop-shadow-lg">
                  {prettyName(current?.filename)}
                </p>
                <p className="text-white/70 text-xs font-mono mt-0.5">
                  {current?.filename} · {fmtSize(current?.size)}
                </p>
              </div>

              {photos.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prev() }}
                    aria-label="Previous photo"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-[#00d4ff]/80 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); next() }}
                    aria-label="Next photo"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-[#00d4ff]/80 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {photos.length > 1 && (
              <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
                {photos.map((p, i) => (
                  <button
                    key={p.url}
                    onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i) }}
                    aria-label={`Go to photo ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index
                        ? 'w-10 bg-gradient-to-r from-[#00d4ff] to-[#7a5cff]'
                        : 'w-1.5 bg-app hover:bg-app-muted'
                    }`}
                  />
                ))}
              </div>
            )}

            <div className="flex items-center justify-center gap-2 mt-6 text-[11px] text-app-muted font-mono">
              <kbd className="kbd">←</kbd>
              <kbd className="kbd">→</kbd>
              <span className="ml-1">navigate</span>
              <span className="mx-2 text-app-muted/40">·</span>
              <span>Click image for fullscreen</span>
              <button
                onClick={fetchPhotos}
                className="ml-3 inline-flex items-center gap-1 hover:text-[#00d4ff] transition-colors"
                title="Rescan folder"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.001 0 01-15.357-2m15.357 2H15" />
                </svg>
                Rescan
              </button>
            </div>
          </div>
        )}

        {photos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-3"
          >
            <code className="px-3 py-1.5 rounded-lg bg-app-soft/40 border border-app text-xs font-mono text-app-muted">
              server/uploads/achievements/
            </code>
            <span className="text-xs text-app-muted">— drop a .jpg / .png / .webp, then hit Rescan</span>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {lightbox && current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)' }}
            onClick={() => setLightbox(false)}
          >
            <button
              onClick={() => setLightbox(false)}
              aria-label="Close lightbox"
              className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              aria-label="Previous"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#00d4ff]/80 transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              aria-label="Next"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#00d4ff]/80 transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <motion.img
              key={current.url}
              src={current.url}
              alt={prettyName(current.filename)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="max-w-[95vw] max-h-[88vh] object-contain rounded-xl shadow-2xl"
              onClick={e => e.stopPropagation()}
            />

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md text-white text-sm font-medium">
              {prettyName(current.filename)} · {index + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border-2 border-dashed border-app p-10 sm:p-16 text-center"
      style={{ background: 'color-mix(in srgb, var(--bg-soft) 30%, transparent)' }}
    >
      <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(122,92,255,0.15))' }}>
        <span className="text-3xl">📸</span>
      </div>
      <h3 className="text-lg font-semibold text-app-strong mb-2">No photos yet</h3>
      <p className="text-sm text-app-muted max-w-md mx-auto mb-5">
        Drop your achievement JPEGs, PNGs, or WebPs into the folder below and they will appear here automatically.
      </p>
      <code className="inline-block px-4 py-2 rounded-xl border border-app text-sm font-mono text-[#00d4ff]" style={{ background: 'color-mix(in srgb, var(--bg-soft) 60%, transparent)' }}>
        server/uploads/achievements/
      </code>
      <p className="text-[11px] text-app-muted mt-4 font-mono">
        Supported: .jpg .jpeg .png .webp .gif .avif .svg
      </p>
    </motion.div>
  )
}

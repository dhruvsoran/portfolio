import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const testimonials = [
  {
    quote:
      'We would like to take a moment to express our sincere appreciation for the exceptional contribution you have made during your time with us. From the very beginning, you demonstrated a strong sense of ownership and commitment towards your work. What truly set you apart was not just your ability to execute tasks effectively, but your willingness to bring in your own ideas and creativity, consistently enhancing the quality of outcomes. Working with you has been a seamless and positive experience. The level of understanding, alignment, and professionalism you brought ensured that collaboration remained smooth and productive throughout, without any friction. We also deeply value your proactive approach, your consistent follow-ups, attention to detail, and the effort you invested in going beyond what was expected. You have not only met the benchmarks set for you, but have significantly outperformed them. Your contribution has been that of a dependable team member, and it reflects your strong work ethic and potential. We are truly glad to have had you as part of our team and are confident that you will continue to achieve great success in your future endeavors. Wishing you all the very best ahead.',
    name: 'Emerald AI Solutions',
    role: 'Letter of Recommendation · AI App Developer Intern',
    org: 'Emerald AI Solutions Private Limited',
    accent: '#10b981',
    avatar: '📄',
    type: 'LoR',
  },
  {
    quote:
      'Working with Dhruv on the Prithv-E prototype was energizing. He combines a strong engineering mindset with the patience to debug hardware for hours. He led the team through a tough MSME review and emerged with funding — that kind of follow-through is rare at the undergraduate level.',
    name: 'Startup Mentor',
    role: 'Mentor · Thingqbator Program',
    org: 'Thingqbator',
    accent: '#34d399',
    avatar: '🧭',
    type: 'Mentor',
  },
  {
    quote:
      'Dhruv presented the smart-bin concept at IIMS Pune and the Bharat Uday Ideathon with clarity and conviction that you do not usually see from undergrads. His prototype was one of the more thoughtful we evaluated that year.',
    name: 'Pitch Competition Jury',
    role: 'Jury · National Pitch Competition',
    org: 'IIMS Pune',
    accent: '#f59e0b',
    avatar: '🏆',
    type: 'Jury',
  },
]

function TestimonialCard({ t, i, inView }) {
  const isLong = t.quote.length > 280
  const [expanded, setExpanded] = useState(false)
  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="card relative flex flex-col h-full"
      style={{ borderTop: `2px solid ${t.accent}40` }}
    >
      <svg
        className="absolute top-4 right-4 w-10 h-10 opacity-15"
        viewBox="0 0 24 24"
        fill={t.accent}
      >
        <path d="M6 17h3l2-4V7H5v6h3zM18 17h-3l2-4V7h-6v6h3z" />
      </svg>

      <span
        className="text-[10px] font-bold tracking-widest uppercase mb-3 inline-flex items-center gap-1.5 w-fit px-2 py-0.5 rounded-full"
        style={{
          color: t.accent,
          background: `${t.accent}12`,
          border: `1px solid ${t.accent}30`,
        }}
      >
        {t.type === 'LoR' && (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
          </svg>
        )}
        {t.type}
      </span>

      <blockquote
        className={`text-app-strong text-[15px] leading-relaxed mb-5 flex-1 ${isLong ? 'text-sm sm:text-[14px]' : ''}`}
      >
        <span
          className={`block ${isLong && !expanded ? 'md:line-clamp-none' : ''}`}
          style={
            isLong && !expanded
              ? {
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }
              : {}
          }
        >
          "{t.quote}"
          {t.type === 'LoR' && (
            <span className="block mt-3 text-app-muted italic text-sm">
              — Warm regards, <span className="text-app-strong">Emerald AI Solutions Private Limited</span>
            </span>
          )}
        </span>
        {isLong && (
          <button
            onClick={() => setExpanded(e => !e)}
            className="md:hidden mt-2 text-xs font-semibold text-emerald-400 inline-flex items-center gap-1 min-h-[32px]"
            style={{ touchAction: 'manipulation' }}
          >
            {expanded ? 'Show less' : 'Read full letter'}
            <svg
              className={`w-3 h-3 transition-transform ${expanded ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </blockquote>

      <figcaption className="flex items-center gap-3 pt-4 border-t border-app">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
          style={{ background: `${t.accent}12`, border: `1px solid ${t.accent}30` }}
        >
          {t.avatar}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-app-strong truncate">{t.name}</div>
          <div className="text-xs text-app-muted truncate">
            {t.role} · <span style={{ color: t.accent }}>{t.org}</span>
          </div>
        </div>
      </figcaption>
    </motion.figure>
  )
}

export default function Testimonials() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="testimonials" ref={ref} className="py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Testimonials
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-title"
        >
          What People <span className="gradient-text">Say</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-center text-app-muted mb-12 max-w-xl mx-auto"
        >
          Including a Letter of Recommendation from my supervisor at Emerald AI.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} i={i} inView={inView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-8"
        >
          <a
            href="mailto:dhruvsoran@gmail.com?subject=LoR%20Request"
            className="inline-flex items-center gap-2 text-sm text-app-muted hover:text-emerald-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Request the full Letter of Recommendation
          </a>
        </motion.div>
      </div>
    </section>
  )
}

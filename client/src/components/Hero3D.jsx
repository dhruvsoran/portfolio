import { motion } from 'framer-motion'
import AIAvatar from './AIAvatar'
import TechStackIcons from './TechStackIcons'

export default function Hero3D() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 sm:pt-36">
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 30% 50%, rgba(16, 185, 129, 0.12), transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(52, 211, 153, 0.12), transparent 50%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg)]/30 to-[var(--bg)]/80" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-label mb-6 inline-flex">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Open to opportunities
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black gradient-text mb-6 tracking-tight leading-[0.9]"
          >
            Dhruv
            <br />
            Soran
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-base md:text-lg text-app-muted max-w-xl mx-auto lg:mx-0 mb-6 leading-relaxed"
          >
            AI-focused developer building real-world solutions with generative AI, full-stack engineering, and startup execution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="max-w-xl mx-auto lg:mx-0 mb-8"
          >
            <div
              className="rounded-2xl p-4 sm:p-5 text-left"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(52, 211, 153, 0.08))',
                border: '1px solid rgba(16, 185, 129, 0.2)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">What I'm looking for</span>
              </div>
              <p className="text-sm sm:text-[15px] text-app-strong leading-relaxed">
                AI Engineer / Full-Stack Developer roles where I can ship <span className="text-white font-semibold">production-grade GenAI products</span>,
                work closely with founders, and own outcomes end-to-end. <span className="text-app-muted">Open to internships & full-time from mid-2026.</span>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="flex flex-col items-center lg:items-start gap-3 mb-8"
          >
            <span className="text-xs text-app-muted font-mono uppercase tracking-wider">// tech I ship with</span>
            <div className="flex justify-center lg:justify-start">
              <TechStackIcons />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-wrap justify-center lg:justify-start gap-4"
          >
            <a href="#projects" className="btn-primary">
              <span>View My Work</span>
              <svg className="w-4 h-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a href="#contact" className="btn-secondary">
              Get In Touch
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
            <a
              href="/resume.pdf"
              download="Dhruv_Soran_Resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm rounded-full border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Resume PDF</span>
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center"
        >
          <AIAvatar />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-app flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2 rounded-full bg-emerald-400/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}

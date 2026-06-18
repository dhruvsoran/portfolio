import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence } from 'framer-motion'

const projects = [
  {
    title: 'Prithv-E Smart Bin',
    subtitle: 'AI-enabled Waste Sorting · IoT',
    desc: 'AI-enabled smart bin that automatically detects and sorts waste into multiple categories.',
    longDesc:
      'Designed a working hardware prototype with image classification on-device, integrated with cloud telemetry for fleet monitoring.',
    tech: ['Python', 'IoT', 'Image Processing', 'Embedded'],
    link: 'https://youtu.be/W4KhOqFW_Is',
    gradient: 'from-emerald-500 to-teal-600',
    accent: '#00d4ff',
    problem: 'Manual waste segregation in public spaces is unscalable — most waste ends up in landfills because of human sorting errors.',
    approach: 'Built a vision pipeline (Python + OpenCV) running on a Raspberry Pi to detect 4 waste categories in real time, with a hardware servo array for physical sorting.',
    result: 'Secured ₹15L in MSME funding, built a working prototype deployed in pilot sites, and was featured in two regional newspapers.',
    metrics: [
      { value: '₹15L', label: 'MSME funding' },
      { value: '4', label: 'waste categories' },
      { value: '2', label: 'press features' },
    ],
  },
  {
    title: 'KalaConnect',
    subtitle: 'Artist Marketplace · AI Recommendations',
    desc: 'Full-stack marketplace connecting artists with buyers, with AI-powered artwork recommendations via Gemini API.',
    longDesc:
      'A discovery-to-checkout platform with an AI concierge that understands buyer taste and surfaces relevant artworks.',
    tech: ['React.js', 'Node.js', 'Firebase', 'Gemini API'],
    link: 'https://www.kalaconnect.me/',
    gradient: 'from-violet-500 to-purple-600',
    accent: '#7a5cff',
    problem: 'Independent artists struggle with discoverability on generic marketplaces; buyers cant find art that matches their taste.',
    approach: 'Built a full-stack platform (React + Node + Firebase) with a Gemini-powered recommendation engine that ranks artworks by visual style and buyer interaction history.',
    result: 'Shipped a working demo with AI recommendations, deployed on Vercel + Render, and validated the concept with 20+ artist sign-ups during user testing.',
    metrics: [
      { value: '20+', label: 'artist beta users' },
      { value: '4', label: 'core modules' },
      { value: '1', label: 'LLM integrated' },
    ],
  },
  {
    title: 'Prayaas',
    subtitle: 'AI Internship Matching Engine',
    desc: 'AI-based system to match students with internships based on skills, interests, and career goals.',
    longDesc: 'Removes the cold-search problem for first-time interns by recommending opportunities weighted to their profile.',
    tech: ['Python', 'AI Logic', 'Postgresql'],
    link: 'https://sih-2025-project-2.onrender.com/',
    gradient: 'from-pink-500 to-rose-600',
    accent: '#ff6ec7',
    problem: 'Students waste hours scrolling generic internship boards that dont account for their actual skills or goals.',
    approach: 'Designed a weighted scoring algorithm (Python) that parses student skill-graphs and ranks internships on skill-overlap, location preference, and domain interest.',
    result: 'Reduced discovery time from hours to minutes during user testing, with positive feedback from college placement cell on its potential integration.',
    metrics: [
      { value: '~80%', label: 'time saved' },
      { value: '10+', label: 'data signals' },
      { value: '3', label: 'filter dimensions' },
    ],
  },
]

function ProjectCard({ project, index, inView }) {
  const [expanded, setExpanded] = useState(false)
  const [ref, cardInView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView && cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col h-full"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at 50% 0%, ${project.accent}10, transparent)`,
        }}
      />
      <div
        className="relative card flex flex-col h-full overflow-hidden"
        style={{ borderTop: `2px solid ${project.accent}40` }}
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex -space-x-1">
              {[0, 1, 2].map(j => (
                <div
                  key={j}
                  className="w-2 h-2 rounded-full"
                  style={{ background: project.accent, opacity: 0.3 + j * 0.3 }}
                />
              ))}
            </div>
            <span className="text-[10px] font-mono text-app-muted ml-auto">CASE STUDY</span>
          </div>

          <h3 className="text-xl font-bold text-app-strong mb-1 group-hover:text-[#00d4ff] transition-colors duration-300">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-xs text-app-muted mb-3 font-medium">{project.subtitle}</p>
          )}
          <p className="text-app-muted text-sm leading-relaxed mb-4">{project.desc}</p>

          <div className="grid grid-cols-3 gap-2 mb-5">
            {project.metrics.map(m => (
              <div
                key={m.label}
                className="rounded-xl p-2.5 text-center"
                style={{
                  background: `${project.accent}0C`,
                  border: `1px solid ${project.accent}25`,
                }}
              >
                <div className="text-base sm:text-lg font-black" style={{ color: project.accent }}>
                  {m.value}
                </div>
                <div className="text-[9px] sm:text-[10px] text-app-muted uppercase tracking-wider mt-0.5 leading-tight">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="space-y-3 pt-3 border-t border-app">
                  <div>
                    <div className="text-[10px] font-bold tracking-widest text-amber-400 uppercase mb-1.5">Problem</div>
                    <p className="text-sm text-app-muted leading-relaxed">{project.problem}</p>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-widest text-[#7a5cff] uppercase mb-1.5">Approach</div>
                    <p className="text-sm text-app-muted leading-relaxed">{project.approach}</p>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase mb-1.5">Result</div>
                    <p className="text-sm text-app-muted leading-relaxed">{project.result}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap gap-2 mb-4 mt-4">
          {project.tech.map(t => (
            <span key={t} className="tag text-xs">{t}</span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setExpanded(e => !e)}
            className="text-xs font-medium flex items-center gap-1.5 text-app-muted hover:text-app-strong transition-colors"
          >
            {expanded ? 'Hide' : 'Read'} case study
            <motion.svg
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </button>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium flex items-center transition-all duration-300"
            style={{ color: project.accent }}
          >
            Watch Demo
            <svg className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="projects" ref={ref} className="py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
            Projects
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-title"
        >
          Featured <span className="gradient-text">Work</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-center text-app-muted mb-12 max-w-2xl mx-auto"
        >
          Click any project to see the problem I tackled, the approach I took, and the measurable result.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

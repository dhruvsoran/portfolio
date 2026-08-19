import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const experience = [
  {
    role: 'AI App Developer Intern',
    company: 'Emerald AI',
    period: 'Jan 2026 – Apr 2026',
    items: [
      'Developed Nexus AI — an AI-powered relationship intelligence platform that tracks public updates, important events, and engagement insights for professional networks.',
      'Contributed to Eden — an AI learning companion for students and teachers with personalized study planning, analytics, and curriculum-aligned AI assistance.',
      'Integrated Generative AI, LLM APIs, and REST APIs to build scalable AI-powered features and workflows.',
      'Worked on frontend development, debugging, testing, and deployment using React.js and JavaScript.',
    ],
    note: 'Letter of Recommendation available upon request',
    color: '#10b981',
    tags: ['Generative AI', 'React.js', 'LLM APIs', 'REST APIs'],
  },
]

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="experience" ref={ref} className="py-28 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Experience
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-title"
        >
          Where I've <span className="gradient-text">Worked</span>
        </motion.h2>

        {experience.map((exp, i) => (
          <motion.div
            key={exp.role}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="card"
            style={{ borderLeft: `3px solid ${exp.color}40` }}
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
              <div>
                <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                <p className="text-emerald-400 font-medium">{exp.company}</p>
              </div>
              <span
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium"
                style={{ background: exp.color + '12', color: exp.color, border: `1px solid ${exp.color}20` }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                {exp.period}
              </span>
            </div>

            <ul className="space-y-3 mb-5">
              {exp.items.map((item, j) => (
                <motion.li
                  key={j}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + j * 0.08 }}
                  className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: exp.color }} />
                  {item}
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mb-4">
              {exp.tags.map(tag => (
                <span key={tag} className="tag text-xs">{tag}</span>
              ))}
            </div>

            <p className="text-xs text-gray-600 italic border-t border-white/5 pt-4 mt-2">{exp.note}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

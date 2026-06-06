import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const timeline = [
  {
    type: 'work',
    title: 'AI App Developer Intern',
    org: 'Emerald AI',
    period: 'Jan 2026 – Apr 2026',
    location: 'Remote',
    points: [
      'Built Nexus AI — relationship intelligence platform tracking public updates & engagement insights.',
      'Contributed to Eden — AI learning companion for students and teachers with personalized study planning.',
      'Integrated Generative AI, LLM APIs, and REST APIs to ship scalable AI-powered features.',
    ],
    color: '#00d4ff',
    icon: '💼',
  },
  {
    type: 'edu',
    title: 'B.Tech · Computer Science & Engineering',
    org: 'IIMT University',
    period: '2023 – 2027',
    location: 'Meerut, India',
    points: [
      'Current CGPA: 8.6 — coursework in AI, data structures, distributed systems, and product engineering.',
      'Active in hackathons (SIH, Wadhwani Bootcamp, IDE Bootcamp Lucknow) and startup-stage programs.',
    ],
    color: '#7a5cff',
    icon: '🎓',
  },
  {
    type: 'work',
    title: 'Founder / Lead Engineer',
    org: 'Prithv-E Smart Bin',
    period: '2023 – Present',
    location: 'Meerut, India',
    points: [
      'Founded an AI-waste-sorting startup — vision pipeline + servo array for physical segregation.',
      'Secured ₹15L MSME funding; built a working prototype and validated it on pilot sites.',
    ],
    color: '#10b981',
    icon: '🚀',
  },
  {
    type: 'edu',
    title: 'Senior Secondary (XII)',
    org: 'Shanti Niketan Vidyapeeth',
    period: '2023',
    location: 'India',
    points: ['Score: 92% — strong foundation in PCM and computer science.'],
    color: '#ff6ec7',
    icon: '📘',
  },
  {
    type: 'edu',
    title: 'High School (X)',
    org: 'Shanti Niketan Vidyapeeth',
    period: '2021',
    location: 'India',
    points: ['Score: 98.2% — featured in local press for academic excellence.'],
    color: '#f59e0b',
    icon: '📖',
  },
]

const typeLabel = {
  work: 'Work',
  edu: 'Education',
}

export default function Journey() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="journey" ref={ref} className="py-28 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
            Journey
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-title"
        >
          Education &amp; <span className="gradient-text">Experience</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-center text-app-muted mb-14 max-w-xl mx-auto"
        >
          A unified timeline of where I learned and what I shipped.
        </motion.p>

        <div className="relative">
          <div
            className="absolute left-[26px] md:left-[34px] top-0 bottom-0 w-px"
            style={{
              background:
                'linear-gradient(180deg, rgba(0, 212, 255, 0.4) 0%, rgba(122, 92, 255, 0.3) 40%, rgba(255, 110, 199, 0.2) 70%, transparent 100%)',
            }}
          />

          {timeline.map((item, i) => (
            <motion.div
              key={item.title + item.org}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-16 md:pl-20 pb-10 last:pb-0"
            >
              <div
                className="absolute left-[18px] md:left-[26px] w-3 h-3 rounded-full border-2 translate-x-[-3px] mt-2.5 z-10"
                style={{
                  borderColor: item.color,
                  background: item.color + '40',
                  boxShadow: `0 0 14px ${item.color}60`,
                }}
              />

              <div
                className="absolute left-[8px] md:left-[16px] mt-2.5 w-7 h-7 rounded-full flex items-center justify-center text-xs z-10 -translate-x-[3px]"
                style={{
                  background: 'var(--bg)',
                  border: `1px solid ${item.color}40`,
                }}
              >
                {item.icon}
              </div>

              <div className="card">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                    style={{
                      color: item.color,
                      background: item.color + '12',
                      border: `1px solid ${item.color}30`,
                    }}
                  >
                    {typeLabel[item.type]}
                  </span>
                  <span className="text-xs text-app-muted font-mono">{item.period}</span>
                  {item.location && (
                    <span className="text-xs text-app-muted">· {item.location}</span>
                  )}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-app-strong mb-1">{item.title}</h3>
                <p className="text-sm font-medium mb-3" style={{ color: item.color }}>{item.org}</p>
                <ul className="space-y-1.5">
                  {item.points.map((p, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-app-muted leading-relaxed">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ background: item.color }}
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

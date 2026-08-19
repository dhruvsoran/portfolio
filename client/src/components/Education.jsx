import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const education = [
  {
    degree: 'B.Tech in Computer Science & Engineering',
    school: 'IIMT University',
    year: '2023 – 2027',
    score: '8.6 CGPA',
    icon: '🎓',
    color: '#10b981',
  },
  {
    degree: 'Senior Secondary (XII)',
    school: 'Shanti Niketan Vidyapeeth',
    year: '2023',
    score: '92%',
    icon: '📘',
    color: '#34d399',
  },
  {
    degree: 'High School (X)',
    school: 'Shanti Niketan Vidyapeeth',
    year: '2021',
    score: '98.2%',
    icon: '📖',
    color: '#f59e0b',
  },
]

export default function Education() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="education" ref={ref} className="py-28 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Education
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-title"
        >
          Academic <span className="gradient-text">Journey</span>
        </motion.h2>

        <div className="relative">
          <div className="absolute left-[26px] md:left-[34px] top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/40 via-teal-400/30 to-transparent" />

          {education.map((item, i) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-16 md:pl-20 pb-12 last:pb-0"
            >
              <div
                className="absolute left-[18px] md:left-[26px] w-3 h-3 rounded-full border-2 translate-x-[-3px] mt-2"
                style={{ borderColor: item.color, background: item.color + '33', boxShadow: `0 0 12px ${item.color}40` }}
              />
              <div className="card">
                <div className="flex items-start gap-4">
                  <span className="text-3xl mt-1">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-1.5">
                      <h3 className="text-lg md:text-xl font-bold text-app-strong">{item.degree}</h3>
                      <span
                        className="inline-flex px-3 py-0.5 rounded-full text-xs font-semibold"
                        style={{ background: item.color + '15', color: item.color, border: `1px solid ${item.color}30` }}
                      >
                        {item.score}
                      </span>
                    </div>
                    <p className="text-emerald-400 font-medium text-sm md:text-base">{item.school}</p>
                    <p className="text-app-muted text-xs mt-1.5 font-mono">{item.year}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

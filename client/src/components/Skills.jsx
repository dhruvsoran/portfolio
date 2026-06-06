import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const skillCategories = [
  {
    label: 'Programming',
    skills: ['Python', 'JavaScript', 'SQL'],
    color: '#00d4ff',
  },
  {
    label: 'Web Development',
    skills: ['React.js', 'Node.js', 'Express.js', 'HTML', 'CSS', 'React Native'],
    color: '#7a5cff',
  },
  {
    label: 'AI & Data',
    skills: ['Generative AI', 'AI Agents', 'AI Product Development', 'APIs', 'LLMs'],
    color: '#ff6ec7',
  },
  {
    label: 'Tools & Platforms',
    skills: ['Git', 'GitHub', 'Firebase', 'Render', 'Vercel', 'Netlify', 'Claude AI'],
    color: '#f59e0b',
  },
  {
    label: 'Core Competencies',
    skills: ['Problem Solving', 'Product Thinking', 'Startup Execution', 'Debugging'],
    color: '#10b981',
  },
]

function SkillBar({ name, index, inView, color }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="tag text-sm px-4 py-2 cursor-default hover:scale-105 transition-transform"
      style={{
        borderColor: color + '30',
        color: color,
        background: color + '08',
      }}
    >
      {name}
    </motion.span>
  )
}

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="skills" ref={ref} className="py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
            Skills
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-title"
        >
          Tech Stack &amp; <span className="gradient-text">Expertise</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="card"
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: cat.color, boxShadow: `0 0 10px ${cat.color}50` }}
                />
                <h3 className="text-lg font-bold text-app-strong">{cat.label}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, j) => (
                  <SkillBar key={skill} name={skill} index={j} inView={inView} color={cat.color} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

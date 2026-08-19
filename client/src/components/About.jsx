import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const highlights = [
  { icon: '🤖', label: 'AI Application Developer', desc: 'Building real-world AI solutions with GenAI & LLMs', color: '#10b981' },
  { icon: '💡', label: 'Startup Mindset', desc: 'Secured ₹15L MSME funding for Prithv-E Smart Bin', color: '#f59e0b' },
  { icon: '🏆', label: 'Award Winner', desc: 'National pitch competition winner at IIMS Pune', color: '#34d399' },
  { icon: '🚀', label: 'Full Stack Builder', desc: 'React, Node.js, Firebase, Python & more', color: '#10b981' },
]

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" ref={ref} className="relative py-28 px-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, var(--bg) 0%, rgba(13,13,58,0.3) 50%, var(--bg) 100%)',
        }}
      />
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            About
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-title"
        >
          Who <span className="gradient-text">I Am</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="text-app-muted text-lg leading-relaxed">
            AI-focused Computer Science undergraduate with hands-on experience in{' '}
            <span className="text-app-strong font-semibold">AI application development</span>,{' '}
            <span className="text-app-strong font-semibold">Generative AI integration</span>, and building{' '}
            <span className="text-app-strong font-semibold">real-world solutions</span>.
            Passionate about creating products that merge AI capabilities with practical impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {highlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.12 * i + 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(135deg, ${item.color}08, ${item.color}08)` }}
              />
              <div className="relative card text-center">
                <div
                  className="w-14 h-14 mx-auto mb-5 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${item.color}10`, border: `1px solid ${item.color}30` }}
                >
                  {item.icon}
                </div>
                <h3 className="text-app-strong font-bold text-lg mb-2">{item.label}</h3>
                <p className="text-app-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

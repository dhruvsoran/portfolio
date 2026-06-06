import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const certs = [
  { name: 'Python Crash Course', issuer: 'Coursera' },
  { name: 'Foundations of Project Management', issuer: 'Google' },
  { name: 'The Joy of Computing Using Python', issuer: 'NPTEL' },
  { name: 'Introduction to IoT', issuer: 'NPTEL' },
  { name: 'HTML, CSS & JavaScript Certification', issuer: 'Coursera' },
  { name: 'TCS iON Young Professionals Certification', issuer: 'TCS' },
  { name: 'Kaggle × Google AI Agents Intensive Capstone', issuer: 'Kaggle / Google' },
]

const issuerColors = {
  Coursera: '#2a73ff',
  Google: '#34a853',
  NPTEL: '#f39c12',
  TCS: '#0078d4',
  'Kaggle / Google': '#20beff',
}

export default function Certifications() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="certifications" ref={ref} className="py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
            Certifications
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-title"
        >
          Continuous <span className="gradient-text">Learning</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="card flex items-center gap-4 group cursor-default"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{ background: (issuerColors[cert.issuer] || '#00d4ff') + '15' }}
              >
                <svg className="w-5 h-5" style={{ color: issuerColors[cert.issuer] || '#00d4ff' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-app-strong truncate">{cert.name}</h4>
                <p className="text-xs mt-0.5" style={{ color: issuerColors[cert.issuer] || '#00d4ff' }}>{cert.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

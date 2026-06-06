import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const achievements = [
  {
    icon: '🥉',
    title: '3rd Place — National Startup Pitch',
    org: 'IIMS Pune',
    desc: '3rd position in a national startup pitch competition for the Prithv-E Smart Bin prototype.',
    proof: 'https://youtu.be/W4KhOqFW_Is',
    proofLabel: 'Watch pitch',
    color: '#f59e0b',
  },
  {
    icon: '🥉',
    title: '3rd Place — Bharat Uday Ideathon',
    org: 'IIMT University',
    desc: '3rd position in the Bharat Uday ideathon for an AI-driven social-impact concept.',
    proof: null,
    proofLabel: null,
    color: '#f59e0b',
  },
  {
    icon: '🌟',
    title: 'Top 40 of 1,200 — Thingqbator',
    org: 'Startup Stage · Thingqbator',
    desc: 'Selected among the Top 40 teams out of 1,200 for the Thingqbator Startup Stage accelerator program.',
    proof: null,
    proofLabel: null,
    color: '#7a5cff',
  },
  {
    icon: '📰',
    title: 'Press Features · Regional Newspapers',
    org: 'Local Press',
    desc: 'Featured twice in local newspapers — once for academic excellence (98.2% in Class X) and once for developing the Prithv-E prototype.',
    proof: 'https://youtu.be/W4KhOqFW_Is',
    proofLabel: 'Read story',
    color: '#ff6ec7',
  },
  {
    icon: '🏅',
    title: 'Hackathons & Bootcamps',
    org: 'SIH · Wadhwani · IDE Lucknow',
    desc: 'Participant in Smart India Hackathon, the Wadhwani Bootcamp, and the IDE Bootcamp Lucknow.',
    proof: null,
    proofLabel: null,
    color: '#10b981',
  },
  {
    icon: '💰',
    title: '₹15L MSME Funding',
    org: 'Prithv-E Smart Bin',
    desc: 'Secured ₹15L in MSME funding for the Prithv-E Smart Bin — a working hardware prototype in the field.',
    proof: 'https://youtu.be/W4KhOqFW_Is',
    proofLabel: 'See prototype',
    color: '#00d4ff',
  },
]

export default function Achievements() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="achievements" ref={ref} className="py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
            Achievements
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-title"
        >
          Milestones &amp; <span className="gradient-text">Recognition</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-center text-app-muted mb-12 max-w-xl mx-auto"
        >
          Each achievement links out to proof — a pitch video, prototype demo, or story.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((item, i) => {
            const Wrapper = item.proof ? motion.a : motion.div
            const wrapperProps = item.proof
              ? { href: item.proof, target: '_blank', rel: 'noopener noreferrer' }
              : {}

            return (
              <Wrapper
                key={item.title}
                {...wrapperProps}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`card flex items-start gap-4 group ${item.proof ? 'cursor-pointer' : ''}`}
                style={{ borderLeft: `3px solid ${item.color}40` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${item.color}12`, border: `1px solid ${item.color}30` }}
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-app-strong leading-tight mb-0.5">
                    {item.title}
                  </h3>
                  <p className="text-[11px] font-mono uppercase tracking-wider mb-2" style={{ color: item.color }}>
                    {item.org}
                  </p>
                  <p className="text-app-muted text-sm leading-relaxed mb-2">{item.desc}</p>
                  {item.proof && (
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2 transition-all"
                      style={{ color: item.color }}
                    >
                      {item.proofLabel}
                      <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  )}
                </div>
              </Wrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}

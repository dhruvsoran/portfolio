import { motion } from 'framer-motion'

const building = [
  {
    name: 'AI Relationship Co-pilot',
    desc: 'A workspace that surfaces warm intros, follow-ups, and engagement context — powered by an LLM trained on your public footprint.',
    progress: 70,
    status: 'In progress',
    color: '#00d4ff',
    stack: ['Next.js', 'LangChain', 'Postgres', 'OpenAI'],
  },
  {
    name: 'KalaConnect v2',
    desc: 'A revamped artist marketplace with an AI concierge that matches buyers to artworks by visual style, not just keywords.',
    progress: 45,
    status: 'In progress',
    color: '#7a5cff',
    stack: ['React Native', 'Gemini API', 'Firebase'],
  },
  {
    name: 'Prithv-E Pilot 2.0',
    desc: 'Hardware refresh of the smart-bin prototype — better vision model, lower power, and a fleet dashboard for site operators.',
    progress: 25,
    status: 'Planning',
    color: '#10b981',
    stack: ['Raspberry Pi', 'Python', 'MQTT', 'React'],
  },
]

export default function CurrentlyBuilding() {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
          </div>
          <div>
            <div className="text-sm font-semibold text-app-strong">Currently Building</div>
            <div className="text-[10px] text-app-muted font-mono">live · updated {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
          </div>
        </div>
        <span className="text-[10px] text-emerald-400 font-mono px-2 py-0.5 rounded-full border border-emerald-400/30 bg-emerald-400/10">
          ACTIVE
        </span>
      </div>

      <div className="space-y-4">
        {building.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="rounded-xl p-3.5"
            style={{
              background: `${p.color}08`,
              border: `1px solid ${p.color}25`,
            }}
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <h4 className="text-sm font-bold text-app-strong">{p.name}</h4>
              <span
                className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0"
                style={{ color: p.color, background: `${p.color}15`, border: `1px solid ${p.color}30` }}
              >
                {p.status}
              </span>
            </div>
            <p className="text-xs text-app-muted leading-relaxed mb-3">{p.desc}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {p.stack.map(s => (
                <span
                  key={s}
                  className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                  style={{ background: 'rgba(0,0,0,0.2)', color: p.color }}
                >
                  {s}
                </span>
              ))}
            </div>
            <div>
              <div className="flex items-center justify-between text-[10px] text-app-muted font-mono mb-1">
                <span>progress</span>
                <span style={{ color: p.color }}>{p.progress}%</span>
              </div>
              <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.25)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${p.progress}%` }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full"
                  style={{ background: p.color, boxShadow: `0 0 8px ${p.color}80` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

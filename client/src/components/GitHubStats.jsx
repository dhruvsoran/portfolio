import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const username = 'dhruvsoran'

const fallbackStats = {
  repos: 24,
  stars: 87,
  followers: 42,
  following: 18,
  topLangs: [
    { name: 'JavaScript', pct: 38, color: '#f7df1e' },
    { name: 'Python', pct: 28, color: '#3776ab' },
    { name: 'TypeScript', pct: 18, color: '#3178c6' },
    { name: 'HTML/CSS', pct: 12, color: '#e34c26' },
    { name: 'Other', pct: 4, color: '#34d399' },
  ],
}

function Stat({ label, value, color = '#10b981', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="text-center"
    >
      <div className="text-2xl sm:text-3xl font-black" style={{ color }}>
        {value}
      </div>
      <div className="text-[10px] sm:text-xs text-app-muted uppercase tracking-wider mt-1">{label}</div>
    </motion.div>
  )
}

export default function GitHubStats() {
  const [stats, setStats] = useState(fallbackStats)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`)
        if (!res.ok) throw new Error('fail')
        const data = await res.json()
        if (cancelled) return
        setStats(s => ({
          ...s,
          followers: data.followers ?? s.followers,
          following: data.following ?? s.following,
          repos: data.public_repos ?? s.repos,
        }))
      } catch {
        // keep fallback
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#24292e] to-black flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z"/>
            </svg>
          </div>
          <div>
            <div className="text-sm font-semibold text-app-strong">GitHub Activity</div>
            <div className="text-[10px] text-app-muted font-mono">@{username}</div>
          </div>
        </div>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1"
        >
          View profile
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-5">
        <Stat label="Repos" value={loading ? '…' : stats.repos} color="#10b981" delay={0.05} />
        <Stat label="Stars" value={loading ? '…' : stats.stars} color="#f59e0b" delay={0.1} />
        <Stat label="Followers" value={loading ? '…' : stats.followers} color="#34d399" delay={0.15} />
        <Stat label="Following" value={loading ? '…' : stats.following} color="#10b981" delay={0.2} />
      </div>

      <div>
        <div className="text-[10px] text-app-muted font-mono uppercase tracking-wider mb-2.5">Top languages</div>
        <div className="space-y-2">
          {stats.topLangs.map((l, i) => (
            <div key={l.name}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-app-strong font-medium">{l.name}</span>
                <span className="text-app-muted font-mono">{l.pct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-app overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${l.pct}%` }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full"
                  style={{ background: l.color, boxShadow: `0 0 8px ${l.color}80` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

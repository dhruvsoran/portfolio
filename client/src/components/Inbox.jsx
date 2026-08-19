import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInbox } from '../context/InboxContext'

function timeAgo(iso) {
  if (!iso) return ''
  const diff = (Date.now() - new Date(iso).getTime()) / 1000
  if (diff < 60) return `${Math.floor(diff)}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 86400 * 30) return `${Math.floor(diff / 86400)}d ago`
  return new Date(iso).toLocaleDateString()
}

function avatarFor(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  const letters = (parts[0]?.[0] || '?') + (parts[1]?.[0] || '')
  return letters.toUpperCase().slice(0, 2)
}

function hashColor(str = '') {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0
  const hue = Math.abs(h) % 360
  return `linear-gradient(135deg, hsl(${hue} 80% 55%), hsl(${(hue + 40) % 360} 80% 60%))`
}

function KeyPrompt({ onSubmit }) {
  const [v, setV] = useState('')
  const [show, setShow] = useState(false)
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (v.trim()) onSubmit(v.trim()) }}
      className="px-6 py-10 text-center"
    >
      <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(52,211,153,0.15))' }}>
        <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 11c1.66 0 3-1.34 3-3S13.66 5 12 5 9 6.34 9 8s1.34 3 3 3zm0 2c-2.21 0-6 1.11-6 3.33V19h12v-2.67C18 14.11 14.21 13 12 13z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-app-strong mb-1">Inbox is locked</h3>
      <p className="text-sm text-app-muted mb-5 max-w-sm mx-auto">
        Set <code className="font-mono text-emerald-400">INBOX_KEY</code> on the server. Enter it here — it is stored only for this tab.
      </p>
      <div className="max-w-xs mx-auto flex gap-2">
        <input
          type={show ? 'text' : 'password'}
          value={v}
          onChange={e => setV(e.target.value)}
          placeholder="INBOX_KEY"
          autoFocus
          className="input-field flex-1"
        />
        <button type="button" onClick={() => setShow(s => !s)}
          className="px-3 rounded-xl border border-app text-app-muted hover:text-app-strong"
          aria-label={show ? 'Hide key' : 'Show key'}>
          {show ? '🙈' : '👁️'}
        </button>
      </div>
      <button type="submit" disabled={!v.trim()} className="btn-primary mt-4 mx-auto">
        Unlock
      </button>
    </form>
  )
}

function MessageCard({ m, onToggleRead, onDelete }) {
  const [expanded, setExpanded] = useState(false)
  const longMessage = (m.message || '').length > 220
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className={`group relative rounded-2xl border p-4 sm:p-5 transition-all ${
        m.read ? 'border-app' : 'border-emerald-400/30'
      }`}
      style={m.read ? { background: 'color-mix(in srgb, var(--bg-soft) 40%, transparent)' } : { background: 'rgba(16, 185, 129, 0.04)' }}
    >
      {!m.read && (
        <span className="absolute top-3 right-3 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
      )}
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-semibold text-sm shrink-0"
          style={{ background: hashColor(m.email || m.name) }}
        >
          {avatarFor(m.name)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2 flex-wrap">
            <p className="text-sm font-semibold text-app-strong truncate">{m.name}</p>
            <a href={`mailto:${m.email}`} className="text-xs text-emerald-400 hover:underline truncate">
              {m.email}
            </a>
            <span className="text-[10px] text-app-muted ml-auto shrink-0 font-mono">{timeAgo(m.receivedAt)}</span>
          </div>
          <p className={`text-sm text-app mt-2 whitespace-pre-wrap break-words ${!expanded && longMessage ? 'line-clamp-3' : ''}`}>
            {m.message}
          </p>
          {longMessage && (
            <button
              onClick={() => setExpanded(e => !e)}
              className="text-xs text-emerald-400 hover:underline mt-1"
            >
              {expanded ? 'Show less' : 'Read more'}
            </button>
          )}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <a
              href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: Your message on dhruvsoran.com`)}`}
              className="text-xs px-3 py-1.5 rounded-full bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400/20 transition-colors"
            >
              Reply
            </a>
            <button
              onClick={() => navigator.clipboard?.writeText(m.email)}
              className="text-xs px-3 py-1.5 rounded-full border border-app text-app-muted hover:text-app-strong hover:border-emerald-400/30 transition-colors"
            >
              Copy email
            </button>
            <button
              onClick={() => onToggleRead(m.id, !m.read)}
              className="text-xs px-3 py-1.5 rounded-full border border-app text-app-muted hover:text-app-strong hover:border-emerald-400/30 transition-colors"
            >
              Mark as {m.read ? 'unread' : 'read'}
            </button>
            <button
              onClick={() => {
                if (confirm(`Delete message from ${m.name}?`)) onDelete(m.id)
              }}
              className="text-xs px-3 py-1.5 rounded-full border border-app text-app-muted hover:text-red-400 hover:border-red-400/40 transition-colors ml-auto"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Inbox() {
  const { isOpen, close, messages, loading, error, needsKey, key, saveKey, fetchMessages, markRead, remove, unreadCount } = useInbox()
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  const filtered = messages.filter(m => {
    if (filter === 'unread') return !m.read
    if (filter === 'read') return m.read
    return true
  })

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[6vh] sm:pt-[10vh] px-3 sm:px-4"
          style={{ background: 'rgba(5, 5, 20, 0.72)', backdropFilter: 'blur(10px)' }}
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: 'var(--bg-soft, var(--bg))',
              border: '1px solid var(--border-strong)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0, 212, 255, 0.08)',
              maxHeight: '85vh',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-app">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.18), rgba(52,211,153,0.18))' }}>
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-semibold text-app-strong">Inbox</h2>
                <p className="text-xs text-app-muted">
                  {loading ? 'Loading…' :
                    messages.length === 0 ? 'No messages yet' :
                    `${messages.length} message${messages.length === 1 ? '' : 's'} · ${unreadCount} unread`}
                </p>
              </div>
              {!needsKey && (
                <div className="hidden sm:flex items-center gap-1 p-0.5 rounded-full border border-app">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'unread', label: 'Unread' },
                    { id: 'read', label: 'Read' },
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setFilter(t.id)}
                      className={`text-xs px-3 py-1 rounded-full transition-all ${
                        filter === t.id
                          ? 'bg-emerald-400/15 text-emerald-400'
                          : 'text-app-muted hover:text-app-strong'
                      }`}
                    >
                      {t.label}
                      {t.id === 'unread' && unreadCount > 0 && (
                        <span className="ml-1.5 text-[10px] font-mono">{unreadCount}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
              <button
                onClick={fetchMessages}
                disabled={loading}
                aria-label="Refresh"
                className="p-2 rounded-lg text-app-muted hover:text-app-strong hover:bg-white/5 transition-colors disabled:opacity-50"
              >
                <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button
                onClick={close}
                aria-label="Close inbox"
                className="p-2 rounded-lg text-app-muted hover:text-app-strong hover:bg-white/5 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {needsKey ? (
              <KeyPrompt onSubmit={saveKey} />
            ) : error && messages.length === 0 ? (
              <div className="px-6 py-10 text-center">
                <p className="text-sm text-red-400 mb-3">{error}</p>
                {key && (
                  <button
                    onClick={() => saveKey('')}
                    className="text-xs px-3 py-1.5 rounded-full border border-app text-app-muted hover:text-app-strong"
                  >
                    Clear stored key
                  </button>
                )}
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
                {loading && messages.length === 0 ? (
                  <div className="text-center text-app-muted text-sm py-10">Loading messages…</div>
                ) : filtered.length === 0 ? (
                  <div className="text-center text-app-muted text-sm py-10">
                    {filter === 'unread' ? 'Nothing unread. 🎉' :
                     filter === 'read' ? 'No read messages yet.' :
                     'No messages yet. When someone uses the contact form, it will appear here.'}
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {filtered.map(m => (
                      <MessageCard key={m.id} m={m} onToggleRead={markRead} onDelete={remove} />
                    ))}
                  </AnimatePresence>
                )}
              </div>
            )}

            <div className="px-5 py-2.5 border-t border-app flex items-center justify-between text-[10px] text-app-muted">
              <span>Stored at <code className="font-mono text-app-muted">server/data/inbox.json</code></span>
              <span className="kbd">ESC</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

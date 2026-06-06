import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

const InboxContext = createContext(null)
const KEY_STORAGE = 'ds-inbox-key'
const POLL_MS = 30000

export function InboxProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [needsKey, setNeedsKey] = useState(false)
  const [key, setKey] = useState(() => {
    try { return sessionStorage.getItem(KEY_STORAGE) || '' } catch { return '' }
  })
  const lastIdRef = useRef(null)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  const fetchMessages = useCallback(async (opts = {}) => {
    const { silent = false } = opts
    if (!silent) setLoading(true)
    setError('')
    try {
      const headers = {}
      if (key) headers['x-inbox-key'] = key
      const res = await fetch('/api/contact', { headers })
      if (res.status === 401) {
        setNeedsKey(true)
        setMessages([])
        setError('Inbox is protected. Enter your INBOX_KEY to continue.')
        return
      }
      if (!res.ok) {
        setError(`Failed to load (${res.status})`)
        return
      }
      const data = await res.json()
      setNeedsKey(false)
      setMessages(Array.isArray(data.items) ? data.items : [])
    } catch (err) {
      setError('Could not reach the server. Is it running on :5000?')
    } finally {
      if (!silent) setLoading(false)
    }
  }, [key])

  useEffect(() => {
    fetchMessages({ silent: true })
    const t = setInterval(() => fetchMessages({ silent: true }), POLL_MS)
    const onOpen = () => { open(); fetchMessages() }
    const onNew = () => fetchMessages({ silent: true })
    window.addEventListener('ds-open-inbox', onOpen)
    window.addEventListener('ds-new-contact', onNew)
    const onFocus = () => fetchMessages({ silent: true })
    window.addEventListener('focus', onFocus)
    return () => {
      clearInterval(t)
      window.removeEventListener('ds-open-inbox', onOpen)
      window.removeEventListener('ds-new-contact', onNew)
      window.removeEventListener('focus', onFocus)
    }
  }, [fetchMessages, open])

  const saveKey = (k) => {
    setKey(k)
    try { if (k) sessionStorage.setItem(KEY_STORAGE, k); else sessionStorage.removeItem(KEY_STORAGE) } catch {}
  }

  const markRead = async (id, read) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read } : m))
    try {
      const headers = { 'Content-Type': 'application/json' }
      if (key) headers['x-inbox-key'] = key
      await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ read }),
      })
    } catch {}
  }

  const remove = async (id) => {
    const prev = messages
    setMessages(p => p.filter(m => m.id !== id))
    try {
      const headers = {}
      if (key) headers['x-inbox-key'] = key
      const res = await fetch(`/api/contact/${id}`, { method: 'DELETE', headers })
      if (!res.ok) setMessages(prev)
    } catch {
      setMessages(prev)
    }
  }

  const unreadCount = messages.filter(m => !m.read).length
  const latest = messages[0]?.id || null
  useEffect(() => {
    if (latest && latest !== lastIdRef.current) {
      lastIdRef.current = latest
    }
  }, [latest])

  return (
    <InboxContext.Provider value={{
      isOpen, open, close,
      messages, loading, error,
      needsKey, key, saveKey,
      unreadCount,
      fetchMessages: () => fetchMessages(),
      markRead, remove,
    }}>
      {children}
    </InboxContext.Provider>
  )
}

export const useInbox = () => {
  const ctx = useContext(InboxContext)
  if (!ctx) throw new Error('useInbox must be used within InboxProvider')
  return ctx
}

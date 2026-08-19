import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const contactLinks = [
  {
    label: 'Email',
    value: 'dhruvsoran@gmail.com',
    href: 'mailto:dhruvsoran@gmail.com',
    icon: '📧',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/dhruv-soran-950495211',
    href: 'https://linkedin.com/in/dhruv-soran-950495211',
    icon: '💼',
  },
  {
    label: 'GitHub',
    value: 'github.com/dhruvsoran',
    href: 'https://github.com/dhruvsoran',
    icon: '🐙',
  },
  {
    label: 'Phone',
    value: '+91 7818093944',
    href: 'tel:+917818093944',
    icon: '📞',
  },
  {
    label: 'Location',
    value: 'Meerut, Uttar Pradesh, India',
    icon: '📍',
  },
]

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
        window.dispatchEvent(new CustomEvent('ds-new-contact'))
        setTimeout(() => setStatus(''), 5000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" ref={ref} className="relative py-28 px-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, var(--bg) 0%, rgba(13,13,58,0.2) 50%, var(--bg) 100%)' }}
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
            Contact
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-title"
        >
          Let's <span className="gradient-text">Connect</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-center text-app-muted mb-12 max-w-lg mx-auto"
        >
          Have a project in mind or just want to say hi? I'd love to hear from you.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-y-4">
              {contactLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href || '#'}
                  target={link.href?.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.06 }}
                  className="card flex items-center gap-4 hover:border-emerald-400/20 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-400/10 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-app-muted font-medium">{link.label}</p>
                    <p className="text-sm text-app-strong group-hover:text-emerald-400 transition-colors truncate">{link.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <form onSubmit={handleSubmit} className="card space-y-5">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                  className="input-field resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary w-full justify-center"
              >
                {status === 'sending' ? (
                  <span className="flex items-center gap-2 relative z-10">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </span>
                ) : status === 'sent' ? (
                  <span className="relative z-10">Message Sent! ✓</span>
                ) : (
                  <span className="relative z-10">Send Message</span>
                )}
              </button>
              {status === 'sent' && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-emerald-400 text-sm text-center"
                >
                  Thanks! I'll get back to you soon.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm text-center"
                >
                  Something went wrong. Try emailing me directly at dhruvsoran@gmail.com
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

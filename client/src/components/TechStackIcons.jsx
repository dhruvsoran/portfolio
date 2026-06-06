const stack = [
  { name: 'React', svg: (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/><path d="M21 12c0 1.5-1.9 2.9-4.8 3.7 1 3.1.5 5.6-.7 6.4-1.2.8-3.3-.1-5-2.2-1.7 2.1-3.8 3-5 2.2-1.2-.8-1.7-3.3-.7-6.4C2.9 14.9 1 13.5 1 12s1.9-2.9 4.8-3.7C4.8 5.2 5.3 2.7 6.5 1.9c1.2-.8 3.3.1 5 2.2 1.7-2.1 3.8-3 5-2.2 1.2.8 1.7 3.3.7 6.4C19.1 9.1 21 10.5 21 12zm-9 1.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>) },
  { name: 'Node.js', svg: (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.85a2.1 2.1 0 011.66.83l7.65 9.86a2.1 2.1 0 01.36 1.95l-2.96 9.12a2.1 2.1 0 01-2 1.49H7.29a2.1 2.1 0 01-2-1.49L2.33 14.5a2.1 2.1 0 01.36-1.96L10.34 2.68A2.1 2.1 0 0112 1.85z"/></svg>) },
  { name: 'Python', svg: (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-3 0-5 1-5 3v3h5v1H4c-2 0-3 2-3 5s1 5 3 5h3v-3c0-2 2-3 4-3h5c2 0 3-1 3-3V5c0-2-2-3-5-3h-2zm-2 1.5a.75.75 0 110 1.5.75.75 0 010-1.5zM12 14c-2 0-4 1-4 3v3c0 2 2 3 5 3h2c3 0 5-1 5-3v-3h-5v-1h7c2 0 3-2 3-5s-1-5-3-5h-3v3c0 2-2 3-4 3h-3zm5 5.5a.75.75 0 110 1.5.75.75 0 010-1.5z"/></svg>) },
  { name: 'AI/LLMs', svg: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 11-5 0V13a3 3 0 00-3-3H3a3 3 0 01-3-3V6a3 3 0 013-3h1a3 3 0 003-3V.5M14.5 2A2.5 2.5 0 0012 4.5v15a2.5 2.5 0 105 0V13a3 3 0 013-3h1a3 3 0 003-3V6a3 3 0 00-3-3h-1a3 3 0 00-3-3V.5"/></svg>) },
  { name: 'Firebase', svg: (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 11l-7-9-1 4 5 6h-5l-2-3-4 7v3h14v-8z"/></svg>) },
  { name: 'Three.js', svg: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/><path d="M2 7l10 5 10-5M12 12v10"/></svg>) },
  { name: 'Tailwind', svg: (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 4c-3 0-5 1.5-6 4.5 1.5-1.5 3-2 4.5-1.5 1 0 1.5.5 2 1s1 1 2 1c3 0 5-1.5 6-4.5-1.5 1.5-3 2-4.5 1.5-1 0-1.5-.5-2-1s-1-1-2-1zm-6 6c-3 0-5 1.5-6 4.5 1.5-1.5 3-2 4.5-1.5 1 0 1.5.5 2 1s1 1 2 1c3 0 5-1.5 6-4.5-1.5 1.5-3 2-4.5 1.5-1 0-1.5-.5-2-1s-1-1-2-1z"/></svg>) },
  { name: 'Git', svg: (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2 0 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.3 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0012 0z"/></svg>) },
]

export default function TechStackIcons() {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      {stack.map(s => (
        <div
          key={s.name}
          title={s.name}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-[#00d4ff] border border-app bg-app hover:scale-110 hover:border-[#00d4ff]/40 hover:text-[#7a5cff] transition-all duration-300"
          style={{ backdropFilter: 'blur(10px)' }}
        >
          <div className="w-5 h-5">{s.svg}</div>
        </div>
      ))}
    </div>
  )
}

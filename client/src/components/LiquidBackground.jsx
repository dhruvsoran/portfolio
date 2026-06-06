import { useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const DARK = [
  { id: 'a', cx: 10, cy: 15, r: 14, fill: '#06b6d4', op: 0.22, d: 28, dl: 0 },
  { id: 'b', cx: 85, cy: 22, r: 16, fill: '#0ea5e9', op: 0.20, d: 34, dl: -8 },
  { id: 'c', cx: 50, cy: 55, r: 12, fill: '#10b981', op: 0.18, d: 38, dl: -16 },
  { id: 'd', cx: 20, cy: 80, r: 14, fill: '#14b8a6', op: 0.20, d: 30, dl: -22 },
  { id: 'e', cx: 90, cy: 75, r: 13, fill: '#00d4ff', op: 0.22, d: 32, dl: -6 },
  { id: 'f', cx: 65, cy: 8,  r: 10, fill: '#22d3ee', op: 0.18, d: 36, dl: -20 },
  { id: 'g', cx: 40, cy: 35, r: 9,  fill: '#34d399', op: 0.16, d: 40, dl: -12 },
]

const LIGHT = [
  { id: 'a', cx: 10, cy: 15, r: 14, fill: '#0ea5e9', op: 0.16, d: 28, dl: 0 },
  { id: 'b', cx: 85, cy: 22, r: 16, fill: '#06b6d4', op: 0.14, d: 34, dl: -8 },
  { id: 'c', cx: 50, cy: 55, r: 12, fill: '#10b981', op: 0.12, d: 38, dl: -16 },
  { id: 'd', cx: 20, cy: 80, r: 14, fill: '#14b8a6', op: 0.14, d: 30, dl: -22 },
  { id: 'e', cx: 90, cy: 75, r: 13, fill: '#38bdf8', op: 0.16, d: 32, dl: -6 },
  { id: 'f', cx: 65, cy: 8,  r: 10, fill: '#22d3ee', op: 0.12, d: 36, dl: -20 },
  { id: 'g', cx: 40, cy: 35, r: 9,  fill: '#34d399', op: 0.10, d: 40, dl: -12 },
]

export default function LiquidBackground() {
  const { theme } = useTheme()
  const [reduce, setReduce] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const items = theme === 'dark' ? DARK : LIGHT

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduce(mq.matches)
    const onChange = (e) => setReduce(e.matches)
    mq.addEventListener('change', onChange)
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const calm = reduce || isTouch

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ mixBlendMode: theme === 'dark' ? 'screen' : 'multiply' }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          animation: calm ? 'none' : 'liquidHueShift 40s linear infinite',
        }}
      >
        <defs>
          <filter id="liquid-goo" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.9" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 22 -11"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>

        <g filter="url(#liquid-goo)">
          {items.map((b, i) => (
            <g
              key={`${theme}-${b.id}`}
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'center',
                animation: calm
                  ? 'none'
                  : `liquidMorph ${b.d}s ease-in-out infinite`,
                animationDelay: `${b.dl}s`,
                willChange: 'transform',
              }}
            >
              <circle
                cx={b.cx}
                cy={b.cy}
                r={b.r}
                fill={b.fill}
                opacity={b.op * (i < 3 ? 1 : 0.6)}
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}

export default function WaveDivider({ flip = false, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden leading-none pointer-events-none -my-px ${className}`}
      style={{ transform: flip ? 'rotate(180deg)' : 'none' }}
    >
      <svg
        className="relative block w-full h-[60px] sm:h-[90px]"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wave-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#7a5cff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ff6ec7" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <g style={{ animation: 'waveSlide 16s linear infinite' }}>
          <path
            d="M0,50 C240,90 480,10 720,50 C960,90 1200,10 1440,50 C1680,90 1920,10 2160,50 L2160,100 L0,100 Z"
            fill="url(#wave-grad)"
            opacity="0.9"
          />
          <path
            d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 C1680,100 1920,20 2160,60 L2160,100 L0,100 Z"
            fill="url(#wave-grad)"
            opacity="0.5"
            style={{ animation: 'waveSlide 22s linear infinite reverse' }}
          />
        </g>
      </svg>
    </div>
  )
}

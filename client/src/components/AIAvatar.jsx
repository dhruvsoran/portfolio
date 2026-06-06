import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AVATAR_IMAGE_PATH = '/avatar.jpeg'

function usePhotoLoader() {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    const img = new Image()
    img.onload = () => setLoaded(true)
    img.onerror = () => setFailed(true)
    img.src = AVATAR_IMAGE_PATH
  }, [])
  return { loaded, failed, hasPhoto: loaded && !failed }
}

function useTTSStatus() {
  const [enabled, setEnabled] = useState(false)
  const [checked, setChecked] = useState(false)
  useEffect(() => {
    fetch('/api/tts-status')
      .then(r => r.json())
      .then(d => setEnabled(d.enabled))
      .catch(() => setEnabled(false))
      .finally(() => setChecked(true))
  }, [])
  return { enabled, checked }
}

function useAudioAnalyser(audioRef, onLevel) {
  const audioContextRef = useRef(null)
  const sourceRef = useRef(null)
  const analyserRef = useRef(null)
  const rafRef = useRef(null)
  const dataArrayRef = useRef(null)

  const start = useCallback(() => {
    if (!audioRef.current || audioContextRef.current) return
    const AudioContext = window.AudioContext || window.webkitAudioContext
    const ctx = new AudioContext()
    const source = ctx.createMediaElementSource(audioRef.current)
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 256
    source.connect(analyser)
    analyser.connect(ctx.destination)
    audioContextRef.current = ctx
    sourceRef.current = source
    analyserRef.current = analyser
    dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount)

    const tick = () => {
      if (!analyserRef.current) return
      analyserRef.current.getByteFrequencyData(dataArrayRef.current)
      const data = dataArrayRef.current
      let sum = 0
      for (let i = 2; i < 32; i++) sum += data[i]
      const level = sum / 30 / 255
      onLevel(level)
      rafRef.current = requestAnimationFrame(tick)
    }
    tick()
  }, [audioRef, onLevel])

  const stop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close()
    }
    audioContextRef.current = null
    sourceRef.current = null
    analyserRef.current = null
    onLevel(0)
  }, [onLevel])

  useEffect(() => {
    return () => stop()
  }, [stop])

  return { start, stop }
}

function Mouth({ level }) {
  const ref = useRef()
  useEffect(() => {
    if (!ref.current) return
    const opening = Math.max(0, level - 0.05) * 4
    ref.current.style.transform = `scaleY(${0.3 + Math.min(opening, 1.6)})`
    ref.current.style.opacity = String(0.7 + Math.min(opening, 0.3))
  }, [level])
  return (
    <div
      ref={ref}
      className="absolute left-1/2 -translate-x-1/2 w-9 h-2 rounded-full bg-gradient-to-b from-[#1a0a0a] to-[#0a0000] backdrop-blur-sm"
      style={{
        top: 'calc(50% + 38px)',
        transformOrigin: 'center',
        boxShadow: '0 0 8px rgba(0,0,0,0.4)',
        transition: 'transform 0.04s linear, opacity 0.05s linear',
      }}
    />
  )
}

function Waveform({ speaking, level }) {
  const bars = 5
  return (
    <div className="flex items-end gap-1 h-8">
      {[...Array(bars)].map((_, i) => {
        const phase = (Date.now() / 100 + i * 0.4) % 1
        const h = speaking
          ? 20 + (level * 80) * (0.4 + Math.abs(Math.sin(phase * Math.PI * 2)) * 0.6)
          : 20
        return (
          <motion.div
            key={i}
            className="w-1 rounded-full bg-gradient-to-t from-[#00d4ff] to-[#7a5cff]"
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.08, ease: 'linear' }}
            style={{ height: `${h}%` }}
          />
        )
      })}
    </div>
  )
}

export default function AIAvatar() {
  const { hasPhoto, loaded, failed } = usePhotoLoader()
  const { enabled: ttsEnabled, checked: ttsChecked } = useTTSStatus()
  const [speaking, setSpeaking] = useState(false)
  const [needsInteraction, setNeedsInteraction] = useState(true)
  const [hasStarted, setHasStarted] = useState(false)
  const [audioReady, setAudioReady] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)
  const [audioError, setAudioError] = useState(false)
  const audioRef = useRef(null)

  const { start: startAnalyser, stop: stopAnalyser } = useAudioAnalyser(audioRef, setAudioLevel)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.preload = 'auto'
      audioRef.current.volume = 1
    }
  }, [])

  const start = useCallback(() => {
    if (!audioRef.current || !ttsEnabled) return
    if (speaking) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setSpeaking(false)
      return
    }
    audioRef.current.currentTime = 0
    const playPromise = audioRef.current.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          startAnalyser()
          setSpeaking(true)
        })
        .catch(err => {
          console.error('Playback failed:', err)
          setAudioError(true)
        })
    }
  }, [speaking, ttsEnabled, startAnalyser])

  useEffect(() => {
    if (!ttsChecked || !ttsEnabled) return
    const handleFirst = () => {
      if (hasStarted) return
      setHasStarted(true)
      setNeedsInteraction(false)
      setTimeout(() => start(), 700)
      document.removeEventListener('pointerdown', handleFirst)
      document.removeEventListener('keydown', handleFirst)
    }
    document.addEventListener('pointerdown', handleFirst, { once: true })
    document.addEventListener('keydown', handleFirst, { once: true })
    return () => {
      document.removeEventListener('pointerdown', handleFirst)
      document.removeEventListener('keydown', handleFirst)
    }
  }, [ttsChecked, ttsEnabled, hasStarted, start])

  const onAudioEnded = () => {
    setSpeaking(false)
    stopAnalyser()
    setAudioLevel(0)
  }

  const onAudioError = () => {
    setSpeaking(false)
    setAudioError(true)
    stopAnalyser()
  }

  return (
    <div className="flex flex-col items-center w-full max-w-sm">
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative w-48 h-60 sm:w-64 sm:h-80 md:w-80 md:h-[28rem]">
          <motion.div
            className="absolute -inset-2 rounded-[44px]"
            animate={
              speaking
                ? {
                    boxShadow: [
                      '0 0 0 0 rgba(0, 212, 255, 0.45)',
                      '0 0 0 30px rgba(0, 212, 255, 0)',
                    ],
                  }
                : { boxShadow: '0 0 0 0 rgba(0, 212, 255, 0)' }
            }
            transition={{ duration: 1.6, repeat: speaking ? Infinity : 0 }}
            style={{ zIndex: 1 }}
          />

          <div
            className="absolute inset-0 rounded-[40px] overflow-hidden"
            style={{
              padding: '3px',
              background: 'linear-gradient(135deg, #00d4ff, #7a5cff, #ff6ec7, #00d4ff)',
              backgroundSize: '300% 300%',
              animation: 'gradientShift 6s ease infinite',
              boxShadow: speaking
                ? '0 0 80px rgba(0, 212, 255, 0.45), 0 0 120px rgba(122, 92, 255, 0.25)'
                : '0 0 50px rgba(0, 212, 255, 0.18)',
            }}
          >
            <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-[#0a0a23]">
              {hasPhoto ? (
                <motion.img
                  src={AVATAR_IMAGE_PATH}
                  alt="Dhruv Soran"
                  className="absolute inset-0 w-full h-full object-cover"
                  animate={speaking ? { scale: 1.04 } : { scale: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{ filter: 'contrast(1.05) saturate(1.1)' }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm font-mono">
                  {failed ? 'avatar not found' : 'loading...'}
                </div>
              )}

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at 30% 20%, rgba(255, 200, 150, 0.18), transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(0, 200, 255, 0.15), transparent 60%)',
                  mixBlendMode: 'overlay',
                }}
              />

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.35) 100%)',
                }}
              />

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 60px rgba(0,0,0,0.4)',
                }}
              />

              {speaking && <Mouth level={audioLevel} />}

              <motion.div
                className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider backdrop-blur-md"
                style={{
                  background: speaking
                    ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.3), rgba(122, 92, 255, 0.3))'
                    : 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                }}
                animate={speaking ? { opacity: 1 } : { opacity: 0.7 }}
              >
                {speaking ? '● LIVE' : 'AI ASSISTANT'}
              </motion.div>

              <AnimatePresence>
                {needsInteraction && ttsEnabled && !hasStarted && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute top-3 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap"
                  >
                    <div className="glass-strong px-3 py-1.5 rounded-full flex items-center gap-2">
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      />
                      <span className="text-[10px] text-gray-200 font-medium">
                        Tap to hear my intro
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {speaking && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-10 px-3 py-1.5 rounded-full glass"
            >
              <Waveform speaking={speaking} level={audioLevel} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="mt-8 flex flex-col items-center gap-2">
        {ttsChecked && !ttsEnabled && (
          <div className="text-center max-w-xs">
            <p className="text-xs text-amber-400/80 font-mono">
              ⚠ AI voice not configured
            </p>
            <p className="text-[10px] text-gray-500 mt-1">
              Add <code className="text-[#00d4ff]">OPENAI_API_KEY</code> to <code>server/.env</code> to enable human-like TTS voice.
            </p>
          </div>
        )}

        {ttsEnabled && (
          <motion.button
            onClick={start}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`btn-primary text-sm ${
              speaking ? '!bg-gradient-to-r !from-pink-500 !to-rose-500' : ''
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              {speaking ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </svg>
                  Stop
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  {hasStarted ? 'Replay Intro' : 'Play AI Intro'}
                </>
              )}
            </span>
          </motion.button>
        )}

        {hasPhoto && (
          <p className="text-[10px] text-gray-600 font-mono mt-1">
            // powered by OpenAI TTS
          </p>
        )}
      </div>

      {ttsEnabled && (
        <audio
          ref={audioRef}
          src="/api/intro-audio"
          onEnded={onAudioEnded}
          onError={onAudioError}
          onCanPlay={() => setAudioReady(true)}
          crossOrigin="anonymous"
        />
      )}
    </div>
  )
}

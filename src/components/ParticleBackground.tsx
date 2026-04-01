import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  baseOpacity: number
}

export function ParticleBackground({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize particles
    const count = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 15000))
    particlesRef.current = Array.from({ length: count }, () => {
      const baseOpacity = 0.15 + Math.random() * 0.25
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.15,
        size: 1.5 + Math.random() * 2.5,
        opacity: baseOpacity,
        baseOpacity,
      }
    })

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    const draw = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const isLight = theme === 'light'
      const particles = particlesRef.current
      const mouse = mouseRef.current

      ctx.clearRect(0, 0, w, h)

      // Update & draw particles
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        // Wrap around
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10

        // Mouse interaction: gentle repulsion
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          const force = (120 - dist) / 120 * 0.008
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
          p.opacity = Math.min(p.baseOpacity + 0.3, p.opacity + 0.02)
        } else {
          p.opacity += (p.baseOpacity - p.opacity) * 0.02
        }

        // Damping
        p.vx *= 0.998
        p.vy *= 0.998

        // Draw dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = isLight
          ? `rgba(100, 120, 160, ${p.opacity})`
          : `rgba(160, 180, 220, ${p.opacity})`
        ctx.fill()
      }

      // Draw connections between nearby particles
      const connectionDist = 140
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.08
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = isLight
              ? `rgba(100, 120, 160, ${alpha})`
              : `rgba(160, 180, 220, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}

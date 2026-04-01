// src/components/SectionConnector.tsx
// Draws decorative gradient lines between core nodes of all TopologyGraph canvases.
// Each segment fades out at midpoint then fades back in approaching the next node.
import { useEffect, useRef, useCallback } from 'react'

interface Props {
  theme: 'light' | 'dark'
}

export function SectionConnector({ theme }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const gRef = useRef<SVGGElement>(null)
  const defsRef = useRef<SVGDefsElement>(null)
  const rafRef = useRef(0)

  const isLight = theme === 'light'

  const update = useCallback(() => {
    const svg = svgRef.current
    const g = gRef.current
    const defs = defsRef.current
    if (!svg || !g || !defs) return

    const canvases =
      document.querySelectorAll<HTMLCanvasElement>('canvas[data-topo]')
    if (canvases.length < 2) {
      g.innerHTML = ''
      defs.innerHTML = ''
      return
    }

    const pts: { x: number; y: number }[] = []
    canvases.forEach((c) => {
      const rect = c.getBoundingClientRect()
      pts.push({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      })
    })

    // Sort by vertical position (top to bottom)
    pts.sort((a, b) => a.y - b.y)

    const solidHex = isLight ? '#50648C' : '#A0B4DC'
    const solidOpacity = isLight ? 0.35 : 0.28

    let defsHtml = ''
    let pathsHtml = ''

    const GAP = 40 // px offset from each node center

    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i]
      const b = pts[i + 1]
      const dx = b.x - a.x
      const dy = b.y - a.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < GAP * 2.5) continue // skip if too close

      // Shrink endpoints inward by GAP
      const nx = dx / dist
      const ny = dy / dist
      const ax = a.x + nx * GAP
      const ay = a.y + ny * GAP
      const bx = b.x - nx * GAP
      const by = b.y - ny * GAP

      const gradId = `conn-grad-${i}`
      defsHtml += `<linearGradient id="${gradId}" x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="${solidHex}" stop-opacity="${solidOpacity}" />
        <stop offset="45%" stop-color="${solidHex}" stop-opacity="0" />
        <stop offset="55%" stop-color="${solidHex}" stop-opacity="0" />
        <stop offset="100%" stop-color="${solidHex}" stop-opacity="${solidOpacity}" />
      </linearGradient>`

      pathsHtml += `<line x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" stroke="url(#${gradId})" stroke-width="1.5" />`
    }

    defs.innerHTML = defsHtml
    g.innerHTML = pathsHtml
  }, [isLight])

  useEffect(() => {
    const tick = () => {
      update()
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [update])

  return (
    <svg
      ref={svgRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    >
      <defs ref={defsRef} />
      <g ref={gRef} />
    </svg>
  )
}

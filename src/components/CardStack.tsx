// src/components/CardStack.tsx
import { useState } from 'react'
import { CodeEditor } from './CodeEditor'
import { CODE_SNIPPETS } from '../data/codeContent'
import './CardStack.css'

interface MemoryCard {
  tag: string
  name: string
  desc: string
  snippetKey: keyof typeof CODE_SNIPPETS
  color: string
}

interface Props {
  cards: MemoryCard[]
}

// CardStack 渲染三层记忆卡片堆叠 + Monaco 风格编辑器
export function CardStack({ cards }: Props) {
  const [order, setOrder] = useState([0, 1, 2])
  const [frontKey, setFrontKey] = useState(0)

  const prev = () => {
    setOrder(prev => {
      const next = [...prev]
      const last = next.pop()!
      return [last, ...next]
    })
    setFrontKey(k => k + 1)
  }

  const next = () => {
    setOrder(prev => {
      const [first, ...rest] = prev
      return [...rest, first]
    })
    setFrontKey(k => k + 1)
  }

  const frontCard = cards[order[0]]
  const snippet = CODE_SNIPPETS[frontCard.snippetKey]

  return (
    <div className="memory-layout">
      {/* Left: card deck + nav arrows */}
      <div className="deck-area">
        <div className="deck-nav">
          <button className="deck-arrow" onClick={prev} aria-label="Previous card">‹</button>
          <div className="deck-wrap">
            {order.map((cardIdx, pos) => {
              const card = cards[cardIdx]
              return (
                <div
                  key={card.tag}
                  className={`deck-card deck-card--${pos}`}
                  style={{ '--card-color': card.color } as React.CSSProperties}
                >
                  <div className="deck-card-glow" />
                  {/* key changes on each nav to retrigger the float-in animation */}
                  <div
                    className="deck-card-inner"
                    key={pos === 0 ? `front-${frontKey}` : card.tag}
                  >
                    <span className="deck-tag">{card.tag}</span>
                    <span className="deck-name">{card.name}</span>
                    <span className="deck-desc">{card.desc}</span>
                  </div>
                </div>
              )
            })}
          </div>
          <button className="deck-arrow" onClick={next} aria-label="Next card">›</button>
        </div>
      </div>

      {/* Right: Monaco-style editor */}
      <div className="editor-wrap">
        <CodeEditor
          code={snippet.code}
          filename={snippet.filename}
          accentColor={frontCard.color}
        />
      </div>
    </div>
  )
}

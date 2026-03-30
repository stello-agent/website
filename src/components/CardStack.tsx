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

  const bringToFront = (pos: number) => {
    if (pos === 0) return
    setOrder(prev => {
      const next = [...prev]
      const [picked] = next.splice(pos, 1)
      return [picked, ...next]
    })
  }

  const frontCard = cards[order[0]]
  const snippet = CODE_SNIPPETS[frontCard.snippetKey]

  return (
    <div className="memory-layout">
      {/* Left: card deck */}
      <div className="deck-area">
        <div className="deck-wrap">
          {order.map((cardIdx, pos) => {
            const card = cards[cardIdx]
            return (
              <div
                key={card.tag}
                className={`deck-card deck-card--${pos}`}
                onClick={() => bringToFront(pos)}
                style={{ '--card-color': card.color } as React.CSSProperties}
              >
                <div className="deck-card-glow" />
                <div className="deck-card-inner">
                  <span className="deck-tag">{card.tag}</span>
                  <span className="deck-name">{card.name}</span>
                  <span className="deck-desc">{card.desc}</span>
                </div>
              </div>
            )
          })}
        </div>
        <div className="deck-pips">
          {cards.map((card, i) => (
            <span
              key={card.tag}
              className={`deck-pip${order[0] === i ? ' deck-pip--active' : ''}`}
              style={{ '--card-color': card.color } as React.CSSProperties}
            />
          ))}
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

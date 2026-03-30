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

// CardStack 渲染可交互的内存层卡片堆叠
export function CardStack({ cards }: Props) {
  const [active, setActive] = useState(0)

  return (
    <div className="card-stack">
      <div className="card-list">
        {cards.map((card, i) => (
          <button
            key={card.tag}
            className={`card-item ${active === i ? 'card-item--active' : ''}`}
            onClick={() => setActive(i)}
            style={{ '--card-color': card.color } as React.CSSProperties}
          >
            <span className="card-tag">{card.tag}</span>
            <span className="card-name">{card.name}</span>
            <span className="card-desc">{card.desc}</span>
          </button>
        ))}
      </div>
      <div className="card-preview">
        <CodeEditor code={CODE_SNIPPETS[cards[active].snippetKey]} />
      </div>
    </div>
  )
}

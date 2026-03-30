import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { DagCanvas } from './DagCanvas'
import type { DagNode, DagEdge } from '../data/dagData'

const nodes: DagNode[] = [
  { id: 'a', label: 'A', x: 100, y: 100, r: 30, color: '#4488ff' },
  { id: 'b', label: 'B', x: 300, y: 200, r: 28, color: '#cc88ff' },
]
const edges: DagEdge[] = [{ from: 'a', to: 'b' }]

describe('DagCanvas', () => {
  it('renders nodes and edges', () => {
    const { container } = render(<DagCanvas nodes={nodes} edges={edges} />)
    const circles = container.querySelectorAll('circle')
    expect(circles).toHaveLength(2)
    const lines = container.querySelectorAll('line')
    expect(lines).toHaveLength(1)
  })

  it('renders node labels', () => {
    const { getByText } = render(<DagCanvas nodes={nodes} edges={edges} />)
    expect(getByText('A')).toBeTruthy()
    expect(getByText('B')).toBeTruthy()
  })

  it('renders with empty nodes and edges', () => {
    const { container } = render(<DagCanvas nodes={[]} edges={[]} />)
    const svg = container.querySelector('svg')
    expect(svg).toBeTruthy()
  })
})

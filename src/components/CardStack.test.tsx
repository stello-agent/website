import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CardStack } from './CardStack'

const cards = [
  { tag: 'L1', name: 'Global Store', desc: 'Key-value pairs', snippetKey: 'l1' as const, color: '#4488ff' },
  { tag: 'L2', name: 'Skill Description', desc: 'External view', snippetKey: 'l2' as const, color: '#cc88ff' },
  { tag: 'L3', name: 'Raw History', desc: 'Full conversation', snippetKey: 'l3' as const, color: '#22ccbb' },
]

describe('CardStack', () => {
  it('renders all cards', () => {
    const { getByText } = render(<CardStack cards={cards} />)
    expect(getByText('L1')).toBeTruthy()
    expect(getByText('L2')).toBeTruthy()
    expect(getByText('L3')).toBeTruthy()
  })

  it('shows first card code by default', () => {
    const { container } = render(<CardStack cards={cards} />)
    const editor = container.querySelector('.editor-wrap')
    expect(editor?.textContent).toContain('L1')
  })

  it('switches code when clicking a back card', () => {
    const { getByText, container } = render(<CardStack cards={cards} />)
    fireEvent.click(getByText('Skill Description'))
    const editor = container.querySelector('.editor-wrap')
    expect(editor?.textContent).toContain('L2')
  })
})

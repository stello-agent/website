import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CardStack } from './CardStack'

const cards = [
  {
    tag: 'L1',
    name: 'Global Store',
    desc: 'Key-value pairs',
    snippetKey: 'l1' as const,
    color: '#4488ff',
  },
  {
    tag: 'L2',
    name: 'Skill Description',
    desc: 'External view',
    snippetKey: 'l2' as const,
    color: '#cc88ff',
  },
  {
    tag: 'L3',
    name: 'Raw History',
    desc: 'Full conversation',
    snippetKey: 'l3' as const,
    color: '#22ccbb',
  },
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
    expect(editor?.textContent).toContain('global-context.md')
  })

  it('switches code when clicking next arrow', () => {
    const { getByText, container } = render(<CardStack cards={cards} />)
    fireEvent.click(getByText('›'))
    const editor = container.querySelector('.editor-wrap')
    expect(editor?.textContent).toContain('summary.md')
  })
})

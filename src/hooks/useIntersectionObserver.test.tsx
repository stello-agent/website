import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useIntersectionObserver } from './useIntersectionObserver'

// Test component that exposes isVisible via data attribute
function TestComponent() {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>()
  return (
    <div ref={ref} data-testid="target" data-visible={String(isVisible)} />
  )
}

describe('useIntersectionObserver', () => {
  let observerCallback: IntersectionObserverCallback
  let observeMock: ReturnType<typeof vi.fn>
  let disconnectMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    observeMock = vi.fn()
    disconnectMock = vi.fn()
    // vi.fn() uses arrow functions internally — not `new`-able.
    // Use a real class so `new IntersectionObserver(cb)` works.
    class MockIO {
      constructor(cb: IntersectionObserverCallback) {
        observerCallback = cb
      }
      observe = observeMock
      disconnect = disconnectMock
    }
    vi.stubGlobal('IntersectionObserver', MockIO)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('starts as not visible', () => {
    render(<TestComponent />)
    expect(screen.getByTestId('target').dataset.visible).toBe('false')
  })

  it('becomes visible when element intersects', () => {
    render(<TestComponent />)
    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      )
    })
    expect(screen.getByTestId('target').dataset.visible).toBe('true')
  })

  it('stays visible once seen (does not revert)', () => {
    render(<TestComponent />)
    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      )
    })
    act(() => {
      observerCallback(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      )
    })
    expect(screen.getByTestId('target').dataset.visible).toBe('true')
  })

  it('disconnects observer after becoming visible', () => {
    render(<TestComponent />)
    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      )
    })
    expect(disconnectMock).toHaveBeenCalled()
  })
})

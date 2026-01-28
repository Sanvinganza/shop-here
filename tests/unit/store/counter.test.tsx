import { act, renderHook } from '@testing-library/react'
import { useCounter } from '@/store/useCounter'

describe('Counter Store', () => {
  it('should have initial count of 0', () => {
    const { result } = renderHook(() => useCounter())
    expect(result.current.count).toBe(0)
  })

  it('should increment count', () => {
    const { result } = renderHook(() => useCounter())
    
    act(() => {
      result.current.increment()
    })
    
    expect(result.current.count).toBe(1)
  })

  it('should reset count', () => {
    const { result } = renderHook(() => useCounter())
    
    act(() => {
      result.current.increment()
      result.current.increment()
      result.current.reset()
    })
    
    expect(result.current.count).toBe(0)
  })
})
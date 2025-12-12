'use client'

import { useCounter } from '@/store/useCounter'

export function Button() {
  const { count, increment } = useCounter()

  return (
    <button
      onClick={increment}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      data-testid="test-button"
    >
      Count: {count}
    </button>
  )
}
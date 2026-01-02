'use client'

import { ReactNode, useEffect } from 'react'

if (typeof window === 'undefined') {
  const { server } = require('@/mocks/server')
  server.listen()
} else {
  const { worker } = require('@/mocks/browser')
  worker.start()
}

export function MockProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const { worker } = require('@/mocks/browser')
      worker.start()
    }
  }, [])
  
  return <>{children}</>
}
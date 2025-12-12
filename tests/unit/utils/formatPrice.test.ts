import { formatPrice } from '@/lib/formatPrice'

describe('formatPrice', () => {
  it('formats price correctly', () => {
    expect(formatPrice(1000)).toBe('1 000 ₽')
    expect(formatPrice(99.99)).toBe('99,99 ₽')
    expect(formatPrice(0)).toBe('0 ₽')
  })
})
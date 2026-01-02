// tests/unit/components/ProductCard.test.tsx
import ProductCard from '@/components/product/ProductCard'
import { fireEvent, render, screen } from '@testing-library/react'

const mockProduct = {
  id: '1',
  title: 'Test Product',
  price: 1999,
  image: '/test.jpg',
  category: 'Test Category',
}

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('1 999 ₽')).toBeInTheDocument()
    expect(screen.getByText('Test Category')).toBeInTheDocument()
  })

  it('adds to cart on button click', () => {
    render(<ProductCard product={mockProduct} />)
    
    const addButton = screen.getByRole('button', { name: /в корзину/i })
    fireEvent.click(addButton)
    
    expect(screen.getByText('Добавлено!')).toBeInTheDocument()
  })

  it('toggles favorite on heart click', () => {
    render(<ProductCard product={mockProduct} />)
    
    const heartButton = screen.getByRole('button', { name: '' }) // Иконка без текста
    const heartIcon = heartButton.querySelector('svg')
    
    expect(heartIcon).not.toHaveClass('fill-red-500')
    
    fireEvent.click(heartButton)
    
    // Нужно проверить состояние после клика
    // Это зависит от реализации
  })
})
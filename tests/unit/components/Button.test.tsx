import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/Button';

describe('TestButton', () => {
  it('renders with initial count', () => {
    render(<Button />)
    expect(screen.getByTestId('test-button')).toHaveTextContent('Count: 0')
  })

  it('increments count on click', () => {
    render(<Button />)
    const button = screen.getByTestId('test-button')
    
    fireEvent.click(button)
    expect(button).toHaveTextContent('Count: 1')
    
    fireEvent.click(button)
    expect(button).toHaveTextContent('Count: 2')
  })
})
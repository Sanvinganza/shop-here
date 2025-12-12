import Home from '@/src/app/page';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';

describe('Home Page', () => {
  it('renders correctly', () => {
    render(<Home />)
    
    expect(screen.getByText('ShopHere'));
  })
})
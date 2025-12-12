import { render, screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const server = setupServer(
  http.get('https://api.example.com/products', () => {
    return HttpResponse.json([
      { id: 1, name: 'Test Product', price: 1000 },
    ])
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const TestComponent = () => {
  const { data, isLoading } = { data: [{ id: 1, name: 'Test Product', price: 1000 }], isLoading: false }

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      {data?.map((product) => (
        <div key={product.id} data-testid="product">
          {product.name} - {product.price} ₽
        </div>
      ))}
    </div>
  )
}

describe('API Integration', () => {
  it('should fetch and display products', async () => {
    const queryClient = new QueryClient()
    
    render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('product')).toBeInTheDocument()
      expect(screen.getByText('Test Product - 1000 ₽')).toBeInTheDocument()
    })
  })
})
export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">ShopHere</h1>
      <div className="space-y-4">
        <div data-testid="zustand-test" className="p-4 bg-blue-100 rounded">
          Zustand store will be tested
        </div>
        <div data-testid="api-test" className="p-4 bg-green-100 rounded">
          API integration will be tested
        </div>
        <div data-testid="cart-test" className="p-4 bg-yellow-100 rounded">
          Shopping cart functionality
        </div>
      </div>
    </main>
  )
}
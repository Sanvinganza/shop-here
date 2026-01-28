const API_URL = typeof window !== 'undefined' 
  ? window.location.origin 
  : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export async function fetchProducts() {
  const response = await fetch(`${API_URL}/products`)
  return response.json()
}

export async function fetchProduct(id: number) {
  const response = await fetch(`${API_URL}/products/${id}`)
  return response.json()
}
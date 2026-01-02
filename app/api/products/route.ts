import { NextResponse } from 'next/server'

const products = [
  {
    id: 1,
    title: "Футболка Basic",
    price: 1999,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    category: "Футболки"
  },
  // ... остальные товары
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const limit = searchParams.get('limit')
  
  let filteredProducts = products
  
  if (category) {
    filteredProducts = products.filter(p => p.category === category)
  }
  
  if (limit) {
    filteredProducts = filteredProducts.slice(0, parseInt(limit))
  }
  
  return NextResponse.json({
    products: filteredProducts,
    total: filteredProducts.length
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  
  const newProduct = {
    id: products.length + 1,
    ...body
  }
  
  products.push(newProduct)
  
  return NextResponse.json(newProduct, { status: 201 })
}
import { NextResponse } from 'next/server';

const products = [
  {
    id: 1,
    title: "Футболка Basic",
    price: 1999,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    category: "Футболки",
    description: "Базовая хлопковая футболка",
    rating: 4.5,
    inStock: true,
    colors: ["white", "black", "gray"],
    sizes: ["S", "M", "L", "XL"]
  },
  // ... добавьте остальные товары из вашего файла
  {
    id: 12,
    title: "Костюм спортивный",
    price: 12999,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400",
    category: "Спортивная одежда",
    description: "Спорт костюм для тренировок",
    rating: 4.6,
    inStock: true,
    colors: ["black", "gray", "navy"],
    sizes: ["S", "M", "L", "XL"]
  }
];

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
    total: filteredProducts.length,
    shopType: 'clothing'
  })
}

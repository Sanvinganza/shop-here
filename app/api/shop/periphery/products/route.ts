import { NextResponse } from 'next/server';

const products = [
  {
    id: 101,
    name: "Механическая клавиатура Logitech G Pro X",
    price: 15990,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400",
    category: "Клавиатуры",
    description: "Профессиональная механическая клавиатура",
    brand: "Logitech",
    rating: 4.8,
    inStock: true,
    features: ["RGB подсветка", "Переключатели GX Blue", "USB-C"],
    connectivity: ["USB-C", "Wired"],
    color: "Black"
  },
  {
    id: 102,
    name: "Игровая мышь Razer DeathAdder V3",
    price: 8990,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400",
    category: "Мыши",
    description: "Эргономичная игровая мышь",
    brand: "Razer",
    rating: 4.7,
    inStock: true,
    features: ["Оптический сенсор", "8 программируемых кнопок"],
    connectivity: ["USB", "Wireless"],
    color: "White"
  },
  {
    id: 103,
    name: "Наушники SteelSeries Arctis 7",
    price: 12990,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    category: "Наушники",
    description: "Беспроводные игровые наушники",
    brand: "SteelSeries",
    rating: 4.9,
    inStock: true,
    features: ["7.1 Surround", "30ч батарея", "Noise-Cancelling"],
    connectivity: ["Wireless", "Bluetooth", "3.5mm"],
    color: "Black"
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
    shopType: 'periphery'
  })
}

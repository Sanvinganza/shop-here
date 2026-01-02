import { NextResponse } from 'next/server'

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
  {
    id: 2,
    title: "Джинсы Slim Fit",
    price: 4999,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
    category: "Джинсы",
    description: "Современные джинсы slim fit",
    rating: 4.7,
    inStock: true,
    colors: ["blue", "black"],
    sizes: ["28", "30", "32", "34", "36"]
  },
  {
    id: 3,
    title: "Кроссовки Urban",
    price: 8999,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w-400",
    category: "Обувь",
    description: "Уличные кроссовки для города",
    rating: 4.8,
    inStock: true,
    colors: ["white", "black", "red"],
    sizes: ["38", "39", "40", "41", "42", "43", "44"]
  },
  {
    id: 4,
    title: "Куртка Windbreaker",
    price: 7999,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
    category: "Верхняя одежда",
    description: "Ветровка с защитой от воды",
    rating: 4.6,
    inStock: true,
    colors: ["navy", "black", "green"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 5,
    title: "Рубашка Oxford",
    price: 3499,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
    category: "Рубашки",
    description: "Классическая рубашка оксфорд",
    rating: 4.4,
    inStock: false,
    colors: ["white", "blue", "pink"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 6,
    title: "Свитшот Hoodie",
    price: 4299,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
    category: "Худи и свитшоты",
    description: "Тёплый свитшот с капюшоном",
    rating: 4.9,
    inStock: true,
    colors: ["black", "gray", "burgundy"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 7,
    title: "Брюки Chino",
    price: 3899,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400",
    category: "Брюки",
    description: "Повседневные брюки чинос",
    rating: 4.3,
    inStock: true,
    colors: ["khaki", "navy", "olive"],
    sizes: ["30", "32", "34", "36", "38"]
  },
  {
    id: 8,
    title: "Платье Midi",
    price: 5499,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
    category: "Платья",
    description: "Элегантное миди платье",
    rating: 4.7,
    inStock: true,
    colors: ["black", "red", "blue"],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 9,
    title: "Кепка Baseball",
    price: 1499,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400",
    category: "Аксессуары",
    description: "Бейсболка с регулируемым ремешком",
    rating: 4.2,
    inStock: true,
    colors: ["black", "navy", "red", "white"],
    sizes: ["One Size"]
  },
  {
    id: 10,
    title: "Рюкзак Urban",
    price: 6299,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    category: "Сумки и рюкзаки",
    description: "Городской рюкзак с отделениями для ноутбука",
    rating: 4.8,
    inStock: true,
    colors: ["black", "gray", "green"],
    sizes: ["One Size"]
  },
  {
    id: 11,
    title: "Носки Sport",
    price: 799,
    image: "https://images.unsplash.com/photo-1586359830167-44c9f5d3c3b4?w=400",
    category: "Нижнее белье и носки",
    description: "Спортивные носки из хлопка",
    rating: 4.1,
    inStock: true,
    colors: ["white", "black", "gray", "multicolor"],
    sizes: ["36-38", "39-41", "42-44"]
  },
  {
    id: 12,
    title: "Костюм спортивный",
    price: 12999,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400",
    category: "Спортивная одежда",
    description: "Спортивный костюм для тренировок",
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
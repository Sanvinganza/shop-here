// components/ProductCatalog.tsx - ПРАВИЛЬНЫЙ вариант
'use client';

import { useEffect, useState } from 'react';
import { useShop } from '@/hooks/useShop';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

export function ProductCatalog() {
  const { shop, shopType } = useShop();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Функция загрузки товаров
    const loadProducts = async () => {
      setLoading(true);
      
      try {
        // Симулируем загрузку с API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Примерные данные в зависимости от магазина
        const mockProducts = shopType === 'periphery' 
          ? [
              { id: 1, name: 'Игровая мышь', price: 2999, category: 'Мыши' },
              { id: 2, name: 'Механическая клавиатура', price: 5999, category: 'Клавиатуры' },
              { id: 3, name: 'Игровые наушники', price: 7999, category: 'Наушники' },
            ]
          : [
              { id: 1, name: 'Футболка хлопковая', price: 1499, category: 'Футболки' },
              { id: 2, name: 'Джинсы классические', price: 3999, category: 'Джинсы' },
              { id: 3, name: 'Кроссовки спортивные', price: 5999, category: 'Обувь' },
            ];
        
        setProducts(mockProducts);
      } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [shopType]); // Зависимость от shopType - перезагружаем при смене магазина

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-gray-600">Загрузка товаров...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Каталог товаров</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow p-4 border">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-gray-600">{product.category}</p>
            <p className="text-primary font-bold mt-2">{product.price} ₽</p>
          </div>
        ))}
      </div>
    </div>
  );
}
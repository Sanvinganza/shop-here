'use client';

import { useEffect, useState } from 'react';
import { useShop } from '@/hooks/useShop';
import { ProductCatalog } from '@/components/ProductCatalog';

export default function HomePage() {
  const { shop, isLoading } = useShop();
  const [key, setKey] = useState(0);

  // При смене магазина обновляем ключ для принудительного ререндера
  useEffect(() => {
    const handleShopChange = () => {
      setKey(prev => prev + 1);
    };

    window.addEventListener('shopChanged', handleShopChange);
    return () => window.removeEventListener('shopChanged', handleShopChange);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загрузка магазина...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Добро пожаловать в <span className="text-primary">{shop.name}</span>!
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          {shop.description}
        </p>
        <div className="mt-6 inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
          <span className="text-gray-700">Текущий магазин:</span>
          <span className="font-semibold text-primary">{shop.name}</span>
          <span className="text-2xl">{shop.icon}</span>
        </div>
      </div>

      {/* Категории магазина */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Популярные категории</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {shop.categories.slice(0, 6).map((category, index) => (
            <div
              key={category}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow cursor-pointer"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="text-3xl mb-3">{shop.icon}</div>
              <h3 className="font-medium text-gray-900">{category}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Каталог товаров */}
      <div key={key}>
        <ProductCatalog />
      </div>

      {/* Информация о системе */}
      <div className="mt-16 p-6 bg-white rounded-xl border border-gray-200">
        <h3 className="text-xl font-bold mb-4">Как работает система магазинов</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold mb-2">Переключение</h4>
            <p className="text-sm text-gray-600">
              Ваш выбор магазина сохраняется в localStorage браузера
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold mb-2">Автоматические стили</h4>
            <p className="text-sm text-gray-600">
              Цвета интерфейса меняются в зависимости от магазина
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-semibold mb-2">Разные товары</h4>
            <p className="text-sm text-gray-600">
              Каждый магазин имеет свой уникальный каталог товаров
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
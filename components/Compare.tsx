'use client';

import { Product } from '@/app/[locale]/types';
import { GitCompare, ShoppingCart, X, Star } from 'lucide-react';

interface CompareProps {
  compare: Product[];
  onAddToCart: (product: Product) => void;
  onRemoveFromCompare: (product_id: string) => void;
}

export function Compare({ compare, onAddToCart, onRemoveFromCompare }: CompareProps) {
  if (compare.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <GitCompare className="w-16 h-16 mx-auto mb-4 text-neutral-300" />
          <h2 className="mb-4">Список сравнения пуст</h2>
          <p className="text-neutral-600">Добавьте товары для сравнения характеристик</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2">Сравнение товаров</h1>
        <p className="text-neutral-600">Товаров в сравнении: {compare.length} (максимум 4)</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200">
              <th className="text-left p-4 sticky left-0 bg-white z-10">Характеристика</th>
              {compare.map(product => (
                <th key={product.id} className="p-4 min-w-[250px]">
                  <div className="relative">
                    <button
                      onClick={() => onRemoveFromCompare(product.id)}
                      className="absolute -top-2 -right-2 p-1 bg-neutral-100 rounded-full hover:bg-red-50 transition-colors"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-square object-cover rounded-lg mb-3"
                    />
                    <div className="text-left">
                      <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">
                        {product.category}
                      </div>
                      <h3 className="mb-2">{product.name}</h3>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Цена */}
            <tr className="border-b border-neutral-200">
              <td className="p-4 sticky left-0 bg-white">Цена</td>
              {compare.map(product => (
                <td key={product.id} className="p-4">
                  <span className="text-lg">{product.price.toLocaleString('ru-RU')} ₽</span>
                </td>
              ))}
            </tr>

            {/* Рейтинг */}
            <tr className="border-b border-neutral-200 bg-neutral-50">
              <td className="p-4 sticky left-0 bg-neutral-50">Рейтинг</td>
              {compare.map(product => (
                <td key={product.id} className="p-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                    <span>{product.rating} / 5</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Популярность */}
            <tr className="border-b border-neutral-200">
              <td className="p-4 sticky left-0 bg-white">Популярность</td>
              {compare.map(product => (
                <td key={product.id} className="p-4">
                  {product.popularity}%
                </td>
              ))}
            </tr>

            {/* Наличие */}
            <tr className="border-b border-neutral-200 bg-neutral-50">
              <td className="p-4 sticky left-0 bg-neutral-50">Наличие</td>
              {compare.map(product => (
                <td key={product.id} className="p-4">
                  {product.inStock ? (
                    <span className="text-green-600">В наличии ({product.stockCount} шт)</span>
                  ) : (
                    <span className="text-red-600">Под заказ</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Описание */}
            <tr className="border-b border-neutral-200">
              <td className="p-4 sticky left-0 bg-white">Описание</td>
              {compare.map(product => (
                <td key={product.id} className="p-4 text-sm text-neutral-600">
                  {product.description}
                </td>
              ))}
            </tr>

            {/* Действия */}
            <tr>
              <td className="p-4 sticky left-0 bg-white">Действия</td>
              {compare.map(product => (
                <td key={product.id} className="p-4">
                  <button
                    onClick={() => onAddToCart(product)}
                    disabled={!product.inStock}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>В корзину</span>
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
        <p className="text-sm text-neutral-600">
          💡 Совет: Добавьте товары одной категории для более точного сравнения характеристик
        </p>
      </div>
    </div>
  );
}

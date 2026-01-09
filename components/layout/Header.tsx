'use client';

import { ShoppingCart, Search, Menu } from 'lucide-react';
import { ShopSwitcher } from './ShopSwitcher';
import { useShop } from '@/hooks/useShop';
import Link from 'next/link';

export function Header() {
  const { shop } = useShop();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Логотип */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="text-2xl">{shop.icon}</span>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{shop.name}</h1>
                <p className="text-xs text-gray-500 hidden sm:block">{shop.description}</p>
              </div>
            </Link>
          </div>

          {/* Поиск (скрыт на мобильных) */}
          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск товаров..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Правая часть */}
          <div className="flex items-center gap-4">
            {/* Переключатель магазинов */}
            <div className="hidden sm:block">
              <ShopSwitcher />
            </div>

            {/* Иконки */}
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                  0
                </span>
              </button>
              <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
                <Menu className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Мобильная версия */}
        <div className="md:hidden py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <ShopSwitcher />
            </div>
            <div className="ml-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск..."
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>
          
          {/* Категории */}
          <div className="mt-3 flex overflow-x-auto gap-2 pb-2">
            {shop.categories.slice(0, 6).map(category => (
              <span
                key={category}
                className="text-sm text-gray-700 whitespace-nowrap px-3 py-1 bg-gray-100 rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

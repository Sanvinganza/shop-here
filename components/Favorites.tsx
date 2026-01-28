'use client';

import { Product } from '@/app/[locale]/types';
import { Heart, ShoppingCart, X } from 'lucide-react';

interface FavoritesProps {
  favorites: Product[];
  onAddToCart: (product: Product) => void;
  onRemoveFromFavorites: (product_id: string) => void;
}

export function Favorites({ favorites, onAddToCart, onRemoveFromFavorites }: FavoritesProps) {
  if (favorites.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Heart className="w-16 h-16 mx-auto mb-4 text-neutral-300" />
          <h2 className="mb-4">Избранное пусто</h2>
          <p className="text-neutral-600">Добавьте товары в избранное, чтобы не потерять их</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2">Избранное</h1>
        <p className="text-neutral-600">Товаров в избранном: {favorites.length}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <div className="aspect-square overflow-hidden bg-neutral-100 relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <button
                onClick={() => onRemoveFromFavorites(product.id)}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
              >
                <X className="w-4 h-4 text-red-600" />
              </button>
              {!product.inStock && (
                <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                  Под заказ
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="mb-1 text-xs text-neutral-500 uppercase tracking-wider">
                {product.category}
              </div>
              <h3 className="mb-2">{product.name}</h3>
              <p className="text-neutral-600 text-sm mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg">{product.price.toLocaleString('ru-RU')} ₽</span>
                <button
                  onClick={() => onAddToCart(product)}
                  disabled={!product.inStock}
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>В корзину</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

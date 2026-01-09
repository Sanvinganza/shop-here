'use client';

import { Product } from '@/lib/types';
import { ShoppingCart, Star, Heart, GitCompare, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isFavorite: boolean;
  isInCompare: boolean;
}

export function ProductCard({
  product,
  onAddToCart,
  onToggleFavorite,
  onToggleCompare,
  onQuickView,
  isFavorite,
  isInCompare
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group">
      <div className="aspect-square overflow-hidden bg-neutral-100 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Рейтинг */}
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full shadow-md flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-400 stroke-yellow-400" />
          <span className="text-xs">{product.rating}</span>
        </div>

        {/* Статус наличия */}
        {!product.inStock && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
            Под заказ
          </div>
        )}

        {/* Кнопки действий при наведении */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(product);
            }}
            className={`p-3 rounded-full shadow-lg transition-all ${
              isFavorite
                ? 'bg-red-500 text-white'
                : 'bg-white hover:bg-red-50'
            }`}
            title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-3 bg-white rounded-full hover:bg-neutral-100 shadow-lg transition-colors"
            title="Быстрый просмотр"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(product);
            }}
            className={`p-3 rounded-full shadow-lg transition-all ${
              isInCompare
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-blue-50'
            }`}
            title={isInCompare ? 'Убрать из сравнения' : 'Добавить к сравнению'}
          >
            <GitCompare className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-1 text-xs text-neutral-500 uppercase tracking-wider">
          {product.category}
        </div>
        <h3 className="mb-2">{product.name}</h3>
        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        {product.inStock && product.stockCount && product.stockCount <= 5 && (
          <p className="text-xs text-orange-600 mb-3">Осталось всего {product.stockCount} шт</p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-lg">{product.price.toLocaleString('ru-RU')} ₽</span>
          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">В корзину</span>
          </button>
        </div>
      </div>
    </div>
  );
}

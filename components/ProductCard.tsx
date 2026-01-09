'use client';

import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';
import { useState } from 'react';
import { useShop } from '@/hooks/useShop';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  popularity: number;
  rating: number;
  inStock: boolean;
  stockCount: number;
  colors?: string[];
  sizes?: string[];
  brand?: string;
  features?: string[];
  connectivity?: string[];
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  isFavorite: boolean;
  isInCompare: boolean;
}

export function ProductCard({
  product,
  onAddToCart,
  onToggleFavorite,
  onToggleCompare,
  onViewProduct,
  isFavorite,
  isInCompare
}: ProductCardProps) {
  const { isClothing, isPeriphery, shop } = useShop();
  const [favorite, setFavorite] = useState(isFavorite);
  const [showQuickView, setShowQuickView] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  const handleToggleFavorite = () => {
    setFavorite(!favorite);
    onToggleFavorite(product);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
      {/* Верхняя часть с изображением */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Бейджи */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {!product.inStock && (
            <span className="px-2 py-1 bg-gray-500 text-white text-xs font-semibold rounded">
              НЕТ В НАЛИЧИИ
            </span>
          )}
          {product.stockCount < 10 && product.inStock && (
            <span className="px-2 py-1 bg-amber-500 text-white text-xs font-semibold rounded">
              ЗАКАНЧИВАЕТСЯ
            </span>
          )}
        </div>

        {/* Кнопки действий на изображении */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="p-3 bg-white rounded-full hover:bg-primary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="В корзину"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowQuickView(true)}
            className="p-3 bg-white rounded-full hover:bg-primary hover:text-white transition-colors"
            title="Быстрый просмотр"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Нижняя часть с информацией */}
      <div className="p-4">
        {/* Категория и бренд */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
          {product.brand && (
            <span className="text-xs font-medium text-gray-700">{product.brand}</span>
          )}
        </div>

        {/* Название товара */}
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 h-12">
          {product.name}
        </h3>

        {/* Рейтинг */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating.toFixed(1)}
          </span>
        </div>

        {/* Особенности магазина */}
        {isPeriphery && product.features && (
          <div className="mb-3">
            <div className="text-xs text-gray-500 mb-1">Особенности:</div>
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 2).map((feature, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {isClothing && product.colors && (
          <div className="mb-3">
            <div className="text-xs text-gray-500 mb-1">Цвета:</div>
            <div className="flex gap-1">
              {product.colors.slice(0, 3).map((color, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: color === 'white' ? '#fff' : color }}
                  title={color}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Цена и кнопка корзины */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </div>
            {product.stockCount > 0 && (
              <div className="text-xs text-gray-500">
                Осталось: {product.stockCount} шт.
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleFavorite}
              className={`p-2 rounded-lg transition-colors ${
                favorite
                  ? 'bg-red-50 text-red-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Heart className="w-5 h-5" fill={favorite ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                product.inStock
                  ? 'bg-primary text-white hover:opacity-90'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {product.inStock ? 'В корзину' : 'Нет в наличии'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

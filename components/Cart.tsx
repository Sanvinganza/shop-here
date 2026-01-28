'use client';

import { CartItem } from '@/app/[locale]/types';
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';

interface CartProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
  totalPrice: number;
}

export function Cart({
  cart,
  onUpdateQuantity,
  onRemoveFromCart,
  onProceedToCheckout,
  onContinueShopping,
  totalPrice
}: CartProps) {
  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <h2 className="mb-4">Корзина пуста</h2>
          <p className="text-neutral-600 mb-6">Добавьте товары из каталога</p>
          <button
            onClick={onContinueShopping}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors shadow-sm hover:shadow-md"
          >
            Перейти к покупкам
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={onContinueShopping}
          className="flex items-center gap-2 text-neutral-600 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Продолжить покупки
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="mb-6">Корзина</h2>

        <div className="space-y-4">
          {cart.map(item => (
            <div
              key={item.id}
              className="flex gap-4 pb-4 border-b border-neutral-200 last:border-0 last:pb-0"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg bg-neutral-100"
              />
              <div className="flex-1">
                <h3 className="mb-1">{item.name}</h3>
                <p className="text-neutral-600 text-sm mb-3">{item.category}</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-neutral-100 rounded-lg p-1">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-white rounded transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-white rounded transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => onRemoveFromCart(item.id)}
                    className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="mb-1">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</p>
                <p className="text-sm text-neutral-500">{item.price.toLocaleString('ru-RU')} ₽ × {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-200">
          <span className="text-lg">Итого:</span>
          <span className="text-2xl">{totalPrice.toLocaleString('ru-RU')} ₽</span>
        </div>
        <button
          onClick={onProceedToCheckout}
          className="w-full py-3 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors shadow-sm hover:shadow-md"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
}

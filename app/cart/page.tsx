'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cart-store'
import Link from 'next/link'

const cartItems = [
  {
    id: '1',
    title: 'Футболка Basic',
    price: 1999,
    image: '/placeholder-tshirt.jpg',
    quantity: 2,
    size: 'M',
    color: 'Белый',
  },
  {
    id: '2',
    title: 'Джинсы Slim',
    price: 4999,
    image: '/placeholder-jeans.jpg',
    quantity: 1,
    size: '32',
    color: 'Синий',
  },
]

export default function CartPage() {
  const [promoCode, setPromoCode] = useState('')
  const { items: cartStoreItems, total: cartTotal } = useCartStore()

  const items = cartStoreItems.length > 0 ? cartStoreItems : cartItems
  const subtotal = cartStoreItems.length > 0 ? cartTotal : items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 5000 ? 0 : 499
  const total = subtotal + shipping

  return (
    <>
      <Header />
      <main className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Корзина</h1>
            <p className="text-gray-600">
              {items.reduce((sum, item) => sum + item.quantity, 0)} товара на сумму {formatPrice(total)}
            </p>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold mb-4">Ваша корзина пуста</h2>
              <p className="text-gray-600 mb-8">Добавьте товары, чтобы сделать заказ</p>
              <Link href="/catalog">
                <Button size="lg">Перейти к покупкам</Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow-sm">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center p-6 border-b last:border-b-0">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 ml-6">
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        {item.size && (
                          <p className="text-sm text-gray-600">Размер: {item.size}</p>
                        )}
                        {item.color && (
                          <p className="text-sm text-gray-600">Цвет: {item.color}</p>
                        )}
                        <p className="text-xl font-bold mt-2">{formatPrice(item.price)}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border rounded-md">
                          <button className="px-3 py-1">
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-1">{item.quantity}</span>
                          <button className="px-3 py-1">
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button className="text-red-500 hover:text-red-700">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                  <h3 className="text-xl font-bold mb-6">Детали заказа</h3>

                  {/* Promo Code */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Промокод</label>
                    <div className="flex gap-2">
                      <Button variant="outline">Применить</Button>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span>Товары ({items.reduce((sum, item) => sum + item.quantity, 0)})</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Доставка</span>
                      <span>{shipping === 0 ? 'Бесплатно' : formatPrice(shipping)}</span>
                    </div>
                    {shipping === 0 && subtotal < 5000 && (
                      <div className="text-sm text-green-600">
                        Бесплатная доставка при заказе от {formatPrice(5000)}
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="border-t pt-6">
                    <div className="flex justify-between text-xl font-bold mb-6">
                      <span>Итого</span>
                      <span>{formatPrice(total)}</span>
                    </div>

                    <Link href="/checkout">
                      <Button className="w-full" size="lg">
                        Перейти к оформлению
                      </Button>
                    </Link>
                  </div>

                  {/* Payment Methods */}
                  <div className="mt-6 pt-6 border-t">
                    <p className="text-sm text-gray-600 mb-2">Принимаем к оплате:</p>
                    <div className="flex gap-2">
                      {['visa', 'mastercard', 'mir'].map((method) => (
                        <div
                          key={method}
                          className="w-12 h-8 border rounded flex items-center justify-center text-xs font-semibold"
                        >
                          {method.toUpperCase()}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
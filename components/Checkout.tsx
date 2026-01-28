'use client';

import { useState } from 'react';
import { CartItem, DeliveryInfo, PaymentInfo } from '../app/[locale]/page';
import { ArrowLeft, Package, Truck, CreditCard } from 'lucide-react';

interface CheckoutProps {
  cart: CartItem[];
  totalPrice: number;
  onBack: () => void;
  onSubmit: (deliveryInfo: DeliveryInfo, paymentInfo: PaymentInfo) => void;
}

export function Checkout({ cart, totalPrice, onBack, onSubmit }: CheckoutProps) {
  const [step, setStep] = useState<'delivery' | 'payment'>('delivery');
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    deliveryMethod: 'standard'
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  const deliveryCost = deliveryInfo.deliveryMethod === 'express' ? 500 : 0;
  const finalTotal = totalPrice + deliveryCost;

  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(deliveryInfo, paymentInfo);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={step === 'delivery' ? onBack : () => setStep('delivery')}
          className="flex items-center gap-2 text-neutral-600 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Форма */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Индикатор шагов */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'delivery' ? 'bg-black text-white' : 'bg-neutral-200'
                }`}>
                  1
                </div>
                <span className={step === 'delivery' ? '' : 'text-neutral-400'}>
                  Доставка
                </span>
              </div>
              <div className="flex-1 h-px bg-neutral-200" />
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'payment' ? 'bg-black text-white' : 'bg-neutral-200'
                }`}>
                  2
                </div>
                <span className={step === 'payment' ? '' : 'text-neutral-400'}>
                  Оплата
                </span>
              </div>
            </div>

            {/* Форма доставки */}
            {step === 'delivery' && (
              <form onSubmit={handleDeliverySubmit} className="space-y-6">
                <div>
                  <h2 className="mb-4">Информация о доставке</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-2">Полное имя *</label>
                      <input
                        type="text"
                        required
                        value={deliveryInfo.fullName}
                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, fullName: e.target.value })}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Иван Иванов"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2">Email *</label>
                        <input
                          type="email"
                          required
                          value={deliveryInfo.email}
                          onChange={(e) => setDeliveryInfo({ ...deliveryInfo, email: e.target.value })}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          placeholder="email@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Телефон *</label>
                        <input
                          type="tel"
                          required
                          value={deliveryInfo.phone}
                          onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          placeholder="+7 (999) 123-45-67"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm mb-2">Адрес *</label>
                      <input
                        type="text"
                        required
                        value={deliveryInfo.address}
                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Улица, дом, квартира"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2">Город *</label>
                        <input
                          type="text"
                          required
                          value={deliveryInfo.city}
                          onChange={(e) => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          placeholder="Москва"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Индекс *</label>
                        <input
                          type="text"
                          required
                          value={deliveryInfo.postalCode}
                          onChange={(e) => setDeliveryInfo({ ...deliveryInfo, postalCode: e.target.value })}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          placeholder="123456"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4">Способ доставки</h3>
                  <div className="space-y-3">
                    <label className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      deliveryInfo.deliveryMethod === 'standard'
                        ? 'border-black bg-neutral-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}>
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="standard"
                        checked={deliveryInfo.deliveryMethod === 'standard'}
                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, deliveryMethod: e.target.value as 'standard' })}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Package className="w-5 h-5" />
                          <span>Стандартная доставка</span>
                        </div>
                        <p className="text-sm text-neutral-600">5-7 рабочих дней • Бесплатно</p>
                      </div>
                    </label>

                    <label className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      deliveryInfo.deliveryMethod === 'express'
                        ? 'border-black bg-neutral-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}>
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="express"
                        checked={deliveryInfo.deliveryMethod === 'express'}
                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, deliveryMethod: e.target.value as 'express' })}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Truck className="w-5 h-5" />
                          <span>Экспресс доставка</span>
                        </div>
                        <p className="text-sm text-neutral-600">1-2 рабочих дня • 500 ₽</p>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors shadow-sm hover:shadow-md"
                >
                  Продолжить к оплате
                </button>
              </form>
            )}

            {/* Форма оплаты */}
            {step === 'payment' && (
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="w-5 h-5" />
                    <h2>Оплата картой</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-2">Номер карты *</label>
                      <input
                        type="text"
                        required
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-2">Владелец карты *</label>
                      <input
                        type="text"
                        required
                        value={paymentInfo.cardHolder}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardHolder: e.target.value })}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="IVAN IVANOV"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2">Срок действия *</label>
                        <input
                          type="text"
                          required
                          value={paymentInfo.expiryDate}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">CVV *</label>
                        <input
                          type="text"
                          required
                          value={paymentInfo.cvv}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          placeholder="123"
                          maxLength={3}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <p className="text-sm text-neutral-600">
                    Ваши платежные данные защищены и обрабатываются безопасно
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors shadow-sm hover:shadow-md"
                >
                  Оплатить {finalTotal.toLocaleString('ru-RU')} ₽
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Сводка заказа */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h3 className="mb-4">Ваш заказ</h3>
            <div className="space-y-3 mb-4 pb-4 border-b border-neutral-200">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-neutral-600">{item.name} × {item.quantity}</span>
                  <span>{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 mb-4 pb-4 border-b border-neutral-200">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Товары:</span>
                <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Доставка:</span>
                <span>{deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost} ₽`}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Итого:</span>
              <span className="text-xl">{finalTotal.toLocaleString('ru-RU')} ₽</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

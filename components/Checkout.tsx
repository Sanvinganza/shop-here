'use client';

import { useState } from 'react';
import { CreditCard, Truck, Home, Check } from 'lucide-react';
import { CartItem, DeliveryInfo, PaymentInfo } from '@/lib/types';

interface CheckoutProps {
  cartItems: CartItem[];
  onComplete: (orderData: any) => void;
  onBack: () => void;
}

export function Checkout({ cartItems, onComplete, onBack }: CheckoutProps) {
  const [step, setStep] = useState(1);
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Россия', // Добавлено поле country
    deliveryMethod: 'standard'
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'card' // Добавлено поле paymentMethod
  });

  const [orderNotes, setOrderNotes] = useState('');

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || item.price || 0) * item.quantity,
    0
  );

  const deliveryCost = deliveryInfo.deliveryMethod === 'express' ? 500 : 0;
  const finalAmount = totalAmount + deliveryCost;

  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleCompleteOrder = () => {
    const orderData = {
      deliveryInfo,
      paymentInfo,
      cartItems,
      totalAmount: finalAmount,
      notes: orderNotes,
      createdAt: new Date().toISOString()
    };
    onComplete(orderData);
  };

  const handleDeliveryInfoChange = (field: keyof DeliveryInfo, value: string) => {
    setDeliveryInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePaymentInfoChange = (field: keyof PaymentInfo, value: string) => {
    setPaymentInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= stepNumber
                ? 'bg-black text-white'
                : 'bg-neutral-200 text-neutral-600'
            }`}>
              {step > stepNumber ? <Check className="w-5 h-5" /> : stepNumber}
            </div>
            <div className="ml-3">
              <div className="font-medium">
                {stepNumber === 1 && 'Доставка'}
                {stepNumber === 2 && 'Оплата'}
                {stepNumber === 3 && 'Подтверждение'}
              </div>
            </div>
            {stepNumber < 3 && (
              <div className="w-16 h-0.5 bg-neutral-300 mx-4" />
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <form onSubmit={handleDeliverySubmit} className="space-y-6">
              <div className="bg-white rounded-lg border border-neutral-200 p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Truck className="w-6 h-6" />
                  Информация о доставке
                </h3>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      ФИО *
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryInfo.fullName}
                      onChange={(e) => handleDeliveryInfoChange('fullName', e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={deliveryInfo.email}
                      onChange={(e) => handleDeliveryInfoChange('email', e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      required
                      value={deliveryInfo.phone}
                      onChange={(e) => handleDeliveryInfoChange('phone', e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Страна *
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryInfo.country}
                      onChange={(e) => handleDeliveryInfoChange('country', e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Адрес *
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryInfo.address}
                      onChange={(e) => handleDeliveryInfoChange('address', e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Город *
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryInfo.city}
                      onChange={(e) => handleDeliveryInfoChange('city', e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Индекс *
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryInfo.postalCode}
                      onChange={(e) => handleDeliveryInfoChange('postalCode', e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>

                <h4 className="font-medium mb-4">Способ доставки</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { value: 'standard', label: 'Стандартная', desc: '3-5 дней', price: 'Бесплатно' },
                    { value: 'express', label: 'Экспресс', desc: '1-2 дня', price: '500 ₽' },
                    { value: 'pickup', label: 'Самовывоз', desc: '2-3 дня', price: 'Бесплатно' }
                  ].map((method) => (
                    <label
                      key={method.value}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        deliveryInfo.deliveryMethod === method.value
                          ? 'border-black bg-black/5'
                          : 'border-neutral-300 hover:border-black'
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value={method.value}
                        checked={deliveryInfo.deliveryMethod === method.value}
                        onChange={(e) => handleDeliveryInfoChange('deliveryMethod', e.target.value as any)}
                        className="sr-only"
                      />
                      <div className="font-medium">{method.label}</div>
                      <div className="text-sm text-neutral-600 mt-1">{method.desc}</div>
                      <div className="font-medium mt-2">{method.price}</div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={onBack}
                  className="px-6 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50"
                >
                  Назад в корзину
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-black text-white rounded-lg hover:bg-neutral-800"
                >
                  Продолжить к оплате
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              <div className="bg-white rounded-lg border border-neutral-200 p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <CreditCard className="w-6 h-6" />
                  Способ оплаты
                </h3>

                <div className="space-y-4 mb-6">
                  {['card', 'cash', 'paypal'].map((method) => (
                    <label
                      key={method}
                      className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                        paymentInfo.paymentMethod === method
                          ? 'border-black bg-black/5'
                          : 'border-neutral-300 hover:border-black'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={paymentInfo.paymentMethod === method}
                        onChange={(e) => handlePaymentInfoChange('paymentMethod', e.target.value as any)}
                        className="sr-only"
                      />
                      <div className="w-5 h-5 border border-neutral-400 rounded-full flex items-center justify-center">
                        {paymentInfo.paymentMethod === method && (
                          <div className="w-3 h-3 bg-black rounded-full" />
                        )}
                      </div>
                      <div className="font-medium">
                        {method === 'card' && 'Банковская карта'}
                        {method === 'cash' && 'Наличными при получении'}
                        {method === 'paypal' && 'PayPal'}
                      </div>
                    </label>
                  ))}
                </div>

                {paymentInfo.paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Номер карты *
                      </label>
                      <input
                        type="text"
                        required
                        value={paymentInfo.cardNumber}
                        onChange={(e) => handlePaymentInfoChange('cardNumber', e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Держатель карты *
                        </label>
                        <input
                          type="text"
                          required
                          value={paymentInfo.cardHolder}
                          onChange={(e) => handlePaymentInfoChange('cardHolder', e.target.value)}
                          placeholder="IVAN IVANOV"
                          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Срок действия *
                          </label>
                          <input
                            type="text"
                            required
                            value={paymentInfo.expiryDate}
                            onChange={(e) => handlePaymentInfoChange('expiryDate', e.target.value)}
                            placeholder="MM/YY"
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            required
                            value={paymentInfo.cvv}
                            onChange={(e) => handlePaymentInfoChange('cvv', e.target.value)}
                            placeholder="123"
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-lg border border-neutral-200 p-6">
                <h4 className="font-medium mb-4">Комментарий к заказу</h4>
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Дополнительные пожелания или инструкции для доставки..."
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black min-h-[100px]"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50"
                >
                  Назад
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-black text-white rounded-lg hover:bg-neutral-800"
                >
                  Продолжить
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-neutral-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Проверьте данные заказа</h3>
                    <p className="text-neutral-600">Убедитесь, что все данные верны</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Доставка</h4>
                    <div className="bg-neutral-50 rounded-lg p-4">
                      <p className="font-medium">{deliveryInfo.fullName}</p>
                      <p className="text-neutral-600">{deliveryInfo.address}</p>
                      <p className="text-neutral-600">
                        {deliveryInfo.city}, {deliveryInfo.postalCode}, {deliveryInfo.country}
                      </p>
                      <p className="text-neutral-600">{deliveryInfo.phone}</p>
                      <p className="text-neutral-600">{deliveryInfo.email}</p>
                      <p className="mt-2 font-medium">
                        Способ доставки: {
                          deliveryInfo.deliveryMethod === 'standard' ? 'Стандартная' :
                          deliveryInfo.deliveryMethod === 'express' ? 'Экспресс' : 'Самовывоз'
                        }
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Оплата</h4>
                    <div className="bg-neutral-50 rounded-lg p-4">
                      <p className="font-medium">
                        {paymentInfo.paymentMethod === 'card' ? 'Банковская карта' :
                         paymentInfo.paymentMethod === 'cash' ? 'Наличными при получении' : 'PayPal'}
                      </p>
                      {paymentInfo.paymentMethod === 'card' && (
                        <>
                          <p className="text-neutral-600">Карта: **** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
                          <p className="text-neutral-600">Держатель: {paymentInfo.cardHolder}</p>
                        </>
                      )}
                    </div>
                  </div>

                  {orderNotes && (
                    <div>
                      <h4 className="font-medium mb-3">Комментарий</h4>
                      <div className="bg-neutral-50 rounded-lg p-4">
                        <p className="text-neutral-600">{orderNotes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50"
                >
                  Назад
                </button>
                <button
                  onClick={handleCompleteOrder}
                  className="px-6 py-3 bg-black text-white rounded-lg hover:bg-neutral-800"
                >
                  Подтвердить заказ
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-neutral-200 p-6 sticky top-6">
            <h3 className="text-xl font-bold mb-6">Ваш заказ</h3>

            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-start">
                  <div>
                    <span className="text-neutral-600">
                      {item.product?.name || 'Товар'} × {item.quantity}
                    </span>
                    {(item.selectedSize || item.selectedColor) && (
                      <div className="text-sm text-neutral-500 mt-1">
                        {item.selectedSize && `Размер: ${item.selectedSize}`}
                        {item.selectedSize && item.selectedColor && ', '}
                        {item.selectedColor && `Цвет: ${item.selectedColor}`}
                      </div>
                    )}
                  </div>
                  <span>
                    {((item.product?.price || item.price || 0) * item.quantity).toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-neutral-200 pt-4">
              <div className="flex justify-between">
                <span>Товары</span>
                <span>{totalAmount.toLocaleString('ru-RU')} ₽</span>
              </div>

              <div className="flex justify-between">
                <span>Доставка</span>
                <span>
                  {deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost.toLocaleString('ru-RU')} ₽`}
                </span>
              </div>

              <div className="flex justify-between text-lg font-bold pt-3 border-t border-neutral-200">
                <span>Итого</span>
                <span>{finalAmount.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

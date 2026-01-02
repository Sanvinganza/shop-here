'use client';

import { CheckCircle } from 'lucide-react';

interface OrderConfirmationProps {
  orderNumber: string;
  onContinueShopping: () => void;
}

export function OrderConfirmation({ orderNumber, onContinueShopping }: OrderConfirmationProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="mb-3">Заказ успешно оформлен!</h1>
        
        <p className="text-neutral-600 mb-2">
          Номер вашего заказа:
        </p>
        <p className="text-xl mb-6">{orderNumber}</p>
        
        <div className="bg-neutral-50 rounded-lg p-6 mb-8 text-left">
          <h3 className="mb-3">Что дальше?</h3>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li className="flex items-start gap-2">
              <span className="text-black">1.</span>
              <span>Мы отправили подтверждение заказа на вашу электронную почту</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-black">2.</span>
              <span>Вы получите уведомление, когда заказ будет отправлен</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-black">3.</span>
              <span>Отслеживайте статус доставки по номеру заказа</span>
            </li>
          </ul>
        </div>

        <button
          onClick={onContinueShopping}
          className="px-8 py-3 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors shadow-sm hover:shadow-md"
        >
          Вернуться в магазин
        </button>
      </div>
    </div>
  );
}

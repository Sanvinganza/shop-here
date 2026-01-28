'use client';

import { Header } from '@/components/Header';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Cart } from '@/components/Cart';

import { useCart } from '@/app/[locale]/cart/context/CartContext';

export default function CartPage() {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    getTotalPrice 
  } = useCart();
  
  const router = useRouter();

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link 
            href="/" 
            className="text-sm text-neutral-600 hover:text-neutral-900"
          >
            ← Вернуться к покупкам
          </Link>
        </div>
        
        <Cart
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveFromCart={removeFromCart}
          onProceedToCheckout={() => router.push('/checkout')}
          onContinueShopping={() => router.push('/')}
          totalPrice={getTotalPrice()}
        />
      </main>
    </div>
  );
}
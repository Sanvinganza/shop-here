'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCartContext } from '../app/[locale]/cart/context/CartContext';

export function CartLink() {
  const { getTotalItems } = useCartContext();
  const count = getTotalItems();

  return (
    <Link 
      href="/cart"
      className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors"
      title="Корзина"
    >
      <ShoppingCart className="w-6 h-6" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { ProductCatalog } from '../components/ProductCatalog';
import { Cart } from '../components/Cart';
import { Checkout } from '../components/Checkout';
import { OrderConfirmation } from '../components/OrderConfirmation';
import { Favorites } from '../components/Favorites';
import { Compare } from '../components/Compare';
import { ToastContainer, ToastMessage } from '../components/Toast';
import { ShoppingCart, Heart, GitCompare } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  popularity: number;
  rating: number;
  inStock: boolean;
  stockCount?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface DeliveryInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  deliveryMethod: 'standard' | 'express';
}

export interface PaymentInfo {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export type View = 'catalog' | 'cart' | 'checkout' | 'confirmation' | 'favorites' | 'compare';

export default function Page() {
  const [view, setView] = useState<View>('catalog');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [compare, setCompare] = useState<Product[]>([]);
  const [viewedProducts, setViewedProducts] = useState<Product[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    const savedCompare = localStorage.getItem('compare');
    const savedViewed = localStorage.getItem('viewedProducts');
    
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedCompare) setCompare(JSON.parse(savedCompare));
    if (savedViewed) setViewedProducts(JSON.parse(savedViewed));
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('compare', JSON.stringify(compare));
  }, [compare]);

  useEffect(() => {
    localStorage.setItem('viewedProducts', JSON.stringify(viewedProducts));
  }, [viewedProducts]);

  const toggleFavorite = (product: Product) => {
    setFavorites(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isFavorite = (productId: string) => {
    return favorites.some(p => p.id === productId);
  };

  const toggleCompare = (product: Product) => {
    setCompare(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 4) {
        alert('Можно сравнить не более 4 товаров');
        return prev;
      }
      return [...prev, product];
    });
  };

  const isInCompare = (productId: string) => {
    return compare.some(p => p.id === productId);
  };

  const addToViewed = (product: Product) => {
    setViewedProducts(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 10);
    });
  };

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== productId));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = (deliveryInfo: DeliveryInfo, paymentInfo: PaymentInfo) => {
    const orderNum = `ORD-${Date.now().toString().slice(-8)}`;
    setOrderNumber(orderNum);
    setView('confirmation');
    setTimeout(() => {
      setCart([]);
    }, 100);
  };

  const cartCount = getTotalItems();

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setView('catalog')}
              className="text-xl tracking-tight"
            >
              SHOP
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setView('favorites')}
                className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <Heart className={`w-6 h-6 ${favorites.length > 0 ? 'fill-red-500 stroke-red-500' : ''}`} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setView('compare')}
                className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <GitCompare className="w-6 h-6" />
                {compare.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {compare.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setView('cart')}
                className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'catalog' && (
          <ProductCatalog 
            onAddToCart={addToCart}
            onToggleFavorite={toggleFavorite}
            onToggleCompare={toggleCompare}
            onViewProduct={addToViewed}
            isFavorite={isFavorite}
            isInCompare={isInCompare}
            viewedProducts={viewedProducts}
          />
        )}
        {view === 'cart' && (
          <Cart
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveFromCart={removeFromCart}
            onProceedToCheckout={() => setView('checkout')}
            onContinueShopping={() => setView('catalog')}
            totalPrice={getTotalPrice()}
          />
        )}
        {view === 'checkout' && (
          <Checkout
            cart={cart}
            totalPrice={getTotalPrice()}
            onBack={() => setView('cart')}
            onSubmit={handleCheckout}
          />
        )}
        {view === 'confirmation' && (
          <OrderConfirmation
            orderNumber={orderNumber}
            onContinueShopping={() => setView('catalog')}
          />
        )}
        {view === 'favorites' && (
          <Favorites
            favorites={favorites}
            onAddToCart={addToCart}
            onRemoveFromFavorites={(product: Product) => setFavorites(prev => prev.filter(p => p.id !== product.id))}
          />
        )}
        {view === 'compare' && (
          <Compare
            compare={compare}
            onAddToCart={addToCart}
            onRemoveFromCompare={(product: Product) => setCompare(prev => prev.filter(p => p.id !== product.id))}
          />
        )}
      </main>
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />
    </div>
  );
}
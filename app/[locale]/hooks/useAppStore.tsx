import { useState, useCallback } from 'react';
import { View, Product } from '@/app/[locale]/types';
import { useFavorites } from '@/app/[locale]/favorites/context/FavoritesContext';
import { useCompare } from '@/app/[locale]/compare/context/CompareContext';
import { useCart } from '@/app/[locale]/cart/context/CartContext';

interface DeliveryInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  [key: string]: string | number | boolean;
}

interface PaymentInfo {
  method: 'card' | 'cash' | 'paypal';
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  cvv?: string;
  [key: string]: string | number | boolean | undefined;
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export const useAppState = () => {
  const [view, setView] = useState<View>('catalog');
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [viewedProducts, setViewedProducts] = useState<Product[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
    clearCart,
  } = useCart();

  const {
    favorites,
    toggleFavorite,
    isFavorite,
    removeFromFavorites,
  } = useFavorites();

  const {
    compare,
    toggleCompare,
    isInCompare,
    removeFromCompare,
  } = useCompare();

  const addToViewed = useCallback((product: Product) => {
    setViewedProducts(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 10);
    });
  }, []);

  const handleCheckout = useCallback((deliveryInfo: DeliveryInfo, paymentInfo: PaymentInfo) => {
    const orderNum = `ORD-${Date.now().toString().slice(-8)}`;
    setOrderNumber(orderNum);
    setView('confirmation');
    
    //TODO
    console.log('Delivery Info:', deliveryInfo);
    console.log('Payment Info:', paymentInfo);


    if (typeof window !== 'undefined') {
      setTimeout(() => {
        clearCart();
      }, 100);
    }
  }, [clearCart]);

  // Методы для работы с тостами
  const addToast = useCallback((message: string, type: Toast['type'] = 'info', duration: number = 3000) => {
    const id = Date.now().toString();
    const newToast: Toast = { id, message, type, duration };
    setToasts(prev => [...prev, newToast]);
    
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return {
    // Состояние
    view,
    setView,
    orderNumber,
    viewedProducts,
    toasts,
    setToasts,
    
    // Корзина
    cart,
    cartCount: getTotalItems(),
    totalPrice: getTotalPrice(),
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    
    // Избранное
    favorites,
    toggleFavorite,
    isFavorite,
    removeFromFavorites,
    
    // Сравнение
    compare,
    toggleCompare,
    isInCompare,
    removeFromCompare,
    
    // Другие методы
    addToViewed,
    handleCheckout,
    
    // Методы для тостов
    addToast,
    removeToast,
  };
};
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

export type Language = 'ru' | 'en' | 'kk'

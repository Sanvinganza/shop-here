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
  stockCount: number;
  colors?: string[];
  sizes?: string[];
  brand?: string;
  features?: string[];
  connectivity?: string[];
  slug?: string;
  oldPrice?: number;
  isNew?: boolean;
  isSale?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Обновленный CartItem - содержит product внутри
export interface CartItem {
  id: string;
  productId: string;
  product: Product;  // Вложенный объект продукта
  quantity: number;
  size?: string;
  color?: string;
  selectedSize?: string;
  selectedColor?: string;
  price?: number;    // Может дублировать product.price для гибкости
}

export interface DeliveryInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  deliveryMethod: 'standard' | 'express' | 'pickup';
}

export interface PaymentInfo {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  paymentMethod: 'card' | 'cash' | 'paypal';
}

export type SortOption = 'popularity' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  productCount?: number;
}

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStock: boolean;
  brands: string[];
  colors: string[];
  sizes: string[];
}

// Утилитарный тип для упрощенного CartItem (старый вариант)
export interface SimpleCartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  size?: string;
  color?: string;
}

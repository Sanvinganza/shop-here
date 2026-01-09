export type ShopType = 'periphery' | 'clothing';

export interface ShopConfig {
  id: ShopType;
  name: string;
  description: string;
  icon: string;
  categories: string[];
  apiEndpoint: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  features: {
    showSizes: boolean;
    showColors: boolean;
    showBrand: boolean;
    showConnectivity: boolean;
    showSpecs: boolean;
  };
}

export const shops: Record<ShopType, ShopConfig> = {
  periphery: {
    id: 'periphery',
    name: 'Периферия',
    description: 'Компьютерная периферия и аксессуары',
    icon: '-',
    categories: ['Мыши', 'Клавиатуры', 'Наушники', 'Мониторы'],
    apiEndpoint: '/api/periphery',
    colors: {
      primary: '#2563eb',
      secondary: '#1e40af',
      accent: '#3b82f6'
    },
    features: {
      showSizes: false,
      showColors: true,
      showBrand: true,
      showConnectivity: true,
      showSpecs: true
    }
  },
  clothing: {
    id: 'clothing',
    name: 'Одежда',
    description: 'Модная одежда и аксессуары',
    icon: '-',
    categories: ['Футболки', 'Джинсы', 'Платья', 'Обувь'],
    apiEndpoint: '/api/clothing',
    colors: {
      primary: '#dc2626',
      secondary: '#b91c1c',
      accent: '#ef4444'
    },
    features: {
      showSizes: true,
      showColors: true,
      showBrand: true,
      showConnectivity: false,
      showSpecs: false
    }
  }
};

export const getShopConfig = (shopType: ShopType = 'clothing'): ShopConfig => {
  return shops[shopType] || shops.clothing;
};

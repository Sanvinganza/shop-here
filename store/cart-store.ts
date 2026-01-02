import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  title: string
  price: number
  image: string
  quantity: number
  size?: string
  color?: string
}

interface CartStore {
  items: CartItem[]
  total: number
  itemCount: number
  
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getItemTotal: (item: CartItem) => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,

      addItem: (newItem) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === newItem.id)
          
          if (existingItem) {
            const updatedItems = state.items.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
            
            return {
              items: updatedItems,
              total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
              itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
            }
          }
          
          const updatedItems = [...state.items, { ...newItem, quantity: 1 }]
          
          return {
            items: updatedItems,
            total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
            itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          }
        }),

      removeItem: (id) =>
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== id)
          
          return {
            items: updatedItems,
            total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
            itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          }
        }),

      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity < 1) {
            return state
          }
          
          const updatedItems = state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          )
          
          return {
            items: updatedItems,
            total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
            itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          }
        }),

      clearCart: () =>
        set({
          items: [],
          total: 0,
          itemCount: 0,
        }),

      getItemTotal: (item) => item.price * item.quantity,
    }),
    {
      name: 'cart-storage',
    }
  )
)
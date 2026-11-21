'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { Product } from '../page'
import { trackCart } from '../../lib/gtag'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  total: number
  miniCartOpen: boolean
  openMiniCart: () => void
  closeMiniCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)
  const [miniCartOpen, setMiniCartOpen] = useState(false)
  const openMiniCart = () => setMiniCartOpen(true)
  const closeMiniCart = () => setMiniCartOpen(false)

  // Hydrate from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) {
      try {
        // Carts saved before the one-copy rule could hold quantity 2+ of the same download.
        setItems((JSON.parse(saved) as CartItem[]).map(i => ({ ...i, quantity: 1 })))
      } catch {}
    }
    setMounted(true)
  }, [])

  // Persist to localStorage whenever items change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('cart', JSON.stringify(items))
    }
  }, [items, mounted])

  // A package is a download: one copy is all anyone needs. Clicking Köp nu again (e.g. after
  // backing out of Stripe) must not turn the cart into two copies at 258 kr.
  const addItem = (product: Product) => {
    if (items.some(item => item.product._id === product._id)) return
    trackCart('add_to_cart', [{ productId: product._id, productName: product.name, price: product.price, quantity: 1 }])
    setItems(prev => prev.some(item => item.product._id === product._id) ? prev : [...prev, { product, quantity: 1 }])
  }

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(item => item.product._id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
    } else {
      setItems(prev =>
        prev.map(item =>
          item.product._id === productId ? { ...item, quantity } : item
        )
      )
    }
  }

  const clearCart = () => {
    setItems([])
  }

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, miniCartOpen, openMiniCart, closeMiniCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

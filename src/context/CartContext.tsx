'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Product } from '@/lib/data'

type CartItem = Product & { quantity: number }

type CartContextType = {
  cartItems: CartItem[]
  receipts: Array<{
    id: number
    date: string
    items: CartItem[]
    total: number
  }>
  addToCart: (product: Product) => void
  updateQuantity: (productId: number, newQuantity: number) => void
  generateReceipt: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isClient, setIsClient] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [receipts, setReceipts] = useState<CartContextType['receipts']>([])

  useEffect(() => {
    setIsClient(true)
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    const savedReceipts = JSON.parse(localStorage.getItem('receipts') || '[]')
    setCartItems(savedCart)
    setReceipts(savedReceipts)
  }, [])

  if (!isClient) {
    return null // lub jakiś loading state
  }

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      const newItems = existingItem
        ? prevItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevItems, { ...product, quantity: 1 }]
      
      localStorage.setItem('cart', JSON.stringify(newItems))
      return newItems
    })
  }

  const updateQuantity = (productId: number, newQuantity: number) => {
    setCartItems(prevItems => {
      const newItems = prevItems
        .map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
        .filter(item => item.quantity > 0)
      
      localStorage.setItem('cart', JSON.stringify(newItems))
      return newItems
    })
  }

  const generateReceipt = () => {
    const newReceipt = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }

    setReceipts(prevReceipts => {
      const newReceipts = [...prevReceipts, newReceipt]
      localStorage.setItem('receipts', JSON.stringify(newReceipts))
      return newReceipts
    })

    setCartItems([])
    localStorage.setItem('cart', '[]')
  }

  return (
    <CartContext.Provider value={{ cartItems, receipts, addToCart, updateQuantity, generateReceipt }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 
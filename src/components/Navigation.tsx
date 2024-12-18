'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'

const Navigation = () => {
  const { cartItems, receipts } = useCart()
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const receiptCount = receipts.length
  const isOnline = useOnlineStatus()

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/"
            className="text-xl font-bold hover:text-gray-300"
            aria-label="Strona główna"
          >
            Sklep
          </Link>
          <div className="flex items-center gap-4">
            <span 
              className={`px-2 py-1 rounded text-sm ${
                isOnline 
                  ? 'bg-green-600 text-white' 
                  : 'bg-red-600 text-white'
              }`}
              role="status"
              aria-label={isOnline ? 'Online' : 'Offline'}
            >
              {isOnline ? 'Online' : 'Offline'}
            </span>
            <Link 
              href="/koszyk"
              className="hover:text-gray-300"
              aria-label={`Koszyk, ${cartCount} produktów`}
            >
              Koszyk ({cartCount})
            </Link>
            <Link 
              href="/historia"
              className="hover:text-gray-300"
              aria-label={`Historia, ${receiptCount} paragonów`}
            >
              Historia ({receiptCount})
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation 
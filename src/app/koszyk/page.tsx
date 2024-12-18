'use client'

import { useCart } from '@/context/CartContext'

export default function Cart() {
  const { cartItems, updateQuantity, generateReceipt } = useCart()

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Koszyk</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Twój koszyk jest pusty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.price.toFixed(2)} zł</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                    aria-label="Zmniejsz ilość"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                    aria-label="Zwiększ ilość"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-white rounded-lg shadow">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Suma:</span>
              <span className="font-bold">{total.toFixed(2)} zł</span>
            </div>
            <button
              onClick={generateReceipt}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
              aria-label="Generuj paragon"
            >
              Generuj paragon
            </button>
          </div>
        </>
      )}
    </div>
  )
} 
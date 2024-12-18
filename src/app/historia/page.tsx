'use client'

import { useEffect, useState } from 'react'

type Receipt = {
  id: number
  date: string
  items: Array<{
    id: number
    name: string
    price: number
    quantity: number
  }>
  total: number
}

export default function History() {
  const [receipts, setReceipts] = useState<Receipt[]>([])

  useEffect(() => {
    const savedReceipts = JSON.parse(localStorage.getItem('receipts') || '[]')
    setReceipts(savedReceipts)
  }, [])

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Historia paragonów</h1>
      {receipts.length === 0 ? (
        <p className="text-gray-600">Brak historii paragonów</p>
      ) : (
        <div className="space-y-4">
          {receipts.map((receipt) => (
            <div key={receipt.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">
                  Data: {new Date(receipt.date).toLocaleDateString('pl-PL')}
                </span>
                <span className="font-bold">{receipt.total.toFixed(2)} zł</span>
              </div>
              <div className="space-y-2">
                {receipt.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span>{(item.price * item.quantity).toFixed(2)} zł</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 
'use client'

import Image from 'next/image'
import { Product } from '@/lib/data'
import { useCart } from '@/context/CartContext'

type ProductCardProps = {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart()

  const handleAddToCart = () => addToCart(product)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-64 relative">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">{product.price.toFixed(2)} zł</span>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            aria-label={`Dodaj ${product.name} do koszyka1`}
          >
            Dodaj do koszyka
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard 
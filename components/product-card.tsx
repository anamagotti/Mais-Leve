"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      {/* Product Image */}
      <div className="relative w-full h-64 bg-muted overflow-hidden group">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-sm line-clamp-2 mb-2">{product.name}</h3>

        {/* Pricing */}
        <div className="space-y-1 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">
              R$ {(product.price / 100).toFixed(2).replace(".", ",")}
            </span>
          </div>

          {/* PIX Price */}
          {product.pixPrice && <p className="text-xs font-semibold text-primary">Pague no PIX</p>}
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={() => onAddToCart(product)}
          className="w-full mt-auto bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <ShoppingCart size={18} />
          Adicionar
        </Button>
      </div>
    </Card>
  )
}

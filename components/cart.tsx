"use client"

import { useState } from "react"
import { X, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"
import Checkout from "./checkout"

interface CartProps {
  items: Product[]
  onRemove: (index: number) => void
  onClose: () => void
}

export default function Cart({ items, onRemove, onClose }: CartProps) {
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  const subtotal = items.reduce((sum, item) => sum + item.pixPrice, 0)
  const total = subtotal

  if (checkoutOpen) {
    return (
      <Checkout
        items={items}
        total={total}
        onClose={() => {
          setCheckoutOpen(false)
          onClose()
        }}
      />
    )
  }

  return (
    <div className="w-full max-w-md bg-white shadow-lg flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border p-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Carrinho</h2>
        <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition">
          <X size={20} />
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">Seu carrinho está vazio</p>
        ) : (
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="flex gap-3 pb-4 border-b border-border last:border-0">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold text-sm line-clamp-2">{item.name}</p>
                  <p className="text-primary font-bold">R$ {(item.pixPrice / 100).toFixed(2).replace(".", ",")}</p>
                </div>
                <button
                  onClick={() => onRemove(index)}
                  className="p-2 hover:bg-destructive/10 text-destructive rounded transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div className="border-t border-border p-4 space-y-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span className="text-primary">R$ {(total / 100).toFixed(2).replace(".", ",")}</span>
          </div>
          <Button
            onClick={() => setCheckoutOpen(true)}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base"
          >
            Ir para Checkout
          </Button>
        </div>
      )}
    </div>
  )
}

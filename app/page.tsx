"use client"

import { useState } from "react"
import { ShoppingCart, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import Cart from "@/components/cart"
import type { Product } from "@/lib/types"

const products: Product[] = [
	{
		id: "alpha-prata-30",
		name: "ALPHA PRATA 30 CÁPSULAS",
		price: 26000,
		image:
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagem%20do%20WhatsApp%20de%202025-11-11%20%C3%A0%28s%29%2013.57.19_55195033-1UwVYcPpWiMbTYnIK3HG8ZihVmE22A.jpg",
		category: "Alpha Emagrecedor",
		pixPrice: 26000,
	},
	{
		id: "alpha-prata-20",
		name: "ALPHA PRATA 20 CÁPSULAS",
		price: 21000,
		image:
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagem%20do%20WhatsApp%20de%202025-11-11%20%C3%A0%28s%29%2013.57.19_55195033-1UwVYcPpWiMbTYnIK3HG8ZihVmE22A.jpg",
		category: "Alpha Emagrecedor",
		pixPrice: 21000,
	},
	{
		id: "alpha-prata-10",
		name: "ALPHA PRATA 10 CÁPSULAS",
		price: 14000,
		image:
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagem%20do%20WhatsApp%20de%202025-11-11%20%C3%A0%28s%29%2013.57.19_55195033-1UwVYcPpWiMbTYnIK3HG8ZihVmE22A.jpg",
		category: "Alpha Emagrecedor",
		pixPrice: 14000,
	},
	{
		id: "alpha-ouro-30",
		name: "ALPHA OURO 30 CÁPSULAS",
		price: 26000,
		image:
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagem%20do%20WhatsApp%20de%202025-11-11%20%C3%A0%28s%29%2013.57.19_9c5f0ecd-GREZeBnESuwZiWRW8DVsKntu3djia1.jpg",
		category: "Alpha Emagrecedor",
		pixPrice: 26000,
	},
	{
		id: "alpha-ouro-20",
		name: "ALPHA OURO 20 CÁPSULAS",
		price: 21000,
		image:
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagem%20do%20WhatsApp%20de%202025-11-11%20%C3%A0%28s%29%2013.57.19_9c5f0ecd-GREZeBnESuwZiWRW8DVsKntu3djia1.jpg",
		category: "Alpha Emagrecedor",
		pixPrice: 21000,
	},
	{
		id: "alpha-ouro-10",
		name: "ALPHA OURO 10 CÁPSULAS",
		price: 14000,
		image:
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagem%20do%20WhatsApp%20de%202025-11-11%20%C3%A0%28s%29%2013.57.19_9c5f0ecd-GREZeBnESuwZiWRW8DVsKntu3djia1.jpg",
		category: "Alpha Emagrecedor",
		pixPrice: 14000,
	},
	{
		id: "2-capsulas-prata",
		name: "2 CÁPSULAS PRATA - POTE",
		price: 3000,
		image:
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagem%20do%20WhatsApp%20de%202025-11-11%20%C3%A0%28s%29%2013.57.19_55195033-1UwVYcPpWiMbTYnIK3HG8ZihVmE22A.jpg",
		category: "Alpha Emagrecedor",
		pixPrice: 3000,
	},
	{
		id: "2-capsulas-ouro",
		name: "2 CÁPSULAS OURO - POTE",
		price: 3000,
		image:
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagem%20do%20WhatsApp%20de%202025-11-11%20%C3%A0%28s%29%2013.57.19_9c5f0ecd-GREZeBnESuwZiWRW8DVsKntu3djia1.jpg",
		category: "Alpha Emagrecedor",
		pixPrice: 3000,
	},
]
export default function Home() {
	const [cartOpen, setCartOpen] = useState(false)
	const [cartItems, setCartItems] = useState<Product[]>([])
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

	const categories = ["Alpha Emagrecedor", "Roupas Fitness", "Utensílios Fitness"]
	const filteredProducts = selectedCategory ? products.filter((p) => p.category === selectedCategory) : products

	const handleAddToCart = (product: Product) => {
		setCartItems([...cartItems, product])
	}

	const handleRemoveFromCart = (index: number) => {
		setCartItems(cartItems.filter((_, i) => i !== index))
	}

	return (
		<main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
			{/* Header */}
			<header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-border">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<img
								src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagem%20do%20WhatsApp%20de%202025-11-11%20%C3%A0%28s%29%2013.57.47_a487300c-BlX6UMZuDDopOPqHVAtigzGKk4UfxQ.jpg"
								alt="Mais Leve"
								className="h-12 w-auto"
							/>
						</div>
						<button
							onClick={() => setCartOpen(!cartOpen)}
							className="relative inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
						>
							<ShoppingCart size={20} />
							{cartItems.length > 0 && (
								<span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
									{cartItems.length}
								</span>
							)}
						</button>
					</div>
				</div>
			</header>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="flex gap-8">
					{/* Sidebar Filters */}
					<aside className="w-56 hidden lg:block">
						<div className="sticky top-24 space-y-4">
							<div className="flex items-center gap-2">
								<Filter size={20} className="text-primary" />
								<h2 className="font-semibold">Categorias</h2>
							</div>
							<div className="space-y-2">
								<Button
									variant={selectedCategory === null ? "default" : "outline"}
									className="w-full justify-start"
									onClick={() => setSelectedCategory(null)}
								>
									Todos os Produtos
								</Button>
								{categories.map((cat) => (
									<Button
										key={cat}
										variant={selectedCategory === cat ? "default" : "outline"}
										className="w-full justify-start"
										onClick={() => setSelectedCategory(cat)}
									>
										{cat}
									</Button>
								))}
							</div>
						</div>
					</aside>

					{/* Main Content */}
					<div className="flex-1">
						{/* Mobile Filter */}
						<div className="lg:hidden mb-6">
							<select
								value={selectedCategory || ""}
								onChange={(e) => setSelectedCategory(e.target.value || null)}
								className="w-full px-4 py-2 border border-border rounded-lg bg-background"
							>
								<option value="">Todos os Produtos</option>
								{categories.map((cat) => (
									<option key={cat} value={cat}>
										{cat}
									</option>
								))}
							</select>
						</div>

						{/* Products Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{filteredProducts.map((product) => (
								<ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Cart Drawer */}
			{cartOpen && (
				<div className="fixed inset-0 z-50 flex">
					<div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
					<Cart items={cartItems} onRemove={handleRemoveFromCart} onClose={() => setCartOpen(false)} />
				</div>
			)}
		</main>
	)
}

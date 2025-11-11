export interface Product {
  id: string
  name: string
  price: number
  quantity?: number // Adicionando a quantidade como opcional
  originalPrice: number
  discount: number
  image: string
  category: string
  installments: {
    count: number
    value: number
  }
  pixPrice: number
}

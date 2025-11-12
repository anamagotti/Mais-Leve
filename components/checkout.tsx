"use client"

import type React from "react"
import { useState } from "react"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { X, Copy, Check } from "lucide-react"

interface CheckoutProps {
  items: Product[]
  total: number
  onClose: () => void
}

export default function Checkout({ items, total, onClose }: CheckoutProps) {
  const [loading, setLoading] = useState(false)
  const [pixCopied, setPixCopied] = useState(false)
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [street, setStreet] = useState("")
  const [number, setNumber] = useState("")
  const [complement, setComplement] = useState("")
  const [neighborhood, setNeighborhood] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [orderDetails, setOrderDetails] = useState({
    nome: "",
    endereco: "",
    produtos: "",
    total: 0,
  })

  const FRETE = 1500; // R$ 15,00 em centavos
  const totalComFrete = total + FRETE;

  const PIX_KEY = "14991216580"

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // A validação do lado do cliente permanece a mesma
    if (
      !customerEmail ||
      !customerName ||
      !customerPhone ||
      !street ||
      !number ||
      !neighborhood ||
      !city ||
      !state ||
      !zipCode
    ) {
      setError("Todos os campos são obrigatórios.")
      return
    }

    setLoading(true)

    // Formata os dados para enviar para a API
    const fullAddress = `${street}, ${number}${complement ? `, ${complement}` : ""} - ${neighborhood}, ${city} - ${state}, ${zipCode}`
    const productNames = items.map((item) => `${item.name} (Qtd: ${item.quantity})`).join(", ")

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: customerName,
          email: customerEmail,
          telefone: customerPhone,
          endereco: fullAddress,
          produto: productNames,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Erro ao processar pagamento")
        setLoading(false) // Para o loading em caso de erro
        return
      }

      // Salva os detalhes do pedido para usar no link do WhatsApp
      setOrderDetails({
        nome: customerName,
        endereco: fullAddress,
        produtos: productNames,
        total: totalComFrete,
      });
      setSuccess(true)

    } catch (err) {
      setError("Erro ao conectar com o servidor.")
    } finally {
      setLoading(false)
    }
  }

  const handleCopyPix = () => {
    navigator.clipboard.writeText(PIX_KEY)
    setPixCopied(true)
    setTimeout(() => setPixCopied(false), 2000)
  }

  if (success) {
    const vendedorWhatsApp = "5514991216580";
    const mensagem = `*Novo Pedido Recebido!*\n\n*Cliente:* ${orderDetails.nome}\n\n*Endereço de Entrega:*\n${orderDetails.endereco}\n\n*Itens do Pedido:*\n${orderDetails.produtos}\n\n*Valor Total (com frete):* R$ ${(orderDetails.total / 100).toFixed(2).replace(".", ",")}\n\n*Pagamento via PIX* (Chave: ${PIX_KEY})`;
    const whatsappUrl = `https://wa.me/${vendedorWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    return (
      <div className="w-full max-w-md bg-white shadow-lg p-6 rounded-lg text-center space-y-4">
        <h3 className="text-xl font-bold text-primary">Pedido Realizado!</h3>
        <p className="text-muted-foreground">
          Para concluir, pague o PIX abaixo e clique no botão para nos avisar no WhatsApp.
        </p>
        
        {/* PIX Info */}
        <div className="bg-primary/5 border-2 border-primary rounded-lg p-4 space-y-4">
          <p className="text-sm font-semibold">Chave PIX para Pagamento</p>
          <div className="bg-white border border-border rounded p-3 font-mono text-sm break-all font-bold">
            {PIX_KEY}
          </div>
          <Button onClick={handleCopyPix} className="w-full gap-2 bg-primary/80 hover:bg-primary/90">
            {pixCopied ? (
              <><Check size={18} /> Copiado!</>
            ) : (
              <><Copy size={18} /> Copiar Chave PIX</>
            )}
          </Button>
        </div>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors"
        >
          Avisar Vendedor no WhatsApp
        </a>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg flex flex-col overflow-y-auto max-h-[90vh]">
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Checkout</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded">
            <X size={20} />
          </button>
        </div>

        {/* Customer Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Nome Completo *</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Seu nome completo"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Email *</label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Telefone *</label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="(11) 99999-9999"
            />
          </div>
        </div>

        {/* Address Info */}
        <div className="space-y-4 border-t border-border pt-4">
          <h3 className="font-semibold">Endereço de Entrega</h3>
          <div>
            <label className="block text-sm font-semibold mb-2">CEP *</label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="00000-000"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Rua *</label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Rua..."
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-semibold mb-2">Número *</label>
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="123"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Complemento</label>
              <input
                type="text"
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Apto, sala..."
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Bairro *</label>
            <input
              type="text"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Bairro"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-semibold mb-2">Cidade *</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Cidade"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Estado *</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="SP"
              />
            </div>
          </div>
        </div>

        {/* PIX Payment */}
        <div className="bg-primary/5 border-2 border-primary rounded-lg p-4 space-y-4">
          <p className="text-sm font-semibold">Chave PIX para Pagamento</p>
          <div className="bg-white border border-border rounded p-3 font-mono text-sm break-all font-bold">
            {PIX_KEY}
          </div>
          <Button onClick={handleCopyPix} className="w-full gap-2 bg-primary hover:bg-primary/90">
            {pixCopied ? (
              <>
                <Check size={18} />
                Copiado!
              </>
            ) : (
              <>
                <Copy size={18} />
                Copiar Chave PIX
              </>
            )}
          </Button>
        </div>

        {error && <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}

        {/* Order Summary */}
        <div className="space-y-2 border-t border-border pt-4">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>R$ {(total / 100).toFixed(2).replace(".", ",")}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Frete:</span>
            <span>R$ {(FRETE / 100).toFixed(2).replace(".", ",")}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span className="text-primary">R$ {(totalComFrete / 100).toFixed(2).replace(".", ",")}</span>
          </div>
        </div>

        {/* Submit Button */}
        <form onSubmit={handlePayment} className="space-y-4">
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold"
          >
            {loading ? "Processando..." : "Gerar PIX"}
          </Button>
        </form>
      </div>
    </div>
  )
}

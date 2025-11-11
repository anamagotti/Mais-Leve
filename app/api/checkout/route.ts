import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nome, email, telefone, endereco, produto } = body

    if (!nome || !email || !telefone || !endereco || !produto) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 },
      )
    }

    const novoPedido = await prisma.pedido.create({
      data: {
        nome,
        email,
        telefone,
        endereco,
        produto,
      },
    })

    return NextResponse.json({
      message: "Pedido recebido com sucesso!",
      pedido: novoPedido,
    })
  } catch (error) {
    console.error("Erro ao salvar o pedido:", error)
    return NextResponse.json(
      { error: "Ocorreu um erro ao processar seu pedido." },
      { status: 500 },
    )
  }
}

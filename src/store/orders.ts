import { HTTPException } from 'hono/http-exception'
import { products } from '../data/products.js'

export type OrderStatus = 'pending' | 'paid'

export type Order = {
  id: string
  productId: string
  quantity: number
  amount: number
  status: OrderStatus
  sessionId?: string
  paymentIntentId?: string
}

export const orders = new Map<string, Order>()

export function createOrder(productId: string, quantity: number) {
  const product = products.find((p) => p.id === productId)
  if (!product) {
    throw new HTTPException(404, { message: 'Product not found' })
  }

  const order: Order = {
    id: crypto.randomUUID(),
    productId,
    quantity,
    amount: product.price * quantity,
    status: 'pending',
  }
  orders.set(order.id, order)
  return order
}

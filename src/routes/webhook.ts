import { Hono } from 'hono'
import type Stripe from 'stripe'
import { stripe } from '../lib/stripe.js'
import { env } from '../env.js'
import { orders } from '../store/orders.js'

const app = new Hono()

app.post('/', async (c) => {
  const signature = c.req.header('stripe-signature')
  if (!signature) {
    return c.text('Missing stripe-signature header', 400)
  }

  const body = await c.req.text()

  let event: Stripe.Event
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature verification failed:', (err as Error).message)
    return c.text('Invalid signature', 400)
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object
      const order = orders.get(session.metadata?.orderId ?? '')
      if (!order) break

      if (order.status === 'paid') {
        console.log(`Order ${order.id} is already paid, skipping`)
        break
      }

      if (session.payment_status === 'paid') {
        order.status = 'paid'
        order.paymentIntentId = session.payment_intent as string
        console.log(`Order ${order.id} is paid`)
      }
      break
    }

    case 'charge.refunded': {
      const charge = event.data.object
      for (const order of orders.values()) {
        if (order.paymentIntentId === charge.payment_intent) {
          order.status = 'refunded'
          console.log(`Order ${order.id} is refunded`)
        }
      }
      break
    }
  }

  return c.text('ok', 200)
})

export default app

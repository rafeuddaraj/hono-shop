import type Stripe from 'stripe'
import type { Order } from '../store/orders.js'

type SuccessProps = {
  session: Stripe.Checkout.Session
  order?: Order
}

export const Success = ({ session, order }: SuccessProps) => (
  <section class="card">
    <h1>Thank you!</h1>
    <p>Stripe payment status: <strong>{session.payment_status}</strong></p>
    <p>Our order status: <strong>{order?.status ?? 'unknown'}</strong></p>
    <p>Amount: ${((session.amount_total ?? 0) / 100).toFixed(2)}</p>
    <a href="/" class="btn">Back to shop</a>
  </section>
)

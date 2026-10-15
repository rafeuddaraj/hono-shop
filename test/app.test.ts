import { describe, it, expect } from 'vitest'
import app from '../src/app.js'

describe('Hono Shop', () => {
  it('rejects an order with an invalid quantity', async () => {
    const res = await app.request('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: 'mug', quantity: 0 }),
    })
    expect(res.status).toBe(400)
  })

  it('returns 404 for an unknown product', async () => {
    const res = await app.request('/api/products/unknown')
    expect(res.status).toBe(404)
    const body = await res.json()
    expect(body.error.message).toBe('Product not found')
  })

  it('rejects a webhook without a signature', async () => {
    const res = await app.request('/webhook', { method: 'POST', body: '{}' })
    expect(res.status).toBe(400)
  })
})

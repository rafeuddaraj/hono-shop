import { z } from 'zod'

const envSchema = z.object({
  APP_URL: z.url(),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_'),
  ADMIN_TOKEN: z.string().min(16),
})

export const env = envSchema.parse(process.env)

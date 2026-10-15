import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    env: {
      APP_URL: 'http://localhost:3000',
      STRIPE_SECRET_KEY: 'sk_test_for_tests',
      STRIPE_WEBHOOK_SECRET: 'whsec_for_tests',
      ADMIN_TOKEN: 'test-admin-token-123456',
    },
  },
})

import type { Child } from 'hono/jsx'
import { raw } from 'hono/html'

type LayoutProps = {
  title: string
  children: Child
}

export const Layout = ({ title, children }: LayoutProps) => (
  <>
    {raw('<!doctype html>')}
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <link rel="stylesheet" href="/public/styles.css" />
      </head>
      <body>
        <header class="site-header">
          <a href="/" class="logo">Hono Shop</a>
        </header>
        <main class="container">{children}</main>
      </body>
    </html>
  </>
)

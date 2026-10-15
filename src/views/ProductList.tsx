import type { Product } from '../data/products.js'

export const ProductList = ({ products }: { products: Product[] }) => (
  <div class="grid">
    {products.map((product) => (
      <article class="card">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p class="price">${(product.price / 100).toFixed(2)}</p>
        <form method="post" action={`/buy/${product.id}`}>
          <input type="number" name="quantity" value="1" min="1" max="10" />
          <button type="submit" class="btn">Buy now</button>
        </form>
      </article>
    ))}
  </div>
)

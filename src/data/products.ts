export type Product = {
  id: string
  name: string
  description: string
  price: number
  category: string
}

export const products: Product[] = [
  {
    id: 'hoodie',
    name: 'Developer Hoodie',
    description: 'A warm hoodie for late-night coding.',
    price: 4500,
    category: 'apparel',
  },
  {
    id: 'mug',
    name: 'Coffee Mug',
    description: 'Holds enough coffee for one bug fix.',
    price: 1200,
    category: 'accessories',
  },
  {
    id: 'stickers',
    name: 'Sticker Pack',
    description: 'Ten stickers for your laptop.',
    price: 500,
    category: 'accessories',
  },
]

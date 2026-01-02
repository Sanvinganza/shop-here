import { fetchProducts } from '@/lib/api'

export default async function CatalogPage() {
  const data = await fetchProducts()
  
  return (
    <div>
      {data.products.map((product: any) => (
        <div key={product.id}>
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>{product.price} ₽</p>
        </div>
      ))}
    </div>
  )
}
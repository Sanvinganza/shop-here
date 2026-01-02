import { fakerRU as faker } from '@faker-js/faker'

export function generateProducts(count: number = 20) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: faker.commerce.productName(),
    price: Number(faker.commerce.price({ min: 500, max: 20000 })),
    description: faker.commerce.productDescription(),
    image: faker.image.urlLoremFlickr({ width: 400, height: 400, category: 'fashion' }),
    category: faker.helpers.arrayElement(['Футболки', 'Джинсы', 'Обувь', 'Куртки', 'Аксессуары']),
    stock: faker.number.int({ min: 0, max: 100 }),
    rating: faker.number.float({ min: 3, max: 5 }),
    reviews: faker.number.int({ min: 0, max: 500 })
  }))
}

export const fakeProducts = generateProducts(50)
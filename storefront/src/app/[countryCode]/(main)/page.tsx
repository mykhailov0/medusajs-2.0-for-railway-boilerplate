// src/app/[countryCode]/(main)/page.tsx
import React from "react"
import { sdk } from "@lib/config"
import Hero from "@modules/home/components/hero"
import FeaturedProducts from "@modules/home/components/featured-products"
import type {
  StoreRegion,
  StoreProduct,
  StoreCollection,
} from "@medusajs/types"

export default async function Page({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  // 1) Отримуємо список регіонів та обираємо перший
  const regionList = await sdk.store.region.list()
  const regionId   = regionList.regions[0].id

  // 2) Завантажуємо детальний обʼєкт регіону
  //    (retrieve повертає сам обʼєкт StoreRegion)
  const { region } = await sdk.store.region.retrieve(regionId)


  // 3) Hero-слайдер: беремо кілька продуктів і фільтруємо по тегу
  const { products } = await sdk.store.product.list({
    region_id: regionId,
    limit:     50,
    offset:    0,
  })
  const heroProducts: StoreProduct[] = products.filter(p =>
    p.tags?.some(t => t.value === "hero")
  )

  // 4) FeaturedProducts — колекції
  const { collections } = await sdk.store.collection.list({
    limit:  4,
    offset: 0,
  })

  if (!heroProducts.length || !collections.length) {
    return null
  }

  return (
    <>
      <Hero
        region={region}
        products={heroProducts.slice(0, 1)} // показуємо лише перший слайд
      />

      <section className="content-container">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeaturedProducts
            collections={collections}
            region={region}
          />
        </ul>
      </section>
    </>
  )
}

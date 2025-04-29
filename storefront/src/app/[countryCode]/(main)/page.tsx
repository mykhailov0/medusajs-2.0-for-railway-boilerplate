// src/app/[countryCode]/(main)/page.tsx
import React from "react"
import { sdk } from "@lib/config"
import Hero from "@modules/home/components/hero"
import FeaturedProducts from "@modules/home/components/featured-products"
import type { HttpTypes } from "@medusajs/types"

export default async function Page({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  // 1) Регіони
  const { regions } = await sdk.store.region.list()
  const regionId = regions[0].id
  const { region } = await sdk.store.region.retrieve(regionId)
  // region має тип HttpTypes.StoreRegion

  // 2) Hero-слайдер: отримуємо продукти і фільтруємо по тегу
  const { products } = await sdk.store.product.list({
    region_id: regionId,
    limit:     50,
    offset:    0,
  })
  const heroProducts: HttpTypes.StoreProduct[] = products.filter(p =>
    p.tags?.some(t => t.value === "hero")
  )

  // 3) Featured Products — колекції
  const { collections } = await sdk.store.collection.list({
    limit:  4,
    offset: 0,
  })
  const cols: HttpTypes.StoreCollection[] = collections

  if (!heroProducts.length || !cols.length) {
    return null
  }

  return (
    <>
      <Hero products={heroProducts.slice(0, 1)} region={region} />
      <section className="content-container">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeaturedProducts collections={cols} region={region} />
        </ul>
      </section>
    </>
  )
}

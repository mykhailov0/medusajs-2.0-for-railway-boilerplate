// src/modules/home/components/hero/index.tsx
import React from "react"
import { HttpTypes } from "@medusajs/types"
import { sdk } from "@lib/config"
import HeroSlider from "./HeroSliderClient"

type Props = {
  region: HttpTypes.StoreRegion
}

export default async function Hero({ region }: Props) {
  // 1) Завантажуємо перші 50 продуктів
  const { products } = await sdk.store.product.list({
    limit: 50,
    offset: 0,
  })

  // 2) Фільтруємо за тегом "hero"
  const heroProducts = products.filter((p) =>
    p.tags?.some((t) => t.value === "hero")
  )

  if (heroProducts.length === 0) {
    return null
  }

  // 3) Обгортаємо клієнтський слайдер і даємо зверху відступ під хедер (100px)
  return (
    <div className="pt-[100px]">
      <HeroSlider products={heroProducts} region={region} />
    </div>
  )
}

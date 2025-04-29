// src/modules/home/components/hero/index.tsx
import React from "react"
import type { StoreProduct, StoreRegion } from "@medusajs/types"
import HeroSlider from "./HeroSliderClient"

type Props = {
  products: StoreProduct[]
  region: StoreRegion
}

export default function Hero({ products, region }: Props) {
  if (products.length === 0) {
    return null
  }
  return <HeroSlider products={products} region={region} />
}

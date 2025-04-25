// src/modules/home/components/hero/index.tsx

import { HttpTypes } from "@medusajs/types"
import { sdk } from "@lib/config"
import Image from "next/image"
import { Text, Button } from "@medusajs/ui"

interface HeroProps {
  region: HttpTypes.StoreRegion
}

export default async function Hero({ region }: HeroProps) {
  // Серверний запит продуктів (натисніть на 50 максимум для фільтрації)
  const { products } = await sdk.store.product.list({ limit: 50, offset: 0 })

  // Фільтруємо за тегом "hero"
  const heroProducts = (products as any[]).filter((p: any) =>
    Array.isArray(p.tags) && p.tags.some((t: any) => t.value === "hero")
  )

  const product = heroProducts[0]
  if (!product) {
    return null
  }

  // Отримуємо перший варіант та його ціну (якщо є)
  const variant: any = Array.isArray(product.variants) ? product.variants[0] : null
  const prices: any[] = Array.isArray(variant?.prices) ? variant.prices : []
  const priceObj = prices.find((p) => p.region_id === region.id) || prices[0] || {}
  const amount = priceObj.amount
    ? (priceObj.amount / 100).toLocaleString(undefined, { minimumFractionDigits: 0 })
    : ""
  const currency = priceObj.currency_code?.toUpperCase() || ""

  // Фallback для зображення
  const thumbnail: string = product.thumbnail || ""

  return (
    <section className="relative flex flex-col md:flex-row items-center bg-gradient-to-r from-red-600 to-red-400 rounded-3xl overflow-hidden p-8 md:p-16">
      {/* Ліва частина: текст */}
      <div className="flex-1 text-white mb-8 md:mb-0 md:pr-8">
        <Text className="uppercase text-sm mb-2">Рекомендуюемо</Text>
        <Text className="text-5xl font-bold leading-tight mb-4">{product.title}</Text>
        <Text className="mb-6 prose text-base">{product.description}</Text>
        <Text className="text-6xl font-extrabold mb-8">
          {amount} {currency}
        </Text>
        <div className="flex space-x-4">
          <Button variant="primary">У кошик</Button>
          <Button variant="secondary">До улюблених</Button>
        </div>
      </div>

      {/* Права частина: обкладинка */}
      <div className="flex-1 relative w-full h-64 md:h-auto">
        <Image
          src={thumbnail}
          alt={product.title}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Навігація */}
      <button className="absolute left-4 bottom-4 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2">
        ←
      </button>
      <button className="absolute right-4 bottom-4 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2">
        →
      </button>
    </section>
  )
}

// src/modules/home/components/hero/index.tsx
import Image from "next/image"
import { HttpTypes } from "@medusajs/types"
import { sdk } from "@lib/config"

type Props = {
  region: HttpTypes.StoreRegion
}

export default async function Hero({ region }: Props) {
  const { products } = await sdk.store.product.list({
    limit: 50,
    offset: 0,
  })

  const heroProducts = products.filter((p) =>
    p.tags?.some((t) => t.value === "hero")
  )

  if (heroProducts.length === 0) {
    return null
  }

  const product = heroProducts[0]

  if (!product.variants || product.variants.length === 0) {
    return null
  }

  const variant = product.variants[0]
  const price = (variant as any).calculated_price ?? 0

  return (
    <section className="relative h-[500px] rounded-3xl overflow-hidden bg-gradient-to-r from-red-600 to-red-400">
      <div className="absolute inset-0">
        <Image
          src={product.thumbnail!}
          alt={product.title!}
          fill
          className="object-cover"
        />
      </div>
      <div className="relative z-10 container mx-auto px-8 py-16 flex items-center">
        <div className="max-w-lg space-y-6 text-white">
          <h1 className="text-5xl font-bold">{product.title}</h1>
          <p className="text-lg">{product.description}</p>
          <div className="text-4xl font-semibold">
            {price} {region.currency_code}
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-black bg-opacity-70 rounded-full">
              У кошик
            </button>
            <button className="px-6 py-2 bg-white bg-opacity-90 rounded-full text-black">
              До улюблених
            </button>
          </div>
        </div>
      </div>
      <button className="absolute left-4 bottom-4 p-3 bg-white bg-opacity-50 rounded-full hover:bg-opacity-75">
        ←
      </button>
      <button className="absolute right-4 bottom-4 p-3 bg-white bg-opacity-50 rounded-full hover:bg-opacity-75">
        →
      </button>
    </section>
  )
}

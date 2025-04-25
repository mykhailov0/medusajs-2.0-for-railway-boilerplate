// src/modules/home/components/hero/index.tsx
import Image from "next/image"
import Link from "next/link"
import { HttpTypes } from "@medusajs/types"
import { sdk } from "@lib/config"

type Props = {
  region: HttpTypes.StoreRegion
}

export default async function Hero({ region }: Props) {
  // 1) Завантажуємо всі продукти
  const { products } = await sdk.store.product.list({
    limit: 50,
    offset: 0,
  })

  // 2) Відфільтровуємо ті, що мають тег "hero"
  const heroProducts = products.filter((p) =>
    p.tags?.some((t) => t.value === "hero")
  )

  if (!heroProducts.length) {
    return null
  }

  const product = heroProducts[0]

  // 3) Перевіряємо, що є хоча б один варіант із ціною
  if (!product.variants?.length) {
    return null
  }
  const variant = product.variants[0]
  const price = (variant as any).calculated_price ?? 0

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-[1400px] mx-auto relative">
        {/* Основний білий контейнер */}
        <div className="flex bg-white rounded-3xl overflow-hidden shadow-lg">
          {/* Ліва половина – текст */}
          <div className="w-1/2 p-12 flex flex-col justify-center space-y-6">
            <span className="text-sm uppercase font-medium text-gray-500">
              Рекомендуємо
            </span>
            <h1 className="text-6xl font-bold text-gray-900">
              {product.title}
            </h1>
            <p className="text-lg text-gray-700">
              {product.description}
            </p>
            <div className="text-5xl font-semibold text-gray-900">
              {price.toLocaleString()} {region.currency_code}
            </div>
            <div className="flex space-x-4">
              <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition">
                У кошик
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full transition">
                До улюблених
              </button>
            </div>
          </div>

          {/* Права половина – зображення */}
          <div className="w-1/2 relative">
            <Image
              src={product.thumbnail!}
              alt={product.title!}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Навігація слайдера */}
        <div className="absolute inset-x-0 bottom-4 px-12 flex items-center justify-between">
          <button className="p-3 bg-white bg-opacity-75 rounded-full hover:bg-opacity-100 transition">
            ←
          </button>
          <Link
            href="/catalog"
            className="text-sm uppercase text-gray-600 hover:text-gray-800 transition"
          >
            Подивитись весь каталог
          </Link>
          <button className="p-3 bg-white bg-opacity-75 rounded-full hover:bg-opacity-100 transition">
            →
          </button>
        </div>
      </div>
    </section>
  )
}

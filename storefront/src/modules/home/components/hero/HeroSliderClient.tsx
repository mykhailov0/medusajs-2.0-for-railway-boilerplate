// src/modules/home/components/hero/HeroSliderClient.tsx
"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { HttpTypes } from "@medusajs/types"
import { StoreProduct } from "@medusajs/js-sdk"

type Props = {
  products: StoreProduct[]
  region: HttpTypes.StoreRegion
}

export default function HeroSlider({ products, region }: Props) {
  const [idx, setIdx] = useState(0)
  const total = products.length

  const prev = () => setIdx((i) => (i - 1 + total) % total)
  const next = () => setIdx((i) => (i + 1) % total)

  const product = products[idx]
  // Безпечна перевірка варіантів
  const variant = product.variants?.[0]
  const price = (variant as any)?.calculated_price ?? 0

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-[1400px] mx-auto relative">
        <div className="flex bg-white rounded-3xl overflow-hidden shadow-lg">
          {/* Ліва частина: текст */}
          <div className="w-1/2 p-12 flex flex-col justify-center space-y-6">
            <span className="text-sm uppercase font-medium text-gray-500">
              Рекомендуємо
            </span>
            <h1 className="text-6xl font-bold text-gray-900">
              {product.title}
            </h1>
            <p className="text-lg text-gray-700">{product.description}</p>
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

          {/* Права частина: картинка */}
          <div className="w-1/2 relative">
            <Image
              src={product.thumbnail!}
              alt={product.title!}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Навігація */}
        <div className="absolute inset-x-0 bottom-4 px-12 flex items-center justify-between">
          <button
            onClick={prev}
            className="p-3 bg-white bg-opacity-75 rounded-full hover:bg-opacity-100 transition"
            aria-label="Попередній"
          >
            ←
          </button>

          <Link
            href="/catalog"
            className="text-sm uppercase text-gray-600 hover:text-gray-800 transition"
          >
            Подивитись весь каталог
          </Link>

          <button
            onClick={next}
            className="p-3 bg-white bg-opacity-75 rounded-full hover:bg-opacity-100 transition"
            aria-label="Наступний"
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}

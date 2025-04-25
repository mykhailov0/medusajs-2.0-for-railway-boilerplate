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
  const variant = product.variants?.[0]
  const price = (variant as any)?.calculated_price ?? 0

  return (
    <section className="bg-gray-100 flex justify-center items-start pt-[100px]">
      <div className="relative max-w-[1400px] w-full h-[870px]">
        <div className="flex h-full bg-white rounded-3xl overflow-hidden shadow-lg">
          {/* Ліва колонка з текстом */}
          <div className="flex-1 p-12 flex flex-col justify-center space-y-6">
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

          {/* Права колонка з альбомом + навігацією під ним */}
          <div className="w-[709px] flex flex-col items-center justify-start pt-8">
            {/* Картинка 709×709 */}
            <div className="relative w-[709px] h-[709px] rounded-xl overflow-hidden shadow-md">
              <Image
                src={product.thumbnail!}
                alt={product.title!}
                fill
                className="object-cover"
              />
            </div>

            {/* Навігація під картинкою */}
            <div className="mt-6 flex items-center justify-between w-full px-12">
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
        </div>
      </div>
    </section>
  )
}

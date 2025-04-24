// src/modules/home/components/hero/index.tsx
"use client"

import React from "react"
import Image from "next/image"
import { useCollections, useProducts } from "medusa-react"

interface Banner {
  id: string
  title: string
  thumbnail: string
  description: string
}

const Hero: React.FC = () => {
  // Публічний запит колекцій за handle "banners"
  const {
    collections,
    isLoading: isLoadingCollections,
    isError: collectionsError,
  } = useCollections({ handle: ["banners"], limit: 1, offset: 0 })

  const collectionId = collections?.[0]?.id ?? ""

  // Публічний запит продуктів за collection_id (має бути масив рядків)
  const {
    products,
    isLoading: isLoadingProducts,
    isError: productsError,
  } = useProducts({ collection_id: [collectionId], limit: 50, offset: 0 })

  if (isLoadingCollections || isLoadingProducts) {
    return <div>Завантаження банерів…</div>
  }

  if (collectionsError || productsError) {
    return <div>Помилка завантаження банерів</div>
  }

  if (!collectionId || !products?.length) {
    return <div>Банери не знайдені</div>
  }

  const banners: Banner[] = products.map((p: any) => ({
    id: p.id,
    title: p.title,
    thumbnail: p.thumbnail,
    description: p.description,
  }))

  return (
    <section className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Банери</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
          >
            <div className="relative w-full h-48">
              <Image
                src={banner.thumbnail}
                alt={banner.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold truncate">{banner.title}</h3>
              <p className="mt-2 text-gray-600 text-sm">{banner.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Hero

import React from 'react';
import Image from 'next/image';
import { useAdminCollections, useAdminProducts } from 'medusa-react';

// Hero component: відображає товари з колекції "banners"
interface Banner {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
}

const Hero: React.FC = () => {
  // Запитуємо метадані колекції з handle "banners"
  const { collections, isLoading: isCollectionsLoading } = useAdminCollections({
    handle: "banners", // приймає string
    limit: 1,            // обмежуємо одним елементом
    offset: 0,           // необхідний параметр для AdminGetCollectionsParams
  });

  // Беремо ID колекції (якщо є)
  const collectionId = collections?.[0]?.id ?? "";

  // Запитуємо товари за collection_id
  const {
    products,
    isLoading: isProductsLoading,
  } = useAdminProducts({
    collection_id: [collectionId], // приймає string[]
  });

  // Показуємо спінер, поки йде будь-який запит
  if (isCollectionsLoading || isProductsLoading) {
    return <div>Завантаження банерів...</div>;
  }

  // Якщо немає колекції або товарів
  if (!collectionId || !products?.length) {
    return <div>Банери не знайдені</div>;
  }

  // Мапимо товари в Banner[] для безпеки типів
  const banners: Banner[] = products.map((p: any) => ({
    id: p.id,
    title: p.title,
    thumbnail: p.thumbnail,
    description: p.description,
  }));

  return (
    <section className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {banners.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
          >
            <div className="relative w-full h-48">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold truncate">
                {product.title}
              </h2>
              <p className="mt-2 text-gray-600 text-sm">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;

// Оновлено:
// • Додано обов'язковий параметр offset: 0 у useAdminCollections
// • Передано collection_id як масив рядків у useAdminProducts
// Тепер не буде помилок TS 2345 або 2322 щодо типів параметрів.

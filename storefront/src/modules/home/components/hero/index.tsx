import React from 'react';
import Image from 'next/image';
import { useAdminCollections, useAdminProducts } from 'medusa-react';

interface Banner {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
}

const Hero: React.FC = () => {
  // 1) Отримуємо колекцію з handle "banners"
  const { collections, isLoading: isLoadingCols } = useAdminCollections({
    handle: "banners",      // приймає string, не string[] :contentReference[oaicite:7]{index=7}
    limit: 1,
    offset: 0,               // обов’язковий параметр :contentReference[oaicite:8]{index=8}
  });
  const collectionId = collections?.[0]?.id ?? "";

  // 2) Після маєте ID — запитуємо товари
  const { products, isLoading: isLoadingProds } = useAdminProducts({
    collection_id: [collectionId], // приймає string[] :contentReference[oaicite:9]{index=9}
    limit: 50,
    offset: 0,
  });

  if (isLoadingCols || isLoadingProds) {
    return <div>Завантаження банерів…</div>;
  }
  if (!collectionId || !products?.length) {
    return <div>Банери не знайдені</div>;
  }

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
          <div key={product.id} className="rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
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
              <h2 className="text-xl font-semibold truncate">{product.title}</h2>
              <p className="mt-2 text-gray-600 text-sm">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;

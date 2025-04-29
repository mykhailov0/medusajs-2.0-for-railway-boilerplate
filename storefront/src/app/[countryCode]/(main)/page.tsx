// src/app/[countryCode]/(main)/page.tsx
import { sdk } from "@lib/config";
import Hero from "@modules/home/components/hero";
import FeaturedProducts from "@modules/home/components/featured-products";
import { HttpTypes } from "@medusajs/types";

export default async function Page({ params }: { params: { countryCode: string } }) {
  // Отримуємо список регіонів та детальний об'єкт регіону
  const regionList = await sdk.store.region.list();
  const regionId = regionList.regions[0].id;
  const { region } = await sdk.store.region.retrieve(regionId);

  // Hero: один товар з тегом "hero"
  const { products: heroProducts } = await sdk.store.product.list({
    region_id: regionId,
    limit: 1,
    filter: { tags: ["hero"] },
  });

  // Featured Products: колекції
  const { collections } = await sdk.store.collection.list({ limit: 4, offset: 0 });

  return (
    <>
      <Hero region={region} products={heroProducts} />
      <section className="content-container">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </section>
    </>
  );
}

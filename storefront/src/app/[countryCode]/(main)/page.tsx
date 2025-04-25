// src/app/[countryCode]/(main)/page.tsx

import React from "react";
import { sdk } from "../../../lib/config";
import Hero from "@modules/home/components/hero";               // папка hero з малої літери
import FeaturedProducts from "@modules/home/components/featured-products";
import { HttpTypes } from "@medusajs/types";
import Bestsellers from "@modules/home/components/Bestsellers";

export default async function Page({
  params,
}: {
  params: { countryCode: string };
}) {
  // Отримуємо список регіонів для ціноутворення
  const { regions } = await sdk.store.region.list();
  const region = regions[0] as HttpTypes.StoreRegion;

  // Запит колекцій для FeaturedProducts
  const { collections } = await sdk.store.collection.list({
    limit: 4,
    offset: 0,
  });

  return (
    <>
      {/* Hero-блок із товаром з тегом "hero" */}
      <Hero region={region} />

      {/* Блок «Хіти продажу» */}
      <Bestsellers region={region} />

      {/* Featured Products з перших 4 колекцій */}
      <section className="content-container">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </section>
    </>
  );
}

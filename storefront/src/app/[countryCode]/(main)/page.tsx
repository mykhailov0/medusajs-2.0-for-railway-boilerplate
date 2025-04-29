import React from "react";
import dynamic from "next/dynamic";

const HeroSliderClient = dynamic(
  () => import("@modules/home/components/hero/HeroSliderClient"),
  { ssr: false }
);

// інші імпорти
import FeaturedProducts from "@modules/home/components/featured-products";
import { sdk } from "@lib/config";
import type { HttpTypes } from "@medusajs/types";

export default async function HomePage() {
  return (
    <>
      {/* інтерактивний слайдер лише на клієнті */}
      <HeroSliderClient />
      {/* інші секції */}
    </>
  );
}

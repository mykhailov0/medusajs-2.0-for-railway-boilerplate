// src/components/Bestsellers.tsx
"use client";

import { FC, useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import Link from "next/link";
import ProductCard from "@modules/common/components/ProductCard";
import { getBestsellers } from "@modules/home/actions";
import { HttpTypes } from "@medusajs/types";
import { Product } from "@lib/types";

interface BestsellersProps {
  region: HttpTypes.StoreRegion;
}

const Bestsellers: FC<BestsellersProps> = ({ region }) => {
  const sliderRef = useRef<Slider>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getBestsellers(region.id).then(setProducts);
  }, [region]);

  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
    arrows: false,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold mb-6">Хіти продажу</h2>
      <Slider ref={sliderRef} {...settings}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </Slider>
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => sliderRef.current?.slickPrev()}
          className="text-gray-500 hover:text-gray-800"
        >
          ← Назад
        </button>
        <Link
          href="/collections/bestsellers"
          className="text-sm font-medium text-gray-700 hover:underline"
        >
          Перейти до категорії
        </Link>
        <button
          onClick={() => sliderRef.current?.slickNext()}
          className="text-gray-500 hover:text-gray-800"
        >
          Далі →
        </button>
      </div>
    </section>
  );
};

export default Bestsellers;

"use client";
// Переконайтеся, що встановлені залежності та їх типи:
// npm install keen-slider framer-motion lucide-react
// npm install --save-dev @types/keen-slider @types/framer-motion

import React, { useState } from "react";
import Image from "next/image";
import { useProducts } from "medusa-react";
// @ts-ignore: відсутні декларації типів
import { useKeenSlider } from "keen-slider/react";
import type { KeenSliderInstance } from "keen-slider";
import "keen-slider/keen-slider.min.css";
// @ts-ignore: відсутні декларації типів
import { ShoppingCart, Heart, ArrowLeft, ArrowRight } from "lucide-react";

interface HeroSliderClientProps {
  limit?: number;
}

const HeroSliderClient: React.FC<HeroSliderClientProps> = ({ limit = 5 }) => {
  const { products, isLoading } = useProducts({ tags: ["hero"], limit });
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slideChanged(s: KeenSliderInstance) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  if (isLoading) return <div>Завантаження...</div>;
  if (!products?.length) return null;

  return (
    <div className="relative w-full overflow-hidden">
      <div ref={sliderRef} className="keen-slider">
        {products.map((p) => {
          const bgFrom = p.metadata?.bg_from ?? "gray-100";
          const bgTo = p.metadata?.bg_to ?? "gray-300";
          const images = p.images ?? [];
          const imageUrl = images[0]?.url ?? "";

          return (
            <div
              key={p.id}
              className={`keen-slider__slide h-[600px] flex items-center px-12 rounded-2xl bg-gradient-to-r from-${bgFrom} to-${bgTo}`}
            >
              <div className="w-1/2 pr-8 text-white">
                <p className="uppercase text-sm opacity-60 mb-2">Рекомендуємо</p>
                <h2 className="text-5xl font-bold mb-2">{p.title}</h2>
                {p.subtitle && <p className="text-xl mb-4">{p.subtitle}</p>}
                <p className="text-sm mb-6 line-clamp-3">{p.description}</p>
                <div className="flex items-center space-x-4">
                  <span className="text-4xl font-bold">
                    {p.variants[0].prices[0].amount.toLocaleString()} UAH
                  </span>
                  <button
                    title="У кошик"
                    aria-label="У кошик"
                    className="flex items-center px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black transition"
                    onClick={() => {/* додати в кошик */}}
                  >
                    <ShoppingCart size={16} className="mr-2" /> У кошик
                  </button>
                  <button
                    title="До улюблених"
                    aria-label="До улюблених"
                    className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-40 transition"
                    onClick={() => {/* перемикання з wishlist */}}
                  >
                    <Heart size={20} />
                  </button>
                </div>
              </div>
              <div className="w-1/2 flex justify-end">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={p.title ?? ""}
                    width={500}
                    height={500}
                    className="rounded-2xl shadow-lg object-cover"
                  />
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute inset-x-0 bottom-6 flex items-center justify-center space-x-8">
        <button
          title="Попередній слайд"
          aria-label="Попередній слайд"
          onClick={() => slider?.current?.prev()}
          className="p-3 bg-white bg-opacity-30 rounded-full hover:bg-opacity-50 transition"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          title="Подивитись весь каталог"
          aria-label="Подивитись весь каталог"
          onClick={() => (window.location.href = "/store")}
          className="uppercase text-sm text-white opacity-80 hover:opacity-100 transition"
        >
          Подивитись весь каталог
        </button>
        <button
          title="Наступний слайд"
          aria-label="Наступний слайд"
          onClick={() => slider?.current?.next()}
          className="p-3 bg-white bg-opacity-30 rounded-full hover:bg-opacity-50 transition"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default HeroSliderClient;

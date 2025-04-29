"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useProducts } from "medusa-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, ArrowLeft, ArrowRight } from "lucide-react";

interface HeroSliderClientProps {
  limit?: number;
}

const HeroSliderClient: React.FC<HeroSliderClientProps> = ({ limit = 5 }) => {
  // Fetch only products tagged "hero"
  const { products, isLoading } = useProducts({
    tags: ["hero"],
    limit,
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  if (isLoading) {
    return <div>Завантаження...</div>;
  }

  if (!products?.length) {
    return null;
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div ref={sliderRef} className="keen-slider">
        {products.map((p, idx) => {
          // Optional: read metadata for background
          const bgFrom = p.metadata?.bg_from || "gray-100";
          const bgTo = p.metadata?.bg_to || "gray-300";

          return (
            <div
              key={p.id}
              className={`keen-slider__slide h-[600px] flex items-center px-12 rounded-2xl bg-gradient-to-r from-${bgFrom} to-${bgTo}`}
            >
              {/* Text block */}
              <div className="w-1/2 pr-8 text-white">
                <p className="uppercase text-sm opacity-60 mb-2">Рекомендуємо</p>
                <h2 className="text-5xl font-bold mb-2">{p.title}</h2>
                {p.subtitle && <p className="text-xl mb-4">{p.subtitle}</p>}
                <p className="text-sm mb-6 line-clamp-3">{p.description}</p>
                <div className="flex items-center space-x-4">
                  {/* Price formatting */}
                  <span className="text-4xl font-bold">
                    {p.variants[0].prices[0].amount.toLocaleString()} UAH
                  </span>
                  <button className="flex items-center px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black transition">
                    <ShoppingCart size={16} className="mr-2" /> У кошик
                  </button>
                  <button className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-40 transition">
                    <Heart size={20} />
                  </button>
                </div>
              </div>
              {/* Image block */}
              <div className="w-1/2 flex justify-end">
                {p.images[0]?.url && (
                  <Image
                    src={p.images[0].url}
                    alt={p.title}
                    width={500}
                    height={500}
                    className="rounded-2xl shadow-lg object-cover"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-x-0 bottom-6 flex items-center justify-center space-x-8">
        <button
          onClick={() => slider?.current?.prev()}
          className="p-3 bg-white bg-opacity-30 rounded-full hover:bg-opacity-50 transition"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={() => window.location.href = "/store"}
          className="uppercase text-sm text-white opacity-80 hover:opacity-100 transition"
        >
          Подивитись весь каталог
        </button>
        <button
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

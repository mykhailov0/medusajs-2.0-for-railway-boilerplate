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

  // …налаштування слайдера

"use client";
import React from "react";
import { HttpTypes } from "@medusajs/types";
import ProductCard from "../../../components/ProductCard";

interface FeaturedProductsProps {
  collections: HttpTypes.StoreCollection[];
  region: HttpTypes.StoreRegion;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ collections, region }) => {
  return (
    <>
      {collections.map((col) => (
        <li key={col.id} className="col-span-1">
          <h3 className="text-xl font-semibold mb-4">{col.title}</h3>
          {/* Тут можна додати <ProductCard /> для продуктів з колекції */}
        </li>
      ))}
    </>
  );
};

export default FeaturedProducts;

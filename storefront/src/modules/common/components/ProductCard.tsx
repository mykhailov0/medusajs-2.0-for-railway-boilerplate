// src/modules/common/components/ProductCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@lib/types";  // або з вашого джерела типів

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const imageUrl = product.images?.[0]?.url || "/placeholder.png";
  const priceObj = product.variants?.[0]?.prices?.[0];

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <Link href={`/products/${product.id}`}>
        <Image
          src={imageUrl}
          alt={product.title}
          width={300}
          height={300}
          className="mb-4 rounded-lg"
        />
        <h3 className="text-lg font-semibold">{product.title}</h3>
        {priceObj && (
          <p className="mt-2 font-medium">
            {priceObj.amount} {priceObj.currency_code.toUpperCase()}
          </p>
        )}
      </Link>
    </div>
  );
};

export default ProductCard;

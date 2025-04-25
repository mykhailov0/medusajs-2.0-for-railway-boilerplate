import { getProducts } from "@lib/data";
import { Product } from "@lib/types";

/**
 * Fetches products tagged as 'hit'.
 */
export async function getBestsellers(): Promise<Product[]> {
  // Отримуємо товари з тегом 'hit'
  const products = await getProducts({ limit: 4, filter: { tag: "hit" } });
  return products;
}

import type { Product } from "./data/products";
import { queryToBirth } from "./birth-query";
import { buildReading } from "./saju";
import type { FullReading } from "./saju/types";

export function readingFromSearchParams(
  sp: Record<string, string | string[] | undefined>,
  product: Product,
  paid: boolean,
): FullReading | null {
  const input = queryToBirth(sp);
  if (!input) return null;
  try {
    return buildReading(input, product, { paid });
  } catch {
    return null;
  }
}

import type { Product } from "@/lib/data/products";
import { PosterCard } from "./PosterCard";

export function PosterCarousel({
  products,
  large = false,
  ranked = false,
}: {
  products: Product[];
  large?: boolean;
  ranked?: boolean;
}) {
  return (
    <div className="snap-row px-4 pb-1">
      {products.map((p, i) => (
        <PosterCard
          key={p.slug + (ranked ? `-h${i}` : "")}
          product={p}
          large={large}
          rank={ranked ? i + 1 : undefined}
          priority={large && i < 2}
        />
      ))}
    </div>
  );
}

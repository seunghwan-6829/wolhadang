import type { Product } from "@/lib/data/products";
import { PosterCard } from "./PosterCard";

export function PosterCarousel({
  products,
  large = false,
}: {
  products: Product[];
  large?: boolean;
}) {
  return (
    <div className="snap-row px-4 pb-1">
      {products.map((p) => (
        <PosterCard key={p.slug} product={p} large={large} />
      ))}
    </div>
  );
}

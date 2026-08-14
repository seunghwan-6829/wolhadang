import Link from "next/link";
import type { Product } from "@/lib/data/products";
import { formatPrice } from "@/lib/data/products";
import { FrameMedia } from "./FrameMedia";

export function PosterCard({
  product,
  large = false,
}: {
  product: Product;
  large?: boolean;
}) {
  const w = large ? "w-[min(72vw,280px)]" : "w-[168px]";
  return (
    <Link href={`/s/${product.slug}`} className={`snap-card ${w}`}>
      <FrameMedia src={product.poster} alt={`${product.character} ${product.shortName}`}>
        {product.price <= 0 ? (
          <span className="absolute right-2 top-2 z-10 rounded-full bg-[#f3ead8]/90 px-2 py-[2px] text-[10px] font-bold text-ink">
            무료
          </span>
        ) : null}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-2.5 pb-2.5 pt-10">
          <p className="font-serif text-[17px] font-semibold leading-tight text-[#f3ead8]">
            {product.shortName}
          </p>
        </div>
      </FrameMedia>
      <p className="mt-2 line-clamp-1 text-[13px] font-medium text-ink">
        {product.name}
      </p>
      <p className="mt-0.5 line-clamp-1 text-[12px] text-sub">{product.hook}</p>
      <p className="mt-0.5 text-[12px] text-sub">{formatPrice(product.price)}</p>
    </Link>
  );
}

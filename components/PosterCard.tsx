import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/data/products";

export function PosterCard({
  product,
  rank,
  large = false,
  priority = false,
}: {
  product: Product;
  rank?: number;
  large?: boolean;
  priority?: boolean;
}) {
  const w = large ? "w-[min(72vw,280px)]" : "w-[168px]";
  return (
    <Link href={`/s/${product.slug}`} className={`snap-card ${w}`}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-[14px] bg-neutral-200">
        <Image
          src={product.poster}
          alt={`${product.character} ${product.shortName}`}
          fill
          priority={priority}
          sizes={large ? "(max-width: 430px) 72vw, 280px" : "168px"}
          className="object-cover"
          style={{ objectPosition: product.objectPos ?? "center 20%" }}
        />
        {rank ? (
          <span className="absolute left-2 top-2 z-10 rounded-[4px] bg-[#c41e3a] px-1.5 py-[2px] text-[10px] font-bold tracking-wide text-white">
            TOP {rank}
          </span>
        ) : null}
        {product.price <= 0 ? (
          <span className="absolute right-2 top-2 z-10 rounded-full bg-white/90 px-2 py-[2px] text-[10px] font-bold text-ink">
            무료
          </span>
        ) : null}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-2.5 pb-2.5 pt-10">
          <p className="font-serif text-[17px] font-semibold leading-tight text-white drop-shadow">
            {product.shortName}
          </p>
        </div>
      </div>
      <p className="mt-2 line-clamp-1 text-[13px] font-medium text-ink">
        {product.character} {product.shortName}
      </p>
      <p className="mt-0.5 line-clamp-1 text-[12px] text-sub">{product.hook}</p>
    </Link>
  );
}

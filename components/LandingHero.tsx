import Link from "next/link";
import { FrameMedia } from "./FrameMedia";
import { Header } from "./Header";
import type { Product } from "@/lib/data/products";
import { formatPrice } from "@/lib/data/products";

export function LandingHero({
  product,
  title,
  ctaHref,
  ctaLabel,
}: {
  product: Product;
  title: string;
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <div className="lock-screen relative h-dvh overflow-hidden bg-[#161412]">
      <FrameMedia
        src={product.poster}
        videoSrc={product.video}
        alt={product.character}
        fill
      >
        <Header overlay />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-[max(20px,env(safe-area-inset-bottom))] pt-[18vh]">
          <p className="cut-kicker">{product.character}</p>
          <h1 className="cut-quote keep-all mt-2 max-w-[20em] text-[24px] leading-snug sm:text-[26px]">
            {title}
          </h1>
          <p className="keep-all mt-5 font-serif text-[18px] text-[#f3ead8] [text-shadow:0_2px_14px_rgba(0,0,0,0.75)]">
            {product.price > 0 ? formatPrice(product.price) : "무료"}
          </p>
          <Link
            href={ctaHref}
            className="pill-cream mt-3 flex h-12 items-center justify-center rounded-full text-[15px]"
          >
            {ctaLabel}
          </Link>
        </div>
      </FrameMedia>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import type { Product } from "@/lib/data/products";
import { BackBar } from "./Header";

export function IntroClient({ product }: { product: Product }) {
  const router = useRouter();
  const sp = useSearchParams();
  const step = sp.get("step") === "1" ? 1 : 0;
  const quote = product.introLines[step] ?? product.introLines[0];
  const btn = step === 0 ? "좋아요, 제 이름은…" : "내 얘기를 들려줄게";

  function next() {
    if (step === 0) router.push(`/s/${product.slug}/intro?step=1`);
    else router.push(`/s/${product.slug}/input`);
  }

  return (
    <div className="relative h-[100dvh] overflow-hidden bg-black">
      <Image
        src={product.funnel}
        alt={product.character}
        fill
        priority
        sizes="430px"
        className="object-cover"
        style={{ objectPosition: product.objectPos ?? "center 18%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/25" />
      <BackBar href={`/s/${product.slug}`} light />
      <div className="absolute inset-x-0 bottom-0 px-6 pb-[max(28px,env(safe-area-inset-bottom))]">
        <p className="font-serif text-[22px] leading-snug text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
          “{quote}”
        </p>
        <p className="mt-2 text-[13px] text-white/70">{product.character}</p>
        <button
          type="button"
          onClick={next}
          className="mt-6 h-12 w-full rounded-full bg-white/95 text-[15px] font-semibold text-ink"
        >
          {btn}
        </button>
      </div>
    </div>
  );
}

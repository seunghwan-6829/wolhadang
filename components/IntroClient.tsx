"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Product } from "@/lib/data/products";
import { BackBar } from "./Header";
import { FrameMedia } from "./FrameMedia";

export function IntroClient({ product }: { product: Product }) {
  const router = useRouter();
  const sp = useSearchParams();
  const step = sp.get("step") === "1" ? 1 : 0;
  const quote = product.introLines[step] ?? product.introLines[0];
  const btn = step === 0 ? "어디가 막혔나" : "이름을 대지";

  function next() {
    if (step === 0) router.push(`/s/${product.slug}/intro?step=1`);
    else router.push(`/s/${product.slug}/input`);
  }

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#161412]">
      <FrameMedia
        src={product.funnel}
        alt={product.character}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
        <BackBar href={`/s/${product.slug}`} light />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-[max(28px,env(safe-area-inset-bottom))]">
          <p className="font-serif text-[22px] leading-snug text-[#f3ead8]">
            “{quote}”
          </p>
          <p className="mt-2 text-[13px] text-white/60">{product.character}</p>
          <button
            type="button"
            onClick={next}
            className="mt-6 h-12 w-full rounded-full bg-[#f3ead8] text-[15px] font-semibold text-ink"
          >
            {btn}
          </button>
        </div>
      </FrameMedia>
    </div>
  );
}

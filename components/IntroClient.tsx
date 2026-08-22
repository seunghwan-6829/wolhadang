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
    <div className="relative h-dvh overflow-hidden bg-[#161412]">
      <FrameMedia
        src={product.funnel}
        videoSrc={product.video || product.videoBg}
        alt={product.character}
        fill
      >
        <BackBar href={`/s/${product.slug}`} light />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-[max(28px,env(safe-area-inset-bottom))]">
          <p className="cut-quote text-[24px] leading-snug">“{quote}”</p>
          <p className="cut-speaker">{product.character}</p>
          <button
            type="button"
            onClick={next}
            className="pill-cream mt-6 h-12 w-full rounded-full text-[15px]"
          >
            {btn}
          </button>
        </div>
      </FrameMedia>
    </div>
  );
}

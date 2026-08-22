"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Product } from "@/lib/data/products";
import { BackBar } from "./Header";
import { FrameMedia } from "./FrameMedia";

export function IntroClient({ product }: { product: Product }) {
  const router = useRouter();
  const sp = useSearchParams();
  const lines = product.introLines.length ? product.introLines : [product.hook];
  const replies = product.introReplies;
  const raw = Number(sp.get("step") || "0");
  const step = Number.isFinite(raw) ? Math.min(Math.max(0, raw), lines.length - 1) : 0;
  const quote = lines[step] ?? product.hook;
  const btn = replies[step] ?? "좋아, 내 이름은..";

  function next() {
    if (step < lines.length - 1) {
      router.push(`/s/${product.slug}/intro?step=${step + 1}`);
    } else {
      router.push(`/s/${product.slug}/input`);
    }
  }

  return (
    <div className="lock-screen relative h-dvh overflow-hidden bg-[#161412]">
      <FrameMedia
        src={product.funnel}
        videoSrc={product.video || product.videoBg}
        alt={product.character}
        fill
      >
        <BackBar href={step === 0 ? `/s/${product.slug}` : `/s/${product.slug}/intro`} light />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-[max(28px,env(safe-area-inset-bottom))]">
          <p className="cut-quote keep-all text-[24px] leading-snug">“{quote}”</p>
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

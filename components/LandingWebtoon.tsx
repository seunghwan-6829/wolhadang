"use client";

import { Header } from "./Header";
import { FrameMedia } from "./FrameMedia";
import { StickyCta } from "./StickyCta";
import { CutOverlay } from "./CutOverlay";
import { formatPrice, type Product } from "@/lib/data/products";
import type { SampleReview } from "@/lib/data/reviews";

export function LandingWebtoon({
  product,
  reviews,
}: {
  product: Product;
  reviews: SampleReview[];
}) {
  const free = product.price <= 0;
  const still = product.poster;
  const heroVid = product.video;
  const bgVid = product.videoBg || product.video;
  const shown = reviews.slice(0, 2);

  return (
    <div className="relative h-dvh overflow-hidden bg-[#161412]">
      <div className="snap-y-mandatory">
        <section className="snap-cut">
          <FrameMedia src={still} videoSrc={heroVid} alt={product.character} fill>
            <Header overlay />
            <CutOverlay kicker={product.character} speaker={undefined}>
              <h1 className="font-serif text-[36px] font-bold leading-none text-[#f3ead8]">
                {product.shortName}
              </h1>
              <p className="mt-3 font-serif text-[18px] font-semibold leading-snug text-[#f3ead8]">
                “{product.hook}”
              </p>
            </CutOverlay>
          </FrameMedia>
        </section>

        {product.landingCuts.map((line, i) => (
          <section className="snap-cut" key={`${i}-${line}`}>
            <FrameMedia
              src={still}
              videoSrc={i % 2 === 0 ? bgVid : heroVid}
              alt={product.character}
              fill
            >
              <CutOverlay speaker={product.character}>{line}</CutOverlay>
            </FrameMedia>
          </section>
        ))}

        <section className="snap-cut">
          <FrameMedia src={product.funnel} videoSrc={bgVid} alt={product.character} fill>
            <CutOverlay kicker="이 풀이에서" speaker={product.character}>
              {product.beatLine}
            </CutOverlay>
          </FrameMedia>
        </section>

        <section className="snap-cut">
          <FrameMedia src={product.story} videoSrc={heroVid} alt={product.character} fill>
            <div className="absolute inset-x-0 bottom-0 px-5 pb-[calc(108px+env(safe-area-inset-bottom))]">
              <p className="cut-kicker">다녀간 사람들</p>
              <div className="mt-3 space-y-2">
                {shown.map((r) => (
                  <blockquote
                    key={r.id}
                    className="rounded-2xl border border-white/15 bg-black/45 px-4 py-3 backdrop-blur-sm"
                  >
                    <p className="text-[14px] leading-6 text-[#f3ead8] [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
                      “{r.text}”
                    </p>
                    <p className="mt-1.5 text-[11px] text-white/50">
                      {r.maskedName} · {r.ago}
                    </p>
                  </blockquote>
                ))}
              </div>
            </div>
          </FrameMedia>
        </section>
      </div>

      <StickyCta
        href={`/s/${product.slug}/intro`}
        label={product.cta}
        sub={free ? "무료" : formatPrice(product.price)}
        tone="dark"
      />
    </div>
  );
}

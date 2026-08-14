import Image from "next/image";
import { SAMPLE_REVIEWS } from "@/lib/data/reviews";

export function ReviewTicker() {
  // 예시 데이터 — 광고/데모용 샘플 리뷰입니다.
  const items = [...SAMPLE_REVIEWS, ...SAMPLE_REVIEWS];
  return (
    <section className="py-4">
      <p className="mb-3 px-4 text-[13px] font-semibold text-ink">실시간 유저 리뷰</p>
      <div className="overflow-hidden">
        <div className="ticker-track flex w-max gap-2.5">
          {items.map((r, i) => (
            <article
              key={`${r.id}-${i}`}
              className="flex w-[220px] shrink-0 gap-2.5 rounded-2xl border border-line bg-white px-3 py-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
            >
              <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-neutral-200">
                <Image
                  src={r.avatar}
                  alt=""
                  fill
                  sizes="36px"
                  className="object-cover object-[center_18%]"
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] text-sub">
                  {r.maskedName}
                  <span className="ml-1 text-neutral-400">{r.productLabel}</span>
                </p>
                <p className="text-[11px] leading-none text-[#f5c518]">★★★★★</p>
                <p className="mt-0.5 truncate text-[12px] text-ink">{r.text}</p>
                <p className="text-[10px] text-neutral-400">{r.ago}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

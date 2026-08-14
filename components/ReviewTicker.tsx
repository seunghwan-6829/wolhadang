import { SAMPLE_REVIEWS } from "@/lib/data/reviews";

export function ReviewTicker() {
  const items = [...SAMPLE_REVIEWS, ...SAMPLE_REVIEWS];
  return (
    <section className="py-4">
      <p className="mb-3 px-4 text-[13px] font-semibold text-ink">다녀간 사람들</p>
      <div className="overflow-hidden">
        <div className="ticker-track flex w-max gap-2.5">
          {items.map((r, i) => (
            <article
              key={`${r.id}-${i}`}
              className="flex w-[220px] shrink-0 gap-2.5 rounded-2xl border border-line bg-paper px-3 py-2.5"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-seal text-[11px] font-serif font-bold text-white">
                {r.maskedName.slice(0, 1)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] text-sub">
                  {r.maskedName}
                  <span className="ml-1 text-neutral-400">{r.productLabel}</span>
                </p>
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

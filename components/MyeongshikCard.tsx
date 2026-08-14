import type { ComputedSaju, PillarView } from "@/lib/saju/types";
import { ELEMENT_COLOR } from "@/lib/saju/constants";

function Cell({ p, part }: { p: PillarView; part: "stem" | "branch" }) {
  const el = part === "stem" ? p.stemElement : p.branchElement;
  const han = part === "stem" ? p.stemHanja : p.branchHanja;
  const ko = part === "stem" ? p.stemKo : p.branchKo;
  if (p.omitted) {
    return (
      <div className="flex h-14 items-center justify-center rounded-lg bg-neutral-100 text-[11px] text-sub">
        —
      </div>
    );
  }
  return (
    <div className="flex h-14 flex-col items-center justify-center rounded-lg bg-neutral-50">
      <span className="font-serif text-xl leading-none" style={{ color: ELEMENT_COLOR[el] }}>
        {han}
      </span>
      <span className="mt-0.5 text-[10px] text-sub">
        {ko} · {el}
      </span>
    </div>
  );
}

export function MyeongshikCard({ saju }: { saju: ComputedSaju }) {
  const order: PillarView[] = ["year", "month", "day", "hour"].map(
    (k) => saju.pillars.find((p) => p.key === k)!,
  );
  return (
    <div className="rounded-2xl border border-line bg-white p-4">
      <p className="text-[11px] text-sub">명식 · 참고용</p>
      <p className="mt-0.5 font-serif text-[16px] text-ink">
        {saju.input.name} · {saju.dayMasterYinYang}
        {saju.dayMasterElement} {saju.dayMasterHanja}
        {saju.dayMaster}
      </p>
      <div className="mt-3 grid grid-cols-4 gap-1.5 text-center text-[11px] text-sub">
        {order.map((p) => (
          <p key={p.key}>{p.label}</p>
        ))}
        {order.map((p) => (
          <Cell key={`${p.key}-s`} p={p} part="stem" />
        ))}
        {order.map((p) => (
          <Cell key={`${p.key}-b`} p={p} part="branch" />
        ))}
      </div>
      {saju.hourUnknown ? (
        <p className="mt-2 text-[11px] text-sub">시간 모름 · 시주 생략</p>
      ) : null}
    </div>
  );
}

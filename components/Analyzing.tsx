import { Seal } from "./Seal";

export function Analyzing({
  name,
  character,
}: {
  name: string;
  character?: string;
}) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-paper px-6 text-center">
      <span className="mb-6 inline-flex">
        <Seal size={48} />
      </span>
      <p className="text-[12px] tracking-[0.2em] text-sub">터줏 김선생</p>
      <h1 className="mt-2 font-serif text-[22px] text-ink">막힌 곳을 찾고 있다</h1>
      <p className="mt-2 text-[14px] text-sub">
        {character ? `${character}, ` : ""}
        {name}의 사주를 펼친다.
      </p>
      <div className="mt-8 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="pulse-dot h-1.5 w-1.5 rounded-full bg-ink"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>
    </div>
  );
}

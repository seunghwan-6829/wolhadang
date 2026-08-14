export function Analyzing({
  name,
  character,
}: {
  name: string;
  character?: string;
}) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-white px-6 text-center">
      <span className="seal mb-6" style={{ width: 48, height: 48, fontSize: 16 }}>
        <span>
          月
          <br />
          下
        </span>
      </span>
      <p className="text-[12px] tracking-[0.2em] text-sub">月下堂</p>
      <h1 className="mt-2 font-serif text-[22px] text-ink">사주를 펼치는 중</h1>
      <p className="mt-2 text-[14px] text-sub">
        {character ? `${character}가 ` : ""}
        {name}의 일주를 읽고 있어요.
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

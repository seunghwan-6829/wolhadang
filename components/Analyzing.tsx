import { FrameMedia } from "./FrameMedia";
import { Seal } from "./Seal";

export function Analyzing({
  name,
  character,
  still,
  videoSrc,
}: {
  name: string;
  character?: string;
  still?: string;
  videoSrc?: string;
}) {
  return (
    <div className="relative flex h-dvh flex-col items-center justify-center overflow-hidden bg-[#161412] px-6 text-center">
      {still || videoSrc ? (
        <FrameMedia src={still} videoSrc={videoSrc} fill />
      ) : null}
      <div className="relative z-10">
        <span className="mb-6 inline-flex">
          <Seal size={48} />
        </span>
        <p className="cut-kicker">터줏 김선생</p>
        <h1 className="cut-quote mt-2 text-[22px]">막힌 곳을 찾고 있다</h1>
        <p className="mt-2 text-[14px] text-white/60 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
          {character ? `${character}, ` : ""}
          {name}의 사주를 펼친다.
        </p>
        <div className="mt-8 flex justify-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#f3ead8]"
              style={{ animationDelay: `${i * 0.18}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

import type { ReactNode } from "react";

export function CutOverlay({
  kicker,
  speaker,
  children,
  compact = false,
}: {
  kicker?: string;
  speaker?: string;
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <div
      className={`absolute inset-x-0 bottom-0 px-5 ${
        compact
          ? "pb-[calc(28px+env(safe-area-inset-bottom))]"
          : "pb-[calc(100px+env(safe-area-inset-bottom))]"
      }`}
    >
      {kicker ? <p className="cut-kicker">{kicker}</p> : null}
      <div className="cut-quote mt-2">{children}</div>
      {speaker ? <p className="cut-speaker">{speaker}</p> : null}
    </div>
  );
}

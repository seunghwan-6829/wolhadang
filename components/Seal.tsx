export function Seal({ size = 28 }: { size?: number }) {
  const fs = Math.round(size * 0.52);
  return (
    <span
      className="seal"
      style={{ width: size, height: size, fontSize: fs }}
      aria-hidden
    >
      <span>墨</span>
    </span>
  );
}

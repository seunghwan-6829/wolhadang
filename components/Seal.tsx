export function Seal({ size = 28 }: { size?: number }) {
  const fs = Math.round(size * 0.34);
  return (
    <span
      className="seal"
      style={{ width: size, height: size, fontSize: fs }}
      aria-hidden
    >
      <span>
        月
        <br />
        下
      </span>
    </span>
  );
}

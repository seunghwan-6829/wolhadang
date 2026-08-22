import Link from "next/link";
import { Seal } from "./Seal";

export function Logo({
  size = "md",
  light = false,
}: {
  size?: "sm" | "md" | "lg";
  light?: boolean;
}) {
  const seal = size === "lg" ? 36 : size === "sm" ? 26 : 28;
  const text =
    size === "lg" ? "text-[20px]" : size === "sm" ? "text-[16px]" : "text-[17px]";
  return (
    <Link href="/" className="flex items-center gap-2">
      <Seal size={seal} />
      <span
        className={`font-serif font-bold tracking-tight ${text} ${
          light ? "text-[#f3ead8]" : "text-ink"
        }`}
      >
        묵헌
      </span>
    </Link>
  );
}

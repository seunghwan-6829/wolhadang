import Link from "next/link";
import { Seal } from "./Seal";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const seal = size === "lg" ? 36 : size === "sm" ? 26 : 28;
  const text =
    size === "lg" ? "text-[22px]" : size === "sm" ? "text-[17px]" : "text-[18px]";
  return (
    <Link href="/" className="flex items-center gap-2">
      <Seal size={seal} />
      <span className={`font-serif font-bold tracking-tight text-ink ${text}`}>
        월하당
      </span>
    </Link>
  );
}

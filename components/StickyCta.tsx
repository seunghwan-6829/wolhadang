import Link from "next/link";

export function StickyCta({
  href,
  label,
  sub,
  tone = "dark",
}: {
  href: string;
  label: string;
  sub?: string;
  tone?: "dark" | "paper";
}) {
  const wrap =
    tone === "dark"
      ? "bg-gradient-to-t from-black via-black/85 to-transparent"
      : "bg-gradient-to-t from-paper via-paper to-paper/0";
  const subCls = tone === "dark" ? "text-white/55" : "text-sub";
  return (
    <div
      className={`fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 ${wrap} px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-8`}
    >
      {sub ? (
        <p className={`mb-2 text-center text-[12px] ${subCls}`}>{sub}</p>
      ) : null}
      <Link
        href={href}
        className="cta-dark flex h-12 items-center justify-center rounded-full text-[15px]"
      >
        {label}
      </Link>
    </div>
  );
}

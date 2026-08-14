import Link from "next/link";

export function StickyCta({
  href,
  label,
  sub,
}: {
  href: string;
  label: string;
  sub?: string;
}) {
  return (
    <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 bg-gradient-to-t from-white via-white to-white/0 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-6">
      {sub ? (
        <p className="mb-2 text-center text-[12px] text-sub">{sub}</p>
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

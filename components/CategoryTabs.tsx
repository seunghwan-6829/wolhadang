import Link from "next/link";
import { TABS, type ProductTab } from "@/lib/data/products";

export function CategoryTabs({ active }: { active: "all" | ProductTab }) {
  return (
    <nav className="sticky top-12 z-30 flex bg-white px-2">
      {TABS.map((t) => {
        const on = active === t.id;
        return (
          <Link
            key={t.id}
            href={t.id === "all" ? "/" : `/?tab=${t.id}`}
            className={`relative flex-1 py-2.5 text-center text-[14px] ${
              on ? "font-bold text-ink" : "text-neutral-400"
            }`}
          >
            {t.label}
            {on ? (
              <span className="absolute inset-x-6 bottom-0 h-[2px] bg-ink" />
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

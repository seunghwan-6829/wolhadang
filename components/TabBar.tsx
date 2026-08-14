"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "홈", icon: HomeIcon, match: (p: string) => p === "/" },
  {
    href: "/s/today",
    label: "오늘의 운세",
    icon: SunIcon,
    match: (p: string) => p.startsWith("/s/today"),
  },
  {
    href: "/search",
    label: "검색",
    icon: SearchIcon,
    match: (p: string) => p.startsWith("/search"),
  },
  {
    href: "/archive",
    label: "보관함",
    icon: BoxIcon,
    match: (p: string) => p.startsWith("/archive"),
  },
];

export function TabBar() {
  const path = usePathname() || "/";
  return (
    <nav className="sticky bottom-0 z-30 border-t border-line bg-white pb-[max(8px,env(safe-area-inset-bottom))] pt-1">
      <ul className="grid grid-cols-4">
        {TABS.map((t) => {
          const on = t.match(path);
          return (
            <li key={t.href}>
              <Link
                href={t.href}
                className={`flex flex-col items-center gap-0.5 py-1.5 text-[10px] ${
                  on ? "text-ink" : "text-neutral-400"
                }`}
              >
                <t.icon on={on} />
                {t.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function HomeIcon({ on }: { on: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={on ? "#111" : "none"}>
      <path
        d="M4 10.5L12 4L20 10.5V20H15V14H9V20H4V10.5Z"
        stroke="#111"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function SunIcon({ on }: { on: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4" stroke="#111" strokeWidth={on ? 2 : 1.6} />
      <path
        d="M12 3V5M12 19V21M3 12H5M19 12H21M5.6 5.6L7 7M17 17L18.4 18.4M18.4 5.6L17 7M7 17L5.6 18.4"
        stroke="#111"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function SearchIcon({ on }: { on: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="6.5" stroke="#111" strokeWidth={on ? 2 : 1.6} />
      <path d="M16 16L20.5 20.5" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function BoxIcon({ on }: { on: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 8.5L12 5L19 8.5V16.5L12 20L5 16.5V8.5Z"
        stroke="#111"
        strokeWidth={on ? 2 : 1.6}
        strokeLinejoin="round"
      />
      <path d="M5 8.5L12 12L19 8.5M12 12V20" stroke="#111" strokeWidth="1.5" />
    </svg>
  );
}

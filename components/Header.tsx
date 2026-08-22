"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";

const MENU: [string, string][] = [
  ["/", "홈"],
  ["/s/makhin", "정통사주"],
  ["/s/today", "오늘의 한 줄"],
  ["/s/jaemul", "재물"],
  ["/archive", "보관함"],
];

export function Header({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header
      className={
        overlay
          ? "absolute inset-x-0 top-0 z-40 bg-gradient-to-b from-black/60 to-transparent"
          : "sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur"
      }
    >
      <div className="flex h-12 items-center justify-between px-3">
        <Logo size="sm" light={overlay} />
        <button
          type="button"
          aria-label="메뉴"
          onClick={() => setOpen(true)}
          className="grid h-10 w-10 place-items-center"
        >
          <span className="flex flex-col gap-[5px]">
            <i className={`block h-[1.5px] w-[18px] ${overlay ? "bg-[#f3ead8]" : "bg-ink"}`} />
            <i className={`block h-[1.5px] w-[18px] ${overlay ? "bg-[#f3ead8]" : "bg-ink"}`} />
            <i className={`block h-[1.5px] w-[18px] ${overlay ? "bg-[#f3ead8]" : "bg-ink"}`} />
          </span>
        </button>
      </div>
      {open ? (
        <div className="fixed inset-0 z-50 mx-auto max-w-[430px] bg-paper">
          <div className="flex h-12 items-center justify-between px-3">
            <Logo size="sm" />
            <button
              type="button"
              aria-label="닫기"
              onClick={() => setOpen(false)}
              className="grid h-10 w-10 place-items-center text-xl"
            >
              ×
            </button>
          </div>
          <nav className="px-6 pt-8">
            {MENU.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="block border-b border-line py-4 font-serif text-[18px] text-ink"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export function BackBar({
  href,
  light = false,
  fixed = false,
}: {
  href: string;
  light?: boolean;
  fixed?: boolean;
}) {
  return (
    <div
      className={
        fixed
          ? "fixed left-1/2 top-0 z-20 flex h-12 w-full max-w-[430px] -translate-x-1/2 items-center px-2"
          : "absolute left-0 right-0 top-0 z-20 flex h-12 items-center px-2"
      }
    >
      <Link
        href={href}
        aria-label="뒤로"
        className={`grid h-10 w-10 place-items-center rounded-full ${
          light ? "text-[#f3ead8]" : "text-ink"
        }`}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 5L8 12L15 19"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
}

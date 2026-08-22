"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** landing / intro / input only — story/result stays a normal vertical webtoon scroll */
const LOCKED =
  /^\/$|^\/s\/[^/]+$|^\/s\/[^/]+\/intro$|^\/s\/[^/]+\/input$/;

export function ScreenLock() {
  const pathname = usePathname() || "/";

  useEffect(() => {
    const lock = LOCKED.test(pathname);
    const root = document.documentElement;
    root.classList.toggle("screen-lock", lock);
    document.body.classList.toggle("screen-lock", lock);
    return () => {
      root.classList.remove("screen-lock");
      document.body.classList.remove("screen-lock");
    };
  }, [pathname]);

  return null;
}

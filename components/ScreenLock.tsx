"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** landing / intro / input / story — lock-screen, one viewport, no scroll */
const LOCKED =
  /^\/$|^\/s\/[^/]+$|^\/s\/[^/]+\/intro$|^\/s\/[^/]+\/input$|^\/s\/[^/]+\/story\/?$/;

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

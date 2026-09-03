"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function NavigationScrollManager() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const historyTraversal = useRef(false);

  useEffect(() => {
    const handlePopState = () => {
      historyTraversal.current = true;
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (previousPathname.current === pathname) return;

    previousPathname.current = pathname;
    const shouldRestoreHistoryPosition = historyTraversal.current;
    historyTraversal.current = false;

    if (shouldRestoreHistoryPosition || window.location.hash) return;

    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}

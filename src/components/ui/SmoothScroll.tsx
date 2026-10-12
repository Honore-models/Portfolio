"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Inertia-based smooth scrolling for wheel/trackpad; touch stays native. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      wheelMultiplier: 1,
      anchors: true,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}

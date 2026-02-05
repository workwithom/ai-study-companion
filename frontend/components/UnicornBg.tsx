"use client";

import { useEffect, useRef } from "react";

export default function UnicornBg() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    if (!window || (window as any).UnicornStudio) return;

    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
    script.async = true;

    script.onload = () => {
      const US = (window as any).UnicornStudio;
      if (US && !US.isInitialized) {
        US.init();
        US.isInitialized = true;
      }
    };

    document.body.appendChild(script);

    return () => {
      // DO NOT remove script (avoids re-init glitches)
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-us-project="qF3qXhdiOxdUeQYH8wCK"
      className="absolute inset-0 -z-10"
    />
  );
}

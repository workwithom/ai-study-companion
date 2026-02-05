"use client";

import { ReactNode, useEffect, useRef } from "react";

export default function ElasticScroll({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const overscroll = useRef(0);
  const releaseTimer = useRef<number | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const release = () => {
      wrapper.style.transition =
        "transform 1.8s cubic-bezier(0.19, 1, 0.22, 1)";
      wrapper.style.transform = "translateY(0)";
      overscroll.current = 0;
    };

    const handleWheel = (e: WheelEvent) => {
      const scrollTop = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const atTop = scrollTop <= 0;
      const atBottom = scrollTop >= maxScroll - 1;

      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        e.preventDefault();

        overscroll.current += e.deltaY * 0.3;
        overscroll.current = Math.max(
          Math.min(overscroll.current, 100),
          -100
        );

        wrapper.style.transition = "none";
        wrapper.style.transform = `translateY(${-overscroll.current}px)`;

        // 🔑 reset release timer
        if (releaseTimer.current) {
          clearTimeout(releaseTimer.current);
        }

        releaseTimer.current = window.setTimeout(release, 160);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (releaseTimer.current) clearTimeout(releaseTimer.current);
    };
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}

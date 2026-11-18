"use client";

import { useSpring } from "motion/react";
import { useEffect, useRef } from "react";

const COUNT = 10;
const SIZES = Array.from({ length: COUNT }, (_, index) => 22 - index * 1.3);

export function LiquidCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dots = useRef<Array<HTMLSpanElement | null>>([]);
  const headX = useSpring(0, { duration: 0.5, bounce: 0.2 });
  const headY = useSpring(0, { duration: 0.5, bounce: 0.2 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    const trail = Array.from({ length: COUNT }, () => ({ x: 0, y: 0 }));
    let visible = false;
    let frame = 0;

    const paint = () => {
      trail[0].x = headX.get();
      trail[0].y = headY.get();

      for (let index = 1; index < COUNT; index += 1) {
        const previous = trail[index - 1];
        const point = trail[index];
        point.x += (previous.x - point.x) * 0.48;
        point.y += (previous.y - point.y) * 0.48;
      }

      for (let index = 0; index < COUNT; index += 1) {
        const dot = dots.current[index];
        if (!dot) continue;
        const point = trail[index];
        dot.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%)`;
      }

      frame = requestAnimationFrame(paint);
    };

    const reveal = (x: number, y: number) => {
      if (visible) return;
      visible = true;
      headX.jump(x);
      headY.jump(y);
      for (const point of trail) {
        point.x = x;
        point.y = y;
      }
      rootRef.current?.style.setProperty("opacity", "1");
      frame = requestAnimationFrame(paint);
    };

    const onMove = (event: PointerEvent) => {
      reveal(event.clientX, event.clientY);
      headX.set(event.clientX);
      headY.set(event.clientY);
    };

    const hide = () => {
      visible = false;
      cancelAnimationFrame(frame);
      rootRef.current?.style.setProperty("opacity", "0");
    };

    const onVisibility = () => {
      if (document.hidden) hide();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", hide);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [headX, headY]);

  return (
    <div ref={rootRef} className="liquid-cursor" aria-hidden="true">
      <svg className="liquid-cursor-filter" aria-hidden="true">
        <filter id="liquid-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
          />
        </filter>
      </svg>
      <div className="liquid-cursor-dots">
        {SIZES.map((size, index) => (
          <span
            key={index}
            ref={(node) => {
              dots.current[index] = node;
            }}
            className="liquid-dot"
            style={{ width: size, height: size }}
          />
        ))}
      </div>
    </div>
  );
}

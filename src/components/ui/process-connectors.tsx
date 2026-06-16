"use client";

import { useEffect, useRef, useState } from "react";

const STEP_COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#f59e0b",
  "#10b981",
  "#f43f5e",
  "#22d3ee",
];

interface ProcessConnectorsProps {
  stepCount: number;
}

export function ProcessConnectors({ stepCount }: ProcessConnectorsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Generate connector lines between adjacent cards in a 3-column grid
  const connectors: Array<{
    row: number;
    fromCol: number;
    toCol: number;
    color: string;
    delay: number;
  }> = [];

  for (let i = 0; i < stepCount - 1; i++) {
    const row = Math.floor(i / 3);
    const col = i % 3;
    const nextRow = Math.floor((i + 1) / 3);

    if (nextRow === row) {
      // Same row — horizontal connector
      connectors.push({
        row,
        fromCol: col,
        toCol: col + 1,
        color: STEP_COLORS[i] ?? "#3b82f6",
        delay: i * 150,
      });
    }
  }

  // Also add vertical connectors between rows (from last col of row to first col of next row)
  const totalRows = Math.ceil(stepCount / 3);
  for (let r = 0; r < totalRows - 1; r++) {
    const lastInRow = Math.min((r + 1) * 3 - 1, stepCount - 1);
    connectors.push({
      row: r,
      fromCol: lastInRow % 3,
      toCol: -1, // signals a vertical connector
      color: STEP_COLORS[lastInRow] ?? "#3b82f6",
      delay: lastInRow * 150,
    });
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none hidden lg:block"
      aria-hidden="true"
    >
      {/* Horizontal flowing line under each row */}
      {visible &&
        Array.from({ length: Math.ceil(stepCount / 3) }, (_, rowIndex) => {
          const startColor = STEP_COLORS[rowIndex * 3] ?? "#3b82f6";
          const endColor = STEP_COLORS[Math.min(rowIndex * 3 + 2, stepCount - 1)] ?? "#3b82f6";
          return (
            <div
              key={rowIndex}
              className="absolute h-[2px] opacity-30"
              style={{
                top: `calc(${(rowIndex + 1) * (100 / Math.ceil(stepCount / 3))}% - 10px)`,
                left: "10%",
                right: "10%",
                background: `linear-gradient(to left, ${startColor}, ${endColor})`,
                transform: visible ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "right",
                transition: `transform 1s ease-out ${rowIndex * 0.3}s`,
              }}
            />
          );
        })}
    </div>
  );
}

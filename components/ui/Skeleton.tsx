import React from "react";
import { cn } from "../../lib/utils";

// Minimal CSS-only pulsing animation class applied
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[var(--bg-tertiary)]", className)}
      {...props}
    />
  );
}

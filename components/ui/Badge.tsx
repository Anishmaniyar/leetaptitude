import React from "react";
import { cn } from "../../lib/utils";

export function Badge({ className, children, variant = "default" }: { className?: string; children: React.ReactNode; variant?: "default" | "success" | "error" }) {
  const baseStyle = "badge inline-flex items-center justify-center font-medium capitalize";
  const variants = {
    default: "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border-[var(--border)]",
    success: "bg-[rgba(34,197,94,0.1)] text-[var(--success)] border-[var(--success)]",
    error: "bg-[rgba(239,68,68,0.1)] text-[var(--error)] border-[var(--error)]"
  };

  return (
    <span className={cn(baseStyle, variants[variant], className)}>
      {children}
    </span>
  );
}

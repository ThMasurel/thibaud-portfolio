import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({
  children,
  className = "",
  hover = true,
}: GlassCardProps) {
  return (
    <div
      className={`glass rounded-2xl p-6 ${
        hover
          ? "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/5"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

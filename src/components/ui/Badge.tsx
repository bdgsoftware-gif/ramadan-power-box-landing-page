import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
}

export default function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-block rounded-full bg-button-accent px-4 py-1 text-xs font-semibold text-text-inverse">
      {children}
    </span>
  );
}

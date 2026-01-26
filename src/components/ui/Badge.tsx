import { ReactNode } from "react";

export default function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-button-accent px-4 py-1 text-xs font-semibold text-text-inverse">
      {children}
    </span>
  );
}

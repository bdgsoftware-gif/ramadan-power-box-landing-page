import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function Container({ children, className, id }: ContainerProps) {
  return (
    <div id={id} className={`mx-auto w-full max-w-8xl px-4 ${className ?? ""}`}>
      {children}
    </div>
  );
}

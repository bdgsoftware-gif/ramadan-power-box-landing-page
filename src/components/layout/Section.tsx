import { ReactNode } from "react";
import clsx from "clsx";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  paddedBottom?: boolean;
}

export default function Section({
  children,
  className,
  id,
  paddedBottom = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={clsx(
        "py-12 sm:py-20",
        paddedBottom && "pb-28 sm:pb-20",
        className,
      )}
    >
      {children}
    </section>
  );
}

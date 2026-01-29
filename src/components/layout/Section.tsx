import type { ReactNode } from "react";
import { forwardRef } from "react";
import clsx from "clsx";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  paddedBottom?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { children, className, id, paddedBottom = false },
  ref,
) {
  return (
    <section
      ref={ref}
      id={id}
      className={clsx(
        "py-12 lg:py-20",
        paddedBottom && "pb-28 xl:pb-20",
        className,
      )}
    >
      {children}
    </section>
  );
});

export default Section;

import { type ReactNode, forwardRef } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, id }, ref) => {
    return (
      <div
        ref={ref}
        id={id}
        className={`mx-auto w-full max-w-8xl px-4 ${className ?? ""}`}
      >
        {children}
      </div>
    );
  },
);

Container.displayName = "Container";
export default Container;

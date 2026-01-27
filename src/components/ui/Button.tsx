import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  variant?: "primary" | "premium" | "standard";
}

export default function Button({
  fullWidth,
  variant = "standard",
  className,
  children,
  ...props
}: ButtonProps) {
  const hasCustomPadding =
    className && /(^|\s)([a-z0-9]+:)?p[xytrbls]?-/.test(className);

  const defaultPadding = variant === "standard" ? "px-6 py-2" : "px-8 py-4";

  return (
    <button
      {...props}
      className={clsx(
        "inline-flex items-center justify-center transition-all duration-300 active:scale-[0.98] font-medium md:font-semibold",
        !hasCustomPadding && defaultPadding,

        variant === "standard" &&
          "animate-button-shake rounded-full text-lg bg-gradient-to-r from-button-primary/50 via-button-primary to-button-primary/50 text-black border-2 border-[#0F3D2E] shadow-lg hover:shadow-button-primary/20",

        variant === "primary" &&
          "gap-1 md:gap-2 rounded-full text-sm md:text-lg bg-gradient-to-r from-button-primary/50 via-button-primary to-button-primary/50 text-black border-2 border-[#0F3D2E] animate-pulse shadow-lg hover:shadow-button-primary/20",

        variant === "premium" &&
          "gap-2 md:gap-3 rounded-full text-sm md:text-lg bg-gradient-to-r from-[#1B634C] via-[#0F3D2E] to-[#1B634C] text-white border-2 border-[#C9A14A] animate-pulse shadow-lg hover:shadow-[#C9A14A]/20",

        // 4. OVERRIDES & UTILITIES
        fullWidth && "w-full",
        className,
      )}
    >
      {children}
    </button>
  );
}

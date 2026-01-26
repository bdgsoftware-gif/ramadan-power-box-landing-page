import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

export default function Button({
  fullWidth,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "inline-flex items-center justify-center rounded-full bg-button-primary px-6 py-3 text-sm font-semibold text-text-inverse active:scale-[0.98]",
        fullWidth && "w-full",
        className,
      )}
    />
  );
}

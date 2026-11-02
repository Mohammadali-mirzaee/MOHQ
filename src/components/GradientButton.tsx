import type { ReactNode } from "react";
import { cn } from "../lib/utils";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline" | "ghost";
  size?: "md" | "sm";
  className?: string;
  external?: boolean;
};

/**
 * Pill button with the accent-gradient ring that fades in on hover.
 * The ring is an absolute span sitting 2px outside the pill.
 */
export default function GradientButton({
  children,
  href,
  onClick,
  variant = "solid",
  size = "md",
  className,
  external,
}: Props) {
  const inner = (
    <>
      <span
        aria-hidden
        className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        className={cn(
          "relative inline-flex items-center gap-2 rounded-full transition-colors duration-300",
          size === "md" ? "px-7 py-3.5 text-sm" : "px-5 py-2.5 text-sm",
          variant === "solid" &&
            "bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary",
          variant === "outline" &&
            "border-2 border-stroke bg-bg text-text-primary group-hover:border-transparent",
          variant === "ghost" &&
            "border border-stroke bg-surface text-text-primary group-hover:border-transparent",
        )}
      >
        {children}
      </span>
    </>
  );

  const classes = cn(
    "group relative inline-flex rounded-full transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4E85BF] focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
    className,
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={classes}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}

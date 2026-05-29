"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
  {
    variants: {
      variant: {
        default:
          "bg-[linear-gradient(180deg,#FFE36A_0%,#FFD600_100%)] text-[#2A2200] shadow-[0_16px_28px_rgba(255,214,0,0.22)] hover:-translate-y-0.5 hover:shadow-[0_20px_34px_rgba(255,214,0,0.26)]",
        dark:
          "bg-[linear-gradient(180deg,#2C2A2A_0%,#1C1B1B_100%)] text-white shadow-[0_16px_28px_rgba(28,27,27,0.16)] hover:-translate-y-0.5 hover:shadow-[0_20px_34px_rgba(28,27,27,0.22)]",
        outline:
          "border border-black/10 bg-white/88 text-[#1C1B1B] shadow-[0_8px_18px_rgba(28,27,27,0.05)] hover:bg-white hover:-translate-y-0.5",
        ghost: "text-[#1C1B1B] hover:bg-black/[0.04]",
        danger: "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        default: "px-4 py-2.5",
        sm: "min-h-9 rounded-xl px-3 py-2 text-xs",
        lg: "min-h-12 rounded-[1.15rem] px-5 py-3 text-base",
        icon: "h-11 w-11 rounded-[1rem] p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

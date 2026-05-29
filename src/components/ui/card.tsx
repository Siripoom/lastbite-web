import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-[1.5rem] border backdrop-blur-sm transition-shadow",
  {
    variants: {
      variant: {
        default: "border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(255,255,255,0.86))] shadow-[0_16px_34px_rgba(28,27,27,0.06)]",
        soft: "border-[#EADFAF] bg-[linear-gradient(180deg,rgba(255,248,220,0.86),rgba(255,255,255,0.84))] shadow-[0_14px_28px_rgba(160,112,0,0.07)]",
        dark: "border-black/10 bg-[linear-gradient(180deg,#2A2828_0%,#1C1B1B_100%)] text-white shadow-[0_24px_50px_rgba(28,27,27,0.16)]",
        ghost: "border-black/6 bg-white/60 shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function Card({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>) {
  return (
    <div
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-1.5 p-4", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-lg font-bold", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4 pt-0", className)} {...props} />;
}

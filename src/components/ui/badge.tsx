import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold tracking-[0.02em]", {
  variants: {
    variant: {
      default: "border border-[#F0DE8F] bg-[#FFF7D8] text-[#6A5000]",
      dark: "border border-black/10 bg-[#1C1B1B] text-[#FFD95A]",
      success: "border border-green-200 bg-green-50 text-green-700",
      warning: "border border-amber-200 bg-amber-50 text-amber-800",
      danger: "border border-red-200 bg-red-50 text-red-700",
      outline: "border border-black/10 bg-white/90 text-[#1C1B1B]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant, className }))} {...props} />;
}

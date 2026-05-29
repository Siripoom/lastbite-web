import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, type, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={cn(
        "flex min-h-12 w-full rounded-2xl border border-black/8 bg-white/88 px-4 py-2 text-sm shadow-[0_10px_20px_rgba(28,27,27,0.04)] outline-none transition placeholder:text-[#5D5F5F]/70 focus:border-[#E0B800] focus:bg-white focus:ring-4 focus:ring-[#FFD600]/20 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export const Tabs = TabsPrimitive.Root;

export function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn("inline-flex rounded-2xl border border-black/8 bg-white/78 p-1.5 shadow-[0_10px_20px_rgba(28,27,27,0.04)]", className)}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn("rounded-xl px-4 py-2.5 text-sm font-semibold text-[#5D5F5F] transition data-[state=active]:bg-[#FFF7D8] data-[state=active]:text-[#1C1B1B] data-[state=active]:shadow-[0_10px_20px_rgba(160,112,0,0.08)]", className)}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content className={cn("mt-4", className)} {...props} />;
}

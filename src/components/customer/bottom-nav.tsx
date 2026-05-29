"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, SearchIcon, ShoppingBagIcon, UserRoundIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const items = [
  { href: "/app", label: "หน้าหลัก", icon: HomeIcon },
  { href: "/app/search", label: "ค้นหา", icon: SearchIcon },
  { href: "/app/orders", label: "ออเดอร์", icon: ShoppingBagIcon },
  { href: "/app/profile", label: "โปรไฟล์", icon: UserRoundIcon },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 md:hidden safe-bottom">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1 rounded-[1.6rem] border border-black/8 bg-white/92 p-2 shadow-[0_20px_40px_rgba(28,27,27,0.12)] backdrop-blur">
        {items.map((item) => {
          const active = pathname === item.href || (item.href !== "/app" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-h-12 flex-col items-center justify-center gap-1 rounded-[1rem] text-[11px] font-semibold text-[#6B675B] transition",
                active && "bg-[#FFF4C8] text-[#1C1B1B] shadow-[inset_0_0_0_1px_rgba(160,112,0,0.08)]",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

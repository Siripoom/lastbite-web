"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LayoutDashboardIcon, PackageIcon, ReceiptTextIcon, SettingsIcon, WalletIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { useMerchantStore } from "@/store/merchant";

const navItems = [
  { href: "/merchant", label: "หน้าหลัก", icon: LayoutDashboardIcon },
  { href: "/merchant/orders", label: "ออร์เดอร์", icon: ReceiptTextIcon },
  { href: "/merchant/products", label: "สินค้า", icon: PackageIcon },
  { href: "/merchant/withdraw", label: "ถอนเงิน", icon: WalletIcon },
  { href: "/merchant/settings", label: "ตั้งค่าร้านค้า", mobileLabel: "ตั้งค่า", icon: SettingsIcon },
];

export function MerchantShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { merchant, store } = useMerchantStore();

  return (
    <div className="page-shell min-h-screen">
      <header className="page-layer sticky top-0 z-40 px-4 pt-3 md:px-6">
        <div className="soft-panel mx-auto flex h-16 max-w-7xl items-center justify-between rounded-[1.35rem] px-4 md:px-5">
          <Link href="/" className="flex items-center gap-3">
            <img src="/lastbite-logo.png" alt="LastBite" className="h-10 w-auto" />
            <div className="hidden sm:block">
              <p className="text-sm font-black">Merchant Console</p>
              <p className="text-xs text-[#5D5F5F]">{store.name}</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold">{merchant.name}</p>
              <p className="text-xs text-[#5D5F5F]">ผู้ดูแลร้าน</p>
            </div>
            <Avatar>
              <AvatarFallback>{merchant.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="page-layer mx-auto grid max-w-7xl gap-6 px-4 py-6 pb-28 md:grid-cols-[250px_minmax(0,1fr)] md:px-6 md:pb-6">
        <aside className="soft-panel hidden space-y-2 rounded-[1.65rem] p-3 md:sticky md:top-24 md:block md:h-fit">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-h-12 items-center gap-3 rounded-[1.2rem] px-4 text-sm font-semibold text-[#5D5F5F] transition hover:bg-white",
                  active && "bg-[linear-gradient(180deg,#2C2A2A_0%,#1C1B1B_100%)] text-[#FFD95A] shadow-[0_18px_32px_rgba(28,27,27,0.12)]",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </aside>
        <main>{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 md:hidden safe-bottom">
        <div className="mx-auto grid max-w-md grid-cols-5 gap-1 rounded-[1.6rem] border border-black/8 bg-white/92 p-2 shadow-[0_20px_40px_rgba(28,27,27,0.12)] backdrop-blur">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/merchant" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-h-12 flex-col items-center justify-center gap-1 rounded-[1rem] px-1 text-[11px] font-semibold text-[#6B675B] transition",
                  active && "bg-[#FFF4C8] text-[#1C1B1B] shadow-[inset_0_0_0_1px_rgba(160,112,0,0.08)]",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="max-w-full truncate">{item.mobileLabel ?? item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

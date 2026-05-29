"use client";

import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ShoppingCartIcon } from "@/components/ui/icons";
import { BottomNav } from "@/components/customer/bottom-nav";
import { useCustomerStore } from "@/store/customer";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, cart } = useCustomerStore();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (user.isActive === false) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#FCF9F8] p-6">
        <div className="max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
          <h1 className="text-2xl font-extrabold">บัญชีถูกระงับ</h1>
          <p className="mt-3 text-sm leading-6 text-[#5D5F5F]">
            กรุณาติดต่อทีม LastBite เพื่อเปิดใช้งานบัญชีอีกครั้ง
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="page-shell min-h-screen pb-28 md:pb-0">
      <header className="page-layer sticky top-0 z-30 px-4 pt-3 md:px-6">
        <div className="soft-panel mx-auto flex h-16 max-w-6xl items-center justify-between rounded-[1.35rem] px-4 md:px-5">
          <Link href="/app" className="flex items-center gap-3">
            <img src="/lastbite-logo.png" alt="LastBite" className="h-10 w-auto" />
            <div className="hidden md:block">
              <p className="text-sm font-black text-[#1C1B1B]">LastBite</p>
              <p className="text-xs text-[#5D5F5F]">อาหารลดราคาใกล้คุณ</p>
            </div>
          </Link>
          <div className="hidden items-center gap-1 md:flex">
            <Link href="/app" className="rounded-2xl px-3.5 py-2 text-sm font-semibold text-[#5D5F5F] transition hover:bg-[#FFF7D8] hover:text-[#1C1B1B]">
              หน้าหลัก
            </Link>
            <Link href="/app/search" className="rounded-2xl px-3.5 py-2 text-sm font-semibold text-[#5D5F5F] transition hover:bg-[#FFF7D8] hover:text-[#1C1B1B]">
              ค้นหา
            </Link>
            <Link href="/app/orders" className="rounded-2xl px-3.5 py-2 text-sm font-semibold text-[#5D5F5F] transition hover:bg-[#FFF7D8] hover:text-[#1C1B1B]">
              ออเดอร์
            </Link>
            <Link href="/app/profile" className="rounded-2xl px-3.5 py-2 text-sm font-semibold text-[#5D5F5F] transition hover:bg-[#FFF7D8] hover:text-[#1C1B1B]">
              โปรไฟล์
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/app/cart" className="relative grid h-11 w-11 place-items-center rounded-2xl bg-[#FFF7D8] text-[#1C1B1B] shadow-[0_12px_24px_rgba(160,112,0,0.08)]">
              <ShoppingCartIcon className="h-5 w-5" />
              {cartCount ? <Badge className="absolute -right-2 -top-2 px-2 py-0.5">{cartCount}</Badge> : null}
            </Link>
            <Avatar>
              <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <main className="page-layer mx-auto w-full max-w-6xl px-4 py-5 md:px-6 md:py-8">{children}</main>
      <BottomNav />
    </div>
  );
}

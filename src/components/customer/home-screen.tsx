"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SearchIcon, SparklesIcon } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { ProductCard, SectionHeader, StoreCard } from "@/components/customer/catalog-cards";
import { useCustomerStore } from "@/store/customer";
import { useCatalogStore } from "@/store/catalog";

export function HomeScreen() {
  const user = useCustomerStore((state) => state.user);
  const categories = useCatalogStore((s) => s.categories);
  const products = useCatalogStore((s) => s.products);
  const stores = useCatalogStore((s) => s.stores);
  const availableProducts = products.filter((p) => p.status === "active" && p.stockLeft > 0);
  const visibleStores = stores.filter((s) => s.isActive && s.approvalStatus === "approved");
  const luckyBags = availableProducts.filter((product) => product.isLuckyBag);
  const deals = availableProducts.slice(0, 6);

  return (
    <div className="space-y-8">
      <section className="warm-panel grid gap-6 rounded-[2rem] p-6 text-[#221B00] md:grid-cols-[1fr_220px] md:p-8">
        <div>
          <p className="inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-sm font-semibold text-[#705D00]">
            สวัสดี {user.name}
          </p>
          <h1 className="font-display mt-3 text-3xl font-black leading-tight md:text-5xl">
            ตามหาดีลมื้อสุดท้ายใกล้คุณ
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#544600] md:text-base">
            เลือกอาหารคุณภาพดีจากร้านที่ยังมี stock และพร้อมรับในช่วงเวลาที่ร้านกำหนด
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/78 px-3 py-1.5 text-xs font-semibold">ดีลใหม่ทุกวัน</span>
            <span className="rounded-full bg-white/78 px-3 py-1.5 text-xs font-semibold">รับตามเวลาได้ชัดเจน</span>
            <span className="rounded-full bg-white/78 px-3 py-1.5 text-xs font-semibold">สั่งง่ายจากร้านเดียว</span>
          </div>
        </div>
        <div className="hidden rounded-[1.8rem] bg-[linear-gradient(180deg,rgba(28,27,27,0.95),rgba(28,27,27,0.82))] p-5 text-white md:block">
          <SparklesIcon className="h-8 w-8 text-[#FFD600]" />
          <p className="mt-8 text-4xl font-black">{deals.length}</p>
          <p className="mt-1 text-sm text-white/72">ดีลแนะนำวันนี้</p>
          <p className="mt-6 text-xs leading-5 text-white/68">Lucky Bag และอาหารพร้อมรับถูกรวมไว้ในหน้าเดียว</p>
        </div>
      </section>

      <Link href="/app/search" className="block">
        <div className="soft-panel relative rounded-[1.6rem] p-2">
          <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#5D5F5F]" />
          <Input className="h-13 border-0 bg-transparent pl-12 shadow-none focus:ring-0" readOnly placeholder="ค้นหาร้าน อาหาร หรือ Lucky Bag" />
        </div>
      </Link>

      <section className="space-y-4">
        <SectionHeader title="หมวดหมู่" />
        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/app/categories/${category.id}`}
              className="flex min-w-28 flex-col items-center gap-2 rounded-2xl bg-white p-4 text-center shadow-sm"
            >
              <span className="text-3xl">{category.icon}</span>
              <span className="text-sm font-bold">{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader title="ดีลแนะนำ" action={<Button asChild variant="ghost"><Link href="/app/search">ดูทั้งหมด</Link></Button>} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {deals.map((product) => (
            <ProductCard key={product.id} product={product} store={stores.find((s) => s.id === product.storeId)} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader title="Lucky Bag" />
        <div className="grid gap-4 md:grid-cols-3">
          {luckyBags.map((product) => (
            <ProductCard key={product.id} product={product} store={stores.find((s) => s.id === product.storeId)} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader title="ร้านใกล้คุณ" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visibleStores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </section>

      <Card variant="dark" className="p-5">
        <p className="text-sm font-semibold text-[#FFD600]">Mock PWA v1</p>
        <p className="mt-2 text-sm leading-6 text-white/75">
          เวอร์ชันนี้ใช้ seed data และ local state เพื่อให้ทดสอบ flow ลูกค้าได้ทันที ก่อนต่อ Firebase จริง
        </p>
      </Card>
    </div>
  );
}

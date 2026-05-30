"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon, Clock3Icon, Package2Icon, StoreIcon, WalletIcon } from "@/components/ui/icons";
import { useMerchantStore } from "@/store/merchant";
import { formatCurrency, orderStatusLabel } from "@/lib/utils";

export function MerchantDashboardScreen() {
  const { store, products, orders } = useMerchantStore();
  if (!store) return null;
  const activeProducts = products.filter((product) => product.status === "active");
  const openOrders = orders.filter((order) => ["waitingPickup", "preparing", "ready"].includes(order.status));
  const grossSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] bg-[linear-gradient(180deg,#2B2929_0%,#1C1B1B_100%)] p-6 text-white shadow-[0_30px_60px_rgba(28,27,27,0.14)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#FFD600]">ร้านค้าของคุณ</p>
            <h1 className="font-display mt-2 text-4xl font-black">{store.name}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/72">{store.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="dark">Pickup {store.pickupStartTime} - {store.pickupEndTime}</Badge>
            <Badge variant="outline" className="border-white/20 bg-white/10 text-white">
              {store.availableItems} รายการพร้อมขาย
            </Badge>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "สินค้า active", value: `${activeProducts.length}`, icon: Package2Icon },
          { label: "ออเดอร์ที่ต้องจัดการ", value: `${openOrders.length}`, icon: Clock3Icon },
          { label: "ยอดขายรวม", value: formatCurrency(grossSales), icon: WalletIcon },
          { label: "คะแนนร้าน", value: `${store.rating}`, icon: StoreIcon },
        ].map((item, index) => (
          <Card key={item.label} variant={index === 0 ? "soft" : "default"} className="p-5">
            <item.icon className="h-5 w-5 text-[#A27000]" />
            <p className="mt-4 text-3xl font-black">{item.value}</p>
            <p className="mt-1 text-sm text-[#5D5F5F]">{item.label}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black">ออเดอร์ล่าสุด</h2>
              <p className="text-sm text-[#5D5F5F]">อัปเดตสถานะจากหน้านี้หรือหน้าออเดอร์</p>
            </div>
            <Button asChild variant="ghost">
              <Link href="/merchant/orders">ดูทั้งหมด <ArrowRightIcon className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="mt-4 space-y-3">
            {orders.slice(0, 4).map((order) => (
              <div key={order.id} className="flex items-center justify-between gap-3 rounded-[1.35rem] bg-[linear-gradient(180deg,rgba(255,248,220,0.72),rgba(255,255,255,0.74))] p-4">
                <div>
                  <p className="font-bold">{order.id}</p>
                  <p className="text-sm text-[#5D5F5F]">{order.items.length} รายการ · {order.pickupTime}</p>
                </div>
                <Badge variant={order.status === "ready" ? "dark" : order.status === "completed" ? "success" : "warning"}>
                  {orderStatusLabel(order.status)}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card variant="soft" className="p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black">สินค้าขายดี</h2>
              <p className="text-sm text-[#5D5F5F]">แก้ราคาและ stock ได้จากหน้าสินค้า</p>
            </div>
            <Button asChild variant="ghost">
              <Link href="/merchant/products">จัดการสินค้า <ArrowRightIcon className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="mt-4 space-y-3">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="flex items-center gap-3 rounded-[1.35rem] bg-white/75 p-3">
                <img src={product.imageUrl} alt={product.name} className="h-14 w-14 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold">{product.name}</p>
                  <p className="text-sm text-[#5D5F5F]">{formatCurrency(product.discountedPrice)} · เหลือ {product.stockLeft}</p>
                </div>
                <Badge variant={product.status === "active" ? "success" : "warning"}>{product.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}

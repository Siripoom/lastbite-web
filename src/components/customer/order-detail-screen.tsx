"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/components/customer/catalog-cards";
import { StatusBadge } from "@/components/customer/orders-screen";
import { formatCurrency, paymentMethodLabel } from "@/lib/utils";
import { useCustomerStore } from "@/store/customer";

export function OrderDetailScreen({ orderId }: { orderId: string }) {
  const order = useCustomerStore((state) => state.orders.find((item) => item.id === orderId));

  if (!order) {
    return (
      <EmptyState
        title="ไม่พบออเดอร์"
        description="ออเดอร์นี้อาจไม่อยู่ในบัญชี demo หรือถูกลบแล้ว"
        action={<Button asChild><Link href="/app/orders">กลับไปหน้าออเดอร์</Link></Button>}
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <Card className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-[#5D5F5F]">{order.id}</p>
            <h1 className="mt-1 text-2xl font-extrabold">{order.storeName}</h1>
          </div>
          <StatusBadge status={order.status} />
        </div>
        <div className="mt-5 rounded-2xl bg-[#FFD600] p-5 text-center">
          <p className="text-sm font-bold text-[#705D00]">Pickup Code</p>
          <p className="font-display mt-1 text-5xl font-black tracking-widest">{order.status === "missed" ? "----" : order.pickupCode}</p>
          <p className="mt-2 text-sm font-semibold">รับสินค้า {order.pickupTime}</p>
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="text-lg font-bold">รายการอาหาร</h2>
        <div className="mt-4 space-y-4">
          {order.items.map((item) => (
            <div key={item.productId} className="flex gap-3">
              <img src={item.imageUrl} alt="" className="h-16 w-16 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="font-bold">{item.name}</p>
                <p className="text-sm text-[#5D5F5F]">x{item.quantity}</p>
              </div>
              <p className="font-bold">{formatCurrency(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
        <Separator className="my-5" />
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span>ราคาก่อนลด</span><span>{formatCurrency(order.totalOriginalPrice)}</span></div>
          <div className="flex justify-between"><span>ยอดชำระ</span><span>{formatCurrency(order.totalPrice)}</span></div>
          <div className="flex justify-between"><span>วิธีชำระ</span><span>{paymentMethodLabel(order.paymentMethod)}</span></div>
        </div>
      </Card>
    </div>
  );
}

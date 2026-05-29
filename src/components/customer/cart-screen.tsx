"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MinusIcon, PlusIcon, Trash2Icon } from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/components/customer/catalog-cards";
import { formatCurrency } from "@/lib/utils";
import { useCustomerStore } from "@/store/customer";

export function CartScreen() {
  const { cart, updateQuantity, removeItem, clearCart } = useCustomerStore();
  const totalOriginal = cart.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!cart.length) {
    return (
      <EmptyState
        title="ตะกร้ายังว่าง"
        description="เริ่มหาอาหารลดราคาจากร้านใกล้คุณ แล้วกลับมา checkout ได้ที่นี่"
        action={<Button asChild><Link href="/app/search">ค้นหาดีล</Link></Button>}
      />
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold">ตะกร้า</h1>
            <p className="mt-1 text-sm text-[#5D5F5F]">ตรวจจำนวนสินค้า ก่อนยืนยันการรับอาหาร</p>
          </div>
          <Button variant="ghost" onClick={clearCart}>ล้างตะกร้า</Button>
        </div>
        {cart.map((item) => (
          <Card key={item.productId} className="flex gap-4 p-3">
            <img src={item.imageUrl} alt={item.name} className="h-24 w-24 rounded-xl object-cover" />
            <div className="min-w-0 flex-1">
              <h2 className="font-bold">{item.name}</h2>
              <p className="mt-1 text-sm text-[#5D5F5F]">รับ {item.pickupTime}</p>
              <p className="mt-2 font-extrabold">{formatCurrency(item.price)}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex h-10 items-center rounded-xl border border-black/10">
                  <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <span className="w-9 text-center text-sm font-bold">{item.quantity}</span>
                  <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeItem(item.productId)} aria-label="ลบสินค้า">
                  <Trash2Icon className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </section>
      <Card className="h-fit p-5">
        <h2 className="text-xl font-extrabold">สรุปคำสั่งซื้อ</h2>
        <div className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between"><span>ราคาก่อนลด</span><span>{formatCurrency(totalOriginal)}</span></div>
          <div className="flex justify-between"><span>ส่วนลด</span><span>-{formatCurrency(totalOriginal - total)}</span></div>
          <Separator />
          <div className="flex justify-between text-lg font-extrabold"><span>ยอดชำระ</span><span>{formatCurrency(total)}</span></div>
        </div>
        <Button asChild size="lg" className="mt-5 w-full">
          <Link href="/app/checkout">ไปชำระเงิน</Link>
        </Button>
      </Card>
    </div>
  );
}

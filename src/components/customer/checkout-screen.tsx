"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/components/customer/catalog-cards";
import { formatCurrency, paymentMethodLabel } from "@/lib/utils";
import { useCustomerStore } from "@/store/customer";
import type { PaymentMethod } from "@/types";

const methods: PaymentMethod[] = ["promptPay", "mobileBanking"];

export function CheckoutScreen() {
  const router = useRouter();
  const [method, setMethod] = useState<PaymentMethod>("promptPay");
  const { cart, placeOrder } = useCustomerStore();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!cart.length) {
    return (
      <EmptyState
        title="ไม่มีสินค้าให้ checkout"
        description="เลือกดีลที่ต้องการก่อน แล้วกลับมายืนยันคำสั่งซื้อ"
        action={<Button asChild><Link href="/app/search">ค้นหาดีล</Link></Button>}
      />
    );
  }

  function submit() {
    const order = placeOrder(method);
    if (!order) return;
    toast.success("สร้างออเดอร์สำเร็จ");
    router.push(`/app/orders/${order.id}`);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <section className="space-y-5">
        <div>
          <h1 className="text-3xl font-extrabold">Checkout</h1>
          <p className="mt-1 text-sm text-[#5D5F5F]">Mock payment สำหรับทดสอบ flow ลูกค้า</p>
        </div>
        <Card className="p-5">
          <h2 className="text-lg font-bold">วิธีชำระเงิน</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {methods.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMethod(item)}
                className={`min-h-20 rounded-2xl border p-4 text-left font-bold ${
                  method === item ? "border-[#1C1B1B] bg-[#FFD600]" : "border-black/10 bg-white"
                }`}
              >
                {paymentMethodLabel(item)}
                <span className="mt-1 block text-xs font-medium text-[#5D5F5F]">จำลองการจ่ายเงินทันที</span>
              </button>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="text-lg font-bold">รายการอาหาร</h2>
          <div className="mt-4 space-y-4">
            {cart.map((item) => (
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
        </Card>
      </section>
      <Card className="h-fit p-5">
        <h2 className="text-xl font-extrabold">ยืนยันคำสั่งซื้อ</h2>
        <div className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between"><span>ยอดชำระ</span><span>{formatCurrency(total)}</span></div>
          <div className="flex justify-between"><span>วิธีชำระ</span><span>{paymentMethodLabel(method)}</span></div>
          <Separator />
          <p className="text-xs leading-5 text-[#5D5F5F]">
            ก่อน production ต้องย้ายการสร้าง order, ลด stock และ payment confirmation ไป backend/callable function
          </p>
        </div>
        <Button size="lg" className="mt-5 w-full" onClick={submit}>
          ยืนยันและชำระเงิน
        </Button>
      </Card>
    </div>
  );
}

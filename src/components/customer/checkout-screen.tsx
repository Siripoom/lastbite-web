"use client";

import { type ChangeEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/components/customer/catalog-cards";
import { useCatalogStore } from "@/store/catalog";
import { formatCurrency, paymentMethodLabel } from "@/lib/utils";
import { useCustomerStore } from "@/store/customer";
import type { PaymentMethod } from "@/types";

const methods: PaymentMethod[] = ["promptPay", "mobileBanking"];

const proofInputClass =
  "flex min-h-12 w-full rounded-2xl border border-black/8 bg-white/88 px-4 py-3 text-sm shadow-[0_10px_20px_rgba(28,27,27,0.04)] outline-none transition file:mr-3 file:rounded-xl file:border-0 file:bg-[#FFF7D8] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-[#1C1B1B] focus:border-[#E0B800] focus:bg-white focus:ring-4 focus:ring-[#FFD600]/20";

export function CheckoutScreen() {
  const router = useRouter();
  const [method, setMethod] = useState<PaymentMethod>("promptPay");
  const [proofUrl, setProofUrl] = useState("");
  const [proofFileName, setProofFileName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { cart, placeOrder } = useCustomerStore();
  const getStoreById = useCatalogStore((s) => s.getStoreById);
  const totalOriginal = cart.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const store = useMemo(() => (cart[0] ? getStoreById(cart[0].storeId) : undefined), [cart, getStoreById]);

  if (!cart.length) {
    return (
      <EmptyState
        title="ไม่มีสินค้าให้ checkout"
        description="เลือกดีลที่ต้องการก่อน แล้วกลับมายืนยันคำสั่งซื้อ"
        action={<Button asChild><Link href="/app/search">ค้นหาดีล</Link></Button>}
      />
    );
  }

  function handleProofChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setProofUrl(URL.createObjectURL(file));
    setProofFileName(file.name);
  }

  async function submit() {
    if (!proofUrl || !proofFileName) {
      toast.error("กรุณาอัปโหลดหลักฐานการโอนเงินก่อนยืนยันคำสั่งซื้อ");
      return;
    }
    setSubmitting(true);
    try {
      const orderId = await placeOrder({ paymentMethod: method, paymentProofUrl: proofUrl, paymentProofFileName: proofFileName });
      toast.success("สร้างออเดอร์สำเร็จ");
      router.push(`/app/orders/${orderId}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "เกิดข้อผิดพลาด กรุณาลองอีกครั้ง");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <section className="space-y-5">
        <div>
          <h1 className="text-3xl font-extrabold">ยืนยันคำสั่งซื้อ</h1>
          <p className="mt-1 text-sm text-[#5D5F5F]">ตรวจร้านค้า รายการอาหาร และอัปโหลดหลักฐานโอนเงิน</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {["เลือกร้าน", "เลือกสินค้า", "ชำระเงิน"].map((label, index) => (
            <div key={label} className="rounded-2xl border border-black/8 bg-white/88 p-4 shadow-[0_10px_20px_rgba(28,27,27,0.04)]">
              <Badge variant="dark">ขั้นตอน {index + 1}</Badge>
              <p className="mt-3 font-extrabold">{label}</p>
            </div>
          ))}
        </div>

        <Card className="p-5">
          <div className="flex flex-wrap items-start gap-4">
            <img src={store?.imageUrl ?? cart[0].imageUrl} alt="" className="h-20 w-20 rounded-2xl object-cover" />
            <div className="min-w-0 flex-1">
              <Badge>ร้านค้าที่เลือก</Badge>
              <h2 className="mt-2 text-xl font-extrabold">{store?.name ?? "LastBite Store"}</h2>
              <p className="mt-1 text-sm leading-6 text-[#5D5F5F]">{store?.address ?? "รับอาหารตามช่วงเวลาที่ร้านกำหนด"}</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/app/search">เปลี่ยนร้าน</Link>
            </Button>
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
                  <p className="text-sm text-[#5D5F5F]">x{item.quantity} · รับ {item.pickupTime}</p>
                </div>
                <p className="font-bold">{formatCurrency(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-lg font-bold">ชำระเงิน</h2>
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
                <span className="mt-1 block text-xs font-medium text-[#5D5F5F]">โอนเงินแล้วอัปโหลดหลักฐาน</span>
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-2xl bg-[#FFF7D8] p-4">
            <p className="text-sm font-bold text-[#6A5000]">ยอดที่ต้องโอน</p>
            <p className="mt-1 text-3xl font-black">{formatCurrency(total)}</p>
            <p className="mt-2 text-xs leading-5 text-[#6A5000]">Mock account: LastBite Demo 000-0-00000-0</p>
          </div>

          <label className="mt-5 block space-y-2 text-sm">
            <span className="font-semibold">หลักฐานการโอนเงิน</span>
            <input className={proofInputClass} type="file" accept="image/*" onChange={handleProofChange} />
          </label>
          {proofUrl ? (
            <div className="mt-4 overflow-hidden rounded-2xl border border-black/8">
              <img src={proofUrl} alt="หลักฐานการโอนเงิน" className="max-h-80 w-full object-cover" />
              <p className="border-t border-black/8 bg-white px-4 py-2 text-xs font-semibold text-[#5D5F5F]">{proofFileName}</p>
            </div>
          ) : null}
        </Card>
      </section>

      <Card className="h-fit p-5">
        <h2 className="text-xl font-extrabold">สรุปคำสั่งซื้อ</h2>
        <div className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between"><span>ร้านค้า</span><span className="font-semibold">{store?.name ?? "LastBite Store"}</span></div>
          <div className="flex justify-between"><span>ราคาก่อนลด</span><span>{formatCurrency(totalOriginal)}</span></div>
          <div className="flex justify-between"><span>ส่วนลด</span><span>-{formatCurrency(totalOriginal - total)}</span></div>
          <Separator />
          <div className="flex justify-between text-lg font-extrabold"><span>ยอดชำระ</span><span>{formatCurrency(total)}</span></div>
          {totalOriginal > total && (
            <div className="rounded-xl bg-green-50 px-3 py-2 text-center text-xs font-bold text-green-700">
              คุณประหยัดได้ {formatCurrency(totalOriginal - total)}!
            </div>
          )}
          <div className="flex justify-between"><span>วิธีชำระ</span><span>{paymentMethodLabel(method)}</span></div>
          <div className="flex justify-between"><span>หลักฐาน</span><span>{proofFileName || "ยังไม่ได้อัปโหลด"}</span></div>
        </div>
        <Button size="lg" className="mt-5 w-full" onClick={submit} disabled={submitting}>
          ยืนยันคำสั่งซื้อ
        </Button>
      </Card>
    </div>
  );
}

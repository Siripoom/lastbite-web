"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PackageCheckIcon, ReceiptTextIcon } from "@/components/ui/icons";
import { formatCurrency, orderStatusLabel } from "@/lib/utils";
import { useMerchantStore } from "@/store/merchant";
import type { Order, OrderStatus } from "@/types";

const pickupReadyStatuses: OrderStatus[] = ["waitingPickup", "preparing", "ready"];

function statusVariant(status: OrderStatus) {
  if (status === "completed") return "success";
  if (status === "missed") return "danger";
  if (status === "ready") return "dark";
  return "warning";
}

function CheckResult({
  title,
  description,
  variant = "default",
}: {
  title: string;
  description: string;
  variant?: "default" | "success" | "danger";
}) {
  const styles = {
    default: "border-black/8 bg-white text-[#1C1B1B]",
    success: "border-emerald-200 bg-emerald-50 text-emerald-950",
    danger: "border-red-200 bg-red-50 text-red-950",
  };

  return (
    <div className={`rounded-2xl border p-4 ${styles[variant]}`}>
      <p className="font-black">{title}</p>
      <p className="mt-1 text-sm font-semibold opacity-75">{description}</p>
    </div>
  );
}

function OrderSummary({ order }: { order: Order }) {
  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[#5D5F5F]">{order.id}</p>
          <h2 className="mt-1 text-2xl font-black">{order.storeName}</h2>
          <p className="mt-2 text-sm font-semibold text-[#5D5F5F]">รับสินค้า {order.pickupTime}</p>
        </div>
        <Badge variant={statusVariant(order.status)}>{orderStatusLabel(order.status)}</Badge>
      </div>

      <Separator className="my-5" />

      <div className="space-y-4">
        {order.items.map((item) => (
          <div key={item.productId} className="flex gap-3">
            <img src={item.imageUrl} alt="" className="h-14 w-14 rounded-xl object-cover" />
            <div className="min-w-0 flex-1">
              <p className="font-bold">{item.name}</p>
              <p className="text-sm text-[#5D5F5F]">x{item.quantity}</p>
            </div>
            <p className="font-bold">{formatCurrency(item.price * item.quantity)}</p>
          </div>
        ))}
      </div>

      <Separator className="my-5" />

      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-[#5D5F5F]">ยอดชำระ</span>
        <span className="text-xl font-black">{formatCurrency(order.totalPrice)}</span>
      </div>
    </Card>
  );
}

export function MerchantOrderCheckScreen() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") ?? "";
  const code = searchParams.get("code") ?? "";
  const { store, orders, updateOrderStatus } = useMerchantStore();
  if (!store) return null;
  const order = orders.find((item) => item.id === orderId);

  const isStoreOrder = order?.storeId === store.id;
  const hasMatchingCode = Boolean(order && order.pickupCode === code);
  const canConfirm = Boolean(order && isStoreOrder && hasMatchingCode && pickupReadyStatuses.includes(order.status));

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <h1 className="text-3xl font-black">เช็ค QR รับสินค้า</h1>
        <p className="mt-1 text-sm text-[#5D5F5F]">ตรวจออเดอร์จาก QR ของลูกค้าก่อนยืนยันการรับสินค้า</p>
      </div>

      <Card className="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF4C8] text-[#705D00]">
              <ReceiptTextIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#5D5F5F]">QR payload</p>
              <p className="break-all font-black">{orderId || "ไม่มี orderId"}</p>
            </div>
          </div>
          <div className="rounded-2xl bg-[#F6F1DF] px-4 py-3 text-sm font-black">
            Code {code || "----"}
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {!order ? (
            <CheckResult
              title="ไม่พบออเดอร์"
              description="QR นี้อาจไม่อยู่ในชุดข้อมูล demo ของร้าน หรือ orderId ไม่ถูกต้อง"
              variant="danger"
            />
          ) : !isStoreOrder ? (
            <CheckResult
              title="ออเดอร์ไม่ใช่ของร้านนี้"
              description="ไม่สามารถยืนยันการรับสินค้าของร้านอื่นได้"
              variant="danger"
            />
          ) : !hasMatchingCode ? (
            <CheckResult
              title="Pickup code ไม่ตรง"
              description="ตรวจ QR หรือให้ลูกค้าเปิดหน้าออเดอร์ล่าสุดอีกครั้ง"
              variant="danger"
            />
          ) : order.status === "completed" ? (
            <CheckResult
              title="ออเดอร์นี้รับสินค้าแล้ว"
              description="ระบบบันทึกสถานะเป็นรับเรียบร้อยแล้ว"
              variant="success"
            />
          ) : order.status === "missed" ? (
            <CheckResult
              title="ออเดอร์นี้เลยเวลารับ"
              description="ไม่สามารถยืนยันการรับสินค้าจาก QR นี้ได้"
              variant="danger"
            />
          ) : !pickupReadyStatuses.includes(order.status) ? (
            <CheckResult
              title="ออเดอร์ยังไม่พร้อมรับ"
              description={`สถานะปัจจุบันคือ ${orderStatusLabel(order.status)}`}
            />
          ) : (
            <CheckResult
              title="QR ถูกต้อง"
              description="ตรวจรายการอาหารแล้วกดยืนยันเมื่อส่งสินค้าให้ลูกค้า"
              variant="success"
            />
          )}
        </div>
      </Card>

      {order ? <OrderSummary order={order} /> : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          className="sm:flex-1"
          disabled={!canConfirm}
          onClick={() => order && updateOrderStatus(order.id, "completed")}
        >
          <PackageCheckIcon className="h-5 w-5" />
          ยืนยันรับสินค้า
        </Button>
        <Button asChild variant="outline" className="sm:flex-1">
          <Link href="/merchant/orders">กลับไปออเดอร์</Link>
        </Button>
      </div>
    </div>
  );
}

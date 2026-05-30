"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/components/customer/catalog-cards";
import { StatusBadge } from "@/components/customer/orders-screen";
import { formatCurrency, merchantOrderCheckPath, merchantOrderCheckUrl, paymentMethodLabel } from "@/lib/utils";
import { useCustomerStore } from "@/store/customer";
import type { OrderStatus } from "@/types";

const pickupQrStatuses: OrderStatus[] = ["waitingPickup", "preparing", "ready"];

function subscribeToOriginChange() {
  return () => {};
}

function getClientOrigin() {
  return window.location.origin;
}

function getServerOrigin() {
  return "";
}

export function OrderDetailScreen({ orderId }: { orderId: string }) {
  const order = useCustomerStore((state) => state.orders.find((item) => item.id === orderId));
  const origin = useSyncExternalStore(subscribeToOriginChange, getClientOrigin, getServerOrigin);

  const canUsePickupQr = order ? pickupQrStatuses.includes(order.status) : false;
  const qrPath = useMemo(
    () => order ? merchantOrderCheckPath(order.id, order.pickupCode) : "",
    [order],
  );
  const qrValue = useMemo(
    () => order && origin ? merchantOrderCheckUrl(origin, order.id, order.pickupCode) : qrPath,
    [order, origin, qrPath],
  );

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
        <div className="mt-5 grid gap-4 rounded-2xl bg-[#FFD600] p-5 md:grid-cols-[minmax(0,1fr)_180px] md:items-center">
          <div className="text-center md:text-left">
            <p className="text-sm font-bold text-[#705D00]">Pickup Code</p>
            <p className="font-display mt-1 text-5xl font-black tracking-widest">
              {canUsePickupQr ? order.pickupCode : "----"}
            </p>
            <p className="mt-2 text-sm font-semibold">รับสินค้า {order.pickupTime}</p>
            <p className="mt-3 text-xs font-semibold text-[#705D00]">
              {canUsePickupQr ? "แสดง QR นี้ให้ร้านสแกนเพื่อเช็คและยืนยันการรับสินค้า" : "QR สำหรับรับสินค้านี้ไม่พร้อมใช้งานแล้ว"}
            </p>
          </div>
          {canUsePickupQr ? (
            <div className="mx-auto flex h-[180px] w-[180px] items-center justify-center rounded-2xl bg-white p-3 shadow-[0_16px_28px_rgba(112,93,0,0.16)]">
              <QRCodeSVG value={qrValue} size={148} level="M" includeMargin />
            </div>
          ) : null}
        </div>
        {canUsePickupQr ? (
          <p className="mt-3 break-all text-xs font-semibold text-[#5D5F5F]">
            Merchant check: {qrPath}
          </p>
        ) : null}
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
          <div className="flex justify-between text-green-700"><span>ประหยัดได้</span><span>-{formatCurrency(order.totalOriginalPrice - order.totalPrice)}</span></div>
          <div className="flex justify-between"><span>ยอดชำระ</span><span>{formatCurrency(order.totalPrice)}</span></div>
          <div className="flex justify-between"><span>วิธีชำระ</span><span>{paymentMethodLabel(order.paymentMethod)}</span></div>
        </div>
      </Card>

      {order.paymentProofUrl ? (
        <Card className="p-5">
          <h2 className="text-lg font-bold">หลักฐานการโอนเงิน</h2>
          <p className="mt-1 text-sm text-[#5D5F5F]">{order.paymentProofFileName}</p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-black/8">
            <img src={order.paymentProofUrl} alt="หลักฐานการโอนเงิน" className="max-h-96 w-full object-cover" />
          </div>
        </Card>
      ) : null}
    </div>
  );
}

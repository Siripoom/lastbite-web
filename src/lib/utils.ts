import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { OrderStatus, PaymentMethod } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(value);
}

export function pickupRange(start: string, end: string) {
  return `${start} - ${end}`;
}

export function orderStatusLabel(status: OrderStatus) {
  const labels: Record<OrderStatus, string> = {
    waitingPayment: "รอชำระเงิน",
    waitingPickup: "รอรับอาหาร",
    preparing: "ร้านกำลังเตรียม",
    ready: "พร้อมรับ",
    completed: "รับเรียบร้อย",
    missed: "เลยเวลารับ",
  };

  return labels[status];
}

export function paymentMethodLabel(method: PaymentMethod) {
  return method === "promptPay" ? "พร้อมเพย์" : "โมบายแบงกิ้ง";
}

export function makePickupCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export function merchantOrderCheckPath(orderId: string, pickupCode: string) {
  const params = new URLSearchParams({ orderId, code: pickupCode });
  return `/merchant/orders/check?${params.toString()}`;
}

export function merchantOrderCheckUrl(origin: string, orderId: string, pickupCode: string) {
  return `${origin}${merchantOrderCheckPath(orderId, pickupCode)}`;
}

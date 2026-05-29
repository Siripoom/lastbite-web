"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency, orderStatusLabel } from "@/lib/utils";
import { useMerchantStore } from "@/store/merchant";
import type { OrderStatus } from "@/types";

const nextStatus: Record<OrderStatus, OrderStatus | null> = {
  waitingPayment: "waitingPickup",
  waitingPickup: "preparing",
  preparing: "ready",
  ready: "completed",
  completed: null,
  missed: null,
};

export function MerchantOrdersScreen() {
  const { orders, updateOrderStatus } = useMerchantStore();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-black">จัดการออเดอร์</h1>
        <p className="mt-1 text-sm text-[#5D5F5F]">อัปเดตสถานะการเตรียมและการรับสินค้าให้ลูกค้าเห็นทันทีใน flow demo</p>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => {
          const canAdvance = nextStatus[order.status];
          return (
            <Card key={order.id} variant={order.status === "ready" ? "soft" : "default"} className="p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-black">{order.id}</h2>
                    <Badge variant={order.status === "ready" ? "dark" : order.status === "completed" ? "success" : "warning"}>
                      {orderStatusLabel(order.status)}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-[#5D5F5F]">Pickup Code {order.pickupCode} · รับ {order.pickupTime}</p>
                  <p className="mt-2 text-sm text-[#5D5F5F]">{order.items.map((item) => `${item.name} x${item.quantity}`).join(", ")}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-black">{formatCurrency(order.totalPrice)}</p>
                  <Button
                    variant={canAdvance ? "default" : "outline"}
                    disabled={!canAdvance}
                    onClick={() => canAdvance && updateOrderStatus(order.id, canAdvance)}
                  >
                    {canAdvance ? `อัปเดตเป็น ${orderStatusLabel(canAdvance)}` : "ปิดออเดอร์แล้ว"}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

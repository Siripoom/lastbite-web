"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency, orderStatusLabel } from "@/lib/utils";
import { useCustomerStore } from "@/store/customer";
import type { Order, OrderStatus } from "@/types";

const activeStatuses: OrderStatus[] = ["waitingPayment", "waitingPickup", "preparing", "ready"];

export function OrdersScreen() {
  const orders = useCustomerStore((state) => state.orders);
  const active = orders.filter((order) => activeStatuses.includes(order.status));
  const history = orders.filter((order) => !activeStatuses.includes(order.status));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-extrabold">ออเดอร์</h1>
        <p className="mt-1 text-sm text-[#5D5F5F]">ติดตาม pickup code และประวัติการรับอาหาร</p>
      </div>
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">กำลังดำเนินการ</TabsTrigger>
          <TabsTrigger value="history">ประวัติ</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="grid gap-4">
          {active.map((order) => <OrderRow key={order.id} order={order} />)}
        </TabsContent>
        <TabsContent value="history" className="grid gap-4">
          {history.map((order) => <OrderRow key={order.id} order={order} />)}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function OrderRow({ order }: { order: Order }) {
  return (
    <Link href={`/app/orders/${order.id}`}>
      <Card className="flex gap-4 p-4">
        <img src={order.storeImageUrl} alt="" className="h-16 w-16 rounded-xl object-cover" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-extrabold">{order.storeName}</p>
              <p className="mt-1 text-sm text-[#5D5F5F]">{order.items.length} รายการ · {order.pickupTime}</p>
            </div>
            <StatusBadge status={order.status} />
          </div>
          <p className="mt-3 font-bold">{formatCurrency(order.totalPrice)}</p>
        </div>
      </Card>
    </Link>
  );
}

export function StatusBadge({ status }: { status: OrderStatus }) {
  const variant = status === "completed" ? "success" : status === "missed" ? "danger" : status === "ready" ? "dark" : "warning";
  return <Badge variant={variant}>{orderStatusLabel(status)}</Badge>;
}

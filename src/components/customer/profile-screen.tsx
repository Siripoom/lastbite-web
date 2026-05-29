"use client";

import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SettingsIcon } from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import { useCustomerStore } from "@/store/customer";

export function ProfileScreen() {
  const { user, orders } = useCustomerStore();
  const completed = orders.filter((order) => order.status === "completed").length;

  return (
    <div className="space-y-5">
      <Card className="p-5">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-xl">{user.name.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold">{user.name}</h1>
            <p className="text-sm text-[#5D5F5F]">{user.email}</p>
          </div>
          <Button asChild variant="outline" size="icon">
            <Link href="/app/settings" aria-label="ตั้งค่า"><SettingsIcon className="h-5 w-5" /></Link>
          </Button>
        </div>
        <Separator className="my-5" />
        <div className="grid grid-cols-3 gap-3 text-center">
          <div><p className="text-2xl font-black">{orders.length}</p><p className="text-xs text-[#5D5F5F]">ออเดอร์</p></div>
          <div><p className="text-2xl font-black">{completed}</p><p className="text-xs text-[#5D5F5F]">รับแล้ว</p></div>
          <div><p className="text-2xl font-black">฿</p><p className="text-xs text-[#5D5F5F]">ประหยัด</p></div>
        </div>
      </Card>
      <Card className="p-5">
        <h2 className="text-lg font-bold">ข้อมูลบัญชี</h2>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4"><span className="text-[#5D5F5F]">เบอร์โทร</span><span>{user.phone}</span></div>
          <div className="flex justify-between gap-4"><span className="text-[#5D5F5F]">Role</span><span>{user.role}</span></div>
          <div className="flex justify-between gap-4"><span className="text-[#5D5F5F]">สถานะ</span><span>{user.isActive === false ? "ระงับ" : "เปิดใช้งาน"}</span></div>
        </div>
      </Card>
    </div>
  );
}

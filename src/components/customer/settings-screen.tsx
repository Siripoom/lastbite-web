"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRightIcon } from "@/components/ui/icons";
import { useCustomerStore } from "@/store/customer";

export function SettingsScreen() {
  const { user, suspendDemoUser } = useCustomerStore();

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div>
        <h1 className="text-3xl font-extrabold">ตั้งค่า</h1>
        <p className="mt-1 text-sm text-[#5D5F5F]">พื้นที่ demo สำหรับทดสอบ edge case จาก handover</p>
      </div>
      <Card className="p-5">
        <h2 className="text-lg font-bold">สถานะบัญชี demo</h2>
        <p className="mt-2 text-sm text-[#5D5F5F]">ปัจจุบัน: {user.isActive === false ? "ถูกระงับ" : "เปิดใช้งาน"}</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Button variant="outline" onClick={() => suspendDemoUser(true)}>เปิดใช้งาน</Button>
          <Button variant="danger" onClick={() => suspendDemoUser(false)}>จำลองบัญชีถูกระงับ</Button>
        </div>
      </Card>
      <Link href="/app/faq">
        <Card className="flex items-center justify-between p-5 transition hover:shadow-md">
          <div>
            <h2 className="text-lg font-bold">คำถามที่พบบ่อย</h2>
            <p className="mt-1 text-sm text-[#5D5F5F]">ดูคำตอบสำหรับปัญหาที่พบบ่อย</p>
          </div>
          <ArrowRightIcon size={20} className="shrink-0 text-[#5D5F5F]" />
        </Card>
      </Link>
    </div>
  );
}

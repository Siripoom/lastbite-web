"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";

const textareaClass =
  "flex min-h-24 w-full resize-none rounded-2xl border border-black/8 bg-white/88 px-4 py-3 text-sm shadow-[0_10px_20px_rgba(28,27,27,0.04)] outline-none transition placeholder:text-[#5D5F5F]/70 focus:border-[#E0B800] focus:bg-white focus:ring-4 focus:ring-[#FFD600]/20";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>("customer");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!acceptedTerms) return;
    router.push(role === "customer" ? "/app" : "/merchant");
  }

  return (
    <main className="min-h-screen bg-[#FCF9F8] p-6">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-5xl place-items-center">
        <Card className="w-full p-6 md:p-8">
          <Link href="/" className="mb-8 block">
            <img src="/lastbite-logo.png" alt="LastBite" className="h-14 w-auto" />
          </Link>
          <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
            <aside>
              <h1 className="text-3xl font-extrabold">สมัครสมาชิก</h1>
              <p className="mt-2 text-sm leading-6 text-[#5D5F5F]">
                เลือกประเภทบัญชีเพื่อสร้าง mock profile สำหรับลูกค้าหรือร้านค้า
              </p>
              <div className="mt-6 grid gap-3">
                {[
                  { value: "customer" as const, title: "ลูกค้า", description: "ค้นหาร้าน เลือกสินค้า และสั่งอาหารลดราคา" },
                  { value: "merchant" as const, title: "ร้านค้า", description: "เปิดร้าน จัดการสินค้า และดูคำสั่งซื้อ" },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setRole(item.value)}
                    className={cn(
                      "rounded-2xl border p-4 text-left transition",
                      role === item.value ? "border-[#1C1B1B] bg-[#FFD600]" : "border-black/10 bg-white hover:bg-[#FFF7D8]",
                    )}
                  >
                    <span className="font-extrabold">{item.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-[#5D5F5F]">{item.description}</span>
                  </button>
                ))}
              </div>
            </aside>

            <form className="space-y-4" onSubmit={submit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-2">
                  <span className="text-sm font-semibold">{role === "customer" ? "ชื่อ" : "ชื่อผู้ดูแล"}</span>
                  <Input required defaultValue={role === "customer" ? "คุณมายด์" : "วิไล อร่อยดี"} />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-semibold">เบอร์โทร</span>
                  <Input required defaultValue={role === "customer" ? "0891234567" : "0812345678"} />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-semibold">อีเมล</span>
                  <Input required defaultValue={role === "customer" ? "mind@example.com" : "wilai@example.com"} type="email" />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-semibold">รหัสผ่าน</span>
                  <Input required defaultValue="lastbite-demo" type="password" />
                </label>
              </div>

              {role === "merchant" ? (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block space-y-2">
                      <span className="text-sm font-semibold">ชื่อร้าน</span>
                      <Input required defaultValue="ครัววิไล เบเกอรี่" />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-sm font-semibold">เบอร์ร้าน</span>
                      <Input required defaultValue="021234567" />
                    </label>
                  </div>
                  <label className="block space-y-2">
                    <span className="text-sm font-semibold">รายละเอียดร้าน</span>
                    <textarea required className={textareaClass} defaultValue="เบเกอรี่อบสดและอาหารพร้อมทานสำหรับขายช่วงท้ายวัน" />
                  </label>
                  <label className="block space-y-2">
                    <span className="text-sm font-semibold">ที่อยู่ร้าน</span>
                    <textarea required className={textareaClass} defaultValue="123 ถนนสุขุมวิท กรุงเทพฯ" />
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <label className="block space-y-2">
                      <span className="text-sm font-semibold">เวลาเปิด</span>
                      <Input required type="time" defaultValue="09:00" />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-sm font-semibold">เวลาปิด</span>
                      <Input required type="time" defaultValue="20:00" />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-sm font-semibold">เริ่มรับสินค้า</span>
                      <Input required type="time" defaultValue="18:00" />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-sm font-semibold">สิ้นสุดรับสินค้า</span>
                      <Input required type="time" defaultValue="19:30" />
                    </label>
                  </div>
                </>
              ) : null}

              <label className="flex items-start gap-3 rounded-2xl border border-black/8 bg-white/80 p-4 text-sm leading-6">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(event) => setAcceptedTerms(event.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-black/20 accent-[#FFD600]"
                />
                <span>
                  ฉันยอมรับ{" "}
                  <Link href="/terms" className="font-bold text-[#1C1B1B] underline">
                    นโยบายการใช้งานและเงื่อนไขบริการ
                  </Link>{" "}
                  ของ LastBite
                </span>
              </label>

              <Button type="submit" size="lg" className="w-full" disabled={!acceptedTerms}>
                {role === "customer" ? "สร้าง mock customer profile" : "สมัครร้านค้าและเข้าสู่ console"}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </main>
  );
}

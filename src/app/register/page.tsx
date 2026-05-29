import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#FCF9F8] p-6">
      <Card className="w-full max-w-md p-6">
        <Link href="/" className="mb-8 block">
          <img src="/lastbite-logo.png" alt="LastBite" className="h-14 w-auto" />
        </Link>
        <h1 className="text-3xl font-extrabold">สมัครสมาชิก</h1>
        <p className="mt-2 text-sm leading-6 text-[#5D5F5F]">
          หน้านี้ล็อก UI และ data contract สำหรับสร้าง profile role customer เมื่อเชื่อม Firebase จริง
        </p>
        <form className="mt-6 space-y-4">
          <label className="block space-y-2"><span className="text-sm font-semibold">ชื่อ</span><Input defaultValue="คุณมายด์" /></label>
          <label className="block space-y-2"><span className="text-sm font-semibold">เบอร์โทร</span><Input defaultValue="0891234567" /></label>
          <label className="block space-y-2"><span className="text-sm font-semibold">อีเมล</span><Input defaultValue="mind@example.com" type="email" /></label>
          <label className="block space-y-2"><span className="text-sm font-semibold">รหัสผ่าน</span><Input defaultValue="lastbite-demo" type="password" /></label>
          <Button asChild size="lg" className="w-full">
            <Link href="/app">สร้าง mock customer profile</Link>
          </Button>
        </form>
      </Card>
    </main>
  );
}

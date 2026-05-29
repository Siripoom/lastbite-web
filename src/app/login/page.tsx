import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LockKeyholeIcon, MailIcon } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#FCF9F8] p-6">
      <Card className="w-full max-w-md p-6">
        <Link href="/" className="mb-8 block">
          <img src="/lastbite-logo.png" alt="LastBite" className="h-14 w-auto" />
        </Link>
        <h1 className="text-3xl font-extrabold">เข้าสู่ระบบ</h1>
        <p className="mt-2 text-sm leading-6 text-[#5D5F5F]">
          เวอร์ชันนี้ใช้ mock auth เลือกเข้าใช้งานเป็นลูกค้าหรือร้านค้าได้ทันที
        </p>
        <form className="mt-6 space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-semibold">อีเมล</span>
            <div className="relative">
              <MailIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5D5F5F]" />
              <Input className="pl-11" defaultValue="mind@example.com" type="email" />
            </div>
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-semibold">รหัสผ่าน</span>
            <div className="relative">
              <LockKeyholeIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5D5F5F]" />
              <Input className="pl-11" defaultValue="lastbite-demo" type="password" />
            </div>
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button asChild size="lg" className="w-full">
              <Link href="/app">เข้าฝั่งลูกค้า</Link>
            </Button>
            <Button asChild size="lg" variant="dark" className="w-full">
              <Link href="/merchant">เข้าฝั่งร้านค้า</Link>
            </Button>
          </div>
        </form>
        <p className="mt-5 text-center text-sm text-[#5D5F5F]">
          ยังไม่มีบัญชี? <Link href="/register" className="font-bold text-[#1C1B1B]">สมัครสมาชิก</Link>
        </p>
      </Card>
    </main>
  );
}

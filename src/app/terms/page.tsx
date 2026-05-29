import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const sections = [
  {
    title: "การใช้งานสำหรับลูกค้า",
    body: "ลูกค้าต้องตรวจสอบร้านค้า รายการสินค้า ช่วงเวลารับสินค้า และยอดชำระก่อนยืนยันคำสั่งซื้อ หลักฐานการโอนเงินในเวอร์ชัน mock ใช้เพื่อทดสอบ flow เท่านั้น",
  },
  {
    title: "การใช้งานสำหรับร้านค้า",
    body: "ร้านค้าต้องลงข้อมูลสินค้า ราคา จำนวนคงเหลือ และช่วงเวลารับสินค้าให้ถูกต้อง คำสั่งซื้อและการถอนเงินในเวอร์ชันนี้เป็นข้อมูลจำลองสำหรับทดสอบหน้าจอ",
  },
  {
    title: "ข้อมูลและความเป็นส่วนตัว",
    body: "ข้อมูลในระบบ demo เป็น mock data และ local state ยังไม่ใช่ระบบ production ห้ามใส่ข้อมูลลับหรือหลักฐานการโอนเงินจริงจนกว่าจะเชื่อม backend และ storage ที่ปลอดภัย",
  },
  {
    title: "ข้อจำกัดของระบบทดลอง",
    body: "LastBite mock app ยังไม่ตรวจสอบ payment จริง ไม่ลด stock ผ่าน backend และไม่รับประกันการ persist หลัง refresh หรือ deploy ใหม่",
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FCF9F8] p-6">
      <div className="mx-auto max-w-3xl space-y-5">
        <Card className="p-6 md:p-8">
          <Link href="/" className="mb-8 block">
            <img src="/lastbite-logo.png" alt="LastBite" className="h-14 w-auto" />
          </Link>
          <h1 className="text-3xl font-extrabold">นโยบายการใช้งาน</h1>
          <p className="mt-3 text-sm leading-6 text-[#5D5F5F]">
            เงื่อนไขนี้จัดทำสำหรับ mock PWA v1 เพื่ออธิบายขอบเขตการใช้งานของลูกค้าและร้านค้าก่อนเชื่อมต่อระบบ production
          </p>
        </Card>

        {sections.map((section) => (
          <Card key={section.title} className="p-5">
            <h2 className="text-lg font-extrabold">{section.title}</h2>
            <p className="mt-2 text-sm leading-7 text-[#5D5F5F]">{section.body}</p>
          </Card>
        ))}

        <Card variant="soft" className="p-5">
          <h2 className="text-lg font-extrabold">การยอมรับเงื่อนไข</h2>
          <p className="mt-2 text-sm leading-7 text-[#5D5F5F]">
            เมื่อสมัครใช้งาน ถือว่าผู้ใช้ยอมรับเงื่อนไขของระบบทดลองนี้ และเข้าใจว่าข้อมูลการสั่งซื้อ การชำระเงิน และร้านค้าเป็นข้อมูลจำลอง
          </p>
          <Button asChild className="mt-5">
            <Link href="/register">กลับไปสมัครสมาชิก</Link>
          </Button>
        </Card>
      </div>
    </main>
  );
}

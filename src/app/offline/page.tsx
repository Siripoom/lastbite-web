import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WifiOffIcon } from "@/components/ui/icons";

export default function OfflinePage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#FCF9F8] p-6 text-center">
      <div className="max-w-sm rounded-3xl bg-white p-8 shadow-xl">
        <WifiOffIcon className="mx-auto h-12 w-12 text-[#1C1B1B]" />
        <h1 className="mt-5 text-2xl font-extrabold">คุณออฟไลน์อยู่</h1>
        <p className="mt-3 text-sm leading-6 text-[#5D5F5F]">
          LastBite แสดง shell ที่ cache ไว้ได้ แต่ checkout และสถานะ order ต้องใช้อินเทอร์เน็ต
        </p>
        <Button asChild className="mt-6">
          <Link href="/app">กลับหน้าหลัก</Link>
        </Button>
      </div>
    </main>
  );
}

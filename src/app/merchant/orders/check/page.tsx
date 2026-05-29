import { Suspense } from "react";
import { MerchantOrderCheckScreen } from "@/components/merchant/order-check-screen";
import { Card } from "@/components/ui/card";

export default function MerchantOrderCheckPage() {
  return (
    <Suspense
      fallback={
        <Card className="mx-auto max-w-3xl p-5">
          <p className="font-black">กำลังโหลดข้อมูล QR...</p>
          <p className="mt-1 text-sm text-[#5D5F5F]">ระบบกำลังตรวจ payload สำหรับเช็คออเดอร์</p>
        </Card>
      }
    >
      <MerchantOrderCheckScreen />
    </Suspense>
  );
}

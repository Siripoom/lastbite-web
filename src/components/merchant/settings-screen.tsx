"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMerchantStore } from "@/store/merchant";

export function MerchantSettingsScreen() {
  const { store, updateStore } = useMerchantStore();

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div>
        <h1 className="text-3xl font-black">ตั้งค่าร้าน</h1>
        <p className="mt-1 text-sm text-[#5D5F5F]">แก้ข้อมูลร้านใน merchant console ได้จากที่นี่โดยตรง</p>
      </div>

      <Card className="p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span className="font-semibold">ชื่อร้าน</span>
            <Input defaultValue={store.name} onChange={(event) => updateStore({ name: event.target.value })} />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold">เบอร์โทร</span>
            <Input defaultValue={store.phone} onChange={(event) => updateStore({ phone: event.target.value })} />
          </label>
          <label className="space-y-2 text-sm md:col-span-2">
            <span className="font-semibold">คำอธิบายร้าน</span>
            <Input
              defaultValue={store.description}
              onChange={(event) => updateStore({ description: event.target.value })}
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold">เวลาเปิด</span>
            <Input defaultValue={store.openTime} onChange={(event) => updateStore({ openTime: event.target.value })} />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold">เวลาปิด</span>
            <Input defaultValue={store.closeTime} onChange={(event) => updateStore({ closeTime: event.target.value })} />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold">เริ่มรับสินค้า</span>
            <Input
              defaultValue={store.pickupStartTime}
              onChange={(event) => updateStore({ pickupStartTime: event.target.value })}
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold">สิ้นสุดรับสินค้า</span>
            <Input
              defaultValue={store.pickupEndTime}
              onChange={(event) => updateStore({ pickupEndTime: event.target.value })}
            />
          </label>
        </div>
      </Card>
    </div>
  );
}

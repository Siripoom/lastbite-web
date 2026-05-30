"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/customer/catalog-cards";
import { StoreDetail } from "@/components/customer/store-detail";
import { isCatalogLoaded, useCatalogStore } from "@/store/catalog";

export function StoreDetailClient({ storeId }: { storeId: string }) {
  const loaded = useCatalogStore(isCatalogLoaded);
  const stores = useCatalogStore((s) => s.stores);
  const store = stores.find((s) => s.id === storeId && s.isActive && s.approvalStatus === "approved");

  if (!loaded) {
    return (
      <div className="grid min-h-[40vh] place-items-center">
        <p className="text-sm text-[#5D5F5F]">กำลังโหลด...</p>
      </div>
    );
  }

  if (!store) {
    return (
      <EmptyState
        title="ร้านนี้ไม่พร้อมให้บริการ"
        description="ร้านอาจปิดชั่วคราว หรือยังไม่ได้รับการอนุมัติสำหรับลูกค้า"
        action={
          <Button asChild>
            <Link href="/app">กลับหน้าหลัก</Link>
          </Button>
        }
      />
    );
  }

  return <StoreDetail store={store} />;
}

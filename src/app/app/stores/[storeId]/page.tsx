import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/customer/catalog-cards";
import { StoreDetail } from "@/components/customer/store-detail";
import { getVisibleStore } from "@/lib/mock-data";

export default async function StorePage({ params }: { params: Promise<{ storeId: string }> }) {
  const { storeId } = await params;
  const store = getVisibleStore(storeId);

  if (!store) {
    return (
      <EmptyState
        title="ร้านนี้ไม่พร้อมให้บริการ"
        description="ร้านอาจปิดชั่วคราว หรือยังไม่ได้รับการอนุมัติสำหรับลูกค้า"
        action={<Button asChild><Link href="/app">กลับหน้าหลัก</Link></Button>}
      />
    );
  }

  return <StoreDetail store={store} />;
}

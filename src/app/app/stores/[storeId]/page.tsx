import { StoreDetailClient } from "@/components/customer/store-detail-client";

export default async function StorePage({ params }: { params: Promise<{ storeId: string }> }) {
  const { storeId } = await params;
  return <StoreDetailClient storeId={storeId} />;
}

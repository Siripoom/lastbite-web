import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/customer/catalog-cards";
import { ProductDetail } from "@/components/customer/product-detail";
import { getAvailableProduct, getVisibleStore } from "@/lib/mock-data";

export default async function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  const product = getAvailableProduct(productId);
  const store = product ? getVisibleStore(product.storeId) : undefined;

  if (!product || !store) {
    return (
      <EmptyState
        title="สินค้านี้ไม่พร้อมขาย"
        description="สินค้าอาจหมด stock หมดเวลา หรือร้านไม่พร้อมให้บริการแล้ว"
        action={<Button asChild><Link href="/app/search">ค้นหาสินค้าอื่น</Link></Button>}
      />
    );
  }

  return <ProductDetail product={product} store={store} />;
}

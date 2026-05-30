"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/customer/catalog-cards";
import { ProductDetail } from "@/components/customer/product-detail";
import { isCatalogLoaded, useCatalogStore } from "@/store/catalog";

export function ProductDetailClient({ productId }: { productId: string }) {
  const loaded = useCatalogStore(isCatalogLoaded);
  const products = useCatalogStore((s) => s.products);
  const stores = useCatalogStore((s) => s.stores);
  const product = products.find((p) => p.id === productId && p.status === "active" && p.stockLeft > 0);
  const store = product
    ? stores.find((s) => s.id === product.storeId && s.isActive && s.approvalStatus === "approved")
    : undefined;

  if (!loaded) {
    return (
      <div className="grid min-h-[40vh] place-items-center">
        <p className="text-sm text-[#5D5F5F]">กำลังโหลด...</p>
      </div>
    );
  }

  if (!product || !store) {
    return (
      <EmptyState
        title="สินค้านี้ไม่พร้อมขาย"
        description="สินค้าอาจหมด stock หมดเวลา หรือร้านไม่พร้อมให้บริการแล้ว"
        action={
          <Button asChild>
            <Link href="/app/search">ค้นหาสินค้าอื่น</Link>
          </Button>
        }
      />
    );
  }

  return <ProductDetail product={product} store={store} />;
}

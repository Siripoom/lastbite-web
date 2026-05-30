"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EmptyState, ProductCard } from "@/components/customer/catalog-cards";
import { isCatalogLoaded, useCatalogStore } from "@/store/catalog";

export function CategoryPageClient({ categoryId }: { categoryId: string }) {
  const loaded = useCatalogStore(isCatalogLoaded);
  const categories = useCatalogStore((s) => s.categories);
  const products = useCatalogStore((s) => s.products);
  const stores = useCatalogStore((s) => s.stores);

  const category = categories.find((c) => c.id === categoryId);
  const categoryProducts = products.filter(
    (p) => p.categoryId === categoryId && p.status === "active" && p.stockLeft > 0,
  );

  if (!loaded) {
    return (
      <div className="grid min-h-[40vh] place-items-center">
        <p className="text-sm text-[#5D5F5F]">กำลังโหลด...</p>
      </div>
    );
  }

  if (!category) {
    return (
      <EmptyState
        title="ไม่พบหมวดหมู่"
        description="หมวดหมู่นี้อาจถูกลบหรือยังไม่เปิดใช้งาน"
        action={
          <Button asChild>
            <Link href="/app">กลับหน้าหลัก</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-4xl">{category.icon}</p>
        <h1 className="mt-2 text-3xl font-extrabold">{category.name}</h1>
        <p className="mt-1 text-sm text-[#5D5F5F]">ดีลที่พร้อมขายในหมวดนี้</p>
      </div>
      {categoryProducts.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categoryProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              store={stores.find((s) => s.id === product.storeId)}
            />
          ))}
        </div>
      ) : (
        <EmptyState title="ยังไม่มีดีลในหมวดนี้" description="ลองกลับไปดูหมวดอื่น หรือค้นหาดีลทั้งหมด" />
      )}
    </div>
  );
}

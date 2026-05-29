import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EmptyState, ProductCard } from "@/components/customer/catalog-cards";
import { categories, getProductsByCategory, getStore } from "@/lib/mock-data";

export default async function CategoryPage({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params;
  const category = categories.find((item) => item.id === categoryId);
  const products = getProductsByCategory(categoryId);

  if (!category) {
    return (
      <EmptyState
        title="ไม่พบหมวดหมู่"
        description="หมวดหมู่นี้อาจถูกลบหรือยังไม่เปิดใช้งาน"
        action={<Button asChild><Link href="/app">กลับหน้าหลัก</Link></Button>}
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
      {products.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} store={getStore(product.storeId)} />
          ))}
        </div>
      ) : (
        <EmptyState title="ยังไม่มีดีลในหมวดนี้" description="ลองกลับไปดูหมวดอื่น หรือค้นหาดีลทั้งหมด" />
      )}
    </div>
  );
}

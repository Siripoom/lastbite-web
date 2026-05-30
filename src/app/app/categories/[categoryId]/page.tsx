import { CategoryPageClient } from "@/components/customer/category-page-client";

export default async function CategoryPage({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params;
  return <CategoryPageClient categoryId={categoryId} />;
}

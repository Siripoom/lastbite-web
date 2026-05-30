import { ProductDetailClient } from "@/components/customer/product-detail-client";

export default async function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  return <ProductDetailClient productId={productId} />;
}

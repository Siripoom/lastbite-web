import Link from "next/link";
import { AddToCart } from "@/components/customer/add-to-cart";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Clock3Icon, PackageCheckIcon, StoreIconAlt } from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, pickupRange } from "@/lib/utils";
import type { Product, Store } from "@/types";

export function ProductDetail({ product, store }: { product: Product; store: Store }) {
  return (
    <div className="grid gap-6 pb-44 md:grid-cols-[minmax(0,1fr)_360px] md:pb-0">
      <div className="space-y-5">
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_22px_44px_rgba(28,27,27,0.08)]">
          <img src={product.imageUrl} alt={product.name} className="aspect-[4/3] w-full object-cover" />
        </div>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="dark">-{product.discountPercent}%</Badge>
            {product.isLuckyBag ? <Badge>Lucky Bag</Badge> : null}
            <Badge variant="outline">เหลือ {product.stockLeft} ชุด</Badge>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold leading-tight">{product.name}</h1>
            <p className="mt-3 leading-7 text-[#5D5F5F]">{product.description}</p>
          </div>
          <div className="flex items-end gap-3">
            <p className="text-3xl font-black">{formatCurrency(product.discountedPrice)}</p>
            <p className="pb-1 text-base text-[#5D5F5F] line-through">{formatCurrency(product.originalPrice)}</p>
          </div>
        </div>
      </div>

      <aside className="space-y-4">
        <Card variant="soft" className="p-5">
          <Link href={`/app/stores/${store.id}`} className="flex items-center gap-3">
            <img src={store.imageUrl} alt="" className="h-14 w-14 rounded-xl object-cover" />
            <div>
              <p className="font-bold">{store.name}</p>
              <p className="text-sm text-[#5D5F5F]">{store.distanceKm} กม. จากคุณ</p>
            </div>
          </Link>
          <Separator className="my-4" />
          <div className="space-y-3 text-sm text-[#5D5F5F]">
            <p className="flex items-center gap-2">
              <Clock3Icon className="h-4 w-4" />
              รับสินค้า {pickupRange(product.pickupStart, product.pickupEnd)}
            </p>
            <p className="flex items-center gap-2">
              <PackageCheckIcon className="h-4 w-4" />
              ตรวจ stock ล่าสุดก่อน checkout
            </p>
            <p className="flex items-center gap-2">
              <StoreIconAlt className="h-4 w-4" />
              สั่งได้จากร้านเดียวต่อหนึ่งตะกร้า
            </p>
          </div>
        </Card>
        <AddToCart product={product} store={store} />
      </aside>
    </div>
  );
}

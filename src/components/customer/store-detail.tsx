"use client";

import { ProductCard, SectionHeader } from "@/components/customer/catalog-cards";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Clock3Icon, MapPinIcon, PhoneIcon, StarIcon } from "@/components/ui/icons";
import { useCatalogStore } from "@/store/catalog";
import { pickupRange } from "@/lib/utils";
import type { Store } from "@/types";

export function StoreDetail({ store }: { store: Store }) {
  const products = useCatalogStore((s) => s.getProductsByStore(store.id));

  return (
    <div className="space-y-7">
      <section className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="relative h-56 md:h-72">
          <img src={store.coverUrl} alt={store.name} className="h-full w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-white">
            <img src={store.imageUrl} alt="" className="mb-3 h-16 w-16 rounded-2xl border-2 border-white object-cover" />
            <h1 className="text-3xl font-extrabold">{store.name}</h1>
            <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-6 text-white/80">{store.description}</p>
          </div>
        </div>
        <div className="grid gap-3 p-5 text-sm text-[#5D5F5F] md:grid-cols-4">
          <span className="flex items-center gap-2"><StarIcon className="h-4 w-4 fill-[#FFD600] text-[#1C1B1B]" /> {store.rating}</span>
          <span className="flex items-center gap-2"><MapPinIcon className="h-4 w-4" /> {store.distanceKm} กม.</span>
          <span className="flex items-center gap-2"><Clock3Icon className="h-4 w-4" /> รับ {pickupRange(store.pickupStartTime, store.pickupEndTime)}</span>
          <span className="flex items-center gap-2"><PhoneIcon className="h-4 w-4" /> {store.phone}</span>
        </div>
      </section>

      <Card className="p-5">
        <div className="flex flex-wrap gap-2">
          <Badge>เปิด {store.openTime} - {store.closeTime}</Badge>
          <Badge variant="outline">{store.availableItems} รายการพร้อมขาย</Badge>
        </div>
        <p className="mt-3 text-sm leading-6 text-[#5D5F5F]">{store.address}</p>
      </Card>

      <section className="space-y-4">
        <SectionHeader title="สินค้าของร้านนี้" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} store={store} />
          ))}
        </div>
      </section>
    </div>
  );
}

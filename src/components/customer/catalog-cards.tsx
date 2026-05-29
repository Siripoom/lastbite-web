import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Clock3Icon, MapPinIcon, StarIcon } from "@/components/ui/icons";
import { QuickAddButton } from "@/components/customer/quick-add-button";
import { cn, formatCurrency, pickupRange } from "@/lib/utils";
import type { Product, Store } from "@/types";

export function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FFD600]" />
        <h2 className="text-xl font-extrabold tracking-tight text-[#1C1B1B]">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function ProductCard({ product, store }: { product: Product; store?: Store }) {
  return (
    <Card className="group relative h-full overflow-hidden">
      <Link href={`/app/products/${product.id}`} className="block h-full">
        <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
          <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent" />
          <div className="absolute left-3 top-3 flex gap-2">
            <Badge variant="dark">-{product.discountPercent}%</Badge>
            {product.isLuckyBag ? <Badge>Lucky Bag</Badge> : null}
          </div>
        </div>
        <div className="space-y-3 p-4 pb-5">
          <div>
            <h3 className="line-clamp-2 text-[1.02rem] font-bold leading-6">{product.name}</h3>
            <p className="mt-1 line-clamp-1 text-sm text-[#5D5F5F]">{store?.name ?? "LastBite Store"}</p>
          </div>
          <div className={cn("flex items-end justify-between gap-3", store && "pr-14")}>
            <p className="rounded-full bg-[#FFF7D8] px-2.5 py-1 text-xs font-semibold text-[#6A5000]">
              เหลือ {product.stockLeft}
            </p>
            <div className="text-right">
              <p className="text-xl font-extrabold text-[#1C1B1B]">{formatCurrency(product.discountedPrice)}</p>
              <p className="text-xs text-[#5D5F5F] line-through">{formatCurrency(product.originalPrice)}</p>
            </div>
          </div>
        </div>
      </Link>
      {store ? (
        <div className="absolute bottom-3 right-3 z-10">
          <QuickAddButton product={product} store={store} />
        </div>
      ) : null}
    </Card>
  );
}

export function StoreCard({ store }: { store: Store }) {
  return (
    <Link href={`/app/stores/${store.id}`} className="block">
      <Card className="group overflow-hidden">
        <div className="relative h-36 overflow-hidden bg-black/5">
          <img src={store.coverUrl} alt={store.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          <img
            src={store.imageUrl}
            alt=""
            className="absolute bottom-3 left-3 h-14 w-14 rounded-[1rem] border-2 border-white object-cover shadow-lg"
          />
        </div>
        <div className="space-y-3 p-4">
          <div>
            <h3 className="text-lg font-extrabold">{store.name}</h3>
            <p className="mt-1 line-clamp-2 text-sm leading-6 text-[#5D5F5F]">{store.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-[#5D5F5F]">
            <span className="inline-flex items-center gap-1 rounded-full bg-black/[0.03] px-2.5 py-1">
              <StarIcon className="h-4 w-4 fill-[#FFD600] text-[#1C1B1B]" />
              {store.rating}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-black/[0.03] px-2.5 py-1">
              <MapPinIcon className="h-4 w-4" />
              {store.distanceKm} กม.
            </span>
            <span className="col-span-2 inline-flex items-center gap-1 rounded-full bg-[#FFF7D8] px-2.5 py-1 text-[#6A5000]">
              <Clock3Icon className="h-4 w-4" />
              รับ {pickupRange(store.pickupStartTime, store.pickupEndTime)}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="warm-panel rounded-[1.8rem] border border-dashed p-8 text-center">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#5D5F5F]">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

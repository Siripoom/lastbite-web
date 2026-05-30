"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, ShoppingCartIcon } from "@/components/ui/icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCatalogStore } from "@/store/catalog";
import { useCustomerStore } from "@/store/customer";
import type { Product, Store } from "@/types";

export function AddToCart({ product, store }: { product: Product; store: Store }) {
  const [quantity, setQuantity] = useState(1);
  const { addProduct, pendingProduct, confirmAddDifferentStore, clearPendingProduct } = useCustomerStore();
  const getStoreById = useCatalogStore((s) => s.getStoreById);
  const pendingStore = pendingProduct ? getStoreById(pendingProduct.storeId) : undefined;

  function add() {
    const result = addProduct(product, store, quantity);
    if (result === "added") toast.success("เพิ่มลงตะกร้าแล้ว");
    if (result === "blocked") toast.error("สินค้านี้ไม่พร้อมขายแล้ว");
  }

  return (
    <>
      <div className="fixed inset-x-0 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-50 border-t border-black/10 bg-white p-4 shadow-[0_-14px_32px_rgba(28,27,27,0.08)] md:static md:rounded-2xl md:border md:shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="flex h-12 items-center rounded-xl border border-black/10 bg-white">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              aria-label="ลดจำนวน"
            >
              <MinusIcon className="h-4 w-4" />
            </Button>
            <span className="w-10 text-center font-bold">{quantity}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setQuantity((value) => Math.min(product.stockLeft, value + 1))}
              aria-label="เพิ่มจำนวน"
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
          <Button className="flex-1" size="lg" onClick={add}>
            <ShoppingCartIcon className="h-5 w-5" />
            เพิ่มลงตะกร้า
          </Button>
        </div>
      </div>

      <Dialog open={Boolean(pendingProduct)} onOpenChange={(open) => !open && clearPendingProduct()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ตะกร้ามีสินค้าจากร้านอื่น</DialogTitle>
            <DialogDescription>
              LastBite v1 รองรับการสั่งจากร้านเดียวต่อหนึ่งออเดอร์ ต้องล้างตะกร้าเดิมก่อนเพิ่มสินค้าจาก{" "}
              {pendingStore?.name ?? "ร้านนี้"}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <DialogClose asChild>
              <Button variant="outline" className="flex-1">
                ยกเลิก
              </Button>
            </DialogClose>
            <Button
              className="flex-1"
              onClick={() => {
                if (!pendingProduct) return;
                confirmAddDifferentStore(pendingProduct, store, quantity);
                toast.success("ล้างตะกร้าและเพิ่มสินค้าใหม่แล้ว");
              }}
            >
              ล้างและเพิ่มใหม่
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

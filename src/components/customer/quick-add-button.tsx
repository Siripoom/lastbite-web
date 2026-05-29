"use client";

import type { MouseEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/components/ui/icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getStore } from "@/lib/mock-data";
import { useCustomerStore } from "@/store/customer";
import type { Product, Store } from "@/types";

export function QuickAddButton({ product, store }: { product: Product; store: Store }) {
  const { addProduct, pendingProduct, confirmAddDifferentStore, clearPendingProduct } = useCustomerStore();
  const isPendingThisProduct = pendingProduct?.id === product.id;
  const pendingStore = pendingProduct ? getStore(pendingProduct.storeId) : undefined;

  function quickAdd(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    const result = addProduct(product, store, 1);
    if (result === "added") toast.success("เพิ่มลงตะกร้าแล้ว");
    if (result === "blocked") toast.error("สินค้านี้ไม่พร้อมขายแล้ว");
  }

  return (
    <>
      <Button
        type="button"
        size="icon"
        className="h-11 w-11 rounded-full shadow-[0_14px_28px_rgba(28,27,27,0.22)]"
        onClick={quickAdd}
        aria-label={`เพิ่ม ${product.name} ลงตะกร้า`}
      >
        <PlusIcon className="h-5 w-5" />
      </Button>

      <Dialog open={isPendingThisProduct} onOpenChange={(open) => !open && clearPendingProduct()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ตะกร้ามีสินค้าจากร้านอื่น</DialogTitle>
            <DialogDescription>
              LastBite v1 รองรับการสั่งจากร้านเดียวต่อหนึ่งออเดอร์ ต้องล้างตะกร้าเดิมก่อนเพิ่มสินค้าจาก{" "}
              {pendingStore?.name ?? store.name}
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
                confirmAddDifferentStore(pendingProduct, store, 1);
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

"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { useMerchantStore } from "@/store/merchant";
import type { ProductStatus } from "@/types";

const statusCycle: ProductStatus[] = ["active", "soldOut", "draft", "expired"];

export function MerchantProductsScreen() {
  const { products, updateProduct } = useMerchantStore();
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-black">จัดการสินค้า</h1>
        <p className="mt-1 text-sm text-[#5D5F5F]">แก้ราคา ลด stock หรือสลับสถานะการขายได้จากหน้าเดียว</p>
      </div>

      <div className="grid gap-4">
        {products.map((product) => {
          const editing = editingId === product.id;
          return (
            <Card key={product.id} variant={editing ? "soft" : "default"} className="p-5">
              <div className="grid gap-4 lg:grid-cols-[120px_minmax(0,1fr)_280px]">
                <img src={product.imageUrl} alt={product.name} className="h-28 w-full rounded-2xl object-cover lg:w-[120px]" />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-black">{product.name}</h2>
                    <Badge variant={product.status === "active" ? "success" : "warning"}>{product.status}</Badge>
                    {product.isLuckyBag ? <Badge>Lucky Bag</Badge> : null}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#5D5F5F]">{product.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-sm">
                    <span className="rounded-full bg-black/[0.03] px-3 py-1">ปกติ {formatCurrency(product.originalPrice)}</span>
                    <span className="rounded-full bg-[#FFF7D8] px-3 py-1 text-[#6A5000]">ขาย {formatCurrency(product.discountedPrice)}</span>
                    <span className="rounded-full bg-black/[0.03] px-3 py-1">รับ {product.pickupStart} - {product.pickupEnd}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <label className="space-y-1 text-sm">
                      <span className="font-semibold">ราคาขาย</span>
                      <Input
                        type="number"
                        defaultValue={product.discountedPrice}
                        disabled={!editing}
                        onChange={(event) =>
                          updateProduct(product.id, { discountedPrice: Number(event.target.value) || 0 })
                        }
                      />
                    </label>
                    <label className="space-y-1 text-sm">
                      <span className="font-semibold">คงเหลือ</span>
                      <Input
                        type="number"
                        defaultValue={product.stockLeft}
                        disabled={!editing}
                        onChange={(event) =>
                          updateProduct(product.id, { stockLeft: Number(event.target.value) || 0 })
                        }
                      />
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant={editing ? "dark" : "outline"} onClick={() => setEditingId(editing ? null : product.id)}>
                      {editing ? "เสร็จสิ้น" : "แก้ไข"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        const nextIndex = (statusCycle.indexOf(product.status) + 1) % statusCycle.length;
                        updateProduct(product.id, { status: statusCycle[nextIndex] });
                      }}
                    >
                      เปลี่ยนสถานะ
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

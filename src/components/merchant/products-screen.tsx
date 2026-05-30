"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCatalogStore } from "@/store/catalog";
import { formatCurrency } from "@/lib/utils";
import { useMerchantStore } from "@/store/merchant";
import type { Product, ProductStatus } from "@/types";

const statusCycle: ProductStatus[] = ["active", "soldOut", "draft", "expired"];

const statusLabels: Record<ProductStatus, string> = {
  active: "เปิดขาย",
  soldOut: "หมด",
  draft: "แบบร่าง",
  expired: "หมดเวลา",
};

type ProductFormState = {
  name: string;
  description: string;
  imageUrl: string;
  originalPrice: string;
  discountedPrice: string;
  stockLeft: string;
  categoryId: string;
  status: ProductStatus;
  isLuckyBag: boolean;
  pickupStart: string;
  pickupEnd: string;
  bestBefore: string;
};

const imageInputClass =
  "flex min-h-12 w-full rounded-2xl border border-black/8 bg-white/88 px-4 py-3 text-sm shadow-[0_10px_20px_rgba(28,27,27,0.04)] outline-none transition file:mr-3 file:rounded-xl file:border-0 file:bg-[#FFF7D8] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-[#1C1B1B] focus:border-[#E0B800] focus:bg-white focus:ring-4 focus:ring-[#FFD600]/20";
const selectClass =
  "flex min-h-12 w-full rounded-2xl border border-black/8 bg-white/88 px-4 py-2 text-sm shadow-[0_10px_20px_rgba(28,27,27,0.04)] outline-none transition focus:border-[#E0B800] focus:bg-white focus:ring-4 focus:ring-[#FFD600]/20";
const textareaClass =
  "flex min-h-28 w-full resize-none rounded-2xl border border-black/8 bg-white/88 px-4 py-3 text-sm shadow-[0_10px_20px_rgba(28,27,27,0.04)] outline-none transition placeholder:text-[#5D5F5F]/70 focus:border-[#E0B800] focus:bg-white focus:ring-4 focus:ring-[#FFD600]/20";

function createBlankForm(): ProductFormState {
  return {
    name: "",
    description: "",
    imageUrl: "",
    originalPrice: "",
    discountedPrice: "",
    stockLeft: "1",
    categoryId: useCatalogStore.getState().categories[0]?.id ?? "",
    status: "active",
    isLuckyBag: false,
    pickupStart: "18:00",
    pickupEnd: "19:30",
    bestBefore: "",
  };
}

function createFormFromProduct(product: Product): ProductFormState {
  return {
    name: product.name,
    description: product.description,
    imageUrl: product.imageUrl,
    originalPrice: String(product.originalPrice),
    discountedPrice: String(product.discountedPrice),
    stockLeft: String(product.stockLeft),
    categoryId: product.categoryId,
    status: product.status,
    isLuckyBag: product.isLuckyBag,
    pickupStart: product.pickupStart,
    pickupEnd: product.pickupEnd,
    bestBefore: product.bestBefore ?? "",
  };
}

function parseProductForm(form: ProductFormState) {
  return {
    name: form.name.trim(),
    description: form.description.trim(),
    imageUrl: form.imageUrl || "https://picsum.photos/seed/new-product/400/300",
    originalPrice: Math.max(0, Number(form.originalPrice) || 0),
    discountedPrice: Math.max(0, Number(form.discountedPrice) || 0),
    categoryId: form.categoryId,
    stockLeft: Math.max(0, Number(form.stockLeft) || 0),
    status: form.status,
    isLuckyBag: form.isLuckyBag,
    pickupStart: form.pickupStart,
    pickupEnd: form.pickupEnd,
    bestBefore: form.bestBefore || undefined,
  };
}

export function MerchantProductsScreen() {
  const { products, createProduct, updateProduct, deleteProduct } = useMerchantStore();
  const categories = useCatalogStore((s) => s.categories);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductFormState>(() => createBlankForm());
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const formTitle = editingProduct ? "แก้ไขสินค้า" : "เพิ่มสินค้า";

  function openCreateForm() {
    setEditingProduct(null);
    setForm(createBlankForm());
    setFormOpen(true);
  }

  function openEditForm(product: Product) {
    setEditingProduct(product);
    setForm(createFormFromProduct(product));
    setFormOpen(true);
  }

  function updateField<Key extends keyof ProductFormState>(key: Key, value: ProductFormState[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    updateField("imageUrl", URL.createObjectURL(file));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = parseProductForm(form);

    if (editingProduct) {
      await updateProduct(editingProduct.id, input);
    } else {
      await createProduct(input);
    }

    setFormOpen(false);
    setEditingProduct(null);
    setForm(createBlankForm());
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-black">จัดการสินค้า</h1>
          <p className="mt-1 text-sm text-[#5D5F5F]">เพิ่มสินค้า แก้รายละเอียด ลบเมนู หรือสลับสถานะการขายได้จากหน้าเดียว</p>
        </div>
        <Button onClick={openCreateForm}>เพิ่มสินค้า</Button>
      </div>

      {products.length ? (
        <div className="grid gap-4">
          {products.map((product) => (
            <Card key={product.id} className="p-5">
              <div className="grid gap-4 lg:grid-cols-[120px_minmax(0,1fr)_220px]">
                <img src={product.imageUrl} alt={product.name} className="h-28 w-full rounded-2xl object-cover lg:w-[120px]" />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-black">{product.name}</h2>
                    <Badge variant={product.status === "active" ? "success" : product.status === "expired" ? "danger" : "warning"}>
                      {statusLabels[product.status]}
                    </Badge>
                    {product.isLuckyBag ? <Badge>Lucky Bag</Badge> : null}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#5D5F5F]">{product.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-sm">
                    <span className="rounded-full bg-black/[0.03] px-3 py-1">ปกติ {formatCurrency(product.originalPrice)}</span>
                    <span className="rounded-full bg-[#FFF7D8] px-3 py-1 text-[#6A5000]">ขาย {formatCurrency(product.discountedPrice)}</span>
                    <span className="rounded-full bg-black/[0.03] px-3 py-1">เหลือ {product.stockLeft}</span>
                    <span className="rounded-full bg-black/[0.03] px-3 py-1">รับ {product.pickupStart} - {product.pickupEnd}</span>
                    {product.bestBefore && (
                      <span className="rounded-full bg-red-50 px-3 py-1 text-red-700">
                        บริโภคก่อน {new Date(product.bestBefore).toLocaleDateString("th-TH")}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap content-start gap-2 lg:justify-end">
                  <Button variant="outline" onClick={() => openEditForm(product)}>
                    แก้ไข
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
                  <Button variant="danger" onClick={() => setProductToDelete(product)}>
                    ลบ
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="grid min-h-60 place-items-center p-8 text-center">
          <div>
            <h2 className="text-xl font-black">ยังไม่มีสินค้า</h2>
            <p className="mt-2 text-sm text-[#5D5F5F]">เพิ่มสินค้าชิ้นแรกเพื่อเริ่มเปิดขายบนหน้าร้าน</p>
            <Button className="mt-5" onClick={openCreateForm}>
              เพิ่มสินค้า
            </Button>
          </div>
        </Card>
      )}

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-h-[calc(100vh-2rem)] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{formTitle}</DialogTitle>
            <DialogDescription>กรอกข้อมูลสินค้าและช่วงเวลารับอาหารสำหรับหน้าร้านของคุณ</DialogDescription>
          </DialogHeader>
          <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-[180px_minmax(0,1fr)]">
              <div className="space-y-2">
                <div className="overflow-hidden rounded-2xl border border-black/8 bg-black/[0.03]">
                  {form.imageUrl ? (
                    <img src={form.imageUrl} alt="" className="aspect-[4/3] w-full object-cover" />
                  ) : (
                    <div className="grid aspect-[4/3] place-items-center text-sm font-semibold text-[#5D5F5F]">Preview</div>
                  )}
                </div>
                <label className="block space-y-1 text-sm">
                  <span className="font-semibold">รูปสินค้า</span>
                  <input className={imageInputClass} type="file" accept="image/*" onChange={handleImageChange} />
                </label>
              </div>

              <div className="grid gap-4">
                <label className="space-y-1 text-sm">
                  <span className="font-semibold">ชื่อสินค้า</span>
                  <Input required value={form.name} onChange={(event) => updateField("name", event.target.value)} />
                </label>
                <label className="space-y-1 text-sm">
                  <span className="font-semibold">รายละเอียด</span>
                  <textarea
                    required
                    className={textareaClass}
                    value={form.description}
                    onChange={(event) => updateField("description", event.target.value)}
                  />
                </label>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <label className="space-y-1 text-sm">
                <span className="font-semibold">ราคาปกติ</span>
                <Input required min={0} type="number" value={form.originalPrice} onChange={(event) => updateField("originalPrice", event.target.value)} />
              </label>
              <label className="space-y-1 text-sm">
                <span className="font-semibold">ราคาขาย</span>
                <Input required min={0} type="number" value={form.discountedPrice} onChange={(event) => updateField("discountedPrice", event.target.value)} />
              </label>
              <label className="space-y-1 text-sm">
                <span className="font-semibold">คงเหลือ</span>
                <Input required min={0} type="number" value={form.stockLeft} onChange={(event) => updateField("stockLeft", event.target.value)} />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <label className="space-y-1 text-sm">
                <span className="font-semibold">หมวดหมู่</span>
                <select className={selectClass} value={form.categoryId} onChange={(event) => updateField("categoryId", event.target.value)}>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-1 text-sm">
                <span className="font-semibold">สถานะ</span>
                <select className={selectClass} value={form.status} onChange={(event) => updateField("status", event.target.value as ProductStatus)}>
                  {statusCycle.map((status) => (
                    <option key={status} value={status}>
                      {statusLabels[status]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-3 rounded-2xl border border-black/8 bg-white/88 px-4 py-3 text-sm font-semibold shadow-[0_10px_20px_rgba(28,27,27,0.04)]">
                <input
                  type="checkbox"
                  checked={form.isLuckyBag}
                  onChange={(event) => updateField("isLuckyBag", event.target.checked)}
                  className="h-5 w-5 rounded border-black/20 accent-[#FFD600]"
                />
                Lucky Bag
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <label className="space-y-1 text-sm">
                <span className="font-semibold">เริ่มรับสินค้า</span>
                <Input required type="time" value={form.pickupStart} onChange={(event) => updateField("pickupStart", event.target.value)} />
              </label>
              <label className="space-y-1 text-sm">
                <span className="font-semibold">สิ้นสุดรับสินค้า</span>
                <Input required type="time" value={form.pickupEnd} onChange={(event) => updateField("pickupEnd", event.target.value)} />
              </label>
              <label className="space-y-1 text-sm">
                <span className="font-semibold">ควรบริโภคก่อน</span>
                <Input type="date" value={form.bestBefore} onChange={(event) => updateField("bestBefore", event.target.value)} />
              </label>
            </div>

            <div className="flex flex-wrap justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setFormOpen(false)}>
                ยกเลิก
              </Button>
              <Button type="submit">{editingProduct ? "บันทึกการแก้ไข" : "เพิ่มสินค้า"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(productToDelete)} onOpenChange={(open) => !open && setProductToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ลบสินค้า</DialogTitle>
            <DialogDescription>
              ยืนยันการลบ {productToDelete?.name} ออกจากรายการสินค้า การลบนี้มีผลเฉพาะ session ปัจจุบัน
            </DialogDescription>
          </DialogHeader>
          <div className="mt-5 flex flex-wrap justify-end gap-2">
            <Button variant="outline" onClick={() => setProductToDelete(null)}>
              ยกเลิก
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                if (!productToDelete) return;
                deleteProduct(productToDelete.id);
                setProductToDelete(null);
              }}
            >
              ลบสินค้า
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { SearchIcon } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { EmptyState, ProductCard } from "@/components/customer/catalog-cards";
import { getStore, searchCatalog } from "@/lib/mock-data";

export function SearchScreen() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchCatalog(query), [query]);

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold">ค้นหาดีล</h1>
        <p className="mt-2 text-sm text-[#5D5F5F]">ค้นหาจากชื่ออาหาร ร้าน หรือคำอธิบาย</p>
      </div>
      <div className="soft-panel relative rounded-[1.6rem] p-2">
        <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#5D5F5F]" />
        <Input
          className="h-13 border-0 bg-transparent pl-12 shadow-none focus:ring-0"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="เช่น ครัวซองต์ ชานม หรือ ข้าวกล่อง"
          autoFocus
        />
      </div>
      {results.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} store={getStore(product.storeId)} />
          ))}
        </div>
      ) : (
        <EmptyState title="ไม่พบดีลที่ค้นหา" description="ลองเปลี่ยนคำค้น หรือกลับไปดูดีลแนะนำในหน้าหลัก" />
      )}
    </div>
  );
}

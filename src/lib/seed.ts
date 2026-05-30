import { doc, setDoc } from "firebase/firestore";
import { categoriesCol, ordersCol, productsCol, storesCol } from "@/lib/firestore";
import { seedOrders } from "@/lib/mock-data";
import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";
import storesData from "@/data/stores.json";

export async function seedFirestore(): Promise<void> {
  await Promise.all(categoriesData.map((r) => setDoc(doc(categoriesCol, r.id), r)));
  await Promise.all(storesData.map((r) => setDoc(doc(storesCol, r.id), r)));
  await Promise.all(productsData.map((r) => setDoc(doc(productsCol, r.id), r)));
  const cleanOrders = seedOrders.map((o) => ({
    ...o,
    items: o.items.map((i) => ({
      ...i,
      imageUrl: i.imageUrl?.startsWith("blob:") ? "" : (i.imageUrl ?? ""),
    })),
  }));
  await Promise.all(cleanOrders.map((r) => setDoc(doc(ordersCol, r.id), r)));
}

import { create } from "zustand";
import { onSnapshot, query } from "firebase/firestore";
import { categoriesCol, productsCol, storesCol } from "@/lib/firestore";
import type { Category, Product, Store } from "@/types";

interface CatalogState {
  categories: Category[];
  stores: Store[];
  products: Product[];
  categoriesLoaded: boolean;
  storesLoaded: boolean;
  productsLoaded: boolean;
  _unsubscribers: Array<() => void>;

  subscribeAll: () => void;
  unsubscribeAll: () => void;

  getStoreById: (id: string) => Store | undefined;
  getVisibleStores: () => Store[];
  getProductById: (id: string) => Product | undefined;
  getAvailableProducts: () => Product[];
  getProductsByStore: (storeId: string) => Product[];
  getProductsByCategory: (categoryId: string) => Product[];
  searchCatalog: (q: string) => Product[];
}

export function isCatalogLoaded(s: {
  categoriesLoaded: boolean;
  storesLoaded: boolean;
  productsLoaded: boolean;
}) {
  return s.categoriesLoaded && s.storesLoaded && s.productsLoaded;
}

export const useCatalogStore = create<CatalogState>((set, get) => ({
  categories: [],
  stores: [],
  products: [],
  categoriesLoaded: false,
  storesLoaded: false,
  productsLoaded: false,
  _unsubscribers: [],

  subscribeAll() {
    const unsubCats = onSnapshot(query(categoriesCol), (snap) => {
      set({
        categories: snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Category),
        categoriesLoaded: true,
      });
    });
    const unsubStores = onSnapshot(query(storesCol), (snap) => {
      set({
        stores: snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Store),
        storesLoaded: true,
      });
    });
    const unsubProducts = onSnapshot(query(productsCol), (snap) => {
      set({
        products: snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Product),
        productsLoaded: true,
      });
    });
    set({ _unsubscribers: [unsubCats, unsubStores, unsubProducts] });
  },

  unsubscribeAll() {
    get()._unsubscribers.forEach((fn) => fn());
    set({ _unsubscribers: [] });
  },

  getStoreById: (id) => get().stores.find((s) => s.id === id),
  getVisibleStores: () => get().stores.filter((s) => s.isActive && s.approvalStatus === "approved"),
  getProductById: (id) => get().products.find((p) => p.id === id),
  getAvailableProducts: () => get().products.filter((p) => p.status === "active" && p.stockLeft > 0),
  getProductsByStore: (storeId) =>
    get().products.filter((p) => p.storeId === storeId && p.status === "active" && p.stockLeft > 0),
  getProductsByCategory: (categoryId) =>
    get().products.filter((p) => p.categoryId === categoryId && p.status === "active" && p.stockLeft > 0),
  searchCatalog: (q) => {
    const lower = q.toLowerCase();
    return get().products.filter(
      (p) =>
        p.status === "active" &&
        p.stockLeft > 0 &&
        (p.name.toLowerCase().includes(lower) || p.description?.toLowerCase().includes(lower)),
    );
  },
}));

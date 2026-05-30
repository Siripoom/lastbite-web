"use client";

import { create } from "zustand";
import { deleteDoc, doc, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { ordersCol, productsCol, storesCol, withdrawalsCol } from "@/lib/firestore";
import type { Order, OrderStatus, Product, Store, User, WithdrawalRequest } from "@/types";

const demoMerchant: User = {
  id: "merch_001",
  name: "วิไล อร่อยดี",
  email: "wilai@example.com",
  phone: "0812345678",
  role: "merchant",
  avatarUrl: "",
  storeId: "store_001",
  isActive: true,
};

interface MerchantState {
  merchant: User;
  store: Store | null;
  products: Product[];
  orders: Order[];
  withdrawalRequests: WithdrawalRequest[];
  storeLoaded: boolean;
  productsLoaded: boolean;
  ordersLoaded: boolean;
  subscribeStore: (storeId: string) => () => void;
  subscribeProducts: (storeId: string) => () => void;
  subscribeOrders: (storeId: string) => () => void;
  subscribeWithdrawals: (storeId: string) => () => void;
  updateStore: (input: Partial<Store>) => Promise<void>;
  createProduct: (input: Omit<Product, "id" | "storeId" | "discountPercent">) => Promise<void>;
  updateProduct: (productId: string, input: Partial<Product>) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  createWithdrawalRequest: (input: Omit<WithdrawalRequest, "id" | "storeId" | "status" | "createdAt">) => Promise<void>;
}

function calculateDiscountPercent(originalPrice: number, discountedPrice: number) {
  if (originalPrice <= 0) return 0;
  return Math.max(0, Math.round(((originalPrice - discountedPrice) / originalPrice) * 100));
}

export const useMerchantStore = create<MerchantState>((set, get) => ({
  merchant: demoMerchant,
  store: null,
  products: [],
  orders: [],
  withdrawalRequests: [],
  storeLoaded: false,
  productsLoaded: false,
  ordersLoaded: false,

  subscribeStore: (storeId) => {
    return onSnapshot(doc(storesCol, storeId), (snap) => {
      if (snap.exists()) {
        set({ store: { id: snap.id, ...snap.data() } as Store, storeLoaded: true });
      }
    });
  },

  subscribeProducts: (storeId) => {
    return onSnapshot(query(productsCol, where("storeId", "==", storeId)), (snap) => {
      set({
        products: snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Product),
        productsLoaded: true,
      });
    });
  },

  subscribeOrders: (storeId) => {
    return onSnapshot(query(ordersCol, where("storeId", "==", storeId)), (snap) => {
      const orders = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }) as Order)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      set({ orders, ordersLoaded: true });
    });
  },

  subscribeWithdrawals: (storeId) => {
    return onSnapshot(query(withdrawalsCol, where("storeId", "==", storeId)), (snap) => {
      const requests = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }) as WithdrawalRequest)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      set({ withdrawalRequests: requests });
    });
  },

  updateStore: async (input) => {
    const { store } = get();
    if (!store) return;
    await updateDoc(doc(storesCol, store.id), input as Record<string, unknown>);
  },

  createProduct: async (input) => {
    const { store } = get();
    if (!store) return;
    const newRef = doc(productsCol);
    await setDoc(newRef, {
      ...input,
      id: newRef.id,
      storeId: store.id,
      discountPercent: calculateDiscountPercent(input.originalPrice, input.discountedPrice),
    });
  },

  updateProduct: async (productId, input) => {
    const existing = get().products.find((p) => p.id === productId);
    if (!existing) return;
    const discountPercent = calculateDiscountPercent(
      input.originalPrice ?? existing.originalPrice,
      input.discountedPrice ?? existing.discountedPrice,
    );
    await updateDoc(doc(productsCol, productId), { ...input, discountPercent } as Record<string, unknown>);
  },

  deleteProduct: async (productId) => {
    await deleteDoc(doc(productsCol, productId));
  },

  updateOrderStatus: async (orderId, status) => {
    await updateDoc(doc(ordersCol, orderId), { status });
  },

  createWithdrawalRequest: async (input) => {
    const { store } = get();
    if (!store) return;
    const newRef = doc(withdrawalsCol);
    await setDoc(newRef, {
      ...input,
      id: newRef.id,
      storeId: store.id,
      status: "pending",
      createdAt: new Date().toISOString(),
    });
  },
}));

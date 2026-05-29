"use client";

import { create } from "zustand";
import { getStore, products, seedOrders } from "@/lib/mock-data";
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

const demoStore = getStore(demoMerchant.storeId ?? "") as Store;

interface MerchantState {
  merchant: User;
  store: Store;
  products: Product[];
  orders: Order[];
  withdrawalRequests: WithdrawalRequest[];
  updateStore: (input: Partial<Store>) => void;
  updateProduct: (productId: string, input: Partial<Product>) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  createWithdrawalRequest: (input: Omit<WithdrawalRequest, "id" | "storeId" | "status" | "createdAt">) => void;
}

export const useMerchantStore = create<MerchantState>((set) => ({
  merchant: demoMerchant,
  store: demoStore,
  products: products.filter((product) => product.storeId === demoStore.id),
  orders: seedOrders.filter((order) => order.storeId === demoStore.id),
  withdrawalRequests: [],

  updateStore: (input) => {
    set((state) => ({ store: { ...state.store, ...input } }));
  },

  updateProduct: (productId, input) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId ? { ...product, ...input } : product,
      ),
    }));
  },

  updateOrderStatus: (orderId, status) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status } : order,
      ),
    }));
  },

  createWithdrawalRequest: (input) => {
    set((state) => ({
      withdrawalRequests: [
        {
          id: `WD-${String(state.withdrawalRequests.length + 1).padStart(4, "0")}`,
          storeId: state.store.id,
          status: "pending",
          createdAt: new Date().toISOString(),
          ...input,
        },
        ...state.withdrawalRequests,
      ],
    }));
  },
}));

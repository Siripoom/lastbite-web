"use client";

import { create } from "zustand";
import { doc, onSnapshot, query, runTransaction, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ordersCol, productsCol, storesCol } from "@/lib/firestore";
import { makePickupCode } from "@/lib/utils";
import type { CartItem, Order, PaymentMethod, Product, Store, User } from "@/types";

const demoUser: User = {
  id: "cust_001",
  name: "คุณมายด์",
  email: "mind@example.com",
  phone: "0891234567",
  role: "customer",
  avatarUrl: "",
  isActive: true,
};

interface CustomerState {
  user: User;
  cart: CartItem[];
  orders: Order[];
  ordersLoaded: boolean;
  pendingProduct: Product | null;
  addProduct: (product: Product, store: Store, quantity?: number) => "added" | "needsClear" | "blocked";
  confirmAddDifferentStore: (product: Product, store: Store, quantity?: number) => void;
  clearPendingProduct: () => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  placeOrder: (input: { paymentMethod: PaymentMethod; paymentProofUrl: string; paymentProofFileName: string }) => Promise<string>;
  subscribeOrders: (userId: string) => () => void;
  suspendDemoUser: (isActive: boolean) => void;
}

function productToCartItem(product: Product, quantity: number): CartItem {
  return {
    productId: product.id,
    storeId: product.storeId,
    name: product.name,
    imageUrl: product.imageUrl,
    price: product.discountedPrice,
    originalPrice: product.originalPrice,
    quantity,
    stockLeft: product.stockLeft,
    pickupTime: `${product.pickupStart} - ${product.pickupEnd}`,
  };
}

export const useCustomerStore = create<CustomerState>((set, get) => ({
  user: demoUser,
  cart: [],
  orders: [],
  ordersLoaded: false,
  pendingProduct: null,

  addProduct: (product, _store, quantity = 1) => {
    if (product.stockLeft <= 0 || product.status !== "active") return "blocked";

    const cart = get().cart;
    if (cart.length > 0 && cart[0].storeId !== product.storeId) {
      set({ pendingProduct: product });
      return "needsClear";
    }

    set({
      cart: mergeCartItem(cart, productToCartItem(product, Math.min(quantity, product.stockLeft))),
    });
    return "added";
  },

  confirmAddDifferentStore: (product, _store, quantity = 1) => {
    set({
      cart: [productToCartItem(product, Math.min(quantity, product.stockLeft))],
      pendingProduct: null,
    });
  },

  clearPendingProduct: () => set({ pendingProduct: null }),

  updateQuantity: (productId, quantity) => {
    set((state) => ({
      cart: state.cart
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stockLeft)) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    }));
  },

  removeItem: (productId) => {
    set((state) => ({ cart: state.cart.filter((item) => item.productId !== productId) }));
  },

  clearCart: () => set({ cart: [] }),

  placeOrder: async ({ paymentMethod, paymentProofUrl, paymentProofFileName }) => {
    const cart = get().cart;
    if (!cart.length) throw new Error("ตะกร้าว่างเปล่า");

    const totalOriginalPrice = cart.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const firstItem = cart[0];
    const newOrderRef = doc(ordersCol);
    const pickupCode = makePickupCode();
    const createdAt = new Date().toISOString();
    let orderStoreName = "LastBite Store";
    let orderStoreImageUrl = firstItem.imageUrl;

    await runTransaction(db, async (tx) => {
      // Phase 1: all reads first
      const productSnaps = await Promise.all(
        cart.map((item) => tx.get(doc(productsCol, item.productId)))
      );
      const storeSnap = await tx.get(doc(storesCol, firstItem.storeId));

      // Validate
      for (let i = 0; i < cart.length; i++) {
        const snap = productSnaps[i];
        const item = cart[i];
        if (!snap.exists()) throw new Error(`สินค้า "${item.name}" ไม่พบในระบบ`);
        const data = snap.data();
        if (data.status !== "active") throw new Error(`สินค้า "${item.name}" ไม่พร้อมขายแล้ว`);
        if (data.stockLeft < item.quantity) throw new Error(`สินค้า "${item.name}" เหลือไม่พอ`);
      }
      if (storeSnap.exists()) {
        const sd = storeSnap.data();
        orderStoreName = sd.name ?? "LastBite Store";
        orderStoreImageUrl = sd.imageUrl ?? firstItem.imageUrl;
      }

      // Phase 2: all writes after all reads
      for (let i = 0; i < cart.length; i++) {
        const data = productSnaps[i].data()!;
        tx.update(doc(productsCol, cart[i].productId), { stockLeft: data.stockLeft - cart[i].quantity });
      }

      tx.set(newOrderRef, {
        id: newOrderRef.id,
        userId: get().user.id,
        storeId: firstItem.storeId,
        storeName: orderStoreName,
        storeImageUrl: orderStoreImageUrl,
        items: cart.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl,
        })),
        status: "waitingPickup",
        pickupCode,
        pickupTime: firstItem.pickupTime,
        paymentMethod,
        paymentProofUrl,
        paymentProofFileName,
        totalOriginalPrice,
        totalPrice,
        createdAt,
      });
    });

    // Optimistically add the order to local state so the order detail screen
    // can display it immediately before the onSnapshot listener fires.
    const newOrder: Order = {
      id: newOrderRef.id,
      userId: get().user.id,
      storeId: firstItem.storeId,
      storeName: orderStoreName,
      storeImageUrl: orderStoreImageUrl,
      items: cart.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl,
      })),
      status: "waitingPickup",
      pickupCode,
      pickupTime: firstItem.pickupTime,
      paymentMethod,
      paymentProofUrl,
      paymentProofFileName,
      totalOriginalPrice,
      totalPrice,
      createdAt,
    };
    set((state) => ({ cart: [], orders: [newOrder, ...state.orders] }));
    return newOrderRef.id;
  },

  subscribeOrders: (userId) => {
    return onSnapshot(query(ordersCol, where("userId", "==", userId)), (snap) => {
      const orders = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }) as Order)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      set({ orders, ordersLoaded: true });
    });
  },

  suspendDemoUser: (isActive) => {
    set((state) => ({ user: { ...state.user, isActive } }));
  },
}));

function mergeCartItem(cart: CartItem[], next: CartItem) {
  const exists = cart.find((item) => item.productId === next.productId);
  if (!exists) return [...cart, next];

  return cart.map((item) =>
    item.productId === next.productId
      ? { ...item, quantity: Math.min(item.quantity + next.quantity, item.stockLeft) }
      : item,
  );
}

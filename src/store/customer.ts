"use client";

import { create } from "zustand";
import { seedOrders } from "@/lib/mock-data";
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
  pendingProduct: Product | null;
  addProduct: (product: Product, store: Store, quantity?: number) => "added" | "needsClear" | "blocked";
  confirmAddDifferentStore: (product: Product, store: Store, quantity?: number) => void;
  clearPendingProduct: () => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  placeOrder: (paymentMethod: PaymentMethod) => Order | null;
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
  orders: seedOrders,
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

  placeOrder: (paymentMethod) => {
    const cart = get().cart;
    if (!cart.length) return null;

    const totalOriginalPrice = cart.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const firstItem = cart[0];
    const storeOrder = seedOrders.find((order) => order.storeId === firstItem.storeId);
    const order: Order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      userId: get().user.id,
      storeId: firstItem.storeId,
      storeName: storeOrder?.storeName ?? "LastBite Store",
      storeImageUrl: storeOrder?.storeImageUrl ?? firstItem.imageUrl,
      items: cart.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl,
      })),
      status: "waitingPickup",
      pickupCode: makePickupCode(),
      pickupTime: firstItem.pickupTime,
      paymentMethod,
      totalOriginalPrice,
      totalPrice,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({ orders: [order, ...state.orders], cart: [] }));
    return order;
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

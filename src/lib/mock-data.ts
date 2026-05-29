import categoriesJson from "@/data/categories.json";
import ordersJson from "@/data/orders.json";
import productsJson from "@/data/products.json";
import storesJson from "@/data/stores.json";
import type { Category, Order, Product, Store } from "@/types";

export const categories = categoriesJson as Category[];
export const stores = storesJson as Store[];
export const products = productsJson as Product[];
export const seedOrders = ordersJson as Order[];

export const visibleStores = stores
  .filter((store) => store.isActive !== false && store.approvalStatus === "approved")
  .sort((a, b) => a.distanceKm - b.distanceKm);

export const availableProducts = products.filter(
  (product) => product.status === "active" && product.stockLeft > 0,
);

export function getStore(storeId: string) {
  return stores.find((store) => store.id === storeId);
}

export function getVisibleStore(storeId: string) {
  const store = getStore(storeId);
  if (!store || store.isActive === false || store.approvalStatus !== "approved") return undefined;
  return store;
}

export function getProduct(productId: string) {
  return products.find((product) => product.id === productId);
}

export function getAvailableProduct(productId: string) {
  const product = getProduct(productId);
  if (!product || product.status !== "active" || product.stockLeft <= 0) return undefined;
  return product;
}

export function getProductsByStore(storeId: string) {
  return availableProducts.filter((product) => product.storeId === storeId);
}

export function getProductsByCategory(categoryId: string) {
  return availableProducts.filter((product) => product.categoryId === categoryId);
}

export function searchCatalog(query: string) {
  const value = query.trim().toLowerCase();
  if (!value) return availableProducts;

  return availableProducts.filter((product) => {
    const store = getStore(product.storeId);
    return [product.name, product.description, store?.name, store?.description]
      .filter(Boolean)
      .some((text) => text!.toLowerCase().includes(value));
  });
}

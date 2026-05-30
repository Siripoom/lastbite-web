import { collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const categoriesCol = collection(db, "categories");
export const storesCol = collection(db, "stores");
export const productsCol = collection(db, "products");
export const ordersCol = collection(db, "orders");
export const withdrawalsCol = collection(db, "withdrawalRequests");

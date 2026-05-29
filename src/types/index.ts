export type UserRole = "customer" | "merchant";

export type OrderStatus =
  | "waitingPayment"
  | "waitingPickup"
  | "preparing"
  | "ready"
  | "completed"
  | "missed";

export type PaymentMethod = "promptPay" | "mobileBanking";
export type ProductStatus = "active" | "soldOut" | "expired" | "draft";
export type ApprovalStatus = "pending" | "approved" | "rejected";
export type WithdrawalStatus = "pending" | "approved" | "rejected";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl: string;
  storeId?: string;
  isActive?: boolean;
}

export interface Store {
  id: string;
  name: string;
  description: string;
  address: string;
  imageUrl: string;
  coverUrl: string;
  phone: string;
  rating: number;
  distanceKm: number;
  openTime: string;
  closeTime: string;
  pickupStartTime: string;
  pickupEndTime: string;
  availableItems: number;
  latitude: number;
  longitude: number;
  isActive?: boolean;
  approvalStatus?: ApprovalStatus;
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  description: string;
  imageUrl: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
  status: ProductStatus;
  categoryId: string;
  stockLeft: number;
  isLuckyBag: boolean;
  pickupStart: string;
  pickupEnd: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  userId: string;
  storeId: string;
  storeName: string;
  storeImageUrl: string;
  items: OrderItem[];
  status: OrderStatus;
  pickupCode: string;
  pickupTime: string;
  paymentMethod: PaymentMethod;
  paymentProofUrl?: string;
  paymentProofFileName?: string;
  totalOriginalPrice: number;
  totalPrice: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface CartItem {
  productId: string;
  storeId: string;
  name: string;
  imageUrl: string;
  price: number;
  originalPrice: number;
  quantity: number;
  stockLeft: number;
  pickupTime: string;
}

export interface WithdrawalRequest {
  id: string;
  storeId: string;
  amount: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  note: string;
  status: WithdrawalStatus;
  createdAt: string;
}

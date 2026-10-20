// Shared frontend types — mirrors docs/TYPES.md exactly.
// Do NOT add fields that are not in the API spec.

export type Role = "CUSTOMER" | "ADMIN";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceMinor: number; // paisa
  currency: string;   // "PKR"
  imageUrl: string | null;
  inStock: boolean;
  availableQuantity: number;
};

export type OrderItem = {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPriceMinor: number; // paisa snapshot at order time
};

export type Order = {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  totalMinor: number; // paisa
  currency: string;
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  notes: string | null;
  items: OrderItem[];
  createdAt: string; // ISO date
  updatedAt: string;
};

export type CustomerSummary = {
  id: string;
  name: string;
  email: string;
};

export type AdminOrderDetail = Order & {
  customer: CustomerSummary;
};

export type Paginated<T> = {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type ApiErrorField = {
  field: string;
  messages: string[];
};

export type ApiErrorBody = {
  statusCode: number;
  code: string;
  message: string;
  details: ApiErrorField[] | null;
  path: string;
  timestamp: string;
  requestId: string;
};

export type ApiErrorCode =
  | "PRODUCT_NOT_AVAILABLE"
  | "INSUFFICIENT_STOCK"
  | "ORDER_NOT_FOUND"
  | "ORDER_NOT_CANCELLABLE"
  | "INVALID_STATUS_TRANSITION"
  | "PROFILE_REQUIRED";

export type UserDto = {
  id: string;
  email: string;
  name: string;
  role: Role;
};

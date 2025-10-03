export type Category = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

export type Brand = {
  id: number;
  name: string;
  logoUrl: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrls: string[];
  categoryId: number;
  createdAt: Date;
  category: { id: number; name: string };
};

export type Cart = {
  id: number;
  userId: number;
  items: CartItem[];
};

export type CartItem = {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  addedPrice: number;
  isSelect: boolean;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrls: string[];
    stock: number;
    category: {
      id: number;
      name: string;
    };
  };
};

export type OrderItem = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrls: string[];
    categoryId: number;
    category: {
      id: number;
      name: string;
    };
  };
};

export type Order = {
  id: number;
  userId: number;
  status: OrderStatus;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  items: OrderItem[];
};

export enum OrderStatus {
  PENDING = "PENDING",
  PLACED = "PLACED",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

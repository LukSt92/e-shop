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
  category: { name: string };
};

export type CartItem = {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  addedPrice: number;
  product: {
    name: string;
    price: number;
    imageUrls: string;
    stock: number;
    category: {
      name: string;
    };
  };
};

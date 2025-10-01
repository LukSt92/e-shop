import { Prisma } from "@/app/generated/prisma/browser";
import { prisma } from "@/lib/prisma";
import { Product } from "@/lib/types";

export type ProductFilters = {
  categoryIds?: number[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "latest" | "asc" | "desc";
  page?: number;
  show?: number;
};

export type ProductsResponse = {
  products: Product[];
  page: number;
  totalPages: number;
  total: number;
};

export type ProductDetailsResponse = {
  product: Product;
  deliveryDay: string;
};

export const productsService = {
  async getAll(filters: ProductFilters = {}): Promise<ProductsResponse> {
    const {
      categoryIds,
      minPrice,
      maxPrice,
      sortBy = "latest",
      page = 1,
      show = 3,
    } = filters;

    const skip = (page - 1) * show;
    const where: Prisma.ProductWhereInput = {};

    if (categoryIds !== undefined && categoryIds.length > 0) {
      where.categoryId = { in: categoryIds };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    const orderBy:
      | Prisma.ProductOrderByWithRelationInput
      | Prisma.ProductOrderByWithRelationInput[] =
      sortBy === "latest"
        ? { createdAt: "desc" }
        : sortBy === "asc"
        ? { price: "desc" }
        : sortBy === "desc"
        ? { price: "asc" }
        : { createdAt: "desc" };

    const [productsRaw, total] = await Promise.all([
      prisma.product.findMany({
        where,
        select: {
          id: true,
          name: true,
          price: true,
          stock: true,
          description: true,
          imageUrls: true,
          categoryId: true,
          createdAt: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy,
        take: show,
        skip,
      }),
      prisma.product.count({ where }),
    ]);

    const products = productsRaw.map((product) => ({
      ...product,
      price: product.price.toNumber(),
    }));

    const totalPages = Math.ceil(total / show);

    return {
      products,
      page,
      totalPages,
      total,
    };
  },

  async getById(id: number): Promise<ProductDetailsResponse> {
    const productRaw = await prisma.product.findUnique({
      where: { id },
      include: {
        category: {
          select: { id: true, name: true },
        },
      },
    });

    if (!productRaw) {
      throw new Error("Product not found");
    }

    const product = {
      ...productRaw,
      price: productRaw.price.toNumber(),
    };

    const today = new Date();
    const randomDays = Math.floor(Math.random() * 7) + 1;
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + randomDays);

    const deliveryDay = deliveryDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });

    return {
      product,
      deliveryDay,
    };
  },

  async getShuffled(limit?: number): Promise<Product[]> {
    const productsRaw = await prisma.product.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    const products = productsRaw.map((product) => ({
      ...product,
      price: product.price.toNumber(),
    }));
    const shuffledProducts = products
      .map((p) => ({ sort: Math.random(), value: p }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);

    return limit ? shuffledProducts.slice(0, limit) : shuffledProducts;
  },
};

import { prisma } from "@/lib/prisma";
import { Order } from "@/lib/types";

export type CreateOrderInput = {
  userId: number;
};

export const ordersService = {
  async createOrder(data: CreateOrderInput): Promise<Order> {
    const { userId } = data;

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          where: { isSelect: true },
          include: {
            product: {
              include: {
                category: {
                  select: { id: true, name: true },
                },
              },
            },
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new Error("No items in cart.");
    }

    const total = cart.items.reduce((sum, item) => {
      return sum + item.addedPrice.toNumber() * item.quantity;
    }, 0);

    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId,
          total,
          status: "PENDING",
          items: {
            create: cart.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.addedPrice,
            })),
          },
        },
        include: {
          items: {
            include: {
              product: {
                include: {
                  category: {
                    select: { id: true, name: true },
                  },
                },
              },
            },
          },
        },
      });

      for (const item of cart.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }
      await tx.cartItem.deleteMany({
        where: {
          cartId: cart.id,
          isSelect: true,
        },
      });

      return newOrder;
    });

    return {
      ...order,
      total: order.total.toNumber(),
      items: order.items.map((item) => ({
        ...item,
        price: item.price.toNumber(),
        product: {
          ...item.product,
          price: item.product.price.toNumber(),
        },
      })),
    } as Order;
  },

  async getUserOrders(userId: number): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                category: {
                  select: { id: true, name: true },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return orders.map((order) => ({
      ...order,
      total: order.total.toNumber(),
      items: order.items.map((item) => ({
        ...item,
        price: item.price.toNumber(),
        product: {
          ...item.product,
          price: item.product.price.toNumber(),
        },
      })),
    })) as Order[];
  },
};

import { prisma } from "@/lib/prisma";
import { enqueueSnackbar } from "notistack";

export type AddToCartInput = {
  userId: number;
  productId: number;
  quantity: number;
};

export type UpdateCartItemInput = {
  userId: number;
  itemId: number;
  quantity?: number;
  isSelect?: boolean;
};

export type RemoveFromCartInput = {
  userId: number;
  itemId: number;
};

export type selectAllItemsInput = {
  userId: number;
  newSelect: boolean;
};

export const cartService = {
  async getCart(userId: number) {
    const cart = await prisma.cart.findUnique({
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
    });

    if (!cart) {
      return null;
    }

    return {
      ...cart,
      items: cart.items.map((item) => ({
        ...item,
        addedPrice: item.addedPrice.toNumber(),
        product: {
          ...item.product,
          price: item.product.price.toNumber(),
        },
      })),
    };
  },

  async addToCart(data: AddToCartInput) {
    const { userId, productId, quantity } = data;

    if (quantity < 1) {
      throw new Error("quantity must be greater than 0");
    }

    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: { items: true },
      });
    }

    const existingItem = cart.items.find(
      (item) => item.productId === productId
    );

    if (existingItem) {
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });

      return {
        ...updatedItem,
        addedPrice: updatedItem.addedPrice.toNumber(),
      };
    } else {
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        throw new Error("item do not exist");
      }

      const newItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: product.id,
          quantity,
          addedPrice: product.price,
        },
      });

      return {
        ...newItem,
        addedPrice: newItem.addedPrice.toNumber(),
      };
    }
  },

  async updateCartItem(data: UpdateCartItemInput) {
    const { userId, itemId, quantity, isSelect } = data;

    const item = await prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cart: { userId },
      },
    });

    if (!item) {
      throw new Error("item do not exist in cart");
    }

    if (isSelect === undefined) {
      if (quantity) {
        if (quantity < 1) {
          throw new Error("quantity must be greater than 0");
        }

        const updatedItem = await prisma.cartItem.update({
          where: { id: itemId },
          data: { quantity },
        });

        return {
          ...updatedItem,
          addedPrice: updatedItem.addedPrice.toNumber(),
        };
      }
    } else {
      const updatedItem = await prisma.cartItem.update({
        where: { id: itemId },
        data: { isSelect },
      });

      return {
        ...updatedItem,
      };
    }
  },

  async removeFromCart(data: RemoveFromCartInput) {
    const { userId, itemId } = data;

    const item = await prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cart: { userId },
      },
    });

    if (!item) {
      throw new Error("Item do nox exist in cart");
    }

    await prisma.cartItem.delete({
      where: { id: itemId },
    });

    return { success: true };
  },

  async clearCart(userId: number) {
    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      return { success: true };
    }

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return { success: true };
  },

  async getCartTotal(userId: number) {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { where: { isSelect: true } } },
    });

    if (!cart) {
      return 0;
    }

    const total = cart.items.reduce((sum, item) => {
      return sum + Number(item.addedPrice) * item.quantity;
    }, 0);

    return total;
  },

  async getCartItemCount(userId: number) {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { where: { isSelect: true } } },
    });

    if (!cart) {
      return 0;
    }

    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  async selectAllItems(data: selectAllItemsInput) {
    const { userId, newSelect } = data;
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    if (!cart) {
      throw new Error("Cart not found for the user");
    }

    const updatedCart = await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: {
          updateMany: {
            where: {},
            data: { isSelect: newSelect },
          },
        },
      },
    });

    return updatedCart;
  },
};

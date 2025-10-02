import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, quantity } = body;

    if (!productId || quantity < 1) {
      return NextResponse.json(
        { message: "Data from request failed" },
        { status: 400 }
      );
    }

    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized operation" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json({ message: "Invalid user" }, { status: 404 });
    }

    let cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: { items: true },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: user.id },
        include: { items: true },
      });
    }

    const existingItem = cart.items.find(
      (item) => item.productId === productId
    );

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product) {
        return NextResponse.json(
          { message: "Product do not exist." },
          { status: 404 }
        );
      }
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: product.id,
          quantity,
          addedPrice: product.price,
        },
      });
    }

    return NextResponse.json({ message: `Add product to cart.` });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal error cart/route failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized operation" },
        { status: 401 }
      );
    }
    const cart = await prisma.cart.findUnique({
      where: {
        userId: (
          await prisma.user.findUnique({
            where: { email: session.user.email },
          })
        )?.id,
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

    if (!cart) {
      return NextResponse.json(
        { message: "There are no products in cart" },
        { status: 404 }
      );
    }

    return NextResponse.json(cart);
  } catch (error) {
    console.error("GET /api/cart error:", error);
    return NextResponse.json(
      { message: "Internal server error, api/cart/GET Failed" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { itemId, quantity } = body;

    if (!quantity || quantity < 1) {
      return NextResponse.json({ message: "Quantity error" }, { status: 400 });
    }

    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized operation" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { cart: { include: { items: true } } },
    });

    if (!user?.cart) {
      return NextResponse.json({ message: "Cart error" }, { status: 404 });
    }

    const item = user.cart.items.find((i) => i.id === itemId);
    if (!item) {
      return NextResponse.json(
        { message: "Cart product error" },
        { status: 404 }
      );
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal error api/cart/Patch error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { itemId } = body;

    if (isNaN(itemId)) {
      return NextResponse.json({ message: "Incorrect Id" }, { status: 400 });
    }

    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized operation" },
        { status: 401 }
      );
    }

    const item = await prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cart: { user: { email: session.user.email } },
      },
    });

    if (!item) {
      return NextResponse.json(
        { message: "This product do not exist" },
        { status: 404 }
      );
    }

    await prisma.cartItem.delete({ where: { id: itemId } });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal error api/cart/Delete error" },
      { status: 500 }
    );
  }
}

import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/authOptions";
import { NextResponse } from "next/server";

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

    const session = await getServerSession(authOptions);
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

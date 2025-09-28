import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      console.error("Unauthorized action.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId, quantity } = await req.json();

    if (!productId || !quantity || quantity < 1) {
      console.error("req went wrong, productId or quantity failed.");
      return NextResponse.json(
        { error: "Invalid product or quantity" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session?.user.email },
    });

    let cart = await prisma.cart.findUnique({
      where: { userId: user?.id },
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
      // Zwiększamy ilość
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      // Pobieramy produkt, żeby znać cenę
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product) {
        return NextResponse.json(
          { message: "Produkt nie znaleziony" },
          { status: 404 }
        );
      }

      // Dodajemy nowy produkt do koszyka
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: product.id,
          quantity,
          addedPrice: product.price,
        },
      });
    }

    return NextResponse.json({ message: "Added to cart" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}

import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ id: string }>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const productId = Number(id);

  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
      include: {
        category: {
          select: { id: true, name: true },
        },
      },
    });

    const today = new Date();
    const randomDays = Math.floor(Math.random() * 7) + 1;
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + randomDays);

    const deliveryDay = deliveryDate.toLocaleDateString("en-Us", {
      day: "numeric",
      month: "short",
    });

    return NextResponse.json({ product, deliveryDay });
  } catch (e) {
    console.error(e, "fetching product details failed");
  }
}

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    const shuffledProducts = products
      .map((p) => ({ sort: Math.random(), value: p }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);

    const slicedProducts = shuffledProducts.slice(0, 6);

    return NextResponse.json(slicedProducts);
  } catch (e) {
    console.error("Prisma failed to fetch random products.", e);
  }
}

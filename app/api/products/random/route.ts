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

    return NextResponse.json(shuffledProducts);
  } catch (e) {
    return NextResponse.json(
      { error: "Internal server error", e },
      { status: 500 }
    );
  }
}

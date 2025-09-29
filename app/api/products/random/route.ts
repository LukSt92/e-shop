import { prisma } from "@/lib/prisma";
import { Product } from "@/lib/types";
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

    function Shuffle(products: Product[]): Product[] {
      const result = [...products];
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }
      return result;
    }

    const slicedProducts = Shuffle(products).slice(0, 6);

    return NextResponse.json(slicedProducts);
  } catch (e) {
    console.error("Prisma failed to fetch random products.", e);
  }
}

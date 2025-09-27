import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(params.id) },
      include: {
        category: {
          select: { id: true, name: true },
        },
      },
    });

    return NextResponse.json(product);
  } catch (e) {
    console.error(e, "fetching product details failed");
  }
}

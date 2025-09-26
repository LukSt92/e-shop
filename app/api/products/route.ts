import { Prisma } from "@/app/generated/prisma";
import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryIds = searchParams
      .get("categoryId")
      ?.split(" ")
      .map((id) => parseInt(id));
    const minPrice = searchParams.get("minPrice")
      ? parseFloat(searchParams.get("minPrice")!)
      : undefined;
    const maxPrice = searchParams.get("maxPrice")
      ? parseFloat(searchParams.get("maxPrice")!)
      : undefined;

    const where: Prisma.ProductWhereInput = {};
    if (categoryIds !== undefined) {
      where.categoryId = { in: categoryIds };
    }
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    const products = await prisma.product.findMany({
      where,
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        imageUrls: true,
        categoryId: true,
        createdAt: true,
        category: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(products);
  } catch (e) {
    console.error("Prisma failed to fetch filtered products.", e);
  }
}

import { Prisma } from "@/app/generated/prisma/browser";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryIds = searchParams
      .get("categoryId")
      ?.split(" ")
      .map((id) => parseInt(id));
    const minPrice = searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice")!)
      : undefined;
    const maxPrice = searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice")!)
      : undefined;
    const sortBy = searchParams.get("sortBy") || "latest";
    const show = Number(searchParams.get("show")) || 3;
    const page = Number(searchParams.get("page")) || 1;
    const skip = (page - 1) * show;

    const where: Prisma.ProductWhereInput = {};
    if (categoryIds !== undefined) {
      where.categoryId = { in: categoryIds };
    }
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
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
        orderBy:
          sortBy === "latest"
            ? { createdAt: "desc" }
            : sortBy === "asc"
            ? { price: "desc" }
            : sortBy === "desc"
            ? { price: "asc" }
            : { createdAt: "desc" },
        take: show,
        skip,
      }),
      prisma.product.count({ where }),
    ]);

    const totalPages = Math.ceil(total / show);

    return NextResponse.json({ products, page, totalPages });
  } catch (e) {
    return NextResponse.json(
      { error: "Internal server error", e },
      { status: 500 }
    );
  }
}

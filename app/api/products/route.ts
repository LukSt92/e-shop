import { NextRequest, NextResponse } from "next/server";
import { productsService } from "@/services/productsService";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryIds = searchParams
      .get("categoryId")
      ?.split(" ")
      .map((id) => parseInt(id));

    const minPrice = searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined;

    const maxPrice = searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined;

    const sortBy =
      (searchParams.get("sortBy") as "latest" | "asc" | "desc") || "latest";
    const show = Number(searchParams.get("show")) || 3;
    const page = Number(searchParams.get("page")) || 1;

    const result = await productsService.getAll({
      categoryIds,
      minPrice,
      maxPrice,
      sortBy,
      show,
      page,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

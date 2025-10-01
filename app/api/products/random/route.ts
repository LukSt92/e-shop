import { productsService } from "@/services/productsService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit")
      ? Number(searchParams.get("limit"))
      : undefined;

    const products = await productsService.getShuffled(limit);

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching shuffled products:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

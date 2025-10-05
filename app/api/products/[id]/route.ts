import { productsService } from "@/services/productsService";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  id: string;
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { id } = await params;
    const productId = Number(id);
    const result = await productsService.getById(productId);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error && error.message === "Product not found") {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

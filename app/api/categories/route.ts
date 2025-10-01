import { categoriesService } from "@/services/categoriesService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await categoriesService.getAll();

    return NextResponse.json({ categories });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

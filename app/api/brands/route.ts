import { brandsService } from "@/services/brandsService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const brands = await brandsService.getAll();

    return NextResponse.json({ brands });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch brands." },
      { status: 500 }
    );
  }
}

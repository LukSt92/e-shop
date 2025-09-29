import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();

    return NextResponse.json({ categories });
  } catch (e) {
    return NextResponse.json(
      { error: "Internal server error", e },
      { status: 500 }
    );
  }
}

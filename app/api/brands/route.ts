import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const brands = await prisma.brand.findMany();

    return NextResponse.json({ brands });
  } catch (e) {
    return NextResponse.json(
      { error: "Internal server error", e },
      { status: 500 }
    );
  }
}

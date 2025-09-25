import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();

    return NextResponse.json({ categories });
  } catch (e) {
    console.error("Prisma failed to fetch categories", e);
  }
}

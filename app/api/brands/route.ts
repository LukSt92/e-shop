import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const brands = await prisma.brand.findMany();

    return NextResponse.json({ brands });
  } catch (e) {
    console.error("Prisma failed to fetch brands", e);
  }
}

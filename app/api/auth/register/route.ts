import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { usersService } from "@/services/usersService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, phone, password } = body;

    if (!email || !phone || !password) {
      return NextResponse.json(
        {
          message: "Validation failed",
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    const existingUserByPhone = await prisma.user.findUnique({
      where: { phone: phone },
    });

    if (existingUserByPhone) {
      return NextResponse.json(
        { message: "User with this phone number already exists" },
        { status: 409 }
      );
    }

    const newUser = await usersService.create({
      email,
      phone,
      password,
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        data: newUser,
      },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Internal server error", e },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

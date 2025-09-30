import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

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

    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        email: email,
        phone: phone,
        firstName: email,
        passwordHash: passwordHash,
      },
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

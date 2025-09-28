import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/app/lib/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { emailOrMobile, password } = body;

    const validationResult = loginSchema.safeParse({
      emailOrMobile,
      password,
    });

    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { emailOrMobile: validEmailOrMobile, password: validPassword } =
      validationResult.data;

    const isEmail = validEmailOrMobile.includes("@");

    const user = await prisma.user.findFirst({
      where: isEmail
        ? { email: validEmailOrMobile }
        : { phone: validEmailOrMobile },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Email/Phone Number or Password Incorrect" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      validPassword,
      user.passwordHash
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Email/Phone Number or Password Incorrect" },
        { status: 401 }
      );
    }

    const { ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: userWithoutPassword.id,
          email: userWithoutPassword.email,
          mobile: userWithoutPassword.phone,
          firstName: userWithoutPassword.firstName,
        },
      },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

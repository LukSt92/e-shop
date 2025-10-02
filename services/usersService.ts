import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export type CreateUserInput = {
  email: string;
  phone: string;
  password: string;
};

export const usersService = {
  async getByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  },
  async getByPhone(phone: string) {
    return await prisma.user.findUnique({
      where: { phone },
    });
  },
  async getByEmailOrPhone(identifier: string) {
    const isPhone = /^[\d+\s()-]+$/.test(identifier);

    if (isPhone) {
      const normalizedPhone = identifier.replace(/[\s()-]/g, "");
      return await prisma.user.findUnique({
        where: { phone: normalizedPhone },
      });
    }
    return await prisma.user.findUnique({
      where: { email: identifier },
    });
  },
  async getById(id: number) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        email: true,
        phone: true,
      },
    });
  },
  async create(data: CreateUserInput) {
    if (!data.email && !data.phone) {
      throw new Error("Email and phone number are required");
    }

    const normalizedPhone = data.phone.replace(/[\s()-]/g, "");
    const hashedPassword = await bcrypt.hash(data.password, 12);

    return await prisma.user.create({
      data: {
        firstName: data.email,
        email: data.email,
        phone: normalizedPhone,
        passwordHash: hashedPassword,
      },
      select: {
        id: true,
        firstName: true,
        email: true,
        phone: true,
      },
    });
  },

  async verifyPassword(plainPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  },
};

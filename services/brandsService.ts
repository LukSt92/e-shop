import { prisma } from "@/lib/prisma";

export const brandsService = {
  async getAll() {
    return await prisma.brand.findMany();
  },
};
